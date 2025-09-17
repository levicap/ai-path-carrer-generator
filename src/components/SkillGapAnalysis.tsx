import { SkillGap } from "@/types/career";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import { TrendingUp, Target, AlertTriangle } from "lucide-react";

interface SkillGapAnalysisProps {
  skillGaps: SkillGap[];
}

const SkillGapAnalysis = ({ skillGaps }: SkillGapAnalysisProps) => {
  const criticalGaps = skillGaps.filter(gap => gap.priority === 'Critical');
  const highGaps = skillGaps.filter(gap => gap.priority === 'High');
  const mediumGaps = skillGaps.filter(gap => gap.priority === 'Medium');

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "text-destructive";
      case "High": return "text-primary";
      case "Medium": return "text-secondary";
      case "Low": return "text-muted-foreground";
      default: return "text-muted-foreground";
    }
  };

  const getPriorityBadgeColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-destructive text-destructive-foreground";
      case "High": return "bg-primary text-primary-foreground";
      case "Medium": return "bg-secondary text-secondary-foreground";
      case "Low": return "bg-muted text-muted-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  return (
    <Card className="shadow-card border-0 bg-white/95 backdrop-blur">
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <TrendingUp className="h-5 w-5 text-primary" />
          Skill Gap Analysis
        </CardTitle>
        <CardDescription>
          Based on your current skills vs target role requirements
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-6">
        {/* Summary Stats */}
        <div className="grid grid-cols-3 gap-4">
          <div className="text-center p-4 bg-destructive/10 rounded-lg border border-destructive/20">
            <div className="text-2xl font-bold text-destructive">{criticalGaps.length}</div>
            <div className="text-sm text-destructive">Critical Gaps</div>
          </div>
          <div className="text-center p-4 bg-primary/10 rounded-lg border border-primary/20">
            <div className="text-2xl font-bold text-primary">{highGaps.length}</div>
            <div className="text-sm text-primary">High Priority</div>
          </div>
          <div className="text-center p-4 bg-muted/50 rounded-lg border border-border">
            <div className="text-2xl font-bold text-muted-foreground">{mediumGaps.length}</div>
            <div className="text-sm text-muted-foreground">Medium Priority</div>
          </div>
        </div>

        {/* Skill Gap Details */}
        <div className="space-y-4">
          <h3 className="text-lg font-semibold flex items-center gap-2">
            <Target className="h-4 w-4" />
            Skills to Develop
          </h3>
          {skillGaps.slice(0, 8).map((gap) => (
            <div key={gap.skill} className="space-y-2">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <span className="font-medium">{gap.skill}</span>
                  <Badge className={getPriorityBadgeColor(gap.priority)}>
                    {gap.priority}
                  </Badge>
                  {gap.priority === 'Critical' && (
                    <AlertTriangle className="h-4 w-4 text-destructive" />
                  )}
                </div>
                <div className="text-sm text-muted-foreground">
                  {gap.currentLevel}/10 → {gap.requiredLevel}/10
                </div>
              </div>
              <div className="space-y-1">
                <Progress 
                  value={(gap.currentLevel / gap.requiredLevel) * 100} 
                  className="h-2"
                />
                <div className="flex justify-between text-xs text-muted-foreground">
                  <span>Current Level: {gap.currentLevel}/10</span>
                  <span className={getPriorityColor(gap.priority)}>
                    Gap: {gap.gap} levels
                  </span>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Recommendations */}
        <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
          <h4 className="font-medium text-primary mb-2">💡 Key Recommendations</h4>
          <ul className="text-sm space-y-1 text-muted-foreground">
            {criticalGaps.length > 0 && (
              <li>• Focus on critical skills first: {criticalGaps.slice(0, 3).map(g => g.skill).join(', ')}</li>
            )}
            <li>• Build practical projects to apply new skills</li>
            <li>• Consider getting mentorship for complex topics like System Design</li>
            <li>• Allocate {Math.ceil(skillGaps.reduce((acc, gap) => acc + gap.gap, 0) * 2)} weeks total for skill development</li>
          </ul>
        </div>
      </CardContent>
    </Card>
  );
};

export default SkillGapAnalysis;