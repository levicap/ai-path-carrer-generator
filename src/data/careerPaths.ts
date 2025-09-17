import { CareerPath, Resource, ProjectIdea, RoadmapItem } from '@/types/career';

export const skillLevels = {
  'JavaScript': { junior: 3, mid: 6, senior: 8, lead: 9 },
  'React': { junior: 3, mid: 6, senior: 8, lead: 9 },
  'TypeScript': { junior: 2, mid: 5, senior: 7, lead: 8 },
  'Node.js': { junior: 2, mid: 5, senior: 7, lead: 8 },
  'System Design': { junior: 1, mid: 4, senior: 7, lead: 9 },
  'Leadership': { junior: 1, mid: 3, senior: 6, lead: 9 },
  'Architecture': { junior: 1, mid: 3, senior: 7, lead: 9 },
  'Python': { junior: 3, mid: 6, senior: 8, lead: 8 },
  'SQL': { junior: 3, mid: 5, senior: 7, lead: 7 },
  'AWS': { junior: 2, mid: 5, senior: 7, lead: 8 },
  'Docker': { junior: 2, mid: 4, senior: 6, lead: 7 },
  'Testing': { junior: 2, mid: 5, senior: 7, lead: 8 },
  'Git': { junior: 3, mid: 5, senior: 6, lead: 7 },
  'CI/CD': { junior: 1, mid: 4, senior: 6, lead: 7 },
  'MongoDB': { junior: 2, mid: 4, senior: 6, lead: 6 },
  'GraphQL': { junior: 1, mid: 3, senior: 5, lead: 6 },
  'Next.js': { junior: 2, mid: 4, senior: 6, lead: 7 },
  'Vue.js': { junior: 3, mid: 5, senior: 7, lead: 7 },
  'Angular': { junior: 3, mid: 5, senior: 7, lead: 7 },
  'Microservices': { junior: 1, mid: 3, senior: 6, lead: 8 },
  'Kubernetes': { junior: 1, mid: 3, senior: 6, lead: 7 },
  'Redis': { junior: 1, mid: 3, senior: 5, lead: 6 },
  'Elasticsearch': { junior: 1, mid: 3, senior: 5, lead: 6 },
  'Machine Learning': { junior: 2, mid: 4, senior: 7, lead: 8 },
  'Data Analysis': { junior: 2, mid: 5, senior: 7, lead: 8 },
  'Communication': { junior: 3, mid: 5, senior: 7, lead: 9 },
  'Project Management': { junior: 1, mid: 3, senior: 6, lead: 8 },
  'Mentoring': { junior: 1, mid: 2, senior: 5, lead: 8 },
  'Code Review': { junior: 2, mid: 4, senior: 6, lead: 7 },
  'HTML/CSS': { junior: 4, mid: 6, senior: 8, lead: 8 },
  'State Management': { junior: 2, mid: 5, senior: 7, lead: 8 },
  'Database Design': { junior: 3, mid: 5, senior: 7, lead: 8 },
  'API Design': { junior: 2, mid: 5, senior: 7, lead: 8 },
  'Performance Optimization': { junior: 1, mid: 4, senior: 7, lead: 8 },
  'Security': { junior: 2, mid: 4, senior: 6, lead: 8 },
  'Linux': { junior: 2, mid: 4, senior: 6, lead: 7 },
  'Infrastructure as Code': { junior: 1, mid: 3, senior: 5, lead: 7 }
};

