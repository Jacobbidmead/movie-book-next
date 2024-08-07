"use client";
import Burger from "./Burger";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";

interface HeaderProps {
  handleOpenInfo: () => void;
  isMobile: boolean;
}

const Header: React.FC<HeaderProps> = ({ handleOpenInfo, isMobile }) => {
  return (
    <>
      <div className='px-12 py-8 mb-8 text-xl border-border opacity-50 border-b-[2px] text-light flex justify-between'>
        {isMobile ? <Burger /> : null}

        <div className='sm:text-xs pt-2 xs:text-xs '>MediaBook AI</div>
        {isMobile ? null : (
          <div>
            <button onClick={handleOpenInfo}>
              <InfoOutlinedIcon />
            </button>
          </div>
        )}
      </div>
    </>
  );
};

export default Header;
