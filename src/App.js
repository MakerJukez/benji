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
    <div className="h-screen w-screen flex justify-center items-center cursor-none relative overflow-hidden">
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
        className="absolute inset-0 w-full h-full object-cover"
        style={{ pointerEvents: 'none' }}
      >
        <source src={`${process.env.PUBLIC_URL}/vid1.mp4`} type="video/mp4" />
      </video>
      
      {fallingBenjis.map(benji => (
        <img 
          key={benji.id}
          src="benji.png"
          alt="Falling Benji"
          className="absolute size-20 md:size-36 object-contain"
          style={{
            left: `${benji.left}%`,
            animation: `fall ${benji.animationDuration}s linear`,
          }}
        />
      ))}

      <div className='absolute z-20 text-[#2d42ff] font-custom1 text-4xl md:text-7xl'>
        benjamin
      </div>
      <div className='absolute top-5 font-custom1 text-[8px] md:text-base text-[#2d42ff]'>CA: updating...</div>
      <div className='absolute bottom-5 left-5 flex justify-center items-center z-10'>
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
    </div>
  );
}

export default App;