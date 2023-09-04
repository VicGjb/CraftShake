import React, { useState, useRef } from "react";
import "../../styles/sound_button.scss";

export function SoundButtonAug() {
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
        src="https://craftshake.s3.eu-central-1.amazonaws.com/svg/avstriyskaya_pesnya_1678_g_o_du_lieber_augustin_mp3cut_net.mp3"
        onCanPlayThrough={() => {
          audioRef.current.play();
        }}
      />
    </div>
  );
}