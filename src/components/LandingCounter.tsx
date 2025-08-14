import { useEffect, useState } from "react";
import { TiPlusOutline } from "react-icons/ti";

export default function LandingCounter({ count }: { count: number }) {
  const [counter, setCounter] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCounter((prevCounter) => {
        if (prevCounter + 1 >= count) {
          clearInterval(interval); // Stop the interval when the count is reached
          return count;
        }
        return prevCounter + 1;
      });
    }, 200);

    return () => clearInterval(interval);
  }, [count]);

  return (
    <div className="flex justify-center items-center gap-1">
      <div className="text-xl font-medium text-center text-gray-600 dark:text-slate-300">{counter.toLocaleString()}</div> 
      <TiPlusOutline className='size-6 text-gray-600 dark:text-slate-200' />
    </div>
  );
}