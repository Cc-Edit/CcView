import styles from './Logo.module.css';
import { gsap } from 'gsap';
import type GSAPTimeline from 'gsap';
import { useEffect, useRef } from 'react';
import { useAppSelector } from '@/store';
import useThemeSwitch from '@/components/Design/hook/useThemeSwitch';

interface LogoProps {
  style?: Record<string, any>
  className?: string
  hideOth?: boolean
}

// 学习： https://dev.to/franklin030601/animations-with-gsap-react-1nok
export default function Logo({ style, className, hideOth = false }: LogoProps) {
  const { theme } = useThemeSwitch();
  const bgColor = theme === 'dark' ? '#404040' : '#9ca3af';
  const logo = useRef<SVGSVGElement>(null);
  const tl = useRef<GSAPTimeline>();
  useEffect(() => {
    let ctx = gsap.context(() => {
      tl.current = gsap.timeline({
        repeat: -1,
        yoyo: true
      }).to('.blob', {
        scale: 1.1, duration: 4, ease: 'none'
      })
        .to('.blob', {
          scale: 1, duration: 4, ease: 'none'
        })
        .to('.blob', {
          scale: 0.9, duration: 4, ease: 'none'
        });
    }, logo);
    return () => ctx.revert();
  }, []);
  return (
    <svg style={style} ref={logo} version='1.1' width='200' height='100' xmlns='http://www.w3.org/2000/svg'
         className={`${className} ${styles.logo}`}>
      <defs>
        <filter id='goo'>
          <feGaussianBlur in='SourceGraphic' result='blur' stdDeviation='10'/>
          <feColorMatrix in='blur' mode='matrix' values='1 0 0 0 0  0 1 0 0 0  0 0 1 0 0  0 0 0 18 -7' result='goo'/>
          <feBlend in2='goo' in='SourceGraphic' result='mix'/>
        </filter>
        <pattern id='pattern1' patternUnits='userSpaceOnUse' width='100%' height='100%'>
          <rect x='0' y='0' fill={hideOth ? 'rgba(0,0,0,0)' : bgColor} width='100%' height='100%'></rect>
          <text x='60' y='70' fill='#facc15' fontSize='60'>Cc</text>
        </pattern>
      </defs>
      <mask id='maska'>
        <g className={styles.b2lobs} filter='url(#goo)'>
          <circle className='blob' cx='130' cy='20' r='12' fill='#ffffff'/>
          <circle className='blob' cx='120' cy='60' r='22' fill='#ffffff'/>
          <circle className='blob' cx='30' cy='75' r='16' fill='#ffffff'/>
          <circle className='blob' cx='80' cy='50' r='30' fill='#ffffff'/>
          <circle className='blob' cx='170' cy='60' r='17' fill='#ffffff'/>
        </g>
      </mask>
      <rect x='0' y='0' mask={hideOth ? 'rgba(0,0,0,0)' : 'url(#maska)'} fill='url(#pattern1)' width='200'
            height='200'/>
    </svg>
  );
}