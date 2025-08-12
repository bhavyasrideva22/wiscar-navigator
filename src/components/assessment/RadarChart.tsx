import { WISCARScores } from "@/types/assessment";

interface RadarChartProps {
  scores: WISCARScores;
  className?: string;
}

export function RadarChart({ scores, className }: RadarChartProps) {
  const dimensions = [
    { key: 'will', label: 'Will & Persistence', value: scores.will },
    { key: 'interest', label: 'Interest & Passion', value: scores.interest },
    { key: 'skill', label: 'Communication Skills', value: scores.skill },
    { key: 'cognitiveReadiness', label: 'Analytical Thinking', value: scores.cognitiveReadiness },
    { key: 'abilityToLearn', label: 'Learning Agility', value: scores.abilityToLearn },
    { key: 'realWorldAlignment', label: 'Career Alignment', value: scores.realWorldAlignment }
  ];

  const size = 200;
  const center = size / 2;
  const maxRadius = center - 30;

  // Calculate polygon points for the score
  const scorePoints = dimensions.map((dim, index) => {
    const angle = (index * 2 * Math.PI) / dimensions.length - Math.PI / 2;
    const radius = (dim.value / 100) * maxRadius;
    const x = center + radius * Math.cos(angle);
    const y = center + radius * Math.sin(angle);
    return `${x},${y}`;
  }).join(' ');

  // Calculate polygon points for the grid circles
  const gridLevels = [20, 40, 60, 80, 100];
  
  return (
    <div className={className}>
      <div className="flex justify-center">
        <svg width={size} height={size} className="overflow-visible">
          {/* Grid circles */}
          {gridLevels.map((level) => (
            <circle
              key={level}
              cx={center}
              cy={center}
              r={(level / 100) * maxRadius}
              fill="none"
              stroke="hsl(var(--border))"
              strokeWidth="1"
              opacity={0.3}
            />
          ))}
          
          {/* Grid lines */}
          {dimensions.map((_, index) => {
            const angle = (index * 2 * Math.PI) / dimensions.length - Math.PI / 2;
            const x = center + maxRadius * Math.cos(angle);
            const y = center + maxRadius * Math.sin(angle);
            return (
              <line
                key={index}
                x1={center}
                y1={center}
                x2={x}
                y2={y}
                stroke="hsl(var(--border))"
                strokeWidth="1"
                opacity={0.3}
              />
            );
          })}
          
          {/* Score polygon */}
          <polygon
            points={scorePoints}
            fill="hsl(var(--primary))"
            fillOpacity="0.2"
            stroke="hsl(var(--primary))"
            strokeWidth="2"
          />
          
          {/* Score points */}
          {dimensions.map((dim, index) => {
            const angle = (index * 2 * Math.PI) / dimensions.length - Math.PI / 2;
            const radius = (dim.value / 100) * maxRadius;
            const x = center + radius * Math.cos(angle);
            const y = center + radius * Math.sin(angle);
            return (
              <circle
                key={index}
                cx={x}
                cy={y}
                r="4"
                fill="hsl(var(--primary))"
                stroke="white"
                strokeWidth="2"
              />
            );
          })}
          
          {/* Labels */}
          {dimensions.map((dim, index) => {
            const angle = (index * 2 * Math.PI) / dimensions.length - Math.PI / 2;
            const labelRadius = maxRadius + 20;
            const x = center + labelRadius * Math.cos(angle);
            const y = center + labelRadius * Math.sin(angle);
            
            return (
              <g key={index}>
                <text
                  x={x}
                  y={y}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="10"
                  fill="hsl(var(--foreground))"
                  className="font-medium"
                >
                  <tspan x={x} dy="-0.3em">{dim.label.split(' ')[0]}</tspan>
                  {dim.label.split(' ').length > 1 && (
                    <tspan x={x} dy="1em">{dim.label.split(' ').slice(1).join(' ')}</tspan>
                  )}
                </text>
                <text
                  x={x}
                  y={y + 15}
                  textAnchor="middle"
                  fontSize="10"
                  fill="hsl(var(--primary))"
                  fontWeight="bold"
                >
                  {dim.value}%
                </text>
              </g>
            );
          })}
        </svg>
      </div>
      
      {/* Legend */}
      <div className="mt-4 text-center">
        <h4 className="font-semibold text-sm mb-2">WISCAR Framework Analysis</h4>
        <p className="text-xs text-muted-foreground">
          Overall Readiness Score: <span className="font-bold text-primary">{scores.overall}%</span>
        </p>
      </div>
    </div>
  );
}