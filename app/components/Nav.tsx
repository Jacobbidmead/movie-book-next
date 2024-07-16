"use client";

import React from "react";
import Search from "../atoms/search";
import Button from "./Button";
import useMediaStore from "../store/useMediaStore";

interface NavProps {
  handleSearch: (query: string) => void;
}

const Nav: React.FC<NavProps> = ({ handleSearch }) => {
  const { screenState, setScreenState, toggleMedia, handleToggleMedia, showMedia, showUserMedia } =
    useMediaStore();

  const handleShowMedia = () => {
    setScreenState("userMedia");
    showMedia();
  };

  const handleToggleMediaView = () => {
    handleToggleMedia();
    setScreenState("movies"); // Keep this to ensure the media view is set correctly
  };

  return (
    <div className="floating-nav-container">
      <div
        className="floating-nav"
        style={{
          backgroundColor: "rgba(114, 114, 114, 0.1)", // Adjusted opacity for example
          border: "1px solid #404040b5",
          borderRadius: "10px",
        }}>
        <div className="flex place-items-center">
          <Search onSearch={handleSearch} />
        </div>
        <div className="flex items-center space-x-4">
          <Button
            onClick={handleShowMedia}
            className="cursor-pointer lg:py-2 lg:px-3 border-border border-button rounded-button text-xs custom-button shadow-2xl shadow-obsidian">
            {screenState === "userMedia" ? "Search" : "My List"}
          </Button>

          <Button
            onClick={handleToggleMediaView}
            className="cursor-pointer py-2 px-3 border-border border-button rounded-button text-xs custom-button">
            {toggleMedia === "movies" ? "Search for Shows" : "Search for Movies"}
          </Button>
          <Button
            onClick={() => setScreenState("recommendations")}
            className="cursor-pointer py-2 px-3 border-border border-button rounded-button text-xs custom-button">
            Recommendations
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Nav;
