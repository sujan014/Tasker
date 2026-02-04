'use client';
import { Button } from '@/components/ui/button';
import { Checkbox } from '@/components/ui/checkbox';
import { motion } from 'framer-motion';
import { CircleCheck } from 'lucide-react';

const Hero = () => {
  const headline = '10X your productivity'.split('');
  const tasks = [
    'groceries',
    'shopping',
    'meet-ups',
    'work-list',
    'conference',
    'jogging',
    'trips',
  ];
  const taskLists = [
    'running shoes',
    't-shirts',
    'boots',
    'jeans',
    'cap',
    'goggles',
    'watch',
    'cap',
  ];
  const features = [
    'Prioritize you activities',
    'Keep track of you progress',
    'Personalized list of activities',
    'Set deadlines to enhance urgency',
    'Get reminders',
  ];
  return (
    <div>
      <h1 className="mt-10 text-7xl font-bold text-blue-900 text-center">
        {headline.map((letter, index) => (
          <motion.span
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.1, delay: index * 0.1 }}
            className="inline-block"
            key={index}
          >
            {letter === ' ' ? '\u00A0' : letter}
          </motion.span>
        ))}
      </h1>
      <div className="flex gap-5 mt-10">
        <div className="basis-1/2 py-5 rounded-md bg-gray-300 flex justify-evenly">
          <div className="w-50 bg-white border-black border rounded-md">
            <h1 className="font-bold text-center">Tasks</h1>
            <ul>
              {tasks.map((tasklist, index) => (
                <li
                  className="flex justify-between items-center p-2 bg-amber-200 m-2 rounded-sm"
                  key={index}
                >
                  <label
                    htmlFor="terms"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {tasklist}
                  </label>
                  <Checkbox id="terms" className="border-black" />
                </li>
              ))}
            </ul>
          </div>
          <div className="w-50 bg-white border-black border rounded-md">
            <h1 className="font-bold text-center">Shopping lists</h1>
            <ul>
              {taskLists.map((tasklist, index) => (
                <li
                  className="flex justify-between items-center p-2 bg-amber-200 m-2 rounded-sm"
                  key={index}
                >
                  <label
                    htmlFor="lists"
                    className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  >
                    {tasklist}
                  </label>
                  <Checkbox id="lists" className="border-black" />
                </li>
              ))}
            </ul>
          </div>
        </div>
        <div className="basis-1/2 flex flex-col">
          <motion.button
            className="max-w-md mx-auto mb-5 px-6 py-2 bg-[#3333ff] text-white rounded-lg shadow-2xl"
            whileHover={{ scale: 1.1, backgroundColor: '#0011ff' }} // hover = grow & color change // green #4ade80
            whileTap={{ scale: 0.9, rotate: -5 }} // click = shrink & rotate
            transition={{ type: 'spring', stiffness: 300 }} // springy bounce
          >
            Register to get started
          </motion.button>
          {features.map((feature, index) => (
            <FeatureBox text={feature} key={index} />
          ))}
        </div>
      </div>
    </div>
  );
};

const FeatureBox = ({ text }: { text: string }) => {
  return (
    <motion.div
      className="w-96 bg-white font-semibold m-3 p-2 mx-auto rounded-md hover:bg-red-200"
      whileHover={{ scale: 1.1 }}
    >
      <CircleCheck size={40} fill="green" className="inline-flex mr-3" />
      <h1 className="inline ">{text}</h1>
    </motion.div>
  );
};
export default Hero;
