"use client";

import React, { useState, useEffect } from 'react';
import { ElectricWave } from '../components/ui/electric-wave';
import { LanguageCarousel } from '../components/ui/language-carousel';
import { VoicePlayer } from '../components/ui/voice-player';
import { CoachOrb } from '../components/ui/coach-orb';
import { FloatingKeyboard } from '../components/ui/floating-keyboard';
import { Settings, Mic, MicOff, Volume2, VolumeX, RotateCcw, MessageSquare, Zap, ChevronDown } from 'lucide-react';

interface Language {
  code: string;
  name: string;
  flag: string;
  nativeName: string;
}

export default function Index() {
  const [fromLanguage, setFromLanguage] = useState('en');
  const [toLanguage, setToLanguage] = useState('es');
  const [isListening, setIsListening] = useState(false);
  const [isTranslating, setIsTranslating] = useState(false);
  const [isPlaying, setIsPlaying] = useState(false);
  const [recordedText, setRecordedText] = useState('');
  const [translatedText, setTranslatedText] = useState('');
    const [showSettings, setShowSettings] = useState(false);
  const [showVoiceLab, setShowVoiceLab] = useState(false);
  const [showSpeechLab, setShowSpeechLab] = useState(false);
    const [showCloneVoice, setShowCloneVoice] = useState(false);
  const [showVoiceLibrary, setShowVoiceLibrary] = useState(false);
  const [showCreateVoice, setShowCreateVoice] = useState(false);
  const [showSavedVoices, setShowSavedVoices] = useState(false);
  const [showDefaultSettings, setShowDefaultSettings] = useState(false);
  const [showSubscription, setShowSubscription] = useState(false);
  const [showSubscribeNow, setShowSubscribeNow] = useState(false);
  const [showCheckout, setShowCheckout] = useState(false);
  const [showUserSettings, setShowUserSettings] = useState(false);
  const [isRecording, setIsRecording] = useState(false);
  const [isCloning, setIsCloning] = useState(false);
  const [cloneProgress, setCloneProgress] = useState(0);
  const [recordingTime, setRecordingTime] = useState(0);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [tokenUsage, setTokenUsage] = useState({ used: 1250, total: 5000 });
  const [showCoach, setShowCoach] = useState(false);
  const [isCoachListening, setIsCoachListening] = useState(false);
  const [coachTranscript, setCoachTranscript] = useState([]);
  const [selectedScenario, setSelectedScenario] = useState('casual');
  const [selectedTone, setSelectedTone] = useState('casual');
  const [coachMood, setCoachMood] = useState('calm');

  const handleStartRecording = () => {
    setIsListening(true);
    setRecordedText('');
    setTranslatedText('');
    
    // Simulate recording for demo
    setTimeout(() => {
      setIsListening(false);
      setRecordedText('Hello, how are you today?');
      
      // Start translation
      setIsTranslating(true);
      setTimeout(() => {
        setIsTranslating(false);
        setTranslatedText('Hola, ¿cómo estás hoy?');
        
        // Auto-play translation
        setIsPlaying(true);
        setTimeout(() => {
          setIsPlaying(false);
        }, 3000);
      }, 2000);
    }, 3000);
  };

  const handleStopRecording = () => {
    setIsListening(false);
  };

  const handleFromLanguageSelect = (language: Language) => {
    setFromLanguage(language.code);
  };

  const handleToLanguageSelect = (language: Language) => {
    setToLanguage(language.code);
  };

  return (
    <div className="min-h-screen bg-background text-foreground overflow-hidden relative">
      {/* Gradient Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-background via-background to-electric/5" />
      
      {/* Header */}
      <header className="relative z-10 flex justify-between items-center p-6">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-electric to-neon-purple flex items-center justify-center">
            <div className="w-4 h-4 bg-background rounded-sm" />
          </div>
          <h1 className="text-xl font-bold bg-gradient-to-r from-electric to-neon-purple bg-clip-text text-transparent">
                        {showCoach ? 'AI Language Coach' : 'VoiceSync AI'}
          </h1>
        </div>
        
                <div className="flex items-center gap-3">
          <button
            onClick={() => setShowCoach(!showCoach)}
            className={`w-10 h-10 rounded-full border transition-all duration-200 flex items-center justify-center group ${
              showCoach
                ? 'bg-neon-orange/20 border-neon-orange/50 text-neon-orange'
                : 'bg-card border-border hover:border-neon-orange/50 text-muted-foreground group-hover:text-neon-orange'
            }`}
          >
            <span className="text-lg">🎯</span>
          </button>

          <button
            onClick={() => setShowSettings(!showSettings)}
            className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center group"
          >
            <Settings className="w-5 h-5 text-muted-foreground group-hover:text-electric transition-colors" />
          </button>
        </div>
      </header>

            {/* Main Content */}
      {!showCoach ? (
        <div className="relative z-10 container mx-auto px-6 py-8">
        {/* Central Electric Wave - Now at Top */}
        <div className="relative flex justify-center mb-12">
          <div className="w-full max-w-2xl h-48 relative">
            <ElectricWave
              isActive={isListening || isTranslating || isPlaying}
              isListening={isListening}
              isTranslating={isTranslating}
              intensity={0.8}
              className="w-full h-full"
            />
            
            {/* Status Text */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 text-center">
              <div className="text-sm text-muted-foreground">
                {isListening && 'Listening to your voice...'}
                {isTranslating && 'AI is translating...'}
                {isPlaying && 'Playing translation...'}
                {!isListening && !isTranslating && !isPlaying && 'Ready to translate'}
              </div>
            </div>
          </div>
        </div>

        {/* Control Buttons - Now Below Wave */}
        <div className="flex justify-center gap-6 mb-12">
          {/* Record Button */}
          <button
            onClick={isListening ? handleStopRecording : handleStartRecording}
            disabled={isTranslating}
            className={`
              w-16 h-16 rounded-full border-2 transition-all duration-300 flex items-center justify-center
              ${isListening
                ? 'border-destructive bg-destructive/20 text-destructive animate-pulse'
                : 'border-electric bg-electric/10 text-electric hover:bg-electric/20 hover:scale-110'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isListening ? (
              <MicOff className="w-6 h-6" />
            ) : (
              <Mic className="w-6 h-6" />
            )}
          </button>

          {/* Play Button */}
          <button
            onClick={() => {
              if (translatedText) {
                setIsPlaying(!isPlaying);
                if (!isPlaying) {
                  setTimeout(() => setIsPlaying(false), 3000);
                }
              }
            }}
            disabled={!translatedText || isTranslating}
            className={`
              w-16 h-16 rounded-full border-2 transition-all duration-300 flex items-center justify-center
              ${isPlaying
                ? 'border-neon-orange bg-neon-orange/20 text-neon-orange animate-pulse'
                : 'border-neon-green bg-neon-green/10 text-neon-green hover:bg-neon-green/20 hover:scale-110'
              }
              disabled:opacity-50 disabled:cursor-not-allowed
            `}
          >
            {isPlaying ? (
              <VolumeX className="w-6 h-6" />
            ) : (
              <Volume2 className="w-6 h-6" />
            )}
          </button>
        </div>

        {/* Language Selectors - Now at Bottom */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          <div className="space-y-4">
            <LanguageCarousel
              selectedLanguage={fromLanguage}
              onLanguageSelect={handleFromLanguageSelect}
              label="Speak in"
              className="w-full"
            />
          </div>

          <div className="space-y-4">
            <LanguageCarousel
              selectedLanguage={toLanguage}
              onLanguageSelect={handleToLanguageSelect}
              label="Translate to"
              className="w-full"
            />
          </div>
        </div>

                {/* Quick Stats */}
        <div className="mt-12 flex justify-center gap-8 text-center">
          <div className="space-y-1">
            <div className="text-2xl font-bold text-electric">50+</div>
            <div className="text-sm text-muted-foreground">Languages</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-neon-purple">AI</div>
            <div className="text-sm text-muted-foreground">Powered</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-neon-orange">Real-time</div>
            <div className="text-sm text-muted-foreground">Translation</div>
          </div>
          <div className="space-y-1">
            <div className="text-2xl font-bold text-neon-green">{tokenUsage.used}/{tokenUsage.total}</div>
            <div className="text-sm text-muted-foreground">Tokens Used</div>
          </div>
        </div>

        {/* Token Usage Bar */}
        <div className="mt-6 max-w-md mx-auto">
          <div className="flex justify-between items-center mb-2">
            <span className="text-sm text-muted-foreground">Token Usage</span>
            <button
              onClick={() => setShowSubscription(true)}
              className="text-sm text-electric hover:text-electric/80 transition-colors"
            >
              Update Tokens
            </button>
          </div>
          <div className="w-full h-2 bg-border rounded-full overflow-hidden">
            <div
              className="h-full bg-gradient-to-r from-neon-green to-electric transition-all duration-300"
              style={{ width: `${(tokenUsage.used / tokenUsage.total) * 100}%` }}
            />
          </div>
          <div className="text-xs text-center text-muted-foreground mt-1">
            {Math.round(((tokenUsage.total - tokenUsage.used) / tokenUsage.total) * 100)}% remaining
          </div>
                </div>
      </div>
            ) : (
        /* AI Language Coach Interface - Clean & Modern */
        <div className="relative z-10 min-h-screen">
          {/* Coach Orb - Centered Beautifully */}
          <div className="flex flex-col items-center justify-center pt-16 pb-8">
            <CoachOrb
              isListening={isCoachListening}
              isSpeaking={false}
              mood={coachMood}
              className="mb-8"
            />
          </div>

          {/* Conversation Area */}
          <div className="max-w-4xl mx-auto px-6">
            {/* Welcome or Conversation */}
            {coachTranscript.length === 0 ? (
              <div className="text-center py-12">
                <h2 className="text-2xl font-bold text-electric mb-4">Ready to Practice?</h2>
                <p className="text-muted-foreground mb-8">Choose a scenario and start speaking with your AI coach</p>
              </div>
            ) : (
              <div className="bg-card/50 backdrop-blur-sm rounded-2xl border border-border p-6 mb-6 max-h-96 overflow-y-auto">
                <div className="space-y-4">
                  {coachTranscript.map((message, index) => (
                    <div key={index} className={`flex ${message.type === 'user' ? 'justify-end' : 'justify-start'}`}>
                      <div className={`max-w-md px-6 py-4 rounded-2xl ${
                        message.type === 'user'
                          ? 'bg-gradient-to-r from-electric to-neon-purple text-white'
                          : 'bg-card border border-border'
                      }`}>
                        <div className="text-sm leading-relaxed">{message.text}</div>
                        {message.correction && (
                          <div className="mt-3 p-3 rounded-lg bg-neon-orange/10 border border-neon-orange/30">
                            <div className="text-xs text-neon-orange font-semibold mb-1">✨ Better way:</div>
                            <div className="text-sm text-foreground">{message.correction}</div>
                          </div>
                        )}
                        {message.praise && (
                          <div className="mt-2 text-xs text-neon-green font-semibold">🎉 {message.praise}</div>
                        )}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Clean Controls Layout */}
            <div className="space-y-6">
              {/* Main Talk Button */}
              <div className="flex justify-center">
                <button
                  onClick={() => {
                    setIsCoachListening(!isCoachListening);
                    if (!isCoachListening) {
                      setTimeout(() => {
                        setIsCoachListening(false);
                        setCoachTranscript(prev => [...prev,
                          { type: 'user', text: 'Hello, how are you today?' },
                          {
                            type: 'coach',
                            text: 'Perfect greeting! Your pronunciation is excellent. Try adding more energy: "How are you doing today?"',
                            correction: 'How are you doing today?'
                          }
                        ]);
                        setCoachMood('praise');
                      }, 3000);
                    }
                  }}
                  className={`w-20 h-20 rounded-full border-4 transition-all duration-300 flex items-center justify-center text-white font-semibold ${
                    isCoachListening
                      ? 'border-destructive bg-gradient-to-r from-destructive to-orange-500 animate-pulse scale-110'
                      : 'border-electric bg-gradient-to-r from-electric to-neon-purple hover:scale-110 shadow-2xl shadow-electric/30'
                  }`}
                >
                  {isCoachListening ? <MicOff className="w-8 h-8" /> : <Mic className="w-8 h-8" />}
                </button>
              </div>

              {/* Scenario Dropdown */}
              <div className="flex justify-center">
                <div className="relative">
                  <select
                    value={selectedScenario}
                    onChange={(e) => setSelectedScenario(e.target.value)}
                    className="appearance-none bg-card border border-border rounded-xl px-6 py-3 pr-12 text-foreground hover:border-electric/50 transition-all cursor-pointer min-w-48"
                  >
                    <option value="casual">💬 Casual Chat</option>
                    <option value="restaurant">🍽️ Restaurant</option>
                    <option value="job">💼 Job Interview</option>
                    <option value="travel">✈️ Travel</option>
                    <option value="date">❤️ Date Night</option>
                    <option value="emergency">🚨 Emergency</option>
                  </select>
                  <ChevronDown className="absolute right-4 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground pointer-events-none" />
                </div>
              </div>

              {/* Tone Pills */}
              <div className="flex justify-center gap-3">
                {[
                  { id: 'casual', name: 'Casual', color: 'electric' },
                  { id: 'formal', name: 'Formal', color: 'neon-purple' },
                  { id: 'slang', name: 'Slang', color: 'neon-orange' },
                  { id: 'professional', name: 'Business', color: 'neon-green' }
                ].map((tone) => (
                  <button
                    key={tone.id}
                    onClick={() => setSelectedTone(tone.id)}
                    className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                      selectedTone === tone.id
                        ? 'bg-electric/20 border-electric text-electric border'
                        : 'bg-card/50 border border-border text-muted-foreground hover:border-electric/50 hover:text-electric'
                    }`}
                  >
                    {tone.name}
                  </button>
                ))}
              </div>

              {/* Helper Actions */}
              <div className="flex justify-center gap-4">
                <button
                  onClick={() => {
                    setCoachTranscript(prev => [...prev, {
                      type: 'coach',
                      text: '🧩 Quick quiz! How do you say "I\'m on my way" in Spanish?',
                      isQuiz: true
                    }]);
                    setCoachMood('thinking');
                  }}
                  className="px-6 py-3 rounded-xl bg-card border border-border hover:border-neon-yellow/50 text-muted-foreground hover:text-neon-yellow transition-all"
                >
                  🧩 Quiz Me
                </button>
                <button className="px-6 py-3 rounded-xl bg-card border border-border hover:border-neon-orange/50 text-muted-foreground hover:text-neon-orange transition-all">
                  🔄 Repeat Last
                </button>
              </div>
            </div>
          </div>

          {/* Floating Keyboard */}
          <FloatingKeyboard
            onSendMessage={(message) => {
              setCoachTranscript(prev => [...prev, { type: 'user', text: message }]);
              setTimeout(() => {
                setCoachTranscript(prev => [...prev, {
                  type: 'coach',
                  text: 'Good message! I can help you speak that more naturally.',
                }]);
              }, 1000);
            }}
            placeholder="Type your practice message..."
          />
        </div>
      )}

      {/* Settings Panel - Full Screen */}
      {showSettings && (
        <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-border">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-electric to-neon-purple bg-clip-text text-transparent">
              Settings
            </h1>
            <button
              onClick={() => setShowSettings(false)}
              className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
            >
              <span className="text-xl text-muted-foreground">×</span>
            </button>
          </div>

          {/* Settings Grid */}
          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {/* Voice Lab */}
              <button
                onClick={() => setShowVoiceLab(true)}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-electric/50 transition-all duration-300 text-left hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric/10 via-transparent to-neon-purple/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-electric/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">🎤</span>
                  </div>
                  <h3 className="text-xl font-semibold text-electric mb-2">Voice Lab</h3>
                  <p className="text-muted-foreground">Clone voices, manage voice library, create custom voices and voice settings</p>
                </div>
              </button>

              

                            {/* Default Settings */}
              <button
                onClick={() => setShowDefaultSettings(true)}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-electric/50 transition-all duration-300 text-left hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/10 via-transparent to-electric/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-neon-orange/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">⚙️</span>
                  </div>
                  <h3 className="text-xl font-semibold text-neon-orange mb-2">Default Settings</h3>
                  <p className="text-muted-foreground">View and modify your default voice and language preferences</p>
                </div>
              </button>

              {/* Subscription & Token Usage */}
              <button
                onClick={() => setShowSubscription(true)}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-electric/50 transition-all duration-300 text-left hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-green/10 via-transparent to-electric/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-neon-green/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">��</span>
                  </div>
                  <h3 className="text-xl font-semibold text-neon-green mb-2">Subscription & Tokens</h3>
                  <p className="text-muted-foreground">Manage your subscription plan and token usage</p>
                </div>
              </button>

              {/* Subscribe Now */}
              <button
                onClick={() => setShowSubscribeNow(true)}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-electric/50 transition-all duration-300 text-left hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-electric/10 via-transparent to-neon-purple/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-electric/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">����</span>
                  </div>
                  <h3 className="text-xl font-semibold text-electric mb-2">Subscribe Now</h3>
                  <p className="text-muted-foreground">Upgrade your plan for more features and tokens</p>
                </div>
              </button>

                            {/* AI Language Coach */}
              <button
                onClick={() => {setShowSettings(false); setShowCoach(true);}}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-electric/50 transition-all duration-300 text-left hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/10 via-transparent to-neon-yellow/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-neon-orange/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">🎯</span>
                  </div>
                  <h3 className="text-xl font-semibold text-neon-orange mb-2">AI Language Coach</h3>
                  <p className="text-muted-foreground">Practice conversations with your AI language coach</p>
                </div>
              </button>

              {/* User Settings */}
              <button
                onClick={() => setShowUserSettings(true)}
                className="group relative p-8 rounded-2xl bg-card border border-border hover:border-electric/50 transition-all duration-300 text-left hover:scale-105"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/10 via-transparent to-neon-pink/10 rounded-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="relative">
                  <div className="w-12 h-12 rounded-xl bg-neon-purple/20 flex items-center justify-center mb-4">
                    <span className="text-2xl">👤</span>
                  </div>
                  <h3 className="text-xl font-semibold text-neon-purple mb-2">User Settings</h3>
                  <p className="text-muted-foreground">Manage your profile, avatar and account preferences</p>
                </div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Voice Lab - Full Screen */}
      {showVoiceLab && (
        <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowVoiceLab(false)}
                className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
              >
                <span className="text-xl text-muted-foreground">←</span>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-electric to-neon-purple bg-clip-text text-transparent">
                Voice Lab
              </h1>
            </div>
            <button
              onClick={() => {setShowVoiceLab(false); setShowSettings(false);}}
              className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
            >
              <span className="text-xl text-muted-foreground">×</span>
            </button>
          </div>

          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {/* Clone Voice */}
              <div className="group relative p-6 rounded-2xl bg-card border border-border hover:border-electric/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-electric/5 via-transparent to-neon-pink/5 rounded-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-electric/20 flex items-center justify-center">
                      <span className="text-lg">🎭</span>
                    </div>
                    <h3 className="text-lg font-semibold text-electric">Clone Voice</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">Upload audio samples to create AI voice clones</p>
                                    <button
                    onClick={() => setShowCloneVoice(true)}
                    className="w-full py-3 px-4 rounded-lg bg-electric/10 border border-electric/30 text-electric hover:bg-electric/20 transition-colors"
                  >
                    Start Voice Cloning
                  </button>
                </div>
              </div>

              {/* Voice Library */}
              <div className="group relative p-6 rounded-2xl bg-card border border-border hover:border-neon-purple/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-purple/5 via-transparent to-electric/5 rounded-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-neon-purple/20 flex items-center justify-center">
                      <span className="text-lg">📚</span>
                    </div>
                    <h3 className="text-lg font-semibold text-neon-purple">Voice Library</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">Browse and select from available voice models</p>
                                    <button
                    onClick={() => setShowVoiceLibrary(true)}
                    className="w-full py-3 px-4 rounded-lg bg-neon-purple/10 border border-neon-purple/30 text-neon-purple hover:bg-neon-purple/20 transition-colors"
                  >
                    Browse Library
                  </button>
                </div>
              </div>

              {/* Create Voice */}
              <div className="group relative p-6 rounded-2xl bg-card border border-border hover:border-neon-orange/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-orange/5 via-transparent to-neon-yellow/5 rounded-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-neon-orange/20 flex items-center justify-center">
                      <span className="text-lg">🎨</span>
                    </div>
                    <h3 className="text-lg font-semibold text-neon-orange">Create Voice</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">Design and build custom voice models from scratch</p>
                                    <button
                    onClick={() => setShowCreateVoice(true)}
                    className="w-full py-3 px-4 rounded-lg bg-neon-orange/10 border border-neon-orange/30 text-neon-orange hover:bg-neon-orange/20 transition-colors"
                  >
                    Create New Voice
                  </button>
                </div>
              </div>

              {/* Saved Voices */}
              <div className="group relative p-6 rounded-2xl bg-card border border-border hover:border-neon-green/30 transition-all duration-300">
                <div className="absolute inset-0 bg-gradient-to-br from-neon-green/5 via-transparent to-electric/5 rounded-2xl" />
                <div className="relative">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 rounded-lg bg-neon-green/20 flex items-center justify-center">
                      <span className="text-lg">💾</span>
                    </div>
                    <h3 className="text-lg font-semibold text-neon-green">Saved Voices</h3>
                  </div>
                  <p className="text-muted-foreground mb-4">Manage your collection of saved and custom voices</p>
                                    <button
                    onClick={() => setShowSavedVoices(true)}
                    className="w-full py-3 px-4 rounded-lg bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20 transition-colors"
                  >
                    View Saved Voices
                  </button>
                </div>
              </div>
            </div>

                        {/* Voice Settings Section */}
            <div className="mt-8 p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-xl font-semibold text-electric mb-6">Voice Settings</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Voice Quality</label>
                    <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                      <option>High Quality (Slower)</option>
                      <option>Standard Quality</option>
                      <option>Fast Quality</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Voice Speed</label>
                    <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" className="w-full" />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Voice Pitch</label>
                    <input type="range" min="-12" max="12" step="1" defaultValue="0" className="w-full" />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Voice Emotion</label>
                    <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                      <option>Neutral</option>
                      <option>Happy</option>
                      <option>Sad</option>
                      <option>Excited</option>
                      <option>Calm</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Speech & Translation Settings - Inspired by DeepL */}
            <div className="mt-8 p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-xl font-semibold text-neon-purple mb-6">Speech & Translation Settings</h3>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                {/* Speech Recognition */}
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-input/50 border border-border">
                    <h4 className="text-lg font-semibold text-neon-purple mb-4">Speech Recognition</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Recognition Engine</label>
                        <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                          <option>ElevenLabs Whisper</option>
                          <option>Google Speech-to-Text</option>
                          <option>Azure Speech</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Microphone Sensitivity</label>
                        <input type="range" min="0" max="100" defaultValue="75" className="w-full" />
                        <div className="flex justify-between text-xs text-muted-foreground mt-1">
                          <span>Low</span>
                          <span>Normal</span>
                          <span>High</span>
                        </div>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Noise Suppression</label>
                        <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                          <option>High</option>
                          <option>Medium</option>
                          <option>Low</option>
                          <option>Off</option>
                        </select>
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-input/50 border border-border">
                    <h4 className="text-lg font-semibold text-neon-orange mb-4">Voice Analysis</h4>
                    <div className="space-y-3">
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">Tone Detection</span>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">Speed Analysis</span>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">Accent Detection</span>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">Mood Recognition</span>
                        <input type="checkbox" className="w-5 h-5" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">Pronunciation Check</span>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>

                {/* Audio & Translation Settings */}
                <div className="space-y-6">
                  <div className="p-4 rounded-xl bg-input/50 border border-border">
                    <h4 className="text-lg font-semibold text-electric mb-4">Audio Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Input Device</label>
                        <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                          <option>Default Microphone</option>
                          <option>Built-in Microphone</option>
                          <option>External USB Mic</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Output Device</label>
                        <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                          <option>Default Speakers</option>
                          <option>Built-in Speakers</option>
                          <option>Headphones</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Sample Rate</label>
                        <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                          <option>48 kHz (High Quality)</option>
                          <option>44.1 kHz (CD Quality)</option>
                          <option>22 kHz (Standard)</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Audio Buffer Size</label>
                        <input type="range" min="128" max="2048" step="128" defaultValue="512" className="w-full" />
                      </div>
                    </div>
                  </div>

                  <div className="p-4 rounded-xl bg-input/50 border border-border">
                    <h4 className="text-lg font-semibold text-neon-green mb-4">Translation Settings</h4>
                    <div className="space-y-4">
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Translation Engine</label>
                        <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                          <option>DeepL Pro</option>
                          <option>Google Translate</option>
                          <option>Azure Translator</option>
                        </select>
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-foreground mb-2">Translation Speed</label>
                        <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                          <option>Real-time</option>
                          <option>Optimized Quality</option>
                          <option>Balanced</option>
                        </select>
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">Auto-detect Language</span>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </div>
                      <div className="flex items-center justify-between">
                        <span className="text-foreground">Preserve Formatting</span>
                        <input type="checkbox" defaultChecked className="w-5 h-5" />
                      </div>
                    </div>
                  </div>
                </div>
                            </div>
            </div>

            {/* Voice Playback Controls */}
            <div className="mt-8 p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-xl font-semibold text-electric mb-6">Voice Playback Testing</h3>
              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-3">Test Text</label>
                  <textarea
                    placeholder="Enter text to test with your voice settings..."
                    className="w-full p-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground h-20 resize-none"
                    defaultValue="Hello, this is a test of the current voice settings and translation system."
                  />
                </div>
                <div className="flex gap-4">
                  <button className="px-6 py-3 rounded-lg bg-gradient-to-r from-electric to-neon-purple text-white hover:from-electric/80 hover:to-neon-purple/80 transition-all">
                    🎵 Generate Test Audio
                  </button>
                  <button className="px-6 py-3 rounded-lg bg-neon-orange/10 border border-neon-orange/30 text-neon-orange hover:bg-neon-orange/20 transition-colors">
                    Save Settings
                  </button>
                </div>
                <VoicePlayer
                  voiceName="Current Voice Settings Test"
                  sampleText="Hello, this is a test of the current voice settings and translation system."
                  variant="default"
                  className="mt-4"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Speech Lab - Full Screen */}
      {showSpeechLab && (
        <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSpeechLab(false)}
                className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
              >
                <span className="text-xl text-muted-foreground">←</span>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-electric bg-clip-text text-transparent">
                Speech Lab
              </h1>
            </div>
            <button
              onClick={() => {setShowSpeechLab(false); setShowSettings(false);}}
              className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
            >
              <span className="text-xl text-muted-foreground">×</span>
            </button>
          </div>

          <div className="container mx-auto px-6 py-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Speech Recognition Settings */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-neon-purple mb-6">Speech Recognition</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Recognition Engine</label>
                      <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                        <option>ElevenLabs Whisper</option>
                        <option>Google Speech-to-Text</option>
                        <option>Azure Speech</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Microphone Sensitivity</label>
                      <input type="range" min="0" max="100" defaultValue="75" className="w-full" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Noise Suppression</label>
                      <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                        <option>High</option>
                        <option>Medium</option>
                        <option>Low</option>
                        <option>Off</option>
                      </select>
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-neon-orange mb-6">Voice Analysis</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Tone Detection</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Speed Analysis</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Accent Detection</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Mood Recognition</span>
                      <input type="checkbox" className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Pronunciation Check</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                  </div>
                </div>
              </div>

              {/* Audio Settings */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-electric mb-6">Audio Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Input Device</label>
                      <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                        <option>Default Microphone</option>
                        <option>Built-in Microphone</option>
                        <option>External USB Mic</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Output Device</label>
                      <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                        <option>Default Speakers</option>
                        <option>Built-in Speakers</option>
                        <option>Headphones</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Sample Rate</label>
                      <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                        <option>48 kHz (High Quality)</option>
                        <option>44.1 kHz (CD Quality)</option>
                        <option>22 kHz (Standard)</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Audio Buffer Size</label>
                      <input type="range" min="128" max="2048" step="128" defaultValue="512" className="w-full" />
                    </div>
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-neon-green mb-6">Advanced Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Auto-start Recording</span>
                      <input type="checkbox" className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Voice Activity Detection</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Echo Cancellation</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Recording Timeout (seconds)</label>
                      <input type="number" min="5" max="300" defaultValue="30" className="w-full p-3 rounded-lg bg-input border border-border text-foreground" />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
                </div>
      )}

      {/* Clone Voice - Full Screen */}
      {showCloneVoice && (
        <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCloneVoice(false)}
                className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
              >
                <span className="text-xl text-muted-foreground">←</span>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-electric to-neon-pink bg-clip-text text-transparent">
                Voice Cloning Lab
              </h1>
            </div>
            <button
              onClick={() => {setShowCloneVoice(false); setShowVoiceLab(false); setShowSettings(false);}}
              className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
            >
              <span className="text-xl text-muted-foreground">×</span>
            </button>
          </div>

          <div className="container mx-auto px-6 py-8 max-w-4xl">
                        {/* Upload Section */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-electric mb-4">Upload Audio Samples</h2>
              <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                {/* Upload Area */}
                <div className="p-8 rounded-2xl bg-card border-2 border-dashed border-electric/30 hover:border-electric/50 transition-all duration-300 text-center">
                  <div className="w-16 h-16 rounded-full bg-electric/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">🎤</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Drop audio files here</h3>
                  <p className="text-muted-foreground mb-4">Or click to browse</p>
                  <button className="px-6 py-3 rounded-lg bg-electric/10 border border-electric/30 text-electric hover:bg-electric/20 transition-colors">
                    Choose Files
                  </button>
                  <div className="mt-4 text-sm text-muted-foreground">
                    Supports: MP3, WAV, M4A (Max 25MB each)
                  </div>
                </div>

                {/* Record Audio */}
                <div className="p-8 rounded-2xl bg-card border-2 border-dashed border-neon-purple/30 hover:border-neon-purple/50 transition-all duration-300 text-center">
                  <div className="w-16 h-16 rounded-full bg-neon-purple/20 flex items-center justify-center mx-auto mb-4">
                    <span className="text-2xl">{isRecording ? '⏸️' : '🎙️'}</span>
                  </div>
                  <h3 className="text-lg font-semibold text-foreground mb-2">Record Voice Sample</h3>
                  <p className="text-muted-foreground mb-4">Record directly in your browser</p>
                  <button
                    onClick={() => {
                      if (isRecording) {
                        setIsRecording(false);
                        setRecordingTime(0);
                      } else {
                        setIsRecording(true);
                        // Start timer simulation
                        const interval = setInterval(() => {
                          setRecordingTime(prev => {
                            if (prev >= 180) { // 3 minutes max
                              setIsRecording(false);
                              clearInterval(interval);
                              return 0;
                            }
                            return prev + 1;
                          });
                        }, 1000);
                      }
                    }}
                    className={`px-6 py-3 rounded-lg border transition-colors ${
                      isRecording
                        ? 'bg-destructive/10 border-destructive/30 text-destructive hover:bg-destructive/20'
                        : 'bg-neon-purple/10 border-neon-purple/30 text-neon-purple hover:bg-neon-purple/20'
                    }`}
                  >
                    {isRecording ? `Stop Recording (${Math.floor(recordingTime / 60)}:${(recordingTime % 60).toString().padStart(2, '0')})` : 'Start Recording'}
                  </button>
                  <div className="mt-4 text-sm text-muted-foreground">
                    {isRecording ? 'Maximum 3 minutes' : '1-3 minutes recommended'}
                  </div>
                </div>
              </div>

              {/* Requirements */}
              <div className="mt-6 p-6 rounded-2xl bg-card border border-border">
                <h3 className="text-lg font-semibold text-neon-purple mb-4">Requirements</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-neon-green mt-2"></div>
                      <div>
                        <div className="font-medium text-foreground">Clear Audio Quality</div>
                        <div className="text-sm text-muted-foreground">High quality, noise-free recordings</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-neon-green mt-2"></div>
                      <div>
                        <div className="font-medium text-foreground">1-3 Minutes Total</div>
                        <div className="text-sm text-muted-foreground">Perfect length for voice cloning</div>
                      </div>
                    </div>
                  </div>
                  <div className="space-y-3">
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-neon-green mt-2"></div>
                      <div>
                        <div className="font-medium text-foreground">Single Speaker</div>
                        <div className="text-sm text-muted-foreground">No background voices or music</div>
                      </div>
                    </div>
                    <div className="flex items-start gap-3">
                      <div className="w-2 h-2 rounded-full bg-neon-green mt-2"></div>
                      <div>
                        <div className="font-medium text-foreground">Consistent Tone</div>
                        <div className="text-sm text-muted-foreground">Natural speaking pace</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Uploaded Files */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-electric mb-4">Uploaded Samples (3)</h2>
              <div className="space-y-3">
                {[1, 2, 3].map((index) => (
                  <div key={index} className="p-4 rounded-xl bg-card border border-border flex items-center gap-4">
                    <div className="w-12 h-12 rounded-lg bg-electric/20 flex items-center justify-center">
                      <span className="text-lg">🎵</span>
                    </div>
                    <div className="flex-1">
                      <div className="font-medium text-foreground">voice_sample_{index}.mp3</div>
                      <div className="text-sm text-muted-foreground">2.{index + 3} MB • 1:{index + 2}0</div>
                    </div>
                    <button className="w-8 h-8 rounded-full bg-neon-green/20 text-neon-green flex items-center justify-center hover:bg-neon-green/30 transition-colors">
                      ▶
                    </button>
                    <button className="w-8 h-8 rounded-full bg-destructive/20 text-destructive flex items-center justify-center hover:bg-destructive/30 transition-colors">
                      ×
                    </button>
                  </div>
                ))}
              </div>
            </div>

            {/* Voice Settings */}
            <div className="mb-8">
              <h2 className="text-xl font-semibold text-electric mb-4">Voice Configuration</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Voice Name</label>
                    <input
                      type="text"
                      placeholder="Enter voice name..."
                      className="w-full p-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                    <textarea
                      placeholder="Describe this voice..."
                      className="w-full p-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground h-24 resize-none"
                    />
                  </div>
                </div>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Voice Category</label>
                    <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                      <option>Professional</option>
                      <option>Conversational</option>
                      <option>Narrative</option>
                      <option>Character</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Language</label>
                    <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-3">
                    <input type="checkbox" id="commercial" className="w-5 h-5" />
                    <label htmlFor="commercial" className="text-sm text-foreground">Allow commercial use</label>
                  </div>
                </div>
              </div>
            </div>

                        {/* Progress & Actions */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              {!isCloning && cloneProgress === 0 && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-electric">Ready to Clone</h3>
                    <div className="text-sm text-muted-foreground">Processing time: ~3-5 minutes</div>
                  </div>
                  <div className="flex gap-4">
                    <button className="flex-1 py-3 px-6 rounded-lg bg-electric/10 border border-electric/30 text-electric hover:bg-electric/20 transition-colors">
                      Preview Samples
                    </button>
                    <button
                      onClick={() => {
                        setIsCloning(true);
                        setCloneProgress(0);
                        // Simulate progress
                        const interval = setInterval(() => {
                          setCloneProgress(prev => {
                            if (prev >= 100) {
                              setIsCloning(false);
                              clearInterval(interval);
                              return 100;
                            }
                            return prev + 2;
                          });
                        }, 100);
                      }}
                      className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-electric to-neon-purple text-white hover:from-electric/80 hover:to-neon-purple/80 transition-all"
                    >
                      Start Cloning
                    </button>
                  </div>
                </>
              )}

              {isCloning && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-electric">Cloning in Progress</h3>
                    <div className="text-sm text-muted-foreground">{Math.round(cloneProgress)}% Complete</div>
                  </div>
                  <div className="mb-4">
                    <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                      <div
                        className="h-full bg-gradient-to-r from-electric to-neon-purple transition-all duration-300"
                        style={{ width: `${cloneProgress}%` }}
                      ></div>
                    </div>
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    {cloneProgress < 30 && "Analyzing audio samples..."}
                    {cloneProgress >= 30 && cloneProgress < 60 && "Training voice model..."}
                    {cloneProgress >= 60 && cloneProgress < 90 && "Optimizing voice quality..."}
                    {cloneProgress >= 90 && "Finalizing voice clone..."}
                  </div>
                </>
              )}

              {!isCloning && cloneProgress === 100 && (
                <>
                  <div className="flex items-center justify-between mb-4">
                    <h3 className="text-lg font-semibold text-neon-green">Cloning Complete! 🎉</h3>
                    <div className="text-sm text-neon-green">Voice ready to use</div>
                  </div>
                  <div className="mb-4 p-4 rounded-lg bg-neon-green/10 border border-neon-green/30">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-neon-green/20 flex items-center justify-center">
                        <span className="text-lg">✓</span>
                      </div>
                      <div>
                        <div className="font-semibold text-neon-green">Your Voice Clone is Ready</div>
                        <div className="text-sm text-muted-foreground">Test it out and start using it for translations</div>
                      </div>
                    </div>
                  </div>
                  <div className="flex gap-4">
                    <button className="flex-1 py-3 px-6 rounded-lg bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20 transition-colors">
                      🎵 Test Voice Clone
                    </button>
                    <button
                      onClick={() => {
                        setShowCloneVoice(false);
                        setShowSavedVoices(true);
                      }}
                      className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-neon-green to-electric text-white hover:from-neon-green/80 hover:to-electric/80 transition-all"
                    >
                      View in My Voices
                    </button>
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      )}

      {/* Voice Library - Full Screen */}
      {showVoiceLibrary && (
        <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowVoiceLibrary(false)}
                className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
              >
                <span className="text-xl text-muted-foreground">←</span>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-electric bg-clip-text text-transparent">
                Voice Library
              </h1>
            </div>
            <button
              onClick={() => {setShowVoiceLibrary(false); setShowVoiceLab(false); setShowSettings(false);}}
              className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
            >
              <span className="text-xl text-muted-foreground">×</span>
            </button>
          </div>

          <div className="container mx-auto px-6 py-8">
            {/* Search & Filters */}
            <div className="mb-8">
              <div className="flex flex-col lg:flex-row gap-4 mb-6">
                <div className="flex-1">
                  <input
                    type="text"
                    placeholder="Search voices..."
                    className="w-full p-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground"
                  />
                </div>
                <div className="flex gap-4">
                  <select className="px-4 py-3 rounded-lg bg-input border border-border text-foreground">
                    <option>All Languages</option>
                    <option>English</option>
                    <option>Spanish</option>
                    <option>French</option>
                  </select>
                  <select className="px-4 py-3 rounded-lg bg-input border border-border text-foreground">
                    <option>All Categories</option>
                    <option>Professional</option>
                    <option>Conversational</option>
                    <option>Narrative</option>
                  </select>
                </div>
              </div>
            </div>

            {/* Voice Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
              {Array.from({length: 12}).map((_, index) => (
                <div key={index} className="group p-4 rounded-2xl bg-card border border-border hover:border-electric/30 transition-all duration-300">
                  <div className="flex items-center gap-3 mb-3">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric/20 to-neon-purple/20 flex items-center justify-center">
                      <span className="text-lg">👤</span>
                    </div>
                    <div>
                      <div className="font-semibold text-foreground">Voice {index + 1}</div>
                      <div className="text-sm text-muted-foreground">Professional</div>
                    </div>
                  </div>

                  <div className="mb-3">
                    <div className="text-sm text-muted-foreground mb-1">Sample Text</div>
                    <div className="text-sm text-foreground">"Hello, this is a sample of my voice..."</div>
                  </div>

                  <div className="flex items-center gap-2 mb-3">
                    <span className="px-2 py-1 rounded-full text-xs bg-electric/20 text-electric">English</span>
                    <span className="px-2 py-1 rounded-full text-xs bg-neon-purple/20 text-neon-purple">Male</span>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 py-2 px-3 rounded-lg bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20 transition-colors text-sm">
                      ▶ Preview
                    </button>
                    <button className="flex-1 py-2 px-3 rounded-lg bg-electric/10 border border-electric/30 text-electric hover:bg-electric/20 transition-colors text-sm">
                      Select
                    </button>
                  </div>
                </div>
              ))}
            </div>

            {/* Load More */}
            <div className="text-center mt-8">
              <button className="px-8 py-3 rounded-lg bg-card border border-border hover:border-electric/50 text-foreground hover:text-electric transition-all">
                Load More Voices
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Create Voice - Full Screen */}
      {showCreateVoice && (
        <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCreateVoice(false)}
                className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
              >
                <span className="text-xl text-muted-foreground">←</span>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-orange to-neon-yellow bg-clip-text text-transparent">
                Voice Designer
              </h1>
            </div>
            <button
              onClick={() => {setShowCreateVoice(false); setShowVoiceLab(false); setShowSettings(false);}}
              className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
            >
              <span className="text-xl text-muted-foreground">×</span>
            </button>
          </div>

          <div className="container mx-auto px-6 py-8 max-w-6xl">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
              {/* Voice Parameters */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-neon-orange mb-6">Voice Characteristics</h3>
                  <div className="space-y-6">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">Gender</label>
                      <div className="flex gap-3">
                        <button className="flex-1 py-3 px-4 rounded-lg bg-electric/10 border border-electric/30 text-electric">Male</button>
                        <button className="flex-1 py-3 px-4 rounded-lg bg-card border border-border text-muted-foreground">Female</button>
                        <button className="flex-1 py-3 px-4 rounded-lg bg-card border border-border text-muted-foreground">Neutral</button>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">Age Range</label>
                      <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                        <option>Young Adult (20-30)</option>
                        <option>Adult (30-50)</option>
                        <option>Mature (50+)</option>
                        <option>Child (8-16)</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">Accent</label>
                      <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                        <option>American</option>
                        <option>British</option>
                        <option>Australian</option>
                        <option>Canadian</option>
                        <option>Irish</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">Voice Pitch</label>
                      <input type="range" min="0" max="100" defaultValue="50" className="w-full" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Deep</span>
                        <span>Normal</span>
                        <span>High</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">Speaking Rate</label>
                      <input type="range" min="0" max="100" defaultValue="50" className="w-full" />
                      <div className="flex justify-between text-xs text-muted-foreground mt-1">
                        <span>Slow</span>
                        <span>Normal</span>
                        <span>Fast</span>
                      </div>
                    </div>

                    <div>
                      <label className="block text-sm font-medium text-foreground mb-3">Emotion</label>
                      <div className="grid grid-cols-2 gap-2">
                        <button className="py-2 px-3 rounded-lg bg-neon-green/10 border border-neon-green/30 text-neon-green text-sm">Neutral</button>
                        <button className="py-2 px-3 rounded-lg bg-card border border-border text-muted-foreground text-sm">Happy</button>
                        <button className="py-2 px-3 rounded-lg bg-card border border-border text-muted-foreground text-sm">Calm</button>
                        <button className="py-2 px-3 rounded-lg bg-card border border-border text-muted-foreground text-sm">Excited</button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Preview & Test */}
              <div className="space-y-6">
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-xl font-semibold text-electric mb-6">Voice Preview</h3>

                  <div className="mb-6">
                    <label className="block text-sm font-medium text-foreground mb-3">Test Text</label>
                    <textarea
                      placeholder="Enter text to test the voice..."
                      className="w-full p-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground h-32 resize-none"
                      defaultValue="Hello, this is a test of the voice you're creating. How does it sound to you?"
                    />
                  </div>

                                    <div className="space-y-4">
                    <button className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-neon-green to-electric text-white hover:from-neon-green/80 hover:to-electric/80 transition-all">
                      🎵 Generate Preview
                    </button>

                    <VoicePlayer
                      voiceName="Custom Voice Preview"
                      sampleText="Hello, this is a test of the voice you're creating. How does it sound to you?"
                      variant="default"
                    />
                  </div>
                </div>

                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-lg font-semibold text-neon-purple mb-4">Voice Settings</h3>
                  <div className="space-y-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Voice Name</label>
                      <input
                        type="text"
                        placeholder="My Custom Voice"
                        className="w-full p-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Description</label>
                      <textarea
                        placeholder="Describe your voice..."
                        className="w-full p-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground h-20 resize-none"
                      />
                    </div>
                    <button className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-neon-orange to-neon-yellow text-white hover:from-neon-orange/80 hover:to-neon-yellow/80 transition-all">
                      Save Voice
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Saved Voices - Full Screen */}
      {showSavedVoices && (
        <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSavedVoices(false)}
                className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
              >
                <span className="text-xl text-muted-foreground">←</span>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-green to-electric bg-clip-text text-transparent">
                My Voices
              </h1>
            </div>
            <button
              onClick={() => {setShowSavedVoices(false); setShowVoiceLab(false); setShowSettings(false);}}
              className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
            >
              <span className="text-xl text-muted-foreground">×</span>
            </button>
          </div>

          <div className="container mx-auto px-6 py-8">
            {/* Stats */}
            <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
              <div className="p-4 rounded-xl bg-card border border-border text-center">
                <div className="text-2xl font-bold text-electric">12</div>
                <div className="text-sm text-muted-foreground">Total Voices</div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border text-center">
                <div className="text-2xl font-bold text-neon-purple">8</div>
                <div className="text-sm text-muted-foreground">Cloned Voices</div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border text-center">
                <div className="text-2xl font-bold text-neon-orange">4</div>
                <div className="text-sm text-muted-foreground">Custom Voices</div>
              </div>
              <div className="p-4 rounded-xl bg-card border border-border text-center">
                <div className="text-2xl font-bold text-neon-green">156</div>
                <div className="text-sm text-muted-foreground">Hours Generated</div>
              </div>
            </div>

            {/* Voice Management */}
            <div className="mb-6">
              <div className="flex justify-between items-center mb-4">
                <h2 className="text-xl font-semibold text-foreground">Voice Collection</h2>
                <div className="flex gap-3">
                  <button className="px-4 py-2 rounded-lg bg-card border border-border text-muted-foreground hover:border-electric/50 hover:text-electric transition-all">
                    Sort by Date
                  </button>
                  <button className="px-4 py-2 rounded-lg bg-electric/10 border border-electric/30 text-electric hover:bg-electric/20 transition-colors">
                    + Add Voice
                  </button>
                </div>
              </div>
            </div>

            {/* Voices Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {Array.from({length: 12}).map((_, index) => (
                <div key={index} className="p-6 rounded-2xl bg-card border border-border hover:border-electric/30 transition-all duration-300">
                  <div className="flex items-start justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-12 h-12 rounded-full bg-gradient-to-br from-electric/20 to-neon-purple/20 flex items-center justify-center">
                        <span className="text-lg">{index % 2 === 0 ? '🎭' : '🎨'}</span>
                      </div>
                      <div>
                        <div className="font-semibold text-foreground">Voice {index + 1}</div>
                        <div className="text-sm text-muted-foreground">{index % 2 === 0 ? 'Cloned Voice' : 'Custom Voice'}</div>
                      </div>
                    </div>
                    <button className="w-8 h-8 rounded-full hover:bg-muted transition-colors flex items-center justify-center">
                      <span className="text-muted-foreground">⋯</span>
                    </button>
                  </div>

                  <div className="mb-4">
                    <div className="text-sm text-muted-foreground mb-1">Description</div>
                    <div className="text-sm text-foreground">Professional voice for business presentations and narration.</div>
                  </div>

                  <div className="flex items-center gap-2 mb-4">
                    <span className="px-2 py-1 rounded-full text-xs bg-electric/20 text-electric">English</span>
                    <span className="px-2 py-1 rounded-full text-xs bg-neon-purple/20 text-neon-purple">Professional</span>
                    <span className="px-2 py-1 rounded-full text-xs bg-neon-green/20 text-neon-green">Active</span>
                  </div>

                  <div className="space-y-2">
                    <div className="flex justify-between text-sm">
                      <span className="text-muted-foreground">Usage this month</span>
                      <span className="text-foreground">{Math.floor(Math.random() * 50 + 10)} hours</span>
                    </div>
                    <div className="w-full h-1 bg-border rounded-full overflow-hidden">
                      <div className="h-full bg-gradient-to-r from-electric to-neon-purple" style={{width: `${Math.random() * 80 + 20}%`}}></div>
                    </div>
                  </div>

                                    <div className="mt-4">
                    <VoicePlayer
                      voiceName={`Voice ${index + 1}`}
                      sampleText="Professional voice for business presentations and narration."
                      variant="compact"
                      className="mb-3"
                    />
                    <div className="flex gap-2">
                      <button
                        onClick={() => {
                          // Navigate to appropriate edit section based on voice type
                          if (index % 2 === 0) {
                            // Cloned voice - go to clone voice editor
                            setShowSavedVoices(false);
                            setShowCloneVoice(true);
                          } else {
                            // Custom voice - go to voice designer
                            setShowSavedVoices(false);
                            setShowCreateVoice(true);
                          }
                        }}
                        className="flex-1 py-2 px-3 rounded-lg bg-electric/10 border border-electric/30 text-electric hover:bg-electric/20 transition-colors text-sm"
                      >
                        ✏️ Edit
                      </button>
                      <button className="flex-1 py-2 px-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive hover:bg-destructive/20 transition-colors text-sm">
                        🗑️ Delete
                      </button>
                    </div>
                  </div>
                </div>
              ))}
            </div>
                    </div>
        </div>
      )}

      {/* Default Settings - Full Screen */}
      {showDefaultSettings && (
        <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowDefaultSettings(false)}
                className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
              >
                <span className="text-xl text-muted-foreground">←</span>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-orange to-neon-yellow bg-clip-text text-transparent">
                Default Settings
              </h1>
            </div>
            <button
              onClick={() => {setShowDefaultSettings(false); setShowSettings(false);}}
              className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
            >
              <span className="text-xl text-muted-foreground">×</span>
            </button>
          </div>

          <div className="container mx-auto px-6 py-8 max-w-4xl">
            {/* Current Defaults Overview */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
              <div className="p-4 rounded-xl bg-card border border-border text-center">
                <div className="w-12 h-12 rounded-full bg-electric/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg">🎤</span>
                </div>
                <div className="text-sm text-muted-foreground mb-1">Default Voice</div>
                <div className="font-semibold text-electric">Professional Voice 1</div>
              </div>

              <div className="p-4 rounded-xl bg-card border border-border text-center">
                <div className="w-12 h-12 rounded-full bg-neon-purple/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg">🗣️</span>
                </div>
                <div className="text-sm text-muted-foreground mb-1">Default Language</div>
                <div className="font-semibold text-neon-purple">English (US)</div>
              </div>

              <div className="p-4 rounded-xl bg-card border border-border text-center">
                <div className="w-12 h-12 rounded-full bg-neon-green/20 flex items-center justify-center mx-auto mb-3">
                  <span className="text-lg">🔧</span>
                </div>
                <div className="text-sm text-muted-foreground mb-1">Voice Quality</div>
                <div className="font-semibold text-neon-green">High Quality</div>
              </div>
            </div>

            {/* Default Settings Configuration */}
            <div className="space-y-6">
              {/* Voice Defaults */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="text-lg font-semibold text-electric mb-4">Voice Defaults</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Default Voice</label>
                    <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                      <option>Professional Voice 1</option>
                      <option>Casual Voice 2</option>
                      <option>Narrator Voice 3</option>
                      <option>My Cloned Voice</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Voice Quality</label>
                    <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                      <option>High Quality (Slower)</option>
                      <option>Standard Quality</option>
                      <option>Fast Quality</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Voice Speed</label>
                    <input type="range" min="0.5" max="2" step="0.1" defaultValue="1" className="w-full" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>0.5x</span>
                      <span>1.0x</span>
                      <span>2.0x</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Voice Emotion</label>
                    <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                      <option>Neutral</option>
                      <option>Happy</option>
                      <option>Calm</option>
                      <option>Professional</option>
                    </select>
                  </div>
                </div>
              </div>

              {/* Language Defaults */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="text-lg font-semibold text-neon-purple mb-4">Language Defaults</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Default Source Language</label>
                    <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                      <option>English (US)</option>
                      <option>English (UK)</option>
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Default Target Language</label>
                    <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                      <option>Spanish</option>
                      <option>French</option>
                      <option>German</option>
                      <option>English (US)</option>
                      <option>English (UK)</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <div className="flex items-center gap-3">
                      <input type="checkbox" id="auto-detect" defaultChecked className="w-5 h-5" />
                      <label htmlFor="auto-detect" className="text-sm text-foreground">Auto-detect source language</label>
                    </div>
                  </div>
                </div>
              </div>

              {/* Audio Defaults */}
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="text-lg font-semibold text-neon-orange mb-4">Audio Defaults</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Microphone Sensitivity</label>
                    <input type="range" min="0" max="100" defaultValue="75" className="w-full" />
                    <div className="flex justify-between text-xs text-muted-foreground mt-1">
                      <span>Low</span>
                      <span>Normal</span>
                      <span>High</span>
                    </div>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Noise Suppression</label>
                    <select className="w-full p-3 rounded-lg bg-input border border-border text-foreground">
                      <option>High</option>
                      <option>Medium</option>
                      <option>Low</option>
                      <option>Off</option>
                    </select>
                  </div>
                  <div className="md:col-span-2">
                    <div className="space-y-3">
                      <div className="flex items-center gap-3">
                        <input type="checkbox" id="auto-play" defaultChecked className="w-5 h-5" />
                        <label htmlFor="auto-play" className="text-sm text-foreground">Auto-play translations</label>
                      </div>
                      <div className="flex items-center gap-3">
                        <input type="checkbox" id="voice-activity" defaultChecked className="w-5 h-5" />
                        <label htmlFor="voice-activity" className="text-sm text-foreground">Voice Activity Detection</label>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Save Actions */}
              <div className="flex gap-4">
                <button className="flex-1 py-3 px-6 rounded-lg bg-card border border-border text-muted-foreground hover:border-electric/50 hover:text-electric transition-all">
                  Reset to Defaults
                </button>
                <button className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-neon-orange to-neon-yellow text-white hover:from-neon-orange/80 hover:to-neon-yellow/80 transition-all">
                  Save Default Settings
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Subscription & Token Usage - Full Screen */}
      {showSubscription && (
        <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubscription(false)}
                className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
              >
                <span className="text-xl text-muted-foreground">←</span>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-green to-electric bg-clip-text text-transparent">
                Subscription & Tokens
              </h1>
            </div>
            <button
              onClick={() => {setShowSubscription(false); setShowSettings(false);}}
              className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
            >
              <span className="text-xl text-muted-foreground">×</span>
            </button>
          </div>

          <div className="container mx-auto px-6 py-8 max-w-4xl">
            {/* Current Plan Overview */}
            <div className="p-6 rounded-2xl bg-gradient-to-br from-neon-green/10 via-transparent to-electric/10 border border-neon-green/30 mb-8">
              <div className="flex items-center justify-between mb-4">
                <div>
                  <h2 className="text-xl font-bold text-neon-green">Basic Plan</h2>
                  <p className="text-muted-foreground">Your current subscription</p>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-electric">$9.99/month</div>
                  <div className="text-sm text-muted-foreground">Renews Jan 15, 2024</div>
                </div>
              </div>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowSubscribeNow(true)}
                  className="px-6 py-3 rounded-lg bg-gradient-to-r from-electric to-neon-purple text-white hover:from-electric/80 hover:to-neon-purple/80 transition-all"
                >
                  Upgrade Plan
                </button>
                <button className="px-6 py-3 rounded-lg bg-card border border-border text-muted-foreground hover:border-electric/50 hover:text-electric transition-all">
                  Manage Subscription
                </button>
              </div>
            </div>

            {/* Token Usage */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="text-lg font-semibold text-electric mb-4">Token Usage</h3>
                <div className="space-y-4">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Used this month</span>
                    <span className="font-semibold text-foreground">{tokenUsage.used.toLocaleString()}</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Total available</span>
                    <span className="font-semibold text-foreground">{tokenUsage.total.toLocaleString()}</span>
                  </div>
                  <div className="w-full h-3 bg-border rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-neon-green to-electric transition-all duration-300"
                      style={{ width: `${(tokenUsage.used / tokenUsage.total) * 100}%` }}
                    />
                  </div>
                  <div className="text-center text-sm text-muted-foreground">
                    {Math.round(((tokenUsage.total - tokenUsage.used) / tokenUsage.total) * 100)}% remaining
                  </div>
                </div>
              </div>

              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="text-lg font-semibold text-neon-purple mb-4">Usage Breakdown</h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Voice Generation</span>
                    <span className="font-semibold text-foreground">850</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Speech-to-Text</span>
                    <span className="font-semibold text-foreground">250</span>
                  </div>
                  <div className="flex justify-between items-center">
                    <span className="text-muted-foreground">Translation</span>
                    <span className="font-semibold text-foreground">150</span>
                  </div>
                  <div className="border-t border-border pt-2 mt-2">
                    <div className="flex justify-between items-center font-semibold">
                      <span className="text-foreground">Total Used</span>
                      <span className="text-electric">{tokenUsage.used}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Token Actions */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <button className="p-4 rounded-lg bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20 transition-colors">
                <div className="text-lg font-semibold">+1,000 Tokens</div>
                <div className="text-sm opacity-80">$4.99</div>
              </button>
              <button className="p-4 rounded-lg bg-electric/10 border border-electric/30 text-electric hover:bg-electric/20 transition-colors">
                <div className="text-lg font-semibold">+5,000 Tokens</div>
                <div className="text-sm opacity-80">$19.99</div>
              </button>
              <button className="p-4 rounded-lg bg-neon-purple/10 border border-neon-purple/30 text-neon-purple hover:bg-neon-purple/20 transition-colors">
                <div className="text-lg font-semibold">+10,000 Tokens</div>
                <div className="text-sm opacity-80">$34.99</div>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Subscribe Now - Full Screen */}
      {showSubscribeNow && (
        <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowSubscribeNow(false)}
                className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
              >
                <span className="text-xl text-muted-foreground">←</span>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-electric to-neon-purple bg-clip-text text-transparent">
                Choose Your Plan
              </h1>
            </div>
            <button
              onClick={() => {setShowSubscribeNow(false); setShowSettings(false);}}
              className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
            >
              <span className="text-xl text-muted-foreground">×</span>
            </button>
          </div>

          <div className="container mx-auto px-6 py-8">
            {/* Billing Toggle */}
            <div className="flex justify-center mb-8">
              <div className="p-1 rounded-lg bg-card border border-border">
                <div className="flex gap-1">
                  <button className="px-6 py-2 rounded-lg bg-electric text-white">Monthly</button>
                  <button className="px-6 py-2 rounded-lg text-muted-foreground hover:text-foreground transition-colors">
                    Annual
                    <span className="ml-2 px-2 py-1 rounded-full bg-neon-green/20 text-neon-green text-xs">30% off</span>
                  </button>
                </div>
              </div>
            </div>

            {/* Pricing Tiers */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
              {/* Free Tier */}
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-electric/30 transition-all duration-300">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Free</h3>
                  <div className="text-3xl font-bold text-electric mb-1">$0</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-neon-green flex items-center justify-center text-xs">✓</span>
                    <span className="text-sm text-foreground">100 tokens/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-neon-green flex items-center justify-center text-xs">✓</span>
                    <span className="text-sm text-foreground">5 languages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-neon-green flex items-center justify-center text-xs">✓</span>
                    <span className="text-sm text-foreground">Basic voice</span>
                  </li>
                </ul>
                <button className="w-full py-3 px-4 rounded-lg bg-card border border-border text-muted-foreground">
                  Current Plan
                </button>
              </div>

              {/* Basic Tier */}
              <div className="p-6 rounded-2xl bg-card border-2 border-electric hover:border-electric/50 transition-all duration-300 relative">
                <div className="absolute -top-3 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full bg-electric text-white text-sm">
                  Most Popular
                </div>
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Basic</h3>
                  <div className="text-3xl font-bold text-electric mb-1">$9.99</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-neon-green flex items-center justify-center text-xs">✓</span>
                    <span className="text-sm text-foreground">5,000 tokens/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-neon-green flex items-center justify-center text-xs">✓</span>
                    <span className="text-sm text-foreground">50+ languages</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-neon-green flex items-center justify-center text-xs">✓</span>
                    <span className="text-sm text-foreground">Voice cloning</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-neon-green flex items-center justify-center text-xs">✓</span>
                    <span className="text-sm text-foreground">Priority support</span>
                  </li>
                </ul>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-3 px-4 rounded-lg bg-gradient-to-r from-electric to-neon-purple text-white hover:from-electric/80 hover:to-neon-purple/80 transition-all"
                >
                  Upgrade Now
                </button>
              </div>

              {/* Collaborate Tier */}
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-electric/30 transition-all duration-300">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Collaborate</h3>
                  <div className="text-3xl font-bold text-electric mb-1">$29.99</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-neon-green flex items-center justify-center text-xs">✓</span>
                    <span className="text-sm text-foreground">20,000 tokens/month</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-neon-green flex items-center justify-center text-xs">✓</span>
                    <span className="text-sm text-foreground">Team collaboration</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-neon-green flex items-center justify-center text-xs">✓</span>
                    <span className="text-sm text-foreground">Advanced voices</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-neon-green flex items-center justify-center text-xs">✓</span>
                    <span className="text-sm text-foreground">API access</span>
                  </li>
                </ul>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-3 px-4 rounded-lg bg-electric/10 border border-electric/30 text-electric hover:bg-electric/20 transition-colors"
                >
                  Select Plan
                </button>
              </div>

              {/* Enterprise Tier */}
              <div className="p-6 rounded-2xl bg-card border border-border hover:border-electric/30 transition-all duration-300">
                <div className="text-center mb-6">
                  <h3 className="text-xl font-bold text-foreground mb-2">Enterprise</h3>
                  <div className="text-3xl font-bold text-electric mb-1">$99.99</div>
                  <div className="text-sm text-muted-foreground">per month</div>
                </div>
                <ul className="space-y-3 mb-6">
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-neon-green flex items-center justify-center text-xs">✓</span>
                    <span className="text-sm text-foreground">Unlimited tokens</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-neon-green flex items-center justify-center text-xs">✓</span>
                    <span className="text-sm text-foreground">Custom integrations</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-neon-green flex items-center justify-center text-xs">✓</span>
                    <span className="text-sm text-foreground">Dedicated support</span>
                  </li>
                  <li className="flex items-center gap-2">
                    <span className="w-4 h-4 rounded-full bg-neon-green flex items-center justify-center text-xs">✓</span>
                    <span className="text-sm text-foreground">SLA guarantee</span>
                  </li>
                </ul>
                <button
                  onClick={() => setShowCheckout(true)}
                  className="w-full py-3 px-4 rounded-lg bg-neon-orange/10 border border-neon-orange/30 text-neon-orange hover:bg-neon-orange/20 transition-colors"
                >
                  Contact Sales
                </button>
              </div>
            </div>

            {/* Feature Comparison Table */}
            <div className="overflow-x-auto">
              <table className="w-full bg-card border border-border rounded-2xl overflow-hidden">
                <thead>
                  <tr className="border-b border-border">
                    <th className="text-left p-4 font-semibold text-foreground">Features</th>
                    <th className="text-center p-4 font-semibold text-foreground">Free</th>
                    <th className="text-center p-4 font-semibold text-electric">Basic</th>
                    <th className="text-center p-4 font-semibold text-foreground">Collaborate</th>
                    <th className="text-center p-4 font-semibold text-foreground">Enterprise</th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-border">
                    <td className="p-4 text-muted-foreground">Monthly Tokens</td>
                    <td className="p-4 text-center">100</td>
                    <td className="p-4 text-center text-electric font-semibold">5,000</td>
                    <td className="p-4 text-center">20,000</td>
                    <td className="p-4 text-center">Unlimited</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 text-muted-foreground">Languages</td>
                    <td className="p-4 text-center">5</td>
                    <td className="p-4 text-center text-electric font-semibold">50+</td>
                    <td className="p-4 text-center">50+</td>
                    <td className="p-4 text-center">50+</td>
                  </tr>
                  <tr className="border-b border-border">
                    <td className="p-4 text-muted-foreground">Voice Cloning</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center text-electric">✅</td>
                    <td className="p-4 text-center">✅</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                  <tr>
                    <td className="p-4 text-muted-foreground">API Access</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">❌</td>
                    <td className="p-4 text-center">✅</td>
                    <td className="p-4 text-center">✅</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>
        </div>
      )}

      {/* Checkout - Full Screen */}
      {showCheckout && (
        <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowCheckout(false)}
                className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
              >
                <span className="text-xl text-muted-foreground">←</span>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-electric to-neon-purple bg-clip-text text-transparent">
                Checkout
              </h1>
            </div>
            <button
              onClick={() => {setShowCheckout(false); setShowSubscribeNow(false); setShowSettings(false);}}
              className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
            >
              <span className="text-xl text-muted-foreground">×</span>
            </button>
          </div>

          <div className="container mx-auto px-6 py-8 max-w-2xl">
            {/* Order Summary */}
            <div className="p-6 rounded-2xl bg-card border border-border mb-8">
              <h3 className="text-lg font-semibold text-electric mb-4">Order Summary</h3>
              <div className="space-y-3">
                <div className="flex justify-between items-center">
                  <span className="text-foreground">Basic Plan (Monthly)</span>
                  <span className="font-semibold text-foreground">$9.99</span>
                </div>
                <div className="flex justify-between items-center">
                  <span className="text-muted-foreground">Tax</span>
                  <span className="text-foreground">$1.20</span>
                </div>
                <div className="border-t border-border pt-3">
                  <div className="flex justify-between items-center font-semibold text-lg">
                    <span className="text-foreground">Total</span>
                    <span className="text-electric">$11.19</span>
                  </div>
                </div>
              </div>
            </div>

            {/* PayPal Payment */}
            <div className="p-6 rounded-2xl bg-card border border-border">
              <h3 className="text-lg font-semibold text-neon-orange mb-6">Payment Method</h3>

              <div className="space-y-4 mb-6">
                <button className="w-full p-4 rounded-lg bg-[#0070ba] text-white hover:bg-[#005ea6] transition-colors flex items-center justify-center gap-3">
                  <span className="font-bold text-lg">PayPal</span>
                  <span className="text-sm">Pay with PayPal</span>
                </button>

                <div className="text-center text-sm text-muted-foreground">
                  Secure payment powered by PayPal
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center gap-3">
                  <input type="checkbox" id="terms" className="w-5 h-5" />
                  <label htmlFor="terms" className="text-sm text-foreground">
                    I agree to the <span className="text-electric">Terms of Service</span> and <span className="text-electric">Privacy Policy</span>
                  </label>
                </div>

                <button
                  onClick={() => {
                    // Simulate successful payment
                    alert('Payment successful! Welcome to Basic Plan!');
                    setShowCheckout(false);
                    setShowSubscribeNow(false);
                    setShowSettings(false);
                  }}
                  className="w-full py-4 px-6 rounded-lg bg-gradient-to-r from-electric to-neon-purple text-white hover:from-electric/80 hover:to-neon-purple/80 transition-all text-lg font-semibold"
                >
                  Complete Purchase
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Settings - Full Screen */}
      {showUserSettings && (
        <div className="fixed inset-0 bg-background z-50 overflow-y-auto">
          {/* Header */}
          <div className="flex justify-between items-center p-6 border-b border-border">
            <div className="flex items-center gap-3">
              <button
                onClick={() => setShowUserSettings(false)}
                className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
              >
                <span className="text-xl text-muted-foreground">←</span>
              </button>
              <h1 className="text-2xl font-bold bg-gradient-to-r from-neon-purple to-neon-pink bg-clip-text text-transparent">
                User Settings
              </h1>
            </div>
            <button
              onClick={() => {setShowUserSettings(false); setShowSettings(false);}}
              className="w-10 h-10 rounded-full bg-card border border-border hover:border-electric/50 transition-all duration-200 flex items-center justify-center"
            >
              <span className="text-xl text-muted-foreground">×</span>
            </button>
          </div>

          <div className="container mx-auto px-6 py-8 max-w-2xl">
            {isLoggedIn ? (
              <>
                {/* User Profile */}
                <div className="p-6 rounded-2xl bg-card border border-border mb-8">
                  <h3 className="text-lg font-semibold text-neon-purple mb-6">Profile Information</h3>

                  {/* Avatar Section */}
                  <div className="flex items-center gap-6 mb-6">
                    <div className="w-20 h-20 rounded-full bg-gradient-to-br from-electric to-neon-purple flex items-center justify-center text-white text-2xl font-bold">
                      AK
                    </div>
                    <div className="flex-1">
                      <button className="px-4 py-2 rounded-lg bg-electric/10 border border-electric/30 text-electric hover:bg-electric/20 transition-colors mr-3">
                        Upload New Avatar
                      </button>
                      <button className="px-4 py-2 rounded-lg bg-card border border-border text-muted-foreground hover:border-electric/50 hover:text-electric transition-all">
                        Choose Default
                      </button>
                    </div>
                  </div>

                  {/* User Details */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Username</label>
                      <input
                        type="text"
                        defaultValue="avi_kay"
                        className="w-full p-3 rounded-lg bg-input border border-border text-foreground"
                      />
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                      <input
                        type="email"
                        defaultValue="avi@example.com"
                        className="w-full p-3 rounded-lg bg-input border border-border text-foreground"
                      />
                    </div>
                  </div>

                  <div className="flex gap-4 mt-6">
                    <button className="flex-1 py-3 px-6 rounded-lg bg-gradient-to-r from-neon-purple to-neon-pink text-white hover:from-neon-purple/80 hover:to-neon-pink/80 transition-all">
                      Save Changes
                    </button>
                    <button
                      onClick={() => setIsLoggedIn(false)}
                      className="px-6 py-3 rounded-lg bg-destructive/10 border border-destructive/30 text-destructive hover:bg-destructive/20 transition-colors"
                    >
                      Sign Out
                    </button>
                  </div>
                </div>

                {/* Account Settings */}
                <div className="p-6 rounded-2xl bg-card border border-border">
                  <h3 className="text-lg font-semibold text-electric mb-6">Account Settings</h3>
                  <div className="space-y-4">
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Email Notifications</span>
                      <input type="checkbox" defaultChecked className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Marketing Emails</span>
                      <input type="checkbox" className="w-5 h-5" />
                    </div>
                    <div className="flex items-center justify-between">
                      <span className="text-foreground">Two-Factor Authentication</span>
                      <button className="px-4 py-2 rounded-lg bg-neon-green/10 border border-neon-green/30 text-neon-green hover:bg-neon-green/20 transition-colors text-sm">
                        Enable
                      </button>
                    </div>
                  </div>
                </div>
              </>
            ) : (
              /* Login Form */
              <div className="p-6 rounded-2xl bg-card border border-border">
                <h3 className="text-lg font-semibold text-electric mb-6">Sign In to Your Account</h3>

                <div className="space-y-4 mb-6">
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Email</label>
                    <input
                      type="email"
                      placeholder="Enter your email"
                      className="w-full p-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-foreground mb-2">Password</label>
                    <input
                      type="password"
                      placeholder="Enter your password"
                      className="w-full p-3 rounded-lg bg-input border border-border text-foreground placeholder:text-muted-foreground"
                    />
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <input type="checkbox" id="remember" className="w-4 h-4" />
                      <label htmlFor="remember" className="text-sm text-muted-foreground">Remember me</label>
                    </div>
                    <button className="text-sm text-electric hover:text-electric/80 transition-colors">
                      Forgot password?
                    </button>
                  </div>
                </div>

                <div className="space-y-4">
                  <button
                    onClick={() => setIsLoggedIn(true)}
                    className="w-full py-3 px-6 rounded-lg bg-gradient-to-r from-electric to-neon-purple text-white hover:from-electric/80 hover:to-neon-purple/80 transition-all"
                  >
                    Sign In
                  </button>
                  <div className="text-center">
                    <span className="text-muted-foreground">Don't have an account? </span>
                    <button className="text-electric hover:text-electric/80 transition-colors">
                      Sign up here
                    </button>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
