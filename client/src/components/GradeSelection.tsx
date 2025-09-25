import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import Navigation from "./Navigation";
import { GraduationCap } from "lucide-react";

interface GradeSelectionProps {
  onGradeSelect: (grade: number) => void;
}

export default function GradeSelection({ onGradeSelect }: GradeSelectionProps) {
  const { t } = useLanguage();
  const { user } = useAuth();

  const grades = [6, 7, 8, 9, 10, 11, 12];

  const handleGradeSelect = (grade: number) => {
    console.log("Grade selected:", grade);
    onGradeSelect(grade);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation showBack={false} />
      
      <div className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <div className="flex items-center justify-center mb-4">
            <div className="w-16 h-16 bg-primary rounded-xl flex items-center justify-center">
              <GraduationCap className="w-8 h-8 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Welcome, {user?.name}!
          </h1>
          <p className="text-muted-foreground">
            Select your grade to start learning
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-7 gap-4">
            {grades.map((grade) => (
              <Card 
                key={grade} 
                className="hover-elevate cursor-pointer transition-all duration-200 hover:scale-105"
                onClick={() => handleGradeSelect(grade)}
                data-testid={`card-grade-${grade}`}
              >
                <CardHeader className="text-center pb-2">
                  <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mx-auto mb-2">
                    <span className="text-2xl font-bold text-primary">{grade}</span>
                  </div>
                </CardHeader>
                <CardContent className="text-center pt-0">
                  <h3 className="font-semibold text-card-foreground">
                    {t("general.grade")} {grade}
                  </h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {grade <= 8 ? "Primary" : grade <= 10 ? "Secondary" : "Higher Secondary"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>

          <div className="mt-12 text-center">
            <Card className="max-w-md mx-auto">
              <CardContent className="p-6">
                <h3 className="font-semibold mb-2">Quick Stats</h3>
                <div className="grid grid-cols-2 gap-4 text-sm">
                  <div>
                    <p className="text-muted-foreground">Your XP</p>
                    <p className="font-bold text-primary">{user?.xp || 0}</p>
                  </div>
                  <div>
                    <p className="text-muted-foreground">Completed Lessons</p>
                    <p className="font-bold text-primary">24</p>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}