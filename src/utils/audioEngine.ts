class AudioEngine {
  private ctx: AudioContext | null = null;
  public enabled = false;
  private lastHoverTime = 0;
  private lastClickTime = 0;

  private musicOscillators: OscillatorNode[] = [];
  private musicGain: GainNode | null = null;

  init() {
    if (typeof window !== 'undefined' && !this.ctx) {
      const AudioContextClass = window.AudioContext || (window as any).webkitAudioContext;
      if (AudioContextClass) {
        this.ctx = new AudioContextClass();
        this.enabled = true;
      }
    }
  }

  playHover() {
    if (!this.enabled || !this.ctx) return;
    if (this.ctx.currentTime - this.lastHoverTime < 0.05) return;
    this.lastHoverTime = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'sine';
    osc.frequency.setValueAtTime(400, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(800, this.ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.05, this.ctx.currentTime + 0.05);
    gain.gain.linearRampToValueAtTime(0, this.ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playClick() {
    if (!this.enabled || !this.ctx) return;
    if (this.ctx.currentTime - this.lastClickTime < 0.1) return;
    this.lastClickTime = this.ctx.currentTime;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    
    osc.type = 'square';
    osc.frequency.setValueAtTime(150, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(40, this.ctx.currentTime + 0.1);
    
    gain.gain.setValueAtTime(0.1, this.ctx.currentTime);
    gain.gain.linearRampToValueAtTime(0.01, this.ctx.currentTime + 0.1);
    
    osc.connect(gain);
    gain.connect(this.ctx.destination);
    
    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playMusic(type: 'light' | 'intense') {
    if (!this.enabled || !this.ctx) return;
    this.stopMusic();

    this.musicGain = this.ctx.createGain();
    this.musicGain.connect(this.ctx.destination);
    this.musicGain.gain.value = 0.03; // very quiet background

    if (type === 'light') {
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sine';
      osc1.frequency.value = 55; // A1
      osc1.connect(this.musicGain);
      osc1.start();
      
      const osc2 = this.ctx.createOscillator();
      osc2.type = 'triangle';
      osc2.frequency.value = 110; // A2
      
      const lfo = this.ctx.createOscillator();
      lfo.frequency.value = 0.1;
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 0.02;
      lfo.connect(lfoGain.gain);
      osc2.connect(lfoGain).connect(this.musicGain);
      osc2.start();
      lfo.start();

      this.musicOscillators.push(osc1, osc2, lfo);
    } else {
      const osc1 = this.ctx.createOscillator();
      osc1.type = 'sawtooth';
      osc1.frequency.value = 65.41; // C2
      
      const lfo = this.ctx.createOscillator();
      lfo.type = 'square';
      lfo.frequency.value = 4; // 4Hz pulse
      
      const lfoGain = this.ctx.createGain();
      lfoGain.gain.value = 0.05;
      lfo.connect(lfoGain.gain);
      
      osc1.connect(lfoGain).connect(this.musicGain);
      osc1.start();
      lfo.start();

      this.musicOscillators.push(osc1, lfo);
    }
  }

  stopMusic() {
    this.musicOscillators.forEach(osc => {
      try { osc.stop(); } catch(e){}
    });
    this.musicOscillators = [];
    if (this.musicGain) {
      this.musicGain.disconnect();
      this.musicGain = null;
    }
  }
}

export const audioEngine = new AudioEngine();
