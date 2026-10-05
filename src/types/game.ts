export type CardOption = {
  id: string;
  title: string;
  description: string;
  image: string;
  isBest: boolean;
  score?: number;
  feedback: string;
  resultImages: string[];
  resultSceneText: string;
  bgVariant: 'good' | 'bad' | 'neutral';
};

export type Summary = {
  dos: string[];
  donts: string[];
};

export type Scenario = {
  id: string;
  initialScore?: number;
  contextText: string;
  baseImages: string[];
  cards: CardOption[];
  summary: Summary;
};

export type Planet = {
  id: string;
  title: string;
  color: string;
  icon: string;
  thumbnail: string;
  scenarios: Scenario[];
  isDummy?: boolean;
};