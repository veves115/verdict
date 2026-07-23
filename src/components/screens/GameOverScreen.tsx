import { motion } from "framer-motion";
import type { Dispatch } from 'react';
import type { GameAction } from '../../types';
import type { Team } from '../../types';
import { playClick } from '../../utils/clickSound';
import { containerVariants, itemVariants } from '../../utils/animations';

interface Props {
    dispatch: Dispatch<GameAction>;
    scores: Record<Team, number>
}

export default function GameOverScreen({ dispatch, scores }: Props) {

    const handleRestartGame = () => {
        playClick();
        dispatch({ type: "NEW_GAME" });
    };

    return (
  <motion.div
    className="bg-surface-alt rounded-xl p-8 shadow-lg max-w-md w-full text-center space-y-6"
    variants={containerVariants}
    initial="hidden"
    animate="show"
  >
    <motion.h2 variants={itemVariants} className="text-3xl font-bold text-text">Fin del juego</motion.h2>
    <motion.p variants={itemVariants} className="text-xl font-semibold text-primary">
      Ganador: {scores.teamA > scores.teamB ? "Equipo A" : "Equipo B"}
    </motion.p>
    <motion.div variants={itemVariants} className="flex justify-center gap-8">
      <p className="text-lg font-semibold text-accent-a">Equipo A: {scores.teamA}</p>
      <p className="text-lg font-semibold text-accent-b">Equipo B: {scores.teamB}</p>
    </motion.div>
    <motion.div variants={itemVariants}>
      <button
        onClick={handleRestartGame}
        className="bg-primary shadow-[0_5px_0_var(--color-primary-shadow)]
  active:shadow-[0_1px_0_var(--color-primary-shadow)]
  active:translate-y-[4px]
  transition-all duration-75 ease-out
  text-white font-semibold px-6 py-3 rounded-xl
  cursor-pointer select-none"
      >
        Nueva partida
      </button>
    </motion.div>
  </motion.div>
);
}