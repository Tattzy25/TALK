"use client";

import React, { useState } from 'react';
import { Keyboard, Send, X } from 'lucide-react';

interface FloatingKeyboardProps {
  onSendMessage?: (message: string) => void;
  placeholder?: string;
  className?: string;
}

export function FloatingKeyboard({ 
  onSendMessage,
  placeholder = "Type your message...",
  className = ""
}: FloatingKeyboardProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [message, setMessage] = useState('');

  const handleSend = () => {
    if (message.trim() && onSendMessage) {
      onSendMessage(message.trim());
      setMessage('');
      setIsOpen(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <>
      {/* Floating Keyboard Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className={`fixed bottom-6 right-6 w-14 h-14 rounded-full bg-gradient-to-br from-electric to-neon-purple shadow-2xl shadow-electric/30 border border-electric/50 text-white hover:scale-110 transition-all duration-300 z-50 flex items-center justify-center ${className}`}
      >
        <Keyboard className="w-6 h-6" />
      </button>

      {/* Floating Input Widget */}
      {isOpen && (
        <>
          {/* Backdrop */}
          <div 
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={() => setIsOpen(false)}
          />
          
          {/* Input Widget */}
          <div className="fixed bottom-24 right-6 w-80 max-w-[calc(100vw-3rem)] bg-card/90 backdrop-blur-md border border-border rounded-2xl shadow-2xl z-50 p-4">
            <div className="flex items-center justify-between mb-3">
              <div className="text-sm font-medium text-electric">Quick Type</div>
              <button
                onClick={() => setIsOpen(false)}
                className="w-6 h-6 rounded-full hover:bg-muted transition-colors flex items-center justify-center"
              >
                <X className="w-4 h-4 text-muted-foreground" />
              </button>
            </div>
            
            <div className="space-y-3">
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                onKeyPress={handleKeyPress}
                placeholder={placeholder}
                className="w-full h-24 p-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-electric/50"
                autoFocus
              />
              
              <div className="flex items-center justify-between">
                <div className="text-xs text-muted-foreground">
                  Press Enter to send, Shift+Enter for new line
                </div>
                <button
                  onClick={handleSend}
                  disabled={!message.trim()}
                  className="px-4 py-2 rounded-lg bg-gradient-to-r from-electric to-neon-purple text-white text-sm font-medium hover:from-electric/80 hover:to-neon-purple/80 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                >
                  <Send className="w-4 h-4" />
                  Send
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
