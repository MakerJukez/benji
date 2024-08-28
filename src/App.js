import React, { useState, useEffect, useRef } from 'react';
import './App.css';

function App() {
  const videoRef = useRef(null);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [fallingBenjis, setFallingBenjis] = useState([]);

  useEffect(() => {
    const updateCursorPosition = (e) => {
      setCursorPosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', updateCursorPosition);

    const createFallingBenji = () => {
      const newBenji = {
        id: Date.now(),
        left: Math.random() * 100,
        animationDuration: 5 + Math.random() * 5,
      };
      setFallingBenjis(prevBenjis => [...prevBenjis, newBenji]);

      setTimeout(() => {
        setFallingBenjis(prevBenjis => prevBenjis.filter(benji => benji.id !== newBenji.id));
      }, newBenji.animationDuration * 1000);
    };

    const intervalId = setInterval(createFallingBenji, 500);

    return () => {
      window.removeEventListener('mousemove', updateCursorPosition);
      clearInterval(intervalId);
    };
  }, []);

  return (
    <div className="h-screen w-screen flex justify-center items-center cursor-none relative overflow-hidden bg-[#06ff5d]">
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
        💸
      </div>
      
      {fallingBenjis.map(benji => (
        <img 
          key={benji.id}
          src="benji.png"
          alt="Falling Benji"
          className="absolute size-24 md:size-36 object-contain"
          style={{
            left: `${benji.left}%`,
            animation: `fall ${benji.animationDuration}s linear`,
          }}
        />
      ))}

      <div className='absolute z-20 text-[#2d42ff] font-custom1 text-4xl md:text-7xl'>
        benji
      </div>
      <div className='absolute top-5 font-custom1 text-[8px] md:text-base text-[#2d42ff]'>CA: 9tajEnCZHaKF2fugkvVipkSSKV9T92PuxtxGUy2oTRZW</div>
      <div className='absolute inset-0 h-screen w-screen opacity-10 bg-white'></div>
    </div>
  );
}

export default App;