export const resources: Record<string, Resource[]> = {
  'React': [
    {
      title: 'React Official Documentation',
      type: 'documentation',
      url: 'https://react.dev',
      platform: 'React Team',
      cost: 'Free',
      rating: 4.9,
      description: 'Official React documentation with interactive examples and best practices'
    },
    {
      title: 'The Complete React Developer Course',
      type: 'course',
      platform: 'Udemy',
      cost: 'Paid',
      rating: 4.7,
      description: 'Comprehensive React course from basics to advanced patterns and performance optimization'
    },
    {
      title: 'React Design Patterns and Best Practices',
      type: 'book',
      cost: 'Paid',
      rating: 4.5,
      description: 'Advanced React patterns, performance optimization, and architecture'
    }
  ],
  'System Design': [
    {
      title: 'Designing Data-Intensive Applications',
      type: 'book',
      cost: 'Paid',
      rating: 4.8,
      description: 'Essential book for understanding distributed systems and data architecture'
    },
    {
      title: 'System Design Interview Course',
      type: 'course',
      platform: 'Educative',
      cost: 'Subscription',
      rating: 4.6,
      description: 'Comprehensive system design interview preparation with real-world examples'
    },
    {
      title: 'High Scalability Blog',
      type: 'article',
      url: 'http://highscalability.com',
      cost: 'Free',
      rating: 4.4,
      description: 'Real-world architecture case studies from top companies like Netflix, Uber, and Airbnb'
    }
  ],
  'Leadership': [
    {
      title: 'The Manager\'s Path',
      type: 'book',
      cost: 'Paid',
      rating: 4.7,
      description: 'Essential guide for transitioning from developer to technical leader with practical advice'
    },
    {
      title: 'Technical Leadership Masterclass',
      type: 'course',
      platform: 'Pluralsight',
      cost: 'Subscription',
      rating: 4.5,
      description: 'Developing technical leadership skills and team management strategies'
    },
    {
      title: 'Radical Candor',
      type: 'book',
      cost: 'Paid',
      rating: 4.6,
      description: 'How to be a great leader by caring personally and challenging directly'
    }
  ],
  'AWS': [
    {
      title: 'AWS Solutions Architect Certification',
      type: 'certification',
      platform: 'AWS',
      cost: 'Paid',
      rating: 4.6,
      description: 'Industry-recognized AWS certification for cloud architecture and best practices'
    },
    {
      title: 'AWS Free Tier Hands-on Labs',
      type: 'tutorial',
      url: 'https://aws.amazon.com/free',
      cost: 'Free',
      rating: 4.3,
      description: 'Practical AWS experience with free tier resources and guided projects'
    },
    {
      title: 'AWS Well-Architected Framework',
      type: 'documentation',
      url: 'https://aws.amazon.com/architecture/well-architected',
      cost: 'Free',
      rating: 4.8,
      description: 'Best practices for designing secure, high-performing, and resilient cloud architectures'
    }
  ],
  'JavaScript': [
    {
      title: 'Eloquent JavaScript',
      type: 'book',
      cost: 'Free',
      rating: 4.7,
      description: 'Comprehensive introduction to JavaScript with practical exercises',
      url: 'https://eloquentjavascript.net/'
    },
    {
      title: 'JavaScript: The Definitive Guide',
      type: 'book',
      cost: 'Paid',
      rating: 4.6,
      description: 'Complete reference for JavaScript developers'
    }
  ],
  'Node.js': [
    {
      title: 'Node.js Official Documentation',
      type: 'documentation',
      url: 'https://nodejs.org/en/docs/',
      cost: 'Free',
      rating: 4.5,
      description: 'Official Node.js documentation and API references'
    },
    {
      title: 'Node.js: The Complete Guide',
      type: 'course',
      platform: 'Udemy',
      cost: 'Paid',
      rating: 4.6,
      description: 'From basics to advanced concepts including Express, databases, and deployment'
    }
  ],
  'Python': [
    {
      title: 'Automate the Boring Stuff with Python',
      type: 'book',
      cost: 'Free',
      rating: 4.7,
      description: 'Practical programming for total beginners',
      url: 'https://automatetheboringstuff.com/'
    },
    {
      title: 'Python for Data Analysis',
      type: 'book',
      cost: 'Paid',
      rating: 4.5,
      description: 'Working with structured data using pandas and related tools'
    }
  ]
};

