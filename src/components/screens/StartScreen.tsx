import { useState } from 'react';
import { motion } from 'framer-motion';
import type { GameConfig } from '../../types';
import { playClick } from '../../utils/clickSound';
import { containerVariants, itemVariants } from '../../utils/animations';

interface Props {
  onStart: (config: GameConfig, firstTeam: 'teamA' | 'teamB') => void;
}

export default function StartScreen({ onStart }: Props) {
const [judgeName, setJudgeName] = useState('');
const [teamAName, setTeamAName] = useState('');
const [teamBName, setTeamBName] = useState('');
const [teamAPlayers, setTeamAPlayers] = useState<string[]>([]);
const [teamBPlayers, setTeamBPlayers] = useState<string[]>([]);
const [teamAPlayerInput, setTeamAPlayerInput] = useState('');
const [teamBPlayerInput, setTeamBPlayerInput] = useState('');
const [error, setError] = useState<string | null>(null);

const handleStartGame = () => {
  playClick();
  const rules = [
    { test: !judgeName.trim(), msg: "El nombre del juez es obligatorio." },
    { test: !teamAName.trim(), msg: "El nombre del equipo A es obligatorio." },
    { test: !teamBName.trim(), msg: "El nombre del equipo B es obligatorio." },
    { test: teamAPlayers.length === 0, msg: "El equipo A debe tener al menos un jugador." },
    { test: teamBPlayers.length === 0, msg: "El equipo B debe tener al menos un jugador." },
  ];

  for (const rule of rules) {
    if (rule.test) {
      setError(rule.msg);
      return;
    }
  }

  setError(null);
  const config: GameConfig = {
    teamA: { name: teamAName, players: teamAPlayers, currentPlayerIndex: 0 },
    teamB: { name: teamBName, players: teamBPlayers, currentPlayerIndex: 0 },
    judgeName,
  };
  const firstTeam = Math.random() < 0.5 ? "teamA" : "teamB";
  onStart(config, firstTeam);
};

function handleAddPlayer(team: 'A' | 'B') {
  playClick();
  if (team === 'A') {
    setTeamAPlayers([...teamAPlayers,teamAPlayerInput]);
    setTeamAPlayerInput('');
  } else {
    setTeamBPlayers([...teamBPlayers, teamBPlayerInput]);
    setTeamBPlayerInput('');
  }
};

function onRemoveA(index: number) {
  setTeamAPlayers(teamAPlayers.filter((_, i) => i !== index));
}
function onRemoveB(index: number) {
  setTeamBPlayers(teamBPlayers.filter((_, i) => i !== index));
}
return (
  <motion.div
    className="bg-surface-alt rounded-xl p-8 shadow-lg max-w-lg w-full space-y-6"
    variants={containerVariants}
    initial="hidden"
    animate="show"
  >
    <motion.h1 variants={itemVariants} className="text-2xl font-bold text-text text-center">Crear la partida</motion.h1>

    {/* Juez */}
    <motion.div variants={itemVariants} className="space-y-2">
      <label className="block text-sm font-medium text-text-muted">Juez</label>
      <input
        value={judgeName}
        onChange={(e) => setJudgeName(e.target.value)}
        placeholder="Nombre del juez"
        className="w-full bg-surface text-text px-4 py-2.5 rounded-lg border border-surface-hover focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/50"
      />
    </motion.div>

    {/* Equipo A */}
    <motion.div variants={itemVariants} className="space-y-2">
      <label className="block text-sm font-medium text-accent-a">Equipo A</label>
      <input
        value={teamAName}
        onChange={(e) => setTeamAName(e.target.value)}
        placeholder="Nombre del equipo"
        className="w-full bg-surface text-text px-4 py-2.5 rounded-lg border border-surface-hover focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/50"
      />
      <div className="flex gap-2">
        <input
          value={teamAPlayerInput}
          onChange={(e) => setTeamAPlayerInput(e.target.value)}
          placeholder="Agregar jugador"
          className="flex-1 bg-surface text-text px-4 py-2 rounded-lg border border-surface-hover focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/50"
        />
        <button
          onClick={() => handleAddPlayer('A')}
          className="flex-1
bg-accent-a shadow-[0_5px_0_#2a9d7a]
active:shadow-[0_1px_0_#2a9d7a]
active:translate-y-[4px]
transition-all duration-75 ease-out
text-white font-semibold px-4 py-3 rounded-xl
cursor-pointer select-none"
        >
          +
        </button>
      </div>
      {teamAPlayers.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {teamAPlayers.map((p, i) => (
            <li key={i} className="bg-surface text-text text-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span>{p}</span>
              <button
                onClick={() => onRemoveA(i)}
                aria-label={`Quitar ${p}`}
                className="text-text-muted hover:text-danger transition-colors text-xs cursor-pointer"
              >✕</button>
            </li>
          ))}
        </ul>
      )}
    </motion.div>

    {/* Equipo B */}
    <motion.div variants={itemVariants} className="space-y-2">
      <label className="block text-sm font-medium text-accent-b">Equipo B</label>
      <input
        value={teamBName}
        onChange={(e) => setTeamBName(e.target.value)}
        placeholder="Nombre del equipo"
        className="w-full bg-surface text-text px-4 py-2.5 rounded-lg border border-surface-hover focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/50"
      />
      <div className="flex gap-2">
        <input
          value={teamBPlayerInput}
          onChange={(e) => setTeamBPlayerInput(e.target.value)}
          placeholder="Agregar jugador"
          className="flex-1 bg-surface text-text px-4 py-2 rounded-lg border border-surface-hover focus:outline-none focus:border-primary transition-colors placeholder:text-text-muted/50"
        />
        <button
          onClick={() => handleAddPlayer('B')}
          className="flex-1
bg-accent-b shadow-[0_5px_0_#3b82f6]
active:shadow-[0_1px_0_#3b82f6]
active:translate-y-[4px]
transition-all duration-75 ease-out
text-white font-semibold px-4 py-3 rounded-xl
cursor-pointer select-none"
        >
          +
        </button>
      </div>
      {teamBPlayers.length > 0 && (
        <ul className="flex flex-wrap gap-2">
          {teamBPlayers.map((p, i) => (
            <li key={i} className="bg-surface text-text text-sm px-3 py-1.5 rounded-lg flex items-center gap-2">
              <span>{p}</span>
              <button
                onClick={() => onRemoveB(i)}
                aria-label={`Quitar ${p}`}
                className="text-text-muted hover:text-danger transition-colors text-xs cursor-pointer"
              >✕</button>
            </li>
          ))}
        </ul>
      )}
    </motion.div>
      {error && (
        <motion.p variants={itemVariants} className="text-danger text-sm text-center">{error}</motion.p>
      )}
    <motion.div variants={itemVariants}>
      <button
        onClick={handleStartGame}
        className="w-full bg-primary shadow-[0_5px_0_var(--color-primary-shadow)] active:shadow-[0_1px_0_var(--color-primary-shadow)] active:translate-y-[4px] transition-all duration-75 ease-out text-white font-semibold py-3 rounded-xl cursor-pointer select-none"
      >
        Iniciar Juego
      </button>
    </motion.div>
  </motion.div>
);
}
