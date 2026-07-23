import { useState, useRef, useEffect } from "react";
import { motion } from "framer-motion";
import type { Dispatch } from "react";
import type { GameAction } from "../../types";
import { getRandomArgumentType } from "../../data/argumentTypes";
import { argumentTypes } from "../../data/argumentTypes";
import { playClick } from "../../utils/clickSound";
import { containerVariants, itemVariants } from "../../utils/animations";

interface Props {
  dispatch: Dispatch<GameAction>;
}

export default function DiceRollScreen({ dispatch }: Props) {
  const [isRolling, setIsRolling] = useState(false);
  const [displayEmoji, setDisplayEmoji] = useState("🎲");
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);
  const allEmojis = Object.values(argumentTypes).map((t) => t.emoji);

  useEffect(() => {
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, []);

  const handleRollDice = () => {
    playClick();
    if (isRolling) return;
    setIsRolling(true);

    intervalRef.current = setInterval(() => {
      const randomEmoji = allEmojis[Math.floor(Math.random() * allEmojis.length)];
      setDisplayEmoji(randomEmoji);
    }, 100);

    setTimeout(() => {
      if (intervalRef.current) clearInterval(intervalRef.current);
      const result = getRandomArgumentType();
      setDisplayEmoji(argumentTypes[result].emoji);
      setTimeout(() => {
        dispatch({ type: "DICE_ROLLED", payload: { argumentType: result } });
      }, 300);
    }, 1200);
  };

  return (
    <motion.div
      className="bg-surface-alt rounded-xl p-8 shadow-lg max-w-md w-full text-center space-y-6"
      variants={containerVariants}
      initial="hidden"
      animate="show"
    >
      <motion.h2 variants={itemVariants} className="text-2xl font-bold text-text font-display">Tirar dado</motion.h2>
      <motion.p variants={itemVariants} className="text-text-muted">Descubre el tipo de argumentación</motion.p>
      <motion.div variants={itemVariants}>
        <span
          className={`inline-block text-6xl transition-all duration-100 ${
            isRolling ? "rotate-12 scale-110" : "rotate-0 scale-100"
          }`}
        >
          {displayEmoji}
        </span>
      </motion.div>
      <motion.div variants={itemVariants}>
        <button
          onClick={handleRollDice}
          disabled={isRolling}
          className="w-full bg-primary shadow-[0_5px_0_var(--color-primary-shadow)] active:shadow-[0_1px_0_var(--color-primary-shadow)] active:translate-y-[4px] transition-all duration-75 ease-out text-white font-semibold px-6 py-3 rounded-xl cursor-pointer select-none disabled:opacity-50 disabled:active:translate-y-0 disabled:shadow-[0_5px_0_var(--color-primary-shadow)]"
        >
          {isRolling ? "Tirando..." : "Tirar dado"}
        </button>
      </motion.div>
    </motion.div>
  );
}