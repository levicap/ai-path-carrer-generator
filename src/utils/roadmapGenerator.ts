import { CurrentProfile, TargetRole, RoadmapItem, SkillGap, CareerPath, ProjectIdea, Resource } from '@/types/career';
import { skillLevels, resources, projectIdeas, careerPaths } from '@/data/careerPaths';

export class RoadmapGenerator {
  private currentProfile: CurrentProfile;
  private targetRole: TargetRole;

  constructor(currentProfile: CurrentProfile, targetRole: TargetRole) {
    this.currentProfile = currentProfile;
    this.targetRole = targetRole;
  }

  generateRoadmap(): RoadmapItem[] {
    const skillGaps = this.analyzeSkillGaps();
    const roadmapItems: RoadmapItem[] = [];
    
    // Phase 1: Foundation Building - Critical Skills
    const criticalSkills = skillGaps.filter(gap => gap.priority === 'Critical');
    roadmapItems.push(...this.generateSkillItems(criticalSkills, 1));
    
    // Phase 2: Skill Development - High Priority Skills + Projects
    const highPrioritySkills = skillGaps.filter(gap => gap.priority === 'High');
    roadmapItems.push(...this.generateSkillItems(highPrioritySkills, 2));
    roadmapItems.push(...this.generateProjectItems(2));
    
    // Phase 3: Advanced Mastery - Medium Priority Skills + Leadership
    const mediumPrioritySkills = skillGaps.filter(gap => gap.priority === 'Medium');
    roadmapItems.push(...this.generateSkillItems(mediumPrioritySkills, 3));
    roadmapItems.push(...this.generateLeadershipItems(3));
    
    // Phase 4: Real-World Application - Specialization + Experience
    roadmapItems.push(...this.generateSpecializationItems(4));
    roadmapItems.push(...this.generateExperienceItems(4));

    return this.prioritizeAndOptimize(roadmapItems);
  }

  analyzeSkillGaps(): SkillGap[] {
    const gaps: SkillGap[] = [];
    const targetLevel = this.getTargetSkillLevel();
    
    // Core technical skills analysis
    const requiredSkills = this.getRequiredSkills();
    
    requiredSkills.forEach(skill => {
      const currentLevel = this.getCurrentSkillLevel(skill);
      const skillData = skillLevels[skill as keyof typeof skillLevels];
      const requiredLevel = skillData?.[targetLevel] || 5;
      
      if (currentLevel < requiredLevel) {
        gaps.push({
          skill,
          currentLevel,
          requiredLevel,
          gap: requiredLevel - currentLevel,
          priority: this.calculatePriority(skill, requiredLevel - currentLevel)
        });
      }
    });

    return gaps.sort((a, b) => b.gap - a.gap);
  }

  private getTargetSkillLevel(): 'junior' | 'mid' | 'senior' | 'lead' {
    const levelMap = {
      'Junior': 'junior',
      'Mid': 'mid',
      'Senior': 'senior',
      'Lead': 'lead',
      'Principal': 'lead',
      'Staff': 'lead'
    } as const;
    
    return levelMap[this.targetRole.level] as 'junior' | 'mid' | 'senior' | 'lead';
  }

  private getRequiredSkills(): string[] {
    const domainSkills = {
      'Frontend': ['JavaScript', 'React', 'TypeScript', 'Testing', 'Git', 'HTML/CSS', 'State Management'],
      'Backend': ['Node.js', 'Python', 'SQL', 'API Design', 'Testing', 'Git', 'Database Design'],
      'Fullstack': ['JavaScript', 'React', 'Node.js', 'SQL', 'TypeScript', 'Testing', 'Git', 'HTML/CSS', 'Database Design'],
      'Mobile': ['React Native', 'Flutter', 'Swift', 'Kotlin', 'Testing', 'Mobile UI/UX'],
      'DevOps': ['AWS', 'Docker', 'Kubernetes', 'CI/CD', 'Monitoring', 'Infrastructure as Code', 'Linux'],
      'Data': ['Python', 'SQL', 'Data Analysis', 'Machine Learning', 'Statistics', 'Data Visualization'],
      'ML': ['Python', 'Machine Learning', 'Statistics', 'Data Analysis', 'Deep Learning', 'TensorFlow/PyTorch'],
      'Management': ['Leadership', 'Project Management', 'Communication', 'Mentoring', 'Strategy', 'Budgeting']
    };

    const levelSkills = {
      'Junior': [],
      'Mid': ['System Design', 'Architecture', 'Code Review'],
      'Senior': ['System Design', 'Architecture', 'Leadership', 'Mentoring', 'Code Review', 'Performance Optimization'],
      'Lead': ['System Design', 'Architecture', 'Leadership', 'Mentoring', 'Project Management', 'Communication', 'Code Review', 'Performance Optimization', 'Team Management'],
      'Principal': ['System Design', 'Architecture', 'Leadership', 'Mentoring', 'Project Management', 'Communication', 'Strategy', 'Innovation', 'Industry Expertise'],
      'Staff': ['System Design', 'Architecture', 'Leadership', 'Mentoring', 'Project Management', 'Communication', 'Strategy', 'Innovation', 'Industry Expertise']
    };

    return [
      ...(domainSkills[this.targetRole.domain] || []),
      ...(levelSkills[this.targetRole.level] || [])
    ];
  }

