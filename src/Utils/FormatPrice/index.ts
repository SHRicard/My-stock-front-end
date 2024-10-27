export const FormatPrice = (value: string) => {
  // Eliminamos cualquier carácter que no sea un número
  const numericValue = value.replace(/\D/g, "");

  // Formateamos el número con comas como separador de miles
  return numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ".");
};
