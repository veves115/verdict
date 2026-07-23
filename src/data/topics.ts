export const topics = [
  "La inteligencia artificial reemplazará a los humanos en el trabajo",
  "El cambio climático es la mayor amenaza para la humanidad",
  "La educación en línea es más efectiva que la educación presencial",
  "El uso de redes sociales tiene un impacto negativo en la salud mental",
  "La pena de muerte debería ser abolida en todo el mundo",
  "El veganismo es la mejor opción para el medio ambiente y la salud",
];

let lastTopic: string | null = null;

export function getRandomTopic(avoid?: string): string {
  const available = avoid ? topics.filter((t) => t !== avoid) : topics;
  const randomIndex = Math.floor(Math.random() * available.length);
  lastTopic = available[randomIndex];
  return lastTopic;
}