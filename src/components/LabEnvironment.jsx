import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Terminal, Play, CheckCircle, AlertCircle, RefreshCw } from 'lucide-react';
import confetti from 'canvas-confetti';

export const LabEnvironment = ({ labData, onComplete }) => {
  const [input, setInput] = useState('');
  const [logs, setLogs] = useState([
    { type: 'system', text: 'TERMINAL_READY: Establishing secure link...' },
    { type: 'system', text: 'VIRTUAL_ENV: Initialized. Waiting for command input.' }
  ]);
  const [isSuccess, setIsSuccess] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const newLogs = [...logs, { type: 'user', text: input }];
    
    // Simulate command processing
    setTimeout(() => {
      const isCorrect = labData.validate(input.trim());
      
      if (isCorrect) {
        setLogs([...newLogs, { type: 'success', text: 'SUCCESS: Validation confirmed. Master Challenge Unlocked.' }]);
        setIsSuccess(true);
        confetti({
          particleCount: 150,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#00f3ff', '#bc13fe', '#ffffff']
        });
        if (onComplete) onComplete();
      } else {
        setLogs([...newLogs, { type: 'error', text: 'ERROR: Unexpected output. Check syntax and try again.' }]);
      }
    }, 600);
    
    setInput('');
  };

  return (
    <motion.div 
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      className="mt-12 border border-neon-cyan/30 bg-black rounded-lg overflow-hidden shadow-[0_0_30px_rgba(0,243,255,0.1)]"
    >
      {/* Lab Header */}
      <div className="bg-dark-surface border-b border-dark-border px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <Terminal size={18} className="text-neon-cyan" />
          <span className="text-[10px] font-black uppercase tracking-[0.3em] text-white">Interactive Lab: {labData.title}</span>
        </div>
        <div className="flex gap-2">
          <div className="w-2 h-2 rounded-full bg-red-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-yellow-500/50"></div>
          <div className="w-2 h-2 rounded-full bg-green-500/50"></div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 h-96">
        {/* Challenge Instructions */}
        <div className="p-6 border-r border-dark-border bg-dark-surface/30 overflow-y-auto">
          <h4 className="text-xs font-bold text-neon-purple mb-4 uppercase tracking-widest">Objective</h4>
          <p className="text-sm text-gray-300 leading-relaxed mb-6">
            {labData.objective}
          </p>
          <div className="space-y-4">
            <div className="bg-neon-cyan/5 border-l-2 border-neon-cyan p-3">
              <span className="text-[10px] text-neon-cyan font-bold block mb-1 uppercase tracking-tighter">Hint</span>
              <p className="text-[11px] text-gray-400 italic">"{labData.hint}"</p>
            </div>
          </div>
        </div>

        {/* Interactive Terminal */}
        <div className="flex flex-col bg-black font-mono">
          <div className="flex-1 p-4 overflow-y-auto text-[11px] space-y-2">
            <AnimatePresence initial={false}>
              {logs.map((log, i) => (
                <motion.div 
                  key={i}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex gap-2 ${
                    log.type === 'error' ? 'text-red-400' : 
                    log.type === 'success' ? 'text-neon-cyan' : 
                    log.type === 'system' ? 'text-gray-500' : 'text-white'
                  }`}
                >
                  <span className="shrink-0">{log.type === 'user' ? '>' : '#'}</span>
                  <span>{log.text}</span>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          <form onSubmit={handleSubmit} className="p-4 border-t border-dark-border bg-dark-surface/50 flex items-center gap-3">
            <span className="text-neon-cyan">{'>'}</span>
            <input 
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              disabled={isSuccess}
              placeholder={isSuccess ? "CHALLENGE_COMPLETE" : "Enter command..."}
              className="bg-transparent border-none outline-none text-white text-[11px] flex-1 font-mono uppercase tracking-widest"
              autoFocus
            />
            {!isSuccess && (
              <button type="submit" className="text-neon-cyan hover:text-white transition-colors">
                <Play size={14} />
              </button>
            )}
            {isSuccess && (
              <div className="text-neon-cyan animate-pulse">
                <CheckCircle size={14} />
              </div>
            )}
          </form>
        </div>
      </div>
    </motion.div>
  );
};
