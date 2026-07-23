import { motion } from "framer-motion";
import type { Dispatch } from "react";
import type { GameAction, Team, ArgumentType } from "../../types";
import { useCountdown } from "../../hooks/useCountdown";
import { argumentTypes } from "../../data/argumentTypes";
import { containerVariants, itemVariants } from "../../utils/animations";

interface Props {
  dispatch: Dispatch<GameAction>;
  team: Team;
  teamName: string;
  currentPlayerName: string;
  scores?: Record<Team, number>;
  argumentType: ArgumentType;
  currentTopic: string;
  phase: "first" | "second";
}

export default function TeamPlayingScreen({
  dispatch,
  teamName,
  currentPlayerName,
  argumentType,
  currentTopic,
  phase,
}: Props) {
  const doneAction: GameAction =
    phase === "first"
      ? { type: "TEAM_TIMER_DONE" }
      : { type: "SECOND_TEAM_TIMER_DONE" };

  const { timeLeft, display } = useCountdown(60, () => dispatch(doneAction));

  const estilo = argumentTypes[argumentType];
  const isLow = timeLeft <= 10;

  return (
    <motion.div
      className="bg-surface-alt rounded-xl p-8 shadow-lg max-w-md w-full text-center space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.div variants={itemVariants}>
        <p className="text-lg font-semibold text-primary">Turno de {teamName}</p>
        <p className="text-sm text-text-muted">Jugador: {currentPlayerName}</p>
      </motion.div>
      <motion.div variants={itemVariants}>
        <p className="text-text-muted text-sm">Tema</p>
        <p className="text-text font-medium">{currentTopic}</p>
      </motion.div>
      <motion.div variants={itemVariants} className="bg-surface rounded-lg p-4 space-y-1">
        <p className="text-4xl">{estilo.emoji}</p>
        <p className="text-lg font-bold text-text">{estilo.label}</p>
        <p className="text-sm text-text-muted">{estilo.description}</p>
      </motion.div>
      <motion.div variants={itemVariants}>
        <div className={`mx-auto w-28 h-28 rounded-full flex items-center justify-center
          ${isLow
            ? 'bg-bg-elevated shadow-[0_0_24px_rgba(248,113,113,0.3)]'
            : 'bg-bg-elevated shadow-[0_0_24px_rgba(124,111,247,0.3)]'
          }`}>
          <p
            key={timeLeft}
            className={`font-display text-4xl font-bold animate-heartbeat
              ${isLow ? 'text-danger animate-pulse' : 'text-primary'}`}
          >
            {display}
          </p>
        </div>
      </motion.div>
    </motion.div>
  );
}
