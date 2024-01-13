import { motion } from "framer-motion";
import { Icon } from "@iconify/react";

export default function MenuBtn({showMenu, setShowMenu}) {
  const rotateVariants = {
    open: { rotate: 0 },
    closed: { rotate: 360 }
  };

  const iconVariants = {
    open: { icon: "material-symbols:close" },
    closed: { icon: "fa-solid:bars" }
  };

  return (
    <motion.div
      animate={showMenu ? "open" : "closed"}
      variants={rotateVariants}
      className='py-2 px-1 clear me-1'
      onClick={() => setShowMenu(!showMenu)}
    >
      <motion.div
        initial={false}
        animate={showMenu ? "open" : "closed"}
        variants={iconVariants}
      >
        <Icon
          icon={showMenu ? "material-symbols:close" : "fa-solid:bars"}
          width="40"
          height="40"
          color='white'
        />
      </motion.div>
    </motion.div>
  );
};
