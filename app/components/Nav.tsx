"use client";

import Search from "../atoms/search";
import Button from "./Button";
import { useState, useEffect } from "react";

interface NavProps {
  handleSearch: (query: string) => void;
  showMedia: () => void;
  showUserMedia: boolean;
  handleToggleMedia: () => void;
  toggleMedia: "movies" | "shows";
}

const Nav: React.FC<NavProps> = ({
  handleSearch,
  showMedia,
  showUserMedia,
  handleToggleMedia,
  toggleMedia,
}) => {
  const [navOpacity, setNavOpacity] = useState("rgba(114, 114, 114, 0)");
  const [navBorder, setNavBorder] = useState("none");

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setNavOpacity("rgba(114, 114, 114, 0.2)");
        setNavBorder("1px solid #404040b5");
      } else {
        setNavOpacity("rgba(114, 114, 114, 0)");
        setNavBorder("none");
      }
    };

    window.addEventListener("scroll", handleScroll);

    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="floating-nav-container">
      <div
        className="floating-nav"
        style={{ backgroundColor: navOpacity, border: navBorder, borderRadius: "10px" }}>
        <div className="flex place-items-center justify-center flex-col m-3">
          <Search onSearch={handleSearch} />
        </div>

        <Button
          onClick={showMedia}
          className="cursor-pointer py-2 px-3 border-border border-button rounded-button text-xs text-light hover:bg-darkline bg-dark">
          {showUserMedia ? (
            <div className="cursor-pointer">Search</div>
          ) : (
            <div className="cursor-pointer">My list</div>
          )}
        </Button>

        <Button
          onClick={handleToggleMedia}
          className="cursor-pointer py-2 px-3 border-border border-button rounded-button text-xs text-light hover:bg-darkline bg-dark">
          {toggleMedia === "movies" ? (
            <span>Search for Shows</span>
          ) : (
            <span>Search for Movies</span>
          )}
        </Button>
      </div>
    </div>
  );
};

export default Nav;
