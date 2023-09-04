import { useEffect, useRef } from 'react';
import lottie from 'lottie-web';
interface LottieProp {
  className?: string
  path?: string
  autoPlay?: boolean
  play?: boolean
}
export default function Lottie({ className = '', path = '', autoPlay = true, play = false } : LottieProp) {
  const container = useRef<HTMLDivElement>(null);
  useEffect(() => {
    lottie.loadAnimation({
      container: container.current as HTMLDivElement, // the dom element that will contain the animation
      renderer: 'svg',
      loop: true,
      autoplay: autoPlay,
      path
    });
    return () => { lottie.destroy(); };
  }, []);
  useEffect(() => {
    if (autoPlay) return;
    if (play) {
      lottie.play();
    } else {
      lottie.pause();
    }
  }, [play]);
  return (
    <div ref={container} className={className}></div>
  );
}