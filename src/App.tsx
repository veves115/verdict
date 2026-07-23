import { useReducer, useEffect, useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { gameReducer, initialState } from "./gameReducer";
import StartScreen from "./components/screens/StartScreen";
import TopicRevealScreen from "./components/screens/TopicRevealScreen";
import DiceRollScreen from "./components/screens/DiceRollScreen";
import TeamPlayingScreen from "./components/screens/TeamPlayingScreen";
import TeamDoneScreen from "./components/screens/TeamDoneScreen";
import GameOverScreen from "./components/screens/GameOverScreen";
import JudgeDecidesScreen from "./components/screens/JudgeDecidesScreen";
import LoadGamePrompt from "./components/screens/LoadGamePrompt";
import WelcomeScreen from "./components/screens/WelcomeScreen";
import type { GameState } from "./types";

function loadInitialState(): GameState {
  try {
    const saved = localStorage.getItem("verdict-game");
    if (!saved) return initialState;
    const parsed = JSON.parse(saved);
    return { ...initialState, ...parsed };
  } catch {
    return initialState;
  }
}

export default function App() {
  const [gameState, dispatch] = useReducer(gameReducer, loadInitialState());
  const [showPrompt, setShowPrompt] = useState(() => {
    try {
      const saved = localStorage.getItem("verdict-game");
      if (!saved) return false;
      const parsed = JSON.parse(saved);
      return parsed?.roundPhase && parsed.roundPhase !== "waiting_start";
    } catch {
      return false;
    }
  });
  const [showWelcome, setShowWelcome] = useState(true);

  useEffect(() => {
    if (gameState.roundPhase !== "waiting_start") {
      localStorage.setItem("verdict-game", JSON.stringify(gameState));
    }
  }, [gameState]);

  const currentTeamName =
    gameState.currentTeam === "teamA"
      ? gameState.teamA.name
      : gameState.teamB.name;

  const getCurrentPlayerName = () => {
    const config = gameState.currentTeam === "teamA" ? gameState.teamA : gameState.teamB;
    return config.players[config.currentPlayerIndex] ?? "Jugador";
  };

  function renderScreen() {
    if (showWelcome) {
      return <WelcomeScreen onPlay={() => setShowWelcome(false)} />;
    }
    if (showPrompt) {
      return (
        <LoadGamePrompt
          onContinue={() => setShowPrompt(false)}
          onStartNewGame={() => {
            localStorage.removeItem("verdict-game");
            dispatch({ type: "NEW_GAME" });
            setShowPrompt(false);
          }}
        />
      );
    }
    switch (gameState.roundPhase) {
      case "waiting_start":
        return (
          <StartScreen
            onStart={(config, firstTeam) =>
              dispatch({ type: "START_GAME", payload: config, firstTeam })
            }
          />
        );
      case "topic_reveal":
        return (
          <TopicRevealScreen
            dispatch={dispatch}
            currentTopic={gameState.currentTopic}
          />
        );
      case "dice_roll":
        return <DiceRollScreen dispatch={dispatch}/>;
      case "team_playing":
        return (
          <TeamPlayingScreen
            phase="first"
            teamName={currentTeamName}
            currentPlayerName={getCurrentPlayerName()}
            dispatch={dispatch}
            team={gameState.currentTeam}
            argumentType={gameState.argumentType!}
            currentTopic={gameState.currentTopic!}
          />
        );
      case "team_done":
        return (
          <TeamDoneScreen dispatch={dispatch} team={gameState.currentTeam} />
        );
      case "second_team_playing":
        return (
          <TeamPlayingScreen
            phase="second"
            teamName={currentTeamName}
            currentPlayerName={getCurrentPlayerName()}
            dispatch={dispatch}
            argumentType={gameState.argumentType!}
            team={gameState.currentTeam}
            currentTopic={gameState.currentTopic!}
          />
        );
      case "second_team_done":
        return (
          <JudgeDecidesScreen dispatch={dispatch} scores={gameState.scores} />
        );
      case "game_over":
        return <GameOverScreen dispatch={dispatch} scores={gameState.scores} />;
      default:
        return <div>Fase de juego desconocida</div>;
    }
  }
  function getScreenKey() {
    if (showWelcome) return "welcome";
    if (showPrompt) return "prompt";
    return gameState.roundPhase;
  }

  return (
    <div className="min-h-screen flex items-center justify-center p-4">
      <AnimatePresence mode="wait">
        <motion.div
          key={getScreenKey()}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -20 }}
          transition={{ duration: 0.25, ease: "easeOut" }}
          className="w-full flex justify-center"
        >
          {renderScreen()}
        </motion.div>
      </AnimatePresence>
    </div>
  );
}
