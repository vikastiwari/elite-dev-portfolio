import React, { useState, useEffect, useRef } from 'react';
import { Terminal as TerminalIcon } from 'lucide-react';
import { usePortfolioStore } from '../store/usePortfolioStore';
import { useStore } from '../store/useStore';

const QA_PAIRS = [
  { q: "What is your latency on the C++ HFT engine?", a: "Sub-microsecond. Built on DPDK and Lock-free SPSC queues." },
  { q: "How do you handle AI orchestrations?", a: "I build Enterprise Swarms in Python (CrewAI/LangGraph) and Java (Spring AI) using actor models." },
  { q: "Why hire you?", a: "I deliver 100x value through AI-augmented velocity and elite architectural design." }
];

export default function TerminalOverlay() {
  const { isRecruiterMode } = usePortfolioStore();
  const [messages, setMessages] = useState<{ type: 'q' | 'a', text: string }[]>([]);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isTyping, setIsTyping] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (isRecruiterMode) return; // Don't run in recruiter mode

    let isMounted = true;
    
    const runTerminal = async () => {
      if (currentIndex >= QA_PAIRS.length) return;
      
      const pair = QA_PAIRS[currentIndex];
      
      // Delay before asking question
      await new Promise(r => setTimeout(r, 2000));
      if (!isMounted) return;
      
      setMessages(prev => [...prev, { type: 'q', text: `> ${pair.q}` }]);
      setIsTyping(true);
      
      // Delay to simulate thinking
      await new Promise(r => setTimeout(r, 1000));
      if (!isMounted) return;
      
      setMessages(prev => [...prev, { type: 'a', text: pair.a }]);
      setIsTyping(false);
      setCurrentIndex(prev => prev + 1);
    };

    runTerminal();

    return () => { isMounted = false; };
  }, [currentIndex, isRecruiterMode]);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  if (isRecruiterMode) return null;

  return (
    <div className="absolute bottom-4 left-4 w-96 h-64 bg-black/80 backdrop-blur border border-green-500/30 rounded-lg p-4 font-mono text-sm shadow-2xl flex flex-col z-40">
      <div className="flex items-center gap-2 border-b border-green-500/30 pb-2 mb-2 text-green-400">
        <TerminalIcon size={16} />
        <span className="font-bold tracking-wider">Gemini-Lite AI</span>
      </div>
      
      <div ref={scrollRef} className="flex-1 overflow-y-auto space-y-2 pr-2">
        {messages.map((m, i) => (
          <div key={i} className={m.type === 'q' ? 'text-gray-400' : 'text-green-400'}>
            {m.text}
          </div>
        ))}
        {isTyping && <div className="text-green-400 animate-pulse">_</div>}
      </div>
      
      <div className="mt-2 border-t border-green-500/30 pt-2 flex items-center shrink-0">
        <span className="text-green-500 mr-2">{'>'}</span>
        <input 
          type="text" 
          className="flex-1 bg-transparent outline-none text-green-400 placeholder-green-800/50"
          placeholder="Type 'sudo play'..."
          onKeyDown={(e) => {
            if (e.key === 'Enter') {
              const val = e.currentTarget.value.trim().toLowerCase();
              if (val === 'sudo play' || val === 'play') {
                useStore.getState().toggleGameMode();
                setMessages(prev => [...prev, { type: 'q', text: `> ${val}` }, { type: 'a', text: 'Initializing WebGL Physics Sandbox...' }]);
              } else if (val !== '') {
                setMessages(prev => [...prev, { type: 'q', text: `> ${val}` }, { type: 'a', text: `Command not found: ${val}` }]);
              }
              e.currentTarget.value = '';
            }
          }}
        />
      </div>
    </div>
  );
}
