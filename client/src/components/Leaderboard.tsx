import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Navigation from "./Navigation";
import { Trophy, Medal, Award, Star, Crown } from "lucide-react";

interface LeaderboardEntry {
  id: string;
  name: string;
  xp: number;
  rank: number;
  avatar?: string;
  grade: number;
  completedLessons: number;
  achievements: number;
  isCurrentUser?: boolean;
}

interface LeaderboardProps {
  onBack: () => void;
  onUserClick: (userId: string) => void;
}

export default function Leaderboard({ onBack, onUserClick }: LeaderboardProps) {
  const { t } = useLanguage();
  const { user } = useAuth();

  // Mock leaderboard data - in real app would come from API
  const leaderboardData: LeaderboardEntry[] = [
    {
      id: "1",
      name: "Priya Sharma",
      xp: 2450,
      rank: 1,
      grade: 9,
      completedLessons: 48,
      achievements: 12,
      isCurrentUser: false
    },
    {
      id: "2", 
      name: "Arjun Patel",
      xp: 2180,
      rank: 2,
      grade: 9,
      completedLessons: 42,
      achievements: 9,
      isCurrentUser: false
    },
    {
      id: "3",
      name: "Kavya Singh",
      xp: 1950,
      rank: 3,
      grade: 9,
      completedLessons: 39,
      achievements: 8,
      isCurrentUser: false
    },
    {
      id: user?.id || "current",
      name: user?.name || "You",
      xp: user?.xp || 1250,
      rank: 7,
      grade: 9,
      completedLessons: 24,
      achievements: 5,
      isCurrentUser: true
    },
    {
      id: "4",
      name: "Rahul Kumar",
      xp: 1850,
      rank: 4,
      grade: 9,
      completedLessons: 37,
      achievements: 7,
      isCurrentUser: false
    },
    {
      id: "5",
      name: "Sneha Reddy",
      xp: 1720,
      rank: 5,
      grade: 9,
      completedLessons: 35,
      achievements: 6,
      isCurrentUser: false
    },
    {
      id: "6",
      name: "Vikram Joshi",
      xp: 1680,
      rank: 6,
      grade: 9,
      completedLessons: 33,
      achievements: 6,
      isCurrentUser: false
    },
    {
      id: "8",
      name: "Anaya Gupta",
      xp: 1150,
      rank: 8,
      grade: 9,
      completedLessons: 22,
      achievements: 4,
      isCurrentUser: false
    },
    {
      id: "9",
      name: "Rohan Das",
      xp: 1020,
      rank: 9,
      grade: 9,
      completedLessons: 20,
      achievements: 4,
      isCurrentUser: false
    },
    {
      id: "10",
      name: "Meera Shah",
      xp: 980,
      rank: 10,
      grade: 9,
      completedLessons: 19,
      achievements: 3,
      isCurrentUser: false
    }
  ].sort((a, b) => b.xp - a.xp);

  const getRankIcon = (rank: number) => {
    switch (rank) {
      case 1: return <Crown className="w-5 h-5 text-yellow-500" />;
      case 2: return <Medal className="w-5 h-5 text-gray-400" />;
      case 3: return <Award className="w-5 h-5 text-amber-600" />;
      default: return <span className="w-5 h-5 flex items-center justify-center text-sm font-bold">{rank}</span>;
    }
  };

  const getRankColor = (rank: number) => {
    switch (rank) {
      case 1: return "bg-gradient-to-r from-yellow-400 to-yellow-600";
      case 2: return "bg-gradient-to-r from-gray-300 to-gray-500"; 
      case 3: return "bg-gradient-to-r from-amber-400 to-amber-600";
      default: return "bg-gradient-to-r from-accent/50 to-accent";
    }
  };

  const handleUserClick = (userId: string) => {
    console.log("User clicked on leaderboard:", userId);
    onUserClick(userId);
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onBack={onBack} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Trophy className="w-6 h-6 text-primary" />
            {t("general.leaderboard")}
          </h1>
          <p className="text-muted-foreground">
            Top performers in Grade 9 • Compete with your classmates!
          </p>
        </div>

        {/* Top 3 Podium */}
        <Card className="mb-6">
          <CardHeader>
            <h2 className="text-lg font-semibold flex items-center gap-2">
              <Star className="w-5 h-5 text-primary" />
              Top Performers
            </h2>
          </CardHeader>
          <CardContent>
            <div className="grid grid-cols-3 gap-4">
              {leaderboardData.slice(0, 3).map((entry, index) => (
                <div 
                  key={entry.id}
                  className={`text-center p-4 rounded-lg cursor-pointer hover-elevate transition-all ${getRankColor(entry.rank)}`}
                  onClick={() => handleUserClick(entry.id)}
                  data-testid={`podium-${entry.rank}`}
                >
                  <div className="mb-3">
                    {getRankIcon(entry.rank)}
                  </div>
                  <Avatar className="mx-auto mb-2">
                    <AvatarFallback className="bg-white text-black font-bold">
                      {entry.name.split(" ").map(n => n[0]).join("")}
                    </AvatarFallback>
                  </Avatar>
                  <h3 className="font-semibold text-white text-sm">{entry.name}</h3>
                  <p className="text-white/90 text-xs">{entry.xp} XP</p>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Full Leaderboard */}
        <Card>
          <CardHeader>
            <h2 className="text-lg font-semibold">Complete Rankings</h2>
          </CardHeader>
          <CardContent>
            <div className="space-y-2">
              {leaderboardData.map((entry) => (
                <div
                  key={entry.id}
                  className={`p-4 rounded-lg border cursor-pointer hover-elevate transition-all ${
                    entry.isCurrentUser 
                      ? 'bg-primary/5 border-primary' 
                      : 'hover:bg-accent/50'
                  }`}
                  onClick={() => handleUserClick(entry.id)}
                  data-testid={`leaderboard-entry-${entry.id}`}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-4">
                      <div className="w-8 h-8 flex items-center justify-center">
                        {getRankIcon(entry.rank)}
                      </div>
                      
                      <Avatar>
                        <AvatarFallback>
                          {entry.name.split(" ").map(n => n[0]).join("")}
                        </AvatarFallback>
                      </Avatar>
                      
                      <div>
                        <h3 className={`font-semibold ${entry.isCurrentUser ? 'text-primary' : ''}`}>
                          {entry.name} {entry.isCurrentUser && "(You)"}
                        </h3>
                        <div className="flex items-center gap-3 text-sm text-muted-foreground">
                          <span>Grade {entry.grade}</span>
                          <span>•</span>
                          <span>{entry.completedLessons} lessons</span>
                          <span>•</span>
                          <span>{entry.achievements} achievements</span>
                        </div>
                      </div>
                    </div>
                    
                    <div className="text-right">
                      <Badge 
                        variant={entry.isCurrentUser ? "default" : "secondary"}
                        className="font-bold"
                      >
                        {entry.xp} XP
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* User Stats Summary */}
        {user && (
          <Card className="mt-6">
            <CardHeader>
              <h3 className="font-semibold">Your Performance Summary</h3>
            </CardHeader>
            <CardContent>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 text-center">
                <div>
                  <div className="text-2xl font-bold text-primary">#{user.id === "current" ? 7 : 7}</div>
                  <div className="text-sm text-muted-foreground">Current Rank</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">{user.xp}</div>
                  <div className="text-sm text-muted-foreground">Total XP</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">24</div>
                  <div className="text-sm text-muted-foreground">Lessons Done</div>
                </div>
                <div>
                  <div className="text-2xl font-bold text-primary">5</div>
                  <div className="text-sm text-muted-foreground">Achievements</div>
                </div>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
}