export const projectIdeas: Record<string, ProjectIdea[]> = {
  'Frontend': [
    {
      title: 'Advanced E-commerce Platform',
      description: 'Build a full-featured e-commerce platform with payment integration, inventory management, and admin dashboard. Implement advanced features like product recommendations, real-time inventory updates, and analytics.',
      techStack: ['React', 'TypeScript', 'Redux Toolkit', 'Stripe API', 'Tailwind CSS', 'Node.js', 'MongoDB'],
      complexity: 'Complex',
      features: ['User authentication', 'Product catalog', 'Shopping cart', 'Payment processing', 'Order management', 'Admin panel', 'Product recommendations', 'Analytics dashboard'],
      learningOutcomes: ['State management', 'API integration', 'Payment systems', 'Complex UI patterns', 'Real-time data', 'Performance optimization'],
      timeEstimate: '8-12 weeks'
    },
    {
      title: 'Real-time Collaboration Tool',
      description: 'Create a collaborative workspace like Notion or Figma with real-time editing, commenting, and version control. Focus on user experience and performance optimization.',
      techStack: ['React', 'WebSockets', 'Node.js', 'MongoDB', 'Socket.io', 'Tailwind CSS'],
      complexity: 'Enterprise',
      features: ['Real-time collaboration', 'Rich text editor', 'File sharing', 'User permissions', 'Version history', 'Commenting system', 'Notifications'],
      learningOutcomes: ['WebSocket implementation', 'Real-time synchronization', 'Conflict resolution', 'Performance optimization', 'User experience design'],
      timeEstimate: '12-16 weeks'
    }
  ],
  'Backend': [
    {
      title: 'Microservices Architecture Platform',
      description: 'Design and implement a microservices-based application with API gateway, service discovery, and monitoring. Include authentication, logging, and error handling across services.',
      techStack: ['Node.js', 'Docker', 'Kubernetes', 'Redis', 'PostgreSQL', 'RabbitMQ', 'Express', 'AWS'],
      complexity: 'Enterprise',
      features: ['Service discovery', 'Load balancing', 'Circuit breaker pattern', 'Distributed tracing', 'Event sourcing', 'Authentication service', 'Logging and monitoring'],
      learningOutcomes: ['Microservices patterns', 'Container orchestration', 'Distributed systems', 'Service mesh', 'Security implementation'],
      timeEstimate: '16-20 weeks'
    },
    {
      title: 'Data Analytics Pipeline',
      description: 'Build a complete data pipeline that collects, processes, and visualizes data from multiple sources. Include real-time processing and batch processing capabilities.',
      techStack: ['Python', 'Apache Kafka', 'Apache Spark', 'PostgreSQL', 'Redis', 'Docker', 'AWS'],
      complexity: 'Complex',
      features: ['Data ingestion', 'Real-time processing', 'Batch processing', 'Data visualization', 'Alerting system', 'Dashboard'],
      learningOutcomes: ['Data engineering', 'Stream processing', 'Batch processing', 'Data visualization', 'Pipeline optimization'],
      timeEstimate: '12-16 weeks'
    }
  ],
  'Fullstack': [
    {
      title: 'Social Media Analytics Platform',
      description: 'Build a comprehensive social media analytics tool with data visualization and reporting. Integrate with major social media APIs and provide actionable insights.',
      techStack: ['React', 'Node.js', 'Python', 'PostgreSQL', 'Redis', 'D3.js', 'AWS', 'Twitter API', 'Facebook API'],
      complexity: 'Complex',
      features: ['Social media API integration', 'Data processing pipeline', 'Interactive dashboards', 'Report generation', 'User management', 'Real-time updates'],
      learningOutcomes: ['Data processing', 'API integration', 'Data visualization', 'Scalable architecture', 'Real-time systems'],
      timeEstimate: '14-18 weeks'
    },
    {
      title: 'Task Management System with AI Features',
      description: 'Create a smart task management system with AI-powered features like automatic prioritization, deadline prediction, and team workload optimization.',
      techStack: ['React', 'Node.js', 'TensorFlow.js', 'PostgreSQL', 'Redis', 'Tailwind CSS'],
      complexity: 'Complex',
      features: ['Task creation and management', 'Team collaboration', 'AI-powered suggestions', 'Calendar integration', 'Reporting', 'Notifications'],
      learningOutcomes: ['AI integration', 'Fullstack development', 'User experience design', 'Performance optimization'],
      timeEstimate: '12-16 weeks'
    }
  ],
  'Mobile': [
    {
      title: 'Fitness Tracking Application',
      description: 'Develop a comprehensive fitness tracking app with workout planning, progress tracking, and social features. Include integration with wearable devices.',
      techStack: ['React Native', 'Firebase', 'Redux', 'HealthKit', 'Google Fit API'],
      complexity: 'Complex',
      features: ['Workout planning', 'Progress tracking', 'Social sharing', 'Wearable device integration', 'Nutrition logging', 'Goal setting'],
      learningOutcomes: ['Mobile development', 'API integration', 'State management', 'User experience design'],
      timeEstimate: '10-14 weeks'
    }
  ],
  'DevOps': [
    {
      title: 'CI/CD Pipeline Automation',
      description: 'Create a complete CI/CD automation system that handles testing, building, and deployment across multiple environments. Include monitoring and rollback capabilities.',
      techStack: ['Jenkins', 'Docker', 'Kubernetes', 'Terraform', 'Ansible', 'Prometheus', 'Grafana'],
      complexity: 'Enterprise',
      features: ['Automated testing', 'Multi-environment deployment', 'Infrastructure as code', 'Monitoring dashboard', 'Alerting system', 'Rollback mechanisms'],
      learningOutcomes: ['CI/CD implementation', 'Infrastructure as code', 'Monitoring and alerting', 'Automation scripting'],
      timeEstimate: '14-18 weeks'
    }
  ]
};

