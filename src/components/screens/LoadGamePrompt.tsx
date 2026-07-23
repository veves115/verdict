import { motion } from "framer-motion";
import { playClick } from "../../utils/clickSound";
import { containerVariants, itemVariants } from "../../utils/animations";

interface Props {
    onContinue: () => void;
    onStartNewGame: () => void;
}

export default function LoadGamePrompt({ onContinue, onStartNewGame }: Props) {
    return (
  <motion.div
    className="bg-surface-alt rounded-xl p-8 shadow-lg max-w-md w-full text-center space-y-6"
    variants={containerVariants}
    initial="hidden"
    animate="show"
  >
    <motion.h2 variants={itemVariants} className="text-2xl font-bold text-text">Partida guardada encontrada</motion.h2>
    <motion.p variants={itemVariants} className="text-text-muted">Hay una partida en curso. ¿Qué deseas hacer?</motion.p>
    <motion.div variants={itemVariants} className="flex gap-4 justify-center">
      <button
        onClick={() => { playClick(); onContinue(); }}
        className="bg-primary shadow-[0_5px_0_var(--color-primary-shadow)]
active:shadow-[0_1px_0_var(--color-primary-shadow)]
active:translate-y-[4px]
transition-all duration-75 ease-out
text-white font-semibold px-6 py-3 rounded-xl
cursor-pointer select-none"
      >
        Continuar
      </button>
      <button
        onClick={() => { playClick(); onStartNewGame(); }}
        className="bg-bg-elevated shadow-[0_5px_0_#1a1a2e]
active:shadow-[0_1px_0_#1a1a2e]
active:translate-y-[4px]
transition-all duration-75 ease-out
text-text font-semibold px-6 py-3 rounded-xl
cursor-pointer select-none"
      >
        Nueva partida
      </button>
    </motion.div>
  </motion.div>
);
}

