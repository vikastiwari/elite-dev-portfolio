#!/bin/bash
set -e

# Ensure we use NVM node to get access to npx properly if needed, 
# though we can just call npx directly if it's in PATH.
source ~/.nvm/nvm.sh
nvm use 22.12.0

echo "🚀 Starting ZK-Proof Compilation..."

mkdir -p public/zk
mkdir -p src/crypto/build

cd src/crypto

echo "1/5 Compiling vault.circom..."
~/.local/bin/circom vault.circom --r1cs --wasm --sym -o build

echo "2/5 Phase 1 Setup (Powers of Tau)..."
# 12 is enough for small circuits. 
npx snarkjs powersoftau new bn128 12 build/pot12_0000.ptau -v
npx snarkjs powersoftau contribute build/pot12_0000.ptau build/pot12_0001.ptau --name="First contribution" -v -e="random entropy 1"
npx snarkjs powersoftau prepare phase2 build/pot12_0001.ptau build/pot12_final.ptau -v

echo "3/5 Phase 2 Setup (Circuit-specific)..."
npx snarkjs groth16 setup build/vault.r1cs build/pot12_final.ptau build/vault_0000.zkey
npx snarkjs zkey contribute build/vault_0000.zkey build/vault_final.zkey --name="Second contribution" -v -e="random entropy 2"

echo "4/5 Exporting Verification Key..."
npx snarkjs zkey export verificationkey build/vault_final.zkey build/verification_key.json

echo "5/5 Copying artifacts to public/zk..."
cp build/vault_js/vault.wasm ../../public/zk/
cp build/vault_final.zkey ../../public/zk/
cp build/verification_key.json ../../public/zk/

echo "✅ ZK Vault artifacts compiled successfully!"
