import styles from './styles.module.css';
import { useEffect, useRef } from 'react';

export default function ProgressBar() {
  const barRef = useRef(null);

  useEffect(() => {
    function handleScroll() {
      const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
      const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
      const scrolled = (winScroll / height) * 100;
      if (barRef.current) {
        barRef.current.style.width = scrolled + "%";
      }
    }

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className={styles.progressBarContainer}>
      <div className={styles.progressBar} ref={barRef}></div>
    </div>
  );
}
