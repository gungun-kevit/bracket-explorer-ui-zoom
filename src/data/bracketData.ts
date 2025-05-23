
import { Match } from "@/types/bracket";
import { generateNodesAndEdges } from "@/utils/bracketUtils";

export const tournamentData: Match[] = [
  {
    id: 20464,
    name: 'Semi Final - Match 1',
    nextMatchId: 20463,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    startTime: '2021-07-28T00:00:00.000+00:00',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '9fd1f0e6-eb92-4159-a96d-6657fbdd963e',
        resultText: null,
        isWinner: false,
        status: 'NO_SHOW',
        name: 'GlootOne',
      },
      {
        id: '1d11ce35-de11-49de-b48e-cec5427eb82c',
        resultText: null,
        isWinner: false,
        status: 'NO_SHOW',
        name: 'Alex',
      },
    ],
  },
  {
    id: 20465,
    name: 'Round 1 - Match 1',
    nextMatchId: 20464,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-07-27T23:00:00.000+00:00',
    state: 'SCORE_DONE',
    participants: [
      {
        id: '1d11ce35-de11-49de-b48e-cec5427eb82c',
        resultText: '1',
        isWinner: true,
        status: 'PLAYED',
        name: 'Alex',
      },
      {
        id: 'a504c49a-e9b2-4a2e-b4b8-a2c11651c356',
        resultText: '0',
        isWinner: false,
        status: 'PLAYED',
        name: 'BTC',
      },
    ],
  },
  {
    id: 20466,
    name: 'Round 1 - Match 2',
    nextMatchId: 20464,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-07-27T23:00:00.000+00:00',
    state: 'WALK_OVER',
    participants: [
      {
        id: '9fd1f0e6-eb92-4159-a96d-6657fbdd963e',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'GlootOne',
      },
    ],
  },
  {
    id: 20467,
    name: 'Semi Final - Match 2',
    nextMatchId: 20463,
    nextLooserMatchId: null,
    tournamentRoundText: '2',
    startTime: '2021-07-28T00:00:00.000+00:00',
    state: 'WALK_OVER',
    participants: [
      {
        id: 'b9a3cc7a-95d9-483a-b515-f24bd0531f45',
        resultText: null,
        isWinner: true,
        status: 'WALKOVER',
        name: 'spacefudg3',
      },
      {
        id: '7535778a-24db-423f-928b-ca237cff67fc',
        resultText: null,
        isWinner: false,
        status: 'NO_SHOW',
        name: 'SeatloN',
      },
    ],
  },
  {
    id: 20468,
    name: 'Round 1 - Match 3',
    nextMatchId: 20467,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-07-27T23:00:00.000+00:00',
    state: 'WALK_OVER',
    participants: [
      {
        id: 'b9a3cc7a-95d9-483a-b515-f24bd0531f45',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'spacefudg3',
      },
    ],
  },
  {
    id: 20469,
    name: 'Round 1 - Match 4',
    nextMatchId: 20467,
    nextLooserMatchId: null,
    tournamentRoundText: '1',
    startTime: '2021-07-27T23:00:00.000+00:00',
    state: 'WALK_OVER',
    participants: [
      {
        id: '7535778a-24db-423f-928b-ca237cff67fc',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'SeatloN',
      },
    ],
  },
  {
    id: 20463,
    name: 'Final - Match',
    nextMatchId: null,
    nextLooserMatchId: null,
    tournamentRoundText: '3',
    startTime: '2021-07-28T01:00:00.000+00:00',
    state: 'DONE',
    participants: [
      {
        id: 'b9a3cc7a-95d9-483a-b515-f24bd0531f45',
        resultText: null,
        isWinner: false,
        status: null,
        name: 'spacefudg3',
      },
      { id: null, resultText: null, isWinner: false, status: 'NO_PARTY' },
    ],
  },
];

// Generate nodes and edges from the tournament data
const { nodes: initialNodes, edges: initialEdges } = generateNodesAndEdges(tournamentData);

export { initialNodes, initialEdges };
