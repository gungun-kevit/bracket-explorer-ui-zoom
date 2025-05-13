
import React, { useState } from 'react';
import BracketFlow from './BracketFlow';
import { Card, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { ArrowLeft, ArrowRight, ZoomIn, ZoomOut } from 'lucide-react';
import '@xyflow/react/dist/style.css';
import './TournamentBracket.css';

const TournamentBracket = () => {
  const [zoomLevel, setZoomLevel] = useState(1);
  
  const handleZoomIn = () => {
    setZoomLevel(prev => Math.min(prev + 0.2, 2));
  };
  
  const handleZoomOut = () => {
    setZoomLevel(prev => Math.max(prev - 0.2, 0.4));
  };

  return (
    <div className="tournament-container">
      <div className="header">
        <h1 className="tournament-title">Test Tournament | Mini</h1>
        <div className="tournament-controls">
          <Button variant="outline" size="icon" onClick={handleZoomOut} aria-label="Zoom Out">
            <ZoomOut className="h-4 w-4" />
          </Button>
          <Button variant="outline" size="icon" onClick={handleZoomIn} aria-label="Zoom In">
            <ZoomIn className="h-4 w-4" />
          </Button>
        </div>
      </div>
      
      <Card className="bracket-card">
        <CardContent className="p-0">
          <BracketFlow zoomLevel={zoomLevel} />
        </CardContent>
      </Card>
    </div>
  );
};

export default TournamentBracket;
