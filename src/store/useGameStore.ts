import { create } from 'zustand';
import type { Planet, CardOption } from '../types/game';
import { GAME_DATA } from '../data/mockGameData';

interface UserInfo {
  uid: string;
  displayName: string;
  age?: number | string;
  phone?: string;
  totalScore?: number;
  // Khai báo thêm 2 trường VIP để không bị lỗi type
  isVip?: boolean;
  vipPlan?: 'monthly' | 'lifetime';
}

interface GameState {
  user: UserInfo | null;
  setUser: (user: UserInfo | null) => void;

  activePlanetId: string | null;
  setActivePlanet: (planetOrId: Planet | string | null) => void;
  completedPlanetIds: string[];
  
  // Lưu điểm số cao nhất của từng hành tinh để tránh cộng dồn lỗi khi chơi lại
  planetScores: Record<string, number>; 

  currentScenarioIndex: number;
  currentScore: number;
  selectedCard: CardOption | null;
  wrongCardIds: string[];
  hasScoredThisScenario: boolean;
  phase: 'context' | 'feedback' | 'summary';

  isLeaderboardOpen: boolean;
  setLeaderboardOpen: (open: boolean) => void;

  startGame: (planet: Planet) => void;
  selectCard: (card: CardOption, cardIndex: number) => void;
  retryCard: () => void;
  nextScenario: () => void;
  exitGame: () => void;
}

export const useGameStore = create<GameState>((set, get) => ({
  user: null,
  setUser: (user) => set({ user }),

  activePlanetId: null,
  setActivePlanet: (planetOrId) => {
    if (!planetOrId) {
      set({ activePlanetId: null, currentScenarioIndex: 0, selectedCard: null, wrongCardIds: [], hasScoredThisScenario: false, phase: 'context' });
      return;
    }
    const id = typeof planetOrId === 'string' ? planetOrId : planetOrId.id;
    const targetPlanet = GAME_DATA.find((p) => p.id === id);
    const firstScenario = targetPlanet?.scenarios?.[0];

    set({
      activePlanetId: id,
      currentScenarioIndex: 0,
      currentScore: firstScenario?.initialScore || 0,
      selectedCard: null,
      wrongCardIds: [],
      hasScoredThisScenario: false,
      phase: 'context',
    });
  },

  completedPlanetIds: [],
  planetScores: {},

  currentScenarioIndex: 0,
  currentScore: 0,
  selectedCard: null,
  wrongCardIds: [],
  hasScoredThisScenario: false,
  phase: 'context',

  isLeaderboardOpen: false,
  setLeaderboardOpen: (open) => set({ isLeaderboardOpen: open }),

  startGame: (planet) => {
    const firstScenario = planet?.scenarios?.[0];
    set({
      activePlanetId: planet.id,
      currentScenarioIndex: 0,
      currentScore: firstScenario?.initialScore || 0,
      selectedCard: null,
      wrongCardIds: [],
      hasScoredThisScenario: false,
      phase: 'context',
    });
  },

  selectCard: (card, cardIndex) => {
    set((state) => {
      let addedPoints = 0;

      if (!state.hasScoredThisScenario) {
        if (card.isBest) {
          addedPoints = 1000;
        } else {
          if (cardIndex === 0) addedPoints = 1000;
          else if (cardIndex === 1) addedPoints = 700;
          else if (cardIndex === 2) addedPoints = 300;
          else addedPoints = 100;
        }
      }

      const newScore = state.currentScore + addedPoints;
      const newWrongCards = card.isBest ? state.wrongCardIds : [...state.wrongCardIds, card.id];

      return {
        selectedCard: card,
        currentScore: newScore,
        wrongCardIds: newWrongCards,
        hasScoredThisScenario: true,
        phase: 'feedback',
      };
    });
  },

  retryCard: () => set({ selectedCard: null, phase: 'context' }),

  nextScenario: () => {
    const { activePlanetId, currentScenarioIndex, currentScore, user, planetScores, completedPlanetIds } = get();
    if (!activePlanetId) return;

    const currentPlanet = GAME_DATA.find(p => p.id === activePlanetId);
    if (!currentPlanet) return;

    const nextIndex = currentScenarioIndex + 1;
    
    if (nextIndex < currentPlanet.scenarios.length) {
      set({
        currentScenarioIndex: nextIndex,
        selectedCard: null,
        wrongCardIds: [],
        hasScoredThisScenario: false,
        phase: 'context',
      });
    } else {
      // Cập nhật điểm cao nhất của hành tinh hiện tại (so sánh với điểm cũ nếu chơi lại)
      const previousBestForPlanet = planetScores[activePlanetId] || 0;
      const bestPlanetScore = Math.max(previousBestForPlanet, currentScore);
      
      const updatedPlanetScores = {
        ...planetScores,
        [activePlanetId]: bestPlanetScore
      };

      // Tính lại tổng điểm user bằng tổng điểm cao nhất của tất cả các hành tinh đã hoàn thành
      const calculatedTotalScore = Object.values(updatedPlanetScores).reduce((acc, curr) => acc + curr, 0);

      if (user) {
        set({ user: { ...user, totalScore: calculatedTotalScore } });
      }

      set({
        planetScores: updatedPlanetScores,
        phase: 'summary',
        completedPlanetIds: completedPlanetIds.includes(currentPlanet.id)
          ? completedPlanetIds
          : [...completedPlanetIds, currentPlanet.id]
      });
    }
  },

  exitGame: () => set({
    activePlanetId: null,
    currentScenarioIndex: 0,
    currentScore: 0,
    selectedCard: null,
    wrongCardIds: [],
    hasScoredThisScenario: false,
    phase: 'context',
  }),
}));