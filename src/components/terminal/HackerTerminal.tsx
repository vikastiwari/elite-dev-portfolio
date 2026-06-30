import React, { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { useStore } from '../../store/useStore';
import '@xterm/xterm/css/xterm.css';

export default function HackerTerminal() {
  const isHackerMode = useStore(state => state.isHackerMode);
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);

  useEffect(() => {
    if (!isHackerMode || !terminalRef.current) return;

    if (!xtermRef.current) {
      const term = new Terminal({
        theme: {
          background: 'rgba(0, 0, 0, 0.8)',
          foreground: '#00ff00',
          cursor: '#00ff00',
        },
        cursorBlink: true,
        fontFamily: 'monospace',
      });

      const fitAddon = new FitAddon();
      term.loadAddon(fitAddon);
      term.open(terminalRef.current);
      fitAddon.fit();

      term.writeln('Welcome to Orbital Command // Hacker Mode enabled.');
      term.writeln('Type "help" for a list of commands.');
      term.write('\r\n$ ');

      let input = '';
      term.onData(async (e) => {
        if (e === '\r') {
          // Enter pressed
          term.writeln('');
          
          if (input.trim() === 'help') {
            term.writeln('Commands: help, whoami, clear');
          } else if (input.trim() === 'clear') {
            term.clear();
          } else if (input.trim().length > 0) {
            // Send to chat API
            try {
              const res = await fetch('/api/chat', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: input.trim() })
              });
              const data = await res.json();
              term.writeln(data.reply || 'No response.');
            } catch (err) {
              term.writeln('Error connecting to AI Adapter.');
            }
          }
          
          input = '';
          term.write('\r\n$ ');
        } else if (e === '\u007F') {
          // Backspace
          if (input.length > 0) {
            input = input.slice(0, -1);
            term.write('\b \b');
          }
        } else {
          // Printable characters
          input += e;
          term.write(e);
        }
      });

      xtermRef.current = term;

      const handleResize = () => fitAddon.fit();
      window.addEventListener('resize', handleResize);
      return () => window.removeEventListener('resize', handleResize);
    }
  }, [isHackerMode]);

  if (!isHackerMode) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 h-1/2 z-50 bg-black/90 border-t-2 border-green-500/50 p-4 font-mono shadow-[0_0_50px_rgba(0,255,0,0.1)] backdrop-blur-md" data-testid="hacker-terminal">
      <div className="absolute top-2 right-4 text-green-500/50 text-xs uppercase tracking-widest">Orbital Command // Terminal</div>
      <div ref={terminalRef} className="w-full h-full pt-4" />
    </div>
  );
}
