"use client";

const Footer: React.FC = () => {
  return (
    <>
      {" "}
      <div className="px-12 py-4  text-sm border-border border-t-[2px] text-light flex justify-end bg-night ">
        <div className="px-4 footer-text">
          MovieBookAI was created by{" "}
          <a href="https://jacobbidmead.com/" target="_blank" className="footer-link">
            jacobbidmead.com
          </a>
        </div>
      </div>
    </>
  );
};

export default Footer;
