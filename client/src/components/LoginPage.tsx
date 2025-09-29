import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Button } from "@/components/ui/button";
import { Card, CardHeader, CardContent, CardFooter } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { GraduationCap, Users, Code, Wifi, WifiOff } from "lucide-react";

export default function LoginPage() {
  const { t } = useLanguage();
  const { login, offlineAccess } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRole, setSelectedRole] = useState<"student" | "teacher" | "developer">("student");

  const handleLogin = async () => {
    if (!email || !password) return;
    
    setIsLoading(true);
    try {
      await login(email, password, selectedRole);
      console.log("Login successful for role:", selectedRole);
      // Clear form after successful login
      setEmail("");
      setPassword("");
    } catch (error) {
      console.error("Login failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const handleOfflineAccess = () => {
    offlineAccess();
    console.log("Offline access initiated");
  };

  const getRoleIcon = (role: string) => {
    switch (role) {
      case "student": return <GraduationCap className="w-5 h-5" />;
      case "teacher": return <Users className="w-5 h-5" />;
      case "developer": return <Code className="w-5 h-5" />;
      default: return <GraduationCap className="w-5 h-5" />;
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-background via-background to-accent/5 flex items-center justify-center p-4">
      <Card className="w-full max-w-md">
        <CardHeader className="text-center">
          <div className="flex items-center justify-center mb-4">
            <div className="w-12 h-12 bg-primary rounded-lg flex items-center justify-center">
              <GraduationCap className="w-6 h-6 text-primary-foreground" />
            </div>
          </div>
          <h1 className="text-2xl font-bold text-primary">Rural Education Platform</h1>
          <p className="text-muted-foreground">Gamified learning for grades 6-12</p>
        </CardHeader>

        <CardContent>
          <Tabs value={selectedRole} onValueChange={(value) => setSelectedRole(value as any)}>
            <TabsList className="grid w-full grid-cols-3">
              <TabsTrigger value="student" data-testid="tab-student" className="flex items-center gap-2">
                <GraduationCap className="w-4 h-4" />
                {t("auth.student")}
              </TabsTrigger>
              <TabsTrigger value="teacher" data-testid="tab-teacher" className="flex items-center gap-2">
                <Users className="w-4 h-4" />
                {t("auth.teacher")}
              </TabsTrigger>
              <TabsTrigger value="developer" data-testid="tab-developer" className="flex items-center gap-2">
                <Code className="w-4 h-4" />
                {t("auth.developer")}
              </TabsTrigger>
            </TabsList>

            <TabsContent value={selectedRole} className="space-y-4 mt-6">
              <div className="space-y-2">
                <Label htmlFor="email">{t("auth.email")}</Label>
                <Input
                  id="email"
                  type="email"
                  placeholder="student@school.edu"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  data-testid="input-email"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="password">{t("auth.password")}</Label>
                <Input
                  id="password"
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  data-testid="input-password"
                />
              </div>

              <Button 
                onClick={handleLogin} 
                className="w-full hover-elevate active-elevate-2 transform transition-all duration-200 hover:scale-105"
                disabled={isLoading || !email || !password}
                data-testid="button-login"
              >
                <Wifi className="w-4 h-4 mr-2" />
                {isLoading ? "Signing in..." : t("auth.login")}
              </Button>

              <Button
                variant="outline"
                onClick={() => console.log("Forgot password clicked")}
                className="w-full hover-elevate"
                data-testid="button-forgot-password"
              >
                {t("auth.forgot_password")}
              </Button>
            </TabsContent>
          </Tabs>
        </CardContent>

        {selectedRole === "student" && (
          <CardFooter className="border-t pt-4">
            <Button
              variant="secondary"
              onClick={handleOfflineAccess}
              className="w-full hover-elevate"
              data-testid="button-offline-access"
            >
              <WifiOff className="w-4 h-4 mr-2" />
              {t("auth.offline_access")}
            </Button>
          </CardFooter>
        )}
      </Card>
    </div>
  );
}