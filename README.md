# Verdict

Juego de debate por equipos (2 equipos + 1 juez) para aprender fundamentos de tecnología discutiendo temas controversiales. Hotseat — un solo dispositivo, sin backend.

## Stack

- **React 19** + **TypeScript 6**
- **Vite 8** + **Tailwind CSS 4**
- **Framer Motion** (transiciones de pantalla y animaciones internas)
- **Vitest** (tests unitarios)
- **Web Audio API** (sonido de clic)
- **localStorage** (persistencia de partida)

## Cómo jugar

1. **Welcome** — Pantalla de bienvenida.
2. **Start** — Configurar juez, nombres de equipos y jugadores (mínimo 1 por equipo).
3. **Topic Reveal** — Se revela un tema de debate aleatorio (sin repetir el anterior).
4. **Dice Roll** — Se sortea un estilo de argumento (6 tipos, sin repetir el anterior).
5. **Team Playing** — El equipo tiene 60 segundos para dar su argumento. El contador late cuando quedan ≤10s.
6. **Team Done** — Fin del turno del primer equipo.
7. **Second Team Playing** — El segundo equipo debate el mismo tema con su propio turno de 60s.
8. **Judge Decides** — El juez elige qué equipo ganó la ronda (suma 1 punto).
9. **Game Over** — Al llegar a 5 puntos, se declara ganador y se puede reiniciar.

Los jugadores rotan automáticamente cada ronda.

## Estilos de argumento

| Tipo | Emoji | Enfoque |
|---|---|---|
| Humorístico | 😂 | Satírico y humorístico |
| Diplomático | 🤝 | Conciliador y negociador |
| Adoctrinador | 📚 | Educativo y persuasivo |
| Estilo Libre | 🎨 | Creativo y original |
| Emocional | ❤️ | Emocional y sentimental |
| Científico | 🔬 | Basado en evidencia |

## Temas

Seis temas controversiales predefinidos para debatir (IA, clima, educación, redes sociales, pena de muerte, veganismo). Sin repetición consecutiva.

## Arquitectura

```
src/
├── App.tsx                     # Root: useReducer + AnimatePresence + persistencia
├── gameReducer.ts              # Máquina de estados (8 fases)
├── types.ts                    # Tipos del dominio
├── main.tsx                    # Entry point
├── index.css                   # Tema claro, fuentes, keyframes
├── components/screens/         # 9 pantallas (Welcome, Start, TopicReveal, DiceRoll,
│                               #   TeamPlaying, TeamDone, JudgeDecides, GameOver,
│                               #   LoadGamePrompt)
├── data/
│   ├── topics.ts               # Temas de debate
│   └── argumentTypes.ts        # Estilos de argumento
├── hooks/
│   └── useCountdown.ts         # Cuenta regresiva 60s
└── utils/
    ├── animations.ts           # containerVariants / itemVariants (Framer Motion)
    └── clickSound.ts           # Web Audio API click
```

### Flujo de estados

```
waiting_start → topic_reveal → dice_roll → team_playing
  → team_done → second_team_playing → second_team_done
  → (JUDGE_DECIDES) → topic_reveal | game_over
```

## Desarrollo

```bash
npm install
npm run dev       # Desarrollo
npm run build     # Build producción
npm run test      # Tests
```

## Despliegue

```bash
npm run build
```

Hosteado en Vercel: _pendiente — importa el repositorio en https://vercel.com/new_
