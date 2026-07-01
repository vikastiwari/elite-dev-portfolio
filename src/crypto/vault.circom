pragma circom 2.0.0;

include "../../node_modules/circomlib/circuits/poseidon.circom";

// A simple circuit that proves knowledge of a secret code that hashes to a public lock.
template VaultLock() {
    signal input secretCode;
    signal input publicHash;

    component poseidon = Poseidon(1);
    poseidon.inputs[0] <== secretCode;

    publicHash === poseidon.out;
}

// publicHash is the public input. The secretCode remains private.
component main {public [publicHash]} = VaultLock();
