import React, { useState, useEffect, useRef } from 'react';
import './App.css';
import TypingAnimation from './typing-animation';
import backgroundImage from './bg.png';
import NumberTicker from './number-ticker';

function App() {
  const videoRef = useRef(null);
  const audioRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateCursorPosition);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
    };
  }, []);

  const handleImageClick = () => {
    if (audioRef.current) {
      audioRef.current.currentTime = 0; // Reset audio to start
      audioRef.current.play();
    }
  };

  return (
    <div 
      className="h-screen w-screen flex justify-center items-center cursor-none relative overflow-hidden"
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center center',
        backgroundSize: 'cover',
      }}
    >
      <div
        className="custom-cursor"
        style={{
          position: 'fixed',
          left: `${cursorPosition.x}px`,
          top: `${cursorPosition.y}px`,
          pointerEvents: 'none',
          zIndex: 9999,
          fontSize: '32px',
        }}
      >
        💰
      </div>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        playsInline
        className="absolute inset-0 w-full h-full object-cover opacity-55"
        style={{ pointerEvents: 'none' }}
      >
        <source src={`${process.env.PUBLIC_URL}/vid1.mp4`} type="video/mp4" />
      </video>
      <div className='absolute top-[22%] md:top-[17%] z-20 text-[#2d42ff] font-custom1 text-[44px] md:text-5xl'>
        benjamin
      </div>
      <img 
        src="benji.png" 
        className='w-[90%] md:w-[50%] z-10 transition-transform duration-300 ease-in-out md:hover:scale-105 cursor-none' 
        alt="Benji" 
        onClick={handleImageClick}
      />
      <audio ref={audioRef} src={`${process.env.PUBLIC_URL}/m.mp3`} />
      <div className='absolute top-5 left-5 flex justify-center items-center z-10'>
        <a href="https://x.com/" className='cursor-none'>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-10 md:size-12 md:hover:scale-105 transition ease-in-out duration-150' fill="#2563eb" viewBox="0 0 50 50">
            <path d="M 6.9199219 6 L 21.136719 26.726562 L 6.2285156 44 L 9.40625 44 L 22.544922 28.777344 L 32.986328 44 L 43 44 L 28.123047 22.3125 L 42.203125 6 L 39.027344 6 L 26.716797 20.261719 L 16.933594 6 L 6.9199219 6 z"></path>
          </svg>
        </a>
        <a href="https://t.me/" className='cursor-none'>
          <svg xmlns="http://www.w3.org/2000/svg" x="0px" y="0px" className='size-10 md:size-12 md:hover:scale-105 transition ease-in-out duration-150' fill="#2563eb" viewBox="0 0 50 50">
            <path d="M46.137,6.552c-0.75-0.636-1.928-0.727-3.146-0.238l-0.002,0C41.708,6.828,6.728,21.832,5.304,22.445	c-0.259,0.09-2.521,0.934-2.288,2.814c0.208,1.695,2.026,2.397,2.248,2.478l8.893,3.045c0.59,1.964,2.765,9.21,3.246,10.758	c0.3,0.965,0.789,2.233,1.646,2.494c0.752,0.29,1.5,0.025,1.984-0.355l5.437-5.043l8.777,6.845l0.209,0.125	c0.596,0.264,1.167,0.396,1.712,0.396c0.421,0,0.825-0.079,1.211-0.237c1.315-0.54,1.841-1.793,1.896-1.935l6.556-34.077	C47.231,7.933,46.675,7.007,46.137,6.552z M22,32l-3,8l-3-10l23-17L22,32z"></path>
          </svg>
        </a>
      </div>
      <div className='absolute inset-0 h-screen w-screen opacity-10 bg-white'></div>
      <div className='text-5xl font-custom absolute bottom-[15%] left-[10%] text-[#52ff57] md:flex hidden'>
        +&nbsp;$<NumberTicker className="text-[#52ff57]" value={1370} />
      </div>
      <div className='text-5xl font-custom absolute right-[17%] bottom-[17%] text-[#52ff57] flex'>
        +&nbsp;$<NumberTicker className="text-[#52ff57]" value={433} />
      </div>
      <div className='text-5xl font-custom absolute right-[17%] top-0 md:top-[10%] text-[#52ff57] flex'>
        +&nbsp;$<NumberTicker className="text-[#52ff57]" value={629} />
      </div>
      <div className='text-5xl font-custom absolute left-[17%] top-[35%] text-[#52ff57] flex'>
        +&nbsp;$<NumberTicker className="text-[#52ff57]" value={895} />
      </div>
      <div className='text-5xl font-custom absolute left-[17%] top-[4%] text-[#52ff57] flex'>
        +&nbsp;$<NumberTicker className="text-[#52ff57]" value={1496} />
      </div>
      <div className='text-5xl font-custom absolute right-[13%] top-[32%] text-[#52ff57] flex'>
        +&nbsp;$<NumberTicker className="text-[#52ff57]" value={1215} />
      </div>
      <div className='text-5xl font-custom absolute left-[17%] top-[59%] text-[#52ff57] flex'>
        +&nbsp;$<NumberTicker className="text-[#52ff57]" value={620} />
      </div>
    </div>
  );
}

export default App;