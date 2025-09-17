import { RoadmapItem } from "@/types/career";

export interface RoadmapResponse {
  phases: RoadmapPhase[];
  totalEstimatedHours: number;
  totalEstimatedWeeks: number;
}

export interface RoadmapPhase {
  id: number;
  title: string;
  goal: string;
  focus: string;
  estimatedHours: number;
  estimatedWeeks: number;
  items: RoadmapItem[];
}

export interface RoadmapApiResponse {
  success: boolean;
  data?: RoadmapResponse;
  error?: string;
}

// This is the exact format that the AI should return
export interface AIRoadmapResponse {
  phases: AIRoadmapPhase[];
  totalEstimatedHours: number;
  totalEstimatedWeeks: number;
}

export interface AIRoadmapPhase {
  id: number;
  title: string;
  goal: string;
  focus: string;
  estimatedHours: number;
  estimatedWeeks: number;
  items: AIRoadmapItem[];
}

export interface AIRoadmapItem {
  id: string;
  title: string;
  description: string;
  type: "skill" | "project" | "course" | "certification" | "resource" | "experience" | "action";
  priority: "Critical" | "High" | "Medium" | "Low" | "Important";
  difficulty: "Beginner" | "Intermediate" | "Advanced" | "Expert";
  duration: string;
  estimatedHours: number;
  prerequisites: string[];
  skills: string[];
  completed: boolean;
  category: "Technical" | "Soft Skills" | "Domain Knowledge" | "Tools" | "Leadership";
  resources: AIResource[];
  projects?: AIProjectIdea[];
  phase: number;
}

export interface AIResource {
  title: string;
  type: "course" | "book" | "article" | "documentation" | "video" | "tutorial" | "certification";
  url?: string;
  platform?: string;
  cost: "Free" | "Paid" | "Subscription";
  rating?: number;
  description: string;
}

export interface AIProjectIdea {
  title: string;
  description: string;
  techStack: string[];
  complexity: "Simple" | "Medium" | "Complex" | "Enterprise";
  features: string[];
  learningOutcomes: string[];
  timeEstimate: string;
}