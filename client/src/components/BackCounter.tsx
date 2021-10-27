import { Typography } from "@mui/material";
import React, { FC, useEffect, useRef, useState } from "react";
import { useSocketContext } from "../hooks/useSocketContext";

interface Props {
  seconds: number;
  version?: number;
}
const BackCounter: FC<Props> = ({ seconds, version = 1 }) => {
  const {
    socketState: { autoplay },
  } = useSocketContext();
  const [currentSecond, setCurrentSecond] = useState(seconds);
  const timer = useRef<NodeJS.Timeout | null>(null);

  useEffect(() => {
    if (autoplay) {
      if (timer.current) clearTimeout(timer.current);
      timer.current = setInterval(() => {
        setCurrentSecond((v) => {
          const nextValue = v - 1;
          if (nextValue === 0 && timer.current) clearTimeout(timer.current);
          return nextValue;
        });
      }, 1000);
    } else {
      setCurrentSecond(0);
      if (timer.current) clearTimeout(timer.current);
    }

    return () => {
      if (timer.current) clearTimeout(timer.current);
    };
  }, [autoplay, version]);

  if (!autoplay || !currentSecond) return null;
  return (
    <Typography variant="subtitle1" component="span">
      {currentSecond}s
    </Typography>
  );
};

export default BackCounter;
