export const FormatDocument = (document: string): string => {
  // Eliminar cualquier cosa que no sea dígito, en caso de que ya venga con puntos o caracteres no deseados
  const cleanDocument = document.replace(/\D/g, "");

  // Formatear el documento
  return cleanDocument.replace(/(\d{2})(\d{3})(\d{3})/, "$1.$2.$3");
};
