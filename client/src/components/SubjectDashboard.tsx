import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Progress } from "@/components/ui/progress";
import { Badge } from "@/components/ui/badge";
import Navigation from "./Navigation";
import { BookOpen, Play, Trophy, Clock } from "lucide-react";

interface Subject {
  id: string;
  name: string;
  icon: string;
  progress: number;
  totalUnits: number;
  completedUnits: number;
  xpEarned: number;
  lastAccessed: string;
}

interface SubjectDashboardProps {
  grade: number;
  onSubjectSelect: (subject: Subject) => void;
  onBack: () => void;
}

export default function SubjectDashboard({ grade, onSubjectSelect, onBack }: SubjectDashboardProps) {
  const { t } = useLanguage();

  // Subject configuration by grade
  const getSubjectsForGrade = (grade: number): Subject[] => {
    const baseSubjects = [
      { id: "math", name: t("subject.math"), icon: "📊" },
      { id: "science", name: t("subject.science"), icon: "🔬" },
      { id: "english", name: t("subject.english"), icon: "📚" },
      { id: "social_science", name: t("subject.social_science"), icon: "🌍" }
    ];

    let subjects = [...baseSubjects];

    if (grade <= 8) {
      subjects.push({ id: "local_language", name: t("subject.local_language"), icon: "🗣️" });
    } else if (grade <= 10) {
      subjects.push(
        { id: "hindi", name: t("subject.hindi"), icon: "🇮🇳" },
        { id: "odia", name: t("subject.odia"), icon: "🏛️" }
      );
    } else {
      subjects = [
        { id: "math", name: t("subject.math"), icon: "📊" },
        { id: "physics", name: t("subject.physics"), icon: "⚛️" },
        { id: "chemistry", name: t("subject.chemistry"), icon: "🧪" },
        { id: "biology", name: t("subject.biology"), icon: "🧬" },
        { id: "english", name: t("subject.english"), icon: "📚" },
        { id: "social_studies", name: t("subject.social_studies"), icon: "🏛️" }
      ];
    }

    // Add mock progress data
    return subjects.map((subject, index) => ({
      ...subject,
      progress: Math.floor(Math.random() * 80) + 10,
      totalUnits: Math.floor(Math.random() * 8) + 4,
      completedUnits: Math.floor(Math.random() * 6) + 1,
      xpEarned: Math.floor(Math.random() * 500) + 100,
      lastAccessed: `${Math.floor(Math.random() * 7) + 1} days ago`
    }));
  };

  const subjects = getSubjectsForGrade(grade);

  const handleSubjectClick = (subject: Subject) => {
    console.log("Subject selected:", subject.name);
    onSubjectSelect(subject);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onBack={onBack} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {t("general.grade")} {grade} - Subjects
          </h1>
          <p className="text-muted-foreground">
            Choose a subject to continue your learning journey
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {subjects.map((subject) => (
            <Card 
              key={subject.id} 
              className="hover-elevate cursor-pointer transition-all duration-200 hover:scale-105"
              onClick={() => handleSubjectClick(subject)}
              data-testid={`card-subject-${subject.id}`}
            >
              <CardHeader className="pb-3">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <span className="text-2xl">{subject.icon}</span>
                    <div>
                      <h3 className="font-semibold text-card-foreground">{subject.name}</h3>
                      <Badge variant="secondary" className="text-xs">
                        {subject.completedUnits}/{subject.totalUnits} {t("general.units")}
                      </Badge>
                    </div>
                  </div>
                  <div className="text-right">
                    <p className="text-sm font-bold text-primary">{subject.xpEarned} XP</p>
                  </div>
                </div>
              </CardHeader>

              <CardContent className="space-y-4">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-muted-foreground">Progress</span>
                    <span className="font-medium">{subject.progress}%</span>
                  </div>
                  <Progress value={subject.progress} className="h-2" />
                </div>

                <div className="flex items-center justify-between text-sm">
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Clock className="w-4 h-4" />
                    <span>{subject.lastAccessed}</span>
                  </div>
                  <Button 
                    size="sm" 
                    variant="outline"
                    className="hover-elevate"
                    data-testid={`button-continue-${subject.id}`}
                  >
                    <Play className="w-3 h-3 mr-1" />
                    {t("action.continue")}
                  </Button>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="mt-8">
          <Card>
            <CardHeader>
              <h3 className="font-semibold flex items-center gap-2">
                <Trophy className="w-5 h-5 text-primary" />
                Your Progress Summary
              </h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {subjects.reduce((sum, s) => sum + s.xpEarned, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Total XP</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {subjects.reduce((sum, s) => sum + s.completedUnits, 0)}
                  </p>
                  <p className="text-sm text-muted-foreground">Units Completed</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">
                    {Math.floor(subjects.reduce((sum, s) => sum + s.progress, 0) / subjects.length)}%
                  </p>
                  <p className="text-sm text-muted-foreground">Avg Progress</p>
                </div>
                <div>
                  <p className="text-2xl font-bold text-primary">{subjects.length}</p>
                  <p className="text-sm text-muted-foreground">Active Subjects</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}