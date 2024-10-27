export const CalculateWorkHours = (
  startTime: string,
  endTime: string
): string => {
  // Convertir los tiempos a objetos Date
  const start = new Date(startTime);
  const end = new Date(endTime);

  // Calcular la diferencia en milisegundos
  const diffInMs = end.getTime() - start.getTime();

  // Convertir los milisegundos a horas y minutos
  const hours = Math.floor(diffInMs / (1000 * 60 * 60));
  const minutes = Math.floor((diffInMs % (1000 * 60 * 60)) / (1000 * 60));

  // Retornar el resultado en el formato "X hrs Y min"
  return `${hours} hrs ${minutes} min`;
};
