import { RoadmapApiResponse } from "@/types/roadmapResponse";
import { CurrentProfile, TargetRole } from "@/types/career";

// This is the actual API endpoint
const API_BASE_URL = "https://backend-ai-path-carrer-production.up.railway.app/api";

export class RoadmapService {
  /**
   * Fetches a personalized career roadmap from the AI service
   * @param currentProfile - User's current skills and experience
   * @param targetRole - User's target role and level
   * @param careerGoals - User's career goals
   * @param learningStyle - User's preferred learning style
   * @param timeCommitment - User's weekly time commitment
   * @returns Promise resolving to roadmap data or error
   */
  static async fetchRoadmap(
    currentProfile: CurrentProfile,
    targetRole: TargetRole,
    careerGoals: string,
    learningStyle: string,
    timeCommitment: string
  ): Promise<RoadmapApiResponse> {
    try {
      // Transform the data to match the API expected format
      const apiPayload = {
        currentJobTitle: currentProfile.currentJob,
        yearsOfExperience: this.extractYearsOfExperience(currentProfile.experience),
        skills: currentProfile.skills.map(skill => {
          // Extract skill name and level from format "SkillName (Level)"
          const match = skill.match(/^(.*?)\s*\((.*?)\)$/);
          if (match) {
            return {
              name: match[1],
              level: match[2]
            };
          }
          // Default to Beginner if no level specified
          return {
            name: skill,
            level: "Beginner"
          };
        }),
        targetJobTitle: targetRole.title,
        targetLevel: targetRole.level,
        targetDomain: targetRole.domain,
        careerGoals: careerGoals,
        learningStyle: learningStyle,
        weeklyTimeCommitment: parseInt(timeCommitment) || 10
      };

      console.log("Making API call with payload:", apiPayload);

      const response = await fetch(`${API_BASE_URL}/roadmap/generate`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(apiPayload)
      });

      console.log("API response status:", response.status);

      if (!response.ok) {
        throw new Error(`API request failed with status ${response.status}`);
      }

      const data = await response.json();
      
      console.log("API response data:", data);
      
      // Transform the API response to match our internal format
      if (data.success && data.roadmap) {
        console.log("Transforming roadmap data:", data.roadmap);
        return { 
          success: true, 
          data: {
            phases: data.roadmap.phases,
            totalEstimatedHours: data.roadmap.totalEstimatedHours,
            totalEstimatedWeeks: data.roadmap.totalEstimatedWeeks
          }
        };
      } else if (data.phases) {
        // If the API returns data directly without the success/roadmap wrapper
        console.log("API returned data directly:", data);
        return { 
          success: true, 
          data: {
            phases: data.phases,
            totalEstimatedHours: data.totalEstimatedHours || 0,
            totalEstimatedWeeks: data.totalEstimatedWeeks || 0
          }
        };
      } else {
        throw new Error(data.error || "Failed to generate roadmap");
      }
    } catch (error) {
      console.error("Error fetching roadmap:", error);
      
      // Check if it's a CORS or network error
      if (error instanceof TypeError && error.message.includes('fetch')) {
        return {
          success: false,
          error: "Network error - please check your internet connection or try again later"
        };
      }
      
      return {
        success: false,
        error: error instanceof Error ? error.message : "Failed to generate roadmap"
      };
    }
  }

  /**
   * Extracts years of experience from experience string
   * @param experience - Experience string like "2 years" or "6 months"
   * @returns Number of years as integer
   */
  private static extractYearsOfExperience(experience: string): number {
    const match = experience.match(/(\d+)\s*year/);
    if (match) return parseInt(match[1]);
    
    // Check for months and convert to years
    const monthMatch = experience.match(/(\d+)\s*month/);
    if (monthMatch) return Math.round(parseInt(monthMatch[1]) / 12);
    
    return 1; // Default
  }

  /**
   * Generates a prompt for the AI model based on user input
   * @param currentProfile - User's current skills and experience
   * @param targetRole - User's target role and level
   * @returns Formatted prompt string for AI model
   */
  static generateAIPrompt(
    currentProfile: CurrentProfile,
    targetRole: TargetRole
  ): string {
    const skillsList = currentProfile.skills.join(", ");
    const experience = currentProfile.experience;
    
    return `
Generate a personalized career roadmap for a ${currentProfile.currentJob} with ${experience} of experience 
looking to become a ${targetRole.level} ${targetRole.title} in the ${targetRole.domain} domain.

Current skills: ${skillsList}

The roadmap should be structured in 4 phases:
1. Foundation Building - Core skills needed for the target role
2. Skill Development - Advanced skills and practical projects
3. Advanced Mastery - Leadership and specialized knowledge
4. Real-World Application - Practical experience and industry presence

For each phase, provide:
- Specific learning objectives
- Recommended resources (courses, books, documentation)
- Project ideas with clear deliverables
- Estimated time commitment
- Prerequisites for each item

For each roadmap item, include:
- Unique ID
- Title
- Detailed description
- Type (skill, project, course, certification, resource, experience)
- Priority (Critical, High, Medium, Low)
- Difficulty (Beginner, Intermediate, Advanced, Expert)
- Duration (e.g., "4-6 weeks")
- Estimated hours
- Prerequisites (array of strings)
- Skills developed (array of strings)
- Category (Technical, Soft Skills, Domain Knowledge, Tools, Leadership)
- Resources (array of resource objects with title, type, url, platform, cost, rating, description)
- Projects (optional array of project objects for project-type items)

Consider the user's current skill level and experience when determining the difficulty and depth of each recommendation.
Focus on practical, real-world applications rather than theoretical concepts.

Return the response in JSON format with the following structure:
{
  "phases": [
    {
      "id": number,
      "title": string,
      "goal": string,
      "focus": string,
      "estimatedHours": number,
      "estimatedWeeks": number,
      "items": [
        {
          "id": string,
          "title": string,
          "description": string,
          "type": "skill" | "project" | "course" |certification" | "resource" | "experience",
          "priority": "Critical" | "High" | "Medium" | "Low",
          "difficulty": "Beginner" | "Intermediate" | "Advanced" | "Expert",
          "duration": string,
          "estimatedHours": number,
          "prerequisites": string[],
          "skills": string[],
          "completed": boolean,
          "category": "Technical" | "Soft Skills" | "Domain Knowledge" | "Tools" | "Leadership",
          "resources": [
            {
              "title": string,
              "type": "course" | "book" | "article" | "documentation" | "video" | "tutorial" | "certification",
              "url": string,
              "platform": string,
              "cost": "Free" | "Paid" | "Subscription",
              "rating": number,
              "description": string
            }
          ],
          "projects": [
            {
              "title": string,
              "description": string,
              "techStack": string[],
              "complexity": "Simple" | "Medium" | "Complex" | "Enterprise",
              "features": string[],
              "learningOutcomes": string[],
              "timeEstimate": string
            }
          ],
          "phase": number
        }
      ]
    }
  ],
  "totalEstimatedHours": number,
  "totalEstimatedWeeks": number
}
`;
  }
}