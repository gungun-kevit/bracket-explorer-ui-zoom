import { Match } from "@/types/bracket";
import { Node, Edge } from "@xyflow/react";

interface RoundInfo {
  maxRound: number;
  rounds: Record<string, Match[]>;
}

export const processMatches = (matches: Match[]): RoundInfo => {
  const rounds: Record<string, Match[]> = {};
  let maxRound = 0;
  
  // Group matches by round
  matches.forEach(match => {
    const round = match.tournamentRoundText;
    if (!rounds[round]) {
      rounds[round] = [];
    }
    rounds[round].push(match);
    
    // Keep track of the max round number
    const roundNum = parseInt(round);
    if (roundNum > maxRound) {
      maxRound = roundNum;
    }
  });
  
  return { rounds, maxRound };
};

export const generateNodesAndEdges = (matches: Match[]): { nodes: Node[], edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  const { rounds, maxRound } = processMatches(matches);
  
  // Add round labels
  Object.keys(rounds).forEach((roundKey, index) => {
    const round = parseInt(roundKey);
    const x = 300 * (round - 1) + 50;
    
    nodes.push({
      id: `round-${round}`,
      type: 'roundLabel',
      data: { label: `Round ${round}`, sublabel: getRoundName(round, maxRound) },
      position: { x, y: 20 },
      className: 'round-label',
      draggable: false,
    });
  });
  
  // Calculate node positions and add match nodes
  Object.keys(rounds).forEach((roundKey) => {
    const round = parseInt(roundKey);
    const roundMatches = rounds[roundKey];
    const x = 300 * (round - 1) + 50;
    const spacing = 800 / (Math.pow(2, round - 1) + 1);
    
    roundMatches.forEach((match, index) => {
      // Calculate y position based on the number of matches in this round
      const matchesInRound = roundMatches.length;
      const verticalPosition = (index + 1) * spacing;
      
      nodes.push({
        id: `match-${match.id}`,
        type: 'match',
        data: {
          title: match.name,
          player1: match.participants[0] ? {
            name: match.participants[0].name || 'TBD',
            seed: match.participants[0].status,
            score: match.participants[0].resultText,
            time: new Date(match.startTime).toLocaleTimeString(),
            isWinner: match.participants[0].isWinner,
          } : { name: 'TBD' },
          player2: match.participants[1] ? {
            name: match.participants[1].name || 'TBD',
            seed: match.participants[1].status,
            score: match.participants[1].resultText,
            time: new Date(match.startTime).toLocaleTimeString(),
            isWinner: match.participants[1].isWinner,
          } : { name: 'TBD' },
          winnerIndex: -1,
          matchId: match.id,
          state: match.state,
        },
        position: { x, y: verticalPosition },
        draggable: false, // Disable individual node dragging
      });
      
      // Create edge if this match has a next match
      if (match.nextMatchId) {
        edges.push({
          id: `e-${match.id}-${match.nextMatchId}`,
          source: `match-${match.id}`,
          target: `match-${match.nextMatchId}`,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#555', strokeWidth: 2 },
        });
      }
    });
  });
  
  // Add final result node if there's a match with no next match (final)
  const finalMatch = matches.find(match => match.nextMatchId === null);
  if (finalMatch) {
    const x = 300 * maxRound + 50;
    const matchPosition = nodes.find(node => node.id === `match-${finalMatch.id}`)?.position;
    
    if (matchPosition) {
      nodes.push({
        id: 'result-1',
        type: 'resultNode',
        data: {
          label: 'Champion',
        },
        position: { x, y: matchPosition.y },
        draggable: false,
      });
      
      edges.push({
        id: `e-final`,
        source: `match-${finalMatch.id}`,
        target: 'result-1',
        type: 'smoothstep',
        animated: true,
        style: { stroke: '#555', strokeWidth: 2 },
      });
    }
  }
  
  return { nodes, edges };
};

function getRoundName(round: number, maxRound: number): string {
  if (round === maxRound) return 'Final';
  if (round === maxRound - 1) return 'Semi Finals';
  if (round === maxRound - 2) return 'Quarter Finals';
  if (round === 1) return 'First Round';
  return `Round ${round}`;
}
