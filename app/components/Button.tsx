import { motion } from "framer-motion";

const Button: React.FC = () => {
  return (
    <>
      <motion.div
        whileTap={{ scale: 0.9 }}
        transition={{ type: "spring", stiffness: 400, damping: 17 }}
        className="cursor-pointer py-2 px-3 border-border border-button rounded-button text-xs text-light hover:bg-darkline bg-dark">
        Button
      </motion.div>
    </>
  );
};

export default Button;
