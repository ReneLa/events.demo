'use client'

import styles from './conf-container.module.css';
import { motion } from 'framer-motion';

export default function ConfContainer({ children }) {
  return <motion.div 
           initial={{opacity:0, y:20}}
           animate={{opacity:1, y:0}}
           exit={{opacity:0, y:20}}
           transition={{ duration: 0.2 }}
           className={styles.container}>
           {children}
      </motion.div>;
}