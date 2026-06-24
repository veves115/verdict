import type { GameState, GameAction } from './types';

const WINNING_SCORE = 5;

export const initialState: GameState = {
  judgeName: '',
  teamAPlayers: [],
  teamBPlayers: [],
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
        roundPhase: 'waiting_start',
      };

    case 'START_ROUND':
      return { ...state, roundPhase: 'team_playing' };

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
      return {
        ...state,
        scores: newScores,
        currentTeam: action.winner,
        roundPhase: isGameOver ? 'game_over' : 'waiting_start',
      };
    }

    case 'NEW_GAME':
      return { ...initialState };

    default:
      return state;
  }
}
