import React, { useState, useRef } from "react";
import "../../styles/sound_button.scss";

export function SoundButton() {
  const audioRef = useRef(null);

  const handleClick = () => {
    audioRef.current.play();
  };

  return (
    <div className="container">
      <button className={`big-button`} onClick={handleClick}>
        
      </button>
      <audio
        ref={audioRef}
        src="https://craftshake.s3.eu-central-1.amazonaws.com/svg/audio_2023-03-15_09-48-32.mp3"
        onCanPlayThrough={() => {
          audioRef.current.play();
        }}
      />
    </div>
  );
}
