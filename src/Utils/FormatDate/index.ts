export const FormatDate = (workDate: string): string => {
  const date = new Date(workDate);
  const options: Intl.DateTimeFormatOptions = {
    day: "numeric",
    month: "long", // Muestra el nombre completo del mes
    year: "numeric", // Incluye el año
  };

  // Formatear la fecha a "10 de octubre de 2024"
  return date.toLocaleDateString("es-ES", options);
};
