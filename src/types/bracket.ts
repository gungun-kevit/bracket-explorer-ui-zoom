
export interface Participant {
  id: string | null;
  resultText: string | null;
  isWinner: boolean;
  status: string | null;
  name?: string;
}

export interface Match {
  id: number;
  name: string;
  nextMatchId: number | null;
  nextLooserMatchId: number | null;
  tournamentRoundText: string;
  startTime: string;
  state: string;
  participants: Participant[];
}

export interface DoubleBracket {
  upper: Match[];
  lower: Match[];
}

export type BracketType = 'single' | 'double';
