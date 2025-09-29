import { useState } from "react";
import { Switch, Route, useLocation } from "wouter";
import { queryClient } from "./lib/queryClient";
import { QueryClientProvider } from "@tanstack/react-query";
import { Toaster } from "@/components/ui/toaster";
import { TooltipProvider } from "@/components/ui/tooltip";

// Context Providers
import { ThemeProvider } from "@/contexts/ThemeContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";

// Components
import LoginPage from "@/components/LoginPage";
import GradeSelection from "@/components/GradeSelection";
import SubjectDashboard from "@/components/SubjectDashboard";
import LessonPage from "@/components/LessonPage";
import MotionSimulationGame from "@/components/games/MotionSimulationGame";
import AlgebraPuzzleGame from "@/components/games/AlgebraPuzzleGame";
import ProgressTracker from "@/components/ProgressTracker";
import Leaderboard from "@/components/Leaderboard";
import TeacherDashboard from "@/components/TeacherDashboard";
import MailBox from "@/components/MailBox";
import NotFound from "@/pages/not-found";

// Application state management
interface AppState {
  selectedGrade: number | null;
  selectedSubject: any | null;
  currentView: string | null;
  isInitialized: boolean;
}

function AppContent() {
  const { isAuthenticated, user } = useAuth();
  const [, setLocation] = useLocation();
  const [appState, setAppState] = useState<AppState>({
    selectedGrade: null,
    selectedSubject: null,
    currentView: null,
    isInitialized: false
  });

  // Initialize app state based on user role
  React.useEffect(() => {
    if (isAuthenticated && user && !appState.isInitialized) {
      const initialView = user.role === "teacher" ? "teacher-dashboard" : "grade-selection";
      setAppState(prev => ({
        ...prev,
        currentView: initialView,
        isInitialized: true
      }));
    } else if (!isAuthenticated && appState.isInitialized) {
      // Reset state when user logs out
      setAppState({
        selectedGrade: null,
        selectedSubject: null,
        currentView: null,
        isInitialized: false
      });
    }
  }, [isAuthenticated, user, appState.isInitialized]);

  // Handle navigation between views
  const handleGradeSelect = (grade: number) => {
    console.log("Grade selected:", grade);
    setAppState(prev => ({ 
      ...prev, 
      selectedGrade: grade, 
      currentView: "subjects" 
    }));
  };

  const handleSubjectSelect = (subject: any) => {
    console.log("Subject selected:", subject);
    setAppState(prev => ({ 
      ...prev, 
      selectedSubject: subject, 
      currentView: "lessons" 
    }));
  };

  const handlePlayGame = (gameType: string) => {
    console.log("Game started:", gameType);
    setAppState(prev => ({ 
      ...prev, 
      currentView: gameType 
    }));
  };

  const handleNavigateToProgress = () => {
    setAppState(prev => ({ ...prev, currentView: "progress" }));
  };

  const handleNavigateToLeaderboard = () => {
    setAppState(prev => ({ ...prev, currentView: "leaderboard" }));
  };

  const handleNavigateToTeacherDashboard = () => {
    setAppState(prev => ({ ...prev, currentView: "teacher-dashboard" }));
  };

  const handleNavigateToMailbox = () => {
    setAppState(prev => ({ ...prev, currentView: "mailbox" }));
  };

  const handleBackNavigation = () => {
    console.log("Back navigation triggered");
    switch (appState.currentView) {
      case "subjects":
        setAppState(prev => ({ ...prev, currentView: "grade-selection" }));
        break;
      case "lessons":
        setAppState(prev => ({ ...prev, currentView: "subjects" }));
        break;
      case "motion-simulation":
      case "algebra-puzzle":
        setAppState(prev => ({ ...prev, currentView: "lessons" }));
        break;
      case "progress":
      case "leaderboard":
        if (user?.role === "student") {
          setAppState(prev => ({ ...prev, currentView: "subjects" }));
        } else {
          setAppState(prev => ({ ...prev, currentView: "teacher-dashboard" }));
        }
        break;
      case "mailbox":
        setAppState(prev => ({ ...prev, currentView: "teacher-dashboard" }));
        break;
      default:
        const defaultView = user?.role === "teacher" ? "teacher-dashboard" : "grade-selection";
        setAppState(prev => ({ ...prev, currentView: defaultView }));
    }
  };

  const handleHomeNavigation = () => {
    console.log("Home navigation triggered");
    const homeView = user?.role === "teacher" ? "teacher-dashboard" : "grade-selection";
    setAppState(prev => ({ 
      ...prev, 
      currentView: homeView,
      selectedGrade: null,
      selectedSubject: null
    }));
  };

  // Show login page if not authenticated
  if (!isAuthenticated) {
    return <LoginPage />;
  }

  // Show loading state while initializing
  if (!appState.isInitialized || !appState.currentView) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-8 h-8 border-4 border-primary border-t-transparent rounded-full animate-spin mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading your dashboard...</p>
        </div>
      </div>
    );
  }

  // Render current view based on app state
  const renderCurrentView = () => {
    switch (appState.currentView) {
      case "grade-selection":
        return (
          <GradeSelection 
            onGradeSelect={handleGradeSelect}
          />
        );

      case "subjects":
        return appState.selectedGrade ? (
          <SubjectDashboard 
            grade={appState.selectedGrade}
            onSubjectSelect={handleSubjectSelect}
            onBack={handleBackNavigation}
          />
        ) : (
          <GradeSelection onGradeSelect={handleGradeSelect} />
        );

      case "lessons":
        return appState.selectedSubject ? (
          <LessonPage 
            subject={appState.selectedSubject}
            grade={appState.selectedGrade || 9}
            onBack={handleBackNavigation}
            onPlayGame={handlePlayGame}
          />
        ) : (
          <GradeSelection onGradeSelect={handleGradeSelect} />
        );

      case "motion-simulation":
        return (
          <MotionSimulationGame 
            onBack={handleBackNavigation}
          />
        );

      case "algebra-puzzle":
        return (
          <AlgebraPuzzleGame 
            onBack={handleBackNavigation}
          />
        );

      case "progress":
        return (
          <ProgressTracker 
            onBack={handleBackNavigation}
            onSubjectClick={(subjectId) => {
              // Find and select the subject, then navigate to lessons
              const subject = { id: subjectId, name: subjectId };
              handleSubjectSelect(subject);
            }}
          />
        );

      case "leaderboard":
        return (
          <Leaderboard 
            onBack={handleBackNavigation}
            onUserClick={(userId) => console.log('User profile clicked:', userId)}
          />
        );

      case "teacher-dashboard":
        return (
          <TeacherDashboard 
            onBack={handleBackNavigation}
            onMailboxOpen={handleNavigateToMailbox}
          />
        );

      case "mailbox":
        return (
          <MailBox 
            onBack={handleBackNavigation}
          />
        );

      default:
        // Fallback to appropriate default view
        const fallbackView = user?.role === "teacher" ? "teacher-dashboard" : "grade-selection";
        setAppState(prev => ({ ...prev, currentView: fallbackView }));
        return null;
    }
  };

  return (
    <div className="min-h-screen bg-background">
      {renderCurrentView()}
      
      {/* Quick Navigation for Students */}
      {user?.role === "student" && appState.currentView !== "login" && (
        <div className="fixed bottom-4 right-4 flex gap-2">
          <button
            onClick={handleNavigateToProgress}
            className="w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover-elevate transition-all duration-200"
            title="Progress Tracker"
            data-testid="button-quick-progress"
          >
            📊
          </button>
          <button
            onClick={handleNavigateToLeaderboard}
            className="w-12 h-12 bg-primary text-primary-foreground rounded-full shadow-lg hover-elevate transition-all duration-200"
            title="Leaderboard"
            data-testid="button-quick-leaderboard"
          >
            🏆
          </button>
        </div>
      )}
    </div>
  );
}

function Router() {
  return (
    <Switch>
      <Route path="/" component={AppContent} />
      <Route component={NotFound} />
    </Switch>
  );
}

function App() {
  return (
    <QueryClientProvider client={queryClient}>
      <TooltipProvider>
        <ThemeProvider>
          <LanguageProvider>
            <AuthProvider>
              <AppContent />
              <Toaster />
            </AuthProvider>
          </LanguageProvider>
        </ThemeProvider>
      </TooltipProvider>
    </QueryClientProvider>
  );
}

export default App;