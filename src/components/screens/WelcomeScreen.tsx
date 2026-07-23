import { motion } from "framer-motion";
import { playClick } from "../../utils/clickSound";
import { containerVariants, itemVariants } from "../../utils/animations";

interface Props {
    onPlay: () => void;
}

export default function WelcomeScreen({ onPlay }: Props) {
  return (
    <motion.div
      className="text-center space-y-8"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="space-y-2">
        <h1 className="font-display text-6xl font-bold text-text">
          Verdict
        </h1>
        <p className="text-lg text-text-muted">
          Juego de debate por equipos
        </p>
      </motion.div>
      <motion.div variants={itemVariants}>
        <button
          onClick={() => { playClick(); onPlay(); }}
          className="bg-primary shadow-[0_5px_0_var(--color-primary-hover)] active:shadow-[0_1px_0_var(--color-primary-hover)] active:translate-y-[4px] transition-all duration-75 ease-out text-white font-semibold px-10 py-4 rounded-xl text-lg cursor-pointer select-none"
        >
          Jugar
        </button>
      </motion.div>
    </motion.div>
  );
}