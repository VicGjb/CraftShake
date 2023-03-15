import React, { useState } from "react";
import "../styles/sound_button.scss";

export function SoundButton() {
//   const [playing, setPlaying] = useState(false);

  const handleClick = () => {
    const audio = new Audio('https://craftshake.s3.eu-central-1.amazonaws.com/svg/audio_2023-03-15_09-48-32.ogg');
    audio.play();
    // setPlaying(true);
  };
//${playing ? "playing" : ""}
  return (
    <div className="container">
      <button className={`big-button`} onClick={handleClick}>
        
      </button>
    </div>
  );
}