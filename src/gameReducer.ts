import type { GameState, GameAction } from './types';

const WINNING_SCORE = 5;

export const initialState: GameState = {
  judgeName: '',
  currentTopic: null,
  argumentType: null,
  teamA: { name: '', players: [], currentPlayerIndex: 0 },
  teamB: { name: '', players: [], currentPlayerIndex: 0 },
  scores: { teamA: 0, teamB: 0 },
  currentTeam: 'teamA',
  roundPhase: 'waiting_start',
};

export function gameReducer(state: GameState, action: GameAction): GameState {
  switch (action.type) {
    case 'START_GAME':
      return {
        ...initialState,
        ...action.payload,
        currentTeam: action.firstTeam,
        roundPhase: 'topic_reveal',
      };

    case 'DICE_ROLLED':
      return { ...state, argumentType: action.payload.argumentType, roundPhase: 'team_playing' };

    case 'START_ROUND':
      return { ...state, currentTopic: action.payload.currentTopic, roundPhase: 'dice_roll' };

    case 'TEAM_TIMER_DONE':
      return { ...state, roundPhase: 'team_done' };

    case 'NEXT_TEAM':
      return { ...state, roundPhase: 'second_team_playing' };

    case 'SECOND_TEAM_TIMER_DONE':
      return { ...state, roundPhase: 'second_team_done' };

    case 'JUDGE_DECIDES': {
      const newScores = {
        ...state.scores,
        [action.winner]: state.scores[action.winner] + 1,
      };
      const isGameOver = newScores[action.winner] >= WINNING_SCORE;

      const advanceIndex = (players: string[], current: number) =>
        players.length > 0 ? (current + 1) % players.length : 0;

      return {
        ...state,
        scores: newScores,
        currentTeam: action.winner,
        teamA: {
          ...state.teamA,
          currentPlayerIndex: advanceIndex(state.teamA.players, state.teamA.currentPlayerIndex),
        },
        teamB: {
          ...state.teamB,
          currentPlayerIndex: advanceIndex(state.teamB.players, state.teamB.currentPlayerIndex),
        },
        roundPhase: isGameOver ? 'game_over' : 'topic_reveal',
      };
    }

    case 'NEW_GAME':
      return { ...initialState };

    default:
      return state;
  }
}
