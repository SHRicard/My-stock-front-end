import { useState, useEffect } from "react";

export const TimeZone = ({ timestamp }: { timestamp: string }) => {
  const [timeAgo, setTimeAgo] = useState("");

  useEffect(() => {
    const updateTimeAgo = () => {
      const date = new Date(timestamp);
      const now = new Date();
      const differenceInMs = now.getTime() - date.getTime();

      const differenceInSeconds = Math.floor(differenceInMs / 1000);
      const differenceInMinutes = Math.floor(differenceInSeconds / 60);
      const remainingSeconds = differenceInSeconds % 60;
      const differenceInHours = Math.floor(differenceInMinutes / 60);

      let formattedTimeAgo = "";

      if (differenceInHours > 0) {
        formattedTimeAgo = `hace ${differenceInHours} horas, ${
          differenceInMinutes % 60
        } minutos, y ${remainingSeconds} segundos`;
      } else if (differenceInMinutes > 0) {
        formattedTimeAgo = `hace ${differenceInMinutes} minutos y ${remainingSeconds} segundos`;
      } else {
        formattedTimeAgo = `hace ${remainingSeconds} segundos`;
      }

      setTimeAgo(formattedTimeAgo);
    };

    updateTimeAgo();

    const interval = setInterval(updateTimeAgo, 1000);

    return () => clearInterval(interval);
  }, [timestamp]);

  return <span>{timeAgo}</span>;
};
