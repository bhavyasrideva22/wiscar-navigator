interface ScoreCardProps {
  title: string;
  score: number;
  description: string;
  color?: 'primary' | 'accent' | 'success';
  className?: string;
}

export function ScoreCard({ title, score, description, color = 'primary', className }: ScoreCardProps) {
  const getColorClasses = () => {
    switch (color) {
      case 'accent':
        return 'bg-gradient-accent text-accent-foreground';
      case 'success':
        return 'bg-gradient-success text-success-foreground';
      default:
        return 'bg-gradient-primary text-primary-foreground';
    }
  };

  const getScoreColor = () => {
    if (score >= 75) return 'text-success';
    if (score >= 55) return 'text-accent';
    return 'text-destructive';
  };

  return (
    <div className={`rounded-lg border shadow-card overflow-hidden ${className}`}>
      <div className={`px-4 py-3 ${getColorClasses()}`}>
        <h3 className="font-semibold text-sm">{title}</h3>
      </div>
      <div className="p-4">
        <div className="flex items-center justify-between mb-2">
          <span className={`text-2xl font-bold ${getScoreColor()}`}>
            {score}%
          </span>
          <div className="w-16 h-16 relative">
            <svg className="w-16 h-16 transform -rotate-90" viewBox="0 0 36 36">
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke="hsl(var(--border))"
                strokeWidth="2"
              />
              <path
                d="M18 2.0845 a 15.9155 15.9155 0 0 1 0 31.831 a 15.9155 15.9155 0 0 1 0 -31.831"
                fill="none"
                stroke={score >= 75 ? 'hsl(var(--success))' : score >= 55 ? 'hsl(var(--accent))' : 'hsl(var(--destructive))'}
                strokeWidth="2"
                strokeDasharray={`${score}, 100`}
              />
            </svg>
          </div>
        </div>
        <p className="text-sm text-muted-foreground">{description}</p>
      </div>
    </div>
  );
}