import { describe, it, expect } from 'vitest';
import { gameReducer, initialState } from './gameReducer';

describe('gameReducer', () => {
  it('START_GAME inicializa la partida en topic_reveal', () => {
    const config = {
      judgeName: 'Juez',
      teamA: { name: 'Alpha', players: ['P1', 'P2'], currentPlayerIndex: 0 },
      teamB: { name: 'Beta', players: ['P3'], currentPlayerIndex: 0 },
    };
    const action = {
      type: 'START_GAME',
      payload: config,
      firstTeam: 'teamA',
    } as const;

    const newState = gameReducer(initialState, action);

    expect(newState.roundPhase).toBe('topic_reveal');
    expect(newState.judgeName).toBe('Juez');
    expect(newState.teamA.name).toBe('Alpha');
    expect(newState.currentTeam).toBe('teamA');
  });

  it('DICE_ROLLED se fija un tipo de argumento y roundPhase cambia a team_playing', () => {
    const stateAfterStart = gameReducer(initialState, {
      type: 'START_GAME',
      payload: {
        judgeName: 'Juez',
        teamA: { name: 'Alpha', players: ['P1', 'P2'], currentPlayerIndex: 0 },
        teamB: { name: 'Beta', players: ['P3'], currentPlayerIndex: 0 },
      },
      firstTeam: 'teamA',
    } as const);

    const action = {
      type: 'DICE_ROLLED',
      payload: { argumentType: 'humoristico' },
    } as const;

    const newState = gameReducer(stateAfterStart, action);

    expect(newState.roundPhase).toBe('team_playing');
    expect(newState.argumentType).toBe('humoristico');
  });

  it ('JUDGE_DECIDES sin game over, scores 0-0,roundPhase cambia a topic_reveal', () => {
    const stateAfterDiceRolled = gameReducer(initialState, {
      type: 'START_GAME',
      payload: {
        judgeName: 'Juez',
        teamA: { name: 'Alpha', players: ['P1', 'P2'], currentPlayerIndex: 0 },
        teamB: { name: 'Beta', players: ['P3'], currentPlayerIndex: 0 },
      },
      firstTeam: 'teamA',
    } as const);

    const stateAfterJudgeDecides = gameReducer(stateAfterDiceRolled, {
      type: 'DICE_ROLLED',
      payload: { argumentType: 'humoristico' },
    } as const);

    const action = {
      type: 'JUDGE_DECIDES',
      winner: 'teamA',
    } as const;

    const newState = gameReducer(stateAfterJudgeDecides, action);

    expect(newState.roundPhase).toBe('topic_reveal');
    expect(newState.scores).toEqual({ teamA: 1, teamB: 0 });
    expect(newState.currentTeam).toBe('teamA'); // El turno sigue en el equipo A ganador
  });

  it('JUDGE_DECIDES con game over, scores 4-0, gana Team A,scores.TeamA = 5, roundPhase cambia a game_over', () => {
    const stateAfterDiceRolled = gameReducer(initialState, {
      type: 'START_GAME',
      payload: {
        judgeName: 'Juez',
        teamA: { name: 'Alpha', players: ['P1', 'P2'], currentPlayerIndex: 0 },
        teamB: { name: 'Beta', players: ['P3'], currentPlayerIndex: 0 },
      },
      firstTeam: 'teamA',
    } as const);

    const stateAfterJudgeDecides = gameReducer(stateAfterDiceRolled, {
      type: 'DICE_ROLLED',
      payload: { argumentType: 'humoristico' },
    } as const);

    // Simulamos que el equipo A ya tiene 4 puntos
    const stateWithScores = {
      ...stateAfterJudgeDecides,
      scores: { teamA: 4, teamB: 0 },
    };

    const action = {
      type: 'JUDGE_DECIDES',
      winner: 'teamA',
    } as const;

    const newState = gameReducer(stateWithScores, action);

    expect(newState.roundPhase).toBe('game_over');
    expect(newState.scores).toEqual({ teamA: 5, teamB: 0 });
  });
});