  private getCurrentSkillLevel(skill: string): number {
    // More sophisticated heuristic based on current skills and experience
    const currentSkills = this.currentProfile.skills.map(s => s.toLowerCase());
    const skillLower = skill.toLowerCase();
    
    // Check for exact matches or partial matches with experience level
    for (const currentSkill of currentSkills) {
      // Check if the skill name is in the current skill string
      if (currentSkill.includes(skillLower) || skillLower.includes(currentSkill.split(' ')[0])) {
        // Extract experience level from the skill string (e.g., "JavaScript (Intermediate)")
        if (currentSkill.includes('(beginner)')) return 2;
        if (currentSkill.includes('(intermediate)')) return 4;
        if (currentSkill.includes('(advanced)')) return 6;
        if (currentSkill.includes('(expert)')) return 8;
        
        // Default to basic level if no experience specified
        return 3;
      }
    }
    
    return 1; // Beginner level if skill not present
  }

  private extractExperienceYears(): number {
    const experience = this.currentProfile.experience.toLowerCase();
    const match = experience.match(/(\d+)\s*year/);
    if (match) return parseInt(match[1]);
    
    // Also check for months
    const monthMatch = experience.match(/(\d+)\s*month/);
    if (monthMatch) return parseInt(monthMatch[1]) / 12;
    
    return 1;
  }

  private calculatePriority(skill: string, gap: number): 'Critical' | 'High' | 'Medium' | 'Low' {
    const criticalSkills = [
      'JavaScript', 'React', 'Node.js', 'System Design', 'Leadership', 
      'API Design', 'Database Design', 'Testing', 'Git', 'HTML/CSS',
      'Python', 'SQL', 'TypeScript'
    ];
    
    if (criticalSkills.includes(skill) && gap >= 3) return 'Critical';
    if (gap >= 4) return 'Critical';
    if (gap >= 2) return 'High';
    if (gap >= 1) return 'Medium';
    return 'Low';
  }

  private generateSkillItems(skillGaps: SkillGap[], phase: number): RoadmapItem[] {
    return skillGaps.map((gap, index) => ({
      id: `skill-${phase}-${index}`,
      title: `Master ${gap.skill}`,
      description: this.generateSkillDescription(gap),
      type: 'skill' as const,
      priority: gap.priority,
      difficulty: this.mapGapToDifficulty(gap.gap),
      duration: this.calculateDuration(gap.gap),
      estimatedHours: gap.gap * 40,
      prerequisites: this.getPrerequisites(gap.skill),
      skills: [gap.skill],
      completed: false,
      category: this.categorizeSkill(gap.skill),
      resources: resources[gap.skill] || [],
      phase
    }));
  }

  private generateProjectItems(phase: number): RoadmapItem[] {
    const domain = this.targetRole.domain;
    const relevantProjects = projectIdeas[domain] || projectIdeas['Fullstack'];
    
    return relevantProjects.slice(0, 2).map((project, index) => ({
      id: `project-${phase}-${index}`,
      title: `Build: ${project.title}`,
      description: project.description,
      type: 'project' as const,
      priority: 'High' as const,
      difficulty: this.mapComplexityToDifficulty(project.complexity),
      duration: project.timeEstimate,
      estimatedHours: this.parseTimeEstimate(project.timeEstimate),
      prerequisites: project.techStack,
      skills: project.techStack,
      completed: false,
      category: 'Technical' as const,
      resources: [],
      projects: [project],
      phase
    }));
  }

