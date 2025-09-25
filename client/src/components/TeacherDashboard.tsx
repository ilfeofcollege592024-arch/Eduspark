import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import Navigation from "./Navigation";
import { Users, BookOpen, TrendingUp, Mail, Upload, Award, AlertCircle } from "lucide-react";

interface ClassProgress {
  grade: number;
  totalStudents: number;
  activeStudents: number;
  avgProgress: number;
  totalXP: number;
}

interface StudentReport {
  id: string;
  name: string;
  grade: number;
  xp: number;
  lessonsCompleted: number;
  lastActive: string;
  status: "online" | "offline" | "away";
}

interface TeacherDashboardProps {
  onBack: () => void;
  onMailboxOpen: () => void;
}

export default function TeacherDashboard({ onBack, onMailboxOpen }: TeacherDashboardProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [selectedGrade, setSelectedGrade] = useState<number>(9);

  // Mock data - in real app would come from API
  const classProgress: ClassProgress[] = [
    { grade: 6, totalStudents: 28, activeStudents: 24, avgProgress: 65, totalXP: 8450 },
    { grade: 7, totalStudents: 32, activeStudents: 29, avgProgress: 72, totalXP: 9320 },
    { grade: 8, totalStudents: 30, activeStudents: 27, avgProgress: 68, totalXP: 8890 },
    { grade: 9, totalStudents: 25, activeStudents: 23, avgProgress: 78, totalXP: 12450 },
    { grade: 10, totalStudents: 22, activeStudents: 20, avgProgress: 82, totalXP: 15680 },
    { grade: 11, totalStudents: 18, activeStudents: 16, avgProgress: 75, totalXP: 14220 },
    { grade: 12, totalStudents: 15, activeStudents: 14, avgProgress: 88, totalXP: 18750 }
  ];

  const studentReports: StudentReport[] = [
    { id: "1", name: "Priya Sharma", grade: 9, xp: 2450, lessonsCompleted: 48, lastActive: "5 min ago", status: "online" },
    { id: "2", name: "Arjun Patel", grade: 9, xp: 2180, lessonsCompleted: 42, lastActive: "1 hour ago", status: "away" },
    { id: "3", name: "Kavya Singh", grade: 9, xp: 1950, lessonsCompleted: 39, lastActive: "2 hours ago", status: "offline" },
    { id: "4", name: "Rahul Kumar", grade: 9, xp: 1850, lessonsCompleted: 37, lastActive: "30 min ago", status: "online" },
    { id: "5", name: "Sneha Reddy", grade: 9, xp: 1720, lessonsCompleted: 35, lastActive: "3 hours ago", status: "offline" }
  ];

  const syllabusData = [
    { subject: "Mathematics", coverage: 85, grade: 9 },
    { subject: "Science", coverage: 92, grade: 9 },
    { subject: "English", coverage: 78, grade: 9 },
    { subject: "Social Science", coverage: 70, grade: 9 }
  ];

  const handleFileUpload = () => {
    console.log("File upload triggered");
    // Mock file upload functionality
  };

  const handleViewStudent = (studentId: string) => {
    console.log("View student details:", studentId);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  return (
    <div className="min-h-screen bg-background">
      <Navigation onBack={onBack} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-bold text-foreground mb-2">
              Teacher Dashboard
            </h1>
            <p className="text-muted-foreground">
              Welcome back, {user?.name}! Monitor student progress and manage classes
            </p>
          </div>
          <Button 
            onClick={onMailboxOpen}
            className="hover-elevate"
            data-testid="button-open-mailbox"
          >
            <Mail className="w-4 h-4 mr-2" />
            Mailbox
          </Button>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
            <TabsTrigger value="students" data-testid="tab-students">Students</TabsTrigger>
            <TabsTrigger value="syllabus" data-testid="tab-syllabus">Syllabus</TabsTrigger>
            <TabsTrigger value="reports" data-testid="tab-reports">Reports</TabsTrigger>
          </TabsList>

          <TabsContent value="overview" className="space-y-4">
            {/* Class Progress Overview */}
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold flex items-center gap-2">
                  <TrendingUp className="w-5 h-5 text-primary" />
                  Class Progress Overview
                </h3>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                  {classProgress.map((classData) => (
                    <div
                      key={classData.grade}
                      className={`p-4 rounded-lg border cursor-pointer hover-elevate transition-all ${
                        selectedGrade === classData.grade ? 'bg-accent border-primary' : 'hover:bg-accent/50'
                      }`}
                      onClick={() => setSelectedGrade(classData.grade)}
                      data-testid={`class-${classData.grade}`}
                    >
                      <div className="flex items-center justify-between mb-3">
                        <h4 className="font-semibold">Grade {classData.grade}</h4>
                        <Badge variant="secondary">{classData.activeStudents}/{classData.totalStudents}</Badge>
                      </div>
                      
                      <div className="space-y-2">
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Progress</span>
                          <span className="font-medium">{classData.avgProgress}%</span>
                        </div>
                        <Progress value={classData.avgProgress} className="h-2" />
                        
                        <div className="flex justify-between text-sm">
                          <span className="text-muted-foreground">Total XP</span>
                          <span className="font-medium">{classData.totalXP.toLocaleString()}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Quick Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <Card>
                <CardContent className="flex items-center p-6">
                  <Users className="w-8 h-8 text-primary mr-4" />
                  <div>
                    <p className="text-2xl font-bold">170</p>
                    <p className="text-muted-foreground text-sm">Total Students</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center p-6">
                  <BookOpen className="w-8 h-8 text-primary mr-4" />
                  <div>
                    <p className="text-2xl font-bold">87%</p>
                    <p className="text-muted-foreground text-sm">Avg Completion</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center p-6">
                  <Award className="w-8 h-8 text-primary mr-4" />
                  <div>
                    <p className="text-2xl font-bold">1,254</p>
                    <p className="text-muted-foreground text-sm">Achievements</p>
                  </div>
                </CardContent>
              </Card>
              
              <Card>
                <CardContent className="flex items-center p-6">
                  <AlertCircle className="w-8 h-8 text-primary mr-4" />
                  <div>
                    <p className="text-2xl font-bold">12</p>
                    <p className="text-muted-foreground text-sm">Need Attention</p>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="students" className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Student Reports</h3>
                <p className="text-sm text-muted-foreground">Monitor individual student progress and activity</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {studentReports.map((student) => (
                    <div
                      key={student.id}
                      className="flex items-center justify-between p-4 rounded-lg border hover-elevate cursor-pointer"
                      onClick={() => handleViewStudent(student.id)}
                      data-testid={`student-${student.id}`}
                    >
                      <div className="flex items-center gap-4">
                        <div className="relative">
                          <div className="w-10 h-10 bg-primary/10 rounded-full flex items-center justify-center">
                            <span className="font-semibold text-primary">
                              {student.name.split(' ').map(n => n[0]).join('')}
                            </span>
                          </div>
                          <div className={`absolute -bottom-1 -right-1 w-3 h-3 rounded-full ${getStatusColor(student.status)}`} />
                        </div>
                        
                        <div>
                          <h4 className="font-semibold">{student.name}</h4>
                          <p className="text-sm text-muted-foreground">
                            Grade {student.grade} • {student.lessonsCompleted} lessons • Last active: {student.lastActive}
                          </p>
                        </div>
                      </div>
                      
                      <Badge variant="secondary">{student.xp} XP</Badge>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="syllabus" className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Syllabus Coverage</h3>
                <p className="text-sm text-muted-foreground">Track curriculum completion across subjects</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-4">
                  {syllabusData.map((subject) => (
                    <div key={subject.subject} className="space-y-2">
                      <div className="flex justify-between">
                        <span className="font-medium">{subject.subject}</span>
                        <span className="text-sm text-muted-foreground">{subject.coverage}%</span>
                      </div>
                      <Progress value={subject.coverage} className="h-3" />
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Daily Reports</h3>
                <p className="text-sm text-muted-foreground">Upload daily reports and teaching materials</p>
              </CardHeader>
              <CardContent className="space-y-4">
                <Button 
                  onClick={handleFileUpload}
                  className="w-full hover-elevate"
                  data-testid="button-upload-report"
                >
                  <Upload className="w-4 h-4 mr-2" />
                  Upload Daily Report
                </Button>
                
                <div className="space-y-3">
                  <h4 className="font-medium">Recent Reports</h4>
                  <div className="space-y-2">
                    <div className="p-3 rounded-lg border">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Daily Report - Grade 9 Math</span>
                        <span className="text-sm text-muted-foreground">2 hours ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Completed linear equations unit. Students showing good progress.
                      </p>
                    </div>
                    
                    <div className="p-3 rounded-lg border">
                      <div className="flex justify-between items-center">
                        <span className="font-medium">Weekly Assessment - Science</span>
                        <span className="text-sm text-muted-foreground">1 day ago</span>
                      </div>
                      <p className="text-sm text-muted-foreground mt-1">
                        Newton's laws assessment results uploaded.
                      </p>
                    </div>
                  </div>
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}