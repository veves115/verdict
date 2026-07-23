export type Team = 'teamA' | 'teamB';

export type ArgumentType = 
  | 'humoristico'
  | 'diplomatico'
  | 'adoctrinador'
  | 'estilo_libre'
  | 'emocional'
  | 'cientifico'

export type RoundPhase =
  | 'waiting_start'
  | 'topic_reveal'
  | 'dice_roll'
  | 'team_playing'
  | 'team_done'
  | 'second_team_playing'
  | 'second_team_done'
  | 'game_over';

  export interface TeamConfig {
    name: string;
    players: string[];
    currentPlayerIndex: number;
  }
export interface GameConfig {
  judgeName: string;
  teamA: TeamConfig;
  teamB: TeamConfig;
}

export interface GameState extends GameConfig {
  currentTopic: string | null;
  argumentType: ArgumentType | null;  
  scores: Record<Team, number>;
  currentTeam: Team;
  roundPhase: RoundPhase;
}

export type GameAction =
  | { type: 'START_GAME'; payload: GameConfig; firstTeam: Team }
  | { type: 'START_ROUND'; payload: { currentTopic: string } }
  | { type: 'DICE_ROLLED'; payload: { argumentType: ArgumentType } }
  | { type: 'TEAM_TIMER_DONE' }
  | { type: 'NEXT_TEAM' }
  | { type: 'SECOND_TEAM_TIMER_DONE' }
  | { type: 'JUDGE_DECIDES'; winner: Team }
  | { type: 'NEW_GAME' };
