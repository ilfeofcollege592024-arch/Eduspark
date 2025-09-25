import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navigation from "./Navigation";
import { BookOpen, Play, CheckCircle, Clock, Award } from "lucide-react";

interface Lesson {
  id: string;
  title: string;
  content: string;
  hasGame: boolean;
  xpReward: number;
  estimatedTime: number;
  completed: boolean;
}

interface LessonPageProps {
  subject: { id: string; name: string; };
  grade: number;
  onBack: () => void;
  onPlayGame: (gameType: string) => void;
}

export default function LessonPage({ subject, grade, onBack, onPlayGame }: LessonPageProps) {
  const { t } = useLanguage();
  const [selectedLesson, setSelectedLesson] = useState<Lesson | null>(null);
  const [gameNotification, setGameNotification] = useState(false);

  // Mock lesson data - in real app, this would come from API
  const lessons: Lesson[] = [
    {
      id: "lesson-1",
      title: grade === 9 && subject.id === "science" ? "Newton's Laws of Motion" : "Introduction to " + subject.name,
      content: grade === 9 && subject.id === "science" 
        ? "Newton's three laws of motion describe the relationship between forces acting on a body and its motion. The first law states that an object at rest stays at rest and an object in motion stays in motion unless acted upon by a force..."
        : "This lesson introduces fundamental concepts in " + subject.name + ". You'll learn the basic principles and key terms that form the foundation of this subject.",
      hasGame: grade === 9 && (subject.id === "science" || subject.id === "math"),
      xpReward: 50,
      estimatedTime: 15,
      completed: false
    },
    {
      id: "lesson-2", 
      title: grade === 9 && subject.id === "math" ? "Solving Linear Equations" : "Advanced " + subject.name,
      content: grade === 9 && subject.id === "math"
        ? "Linear equations are equations where the variable appears only to the first power. In this lesson, we'll learn various methods to solve them including substitution and elimination..."
        : "Building on the basics, this lesson explores more complex topics in " + subject.name + " with practical applications and examples.",
      hasGame: grade === 9 && subject.id === "math",
      xpReward: 75,
      estimatedTime: 20,
      completed: false
    },
    {
      id: "lesson-3",
      title: "Practical Applications",
      content: "Learn how to apply " + subject.name + " concepts in real-world scenarios. This lesson includes case studies and practical exercises.",
      hasGame: false,
      xpReward: 60,
      estimatedTime: 18,
      completed: true
    }
  ];

  const handleLessonSelect = (lesson: Lesson) => {
    console.log("Lesson selected:", lesson.title);
    setSelectedLesson(lesson);
  };

  const handlePlayGame = () => {
    if (!selectedLesson) return;

    if (selectedLesson.hasGame) {
      let gameType = "";
      if (grade === 9 && subject.id === "science") {
        gameType = "motion-simulation";
      } else if (grade === 9 && subject.id === "math") {
        gameType = "algebra-puzzle";
      }
      
      console.log("Starting game:", gameType);
      onPlayGame(gameType);
    } else {
      setGameNotification(true);
      setTimeout(() => setGameNotification(false), 3000);
    }
  };

  const handleCompleteLesson = () => {
    if (selectedLesson) {
      console.log("Lesson completed:", selectedLesson.title);
      // In real app, would update progress and award XP
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onBack={onBack} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            {subject.name} - {t("general.lessons")}
          </h1>
          <p className="text-muted-foreground">
            Grade {grade} • Choose a lesson to begin
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Lesson List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <h3 className="font-semibold flex items-center gap-2">
                  <BookOpen className="w-5 h-5" />
                  Available Lessons
                </h3>
              </CardHeader>
              <CardContent className="space-y-3">
                {lessons.map((lesson) => (
                  <div
                    key={lesson.id}
                    className={`p-3 rounded-lg border cursor-pointer hover-elevate transition-all ${
                      selectedLesson?.id === lesson.id ? 'bg-accent border-primary' : 'hover:bg-accent/50'
                    }`}
                    onClick={() => handleLessonSelect(lesson)}
                    data-testid={`lesson-${lesson.id}`}
                  >
                    <div className="flex items-center justify-between mb-2">
                      <h4 className="font-medium text-sm">{lesson.title}</h4>
                      {lesson.completed && (
                        <CheckCircle className="w-4 h-4 text-primary" />
                      )}
                    </div>
                    <div className="flex items-center gap-2 text-xs text-muted-foreground">
                      <Clock className="w-3 h-3" />
                      <span>{lesson.estimatedTime} min</span>
                      <Award className="w-3 h-3" />
                      <span>{lesson.xpReward} XP</span>
                      {lesson.hasGame && (
                        <Badge variant="secondary" className="text-xs">Game</Badge>
                      )}
                    </div>
                  </div>
                ))}
              </CardContent>
            </Card>
          </div>

          {/* Lesson Content */}
          <div className="lg:col-span-2">
            {selectedLesson ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <h2 className="text-xl font-bold">{selectedLesson.title}</h2>
                    <div className="flex items-center gap-2">
                      <Badge variant="outline">
                        {selectedLesson.estimatedTime} minutes
                      </Badge>
                      <Badge variant="secondary">
                        {selectedLesson.xpReward} XP
                      </Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-card-foreground leading-relaxed">
                      {selectedLesson.content}
                    </p>
                  </div>

                  {gameNotification && (
                    <Alert>
                      <AlertDescription>
                        {t("msg.game_not_available")}
                      </AlertDescription>
                    </Alert>
                  )}

                  <div className="flex gap-3">
                    <Button
                      onClick={handlePlayGame}
                      className="hover-elevate active-elevate-2"
                      data-testid="button-play-game"
                    >
                      <Play className="w-4 h-4 mr-2" />
                      {t("action.learn_game")}
                    </Button>

                    {!selectedLesson.completed && (
                      <Button
                        variant="outline"
                        onClick={handleCompleteLesson}
                        className="hover-elevate"
                        data-testid="button-complete-lesson"
                      >
                        <CheckCircle className="w-4 h-4 mr-2" />
                        Mark Complete
                      </Button>
                    )}
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-64">
                  <div className="text-center text-muted-foreground">
                    <BookOpen className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a lesson from the left to begin learning</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}