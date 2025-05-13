
import { Match, DoubleBracket } from "@/types/bracket";
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

export const processDoubleMatches = (bracket: DoubleBracket): { upperRounds: Record<string, Match[]>, lowerRounds: Record<string, Match[]>, maxUpperRound: number, maxLowerRound: number } => {
  const upperRounds: Record<string, Match[]> = {};
  const lowerRounds: Record<string, Match[]> = {};
  let maxUpperRound = 0;
  let maxLowerRound = 0;
  
  // Group upper bracket matches by round
  bracket.upper.forEach(match => {
    const roundText = match.tournamentRoundText;
    if (!upperRounds[roundText]) {
      upperRounds[roundText] = [];
    }
    upperRounds[roundText].push(match);
    
    // Extract round number from text like "UB 1" -> 1
    const roundNum = parseInt(roundText.replace(/\D/g, ''));
    if (roundNum > maxUpperRound) {
      maxUpperRound = roundNum;
    }
  });
  
  // Group lower bracket matches by round
  bracket.lower.forEach(match => {
    const roundText = match.tournamentRoundText;
    if (!lowerRounds[roundText]) {
      lowerRounds[roundText] = [];
    }
    lowerRounds[roundText].push(match);
    
    // Extract round number from text like "LB 1" -> 1
    const roundNum = parseInt(roundText.replace(/\D/g, ''));
    if (roundNum > maxLowerRound) {
      maxLowerRound = roundNum;
    }
  });
  
  return { upperRounds, lowerRounds, maxUpperRound, maxLowerRound };
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

export const generateDoubleBracketNodesAndEdges = (bracket: DoubleBracket): { nodes: Node[], edges: Edge[] } => {
  const nodes: Node[] = [];
  const edges: Edge[] = [];
  
  const { upperRounds, lowerRounds, maxUpperRound, maxLowerRound } = processDoubleMatches(bracket);
  
  // Add upper bracket round labels
  Object.keys(upperRounds).forEach((roundKey) => {
    const roundText = roundKey; // e.g., "UB 1"
    const roundNum = parseInt(roundText.replace(/\D/g, '')); // Extract number
    const x = 300 * (roundNum - 1) + 50;
    
    nodes.push({
      id: `round-${roundText}`,
      type: 'roundLabel',
      data: { label: `Upper ${roundNum}`, sublabel: getUpperRoundName(roundNum, maxUpperRound) },
      position: { x, y: 20 },
      className: 'round-label upper-bracket',
      draggable: false,
    });
  });
  
  // Add upper bracket match nodes
  Object.keys(upperRounds).forEach((roundKey) => {
    const roundMatches = upperRounds[roundKey];
    const roundNum = parseInt(roundKey.replace(/\D/g, '')); // Extract number
    const x = 300 * (roundNum - 1) + 50;
    const spacing = 300 / (Math.pow(2, roundNum - 1) + 0.8);
    
    roundMatches.forEach((match, index) => {
      const verticalPosition = (index + 1) * spacing + 80;
      
      nodes.push({
        id: `match-${match.id}`,
        type: 'match',
        data: {
          title: match.name,
          player1: match.participants[0] ? {
            name: match.participants[0].name || 'TBD',
            seed: match.participants[0].status,
            score: match.participants[0].resultText,
            time: new Date(match.startTime).toLocaleString('en-US', { month: 'short', day: 'numeric' }),
            isWinner: match.participants[0].isWinner,
          } : { name: 'TBD' },
          player2: match.participants[1] ? {
            name: match.participants[1].name || 'TBD',
            seed: match.participants[1].status,
            score: match.participants[1].resultText,
            time: new Date(match.startTime).toLocaleString('en-US', { month: 'short', day: 'numeric' }),
            isWinner: match.participants[1].isWinner,
          } : { name: 'TBD' },
          matchId: match.id,
          state: match.state,
          bracket: 'upper'
        },
        position: { x, y: verticalPosition },
        className: 'upper-bracket-node',
        draggable: false,
      });
      
      // Create winner edge if this match has a next match
      if (match.nextMatchId) {
        edges.push({
          id: `e-${match.id}-${match.nextMatchId}`,
          source: `match-${match.id}`,
          target: `match-${match.nextMatchId}`,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#0f0', strokeWidth: 2 }, // Green for winner path
        });
      }
      
      // Create loser edge if this match has a next loser match
      if (match.nextLooserMatchId) {
        edges.push({
          id: `e-loser-${match.id}-${match.nextLooserMatchId}`,
          source: `match-${match.id}`,
          target: `match-${match.nextLooserMatchId}`,
          type: 'smoothstep',
          animated: true,
          style: { stroke: '#f00', strokeWidth: 1.5, strokeDasharray: '5,5' }, // Red for loser path
          label: 'L',
        });
      }
    });
  });
  
  // Add lower bracket round labels
  Object.keys(lowerRounds).forEach((roundKey) => {
    const roundText = roundKey; // e.g., "LB 1"
    const roundNum = parseInt(roundText.replace(/\D/g, '')); // Extract number
    const x = 300 * (roundNum - 1) + 50;
    
    nodes.push({
      id: `round-lower-${roundText}`,
      type: 'roundLabel',
      data: { label: `Lower ${roundNum}`, sublabel: getLowerRoundName(roundNum, maxLowerRound) },
      position: { x, y: 400 },
      className: 'round-label lower-bracket',
      draggable: false,
    });
  });
  
  // Add lower bracket match nodes
  Object.keys(lowerRounds).forEach((roundKey) => {
    const roundMatches = lowerRounds[roundKey];
    const roundNum = parseInt(roundKey.replace(/\D/g, '')); // Extract number
    const x = 300 * (roundNum - 1) + 50;
    const spacing = 160;
    
    roundMatches.forEach((match, index) => {
      const verticalPosition = (index + 1) * spacing + 450;
      
      nodes.push({
        id: `match-${match.id}`,
        type: 'match',
        data: {
          title: match.name,
          player1: match.participants[0] ? {
            name: match.participants[0].name || 'TBD',
            seed: match.participants[0].status,
            score: match.participants[0].resultText,
            time: new Date(match.startTime).toLocaleString('en-US', { month: 'short', day: 'numeric' }),
            isWinner: match.participants[0].isWinner,
          } : { name: 'TBD' },
          player2: match.participants[1] ? {
            name: match.participants[1].name || 'TBD',
            seed: match.participants[1].status,
            score: match.participants[1].resultText,
            time: new Date(match.startTime).toLocaleString('en-US', { month: 'short', day: 'numeric' }),
            isWinner: match.participants[1].isWinner,
          } : { name: 'TBD' },
          matchId: match.id,
          state: match.state,
          bracket: 'lower'
        },
        position: { x, y: verticalPosition },
        className: 'lower-bracket-node',
        draggable: false,
      });
      
      // Create edge if this match has a next match within lower bracket
      if (match.nextMatchId) {
        // Check if next match is in lower bracket or is the final
        const isFinalMatch = !bracket.lower.find(m => m.id === match.nextMatchId);
        
        edges.push({
          id: `e-${match.id}-${match.nextMatchId}`,
          source: `match-${match.id}`,
          target: `match-${match.nextMatchId}`,
          type: 'smoothstep',
          animated: true,
          style: { 
            stroke: isFinalMatch ? '#ff0' : '#0ff', // Yellow for final, cyan for lower bracket
            strokeWidth: 2 
          },
        });
      }
    });
  });
  
  // Add final result node if there's a match with no next match (final)
  const finalMatch = bracket.upper.find(match => match.nextMatchId === null);
  if (finalMatch) {
    const x = 300 * maxUpperRound + 50;
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
        style: { stroke: '#ff0', strokeWidth: 2 }, // Yellow for final winner
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

function getUpperRoundName(round: number, maxRound: number): string {
  if (round === maxRound) return 'Final';
  if (round === maxRound - 1) return 'Semi Finals';
  if (round === maxRound - 2) return 'Quarter Finals';
  if (round === 1) return 'First Round';
  return `Upper Round ${round}`;
}

function getLowerRoundName(round: number, maxRound: number): string {
  if (round === maxRound) return 'Lower Final';
  if (round === maxRound - 1) return 'Lower Semi';
  if (round === 1) return 'Elimination Round';
  return `Lower Round ${round}`;
}
