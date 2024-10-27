export const HiWorker = (name: string) => {
  const now = new Date();
  const hour = now.getHours();

  if (hour >= 7 && hour < 12) {
    return `¡Buenos días ${name}!`;
  } else if (hour >= 12 && hour < 20) {
    return `¡Buenas tardes ${name}!`;
  } else if (hour >= 20 && hour <= 23) {
    return `¡Buenas noches ${name}!`;
  } else {
    return `¡Es de madrugada ${name}!`;
  }
};
