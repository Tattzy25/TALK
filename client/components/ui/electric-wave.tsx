"use client";

import React, { useEffect, useRef, useState } from 'react';

interface ElectricWaveProps {
  isActive?: boolean;
  isListening?: boolean;
  isTranslating?: boolean;
  intensity?: number;
  className?: string;
}

export function ElectricWave({ 
  isActive = false, 
  isListening = false, 
  isTranslating = false,
  intensity = 0.5,
  className = "" 
}: ElectricWaveProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const animationRef = useRef<number>();
  const [audioData, setAudioData] = useState<number[]>([]);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      canvas.width = canvas.offsetWidth * window.devicePixelRatio;
      canvas.height = canvas.offsetHeight * window.devicePixelRatio;
      ctx.scale(window.devicePixelRatio, window.devicePixelRatio);
    };

    resizeCanvas();
    window.addEventListener('resize', resizeCanvas);

    const waves = [
      { frequency: 0.02, amplitude: 30, phase: 0, color: '#ff0080', opacity: 0.8 },
      { frequency: 0.03, amplitude: 25, phase: Math.PI / 3, color: '#8000ff', opacity: 0.6 },
      { frequency: 0.025, amplitude: 35, phase: Math.PI / 2, color: '#ff4000', opacity: 0.7 },
      { frequency: 0.035, amplitude: 20, phase: Math.PI, color: '#ffff00', opacity: 0.5 },
      { frequency: 0.04, amplitude: 28, phase: Math.PI / 4, color: '#00ff80', opacity: 0.6 },
    ];

    let time = 0;

    const animate = () => {
      const width = canvas.offsetWidth;
      const height = canvas.offsetHeight;
      
      ctx.clearRect(0, 0, width, height);
      
      if (isActive || isListening || isTranslating) {
        const centerY = height / 2;
        const activeIntensity = isListening ? intensity * 2 : isTranslating ? intensity * 1.5 : intensity;
        
        waves.forEach((wave, index) => {
          ctx.beginPath();
          ctx.strokeStyle = wave.color;
          ctx.lineWidth = 3;
          ctx.globalAlpha = wave.opacity * activeIntensity;
          
          // Add glow effect
          ctx.shadowColor = wave.color;
          ctx.shadowBlur = isListening ? 20 : isTranslating ? 15 : 10;
          
          for (let x = 0; x < width; x++) {
            const audioInfluence = audioData[Math.floor((x / width) * audioData.length)] || 0;
            const waveHeight = Math.sin(x * wave.frequency + time + wave.phase) * 
                             wave.amplitude * activeIntensity * (1 + audioInfluence * 2);
            
            const y = centerY + waveHeight;
            
            if (x === 0) {
              ctx.moveTo(x, y);
            } else {
              ctx.lineTo(x, y);
            }
          }
          
          ctx.stroke();
          ctx.shadowBlur = 0;
        });
        
        // Add electric sparks
        if (isListening || isTranslating) {
          for (let i = 0; i < 5; i++) {
            const x = Math.random() * width;
            const y = centerY + (Math.random() - 0.5) * 100;
            
            ctx.beginPath();
            ctx.arc(x, y, Math.random() * 3 + 1, 0, Math.PI * 2);
            ctx.fillStyle = `hsl(${280 + Math.random() * 40}, 100%, ${60 + Math.random() * 20}%)`;
            ctx.shadowColor = ctx.fillStyle;
            ctx.shadowBlur = 10;
            ctx.fill();
            ctx.shadowBlur = 0;
          }
        }
      }
      
      time += 0.1;
      animationRef.current = requestAnimationFrame(animate);
    };

    animate();

    return () => {
      window.removeEventListener('resize', resizeCanvas);
      if (animationRef.current) {
        cancelAnimationFrame(animationRef.current);
      }
    };
  }, [isActive, isListening, isTranslating, intensity, audioData]);

  // Simulate audio data for demo
  useEffect(() => {
    if (isListening) {
      const interval = setInterval(() => {
        const newAudioData = Array.from({ length: 64 }, () => Math.random() * 0.8);
        setAudioData(newAudioData);
      }, 100);
      
      return () => clearInterval(interval);
    } else {
      setAudioData([]);
    }
  }, [isListening]);

  return (
    <div className={`relative ${className}`}>
      <canvas
        ref={canvasRef}
        className="absolute inset-0 w-full h-full"
        style={{ width: '100%', height: '100%' }}
      />
      
      {/* Central pulse */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div 
          className={`w-8 h-8 rounded-full transition-all duration-300 ${
            isActive || isListening || isTranslating
              ? 'animate-pulse bg-electric shadow-lg shadow-electric/50' 
              : 'bg-muted'
          }`}
          style={{
            transform: isListening ? 'scale(1.5)' : isTranslating ? 'scale(1.2)' : 'scale(1)',
            boxShadow: isListening 
              ? '0 0 30px hsl(var(--electric)), 0 0 60px hsl(var(--electric-bright))' 
              : isTranslating 
                ? '0 0 20px hsl(var(--neon-purple)), 0 0 40px hsl(var(--neon-pink))'
                : undefined
          }}
        />
      </div>
      
      {/* Outer rings */}
      {(isActive || isListening || isTranslating) && (
        <>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-24 h-24 rounded-full border-2 border-electric/30 animate-ping" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="w-32 h-32 rounded-full border border-neon-purple/20 animate-pulse" />
          </div>
        </>
      )}
    </div>
  );
}
