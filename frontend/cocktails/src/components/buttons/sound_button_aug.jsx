// import React, { useState, useRef } from "react";
// import "../../styles/sound_button.scss";

// export function SoundButtonAug() {
//   const audioRef = useRef(null);

//   const handleClick = () => {
//     audioRef.current.play();
//   };

//   return (
//     <div className="container">
//       <button className={`big-button`} onClick={handleClick}>
        
//       </button>
//       <audio
//         ref={audioRef}
//         src="https://craftshake.s3.eu-central-1.amazonaws.com/svg/avstriyskaya_pesnya_1678_g_o_du_lieber_augustin_mp3cut_net.mp3"
//         onCanPlayThrough={() => {
//           audioRef.current.play();
//         }}
//       />
//     </div>
//   );
// }


import React, { useState, useRef } from "react";
import "../../styles/sound_button.scss";

export function SoundButtonAug() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(false);

  const handleClick = () => {
    if (!isPlaying) {
      audioRef.current.play();
      setIsPlaying(true);
    } else {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
      setIsPlaying(false);
    }
  };

  return (
    <div className="container">
      <button className={`big-button`} onClick={handleClick}>
        {isPlaying ? "Pause" : "Play"} {/* Display Play/Pause based on state */}
      </button>
      <audio
        ref={audioRef}
        src="https://craftshake.s3.eu-central-1.amazonaws.com/svg/avstriyskaya_pesnya_1678_g_o_du_lieber_augustin_mp3cut_net.mp3"
        onEnded={() => setIsPlaying(false)} {/* Reset state when audio ends */}
      />
    </div>
  );
}