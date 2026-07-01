import React, { useEffect, useRef } from 'react';
import { Terminal } from '@xterm/xterm';
import { FitAddon } from '@xterm/addon-fit';
import { useStore } from '../../store/useStore';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';
import '@xterm/xterm/css/xterm.css';

export default function HackerTerminal() {
  const isHackerMode = useStore(state => state.isHackerMode);
  const themeIndex = useStore(state => state.themeIndex);
  const terminalRef = useRef<HTMLDivElement>(null);
  const xtermRef = useRef<Terminal | null>(null);
  const theme = PORTFOLIO_CONFIG.themeEngine[themeIndex].tokens;

  useEffect(() => {
    if (!isHackerMode || !terminalRef.current) return;

    if (!xtermRef.current) {
      const term = new Terminal({
        theme: {
          background: theme.background,
          foreground: theme.primary,
          cursor: theme.primary,
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

      term.attachCustomKeyEventHandler((e) => {
        if (e.type === 'keydown' && e.ctrlKey && e.key.toLowerCase() === 'v') {
          navigator.clipboard.readText().then(text => {
            const sanitized = text.replace(/\r?\n/g, ' ');
            input += sanitized;
            term.write(sanitized);
          }).catch(err => {
            console.warn('Clipboard read failed:', err);
          });
          return false;
        }
        return true;
      });

      xtermRef.current = term;

      const handleResize = () => fitAddon.fit();
      window.addEventListener('resize', handleResize);
      
      return () => {
        window.removeEventListener('resize', handleResize);
        try { term.dispose(); } catch (e) {}
        xtermRef.current = null;
      };
    }
  }, [isHackerMode]);

  // Update xterm theme dynamically
  useEffect(() => {
    if (xtermRef.current && xtermRef.current.options) {
      xtermRef.current.options.theme = {
        background: theme.background,
        foreground: theme.primary,
        cursor: theme.primary,
      };
    }
  }, [themeIndex, theme]);

  const toggleHackerMode = useStore(state => state.toggleHackerMode);

  if (!isHackerMode) return null;

  return (
    <div className="fixed inset-x-0 bottom-0 h-1/2 z-50 bg-dark-900 border-t-2 border-brand-500/50 p-4 font-mono shadow-[0_0_50px_var(--color-brand-500)] backdrop-blur-md" data-testid="hacker-terminal">
      <div className="absolute top-2 right-4 flex items-center gap-4 z-[60]">
        <div className="text-brand-500 text-xs uppercase tracking-widest">Orbital Command // Terminal</div>
        <button 
          onClick={() => toggleHackerMode()}
          className="text-brand-500 hover:text-text-primary transition-colors"
          title="Close Terminal"
        >
          <i className="fa-solid fa-xmark"></i>
        </button>
      </div>
      <div ref={terminalRef} className="w-full h-full pt-4 relative z-50" />
    </div>
  );
}
