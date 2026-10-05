class SoundManager {
  private ctx: AudioContext | null = null;
  private bgmInterval: any = null;

  public isSoundEnabled: boolean = true;
  public isBgmEnabled: boolean = true;

  constructor() {
    const savedSound = localStorage.getItem('setting_sound');
    const savedBgm = localStorage.getItem('setting_bgm');

    if (savedSound !== null) this.isSoundEnabled = savedSound === 'true';
    if (savedBgm !== null) this.isBgmEnabled = savedBgm === 'true';

    if (this.isBgmEnabled) {
      this.playBgm();
    }
  }

  private getContext(): AudioContext {
    if (!this.ctx) {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
      this.ctx = new AudioCtx();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
    return this.ctx;
  }

  playPop() {
    if (!this.isSoundEnabled) return;
    try {
      const ctx = this.getContext();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sine';
      osc.frequency.setValueAtTime(450, ctx.currentTime);
      osc.frequency.exponentialRampToValueAtTime 
        ? osc.frequency.exponentialRampToValueAtTime(850, ctx.currentTime + 0.1)
        : osc.frequency.linearRampToValueAtTime(850, ctx.currentTime + 0.1);
      
      gain.gain.setValueAtTime(0.25, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.001, ctx.currentTime + 0.1);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start();
      osc.stop(ctx.currentTime + 0.1);
    } catch (e) {}
  }

  playSuccess() {
    if (!this.isSoundEnabled) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      [523.25, 659.25, 783.99, 1046.5].forEach((freq, index) => {
        const osc = ctx.createOscillator();
        const gain = ctx.createGain();
        osc.type = 'triangle';
        osc.frequency.setValueAtTime(freq, now + index * 0.08);
        gain.gain.setValueAtTime(0.15, now + index * 0.08);
        gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.08 + 0.3);
        
        osc.connect(gain);
        gain.connect(ctx.destination);
        osc.start(now + index * 0.08);
        osc.stop(now + index * 0.08 + 0.3);
      });
    } catch (e) {}
  }

  playWrong() {
    if (!this.isSoundEnabled) return;
    try {
      const ctx = this.getContext();
      const now = ctx.currentTime;
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();
      osc.type = 'sawtooth';
      osc.frequency.setValueAtTime(180, now);
      osc.frequency.exponentialRampToValueAtTime(110, now + 0.25);
      
      gain.gain.setValueAtTime(0.15, now);
      gain.gain.exponentialRampToValueAtTime(0.001, now + 0.25);
      
      osc.connect(gain);
      gain.connect(ctx.destination);
      osc.start(now);
      osc.stop(now + 0.25);
    } catch (e) {}
  }

  playBgm() {
    if (!this.isBgmEnabled) return;
    if (this.bgmInterval) return;

    // Vòng hòa âm phong cách khám phá vũ trụ mộng mơ & vui tươi (Chords)
    const progressions = [
      [261.63, 329.63, 392.00, 523.25], // C Major
      [220.00, 261.63, 329.63, 440.00], // A minor
      [349.23, 440.00, 523.25, 698.46], // F Major
      [392.00, 493.88, 587.33, 783.99]  // G Major
    ];

    // Giai điệu rải phím (Arpeggio) cuốn hút và uyển chuyển
    const arpNotes = [523.25, 659.25, 783.99, 1046.5, 783.99, 659.25, 587.33, 493.88];
    let step = 0;

    this.bgmInterval = setInterval(() => {
      if (!this.isBgmEnabled) return;
      try {
        const ctx = this.getContext();
        const now = ctx.currentTime;

        // Tạo bộ lọc tần số (Lowpass Filter) giúp âm thanh ấm áp, không bị chói tai hay khô khan
        const filter = ctx.createBiquadFilter();
        filter.type = 'lowpass';
        filter.frequency.setValueAtTime(1200, now);
        filter.connect(ctx.destination);

        // 1. Lớp nền đệm hợp âm (Chord Pad) mượt mà
        const chord = progressions[Math.floor(step / 8) % progressions.length];
        chord.forEach((freq) => {
          const osc = ctx.createOscillator();
          const gain = ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq / 2, now);
          
          gain.gain.setValueAtTime(0.001, now);
          gain.gain.linearRampToValueAtTime(0.025, now + 0.2); // Fade in mượt
          gain.gain.exponentialRampToValueAtTime(0.001, now + 0.7); // Fade out êm
          
          osc.connect(gain);
          gain.connect(filter);
          osc.start(now);
          osc.stop(now + 0.7);
        });

        // 2. Lớp giai điệu chính (Arpeggio) bay bổng
        const leadOsc = ctx.createOscillator();
        const leadGain = ctx.createGain();
        leadOsc.type = 'triangle'; // Sóng tam giác cho âm thanh trong trẻo, giống đàn hộp âm nhạc
        leadOsc.frequency.setValueAtTime(arpNotes[step % arpNotes.length], now);
        
        leadGain.gain.setValueAtTime(0.04, now);
        leadGain.gain.exponentialRampToValueAtTime(0.001, now + 0.35);
        
        leadOsc.connect(leadGain);
        leadGain.connect(filter);
        leadOsc.start(now);
        leadOsc.stop(now + 0.35);

        step++;
      } catch (e) {}
    }, 280); // Nhịp độ vừa phải, đung đưa và cực kỳ cuốn hút
  }

  pauseBgm() {
    if (this.bgmInterval) {
      clearInterval(this.bgmInterval);
      this.bgmInterval = null;
    }
  }

  toggleSound(enabled: boolean) {
    this.isSoundEnabled = enabled;
    localStorage.setItem('setting_sound', String(enabled));
  }

  toggleBgm(enabled: boolean) {
    this.isBgmEnabled = enabled;
    localStorage.setItem('setting_bgm', String(enabled));
    if (enabled) {
      this.playBgm();
    } else {
      this.pauseBgm();
    }
  }
}

export const soundManager = new SoundManager();

let activeAudio: HTMLAudioElement | null = null;

export const speakText = (text: string) => {
  if (!text) return;

  if (activeAudio) {
    activeAudio.pause();
    activeAudio = null;
  }
  if ('speechSynthesis' in window) {
    window.speechSynthesis.cancel();
  }

  const cleanText = encodeURIComponent(text.trim());
  const ttsUrl = `https://translate.google.com/translate_tts?ie=UTF-8&q=${cleanText}&tl=vi&total=1&idx=0&textlen=${text.length}&client=tw-ob`;

  const audio = new Audio();
  audio.src = ttsUrl;
  audio.playbackRate = 0.95;
  activeAudio = audio;

  audio.play().catch(() => {
    if ('speechSynthesis' in window) {
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = 0.92;
      utterance.pitch = 1.2;
      window.speechSynthesis.speak(utterance);
    }
  });
};