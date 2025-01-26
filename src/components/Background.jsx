import "../scss/Background.scss";
import { useEffect } from "react";

const Background = () => {
  useEffect(() => {
    const generateRandomStyles = () => {
      const size = Math.random() * 10 + 14;
      const top = Math.random() * 100 + "%";
      const left = Math.random() * 100 + "%";
      const duration = Math.random() * 8 + 5 + "s";

      return { size, top, left, duration };
    };

    const createBlobs = () => {
      const blobCount = 4;
      const background = document.getElementById("background");

      for (let i = 0; i < blobCount; i++) {
        const { size, top, left, duration } = generateRandomStyles();

        const blob = document.createElement("div");
        blob.className = "blob";

        blob.style.width = `${size}${window.innerWidth > window.innerHeight ? "vw" : "vh"}`;
        blob.style.height = `${size}${window.innerWidth > window.innerHeight ? "vw" : "vh"}`;
        //blob.style.height = `${size}vw`;
        blob.style.top = top;
        blob.style.left = left;
        blob.style.animationDuration = duration;

        background.appendChild(blob);
      }
    };

    // Initialize blobs
    createBlobs();
  }, []);

  useEffect(() => {
    const handleChangeColor = (event) => {
      const blobs = document.querySelectorAll(".blob");
      blobs.forEach((blob) => {
        blob.style.backgroundColor = event.detail.color; // Update color
      });
    };

    // Listen to the custom event
    window.addEventListener("changeBlobColor", handleChangeColor);

    // Cleanup listener on component unmount
    return () => {
      window.removeEventListener("changeBlobColor", handleChangeColor);
    };
  }, []);

  return <div id="background" className="background"></div>;
};

export default Background;
