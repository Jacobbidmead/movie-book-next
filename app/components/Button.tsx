import { motion } from "framer-motion";

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
}

const Button: React.FC<ButtonProps> = ({ onClick, children }) => {
  return (
    <>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="cursor-pointer py-2 px-3 border-border border-button rounded-button text-xs text-light hover:bg-darkline bg-dark">
        {children}
      </motion.button>
    </>
  );
};

export default Button;
