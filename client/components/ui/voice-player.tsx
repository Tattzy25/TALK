"use client";

import React, { useState, useRef, useEffect } from 'react';
import { Play, Pause, Square, Volume2 } from 'lucide-react';

interface VoicePlayerProps {
  audioUrl?: string;
  sampleText?: string;
  voiceName?: string;
  className?: string;
  variant?: 'default' | 'compact' | 'mini';
}

export function VoicePlayer({ 
  audioUrl, 
  sampleText = "This is a sample of the voice",
  voiceName = "Voice Sample",
  className = "",
  variant = 'default'
}: VoicePlayerProps) {
  const [isPlaying, setIsPlaying] = useState(false);
  const [progress, setProgress] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef<HTMLAudioElement>(null);

  useEffect(() => {
    if (audioUrl) {
      audioRef.current = new Audio(audioUrl);
      const audio = audioRef.current;

      const updateProgress = () => {
        setCurrentTime(audio.currentTime);
        setProgress((audio.currentTime / audio.duration) * 100);
      };

      const setAudioDuration = () => {
        setDuration(audio.duration);
      };

      const handleEnded = () => {
        setIsPlaying(false);
        setProgress(0);
        setCurrentTime(0);
      };

      audio.addEventListener('timeupdate', updateProgress);
      audio.addEventListener('loadedmetadata', setAudioDuration);
      audio.addEventListener('ended', handleEnded);

      return () => {
        audio.pause();
        audio.removeEventListener('timeupdate', updateProgress);
        audio.removeEventListener('loadedmetadata', setAudioDuration);
        audio.removeEventListener('ended', handleEnded);
      };
    }
  }, [audioUrl]);

  const handlePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
      } else {
        audioRef.current.play();
      }
      setIsPlaying(!isPlaying);
    }
  };

  const handleStop = () => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setIsPlaying(false);
    setProgress(0);
    setCurrentTime(0);
  };

  if (variant === 'mini') {
    return (
      <div className={`flex items-center gap-2 ${className}`}>
        <button
          onClick={handlePlay}
          className="w-8 h-8 rounded-full bg-neon-green/20 text-neon-green flex items-center justify-center hover:bg-neon-green/30 transition-colors"
        >
          {isPlaying ? <Pause className="w-3 h-3" /> : <Play className="w-3 h-3" />}
        </button>
        {isPlaying && (
          <button
            onClick={handleStop}
            className="w-8 h-8 rounded-full bg-destructive/20 text-destructive flex items-center justify-center hover:bg-destructive/30 transition-colors"
          >
            <Square className="w-3 h-3" />
          </button>
        )}
      </div>
    );
  }

  if (variant === 'compact') {
    return (
      <div className={`p-3 rounded-lg bg-input border border-border ${className}`}>
        <div className="flex items-center gap-3">
          <button
            onClick={handlePlay}
            className="w-10 h-10 rounded-full bg-neon-green/20 text-neon-green flex items-center justify-center hover:bg-neon-green/30 transition-colors"
          >
            {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
          </button>
          {isPlaying && (
            <button
              onClick={handleStop}
              className="w-10 h-10 rounded-full bg-destructive/20 text-destructive flex items-center justify-center hover:bg-destructive/30 transition-colors"
            >
              <Square className="w-4 h-4" />
            </button>
          )}
          <div className="flex-1">
            <div className="text-sm font-medium text-foreground">{voiceName}</div>
            <div className="w-full h-1 bg-border rounded-full overflow-hidden mt-1">
              <div 
                className="h-full bg-gradient-to-r from-neon-green to-electric transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
          <Volume2 className="w-4 h-4 text-muted-foreground" />
        </div>
      </div>
    );
  }

  return (
    <div className={`p-4 rounded-lg bg-input border border-border ${className}`}>
      <div className="flex items-center gap-4 mb-3">
        <button
          onClick={handlePlay}
          className="w-12 h-12 rounded-full bg-neon-green/20 text-neon-green flex items-center justify-center hover:bg-neon-green/30 transition-colors"
        >
          {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5" />}
        </button>
        
        {isPlaying && (
          <button
            onClick={handleStop}
            className="w-12 h-12 rounded-full bg-destructive/20 text-destructive flex items-center justify-center hover:bg-destructive/30 transition-colors"
          >
            <Square className="w-5 h-5" />
          </button>
        )}

        <div className="flex-1">
          <div className="text-sm font-medium text-foreground mb-1">{voiceName}</div>
          <div className="text-xs text-muted-foreground">{sampleText}</div>
        </div>
        
        <div className="text-xs text-muted-foreground">
          {Math.floor(currentTime)}s / {Math.floor(duration)}s
        </div>
      </div>

      <div className="w-full h-2 bg-border rounded-full overflow-hidden">
        <div 
          className="h-full bg-gradient-to-r from-neon-green to-electric transition-all duration-300"
          style={{ width: `${progress}%` }}
        />
      </div>

      {isPlaying && (
        <div className="mt-2 text-xs text-center text-muted-foreground">
          Playing: "{sampleText}"
        </div>
      )}
    </div>
  );
}
