import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navigation from "../Navigation";
import { Play, RotateCcw, Trophy, Zap, CheckCircle } from "lucide-react";

interface Equation {
  id: string;
  equation: string;
  answer: number;
  solved: boolean;
  userAnswer: string;
}

interface AlgebraPuzzleGameProps {
  onBack: () => void;
}

export default function AlgebraPuzzleGame({ onBack }: AlgebraPuzzleGameProps) {
  const { t } = useLanguage();
  const [xp, setXp] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<"idle" | "running" | "completed">("idle");
  const [hiddenWord, setHiddenWord] = useState("");
  const [revealedLetters, setRevealedLetters] = useState<string>("");
  const [showHint, setShowHint] = useState(false);

  const [equations, setEquations] = useState<Equation[]>([
    { id: "eq1", equation: "2x + 5 = 13", answer: 4, solved: false, userAnswer: "" },
    { id: "eq2", equation: "3x - 7 = 8", answer: 5, solved: false, userAnswer: "" },
    { id: "eq3", equation: "4x + 2 = 18", answer: 4, solved: false, userAnswer: "" },
    { id: "eq4", equation: "x + 9 = 15", answer: 6, solved: false, userAnswer: "" },
    { id: "eq5", equation: "2x - 3 = 7", answer: 5, solved: false, userAnswer: "" },
    { id: "eq6", equation: "5x + 1 = 21", answer: 4, solved: false, userAnswer: "" }
  ]);

  const startGame = () => {
    console.log("Algebra puzzle game started");
    setGameState("running");
    setScore(0);
    setXp(0);
    setHiddenWord("ALGEBRA");
    setRevealedLetters("");
    setShowHint(false);
    
    // Reset equations
    const resetEquations = equations.map(eq => ({
      ...eq,
      solved: false,
      userAnswer: ""
    }));
    setEquations(resetEquations);
  };

  const resetGame = () => {
    console.log("Algebra puzzle game reset");
    setGameState("idle");
    setScore(0);
    setXp(0);
    setHiddenWord("");
    setRevealedLetters("");
    setShowHint(false);
    
    const resetEquations = equations.map(eq => ({
      ...eq,
      solved: false,
      userAnswer: ""
    }));
    setEquations(resetEquations);
  };

  const handleAnswerSubmit = (equationId: string, answer: string) => {
    const numAnswer = parseInt(answer);
    if (isNaN(numAnswer)) return;

    const equation = equations.find(eq => eq.id === equationId);
    if (!equation) return;

    console.log("Answer submitted:", equationId, numAnswer);

    if (numAnswer === equation.answer) {
      // Correct answer
      const updatedEquations = equations.map(eq => 
        eq.id === equationId 
          ? { ...eq, solved: true, userAnswer: answer }
          : eq
      );
      setEquations(updatedEquations);
      
      setScore(prev => prev + 20);
      setXp(prev => prev + 15);

      // Reveal a letter
      const solvedCount = updatedEquations.filter(eq => eq.solved).length;
      if (solvedCount <= hiddenWord.length) {
        setRevealedLetters(hiddenWord.substring(0, solvedCount));
      }

      // Check if puzzle is complete
      if (updatedEquations.every(eq => eq.solved)) {
        setGameState("completed");
        setXp(prev => prev + 50); // Bonus XP for completion
        setRevealedLetters(hiddenWord);
        console.log("Puzzle completed!");
      }
    } else {
      // Wrong answer - show hint
      setShowHint(true);
      setTimeout(() => setShowHint(false), 3000);
      console.log("Wrong answer for:", equationId);
    }
  };

  const getDisplayWord = () => {
    return hiddenWord
      .split("")
      .map((letter, index) => 
        index < revealedLetters.length ? letter : "_"
      )
      .join(" ");
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onBack={onBack} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Algebra Puzzle Game
          </h1>
          <p className="text-muted-foreground">
            Grade 9 Mathematics - Solve equations to reveal the hidden word
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Game Controls */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Game Status</h3>
                  <div className="flex gap-2">
                    {gameState === "idle" && (
                      <Button 
                        onClick={startGame}
                        data-testid="button-start-algebra-game"
                        className="hover-elevate"
                      >
                        <Play className="w-4 h-4 mr-2" />
                        {t("action.start")}
                      </Button>
                    )}
                    {gameState !== "idle" && (
                      <Button 
                        onClick={resetGame}
                        variant="outline"
                        data-testid="button-reset-algebra-game"
                        className="hover-elevate"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="flex items-center justify-between">
                  <Badge variant="secondary">
                    <Trophy className="w-3 h-3 mr-1" />
                    Score: {score}
                  </Badge>
                  <Badge variant="secondary">
                    <Zap className="w-3 h-3 mr-1" />
                    XP: {xp}
                  </Badge>
                </div>

                {gameState !== "idle" && (
                  <div>
                    <h4 className="font-medium mb-2">Hidden Word:</h4>
                    <div className="text-center text-2xl font-mono font-bold text-primary bg-accent/20 p-4 rounded-lg">
                      {getDisplayWord() || "_ _ _ _ _ _ _"}
                    </div>
                  </div>
                )}

                {gameState === "completed" && (
                  <Alert>
                    <CheckCircle className="w-4 h-4" />
                    <AlertDescription>
                      🎉 Congratulations! You've solved all equations and revealed: <strong>{hiddenWord}</strong>
                    </AlertDescription>
                  </Alert>
                )}

                {showHint && (
                  <Alert>
                    <AlertDescription>
                      💡 Hint: Check your calculation. Remember to isolate x by performing the same operation on both sides.
                    </AlertDescription>
                  </Alert>
                )}
              </CardContent>
            </Card>
          </div>

          {/* Equation Grid */}
          <div className="lg:col-span-2">
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Linear Equations to Solve</h3>
                <p className="text-sm text-muted-foreground">
                  Solve each equation to find the value of x. Each correct answer reveals a letter!
                </p>
              </CardHeader>
              <CardContent>
                {gameState === "idle" ? (
                  <div className="flex items-center justify-center h-64 text-center text-muted-foreground">
                    <div>
                      <Play className="w-12 h-12 mx-auto mb-4 opacity-50" />
                      <p>Click "Start" to begin the algebra puzzle</p>
                    </div>
                  </div>
                ) : (
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    {equations.map((equation, index) => (
                      <div
                        key={equation.id}
                        className={`p-4 rounded-lg border ${
                          equation.solved 
                            ? 'bg-primary/5 border-primary' 
                            : 'bg-accent/20 border-border'
                        }`}
                        data-testid={`equation-${equation.id}`}
                      >
                        <div className="flex items-center justify-between mb-3">
                          <span className="text-lg font-mono font-semibold">
                            {equation.equation}
                          </span>
                          {equation.solved && (
                            <CheckCircle className="w-5 h-5 text-primary" />
                          )}
                        </div>
                        
                        <div className="flex items-center gap-2">
                          <span className="text-sm">x = </span>
                          <Input
                            type="number"
                            value={equation.userAnswer}
                            onChange={(e) => {
                              const updatedEquations = equations.map(eq =>
                                eq.id === equation.id 
                                  ? { ...eq, userAnswer: e.target.value }
                                  : eq
                              );
                              setEquations(updatedEquations);
                            }}
                            onKeyPress={(e) => {
                              if (e.key === "Enter") {
                                handleAnswerSubmit(equation.id, equation.userAnswer);
                              }
                            }}
                            disabled={equation.solved || gameState === "completed"}
                            className="flex-1"
                            data-testid={`input-answer-${equation.id}`}
                          />
                          <Button
                            size="sm"
                            onClick={() => handleAnswerSubmit(equation.id, equation.userAnswer)}
                            disabled={equation.solved || !equation.userAnswer || gameState === "completed"}
                            data-testid={`button-submit-${equation.id}`}
                            className="hover-elevate"
                          >
                            Submit
                          </Button>
                        </div>
                        
                        {equation.solved && (
                          <p className="text-xs text-primary mt-2">
                            ✓ Correct! Letter {index + 1} revealed
                          </p>
                        )}
                      </div>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}