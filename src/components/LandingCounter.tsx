// import { useEffect, useState } from "react";
// import { TiPlusOutline } from "react-icons/ti";

// function LandingCounter({ count }: { count: number }) {
//   const [counter, setCounter] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setCounter((prevCounter) => {
//         if (prevCounter + 1 >= count) {
//           clearInterval(interval); // Stop the interval when the count is reached
//           return count;
//         }
//         return prevCounter + 1;
//       });
//     }, 100);

//     return () => clearInterval(interval);
//   }, [count]);

//   return (
//     <div className="flex justify-center items-center gap-1">
//       <div className="text-xl font-medium text-center text-gray-600 dark:text-slate-300">{counter.toLocaleString()}</div>
//       <TiPlusOutline className='size-6 text-gray-600 dark:text-slate-200' />
//     </div>
//   );
// }

// export default LandingCounter;

import { useEffect, useState, useRef } from "react";
import { TiPlusOutline } from "react-icons/ti";

function LandingCounter({ count }: { count: number }) {
  const [counter, setCounter] = useState(0);
  const animatedOnce = useRef(false);

  useEffect(() => {
    // Check if the count is greater than 0 and if it hasn't been animated yet
    // This prevents the counter from animating again if it has already been animated
    if (!animatedOnce.current && count > 0) {
      animatedOnce.current = true; // mark that the counter has been animated

      const interval = setInterval(() => {
        setCounter((prevCounter) => {
          if (prevCounter + 1 >= count) {
            clearInterval(interval); // Stop the interval when the count is reached
            return count;
          }
          return prevCounter + 1;
        });
      }, 100);

      return () => clearInterval(interval);

    } else if (animatedOnce.current) {
      // if the count is already animated, just set it directly
      setCounter(count);
    }
  }, [count]);

  return (
    <div className="flex justify-center items-center gap-1">
      <div className="text-sm font-semibold md:text-xl md:font-medium text-center text-gray-600 dark:text-slate-300">
        {counter.toLocaleString()}
      </div>
      <TiPlusOutline className="size-4 md:size-6 text-gray-600 dark:text-slate-200" />
    </div>
  );
}

export default LandingCounter;