  private generateLeadershipItems(phase: number): RoadmapItem[] {
    if (this.targetRole.level === 'Junior') return [];
    
    const items: RoadmapItem[] = [
      {
        id: `leadership-${phase}-1`,
        title: 'Develop Code Review Skills',
        description: 'Learn to provide constructive feedback and mentor junior developers through code reviews. Focus on code quality, best practices, and collaborative development.',
        type: 'skill',
        priority: 'High',
        difficulty: 'Intermediate',
        duration: '4-6 weeks',
        estimatedHours: 60,
        prerequisites: ['Programming fundamentals', 'Experience with version control'],
        skills: ['Code Review', 'Mentoring', 'Communication'],
        completed: false,
        category: 'Leadership',
        resources: resources['Leadership'] || [],
        phase
      }
    ];

    if (['Senior', 'Lead', 'Principal', 'Staff'].includes(this.targetRole.level)) {
      items.push({
        id: `leadership-${phase}-2`,
        title: 'Technical Leadership Training',
        description: 'Develop skills in technical decision making, team leadership, and cross-functional collaboration. Learn to drive technical initiatives and mentor team members.',
        type: 'course',
        priority: 'Critical',
        difficulty: 'Advanced',
        duration: '8-12 weeks',
        estimatedHours: 120,
        prerequisites: ['Technical expertise', 'Communication skills', '2+ years of experience'],
        skills: ['Leadership', 'Project Management', 'Communication', 'Decision Making'],
        completed: false,
        category: 'Leadership',
        resources: resources['Leadership'] || [],
        phase
      });
    }

    return items;
  }

  private generateSpecializationItems(phase: number): RoadmapItem[] {
    const items: RoadmapItem[] = [];
    
    // Add domain-specific advanced topics
    if (this.targetRole.domain === 'Frontend') {
      items.push({
        id: `spec-${phase}-1`,
        title: 'Advanced React Patterns & Performance',
        description: 'Master advanced React patterns, performance optimization techniques, and microfrontend architecture. Learn to build scalable and maintainable frontend applications.',
        type: 'skill',
        priority: 'Medium',
        difficulty: 'Advanced',
        duration: '6-8 weeks',
        estimatedHours: 80,
        prerequisites: ['React', 'JavaScript', 'TypeScript', 'State Management'],
        skills: ['React', 'Performance', 'Architecture', 'State Management'],
        completed: false,
        category: 'Technical',
        resources: resources['React'] || [],
        phase
      });
    }

    if (this.targetRole.domain === 'Backend') {
      items.push({
        id: `spec-${phase}-1`,
        title: 'Distributed Systems & Microservices',
        description: 'Learn to design and implement distributed systems and microservices architectures. Understand scalability patterns, service communication, and fault tolerance.',
        type: 'skill',
        priority: 'High',
        difficulty: 'Advanced',
        duration: '8-10 weeks',
        estimatedHours: 100,
        prerequisites: ['Backend development', 'Database design', 'API Design'],
        skills: ['Microservices', 'Distributed Systems', 'Scalability', 'Architecture'],
        completed: false,
        category: 'Technical',
        resources: resources['System Design'] || [],
        phase
      });
    }

    if (['Senior', 'Lead', 'Principal', 'Staff'].includes(this.targetRole.level)) {
      items.push({
        id: `spec-${phase}-2`,
        title: 'System Design Mastery',
        description: 'Design large-scale distributed systems, understand trade-offs, and architectural patterns. Learn to make critical technical decisions for complex systems.',
        type: 'skill',
        priority: 'Critical',
        difficulty: 'Expert',
        duration: '12-16 weeks',
        estimatedHours: 160,
        prerequisites: ['Backend development', 'Database design', '2+ years experience'],
        skills: ['System Design', 'Architecture', 'Scalability', 'Decision Making'],
        completed: false,
        category: 'Technical',
        resources: resources['System Design'] || [],
        phase
      });
    }

    return items;
  }

  private generateExperienceItems(phase: number): RoadmapItem[] {
    return [
      {
        id: `exp-${phase}-1`,
        title: 'Build a Portfolio of Real Projects',
        description: 'Create 2-3 substantial projects that demonstrate your skills in your target domain. Focus on solving real problems and showcasing your technical abilities.',
        type: 'experience',
        priority: 'High',
        difficulty: 'Intermediate',
        duration: 'Ongoing',
        estimatedHours: 150,
        prerequisites: ['Core domain skills', 'Git', 'Deployment experience'],
        skills: ['Project Development', 'Problem Solving', 'Portfolio Building'],
        completed: false,
        category: 'Technical',
        resources: [],
        phase
      },
      {
        id: `exp-${phase}-2`,
        title: 'Technical Blog & Community Engagement',
        description: 'Start writing technical blogs, contribute to open source projects, and engage with the developer community. Establish thought leadership in your domain.',
        type: 'experience',
        priority: 'Medium',
        difficulty: 'Intermediate',
        duration: 'Ongoing',
        estimatedHours: 100,
        prerequisites: ['Domain expertise', 'Communication skills'],
        skills: ['Communication', 'Technical Writing', 'Community Engagement', 'Open Source'],
        completed: false,
        category: 'Soft Skills',
        resources: [],
        phase
      }
    ];
  }

