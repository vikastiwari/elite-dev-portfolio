import React, { useState } from 'react';

interface ProjectVideoPlayerProps {
  mediaSrc: string;
  title: string;
}

export default function ProjectVideoPlayer({ mediaSrc, title }: ProjectVideoPlayerProps) {
  const [isMuted, setIsMuted] = useState(true);
  const [volume, setVolume] = useState(50);
  const [isHovered, setIsHovered] = useState(false);

  const toggleMute = (e: React.MouseEvent) => {
    e.preventDefault();
    setIsMuted(!isMuted);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = parseInt(e.target.value);
    setVolume(val);
    if (val === 0) setIsMuted(true);
    else setIsMuted(false);
  };

  return (
    <div 
      className="absolute inset-0 w-full h-full"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <img 
        src={mediaSrc} 
        alt={title} 
        // Using object-contain ensures the animation isn't cut off on the sides
        className="absolute inset-0 w-full h-full object-contain opacity-90 group-hover:opacity-100 transition-opacity duration-500" 
        loading="lazy" 
      />
      
      {/* Video Player UI Overlay */}
      <div className={`absolute bottom-0 left-0 w-full p-4 bg-gradient-to-t from-dark-900 via-dark-900/80 to-transparent transition-opacity duration-300 z-20 ${isHovered ? 'opacity-100' : 'opacity-0'}`}>
        <div className="flex items-center gap-4 text-white">
          <button 
            onClick={toggleMute}
            className="w-8 h-8 flex items-center justify-center rounded-full bg-black/50 hover:bg-brand-500/50 backdrop-blur transition-colors border border-white/10"
            title={isMuted ? "Unmute" : "Mute"}
          >
            <i className={`fa-solid text-sm ${isMuted ? 'fa-volume-xmark' : volume > 50 ? 'fa-volume-high' : 'fa-volume-low'}`}></i>
          </button>
          
          <input 
            type="range" 
            min="0" 
            max="100" 
            value={isMuted ? 0 : volume} 
            onChange={handleVolumeChange}
            className="w-24 h-1 bg-white/20 rounded-lg appearance-none cursor-pointer accent-brand-500"
          />
          
          <div className="text-xs font-mono text-white/60 ml-auto flex gap-2 items-center bg-black/50 px-2 py-1 rounded border border-white/10 backdrop-blur">
            <span className="w-2 h-2 rounded-full bg-red-500 animate-pulse"></span>
            LIVE DEMO
          </div>
        </div>
      </div>
    </div>
  );
}
