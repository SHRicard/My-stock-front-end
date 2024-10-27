export const WorkHours = (startTime: string): string => {
  const startDate = new Date(startTime); // Convierte el string de hora de inicio en un objeto Date
  const currentDate = new Date(); // Obtiene la hora actual

  // Calcular la diferencia en milisegundos
  const differenceInMs = currentDate.getTime() - startDate.getTime();

  // Convertir la diferencia en horas y minutos
  const hours = Math.floor(differenceInMs / (1000 * 60 * 60)); // Convierte milisegundos a horas
  const minutes = Math.floor((differenceInMs % (1000 * 60 * 60)) / (1000 * 60)); // Resto a minutos

  // Formatear el resultado
  return `${hours}hr ${minutes}min`;
};
