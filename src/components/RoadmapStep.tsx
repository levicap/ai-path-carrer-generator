import { RoadmapItem } from "@/types/career";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Progress } from "@/components/ui/progress";
import { Collapsible, CollapsibleContent, CollapsibleTrigger } from "@/components/ui/collapsible";
import { 
  CheckCircle, 
  Clock, 
  Target, 
  BookOpen, 
  Code, 
  Award, 
  FileText, 
  Users,
  ChevronDown,
  ExternalLink,
  Star,
  TrendingUp
} from "lucide-react";
import { useState } from "react";

interface RoadmapStepProps {
  item: RoadmapItem;
  stepNumber: number;
  // Removed onToggleComplete prop since we're removing the button
}

// Default values for item properties
const defaultProps = {
  prerequisites: [],
  skills: [],
  resources: [],
  projects: [],
  priority: 'Medium',
  difficulty: 'Beginner',
  category: 'Technical'
};

// Removed onToggleComplete from destructured props
const RoadmapStep = ({ item, stepNumber }: RoadmapStepProps) => {
  // Merge item with default props to ensure all properties exist
  const safeItem = { ...defaultProps, ...item };
  
  const [isExpanded, setIsExpanded] = useState(false);

  const getTypeIcon = (type: string) => {
    const iconProps = { className: "h-4 w-4" };
    switch (type) {
      case "skill": return <Target {...iconProps} />;
      case "course": return <BookOpen {...iconProps} />;
      case "project": return <Code {...iconProps} />;
      case "certification": return <Award {...iconProps} />;
      case "resource": return <FileText {...iconProps} />;
      case "experience": return <Users {...iconProps} />;
      case "action": return <TrendingUp {...iconProps} />; // New icon for action items
      default: return <Target {...iconProps} />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Critical": return "bg-destructive text-destructive-foreground";
      case "High": return "bg-primary text-primary-foreground";
      case "Medium": return "bg-secondary text-secondary-foreground";
      case "Low": return "bg-muted text-muted-foreground";
      case "Important": return "bg-yellow-500 text-yellow-900"; // New color for Important priority
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getDifficultyColor = (difficulty: string) => {
    switch (difficulty) {
      case "Beginner": return "bg-success text-success-foreground";
      case "Intermediate": return "bg-primary text-primary-foreground";
      case "Advanced": return "bg-secondary text-secondary-foreground";
      case "Expert": return "bg-destructive text-destructive-foreground";
      default: return "bg-muted text-muted-foreground";
    }
  };

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case "Technical": return <Code className="h-3 w-3" />;
      case "Leadership": return <Users className="h-3 w-3" />;
      case "Soft Skills": return <Users className="h-3 w-3" />;
      case "Tools": return <Target className="h-3 w-3" />;
      default: return <FileText className="h-3 w-3" />;
    }
  };

  return (
    <Card className={`transition-all duration-300 hover:shadow-card ${
      // Removed completed styling since we're removing the functionality
      'bg-white/95 backdrop-blur'
    }`}>
      <CardHeader>
        <div className="flex items-start justify-between">
          <div className="flex items-center gap-3">
            <div className={`flex h-10 w-10 items-center justify-center rounded-full text-sm font-bold transition-colors ${
              // Simplified the styling since we're removing the completed state
              'bg-primary text-primary-foreground'
            }`}>
              {stepNumber}
            </div>
            <div>
              <CardTitle className="flex items-center gap-2">
                {getTypeIcon(safeItem.type)}
                {safeItem.title}
              </CardTitle>
              <CardDescription className="mt-1 flex items-center gap-2">
                <Clock className="h-3 w-3" />
                {safeItem.duration} • {safeItem.estimatedHours}h • Phase {safeItem.phase}
              </CardDescription>
            </div>
          </div>
          <div className="flex flex-col gap-2">
            <div className="flex gap-2">
              <Badge className={getPriorityColor(safeItem.priority)}>
                {safeItem.priority}
              </Badge>
              <Badge className={getDifficultyColor(safeItem.difficulty)}>
                {safeItem.difficulty}
              </Badge>
            </div>
            <Badge variant="outline" className="flex items-center gap-1 text-xs">
              {getCategoryIcon(safeItem.category)}
              {safeItem.category}
            </Badge>
          </div>
        </div>
      </CardHeader>
      
      <CardContent>
        <p className="text-muted-foreground mb-4">{safeItem.description}</p>
        
        {/* Skills */}
        <div className="mb-4">
          <div className="text-sm font-medium mb-2">Skills you'll develop:</div>
          <div className="flex flex-wrap gap-2">
            {safeItem.skills && safeItem.skills.map((skill) => (
              <Badge key={skill} variant="secondary" className="text-xs">
                {skill}
              </Badge>
            ))}
          </div>
        </div>

        {/* Prerequisites */}
        {safeItem.prerequisites && safeItem.prerequisites.length > 0 && (
          <div className="mb-4">
            <div className="text-sm font-medium mb-2">Prerequisites:</div>
            <div className="flex flex-wrap gap-2">
              {safeItem.prerequisites.map((prereq) => (
                <Badge key={prereq} variant="outline" className="text-xs">
                  {prereq}
                </Badge>
              ))}
            </div>
          </div>
        )}

        {/* Expandable Resources Section */}
        <Collapsible open={isExpanded} onOpenChange={setIsExpanded}>
          <CollapsibleTrigger asChild>
            <Button variant="ghost" className="w-full justify-between p-0 h-auto">
              <span className="text-sm font-medium">
                Resources & Details ({(safeItem.resources?.length || 0) + (safeItem.projects?.length || 0)})
              </span>
              <ChevronDown className={`h-4 w-4 transition-transform ${isExpanded ? 'rotate-180' : ''}`} />
            </Button>
          </CollapsibleTrigger>
          
          <CollapsibleContent className="mt-4 space-y-4">
            {/* Resources */}
            {safeItem.resources && safeItem.resources.length > 0 && (
              <div>
                <div className="text-sm font-medium mb-2">Learning Resources:</div>
                <div className="space-y-2">
                  {safeItem.resources.map((resource, index) => (
                    <div key={index} className="flex items-center justify-between p-3 bg-muted/50 rounded-lg">
                      <div className="flex-1">
                        <div className="flex items-center gap-2">
                          <BookOpen className="h-4 w-4 text-primary" />
                          <span className="font-medium text-sm">{resource.title}</span>
                          <Badge variant="outline" className="text-xs">
                            {resource.type}
                          </Badge>
                          <Badge className={resource.cost === 'Free' ? 'bg-success text-success-foreground' : 'bg-muted text-muted-foreground'}>
                            {resource.cost}
                          </Badge>
                        </div>
                        <p className="text-xs text-muted-foreground mt-1">{resource.description}</p>
                        {resource.platform && (
                          <p className="text-xs text-muted-foreground">Platform: {resource.platform}</p>
                        )}
                        {resource.rating && (
                          <div className="flex items-center gap-1 mt-1">
                            <Star className="h-3 w-3 fill-primary text-primary" />
                            <span className="text-xs">{resource.rating}/5</span>
                          </div>
                        )}
                      </div>
                      {resource.url && (
                        <Button size="sm" variant="outline" className="ml-2" asChild>
                          <a href={resource.url} target="_blank" rel="noopener noreferrer">
                            <ExternalLink className="h-3 w-3" />
                          </a>
                        </Button>
                      )}
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Project Details */}
            {safeItem.projects && safeItem.projects.length > 0 && (
              <div>
                <div className="text-sm font-medium mb-2">Project Details:</div>
                {safeItem.projects.map((project, index) => (
                  <div key={index} className="p-4 bg-muted/50 rounded-lg space-y-3">
                    <div>
                      <h4 className="font-medium">{project.title}</h4>
                      <p className="text-sm text-muted-foreground">{project.description}</p>
                    </div>
                    
                    <div>
                      <div className="text-sm font-medium mb-1">Tech Stack:</div>
                      <div className="flex flex-wrap gap-1">
                        {project.techStack.map((tech) => (
                          <Badge key={tech} variant="secondary" className="text-xs">
                            {tech}
                          </Badge>
                        ))}
                      </div>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-1">Key Features:</div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {project.features.map((feature, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <div className="h-1 w-1 bg-primary rounded-full" />
                            {feature}
                          </li>
                        ))}
                      </ul>
                    </div>

                    <div>
                      <div className="text-sm font-medium mb-1">Learning Outcomes:</div>
                      <ul className="text-sm text-muted-foreground space-y-1">
                        {project.learningOutcomes.map((outcome, i) => (
                          <li key={i} className="flex items-center gap-2">
                            <Target className="h-3 w-3 text-primary" />
                            {outcome}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                ))}
              </div>
            )}
          </CollapsibleContent>
        </Collapsible>

        {/* Removed the "Mark Complete" button section */}
      </CardContent>
    </Card>
  );
};

export default RoadmapStep;