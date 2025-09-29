import { useLanguage } from "@/contexts/LanguageContext";
import { useTheme } from "@/contexts/ThemeContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Home, Power, Sun, Moon, Globe } from "lucide-react";

interface NavigationProps {
  onBack?: () => void;
  onHome?: () => void;
  showBack?: boolean;
  showHome?: boolean;
}

export default function Navigation({ onBack, onHome, showBack = true, showHome = true }: NavigationProps) {
  const { t, language, setLanguage } = useLanguage();
  const { theme, toggleTheme } = useTheme();
  const { logout, isOffline } = useAuth();

  const handleLanguageToggle = () => {
    const languages = ["en", "hi", "od"] as const;
    const currentIndex = languages.indexOf(language);
    const nextIndex = (currentIndex + 1) % languages.length;
    setLanguage(languages[nextIndex]);
    console.log("Language changed to:", languages[nextIndex]);
  };

  const handleBack = () => {
    if (onBack) {
      onBack();
    } else {
      window.history.back();
    }
    console.log("Back navigation triggered");
  };

  const handleHome = () => {
    if (onHome) {
      onHome();
    } else {
      window.location.hash = "#/";
    }
    console.log("Home navigation triggered");
  };

  const handleLogout = () => {
    logout();
    console.log("Logout triggered");
  };

  return (
    <nav className="flex items-center justify-between p-4 bg-background border-b border-border">
      <div className="flex items-center gap-2">
        {showBack && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleBack}
            data-testid="button-back"
            className="hover-elevate"
          >
            <ArrowLeft className="w-4 h-4 mr-2" />
            {t("nav.back")}
          </Button>
        )}
        
        {showHome && (
          <Button
            variant="ghost"
            size="sm"
            onClick={handleHome}
            data-testid="button-home"
            className="hover-elevate"
          >
            <Home className="w-4 h-4 mr-2" />
            {t("nav.home")}
          </Button>
        )}
      </div>

      {/* User Role Indicator */}
      <div className="flex items-center gap-2">
        <div className="text-sm text-muted-foreground">
          {user?.role === "teacher" ? "👨‍🏫 Teacher" : user?.role === "student" ? "🎓 Student" : "👨‍💻 Developer"}
        </div>
        <div className="w-px h-4 bg-border"></div>
      </div>
      <div className="flex items-center gap-2">
        {/* Language Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLanguageToggle}
          data-testid="button-language-toggle"
          className="hover-elevate"
          title={`Current: ${language.toUpperCase()}`}
        >
          <Globe className="w-4 h-4" />
        </Button>

        {/* Theme Toggle */}
        <Button
          variant="ghost"
          size="icon"
          onClick={toggleTheme}
          data-testid="button-theme-toggle"
          className="hover-elevate"
        >
          {theme === "light" ? (
            <Moon className="w-4 h-4" />
          ) : (
            <Sun className="w-4 h-4" />
          )}
        </Button>

        {/* Logout/Exit */}
        <Button
          variant="ghost"
          size="sm"
          onClick={handleLogout}
          data-testid="button-logout"
          className="hover-elevate text-destructive hover:text-destructive"
        >
          <Power className="w-4 h-4 mr-2" />
          {isOffline ? t("nav.exit") : t("nav.logout")}
        </Button>
      </div>
    </nav>
  );
}