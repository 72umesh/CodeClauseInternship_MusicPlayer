import playlist from "../data/playlist.js";
import { useEffect, useRef, useState } from "react";
import { FaPause, FaPlay, FaShuffle } from "react-icons/fa6";
import { IoPlayForward } from "react-icons/io5";
import { IoPlayBack } from "react-icons/io5";
import "./MusicPlayer.css";

function MusicPlayer() {
  const audioRef = useRef(null);
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);

  const currentTrack = playlist[currentIndex];

  function togglePlayPause() {
    setIsPlaying(!isPlaying);
  }
  function prevTrack() {
    setCurrentIndex(
      currentIndex === 0 ? playlist.length - 1 : currentIndex - 1
    );
    setIsPlaying(true);
  }
  function nextTrack() {
    setCurrentIndex(
      currentIndex === playlist.length - 1 ? 0 : currentIndex + 1
    );
    setIsPlaying(true);
  }
  function shuffle() {
    setIsPlaying(true);
    const random = Math.floor(Math.random() * playlist.length);
    setCurrentIndex(random);
  }

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current
          .play()
          .catch((err) => console.error("Play error:", err));
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying, currentIndex]);
  return (
    <div className="musicPlayer">
      <div className="player">
        <div className="player-image">
          <img
            alt={currentTrack.title}
            src={currentTrack.image}
            loading="lazy"
          />
        </div>
        <div className="player-content">
          <div className="player-description">
            <h2>{currentTrack.title}</h2>
            <p>{currentTrack.artist}</p>
            <audio ref={audioRef} src={currentTrack.src} />
          </div>
          <div className="player-controls">
            <div className="controls">
              <button onClick={prevTrack}>
                <IoPlayBack className="icons" />{" "}
              </button>
              <button onClick={togglePlayPause}>
                {isPlaying ? (
                  <FaPause className="icons" />
                ) : (
                  <FaPlay className="icons" />
                )}
              </button>
              <button onClick={nextTrack}>
                <IoPlayForward className="icons" />
              </button>
              <button onClick={shuffle}>
                <FaShuffle className="icons" />
              </button>
            </div>
          </div>
        </div>
      </div>

      <div className="playlist">
        <ul>
          {playlist.map((track, index) => (
            <li
              key={index}
              className={
                index === currentIndex
                  ? "active playlist-song"
                  : "playlist-song"
              }
              onClick={() => {
                setCurrentIndex(index);
                setIsPlaying(true);
              }}
            >
              <span>{track.title}</span> <span>{track.artist}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
export default MusicPlayer;
