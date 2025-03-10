'use client';

import { useEffect, useRef, useState } from 'react';
import styles from './page.module.scss';
import Image from 'next/image';
import Lenis from '@studio-freight/lenis';
import { useTransform, useScroll, motion, MotionValue } from 'framer-motion';

const images: string[] = [
  "mirage.jpg", "kimoyologo.jpg", "japan.png", "mirage.jpg", "japan.png", "mirage.jpg",
  "logo.jpg", "mirage.jpg", "mirage.jpg", "blackbuck.png", "mirage.jpg", "logo.jpg"
];

export default function Grid() {
  const gallery = useRef<HTMLDivElement | null>(null);
  const [dimension, setDimension] = useState({ width: 0, height: 0 });

  const { scrollYProgress } = useScroll({
    target: gallery,
    offset: ['start end', 'end start']
  });

  const { height } = dimension;
  const isMobile = dimension.width <= 768;
  const mobileScale = isMobile ? 0.5 : 1; // Scale factor for mobile
  const y = useTransform(scrollYProgress, [0, 1], [0, height * 2 * mobileScale]);
  const y2 = useTransform(scrollYProgress, [0, 1], [0, height * 3.3 * mobileScale]);
  const y3 = useTransform(scrollYProgress, [0, 1], [0, height * 1.25 * mobileScale]);
  const y4 = useTransform(scrollYProgress, [0, 1], [0, height * 3 * mobileScale]);

  useEffect(() => {
    const lenis = new Lenis();

    const raf = (time: number) => {
      lenis.raf(time);
      requestAnimationFrame(raf);
    };

    const resize = () => {
      setDimension({ width: window.innerWidth, height: window.innerHeight });
    };

    window.addEventListener("resize", resize);
    requestAnimationFrame(raf);
    resize();

    return () => {
      window.removeEventListener("resize", resize);
    };
  }, []);

  return (
    <main className={styles.main}>
      <div className={styles.spacer}></div>
      <div ref={gallery} className={styles.gallery}>
        <Column images={[images[0], images[1], images[2]]} y={y} />
        <Column images={[images[3], images[4], images[5]]} y={y2} />
        <Column images={[images[6], images[7], images[8]]} y={y3} />
        <Column images={[images[9], images[10], images[11]]} y={y4} />
      </div>
      <div className={styles.spacer}></div>
    </main>
  );
}

type ColumnProps = {
  images: string[];
  y: MotionValue<number>;
};

const Column: React.FC<ColumnProps> = ({ images, y }) => {
  return (
    <motion.div className={styles.column} style={{ y }}>
      {images.map((src, i) => (
        <div key={i} className={styles.imageContainer}>
          <Image src={`/images/${src}`} alt='image' fill />
        </div>
      ))}
    </motion.div>
  );
};
