import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import videoData from "../../data/videoData";
import styles from "./VideoSection.module.css";

const VideoSection: React.FC = () => {
  const [playingVideos, setPlayingVideos] = useState<{
    [key: number]: boolean;
  }>({});

  const [currentVideo, setCurrentVideo] = useState<number | null>(null);

  const handlePlayVideo = (index: number) => {
    if (currentVideo !== null && currentVideo !== index) {
      setPlayingVideos((prev) => ({
        ...prev,
        [currentVideo]: false,
      }));
    }
    setPlayingVideos((prev) => ({
      ...prev,
      [index]: true,
    }));
    setCurrentVideo(index);
  };

  return (
    <div id="video" className={styles.videoSection}>
      <h2 className={styles.title}>Video Collection</h2>
      <Swiper
        modules={[Navigation, Pagination]}
        navigation
        pagination={{ clickable: true }}
        spaceBetween={80}
        slidesPerView={1}
        className={styles.swiperContainer}
      >
        {videoData.map((link, index) => (
          <SwiperSlide key={index} className={styles.videoWrapper}>
            {playingVideos[index] ? (
              <iframe
                width="100%"
                height="500"
                src={`${link}?autoplay=1`}
                title={`Video ${index + 1}`}
                frameBorder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowFullScreen
              ></iframe>
            ) : (
              <div className={styles.videoPlaceholder}>
                <img
                  src={`https://img.youtube.com/vi/${getYouTubeVideoID(
                    link
                  )}/0.jpg`}
                  alt={`Video Thumbnail ${index + 1}`}
                  className={styles.thumbnail}
                />
                <button
                  className={styles.playButton}
                  onClick={() => handlePlayVideo(index)}
                >
                  ▶ Play
                </button>
              </div>
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

const getYouTubeVideoID = (url: string) => {
  const regExp = /^.*(?:youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=)([^#\&\?]*).*/;
  const match = url.match(regExp);
  return match && match[1] ? match[1] : "";
};

export default VideoSection;
