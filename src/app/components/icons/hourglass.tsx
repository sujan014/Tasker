import { motion } from 'framer-motion';

export default function MyHourGlass() {
  return (
    <motion.div
      className="w-[100px] flex flex-col items-center border-black border-2"
      animate={{ rotate: 180 }}
      transition={{ duration: 1 }}
    >
      <div className="w-18 h-2 bg-black mx-auto"></div>
      <motion.div
        className="h-5 w-15 bg-gray-200"
        animate={{ backgroundColor: ['#22c55e', '#333333'] }} // blue → green
        transition={{ duration: 1, repeat: Infinity }}
      ></motion.div>
      <motion.div
        className="h-[30px] w-15 bg-gray-200"
        animate={{ backgroundColor: ['#22c55e', '#333333'] }} // blue → green
        transition={{ duration: 1, delay: 1, repeat: Infinity }}
      ></motion.div>
      <div className="flex">
        <motion.div
          className="w-0 h-0 border-b-[30px] border-l-[30px] border-b-[#22c55e] rotate-270"
          style={{
            borderBottomColor: 'var(--border-color)',
          }}
          animate={{
            '--border-color': ['#22c55e', '#333333'], // red → blue → green → red
          }}
          transition={{ duration: 1, delay: 2, repeat: Infinity }}
        ></motion.div>
        <motion.div
          className="w-0 h-0 border-b-[30px] border-l-[30px] border-b-[#22c55e] rotate-180"
          style={{
            borderBottomColor: 'var(--border-color)',
          }}
          animate={{
            '--border-color': ['#22c55e', '#333333'], // red → blue → green → red
          }}
          transition={{ duration: 1, delay: 2, repeat: Infinity }}
        ></motion.div>
      </div>
      {/* bottom glass */}
      <div className="flex">
        <motion.div
          className="w-0 h-0 border-b-[30px] border-l-[30px] border-b-red-700 rotate-0"
          style={{
            borderBottomColor: 'var(--border-color)',
          }}
          animate={{
            '--border-color': ['#333333', '#22c55e'], // red → blue → green → red
          }}
          transition={{ duration: 1, delay: 3, repeat: Infinity }}
        ></motion.div>
        <motion.div
          className="w-0 h-0 border-b-[30px] border-l-[30px] border-b-red-700 rotate-90"
          style={{
            borderBottomColor: 'var(--border-color)',
          }}
          animate={{
            '--border-color': ['#333333', '#22c55e'], // red → blue → green → red
          }}
          transition={{ duration: 1, delay: 3, repeat: Infinity }}
        ></motion.div>
      </div>
      <motion.div
        className="h-[30px] w-15 bg-gray-200"
        animate={{ backgroundColor: ['#333333', '#22c55e'] }} // blue → green
        transition={{ duration: 1, delay: 2, repeat: Infinity }}
      ></motion.div>
      <motion.div
        className="h-5 w-15 bg-gray-200"
        animate={{ backgroundColor: ['#333333', '#22c55e'] }} // blue → green
        transition={{ duration: 1, delay: 1, repeat: Infinity }}
      ></motion.div>
      <div className="w-18 h-2 bg-black"></div>
    </motion.div>
  );
}