  private prioritizeAndOptimize(items: RoadmapItem[]): RoadmapItem[] {
    // Sort by phase first, then by priority
    const priorityOrder = { 'Critical': 4, 'High': 3, 'Medium': 2, 'Low': 1 };
    
    return items.sort((a, b) => {
      if (a.phase !== b.phase) return a.phase - b.phase;
      return priorityOrder[b.priority] - priorityOrder[a.priority];
    });
  }

  private generateSkillDescription(gap: SkillGap): string {
    const descriptions = {
      'JavaScript': 'Deepen your JavaScript knowledge with ES6+, async programming, closures, and modern patterns. Master debugging techniques and performance optimization.',
      'React': 'Master React hooks, context, performance optimization, advanced patterns, and state management solutions. Learn testing strategies and best practices.',
      'TypeScript': 'Learn type safety, advanced types, generics, and how to build maintainable applications. Understand integration with modern frameworks.',
      'System Design': 'Understand distributed systems, scalability patterns, architectural trade-offs, and design principles for large-scale applications.',
      'Leadership': 'Develop team leadership, mentoring, technical decision-making, and cross-functional collaboration skills.',
      'Node.js': 'Build scalable backend services with Node.js, Express, and modern frameworks. Learn database integration, authentication, and deployment strategies.',
      'AWS': 'Master cloud architecture, serverless computing, DevOps practices, and cost optimization. Learn to design secure and scalable cloud solutions.',
      'Testing': 'Implement comprehensive testing strategies including unit, integration, E2E, and contract testing. Learn testing frameworks and best practices.',
      'Python': 'Advance your Python skills with data structures, algorithms, and libraries relevant to your domain. Learn best practices and performance optimization.',
      'SQL': 'Master advanced SQL queries, database design, optimization techniques, and data modeling for complex applications.',
      'API Design': 'Learn RESTful API design principles, GraphQL, documentation standards, and versioning strategies. Understand security and performance considerations.',
      'Database Design': 'Master database modeling, normalization, indexing, and query optimization. Learn both SQL and NoSQL database design principles.',
      'HTML/CSS': 'Advance your frontend skills with modern CSS techniques, responsive design, accessibility, and performance optimization.',
      'State Management': 'Learn advanced state management patterns and tools for complex applications. Understand when and how to implement different solutions.',
      'Mobile UI/UX': 'Master mobile-first design principles, responsive layouts, and platform-specific guidelines for iOS and Android.',
      'Infrastructure as Code': 'Learn tools like Terraform and CloudFormation to automate infrastructure provisioning and management.',
      'Linux': 'Develop proficiency in Linux command line, system administration, and scripting for DevOps and backend development.',
      'Data Analysis': 'Learn data cleaning, visualization, statistical analysis, and tools like Pandas and NumPy for data processing.',
      'Machine Learning': 'Master ML algorithms, model evaluation, and frameworks like TensorFlow or PyTorch for building intelligent applications.',
      'Deep Learning': 'Learn neural networks, deep learning architectures, and advanced techniques for complex AI applications.',
      'TensorFlow/PyTorch': 'Gain proficiency in popular ML frameworks for building, training, and deploying machine learning models.',
      'Data Visualization': 'Learn tools and techniques for creating effective data visualizations to communicate insights.',
      'Budgeting': 'Develop skills in project budgeting, resource allocation, and financial planning for technical initiatives.',
      'Innovation': 'Learn to drive innovation within teams and organizations through research, experimentation, and strategic thinking.',
      'Industry Expertise': 'Develop deep knowledge of industry trends, best practices, and emerging technologies in your domain.'
    };
    
    return descriptions[gap.skill] || `Advance your ${gap.skill} skills to the next level. Focus on practical application and real-world problem solving.`;
  }

