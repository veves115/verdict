import { motion } from "framer-motion";
import type { Dispatch } from 'react';
import type { GameAction, Team } from '../../types';
import { playClick } from '../../utils/clickSound';
import { containerVariants, itemVariants } from '../../utils/animations';

interface Props {
    dispatch: Dispatch<GameAction>;
    team: Team;
}

export default function TeamDoneScreen({ dispatch, team }: Props) {

    const handleNextTeam = () => {
        playClick();
        dispatch({ type: "NEXT_TEAM" });
    };

    return (
  <motion.div
    className="bg-surface-alt rounded-xl p-8 shadow-lg max-w-md w-full text-center space-y-6"
    variants={containerVariants}
    initial="hidden"
    animate="show"
  >
    <motion.h2 variants={itemVariants} className="text-2xl font-bold text-text">Fin del turno</motion.h2>
    <motion.p variants={itemVariants} className="text-text-muted">El equipo {team} ha completado su argumento.</motion.p>
    <motion.div variants={itemVariants}>
      <button
        onClick={handleNextTeam}
        className="bg-primary shadow-[0_5px_0_var(--color-primary-shadow)]
  active:shadow-[0_1px_0_var(--color-primary-shadow)]
  active:translate-y-[4px]
  transition-all duration-75 ease-out
  text-white font-semibold px-6 py-3 rounded-xl
  cursor-pointer select-none"
      >
        Siguiente equipo
      </button>
    </motion.div>
  </motion.div>
);
}