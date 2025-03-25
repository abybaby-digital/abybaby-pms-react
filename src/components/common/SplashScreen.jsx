import React, { useEffect, useRef, useState } from "react";
import Lottie from "lottie-react";
import splashAnimation from "../../assets/images/Desktop - 1.json"; // Update with actual path

const SplashScreen = () => {
    const [isVisible, setIsVisible] = useState(true);
    const lottieRef = useRef();
  
    useEffect(() => {
      if (lottieRef.current) {
        lottieRef.current.setSpeed(3); // Increase speed (Try 8, 10, or higher)
      }
    }, []);
  
    return (
      <div
        className={`fixed z-50 top-0 left-0 w-full h-full flex items-center justify-center bg-white transition-opacity duration-500 ${
          isVisible ? "block" : "hidden"
        }`}
      >
        <Lottie
          lottieRef={lottieRef}
          animationData={splashAnimation}
          loop={false}
          onComplete={() => setIsVisible(false)}
          className="lg:w-[70%] w-[90%]"
        />
      </div>
    );
  };
  
  export default SplashScreen;
