
import React, { useState } from 'react';
import BracketFlow from './BracketFlow';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ZoomIn, ZoomOut, RefreshCw, Maximize2 } from 'lucide-react';
import { BracketType } from '@/types/bracket';
import '@xyflow/react/dist/style.css';
import './TournamentBracket.css';

const TournamentBracket = () => {
  const [zoomLevel, setZoomLevel] = useState(0.8);
  const [bracketType, setBracketType] = useState<BracketType>('single');
  
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.4));
  };
  
  const handleReset = () => {
    setZoomLevel(0.8);
  };
  
  const handleMaximize = () => {
    document.documentElement.requestFullscreen?.();
  };
  
  const toggleBracketType = () => {
    setBracketType(prev => prev === 'single' ? 'double' : 'single');
  };

  return (
    <div className="tournament-container">
      <div className="header">
        <h1 className="tournament-title">
          {bracketType === 'single' ? 'Single Elimination Tournament' : 'Double Elimination Tournament'}
        </h1>
        <div className="tournament-controls">
          <Button variant="outline" size="icon" onClick={toggleBracketType} aria-label="Toggle Bracket Type">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomOut} aria-label="Zoom Out">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomIn} aria-label="Zoom In">
            <ZoomIn className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleReset} aria-label="Reset View">
            <RefreshCw className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleMaximize} aria-label="Fullscreen">
            <Maximize2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Card className="bracket-card">
        <CardContent className="p-0">
          <BracketFlow zoomLevel={zoomLevel} bracketType={bracketType} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TournamentBracket;
