export interface CurrentProfile {
  skills: string[];
  currentJob: string;
  experience: string;
  specializations: string[];
}

export interface TargetRole {
  title: string;
  level: 'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Principal' | 'Staff';
  domain: 'Frontend' | 'Backend' | 'Fullstack' | 'Mobile' | 'DevOps' | 'Data' | 'ML' | 'Management';
}

export interface RoadmapItem {
  id: string;
  title: string;
  description: string;
  type: 'skill' | 'project' | 'course' | 'certification' | 'resource' | 'experience';
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
  difficulty: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
  duration: string;
  estimatedHours: number;
  prerequisites: string[];
  skills: string[];
  completed: boolean;
  category: 'Technical' | 'Soft Skills' | 'Domain Knowledge' | 'Tools' | 'Leadership';
  resources: Resource[];
  projects?: ProjectIdea[];
  phase: number;
}

export interface Resource {
  title: string;
  type: 'course' | 'book' | 'article' | 'documentation' | 'video' | 'tutorial' | 'certification';
  url?: string;
  platform?: string;
  cost: 'Free' | 'Paid' | 'Subscription';
  rating?: number;
  description: string;
}

export interface ProjectIdea {
  title: string;
  description: string;
  techStack: string[];
  complexity: 'Simple' | 'Medium' | 'Complex' | 'Enterprise';
  features: string[];
  learningOutcomes: string[];
  timeEstimate: string;
}

export interface SkillGap {
  skill: string;
  currentLevel: number;
  requiredLevel: number;
  gap: number;
  priority: 'Critical' | 'High' | 'Medium' | 'Low';
}

export interface CareerPath {
  title: string;
  description: string;
  phases: Phase[];
  totalDuration: string;
  skillsRequired: string[];
  averageSalary?: string;
}

export interface Phase {
  id: number;
  title: string;
  description: string;
  duration: string;
  items: RoadmapItem[];
}