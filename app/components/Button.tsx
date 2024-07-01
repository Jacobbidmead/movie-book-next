import { motion } from "framer-motion";

interface ButtonProps {
  onClick: React.MouseEventHandler<HTMLButtonElement>;
  children?: React.ReactNode;
  className: string;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, className }) => {
  return (
    <>
      <motion.button
        whileTap={{ scale: 0.9 }}
        onClick={onClick}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className={className}>
        {children}
      </motion.button>
    </>
  );
};

export default Button;
