import { useState, type Dispatch } from "react";
import { motion } from "framer-motion";
import type { GameAction } from "../../types";
import { getRandomTopic } from "../../data/topics";
import { playClick } from "../../utils/clickSound";
import { containerVariants, itemVariants } from "../../utils/animations";

interface Props {
  dispatch: Dispatch<GameAction>;
  currentTopic: string | null;
}

export default function TopicRevealScreen({ dispatch, currentTopic }: Props) {
  const [revealedTopic, setRevealedTopic] = useState<string | null>(null);
  const handleRevealTopic = () => {
    playClick();
    const newTopic = getRandomTopic();
    setRevealedTopic(newTopic);
  };

  const handleContinue = () => {
    playClick();
    if (revealedTopic) {
      dispatch({ type: "START_ROUND", payload: { currentTopic: revealedTopic } });
    }
  };

  return revealedTopic ? (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants} className="bg-surface rounded-lg p-4">
        <p className="text-text-muted text-sm mb-1">Tema</p>
        <p className="text-text font-medium text-lg">{revealedTopic}</p>
      </motion.div>
      <motion.div variants={itemVariants}>
        <button
          onClick={handleContinue}
          className="block mx-auto bg-primary shadow-[0_5px_0_var(--color-primary-shadow)]
                    active:shadow-[0_1px_0_var(--color-primary-shadow)]
                    active:translate-y-[4px]
                    transition-all duration-75 ease-out
                    text-white font-semibold px-8 py-2.5 rounded-xl
                    cursor-pointer select-none"
        >
          Continuar →
        </button>
      </motion.div>
    </motion.div>
  ) : (
    <motion.div
      className="space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      {currentTopic !== null && (
        <motion.p variants={itemVariants} className="text-text">
          Tema anterior: <span className="font-semibold">{currentTopic}</span>
        </motion.p>
      )}
      <motion.div variants={itemVariants}>
        <button
          onClick={handleRevealTopic}
          className="block mx-auto bg-primary shadow-[0_5px_0_var(--color-primary-shadow)]
                    active:shadow-[0_1px_0_var(--color-primary-shadow)]
                    active:translate-y-[4px]
                    transition-all duration-75 ease-out
                    text-white font-semibold px-8 py-2.5 rounded-xl
                    cursor-pointer select-none"
        >
          Revelar Tema
        </button>
      </motion.div>
    </motion.div>
  );
}