  private mapGapToDifficulty(gap: number): 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' {
    if (gap >= 4) return 'Expert';
    if (gap >= 3) return 'Advanced';
    if (gap >= 2) return 'Intermediate';
    return 'Beginner';
  }

  private mapComplexityToDifficulty(complexity: string): 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert' {
    const map = {
      'Simple': 'Beginner',
      'Medium': 'Intermediate',
      'Complex': 'Advanced',
      'Enterprise': 'Expert'
    } as const;
    
    return map[complexity as keyof typeof map] || 'Intermediate';
  }

  private calculateDuration(gap: number): string {
    const weeks = gap * 2;
    return `${weeks}-${weeks + 2} weeks`;
  }

  private parseTimeEstimate(estimate: string): number {
    const match = estimate.match(/(\d+)-?(\d+)?\s*weeks?/);
    if (match) {
      const weeks = parseInt(match[1]);
      return weeks * 40; // 40 hours per week
    }
    return 80; // Default
  }

  private getPrerequisites(skill: string): string[] {
    const prereqs = {
      'React': ['JavaScript', 'HTML', 'CSS'],
      'TypeScript': ['JavaScript'],
      'Node.js': ['JavaScript'],
      'System Design': ['Backend development', 'Database knowledge'],
      'Leadership': ['Technical expertise', 'Communication'],
      'AWS': ['Cloud concepts', 'Networking basics'],
      'Docker': ['Linux basics', 'Networking concepts'],
      'Kubernetes': ['Docker', 'Cloud concepts'],
      'Testing': ['Programming fundamentals'],
      'API Design': ['Backend development', 'HTTP protocols'],
      'Database Design': ['SQL basics', 'Data modeling concepts'],
      'State Management': ['React or similar framework'],
      'Mobile UI/UX': ['Design fundamentals', 'Platform guidelines'],
      'Infrastructure as Code': ['Cloud concepts', 'Scripting basics'],
      'Linux': ['Command line basics', 'Operating systems fundamentals'],
      'Data Analysis': ['Python or R basics', 'Statistics fundamentals'],
      'Machine Learning': ['Python', 'Statistics', 'Linear Algebra'],
      'Deep Learning': ['Machine Learning', 'Calculus', 'Neural Networks'],
      'TensorFlow/PyTorch': ['Python', 'Machine Learning'],
      'Data Visualization': ['Data Analysis', 'Design basics'],
      'Budgeting': ['Project Management', 'Financial literacy'],
      'Innovation': ['Industry experience', 'Strategic thinking'],
      'Industry Expertise': ['Years of experience', 'Continuous learning']
    };
    
    return prereqs[skill as keyof typeof prereqs] || [];
  }

  private categorizeSkill(skill: string): 'Technical' | 'Soft Skills' | 'Domain Knowledge' | 'Tools' | 'Leadership' {
    const categories: Record<string, 'Technical' | 'Soft Skills' | 'Domain Knowledge' | 'Tools' | 'Leadership'> = {
      'Leadership': 'Leadership',
      'Communication': 'Soft Skills',
      'Mentoring': 'Leadership',
      'Project Management': 'Leadership',
      'Code Review': 'Technical',
      'Testing': 'Technical',
      'API Design': 'Technical',
      'Database Design': 'Technical',
      'System Design': 'Domain Knowledge',
      'Architecture': 'Domain Knowledge',
      'AWS': 'Tools',
      'Docker': 'Tools',
      'Kubernetes': 'Tools',
      'Git': 'Tools',
      'Linux': 'Tools',
      'Infrastructure as Code': 'Tools',
      'HTML/CSS': 'Technical',
      'State Management': 'Technical',
      'Mobile UI/UX': 'Technical',
      'Data Analysis': 'Technical',
      'Machine Learning': 'Technical',
      'Deep Learning': 'Technical',
      'TensorFlow/PyTorch': 'Tools',
      'Data Visualization': 'Technical',
      'Budgeting': 'Leadership',
      'Innovation': 'Leadership',
      'Industry Expertise': 'Domain Knowledge',
      'Strategy': 'Leadership',
      'Decision Making': 'Leadership',
      'Team Management': 'Leadership',
      'Performance Optimization': 'Technical',
      'Security': 'Technical'
    };
    
    return categories[skill] || 'Technical';
  }

  // Method to generate a prompt for AI
  generateAIPrompt(): string {
    const skillsList = this.currentProfile.skills.join(", ");
    const experienceYears = this.extractExperienceYears();
    
    return `
Generate a personalized career roadmap for a ${this.currentProfile.currentJob} with ${this.currentProfile.experience} of experience 
looking to become a ${this.targetRole.level} ${this.targetRole.title} in the ${this.targetRole.domain} domain.

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

Consider the user's current skill level and experience when determining the difficulty and depth of each recommendation.
Focus on practical, real-world applications rather than theoretical concepts.
`;
  }
}