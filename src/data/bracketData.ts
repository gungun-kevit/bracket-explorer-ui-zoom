
export const initialNodes = [
  // Round Labels
  {
    id: 'round-0',
    type: 'roundLabel',
    data: { label: 'Round 0', sublabel: 'Race to 2' },
    position: { x: 50, y: 20 },
    className: 'round-label',
    draggable: false,
  },
  {
    id: 'round-1',
    type: 'roundLabel',
    data: { label: 'Round 1', sublabel: 'Race to 2' },
    position: { x: 350, y: 20 },
    className: 'round-label',
    draggable: false,
  },
  {
    id: 'round-2',
    type: 'roundLabel',
    data: { label: 'Round 2', sublabel: 'Race to 2' },
    position: { x: 650, y: 20 },
    className: 'round-label',
    draggable: false,
  },
  {
    id: 'round-3',
    type: 'roundLabel',
    data: { label: 'Final', sublabel: '' },
    position: { x: 950, y: 20 },
    className: 'round-label',
    draggable: false,
  },

  // Round 0 Matches
  {
    id: 'match-1',
    type: 'match',
    data: { 
      title: '5th - 8th',
      player1: { 
        name: 'Paulo Rivera', 
        seed: 'A', 
        time: 'Mon 7 2:35 AM',
        table: 'Bye',
        matchId: '1001'
      },
      player2: { 
        name: 'BYE',
        table: '',
      },
      winnerIndex: 0,
    },
    position: { x: 50, y: 100 },
  },
  {
    id: 'match-2',
    type: 'match',
    data: {
      title: '5th - 8th',
      player1: { 
        name: 'Ron DeLeouw', 
        seed: 'A', 
        time: 'Mon 7 2:35 AM',
        table: '5',
        matchId: '1002'
      },
      player2: { 
        name: 'Mark Hernas', 
        seed: 'A+',
        score: 0
      },
      winnerIndex: 0,
    },
    position: { x: 50, y: 250 },
  },
  {
    id: 'match-3',
    type: 'match',
    data: {
      title: '5th - 8th',
      player1: { 
        name: 'Daniel Buchanan', 
        seed: 'B+', 
        time: 'Mon 7 2:35 AM',
        table: '3',
        matchId: '1003'
      },
      player2: { 
        name: 'Remala Hemnani', 
        seed: 'C',
        score: 0
      },
      winnerIndex: 0,
    },
    position: { x: 50, y: 400 },
  },
  {
    id: 'match-4',
    type: 'match',
    data: {
      title: '5th - 8th',
      player1: { 
        name: 'Kim West', 
        seed: 'C-', 
        time: 'Mon 7 2:35 AM',
        table: '2',
        matchId: '1004'
      },
      player2: { 
        name: 'Deepak Hemnani', 
        seed: 'A',
        score: 0
      },
      winnerIndex: 0,
    },
    position: { x: 50, y: 550 },
  },

  // Round 1 Matches
  {
    id: 'match-5',
    type: 'match',
    data: {
      title: '3rd - 4th',
      player1: { 
        name: 'Paulo Rivera', 
        seed: 'A',
        time: 'Mon 7 5:45 AM',
        table: '4',
        matchId: '1005',
        score: 0
      },
      player2: { 
        name: '',
        score: 0
      },
      winnerIndex: -1,
    },
    position: { x: 350, y: 175 },
  },
  {
    id: 'match-6',
    type: 'match',
    data: {
      title: '3rd - 4th',
      player1: { 
        name: '', 
        score: 0
      },
      player2: { 
        name: '',
        score: 0
      },
      winnerIndex: -1,
    },
    position: { x: 350, y: 475 },
  },

  // Round 2 Match
  {
    id: 'match-7',
    type: 'match',
    data: {
      title: '2nd',
      player1: { 
        name: '', 
        score: 0
      },
      player2: { 
        name: '',
        score: 0
      },
      winnerIndex: -1,
    },
    position: { x: 650, y: 325 },
  },

  // Final Result
  {
    id: 'result-1',
    type: 'resultNode',
    data: {
      label: '1st'
    },
    position: { x: 950, y: 325 },
  }
];

export const initialEdges = [
  // Round 0 to Round 1
  { id: 'e1-5', source: 'match-1', target: 'match-5', type: 'smoothstep' },
  { id: 'e2-5', source: 'match-2', target: 'match-5', type: 'smoothstep' },
  { id: 'e3-6', source: 'match-3', target: 'match-6', type: 'smoothstep' },
  { id: 'e4-6', source: 'match-4', target: 'match-6', type: 'smoothstep' },
  
  // Round 1 to Round 2
  { id: 'e5-7', source: 'match-5', target: 'match-7', type: 'smoothstep' },
  { id: 'e6-7', source: 'match-6', target: 'match-7', type: 'smoothstep' },
  
  // Round 2 to Final
  { id: 'e7-r1', source: 'match-7', target: 'result-1', type: 'smoothstep' },
];
