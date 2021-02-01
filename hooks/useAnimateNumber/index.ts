// extracted and adapted from https://github.com/baristna/use-animate-number

import { useEffect, useState, useRef } from "react";
import * as easings from "./easingFunctions";

export type IeasingFunction = (
  elapsed: number,
  initialValue: number,
  amountOfChange: number,
  duration: number,
  s?: number
) => number;

export interface IuseAnimateNumberOptions {
  duration?: number;
  enterance?: boolean;
  direct?: boolean;
  disabled?: boolean;
  easing?: keyof typeof easings;
  decimals?: number;
}

export type IuseAnimateNumber = (
  val: number,
  options?: IuseAnimateNumberOptions
) => [number, (state: number, skip: boolean) => void];

export type ITimerRef = ReturnType<typeof setTimeout>;

const initTimer = setTimeout(() => null, Math.max());

const defaultOptions = {
  duration: 1000,
  enterance: true,
  direct: false,
  disabled: false,
  easing: "easeInOutQuad",
  decimals: 2,
};

const useAnimateNumber: IuseAnimateNumber = (initial = 0, options) => {
  const conf = {
    ...defaultOptions,
    ...options,
  };

  const increment = 20;
  const [animationInfo, setAnimationInfo] = useState({
    value: initial,
    skip: conf.disabled || !conf.enterance,
  });
  const [currentTime, setCurrentTime] = useState(conf.duration + 100);
  const [currentValue, setCurrentValue] = useState(0);
  const [initialValue, setInitialValue] = useState(initial);
  const timer = useRef<ITimerRef>(initTimer);
  const clearTm = () => timer && clearTimeout(timer.current);

  // Clear timer at load and unload
  useEffect(() => {
    clearTm();
    return () => clearTm();
  }, []);

  useEffect(() => {
    if (conf.direct) {
      clearTm();
      setAnimationInfo({ value: initial, skip: conf.disabled });
    }
  }, [initial]);

  // Start animation: clear previous timer, setTime to zero
  useEffect(() => {
    if (animationInfo.skip) {
      setCurrentValue(animationInfo.value || 0);
    } else {
      setCurrentTime(0);
    }
  }, [animationInfo]);

  const easingFn: IeasingFunction = (...args) => easings[conf.easing](...args);

  const handleValueSet = (value: number, skip = conf.disabled) => {
    clearTm();
    // wrapped by timeout to get all of the function calls simultaneously
    setTimeout(() => {
      setInitialValue(animationInfo.value);
      setAnimationInfo({ value, skip });
    }, 1);
  };

  // Animation frame for each currentTime change.
  useEffect(() => {
    if (currentTime <= conf.duration) {
      setCurrentValue(
        easingFn(
          currentTime,
          initialValue,
          animationInfo.value - initialValue,
          conf.duration
        )
      );
      timer.current = setTimeout(() => {
        // trigger animation frame effect by increasing currentTime
        setCurrentTime(currentTime + increment);
      }, increment);
    }
  }, [currentTime]);

  return [parseFloat(currentValue.toFixed(conf.decimals)), handleValueSet];
};

export default useAnimateNumber;
