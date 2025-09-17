import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Progress } from "@/components/ui/progress";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { CheckCircle, Target, TrendingUp, Brain, Sparkles, Plus, Trash2 } from "lucide-react";
import { CurrentProfile, TargetRole, RoadmapItem, SkillGap } from "@/types/career";
import { RoadmapGenerator } from "@/utils/roadmapGenerator";
import { jobTitles } from "@/data/careerPaths";
import RoadmapStep from "@/components/RoadmapStep";
import SkillGapAnalysis from "@/components/SkillGapAnalysis";

// Define a type for skill experience
interface SkillExperience {
  skill: string;
  experience: 'Beginner' | 'Intermediate' | 'Advanced' | 'Expert';
}

const CareerPathMapper = () => {
  const [currentJob, setCurrentJob] = useState("");
  const [experience, setExperience] = useState("");
  const [targetRole, setTargetRole] = useState("");
  const [targetLevel, setTargetLevel] = useState<'Junior' | 'Mid' | 'Senior' | 'Lead' | 'Principal' | 'Staff'>('Senior');
  const [targetDomain, setTargetDomain] = useState<'Frontend' | 'Backend' | 'Fullstack' | 'Mobile' | 'DevOps' | 'Data' | 'ML' | 'Management'>('Fullstack');
  const [currentSkills, setCurrentSkills] = useState<SkillExperience[]>([{ skill: "", experience: "Beginner" }]);
  const [careerGoals, setCareerGoals] = useState("");
  const [learningStyle, setLearningStyle] = useState("");
  const [timeCommitment, setTimeCommitment] = useState("");
  
  const [roadmap, setRoadmap] = useState<RoadmapItem[]>([]);
  const [skillGaps, setSkillGaps] = useState<SkillGap[]>([]);
  const [isGenerating, setIsGenerating] = useState(false);
  const [aiPrompt, setAiPrompt] = useState("");

  // Function to add a new skill input
  const addSkill = () => {
    setCurrentSkills([...currentSkills, { skill: "", experience: "Beginner" }]);
  };

  // Function to update a skill
  const updateSkill = (index: number, field: keyof SkillExperience, value: string) => {
    const updatedSkills = [...currentSkills];
    updatedSkills[index] = { ...updatedSkills[index], [field]: value };
    setCurrentSkills(updatedSkills);
  };

  // Function to remove a skill
  const removeSkill = (index: number) => {
    if (currentSkills.length > 1) {
      const updatedSkills = currentSkills.filter((_, i) => i !== index);
      setCurrentSkills(updatedSkills);
    }
  };

  const generateRoadmap = async () => {
    // Check if we have at least one skill filled
    const hasSkills = currentSkills.some(s => s.skill.trim() !== "");
    if (!hasSkills || !currentJob || !targetRole || !experience) {
      return;
    }

    setIsGenerating(true);
    
    // Simulate AI processing time
    await new Promise(resolve => setTimeout(resolve, 3000));
    
    try {
      // Convert skill experiences to comma-separated string for the generator
      const skillsString = currentSkills
        .filter(s => s.skill.trim() !== "")
        .map(s => `${s.skill} (${s.experience})`)
        .join(", ");

      const currentProfile: CurrentProfile = {
        skills: skillsString.split(',').map(s => s.trim()).filter(s => s.length > 0),
        currentJob,
        experience,
        specializations: []
      };

      const target: TargetRole = {
        title: targetRole,
        level: targetLevel,
        domain: targetDomain
      };

      const generator = new RoadmapGenerator(currentProfile, target);
      
      // Generate the AI prompt
      const prompt = generator.generateAIPrompt();
      setAiPrompt(prompt);
      
      // Generate the roadmap
      const generatedRoadmap = generator.generateRoadmap();
      const gaps = generator.analyzeSkillGaps();
      
      setRoadmap(generatedRoadmap);
      setSkillGaps(gaps);
    } catch (error) {
      console.error('Error generating roadmap:', error);
    } finally {
      setIsGenerating(false);
    }
  };

  // We'll keep the progress calculation for display purposes
  const completedSteps = 0; // Since we removed the completion functionality
  const progress = 0; // Since we removed the completion functionality

  const phases = roadmap.reduce((acc, item) => {
    if (!acc[item.phase]) acc[item.phase] = [];
    acc[item.phase].push(item);
    return acc;
  }, {} as Record<number, RoadmapItem[]>);

  // Define phase goals and focus areas
  const phaseDetails = {
    1: {
      goal: "Foundation Building",
      focus: "Establish core skills and knowledge required for your target role"
    },
    2: {
      goal: "Skill Development",
      focus: "Deepen expertise in key areas and build practical projects"
    },
    3: {
      goal: "Advanced Mastery",
      focus: "Develop leadership capabilities and specialized knowledge"
    },
    4: {
      goal: "Real-World Application",
      focus: "Gain practical experience and establish industry presence"
    }
  };

  return (
    <div className="min-h-screen bg-gradient-hero">
      <div className="container mx-auto px-4 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center gap-3 mb-4">
            <Brain className="h-8 w-8 text-white" />
            <h1 className="text-4xl md:text-6xl font-bold text-white">
              AI Career Path Mapper
            </h1>
            <Sparkles className="h-8 w-8 text-white" />
          </div>
          <p className="text-xl text-white/80 max-w-3xl mx-auto">
            Get a personalized, AI-powered roadmap from your current position to your dream role. 
            Complete with projects, courses, and resources tailored to your specific career path.
          </p>
        </div>

        {/* Enhanced Input Form */}
        <Card className="max-w-4xl mx-auto mb-8 shadow-elegant border-0 bg-white/95 backdrop-blur">
          <CardHeader>
            <CardTitle className="flex items-center gap-2">
              <Target className="h-5 w-5 text-primary" />
              Career Path Generator
            </CardTitle>
            <CardDescription>
              Provide detailed information about your current situation and career goals for a personalized AI-generated roadmap
            </CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="current-job">Current Job Title</Label>
                <Select value={currentJob} onValueChange={setCurrentJob}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your current role" />
                  </SelectTrigger>
                  <SelectContent>
                    {jobTitles.map((job) => (
                      <SelectItem key={job} value={job}>
                        {job}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="experience">Years of Experience</Label>
                <Input
                  id="experience"
                  placeholder="e.g., 2 years, 6 months, etc."
                  value={experience}
                  onChange={(e) => setExperience(e.target.value)}
                />
              </div>
            </div>

            {/* Skills Section */}
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <Label>Your Current Skills & Experience *</Label>
                <Button type="button" variant="outline" size="sm" onClick={addSkill} className="flex items-center gap-1">
                  <Plus className="h-4 w-4" />
                  Add Skill
                </Button>
              </div>
              
              <div className="space-y-3">
                {currentSkills.map((skillEntry, index) => (
                  <div key={index} className="grid grid-cols-1 md:grid-cols-12 gap-3 items-end">
                    <div className="md:col-span-7">
                      <Input
                        placeholder="e.g., JavaScript, React, Node.js"
                        value={skillEntry.skill}
                        onChange={(e) => updateSkill(index, 'skill', e.target.value)}
                      />
                    </div>
                    <div className="md:col-span-4">
                      <Select 
                        value={skillEntry.experience} 
                        onValueChange={(value: any) => updateSkill(index, 'experience', value)}
                      >
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="Beginner">Beginner (0-1 years)</SelectItem>
                          <SelectItem value="Intermediate">Intermediate (1-3 years)</SelectItem>
                          <SelectItem value="Advanced">Advanced (3-5 years)</SelectItem>
                          <SelectItem value="Expert">Expert (5+ years)</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                    <div className="md:col-span-1">
                      {currentSkills.length > 1 && (
                        <Button 
                          type="button" 
                          variant="outline" 
                          size="icon"
                          onClick={() => removeSkill(index)}
                        >
                          <Trash2 className="h-4 w-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <p className="text-xs text-muted-foreground">
                List your current skills and rate your experience level. The more accurate you are, the better your roadmap will be.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="target-role">Target Job Title *</Label>
                <Input
                  id="target-role"
                  placeholder="e.g., Senior Frontend Developer"
                  value={targetRole}
                  onChange={(e) => setTargetRole(e.target.value)}
                />
              </div>
              
              <div className="space-y-2">
                <Label htmlFor="target-level">Target Level *</Label>
                <Select value={targetLevel} onValueChange={(value: any) => setTargetLevel(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Junior">Junior</SelectItem>
                    <SelectItem value="Mid">Mid-Level</SelectItem>
                    <SelectItem value="Senior">Senior</SelectItem>
                    <SelectItem value="Lead">Tech Lead</SelectItem>
                    <SelectItem value="Principal">Principal</SelectItem>
                    <SelectItem value="Staff">Staff</SelectItem>
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-2">
                <Label htmlFor="target-domain">Domain Focus *</Label>
                <Select value={targetDomain} onValueChange={(value: any) => setTargetDomain(value)}>
                  <SelectTrigger>
                    <SelectValue />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="Frontend">Frontend</SelectItem>
                    <SelectItem value="Backend">Backend</SelectItem>
                    <SelectItem value="Fullstack">Full Stack</SelectItem>
                    <SelectItem value="Mobile">Mobile</SelectItem>
                    <SelectItem value="DevOps">DevOps</SelectItem>
                    <SelectItem value="Data">Data Engineering</SelectItem>
                    <SelectItem value="ML">Machine Learning</SelectItem>
                    <SelectItem value="Management">Engineering Management</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            {/* Career Goals */}
            <div className="space-y-2">
              <Label htmlFor="career-goals">Career Goals & Aspirations</Label>
              <Textarea
                id="career-goals"
                placeholder="What are your long-term career goals? What kind of impact do you want to make? (Optional but helpful)"
                value={careerGoals}
                onChange={(e) => setCareerGoals(e.target.value)}
                className="min-h-[80px]"
              />
            </div>

            {/* Learning Preferences */}
            <div className="grid md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label>Preferred Learning Style</Label>
                <Select value={learningStyle} onValueChange={setLearningStyle}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your preference" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="hands-on">Hands-on Projects</SelectItem>
                    <SelectItem value="courses">Structured Courses</SelectItem>
                    <SelectItem value="books">Books & Documentation</SelectItem>
                    <SelectItem value="mentoring">Mentoring & Coaching</SelectItem>
                    <SelectItem value="mixed">Mixed Approach</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              
              <div className="space-y-2">
                <Label>Time Commitment</Label>
                <Select value={timeCommitment} onValueChange={setTimeCommitment}>
                  <SelectTrigger>
                    <SelectValue placeholder="Select your availability" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="5">5 hrs/week</SelectItem>
                    <SelectItem value="10">10 hrs/week</SelectItem>
                    <SelectItem value="15">15 hrs/week</SelectItem>
                    <SelectItem value="20">20+ hrs/week</SelectItem>
                  </SelectContent>
                </Select>
              </div>
            </div>

            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
              <h3 className="font-medium text-blue-800 flex items-center gap-2">
                <Brain className="h-5 w-5" />
                How It Works
              </h3>
              <p className="text-sm text-blue-700 mt-2">
                Our AI analyzes your current skills and experience to generate a personalized roadmap with:
              </p>
              <ul className="text-sm text-blue-700 mt-2 grid grid-cols-1 md:grid-cols-2 gap-1">
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Skill gap analysis
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Personalized learning path
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Project recommendations
                </li>
                <li className="flex items-center gap-2">
                  <CheckCircle className="h-4 w-4 text-blue-600" />
                  Resource suggestions
                </li>
              </ul>
            </div>

            <Button 
              onClick={generateRoadmap}
              disabled={!currentSkills.some(s => s.skill.trim() !== "") || !currentJob || !targetRole || !experience || isGenerating}
              variant="gradient"
              size="lg"
              className="w-full"
            >
              {isGenerating ? (
                <div className="flex items-center gap-2">
                  <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
                  AI is analyzing your profile & generating roadmap...
                </div>
              ) : (
                "🚀 Generate My Personalized Career Roadmap"
              )}
            </Button>
          </CardContent>
        </Card>

        {/* AI Prompt Display */}
        {aiPrompt && (
          <Card className="max-w-4xl mx-auto mb-8 shadow-card border-0 bg-white/95 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Brain className="h-5 w-5 text-primary" />
                AI Prompt for Roadmap Generation
              </CardTitle>
              <CardDescription>
                This is the prompt that would be sent to an AI model to generate your personalized roadmap
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="bg-muted p-4 rounded-lg">
                <pre className="text-sm whitespace-pre-wrap">{aiPrompt}</pre>
              </div>
              <p className="text-sm text-muted-foreground mt-2">
                You can copy this prompt and use it with any AI model to get a more detailed, customized roadmap.
              </p>
            </CardContent>
          </Card>
        )}

        {/* Skill Gap Analysis */}
        {skillGaps.length > 0 && (
          <div className="max-w-4xl mx-auto mb-8">
            <SkillGapAnalysis skillGaps={skillGaps} />
          </div>
        )}

        {/* Progress Overview */}
        {roadmap.length > 0 && (
          <Card className="max-w-4xl mx-auto mb-8 shadow-card border-0 bg-white/95 backdrop-blur">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="h-5 w-5 text-success" />
                Your Career Roadmap Overview
              </CardTitle>
              <CardDescription>
                From {currentJob} to {targetRole} • {roadmap.length} actionable steps across 4 phases
              </CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {Object.entries(phases).map(([phaseNum, items]) => {
                    const phaseNumInt = parseInt(phaseNum);
                    return (
                      <div key={phaseNum} className="text-center p-3 bg-muted/50 rounded-lg">
                        <div className="text-lg font-bold text-primary">Phase {phaseNum}</div>
                        <div className="text-sm text-muted-foreground mt-1">
                          {items.length} items
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </CardContent>
          </Card>
        )}

        {/* Detailed Roadmap by Phases */}
        {roadmap.length > 0 && (
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-white mb-2">
                Your Personalized Career Roadmap
              </h2>
              <p className="text-white/80">
                From {currentJob} to {targetRole} • {roadmap.length} actionable steps
              </p>
            </div>

            {Object.entries(phases).map(([phaseNum, items]) => {
              const phaseNumInt = parseInt(phaseNum);
              const phaseInfo = phaseDetails[phaseNumInt as keyof typeof phaseDetails] || { goal: "Phase Goal", focus: "Focus Area" };
              
              return (
                <div key={phaseNum} className="mb-12">
                  <div className="flex flex-col md:flex-row md:items-center gap-4 mb-6 p-6 bg-white/10 backdrop-blur rounded-xl">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-2xl">
                      {phaseNum}
                    </div>
                    <div className="flex-1">
                      <h3 className="text-2xl font-bold text-white">
                        Phase {phaseNum}: {phaseInfo.goal}
                      </h3>
                      <p className="text-white/80 mt-1">
                        {phaseInfo.focus}
                      </p>
                      <div className="flex items-center gap-4 mt-2 text-sm text-white/70">
                        <span>{items.length} items</span>
                        <span>•</span>
                        <span>Est. {Math.ceil(items.reduce((acc, item) => acc + item.estimatedHours, 0) / 40)} weeks</span>
                      </div>
                    </div>
                  </div>
                  
                  <div className="space-y-6">
                    {items.map((item, index) => (
                      <RoadmapStep
                        key={item.id}
                        item={item}
                        stepNumber={index + 1}
                        // Removed onToggleComplete prop since we're removing the functionality
                      />
                    ))}
                  </div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export default CareerPathMapper;