export const careerPaths: Record<string, CareerPath> = {
  'Frontend_Junior_to_Senior': {
    title: 'Frontend Developer: Junior to Senior',
    description: 'Advanced path focusing on React ecosystem, performance, and architecture',
    totalDuration: '18-24 months',
    skillsRequired: ['JavaScript', 'React', 'TypeScript', 'System Design', 'Leadership'],
    averageSalary: '$120k - $160k',
    phases: [
      {
        id: 1,
        title: 'Foundation Strengthening',
        description: 'Master advanced JavaScript and React patterns',
        duration: '6-8 months',
        items: []
      },
      {
        id: 2,
        title: 'Architecture & Performance',
        description: 'Learn system design and performance optimization',
        duration: '6-8 months',
        items: []
      },
      {
        id: 3,
        title: 'Leadership & Impact',
        description: 'Develop leadership skills and make architectural decisions',
        duration: '6-8 months',
        items: []
      }
    ]
  },
  'Fullstack_Mid_to_Lead': {
    title: 'Fullstack Developer: Mid to Tech Lead',
    description: 'Comprehensive path covering technical leadership and system architecture',
    totalDuration: '24-30 months',
    skillsRequired: ['System Design', 'Leadership', 'Architecture', 'Mentoring', 'Project Management'],
    averageSalary: '$150k - $220k',
    phases: [
      {
        id: 1,
        title: 'Technical Mastery',
        description: 'Deep dive into system design and architecture patterns',
        duration: '8-10 months',
        items: []
      },
      {
        id: 2,
        title: 'Leadership Development',
        description: 'Build team leadership and mentoring capabilities',
        duration: '8-10 months',
        items: []
      },
      {
        id: 3,
        title: 'Strategic Impact',
        description: 'Drive technical strategy and organizational impact',
        duration: '8-10 months',
        items: []
      }
    ]
  }
};

export const jobTitles = [
  'Frontend Developer',
  'Backend Developer',
  'Full Stack Developer',
  'Software Engineer',
  'React Developer',
  'Node.js Developer',
  'Python Developer',
  'Java Developer',
  'DevOps Engineer',
  'Data Scientist',
  'Product Manager',
  'UX/UI Designer',
  'Mobile Developer',
  'Machine Learning Engineer',
  'Site Reliability Engineer',
  'Technical Lead',
  'Engineering Manager',
  'Solutions Architect',
  'Principal Engineer',
  'Staff Engineer',
  'Senior Software Engineer',
  'Junior Developer',
  'Intern',
  'Student',
  'Career Changer'
];