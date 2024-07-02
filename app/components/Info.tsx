"use client";

import "../styles/infobox.css";

interface InfoProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Info: React.FC<InfoProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;
  return (
    <>
      (
      <div className="fixed top-40 right-10 w-1/5 p-4 pb-10 rounded-lg z-50 info-box shadow-2xl shadow-obsidian">
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-500 hover:text-gray-800 pr-2">
          &times;
        </button>
        <div className="mt-4">{children}</div>
      </div>
      )
    </>
  );
};
export default Info;
