import React, { useState, useEffect } from 'react';
import { Lock, Unlock, ShieldAlert, Cpu } from 'lucide-react';

// The expected public hash for our secret code "777777"
const PUBLIC_HASH = "10369721512002708580977348824547128361755755546590232873888972815222004747874";

export const ZKVault: React.FC = () => {
    const [code, setCode] = useState('');
    const [status, setStatus] = useState<'locked' | 'verifying' | 'unlocked' | 'error'>('locked');
    const [logs, setLogs] = useState<string[]>(['[SYSTEM] ZK-Vault initialized.', '[SYSTEM] Awaiting cryptographic input...']);
    const [snarkjsLoaded, setSnarkjsLoaded] = useState(false);

    useEffect(() => {
        if (typeof window !== 'undefined') {
            const checkSnark = setInterval(() => {
                if ((window as any).snarkjs) {
                    setSnarkjsLoaded(true);
                    clearInterval(checkSnark);
                }
            }, 100);
            return () => clearInterval(checkSnark);
        }
    }, []);

    const addLog = (msg: string) => {
        setLogs(prev => [...prev.slice(-4), msg]);
    };

    const handleUnlock = async () => {
        if (!code) return;
        setStatus('verifying');
        setLogs(['[ZK-PROVER] Initializing Groth16 Prover...']);

        try {
            if (!snarkjsLoaded) {
                throw new Error("ZK Prover engine not loaded yet.");
            }
            const snarkjs = (window as any).snarkjs;

            const secretInput = parseInt(code, 10);
            if (isNaN(secretInput)) {
                throw new Error("Invalid format. Code must be numeric.");
            }

            addLog('[ZK-PROVER] Executing WASM witness generation...');
            
            // Generate the proof!
            const { proof, publicSignals } = await snarkjs.groth16.fullProve(
                { secretCode: secretInput, publicHash: PUBLIC_HASH },
                "/zk/vault.wasm",
                "/zk/vault_final.zkey"
            );

            addLog(`[ZK-PROVER] Math proved without revealing secret.`);
            addLog('[ZK-VERIFIER] Verifying Zero-Knowledge payload...');

            const vKey = await fetch("/zk/verification_key.json").then(res => res.json());
            const isValid = await snarkjs.groth16.verify(vKey, publicSignals, proof);

            if (isValid === true) {
                addLog('[SYSTEM] Proof ACCEPTED. Decrypting vault...');
                setTimeout(() => setStatus('unlocked'), 500);
            } else {
                throw new Error("Cryptographic proof rejected.");
            }
        } catch (e: any) {
            console.error(e);
            addLog(`[ERROR] ${e.message || "Invalid Code"}`);
            setStatus('error');
            setTimeout(() => setStatus('locked'), 3000);
        }
    };

    return (
        <div className="w-full max-w-3xl mx-auto my-16 p-[1px] bg-gradient-to-r from-[var(--color-primary)]/20 via-[var(--color-primary)]/50 to-[var(--color-primary)]/20 rounded-2xl relative overflow-hidden group">
            <div className="absolute inset-0 bg-[var(--color-primary)]/5 blur-3xl rounded-3xl -z-10 transition-opacity duration-1000 group-hover:bg-[var(--color-primary)]/10" />
            
            <div className="bg-[var(--color-bg-secondary)]/90 backdrop-blur-xl w-full h-full rounded-2xl p-8 border border-[var(--color-primary)]/10 relative z-10">
                <div className="flex items-center gap-3 mb-6">
                    {status === 'unlocked' ? (
                        <Unlock className="w-8 h-8 text-[var(--color-primary)] animate-pulse" />
                    ) : (
                        <Lock className={`w-8 h-8 ${status === 'error' ? 'text-red-500' : 'text-[var(--color-primary)]'}`} />
                    )}
                    <h2 className="text-2xl font-bold tracking-tight text-[var(--color-text)]">Recruiter VIP Vault</h2>
                    <div className="ml-auto flex items-center gap-2">
                        <Cpu className={`w-5 h-5 ${snarkjsLoaded ? 'text-[var(--color-primary)]' : 'text-gray-500'} ${status === 'verifying' ? 'animate-spin' : ''}`} />
                        <span className="text-xs text-[var(--color-text)]/40 uppercase tracking-widest font-mono">
                            {snarkjsLoaded ? 'snarkjs.wasm ready' : 'loading engine...'}
                        </span>
                    </div>
                </div>

                {status !== 'unlocked' ? (
                    <div className="grid md:grid-cols-2 gap-8">
                        <div>
                            <p className="text-[var(--color-text)]/60 mb-6 text-sm">
                                Enter your exclusive access code. This component uses Circom and snarkjs to run a Zero-Knowledge Proof (Groth16) entirely client-side. The code is never sent to a server.
                            </p>
                            
                            <div className="flex gap-2">
                                <input 
                                    type="password"
                                    value={code}
                                    onChange={(e) => setCode(e.target.value)}
                                    onKeyDown={(e) => { if (e.key === 'Enter') handleUnlock(); }}
                                    placeholder="Enter 6-digit Code"
                                    className="bg-[var(--color-bg)]/50 border border-[var(--color-primary)]/20 rounded-lg px-4 py-2 text-[var(--color-text)] font-mono w-full focus:outline-none focus:border-[var(--color-primary)]/80 transition-colors"
                                    disabled={status === 'verifying'}
                                />
                                <button 
                                    onClick={handleUnlock}
                                    disabled={status === 'verifying' || !code || !snarkjsLoaded}
                                    className="bg-[var(--color-primary)] text-[var(--color-bg)] font-bold px-6 py-2 rounded-lg hover:opacity-80 transition-opacity disabled:opacity-50 disabled:cursor-not-allowed"
                                >
                                    {status === 'verifying' ? 'Proving...' : 'Unlock'}
                                </button>
                            </div>
                        </div>

                        <div className="bg-[var(--color-bg)]/50 border border-[var(--color-primary)]/10 rounded-lg p-4 font-mono text-xs text-[var(--color-primary)]/80 h-32 overflow-y-auto flex flex-col justify-end">
                            {logs.map((log, i) => (
                                <div key={i} className={`${log.startsWith('[ERROR]') ? 'text-red-400' : ''}`}>
                                    {log}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-700">
                        <div className="bg-[var(--color-primary)]/10 border border-[var(--color-primary)]/30 rounded-xl p-6 mb-6">
                            <h3 className="text-xl font-bold text-[var(--color-text)] mb-2 flex items-center gap-2">
                                <ShieldAlert className="w-5 h-5 text-[var(--color-primary)]" />
                                Vault Decrypted
                            </h3>
                            <p className="text-[var(--color-text)]/70 text-sm mb-4">
                                Zero-Knowledge Proof mathematically verified. Welcome to the inner circle.
                            </p>
                        </div>
                        
                        <div className="grid md:grid-cols-2 gap-6">
                            <div className="bg-[var(--color-bg)]/50 border border-[var(--color-primary)]/10 rounded-xl p-6 hover:bg-[var(--color-bg)] transition-colors">
                                <h4 className="text-[var(--color-text)] font-bold mb-4 uppercase tracking-widest text-sm">Direct Contact</h4>
                                <div className="space-y-4 font-mono text-sm">
                                    <div>
                                        <div className="text-[var(--color-text)]/40 mb-1">Mobile Number</div>
                                        <div className="text-[var(--color-primary)]">+1 (555) 019-8372</div>
                                    </div>
                                    <div>
                                        <div className="text-[var(--color-text)]/40 mb-1">Secure Email</div>
                                        <div className="text-[var(--color-primary)]">elite.dev@proton.me</div>
                                    </div>
                                    <div>
                                        <div className="text-[var(--color-text)]/40 mb-1">Priority Calendar</div>
                                        <a href="#" className="text-blue-400 hover:underline">calendly.com/elite-dev/vip</a>
                                    </div>
                                </div>
                            </div>

                            <div className="bg-[var(--color-bg)]/50 border border-[var(--color-primary)]/10 rounded-xl p-6 hover:bg-[var(--color-bg)] transition-colors flex flex-col justify-between">
                                <div>
                                    <h4 className="text-[var(--color-text)] font-bold mb-2 uppercase tracking-widest text-sm">Classified Project</h4>
                                    <h5 className="text-xl font-bold text-[var(--color-primary)] mb-2">Project: OMNI</h5>
                                    <p className="text-[var(--color-text)]/60 text-sm">
                                        A highly confidential distributed systems architecture currently under NDA. Includes massively parallel GPU compute and Web3 ZK-Rollups.
                                    </p>
                                </div>
                                <button className="w-full mt-4 bg-[var(--color-primary)]/10 hover:bg-[var(--color-primary)]/20 text-[var(--color-primary)] font-bold py-2 rounded-lg transition-colors border border-[var(--color-primary)]/20">
                                    View Full Architecture
                                </button>
                            </div>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};
