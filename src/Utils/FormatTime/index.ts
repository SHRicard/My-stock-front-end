export const FormatTime = (dateString: string): string => {
  const date = new Date(dateString); // Convierte el string en un objeto Date
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    hour12: true, // Formato de 12 horas
  });
};
