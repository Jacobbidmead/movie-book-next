"use client";
import { useRef } from "react";
import { motion } from "framer-motion";

const LandingPage: React.FC = () => {
  const landingPageRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    if (landingPageRef.current) {
      const bottomPostion =
        landingPageRef.current.offsetTop + landingPageRef.current.clientHeight;

      window.scrollTo({
        top: bottomPostion,
        behavior: "smooth",
      });
    }
  };

  return (
    <>
      <div
        ref={landingPageRef}
        id="landingPage"
        className="h-screen flex place-items-center justify-center flex-col mb-[200px]"
      >
        <div className="lg:text-8xl sm:text-5xl pb-16 text-primary">
          MediaBook AI.
        </div>
        <div className=" flex gap-4 flex-col lg:text-sm sm:text-xs sm:text-center text-light lg:w-5/12 sm:w-11/12">
          <p>
            Welcome to MediaBook AI, the media recommendation site that helps
            you choose what to watch.
          </p>
          <p className="">
            Search for your favourite movies & tv shows, add them to your list,
            then hit the `get recommendations` button.
          </p>
          <p>
            The AI langauge model will give you recommendations based on your
            choices.
          </p>
          <p>Use as a guest or create an account to interact with friends!</p>
        </div>
        <motion.button
          whileTap={{ scale: 0.9 }}
          transition={{ type: "spring", stiffness: 400, damping: 17 }}
          onClick={scrollToBottom}
          className="py-2 mt-12 border-border border-button rounded-button lg:w-2/12 sm:w-1/2 text-xs text-light hover:bg-darkline bg-dark"
        >
          Click here to get started
        </motion.button>
      </div>
    </>
  );
};

export default LandingPage;
