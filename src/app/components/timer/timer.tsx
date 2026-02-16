'use client';
import { Button } from '@/components/ui/button';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
} from '@/components/ui/dropdown-menu';
import {
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@radix-ui/react-dropdown-menu';
import { useEffect, useRef, useState } from 'react';
import { TimeDot } from '../utils/digit';
//import { Hourglass } from 'lucide-react';
//import { motion } from 'framer-motion';
//import MyHourGlass from '../icons/hourglass';

export default function Timer() {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [toggleTime, setToggleTime] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  // const [startTime, setStartTime] = useState('');
  // const [endTime, setEndTime] = useState('');
  // const [rotateAngle, setRotateAngle] = useState(0);
  //const [triggerRotate, setTriggerRotate] = useState(false);

  useEffect(() => {
    if (isRunning) {
      let tempSecond = second;
      let tempMinute = minute;
      let tempHour = hour;
      //console.log(`before time: ${tempHour} : ${tempMinute} : ${tempSecond}`);

      if (tempSecond === 0) {
        //console.log('CHECKING MINUTE');
        if (tempMinute === 0) {
          // late check hour
          //console.log('CHECKING HOUR');
          if (tempHour === 0) {
            // do nothing
          } else {
            //console.log('HOUR OVERFLOW');
            tempHour = tempHour - 1;
            tempMinute = 59;
            tempSecond = 59;
            if (tempHour === 0) {
              // do nothing
            }
          }
        } else {
          //console.log('MINUTE OVERFLOW');
          tempMinute = tempMinute - 1;
          tempSecond = 59;
          if (tempMinute === 0) {
            // do nothing
            // late check hour
            //console.log('CHECKING HOUR');
            if (tempHour === 0) {
              // do nothing
            } else {
              //console.log('HOUR OVERFLOW');
              tempHour = tempHour - 1;
              tempMinute = 59;
              if (tempHour === 0) {
                // do nothing
              }
            }
          }
        }
      } else {
        tempSecond = tempSecond - 1;
      }
      //console.log(`after time: ${tempHour} : ${tempMinute} : ${tempSecond}`);
      setSecond(tempSecond);
      setMinute(tempMinute);
      setHour(tempHour);
      if (
        tempSecond === 0 &&
        tempMinute === 0 &&
        tempHour === 0 &&
        intervalRef.current !== null
      ) {
        setIsRunning(false);
        console.log('Timer alert');
      }
    }
    //setRotateAngle((prev) => prev + 180);
  }, [toggleTime]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setToggleTime((prev) => !prev);
      }, 1000);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      const timeString = new Date().toLocaleTimeString();
      //setEndTime(timeString);
    }

    // cleanup function to clear the interval when the component unmounts
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
    const timeString = new Date().toLocaleTimeString();
    //setStartTime(timeString);
    //setEndTime('');
  };
  const stopTimer = () => {
    setIsRunning(false);
  };
  const resetTimer = () => {
    setIsRunning(false);
    setSecond(0);
    setMinute(0);
    setHour(0);
    //setStartTime('');
    //setEndTime('');
  };
  return (
    <div className="flex flex-col">
      <h1 className="m-4 text-4xl text-center">Set your Timer</h1>
      <div className="m-2 flex justify-center gap-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-24 rounded-lg cursor-pointer">Hour</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-5 h-32 overflow-y-auto bg-white shadow-lg"
            align="end"
          >
            <DropdownMenuGroup>
              {Array.from({ length: 24 }, (_, i) => i).map((num) => (
                <DropdownMenuItem key={num} onClick={() => setHour(num)}>
                  {num}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-24 rounded-lg cursor-pointer">Minutes</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-5 h-32 overflow-y-auto bg-white shadow-lg"
            align="end"
          >
            <DropdownMenuGroup>
              {Array.from({ length: 60 }, (_, i) => i).map((num) => (
                <DropdownMenuItem key={num} onClick={() => setMinute(num)}>
                  {num}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-24 rounded-lg cursor-pointer">Seconds</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-5 h-32 overflow-y-auto bg-white shadow-lg"
            align="end"
          >
            <DropdownMenuGroup>
              {Array.from({ length: 60 }, (_, i) => i).map((num) => (
                <DropdownMenuItem key={num} onClick={() => setSecond(num)}>
                  {num}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex">
        <div className="flex-col p-3 mx-auto border border-black rounded-2xl ">
          <div className="flex justify-evenly gap-x-4">            
            <span className="text-8xl">{hour.toString().padStart(2, '0')}</span>
            <TimeDot state={!isRunning} toggleState={toggleTime} />
            <span className="text-8xl">
              {minute.toString().padStart(2, '0')}
            </span>            
            <TimeDot state={!isRunning} toggleState={toggleTime} />
            <span className="text-8xl">
              {second.toString().padStart(2, '0')}
            </span>            
          </div>
          <div className="m-2 flex justify-between gap-x-2">
            <Button
              className="w-24 rounded-lg bg-green-700"
              onClick={startTimer}
            >
              Start
            </Button>
            <Button className="w-24 rounded-lg bg-red-700" onClick={stopTimer}>
              Stop
            </Button>
            <Button
              className="w-24 rounded-lg bg-blue-600"
              onClick={resetTimer}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}

/*
export default function Timer() {
  const [second, setSecond] = useState(0);
  const [minute, setMinute] = useState(0);
  const [hour, setHour] = useState(0);
  const [toggleTime, setToggleTime] = useState<boolean>(false);
  const [isRunning, setIsRunning] = useState(false);
  const intervalRef = useRef<number | null>(null);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [rotateAngle, setRotateAngle] = useState(0);
  //const [triggerRotate, setTriggerRotate] = useState(false);

  useEffect(() => {
    if (isRunning) {
      let tempSecond = second;
      let tempMinute = minute;
      let tempHour = hour;
      //console.log(`before time: ${tempHour} : ${tempMinute} : ${tempSecond}`);

      if (tempSecond === 0) {
        //console.log('CHECKING MINUTE');
        if (tempMinute === 0) {
          // late check hour
          //console.log('CHECKING HOUR');
          if (tempHour === 0) {
            // do nothing
          } else {
            //console.log('HOUR OVERFLOW');
            tempHour = tempHour - 1;
            tempMinute = 59;
            if (tempHour === 0) {
              // do nothing
            }
          }
        } else {
          //console.log('MINUTE OVERFLOW');
          tempMinute = tempMinute - 1;
          tempSecond = 59;
          if (tempMinute === 0) {
            // do nothing
            // late check hour
            //console.log('CHECKING HOUR');
            if (tempHour === 0) {
              // do nothing
            } else {
              //console.log('HOUR OVERFLOW');
              tempHour = tempHour - 1;
              tempMinute = 59;
              if (tempHour === 0) {
                // do nothing
              }
            }
          }
        }
      } else {
        tempSecond = tempSecond - 1;
      }
      //console.log(`after time: ${tempHour} : ${tempMinute} : ${tempSecond}`);
      setSecond(tempSecond);
      setMinute(tempMinute);
      setHour(tempHour);
      if (
        tempSecond === 0 &&
        tempMinute === 0 &&
        tempHour === 0 &&
        intervalRef.current !== null
      ) {
        setIsRunning(false);
        console.log('Timer alert');
      }
    }
    setRotateAngle((prev) => prev + 180);
  }, [toggleTime]);

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = window.setInterval(() => {
        setToggleTime((prev) => !prev);
      }, 1000);
    } else {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
      const timeString = new Date().toLocaleTimeString();
      setEndTime(timeString);
    }

    // cleanup function to clear the interval when the component unmounts
    return () => {
      if (intervalRef.current !== null) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isRunning]);

  const startTimer = () => {
    setIsRunning(true);
    const timeString = new Date().toLocaleTimeString();
    setStartTime(timeString);
    setEndTime('');
  };
  const stopTimer = () => {
    setIsRunning(false);
  };
  const resetTimer = () => {
    setIsRunning(false);
    setSecond(0);
    setMinute(0);
    setHour(0);
    setStartTime('');
    setEndTime('');
  };
  return (
    <div className="flex flex-col">
      <h1 className="m-4 text-4xl text-center">Set your Timer</h1>
      <div className="m-2 flex justify-center gap-x-2">
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-24 rounded-lg cursor-pointer">Hour</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-5 h-32 overflow-y-auto bg-white shadow-lg"
            align="end"
          >
            <DropdownMenuGroup>
              {Array.from({ length: 24 }, (_, i) => i).map((num) => (
                <DropdownMenuItem key={num} onClick={() => setHour(num)}>
                  {num}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-24 rounded-lg cursor-pointer">Minutes</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-5 h-32 overflow-y-auto bg-white shadow-lg"
            align="end"
          >
            <DropdownMenuGroup>
              {Array.from({ length: 60 }, (_, i) => i).map((num) => (
                <DropdownMenuItem key={num} onClick={() => setMinute(num)}>
                  {num}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button className="w-24 rounded-lg cursor-pointer">Seconds</Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent
            className="w-5 h-32 overflow-y-auto bg-white shadow-lg"
            align="end"
          >
            <DropdownMenuGroup>
              {Array.from({ length: 60 }, (_, i) => i).map((num) => (
                <DropdownMenuItem key={num} onClick={() => setSecond(num)}>
                  {num}
                </DropdownMenuItem>
              ))}
            </DropdownMenuGroup>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="flex">
        <div className="flex-col p-3 mx-auto border border-black rounded-2xl ">
          <div className="flex justify-evenly gap-x-4">
            <Number_to_Digit value={hour} />
            <TimeDot state={!isRunning} toggleState={toggleTime} />
            <Number_to_Digit value={minute} />
            <TimeDot state={!isRunning} toggleState={toggleTime} />
            <Number_to_Digit value={second} />
          </div>
          <div className="m-2 flex justify-between gap-x-2">
            <Button
              className="w-24 rounded-lg bg-green-700"
              onClick={startTimer}
            >
              Start
            </Button>
            <Button className="w-24 rounded-lg bg-red-700" onClick={stopTimer}>
              Stop
            </Button>
            <Button
              className="w-24 rounded-lg bg-blue-600"
              onClick={resetTimer}
            >
              Reset
            </Button>
          </div>
        </div>
      </div>      
    </div>
  );
}
  */
