import { useEffect, useState } from "react";

interface useGetToastProgressProps {
    toastWidth: number;
    duration: number;
}

export const useGetToastProgress = ({ toastWidth, duration }: useGetToastProgressProps) => {
    const [ progress, setProgress ] = useState(100);

    useEffect(() => {
        if (toastWidth === 0) return; // Prevent running until we have the width
    
        const intervalTime = 50; // Update every 50ms
        const decrement = (100 / duration) * (intervalTime); // Percentage per interval
    
        const interval = setInterval(() => {
          setProgress((prev) => {
            if (prev <= 0) {
              clearInterval(interval);
              return 0;
            }
            return prev - decrement;
          });
        }, intervalTime);
    
        return () => clearInterval(interval);
      }, [toastWidth, duration]);

    return { progress }
}