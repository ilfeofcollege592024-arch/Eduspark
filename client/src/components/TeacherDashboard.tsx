import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Progress } from "@/components/ui/progress";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navigation from "./Navigation";
import { Users, BookOpen, TrendingUp, Mail, Upload, Award, AlertCircle, Calendar, Clock, MessageSquare, Target, Filter, Plus, CheckCircle } from "lucide-react";

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
  performance: "excellent" | "good" | "average" | "needs_attention";
  assignments: {
    pending: number;
    completed: number;
    overdue: number;
  };
  subjects: {
    [key: string]: {
      progress: number;
      lastScore: number;
    };
  };
}

interface Assignment {
  id: string;
  title: string;
  subject: string;
  grade: number;
  dueDate: string;
  type: "homework" | "quiz" | "project";
  submissions: number;
  totalStudents: number;
  status: "active" | "completed" | "overdue";
}

interface Announcement {
  id: string;
  title: string;
  content: string;
  priority: "high" | "medium" | "low";
  targetGrades: number[];
  createdAt: string;
  readBy: string[];
}

interface TeacherDashboardProps {
  onBack: () => void;
  onMailboxOpen: () => void;
}

export default function TeacherDashboard({ onBack, onMailboxOpen }: TeacherDashboardProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [selectedGrade, setSelectedGrade] = useState<number>(9);
  const [showNewAssignment, setShowNewAssignment] = useState(false);
  const [showNewAnnouncement, setShowNewAnnouncement] = useState(false);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

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
    { 
      id: "1", name: "Priya Sharma", grade: 9, xp: 2450, lessonsCompleted: 48, lastActive: "5 min ago", status: "online",
      performance: "excellent", 
      assignments: { pending: 2, completed: 15, overdue: 0 },
      subjects: { math: { progress: 92, lastScore: 95 }, science: { progress: 88, lastScore: 89 }, english: { progress: 85, lastScore: 87 } }
    },
    { 
      id: "2", name: "Arjun Patel", grade: 9, xp: 2180, lessonsCompleted: 42, lastActive: "1 hour ago", status: "away",
      performance: "good",
      assignments: { pending: 3, completed: 12, overdue: 1 },
      subjects: { math: { progress: 78, lastScore: 82 }, science: { progress: 85, lastScore: 88 }, english: { progress: 76, lastScore: 79 } }
    },
    { 
      id: "3", name: "Kavya Singh", grade: 9, xp: 1950, lessonsCompleted: 39, lastActive: "2 hours ago", status: "offline",
      performance: "good",
      assignments: { pending: 1, completed: 14, overdue: 0 },
      subjects: { math: { progress: 82, lastScore: 86 }, science: { progress: 80, lastScore: 83 }, english: { progress: 88, lastScore: 91 } }
    },
    { 
      id: "4", name: "Rahul Kumar", grade: 9, xp: 1850, lessonsCompleted: 37, lastActive: "30 min ago", status: "online",
      performance: "average",
      assignments: { pending: 4, completed: 10, overdue: 2 },
      subjects: { math: { progress: 65, lastScore: 70 }, science: { progress: 72, lastScore: 75 }, english: { progress: 68, lastScore: 72 } }
    },
    { 
      id: "5", name: "Sneha Reddy", grade: 9, xp: 1720, lessonsCompleted: 35, lastActive: "3 hours ago", status: "offline",
      performance: "needs_attention",
      assignments: { pending: 5, completed: 8, overdue: 3 },
      subjects: { math: { progress: 58, lastScore: 62 }, science: { progress: 60, lastScore: 65 }, english: { progress: 55, lastScore: 59 } }
    }
  ];

  const assignments: Assignment[] = [
    { id: "1", title: "Linear Equations Practice", subject: "Mathematics", grade: 9, dueDate: "Dec 25, 2024", type: "homework", submissions: 18, totalStudents: 25, status: "active" },
    { id: "2", title: "Newton's Laws Quiz", subject: "Science", grade: 9, dueDate: "Dec 22, 2024", type: "quiz", submissions: 23, totalStudents: 25, status: "active" },
    { id: "3", title: "Essay on Rural Development", subject: "English", grade: 9, dueDate: "Dec 20, 2024", type: "project", submissions: 20, totalStudents: 25, status: "overdue" },
    { id: "4", title: "Chemical Reactions Lab", subject: "Science", grade: 10, dueDate: "Dec 28, 2024", type: "project", submissions: 15, totalStudents: 22, status: "active" }
  ];

  const announcements: Announcement[] = [
    { id: "1", title: "Winter Break Schedule", content: "Classes will resume on January 8th, 2025. Have a great vacation!", priority: "high", targetGrades: [6,7,8,9,10,11,12], createdAt: "2 hours ago", readBy: ["1","2","3"] },
    { id: "2", title: "Science Fair Registration", content: "Register for the annual science fair before December 30th.", priority: "medium", targetGrades: [8,9,10], createdAt: "1 day ago", readBy: ["1","4","5"] },
    { id: "3", title: "New Learning Resources", content: "New interactive modules added to Mathematics and Science courses.", priority: "low", targetGrades: [9,10,11], createdAt: "3 days ago", readBy: ["2","3"] }
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