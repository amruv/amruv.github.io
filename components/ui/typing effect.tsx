import React, { useState, useEffect } from 'react';

interface TypingAnimationProps {
  texts: string[];
  speed?: number;
  deleteSpeed?: number;
  pauseDuration?: number;
  className?: string;
}

const TypingAnimation: React.FC<TypingAnimationProps> = ({
  texts,
  speed = 100,
  deleteSpeed = 50,
  pauseDuration = 2000,
  className = ""
}) => {
  const [displayText, setDisplayText] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (texts.length === 0) return;

    const currentText = texts[currentIndex];
    let timeout: NodeJS.Timeout;

    if (isPaused) {
      timeout = setTimeout(() => {
        setIsPaused(false);
        setIsDeleting(true);
      }, pauseDuration);
    } else if (isDeleting) {
      if (displayText.length === 0) {
        setIsDeleting(false);
        setCurrentIndex((prev) => (prev + 1) % texts.length);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length - 1));
        }, deleteSpeed);
      }
    } else {
      if (displayText === currentText) {
        setIsPaused(true);
      } else {
        timeout = setTimeout(() => {
          setDisplayText(currentText.substring(0, displayText.length + 1));
        }, speed);
      }
    }

    return () => clearTimeout(timeout);
  }, [displayText, currentIndex, isDeleting, isPaused, texts, speed, deleteSpeed, pauseDuration]);

  return (
    <span className={className}>
      {displayText}
      <span className="animate-pulse">|</span>
    </span>
  );
};

// // Usage component for your specific case
// const MLResearcherHeading: React.FC = () => {
//   return (
//     <h1 className="text-5xl lg:text-6xl font-bold mb-6">
//       <span className="text-primary">Dr. [Your Name]</span>
//       <br />
//       <TypingAnimation 
//         texts={[
//           "ML Researcher",
//           "Data Scientist", 
//           "AI Engineer",
//           "Deep Learning Expert"
//         ]}
//         speed={100}
//         deleteSpeed={50}
//         pauseDuration={2000}
//         className="text-muted-foreground"
//       />
//     </h1>
//   );
// };

export default TypingAnimation;
// export { MLResearcherHeading };