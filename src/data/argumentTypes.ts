import type { ArgumentType } from '../types';

export const argumentTypes: Record<ArgumentType, { label: string; emoji: string; description: string }> = {
  humoristico: {
    label: "Humorístico",
    emoji: "😂",
    description: "Argumentos con un enfoque humorístico y satírico."
  },
  diplomatico: {
    label: "Diplomático",
    emoji: "🤝",
    description: "Argumentos con un enfoque diplomático y conciliador."
  },
  adoctrinador: {
    label: "Adoctrinador",
    emoji: "📚",
    description: "Argumentos con un enfoque educativo y persuasivo."
  },
  estilo_libre: {
    label: "Estilo Libre",
    emoji: "🎨",
    description: "Argumentos con un enfoque creativo y original."
  },
  emocional: {
    label: "Emocional",
    emoji: "❤️",
    description: "Argumentos con un enfoque emocional y sentimental."
  },
  cientifico: {
    label: "Científico",
    emoji: "🔬",
    description: "Argumentos con un enfoque científico y basado en evidencia."
  }
};

let lastArgumentType: ArgumentType | null = null;

export function getRandomArgumentType(): ArgumentType {
  const types = Object.keys(argumentTypes) as ArgumentType[];
  const available = lastArgumentType ? types.filter(t => t !== lastArgumentType) : types;
  const randomIndex = Math.floor(Math.random() * available.length);
  lastArgumentType = available[randomIndex];
  return lastArgumentType;
}
