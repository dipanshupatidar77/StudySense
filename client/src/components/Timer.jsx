// import React, { useState, useEffect } from "react";
// import "../styles/timer.css";
// import Swal from "sweetalert2";

// export default function Timer({ onClose }) {
//   const [minutes, setMinutes] = useState(0);
//   const [seconds, setSeconds] = useState(0);
//   const [isRunning, setIsRunning] = useState(false);

//   useEffect(() => {
//     let timer;
//     if (isRunning && (minutes > 0 || seconds > 0)) {
//       timer = setInterval(() => {
//         if (seconds === 0) {
//           if (minutes === 0) {
//             clearInterval(timer);
//           } else {
//             setMinutes((m) => m - 1);
//             setSeconds(59);
//           }
//         } else {
//           setSeconds((s) => s - 1);
//         }
//       }, 1000);
//     }

//     if (minutes === 0 && seconds === 0 && isRunning) {
//       setIsRunning(false);
//       Swal.fire("Time's up!", "Good job on staying focused!", "success");
//     }

//     return () => clearInterval(timer);
//   }, [isRunning, minutes, seconds]);

//   const handleStart = () => {
//     if (minutes > 0 || seconds > 0) setIsRunning(true);
//   };

//   const handlePause = () => {
//     setIsRunning(false);
//   };

//   return (
//     <div className="timer-modal">
//       <div className="timer-box">
//         <h4>Set Focus Timer</h4>
//         <input
//           type="number"
//           placeholder="Minutes"
//           value={minutes}
//           onChange={(e) => setMinutes(Number(e.target.value))}
//         />
//         <input
//           type="number"
//           placeholder="Seconds"
//           value={seconds}
//           onChange={(e) => setSeconds(Number(e.target.value))}
//         />
//         <div className="buttons">
//           <button onClick={handleStart}>Start</button>
//           <button onClick={handlePause}>Pause</button>
//           <button onClick={onClose}>Close</button>
//         </div>
//         <p>
//           {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
//         </p>
//       </div>
//     </div>
//   );
// }


// src/components/Timer.jsx

import React, { useState, useEffect } from "react";
import "../styles/timer.css";
import Swal from "sweetalert2";

export default function Timer({ onClose }) {
  const [minutes, setMinutes] = useState(0);
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [isSet, setIsSet] = useState(false); // Track if timer was set

  useEffect(() => {
    let timer;
    if (isRunning && (minutes > 0 || seconds > 0)) {
      timer = setInterval(() => {
        if (seconds === 0) {
          if (minutes === 0) {
            clearInterval(timer);
          } else {
            setMinutes((m) => m - 1);
            setSeconds(59);
          }
        } else {
          setSeconds((s) => s - 1);
        }
      }, 1000);
    }

    if (minutes === 0 && seconds === 0 && isRunning) {
      setIsRunning(false);
      Swal.fire("Time's up!", "Good job on staying focused!", "success");
    }

    return () => clearInterval(timer);
  }, [isRunning, minutes, seconds]);

  const handleStart = () => {
    if (minutes > 0 || seconds > 0) {
      setIsRunning(true);
      setIsSet(true); // Hide input form and start button
    }
  };

  const handlePause = () => {
    setIsRunning(false);
  };

  return (
    <div className="timer-box">
      {!isSet && (
        <>
          <h4>Set Focus Timer</h4>
          <input
            type="number"
            placeholder="Minutes"
            value={minutes}
            onChange={(e) => setMinutes(Number(e.target.value))}
          />
          <input
            type="number"
            placeholder="Seconds"
            value={seconds}
            onChange={(e) => setSeconds(Number(e.target.value))}
          />
          <button onClick={handleStart}>Start</button>
        </>
      )}

      {isSet && (
        <>
          <p>
            {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
          </p>
          <div className="buttons">
            <button onClick={handlePause}>Pause</button>
            <button onClick={onClose}>Close</button>
          </div>
        </>
      )}
    </div>
  );
}
