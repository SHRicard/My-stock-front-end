import { useState, useEffect } from "react";
import { WorkHours } from "../../Utils";

interface TimeTrackerProps {
  startTime: string;
}

export const TimeTracker = ({ startTime }: TimeTrackerProps) => {
  const [elapsedTime, setElapsedTime] = useState(WorkHours(startTime));

  useEffect(() => {
    // Actualiza el tiempo transcurrido inicialmente
    setElapsedTime(WorkHours(startTime));

    // Actualiza el tiempo transcurrido cada minuto (60,000 ms)
    const intervalId = setInterval(() => {
      setElapsedTime(WorkHours(startTime)); // Actualiza el estado con el tiempo transcurrido
    }, 60000); // Ejecuta cada 60 segundos

    // Limpia el intervalo cuando el componente se desmonta
    return () => clearInterval(intervalId);
  }, [startTime]); // Ejecuta nuevamente si `startTime` cambia

  return <>{elapsedTime}</>; // Devuelve el tiempo transcurrido
};
