import { useEffect, useState } from 'react';
import { motion, useAnimation } from 'framer-motion';
import { useInView } from 'react-intersection-observer';

export const LoadingAni = () => {
  return (
    <div className="m-5 flex items-center justify-center">
      <div className="h-12 w-12 animate-spin rounded-full border-4 border-solid border-[#00EA5E] border-t-transparent"></div>
    </div>
  );
};

export function useTypingAni(content: string) {
  const [text, setText] = useState('');
  const [characterCount, setCharacterCount] = useState(0);
  const [isEnd, setIsEnd] = useState(false);

  useEffect(() => {
    if (isEnd) return;
    const typeEvent = setInterval(() => {
      setCharacterCount((prev) => prev + 1);
      setText((prev) => prev + content[characterCount]);
    }, 100);

    if (text.length > content.length - 1) {
      setIsEnd(true);
      clearInterval(typeEvent);
    }

    return () => clearInterval(typeEvent);
  }, [text, isEnd]);
  return { text, isEnd };
}

interface ScrollFadeInProps {
  children: React.ReactNode;
  delay?: number;
  yOffset?: number;
}

export const ScrollFadeIn = ({
  children,
  delay = 0,
  yOffset = 20,
}: ScrollFadeInProps) => {
  const controls = useAnimation();
  const [ref, inView] = useInView({ triggerOnce: false });

  useEffect(() => {
    if (inView) {
      controls.start({
        opacity: 1,
        y: 0,
        transition: { duration: 0.6, delay },
      });
    }
  }, [controls, inView, delay]);

  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: yOffset }}
      animate={controls}
    >
      {children}
    </motion.div>
  );
};
