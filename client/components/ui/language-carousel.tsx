"use client";

import React, { useState, useRef, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

const languages: Language[] = [
  { code: 'en', name: 'English', flag: '🇺🇸', nativeName: 'English' },
  { code: 'es', name: 'Spanish', flag: '🇪🇸', nativeName: 'Español' },
  { code: 'fr', name: 'French', flag: '🇫🇷', nativeName: 'Français' },
  { code: 'de', name: 'German', flag: '🇩🇪', nativeName: 'Deutsch' },
  { code: 'it', name: 'Italian', flag: '🇮🇹', nativeName: 'Italiano' },
  { code: 'pt', name: 'Portuguese', flag: '🇵🇹', nativeName: 'Português' },
  { code: 'ru', name: 'Russian', flag: '🇷🇺', nativeName: 'Русский' },
  { code: 'ja', name: 'Japanese', flag: '🇯���', nativeName: '日本語' },
  { code: 'ko', name: 'Korean', flag: '🇰🇷', nativeName: '한국어' },
  { code: 'zh', name: 'Chinese', flag: '🇨🇳', nativeName: '中文' },
  { code: 'ar', name: 'Arabic', flag: '🇸🇦', nativeName: 'العربية' },
  { code: 'hi', name: 'Hindi', flag: '🇮🇳', nativeName: 'हिन्दी' },
];

interface LanguageCarouselProps {
  selectedLanguage: string;
  onLanguageSelect: (language: Language) => void;
  label: string;
  className?: string;
}

export function LanguageCarousel({ 
  selectedLanguage, 
  onLanguageSelect, 
  label,
  className = "" 
}: LanguageCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const [isGrabbing, setIsGrabbing] = useState(false);
  const [startX, setStartX] = useState(0);
  const [scrollLeft, setScrollLeft] = useState(0);

  const selectedLang = languages.find(lang => lang.code === selectedLanguage) || languages[0];

  useEffect(() => {
    const selectedIndex = languages.findIndex(lang => lang.code === selectedLanguage);
    if (selectedIndex !== -1) {
      setCurrentIndex(selectedIndex);
    }
  }, [selectedLanguage]);

  const scrollToIndex = (index: number) => {
    if (carouselRef.current) {
      const itemWidth = 280; // Width of each language card
      carouselRef.current.scrollTo({
        left: index * itemWidth - (carouselRef.current.offsetWidth / 2) + (itemWidth / 2),
        behavior: 'smooth'
      });
    }
  };

  const handleNext = () => {
    const nextIndex = (currentIndex + 1) % languages.length;
    setCurrentIndex(nextIndex);
    onLanguageSelect(languages[nextIndex]);
    scrollToIndex(nextIndex);
  };

  const handlePrev = () => {
    const prevIndex = currentIndex === 0 ? languages.length - 1 : currentIndex - 1;
    setCurrentIndex(prevIndex);
    onLanguageSelect(languages[prevIndex]);
    scrollToIndex(prevIndex);
  };

  const handleLanguageClick = (language: Language, index: number) => {
    setCurrentIndex(index);
    onLanguageSelect(language);
    scrollToIndex(index);
  };

  // Touch and mouse drag handlers
  const handleMouseDown = (e: React.MouseEvent) => {
    setIsGrabbing(true);
    setStartX(e.pageX - (carouselRef.current?.offsetLeft || 0));
    setScrollLeft(carouselRef.current?.scrollLeft || 0);
  };

  const handleMouseMove = (e: React.MouseEvent) => {
    if (!isGrabbing || !carouselRef.current) return;
    e.preventDefault();
    const x = e.pageX - (carouselRef.current?.offsetLeft || 0);
    const walk = (x - startX) * 2;
    carouselRef.current.scrollLeft = scrollLeft - walk;
  };

  const handleMouseUp = () => {
    setIsGrabbing(false);
  };

  return (
    <div className={`relative ${className}`}>
      {/* Label */}
      <div className="text-center mb-4">
        <h3 className="text-lg font-semibold text-foreground mb-1">{label}</h3>
        <div className="text-sm text-muted-foreground">
          {selectedLang.flag} {selectedLang.nativeName}
        </div>
      </div>

      {/* Carousel Container */}
      <div className="relative group">
        {/* Left Fade */}
        <div className="absolute left-0 top-0 w-16 h-full bg-gradient-to-r from-background via-background/80 to-transparent z-10 pointer-events-none" />
        
        {/* Right Fade */}
        <div className="absolute right-0 top-0 w-16 h-full bg-gradient-to-l from-background via-background/80 to-transparent z-10 pointer-events-none" />

        {/* Left Arrow */}
        <button
          onClick={handlePrev}
          className="absolute left-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-card/80 border border-border hover:bg-accent hover:border-electric/50 transition-all duration-200 flex items-center justify-center group-hover:opacity-100 opacity-60"
        >
          <ChevronLeft className="w-4 h-4 text-electric" />
        </button>

        {/* Right Arrow */}
        <button
          onClick={handleNext}
          className="absolute right-2 top-1/2 -translate-y-1/2 z-20 w-8 h-8 rounded-full bg-card/80 border border-border hover:bg-accent hover:border-electric/50 transition-all duration-200 flex items-center justify-center group-hover:opacity-100 opacity-60"
        >
          <ChevronRight className="w-4 h-4 text-electric" />
        </button>

        {/* Language Cards Carousel */}
        <div
          ref={carouselRef}
          className={`flex gap-4 overflow-x-auto scrollbar-hide py-4 px-16 ${
            isGrabbing ? 'cursor-grabbing' : 'cursor-grab'
          }`}
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
          onMouseDown={handleMouseDown}
          onMouseMove={handleMouseMove}
          onMouseUp={handleMouseUp}
          onMouseLeave={handleMouseUp}
        >
          {languages.map((language, index) => (
            <div
              key={language.code}
              onClick={() => handleLanguageClick(language, index)}
              className={`
                flex-shrink-0 w-64 h-32 rounded-xl border-2 transition-all duration-300 cursor-pointer select-none
                flex flex-col items-center justify-center gap-2 relative overflow-hidden
                ${currentIndex === index
                  ? 'border-electric bg-electric/10 shadow-lg shadow-electric/20 scale-105'
                  : 'border-border bg-card hover:border-electric/30 hover:bg-electric/5'
                }
              `}
            >
              {/* Glow effect for selected */}
              {currentIndex === index && (
                <div className="absolute inset-0 bg-gradient-to-br from-electric/20 via-transparent to-neon-purple/20 rounded-xl" />
              )}
              
              <div className="text-4xl mb-1">{language.flag}</div>
              <div className="text-center relative z-10">
                <div className="font-semibold text-foreground">{language.nativeName}</div>
                <div className="text-sm text-muted-foreground">{language.name}</div>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Dots Indicator */}
      <div className="flex justify-center gap-2 mt-4">
        {languages.map((_, index) => (
          <button
            key={index}
            onClick={() => handleLanguageClick(languages[index], index)}
            className={`w-2 h-2 rounded-full transition-all duration-200 ${
              currentIndex === index
                ? 'bg-electric w-6'
                : 'bg-muted-foreground/30 hover:bg-electric/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
