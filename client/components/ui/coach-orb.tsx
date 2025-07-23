"use client";

import React, { useEffect, useState } from 'react';

interface CoachOrbProps {
  isListening?: boolean;
  isSpeaking?: boolean;
  mood?: 'calm' | 'correction' | 'praise' | 'thinking';
  className?: string;
}

export function CoachOrb({ 
  isListening = false, 
  isSpeaking = false, 
  mood = 'calm',
  className = "" 
}: CoachOrbProps) {
  const [particles, setParticles] = useState([]);

  useEffect(() => {
    if (isListening || isSpeaking) {
      const newParticles = Array.from({ length: 12 }, (_, i) => ({
        id: i,
        angle: (i * 30) * Math.PI / 180,
        radius: 60 + Math.random() * 40,
        opacity: Math.random() * 0.8 + 0.2,
        size: Math.random() * 4 + 2,
      }));
      setParticles(newParticles);
    }
  }, [isListening, isSpeaking]);

  const getMoodColors = () => {
    switch (mood) {
      case 'calm':
        return {
          primary: '#8B5CF6', // electric purple
          secondary: '#A855F7', // neon purple  
          accent: '#C084FC',
          shadow: '0 0 60px rgba(139, 92, 246, 0.4)'
        };
      case 'correction':
        return {
          primary: '#F97316', // neon orange
          secondary: '#FB923C',
          accent: '#FDBA74', 
          shadow: '0 0 60px rgba(249, 115, 22, 0.4)'
        };
      case 'praise':
        return {
          primary: '#10B981', // neon green
          secondary: '#34D399',
          accent: '#6EE7B7',
          shadow: '0 0 60px rgba(16, 185, 129, 0.4)'
        };
      case 'thinking':
        return {
          primary: '#EC4899', // neon pink
          secondary: '#F472B6',
          accent: '#F9A8D4',
          shadow: '0 0 60px rgba(236, 72, 153, 0.4)'
        };
      default:
        return {
          primary: '#8B5CF6',
          secondary: '#A855F7',
          accent: '#C084FC', 
          shadow: '0 0 60px rgba(139, 92, 246, 0.4)'
        };
    }
  };

  const colors = getMoodColors();

  return (
    <div className={`relative flex items-center justify-center ${className}`}>
      {/* Floating Particles */}
      {(isListening || isSpeaking) && particles.map((particle) => (
        <div
          key={particle.id}
          className="absolute w-1 h-1 rounded-full animate-pulse"
          style={{
            background: colors.accent,
            left: `calc(50% + ${Math.cos(particle.angle) * particle.radius}px)`,
            top: `calc(50% + ${Math.sin(particle.angle) * particle.radius}px)`,
            opacity: particle.opacity,
            width: `${particle.size}px`,
            height: `${particle.size}px`,
            animationDelay: `${particle.id * 0.1}s`,
            animationDuration: '2s',
          }}
        />
      ))}

      {/* Main Orb Container */}
      <div className="relative">
        {/* Outer Glow Ring */}
        {(isListening || isSpeaking) && (
          <div 
            className="absolute inset-0 rounded-full animate-pulse"
            style={{
              width: '140px',
              height: '140px',
              background: `radial-gradient(circle, transparent 40%, ${colors.primary}20 70%, transparent 100%)`,
              transform: 'translate(-50%, -50%)',
              left: '50%',
              top: '50%',
            }}
          />
        )}

        {/* Primary Orb */}
        <div 
          className="relative w-32 h-32 rounded-full transition-all duration-500 ease-in-out"
          style={{
            background: `radial-gradient(circle at 30% 30%, ${colors.accent}, ${colors.secondary}, ${colors.primary})`,
            boxShadow: colors.shadow,
            transform: isListening ? 'scale(1.1)' : isSpeaking ? 'scale(1.05)' : 'scale(1)',
          }}
        >
          {/* Inner Reflections */}
          <div 
            className="absolute inset-3 rounded-full"
            style={{
              background: `radial-gradient(circle at 20% 20%, rgba(255,255,255,0.4), transparent 50%)`,
            }}
          />
          
          {/* Core Pulse */}
          <div 
            className="absolute inset-8 rounded-full transition-all duration-300"
            style={{
              background: `radial-gradient(circle, rgba(255,255,255,0.6), transparent 70%)`,
              opacity: isListening || isSpeaking ? 0.8 : 0.3,
              animation: isListening || isSpeaking ? 'pulse 1s infinite' : 'none',
            }}
          />
          
          {/* Surface Texture */}
          <div 
            className="absolute inset-2 rounded-full opacity-20"
            style={{
              background: `conic-gradient(from 0deg, transparent, ${colors.accent}, transparent, ${colors.secondary}, transparent)`,
              animation: isListening || isSpeaking ? 'spin 8s linear infinite' : 'none',
            }}
          />
        </div>

        {/* Mood Status */}
        <div className="absolute -bottom-16 left-1/2 -translate-x-1/2 text-center">
          <div className="px-4 py-2 rounded-full bg-card/80 backdrop-blur-sm border border-border">
            <div className="text-sm font-medium" style={{ color: colors.primary }}>
              {mood === 'calm' && '💙 Ready to chat'}
              {mood === 'correction' && '🔍 Helping you improve'}
              {mood === 'praise' && '🎉 You\'re doing great!'}
              {mood === 'thinking' && '🤔 Processing...'}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
