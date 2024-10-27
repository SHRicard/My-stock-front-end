export const isValidDimension = (value: string) => {
  const tirePattern = /^\d{3}\/\d{2}\sR\d{2}$/; // Para formato 225/55 R17
  const mmPattern = /^\d+MM$/; // Para formato 36MM
  return tirePattern.test(value) || mmPattern.test(value);
};
