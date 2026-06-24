export type Team = 'teamA' | 'teamB';

export type RoundPhase =
  | 'waiting_start'
  | 'team_playing'
  | 'team_done'
  | 'second_team_playing'
  | 'second_team_done'
  | 'game_over';

export interface GameConfig {
  judgeName: string;
  teamAPlayers: string[];
  teamBPlayers: string[];
}

export interface GameState extends GameConfig {
  scores: Record<Team, number>;
  currentTeam: Team;
  roundPhase: RoundPhase;
}

export type GameAction =
  | { type: 'START_GAME'; payload: GameConfig; firstTeam: Team }
  | { type: 'START_ROUND' }
  | { type: 'TEAM_TIMER_DONE' }
  | { type: 'NEXT_TEAM' }
  | { type: 'SECOND_TEAM_TIMER_DONE' }
  | { type: 'JUDGE_DECIDES'; winner: Team }
  | { type: 'NEW_GAME' };
