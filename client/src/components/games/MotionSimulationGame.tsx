import { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import Navigation from "../Navigation";
import { Play, RotateCcw, Trophy, Zap } from "lucide-react";

interface MotionSimulationGameProps {
  onBack: () => void;
}

export default function MotionSimulationGame({ onBack }: MotionSimulationGameProps) {
  const { t } = useLanguage();
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [xp, setXp] = useState(0);
  const [score, setScore] = useState(0);
  const [gameState, setGameState] = useState<"idle" | "running" | "completed">("idle");
  const [objectPosition, setObjectPosition] = useState({ x: 100, y: 200 });
  const [velocity, setVelocity] = useState({ x: 0, y: 0 });
  const [force, setForce] = useState({ x: 0, y: 0 });
  const [selectedLaw, setSelectedLaw] = useState<1 | 2 | 3>(1);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // Draw experiment area
    ctx.fillStyle = "#1a1a1a";
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Draw grid
    ctx.strokeStyle = "#333";
    ctx.lineWidth = 1;
    for (let i = 0; i < canvas.width; i += 20) {
      ctx.beginPath();
      ctx.moveTo(i, 0);
      ctx.lineTo(i, canvas.height);
      ctx.stroke();
    }
    for (let i = 0; i < canvas.height; i += 20) {
      ctx.beginPath();
      ctx.moveTo(0, i);
      ctx.lineTo(canvas.width, i);
      ctx.stroke();
    }

    // Draw object
    ctx.fillStyle = "#f59e0b"; // Gold color
    ctx.beginPath();
    ctx.arc(objectPosition.x, objectPosition.y, 15, 0, 2 * Math.PI);
    ctx.fill();

    // Draw velocity vector
    if (velocity.x !== 0 || velocity.y !== 0) {
      ctx.strokeStyle = "#3b82f6";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(objectPosition.x, objectPosition.y);
      ctx.lineTo(objectPosition.x + velocity.x * 3, objectPosition.y + velocity.y * 3);
      ctx.stroke();
      
      // Arrow head
      const angle = Math.atan2(velocity.y, velocity.x);
      ctx.beginPath();
      ctx.moveTo(objectPosition.x + velocity.x * 3, objectPosition.y + velocity.y * 3);
      ctx.lineTo(objectPosition.x + velocity.x * 3 - 10 * Math.cos(angle - Math.PI/6), 
                 objectPosition.y + velocity.y * 3 - 10 * Math.sin(angle - Math.PI/6));
      ctx.lineTo(objectPosition.x + velocity.x * 3 - 10 * Math.cos(angle + Math.PI/6), 
                 objectPosition.y + velocity.y * 3 - 10 * Math.sin(angle + Math.PI/6));
      ctx.closePath();
      ctx.fill();
    }

    // Draw force vector
    if (force.x !== 0 || force.y !== 0) {
      ctx.strokeStyle = "#ef4444";
      ctx.lineWidth = 3;
      ctx.beginPath();
      ctx.moveTo(objectPosition.x, objectPosition.y);
      ctx.lineTo(objectPosition.x + force.x * 2, objectPosition.y + force.y * 2);
      ctx.stroke();
    }
  }, [objectPosition, velocity, force]);

  const applyForce = (fx: number, fy: number) => {
    if (gameState !== "running") return;

    console.log("Applying force:", fx, fy);
    setForce({ x: fx, y: fy });

    // Apply Newton's laws based on selected law
    if (selectedLaw === 1) {
      // First law: object at rest stays at rest unless force is applied
      if (fx !== 0 || fy !== 0) {
        setVelocity({ x: fx * 0.1, y: fy * 0.1 });
        setScore(prev => prev + 10);
        setXp(prev => prev + 5);
      }
    } else if (selectedLaw === 2) {
      // Second law: F = ma
      const acceleration = { x: fx * 0.05, y: fy * 0.05 };
      setVelocity(prev => ({ 
        x: prev.x + acceleration.x, 
        y: prev.y + acceleration.y 
      }));
      setScore(prev => prev + 15);
      setXp(prev => prev + 8);
    } else if (selectedLaw === 3) {
      // Third law: for every action, there's an equal and opposite reaction
      setVelocity({ x: -fx * 0.08, y: -fy * 0.08 });
      setScore(prev => prev + 20);
      setXp(prev => prev + 10);
    }

    // Update position
    setTimeout(() => {
      setObjectPosition(prev => ({
        x: Math.max(15, Math.min(385, prev.x + velocity.x)),
        y: Math.max(15, Math.min(285, prev.y + velocity.y))
      }));
    }, 100);
  };

  const startGame = () => {
    console.log("Motion simulation game started");
    setGameState("running");
    setScore(0);
    setXp(0);
    setObjectPosition({ x: 200, y: 150 });
    setVelocity({ x: 0, y: 0 });
    setForce({ x: 0, y: 0 });
  };

  const resetGame = () => {
    console.log("Motion simulation game reset");
    setGameState("idle");
    setScore(0);
    setXp(0);
    setObjectPosition({ x: 200, y: 150 });
    setVelocity({ x: 0, y: 0 });
    setForce({ x: 0, y: 0 });
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onBack={onBack} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2">
            Motion Simulation Game
          </h1>
          <p className="text-muted-foreground">
            Grade 9 Science - Explore Newton's Laws of Motion
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {/* Theory Panel */}
          <div className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="font-semibold">Newton's Laws of Motion</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  <div 
                    className={`p-3 rounded-lg border cursor-pointer hover-elevate ${
                      selectedLaw === 1 ? 'bg-accent border-primary' : ''
                    }`}
                    onClick={() => setSelectedLaw(1)}
                    data-testid="law-1"
                  >
                    <h4 className="font-medium">First Law (Inertia)</h4>
                    <p className="text-sm text-muted-foreground">
                      An object at rest stays at rest unless acted upon by force
                    </p>
                  </div>
                  
                  <div 
                    className={`p-3 rounded-lg border cursor-pointer hover-elevate ${
                      selectedLaw === 2 ? 'bg-accent border-primary' : ''
                    }`}
                    onClick={() => setSelectedLaw(2)}
                    data-testid="law-2"
                  >
                    <h4 className="font-medium">Second Law (F = ma)</h4>
                    <p className="text-sm text-muted-foreground">
                      Force equals mass times acceleration
                    </p>
                  </div>
                  
                  <div 
                    className={`p-3 rounded-lg border cursor-pointer hover-elevate ${
                      selectedLaw === 3 ? 'bg-accent border-primary' : ''
                    }`}
                    onClick={() => setSelectedLaw(3)}
                    data-testid="law-3"
                  >
                    <h4 className="font-medium">Third Law (Action-Reaction)</h4>
                    <p className="text-sm text-muted-foreground">
                      For every action, there's an equal and opposite reaction
                    </p>
                  </div>
                </div>

                <div className="flex items-center justify-between pt-4 border-t">
                  <div className="flex items-center gap-4">
                    <Badge variant="secondary">
                      <Trophy className="w-3 h-3 mr-1" />
                      Score: {score}
                    </Badge>
                    <Badge variant="secondary">
                      <Zap className="w-3 h-3 mr-1" />
                      XP: {xp}
                    </Badge>
                  </div>
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Experiment Panel */}
          <div>
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <h3 className="font-semibold">Experiment Area</h3>
                  <div className="flex gap-2">
                    {gameState === "idle" && (
                      <Button 
                        onClick={startGame}
                        data-testid="button-start-game"
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
                        data-testid="button-reset-game"
                        className="hover-elevate"
                      >
                        <RotateCcw className="w-4 h-4 mr-2" />
                        Reset
                      </Button>
                    )}
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <canvas
                  ref={canvasRef}
                  width={400}
                  height={300}
                  className="border rounded-lg mb-4 cursor-crosshair"
                  onClick={(e) => {
                    if (gameState !== "running") return;
                    const rect = e.currentTarget.getBoundingClientRect();
                    const x = e.clientX - rect.left - objectPosition.x;
                    const y = e.clientY - rect.top - objectPosition.y;
                    applyForce(x * 0.1, y * 0.1);
                  }}
                  data-testid="game-canvas"
                />

                {gameState === "running" && (
                  <div className="grid grid-cols-2 gap-2">
                    <Button 
                      onClick={() => applyForce(50, 0)}
                      size="sm"
                      variant="outline"
                      data-testid="button-push-right"
                      className="hover-elevate"
                    >
                      Push Right →
                    </Button>
                    <Button 
                      onClick={() => applyForce(-50, 0)}
                      size="sm"
                      variant="outline"
                      data-testid="button-push-left"
                      className="hover-elevate"
                    >
                      ← Push Left
                    </Button>
                    <Button 
                      onClick={() => applyForce(0, -50)}
                      size="sm"
                      variant="outline"
                      data-testid="button-push-up"
                      className="hover-elevate"
                    >
                      ↑ Push Up
                    </Button>
                    <Button 
                      onClick={() => applyForce(0, 50)}
                      size="sm"
                      variant="outline"
                      data-testid="button-push-down"
                      className="hover-elevate"
                    >
                      ↓ Push Down
                    </Button>
                  </div>
                )}

                {gameState === "idle" && (
                  <p className="text-center text-muted-foreground">
                    Click "Start" to begin the experiment
                  </p>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
}