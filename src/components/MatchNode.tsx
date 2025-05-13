
import React, { memo } from 'react';
import { Handle, Position } from '@xyflow/react';
import { cn } from '@/lib/utils';

interface PlayerData {
  name: string;
  score?: string | null;
  seed?: string | null;
  time?: string;
  table?: string;
  matchId?: number | string;
  isWinner?: boolean;
}

interface MatchNodeProps {
  data: {
    title?: string;
    player1?: PlayerData;
    player2?: PlayerData;
    winnerIndex?: number;
    round?: number;
    position?: number;
    matchId?: number;
    state?: string;
  };
  isConnectable: boolean;
}

const MatchNode = ({ data, isConnectable }: MatchNodeProps) => {
  const { title, player1, player2, state } = data;
  
  // Determine match status styling
  const getMatchStatusClass = () => {
    switch(state) {
      case 'SCORE_DONE': return 'match-completed';
      case 'WALK_OVER': return 'match-walkover';
      case 'DONE': return 'match-completed';
      default: return '';
    }
  };
  
  return (
    <div className={cn("match-node", getMatchStatusClass())}>
      {title && <div className="match-title">{title}</div>}
      
      <div className={cn("player", player1?.isWinner ? "winner" : "")}>
        <div className="player-name">
          {player1?.name || 'TBD'}
          {player1?.seed && <span className="player-seed">{player1.seed}</span>}
        </div>
        <div className="match-details">
          {player1?.time && (
            <div className="match-time">{player1.time}</div>
          )}
          {player1?.table && (
            <div className="table-number">
              Table {player1.table}
            </div>
          )}
          {data.matchId && (
            <div className="match-id">{data.matchId}</div>
          )}
        </div>
        <div className="score">{player1?.score ?? 0}</div>
      </div>
      
      <div className={cn("player", player2?.isWinner ? "winner" : "")}>
        <div className="player-name">
          {player2?.name || 'TBD'}
          {player2?.seed && <span className="player-seed">{player2.seed}</span>}
        </div>
        <div className="match-details">
          {player2?.time && (
            <div className="match-time">{player2.time}</div>
          )}
          {player2?.table && (
            <div className="table-number">
              Table {player2.table}
            </div>
          )}
        </div>
        <div className="score">{player2?.score ?? 0}</div>
      </div>
      
      {/* Connection points */}
      <Handle
        type="target"
        position={Position.Left}
        style={{ visibility: 'hidden' }}
        isConnectable={isConnectable}
      />
      <Handle
        type="source"
        position={Position.Right}
        style={{ visibility: 'hidden' }}
        isConnectable={isConnectable}
      />
    </div>
  );
};

export default memo(MatchNode);
