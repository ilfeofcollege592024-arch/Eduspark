import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import Navigation from "./Navigation";
import { Trophy, Clock, Star, BookOpen, Target } from "lucide-react";

interface SubjectProgress {
  id: string;
  name: string;
  icon: string;
  progress: number;
  xp: number;
  lessonsCompleted: number;
  totalLessons: number;
  lastAccessed: string;
  achievements: string[];
}

interface ProgressTrackerProps {
  onBack: () => void;
  onSubjectClick: (subjectId: string) => void;
}

export default function ProgressTracker({ onBack, onSubjectClick }: ProgressTrackerProps) {
  const { t } = useLanguage();
  const { user } = useAuth();

  // Mock progress data - in real app would come from API
  const subjectProgress: SubjectProgress[] = [
    {
      id: "math",
      name: t("subject.math"),
      icon: "📊",
      progress: 75,
      xp: 450,
      lessonsCompleted: 12,
      totalLessons: 16,
      lastAccessed: "2 hours ago",
      achievements: ["First Equation", "Algebra Master"]
    },
    {
      id: "science", 
      name: t("subject.science"),
      icon: "🔬",
      progress: 85,
      xp: 520,
      lessonsCompleted: 17,
      totalLessons: 20,
      lastAccessed: "1 day ago",
      achievements: ["Newton's Student", "Motion Expert", "Lab Star"]
    },
    {
      id: "english",
      name: t("subject.english"),
      icon: "📚",
      progress: 60,
      xp: 320,
      lessonsCompleted: 9,
      totalLessons: 15,
      lastAccessed: "3 days ago",
      achievements: ["Grammar Master"]
    },
    {
      id: "social_science",
      name: t("subject.social_science"),
      icon: "🌍",
      progress: 45,
      xp: 280,
      lessonsCompleted: 7,
      totalLessons: 18,
      lastAccessed: "5 days ago",
      achievements: ["History Buff"]
    }
  ];

  const totalXP = subjectProgress.reduce((sum, subject) => sum + subject.xp, 0);
  const avgProgress = Math.floor(subjectProgress.reduce((sum, subject) => sum + subject.progress, 0) / subjectProgress.length);

  const handleSubjectClick = (subjectId: string) => {
    console.log("Subject clicked from progress tracker:", subjectId);
    onSubjectClick(subjectId);
  };

  const handleResumeLesson = (subjectId: string) => {
    console.log("Resume lesson clicked for:", subjectId);
    onSubjectClick(subjectId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onBack={onBack} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {t("general.progress")} Tracker
          </h1>
          <p className="text-muted-foreground">
            Track your learning journey across all subjects
          </p>
        </div>

        {/* Overall Progress Summary */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-xl font-bold flex items-center gap-2">
              <Trophy className="w-5 h-5 text-primary" />
              Your Learning Summary
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{totalXP}</div>
                <div className="text-sm text-muted-foreground">Total XP</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">{avgProgress}%</div>
                <div className="text-sm text-muted-foreground">Avg Progress</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {subjectProgress.reduce((sum, s) => sum + s.lessonsCompleted, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Lessons Completed</div>
              </div>
              <div className="text-center">
                <div className="text-3xl font-bold text-primary mb-1">
                  {subjectProgress.reduce((sum, s) => sum + s.achievements.length, 0)}
                </div>
                <div className="text-sm text-muted-foreground">Achievements</div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Subject Progress Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {subjectProgress.map((subject) => (
            <Card 
              key={subject.id}
              className="hover-elevate cursor-pointer transition-all duration-200"
              onClick={() => handleSubjectClick(subject.id)}
              data-testid={`progress-card-${subject.id}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                      <h3 className="font-semibold">{subject.name}</h3>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Clock className="w-3 h-3" />
                        <span>{subject.lastAccessed}</span>
                      </div>
                    </div>
                  </div>
                  <div className="text-right">
                    <Badge variant="secondary">{subject.xp} XP</Badge>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                {/* Progress Bar */}
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-3" />
                </div>

                {/* Lesson Progress */}
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2 text-sm">
                    <BookOpen className="w-4 h-4 text-muted-foreground" />
                    <span>{subject.lessonsCompleted}/{subject.totalLessons} Lessons</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    onClick={(e) => {
                      e.stopPropagation();
                      handleResumeLesson(subject.id);
                    }}
                    data-testid={`button-resume-${subject.id}`}
                    className="hover-elevate"
                  >
                    Resume
                  </Button>
                </div>

                {/* Achievements */}
                {subject.achievements.length > 0 && (
                  <div>
                    <div className="flex items-center gap-2 mb-2">
                      <Star className="w-4 h-4 text-primary" />
                      <span className="text-sm font-medium">Recent Achievements</span>
                    </div>
                    <div className="flex flex-wrap gap-1">
                      {subject.achievements.slice(0, 3).map((achievement, index) => (
                        <Badge 
                          key={index} 
                          variant="outline" 
                          className="text-xs"
                          data-testid={`achievement-${subject.id}-${index}`}
                        >
                          {achievement}
                        </Badge>
                      ))}
                      {subject.achievements.length > 3 && (
                        <Badge variant="outline" className="text-xs">
                          +{subject.achievements.length - 3} more
                        </Badge>
                      )}
                    </div>
                  </div>
                )}
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Weekly Goals */}
        <Card className="mt-6">
          <CardHeader>
            <h3 className="font-semibold flex items-center gap-2">
              <Target className="w-5 h-5 text-primary" />
              This Week's Goals
            </h3>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              <div className="flex items-center justify-between p-3 rounded-lg bg-accent/20">
                <div>
                  <p className="font-medium">Complete 5 Math Lessons</p>
                  <p className="text-sm text-muted-foreground">3/5 completed</p>
                </div>
                <Progress value={60} className="w-24 h-2" />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-accent/20">
                <div>
                  <p className="font-medium">Earn 200 XP in Science</p>
                  <p className="text-sm text-muted-foreground">150/200 XP</p>
                </div>
                <Progress value={75} className="w-24 h-2" />
              </div>
              
              <div className="flex items-center justify-between p-3 rounded-lg bg-accent/20">
                <div>
                  <p className="font-medium">Play 2 Educational Games</p>
                  <p className="text-sm text-muted-foreground">1/2 completed</p>
                </div>
                <Progress value={50} className="w-24 h-2" />
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}