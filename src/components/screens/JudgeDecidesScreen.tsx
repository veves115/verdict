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

export default function JudgeDecidesScreen({ dispatch, scores }: Props) {

    const handleTeamAWins = () => {
        playClick();
        dispatch({ type: "JUDGE_DECIDES", winner: 'teamA' });
    };

    const handleTeamBWins = () => {
        playClick();
        dispatch({ type: "JUDGE_DECIDES", winner: 'teamB' });
    };

    return (
  <motion.div
    className="bg-surface-alt rounded-xl p-8 shadow-lg max-w-md w-full text-center space-y-6"
    variants={containerVariants}
    initial="hidden"
    animate="show"
  >
    <motion.h2 variants={itemVariants} className="text-2xl font-bold text-text">Decisión del juez</motion.h2>
    <motion.div variants={itemVariants} className="flex justify-center gap-8">
      <p className="text-lg font-semibold text-accent-a">Equipo A: {scores.teamA}</p>
      <p className="text-lg font-semibold text-accent-b">Equipo B: {scores.teamB}</p>
    </motion.div>
    <motion.p variants={itemVariants} className="text-text-muted">¿Qué equipo gana esta ronda?</motion.p>
    <motion.div variants={itemVariants} className="flex gap-4 justify-center">
      <button
        onClick={handleTeamAWins}
        className="flex-1
bg-accent-a shadow-[0_5px_0_#2a9d7a]
active:shadow-[0_1px_0_#2a9d7a]
active:translate-y-[4px]
transition-all duration-75 ease-out
text-white font-semibold px-4 py-3 rounded-xl
cursor-pointer select-none"
      >
        Equipo A gana
      </button>
      <button
        onClick={handleTeamBWins}
        className="flex-1
bg-accent-b shadow-[0_5px_0_#3b82f6]
active:shadow-[0_1px_0_#3b82f6]
active:translate-y-[4px]
transition-all duration-75 ease-out
text-white font-semibold px-4 py-3 rounded-xl
cursor-pointer select-none"
      >
        Equipo B gana
      </button>
    </motion.div>
  </motion.div>
);
}