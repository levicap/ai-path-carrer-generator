# Roadmap Service API Documentation

## Overview
The Roadmap Service is responsible for generating personalized career roadmaps by calling an external AI model. This document describes the expected request and response formats.

## API Endpoint
```
POST https://api.ascendpath.ai/v1/roadmap
```

## Request Format
The service sends a POST request with the following JSON payload:

```json
{
  "currentProfile": {
    "skills": ["JavaScript (Intermediate)", "React (Beginner)", "Node.js (Advanced)"],
    "currentJob": "Frontend Developer",
    "experience": "3 years",
    "specializations": []
  },
  "targetRole": {
    "title": "Senior Frontend Developer",
    "level": "Senior",
    "domain": "Frontend"
  }
}
```

## Response Format
The AI model should return a JSON response with the following structure:

```json
{
  "phases": [
    {
      "id": 1,
      "title": "Foundation Building",
      "goal": "Establish core skills and knowledge required for your target role",
      "focus": "Build a solid foundation in essential technologies and concepts",
      "estimatedHours": 160,
      "estimatedWeeks": 4,
      "items": [
        {
          "id": "skill-1-0",
          "title": "Master JavaScript Fundamentals",
          "description": "Deepen your JavaScript knowledge with ES6+, async programming, closures, and modern patterns.",
          "type": "skill",
          "priority": "Critical",
          "difficulty": "Intermediate",
          "duration": "4-6 weeks",
          "estimatedHours": 80,
          "prerequisites": ["Programming fundamentals"],
          "skills": ["JavaScript"],
          "completed": false,
          "category": "Technical",
          "resources": [
            {
              "title": "Eloquent JavaScript",
              "type": "book",
              "url": "https://eloquentjavascript.net/",
              "cost": "Free",
              "rating": 4.7,
              "description": "Comprehensive introduction to JavaScript with practical exercises"
            }
          ],
          "phase": 1
        }
      ]
    }
  ],
  "totalEstimatedHours": 400,
  "totalEstimatedWeeks": 10
}
```

## Data Types

### RoadmapPhase
| Field | Type | Description |
|-------|------|-------------|
| id | number | Phase identifier (1-4) |
| title | string | Phase title |
| goal | string | Primary goal of the phase |
| focus | string | Focus area for the phase |
| estimatedHours | number | Total estimated hours for the phase |
| estimatedWeeks | number | Estimated weeks to complete the phase |
| items | RoadmapItem[] | Array of roadmap items in this phase |

### RoadmapItem
| Field | Type | Description |
|-------|------|-------------|
| id | string | Unique identifier for the item |
| title | string | Item title |
| description | string | Detailed description of the item |
| type | "skill" \| "project" \| "course" \| "certification" \| "resource" \| "experience" | Type of roadmap item |
| priority | "Critical" \| "High" \| "Medium" \| "Low" | Priority level |
| difficulty | "Beginner" \| "Intermediate" \| "Advanced" \| "Expert" | Difficulty level |
| duration | string | Estimated duration (e.g., "4-6 weeks") |
| estimatedHours | number | Estimated hours to complete |
| prerequisites | string[] | Array of prerequisite skills |
| skills | string[] | Array of skills developed |
| completed | boolean | Completion status (always false in generated roadmaps) |
| category | "Technical" \| "Soft Skills" \| "Domain Knowledge" \| "Tools" \| "Leadership" | Category of the item |
| resources | Resource[] | Array of learning resources |
| projects | ProjectIdea[] | Array of project ideas (only for project-type items) |
| phase | number | Phase number this item belongs to |

### Resource
| Field | Type | Description |
|-------|------|-------------|
| title | string | Resource title |
| type | "course" \| "book" \| "article" \| "documentation" \| "video" \| "tutorial" \| "certification" | Resource type |
| url | string (optional) | URL to the resource |
| platform | string (optional) | Platform hosting the resource |
| cost | "Free" \| "Paid" \| "Subscription" | Cost category |
| rating | number (optional) | Rating (1-5) |
| description | string | Description of the resource |

### ProjectIdea
| Field | Type | Description |
|-------|------|-------------|
| title | string | Project title |
| description | string | Detailed project description |
| techStack | string[] | Technologies to be used |
| complexity | "Simple" \| "Medium" \| "Complex" \| "Enterprise" | Project complexity |
| features | string[] | Key features to implement |
| learningOutcomes | string[] | Skills to be learned |
| timeEstimate | string | Estimated time to complete |