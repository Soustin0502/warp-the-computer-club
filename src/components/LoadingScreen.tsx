
import { useEffect, useState } from 'react';

const LoadingScreen = ({ onLoadComplete }: { onLoadComplete: () => void }) => {
  const [isVisible, setIsVisible] = useState(true);

  useEffect(() => {
    // Simulate loading time
    const timer = setTimeout(() => {
      setIsVisible(false);
      setTimeout(onLoadComplete, 500); // Wait for fade out animation
    }, 2000);

    return () => clearTimeout(timer);
  }, [onLoadComplete]);

  if (!isVisible) {
    return (
      <div className="fixed inset-0 bg-background z-50 flex items-center justify-center opacity-0 transition-opacity duration-500 pointer-events-none">
        <div className="text-center">
          <img 
            src="./WarP Computer Club Logo.png" 
            alt="WarP Computer Club" 
            className="h-24 md:h-32 mx-auto mb-8 animate-pulse"
          />
          <div className="flex space-x-2 justify-center">
            {[...Array(3)].map((_, i) => (
              <div
                key={i}
                className="w-3 h-3 bg-primary rounded-full animate-pulse"
                style={{ animationDelay: `${i * 0.2}s` }}
              />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed inset-0 bg-background z-50 flex items-center justify-center">
      <div className="text-center">
        <img 
          src="./WarP Computer Club Logo.png" 
          alt="WarP Computer Club" 
          className="h-24 md:h-32 mx-auto mb-8 animate-pulse"
        />
        <div className="flex space-x-2 justify-center">
          {[...Array(3)].map((_, i) => (
            <div
              key={i}
              className="w-3 h-3 bg-primary rounded-full animate-bounce"
              style={{ animationDelay: `${i * 0.2}s` }}
            />
          ))}
        </div>
        <p className="text-muted-foreground font-fira text-sm mt-4">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingScreen;
