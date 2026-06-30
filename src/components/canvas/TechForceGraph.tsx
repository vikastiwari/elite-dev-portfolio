import React, { useEffect, useRef } from 'react';
import ForceGraph3D from 'react-force-graph-3d';
import { PORTFOLIO_CONFIG } from '../../config/portfolio.config';

export default function TechForceGraph() {
  const graphRef = useRef<any>(null);

  // Generate nodes and links from config
  const graphData = React.useMemo(() => {
    const nodes = PORTFOLIO_CONFIG.skills.map(s => ({
      id: s.id,
      name: s.name,
      val: 1
    }));
    
    const links: {source: string, target: string}[] = [];
    
    // Connect projects to their skills
    PORTFOLIO_CONFIG.projectMatrix.forEach(proj => {
      nodes.push({ id: proj.id, name: proj.title, val: 2 });
      
      proj.techStack.forEach(tech => {
        // Find matching skill by name or ID (simplified for MVP)
        const skill = PORTFOLIO_CONFIG.skills.find(s => s.name === tech || s.id === tech);
        if (skill) {
          links.push({ source: proj.id, target: skill.id });
        }
      });
    });

    return { nodes, links };
  }, []);

  return (
    <div className="absolute inset-0 z-0 opacity-20 pointer-events-none" data-testid="tech-force-graph">
      <ForceGraph3D
        ref={graphRef}
        graphData={graphData}
        nodeLabel="name"
        nodeAutoColorBy="group"
        linkDirectionalParticles={2}
        linkDirectionalParticleSpeed={d => 0.01}
        backgroundColor="rgba(0,0,0,0)" // Transparent to overlay on R3F canvas
        showNavInfo={false}
      />
    </div>
  );
}
