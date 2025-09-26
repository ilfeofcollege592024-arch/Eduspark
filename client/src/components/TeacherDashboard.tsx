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
import { Users, BookOpen, TrendingUp, Mail, Upload, Award, CircleAlert as AlertCircle, Calendar, Clock, MessageSquare, Target, Filter, Plus, CircleCheck as CheckCircle, ChartBar as BarChart3, FileText, Video, Mic, Image } from "lucide-react";

interface ClassProgress {
  grade: number;
  totalStudents: number;
  activeStudents: number;
  avgProgress: number;
  totalXP: number;
  onlineNow: number;
  lastWeekActivity: number;
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
  weeklyActivity: number[];
  strengths: string[];
  improvements: string[];
}

interface DailyReport {
  id: string;
  date: string;
  grade: number;
  subject: string;
  content: string;
  attachments: string[];
  type: "text" | "audio" | "file";
  status: "draft" | "published";
}

interface FacultyCourse {
  id: string;
  title: string;
  description: string;
  duration: string;
  progress: number;
  category: "pedagogy" | "technology" | "subject" | "assessment";
  difficulty: "beginner" | "intermediate" | "advanced";
  enrolled: boolean;
}

interface TeacherDashboardProps {
  onBack: () => void;
  onMailboxOpen: () => void;
}

export default function TeacherDashboard({ onBack, onMailboxOpen }: TeacherDashboardProps) {
  const { t } = useLanguage();
  const { user } = useAuth();
  const [selectedGrade, setSelectedGrade] = useState<number>(9);
  const [showNewReport, setShowNewReport] = useState(false);
  const [reportContent, setReportContent] = useState("");
  const [reportSubject, setReportSubject] = useState("");
  const [reportType, setReportType] = useState<"text" | "audio" | "file">("text");
  const [selectedStudent, setSelectedStudent] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>("all");
  const [searchTerm, setSearchTerm] = useState("");

  // Enhanced mock data with more realistic information
  const classProgress: ClassProgress[] = [
    { grade: 6, totalStudents: 28, activeStudents: 24, avgProgress: 65, totalXP: 8450, onlineNow: 12, lastWeekActivity: 85 },
    { grade: 7, totalStudents: 32, activeStudents: 29, avgProgress: 72, totalXP: 9320, onlineNow: 15, lastWeekActivity: 91 },
    { grade: 8, totalStudents: 30, activeStudents: 27, avgProgress: 68, totalXP: 8890, onlineNow: 11, lastWeekActivity: 78 },
    { grade: 9, totalStudents: 25, activeStudents: 23, avgProgress: 78, totalXP: 12450, onlineNow: 18, lastWeekActivity: 94 },
    { grade: 10, totalStudents: 22, activeStudents: 20, avgProgress: 82, totalXP: 15680, onlineNow: 14, lastWeekActivity: 88 },
    { grade: 11, totalStudents: 18, activeStudents: 16, avgProgress: 75, totalXP: 14220, onlineNow: 9, lastWeekActivity: 82 },
    { grade: 12, totalStudents: 15, activeStudents: 14, avgProgress: 88, totalXP: 18750, onlineNow: 8, lastWeekActivity: 96 }
  ];

  const studentReports: StudentReport[] = [
    { 
      id: "1", name: "Priya Sharma", grade: 9, xp: 2450, lessonsCompleted: 48, lastActive: "5 min ago", status: "online",
      performance: "excellent", 
      assignments: { pending: 2, completed: 15, overdue: 0 },
      subjects: { math: { progress: 92, lastScore: 95 }, science: { progress: 88, lastScore: 89 }, english: { progress: 85, lastScore: 87 } },
      weeklyActivity: [85, 92, 78, 95, 88, 91, 94],
      strengths: ["Problem solving", "Mathematical reasoning", "Scientific inquiry"],
      improvements: ["Essay writing", "Time management"]
    },
    { 
      id: "2", name: "Arjun Patel", grade: 9, xp: 2180, lessonsCompleted: 42, lastActive: "1 hour ago", status: "away",
      performance: "good",
      assignments: { pending: 3, completed: 12, overdue: 1 },
      subjects: { math: { progress: 78, lastScore: 82 }, science: { progress: 85, lastScore: 88 }, english: { progress: 76, lastScore: 79 } },
      weeklyActivity: [72, 68, 85, 79, 82, 75, 88],
      strengths: ["Creative thinking", "Group collaboration"],
      improvements: ["Consistent practice", "Assignment submission"]
    },
    { 
      id: "3", name: "Kavya Singh", grade: 9, xp: 1950, lessonsCompleted: 39, lastActive: "2 hours ago", status: "offline",
      performance: "good",
      assignments: { pending: 1, completed: 14, overdue: 0 },
      subjects: { math: { progress: 82, lastScore: 86 }, science: { progress: 80, lastScore: 83 }, english: { progress: 88, lastScore: 91 } },
      weeklyActivity: [88, 85, 82, 90, 87, 84, 89],
      strengths: ["Language skills", "Critical analysis"],
      improvements: ["Mathematical concepts", "Scientific experiments"]
    },
    { 
      id: "4", name: "Rahul Kumar", grade: 9, xp: 1850, lessonsCompleted: 37, lastActive: "30 min ago", status: "online",
      performance: "average",
      assignments: { pending: 4, completed: 10, overdue: 2 },
      subjects: { math: { progress: 65, lastScore: 70 }, science: { progress: 72, lastScore: 75 }, english: { progress: 68, lastScore: 72 } },
      weeklyActivity: [65, 58, 72, 68, 75, 70, 73],
      strengths: ["Practical application", "Hands-on learning"],
      improvements: ["Theory understanding", "Regular practice", "Assignment completion"]
    },
    { 
      id: "5", name: "Sneha Reddy", grade: 9, xp: 1720, lessonsCompleted: 35, lastActive: "3 hours ago", status: "offline",
      performance: "needs_attention",
      assignments: { pending: 5, completed: 8, overdue: 3 },
      subjects: { math: { progress: 58, lastScore: 62 }, science: { progress: 60, lastScore: 65 }, english: { progress: 55, lastScore: 59 } },
      weeklyActivity: [45, 52, 48, 62, 58, 55, 60],
      strengths: ["Artistic skills", "Creative expression"],
      improvements: ["Basic concepts", "Regular attendance", "Study habits", "Assignment discipline"]
    }
  ];

  const dailyReports: DailyReport[] = [
    {
      id: "1",
      date: "2024-12-22",
      grade: 9,
      subject: "Mathematics",
      content: "Today we covered linear equations and their applications. Students showed good understanding of basic concepts. Priya and Arjun excelled in problem-solving exercises. Need to focus more on word problems next class.",
      attachments: ["linear_equations_worksheet.pdf", "practice_problems.pdf"],
      type: "text",
      status: "published"
    },
    {
      id: "2",
      date: "2024-12-21",
      grade: 9,
      subject: "Science",
      content: "Conducted experiments on Newton's laws of motion. Great engagement from students during hands-on activities. Lab equipment worked well. Students documented observations effectively.",
      attachments: ["experiment_results.jpg", "lab_observations.pdf"],
      type: "text",
      status: "published"
    },
    {
      id: "3",
      date: "2024-12-20",
      grade: 8,
      subject: "English",
      content: "Reading comprehension session on environmental conservation. Students participated actively in group discussions. Need to work on vocabulary building for next week.",
      attachments: ["reading_passage.pdf"],
      type: "text",
      status: "draft"
    }
  ];

  const facultyCourses: FacultyCourse[] = [
    {
      id: "1",
      title: "Digital Teaching Methods",
      description: "Learn modern digital tools and techniques for effective online and hybrid teaching",
      duration: "4 weeks",
      progress: 65,
      category: "technology",
      difficulty: "intermediate",
      enrolled: true
    },
    {
      id: "2",
      title: "Student Assessment Strategies",
      description: "Comprehensive guide to formative and summative assessment techniques",
      duration: "3 weeks",
      progress: 0,
      category: "assessment",
      difficulty: "beginner",
      enrolled: false
    },
    {
      id: "3",
      title: "Inclusive Education Practices",
      description: "Creating inclusive learning environments for diverse student populations",
      duration: "6 weeks",
      progress: 100,
      category: "pedagogy",
      difficulty: "advanced",
      enrolled: true
    },
    {
      id: "4",
      title: "STEM Integration Techniques",
      description: "Integrating Science, Technology, Engineering, and Mathematics in curriculum",
      duration: "5 weeks",
      progress: 30,
      category: "subject",
      difficulty: "intermediate",
      enrolled: true
    }
  ];

  const syllabusData = [
    { subject: "Mathematics", coverage: 85, grade: 9, totalTopics: 24, completedTopics: 20, upcomingDeadlines: 2 },
    { subject: "Science", coverage: 92, grade: 9, totalTopics: 28, completedTopics: 26, upcomingDeadlines: 1 },
    { subject: "English", coverage: 78, grade: 9, totalTopics: 20, completedTopics: 16, upcomingDeadlines: 3 },
    { subject: "Social Science", coverage: 70, grade: 9, totalTopics: 22, completedTopics: 15, upcomingDeadlines: 4 }
  ];

  const handleFileUpload = (type: "text" | "audio" | "file") => {
    console.log("File upload triggered for type:", type);
    // Mock file upload functionality
    setReportType(type);
  };

  const handleSaveReport = () => {
    if (!reportContent.trim() || !reportSubject.trim()) {
      alert("Please fill in all required fields");
      return;
    }

    const newReport: DailyReport = {
      id: Date.now().toString(),
      date: new Date().toISOString().split('T')[0],
      grade: selectedGrade,
      subject: reportSubject,
      content: reportContent,
      attachments: [],
      type: reportType,
      status: "draft"
    };

    console.log("New report saved:", newReport);
    setReportContent("");
    setReportSubject("");
    setShowNewReport(false);
    // In real app, would save to backend
  };

  const handleViewStudent = (studentId: string) => {
    console.log("View student details:", studentId);
    setSelectedStudent(studentId);
  };

  const handleEnrollCourse = (courseId: string) => {
    console.log("Enroll in course:", courseId);
    // In real app, would update enrollment status
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case "online": return "bg-green-500";
      case "away": return "bg-yellow-500";
      case "offline": return "bg-gray-500";
      default: return "bg-gray-500";
    }
  };

  const getPerformanceColor = (performance: string) => {
    switch (performance) {
      case "excellent": return "text-green-600";
      case "good": return "text-blue-600";
      case "average": return "text-yellow-600";
      case "needs_attention": return "text-red-600";
      default: return "text-gray-600";
    }
  };

  const filteredStudents = studentReports.filter(student => {
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = filterStatus === "all" || student.status === filterStatus;
    return matchesSearch && matchesStatus;
  });

  const selectedStudentData = selectedStudent ? studentReports.find(s => s.id === selectedStudent) : null;

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
          <div className="flex gap-2">
            <Button 
              onClick={onMailboxOpen}
              className="hover-elevate"
              data-testid="button-open-mailbox"
            >
              <Mail className="w-4 h-4 mr-2" />
              Mailbox
            </Button>
            <Button 
              onClick={() => setShowNewReport(true)}
              className="hover-elevate"
              data-testid="button-new-report"
            >
              <Plus className="w-4 h-4 mr-2" />
              New Report
            </Button>
          </div>
        </div>

        <Tabs defaultValue="overview" className="space-y-4">
          <TabsList className="grid w-full grid-cols-6">
            <TabsTrigger value="overview" data-testid="tab-overview">Overview</TabsTrigger>
            <TabsTrigger value="students" data-testid="tab-students">Students</TabsTrigger>
            <TabsTrigger value="syllabus" data-testid="tab-syllabus">Syllabus</TabsTrigger>
            <TabsTrigger value="reports" data-testid="tab-reports">Reports</TabsTrigger>
            <TabsTrigger value="analytics" data-testid="tab-analytics">Analytics</TabsTrigger>
            <TabsTrigger value="development" data-testid="tab-development">Development</TabsTrigger>
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
                        <div className="flex items-center gap-2">
                          <div className={`w-2 h-2 rounded-full ${classData.onlineNow > 10 ? 'bg-green-500' : 'bg-yellow-500'}`} />
                          <span className="text-xs text-muted-foreground">{classData.onlineNow} online</span>
                        </div>
                      </div>
                      
                      <div className="space-y-3">
                        <div>
                          <div className="flex justify-between text-sm mb-1">
                            <span className="text-muted-foreground">Progress</span>
                            <span className="font-medium">{classData.avgProgress}%</span>
                          </div>
                          <Progress value={classData.avgProgress} className="h-2" />
                        </div>
                        
                        <div className="grid grid-cols-2 gap-2 text-xs">
                          <div>
                            <span className="text-muted-foreground">Students:</span>
                            <span className="font-medium ml-1">{classData.activeStudents}/{classData.totalStudents}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">XP:</span>
                            <span className="font-medium ml-1">{classData.totalXP.toLocaleString()}</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Activity:</span>
                            <span className="font-medium ml-1">{classData.lastWeekActivity}%</span>
                          </div>
                          <div>
                            <span className="text-muted-foreground">Online:</span>
                            <span className="font-medium ml-1">{classData.onlineNow}</span>
                          </div>
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
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Student Reports</h3>
                    <p className="text-sm text-muted-foreground">Monitor individual student progress and activity</p>
                  </div>
                  <div className="flex items-center gap-2">
                    <Input
                      placeholder="Search students..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-48"
                      data-testid="input-search-students"
                    />
                    <Select value={filterStatus} onValueChange={setFilterStatus}>
                      <SelectTrigger className="w-32">
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="all">All Status</SelectItem>
                        <SelectItem value="online">Online</SelectItem>
                        <SelectItem value="away">Away</SelectItem>
                        <SelectItem value="offline">Offline</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>
              </CardHeader>
              <CardContent>
                <div className="space-y-3">
                  {filteredStudents.map((student) => (
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
                          <div className="flex items-center gap-4 text-sm text-muted-foreground">
                            <span>Grade {student.grade}</span>
                            <span>•</span>
                            <span>{student.lessonsCompleted} lessons</span>
                            <span>•</span>
                            <span>Last active: {student.lastActive}</span>
                            <span className={`font-medium ${getPerformanceColor(student.performance)}`}>
                              {student.performance.replace('_', ' ')}
                            </span>
                          </div>
                        </div>
                      </div>
                      
                      <div className="flex items-center gap-4">
                        <div className="text-right text-sm">
                          <div className="font-semibold">{student.xp} XP</div>
                          <div className="text-muted-foreground">
                            {student.assignments.pending} pending
                          </div>
                        </div>
                        <Badge variant="secondary">{student.status}</Badge>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* Student Detail Modal */}
            {selectedStudentData && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <Card className="w-full max-w-4xl max-h-[90vh] overflow-y-auto">
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <h3 className="font-bold text-xl">{selectedStudentData.name} - Detailed Report</h3>
                      <Button 
                        variant="ghost" 
                        onClick={() => setSelectedStudent(null)}
                        data-testid="button-close-student-detail"
                      >
                        ✕
                      </Button>
                    </div>
                  </CardHeader>
                  <CardContent className="space-y-6">
                    {/* Performance Overview */}
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                      <div className="text-center p-4 bg-accent/20 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{selectedStudentData.xp}</div>
                        <div className="text-sm text-muted-foreground">Total XP</div>
                      </div>
                      <div className="text-center p-4 bg-accent/20 rounded-lg">
                        <div className="text-2xl font-bold text-primary">{selectedStudentData.lessonsCompleted}</div>
                        <div className="text-sm text-muted-foreground">Lessons Completed</div>
                      </div>
                      <div className="text-center p-4 bg-accent/20 rounded-lg">
                        <div className={`text-2xl font-bold ${getPerformanceColor(selectedStudentData.performance)}`}>
                          {selectedStudentData.performance.replace('_', ' ').toUpperCase()}
                        </div>
                        <div className="text-sm text-muted-foreground">Performance Level</div>
                      </div>
                    </div>

                    {/* Subject Progress */}
                    <div>
                      <h4 className="font-semibold mb-3">Subject Progress</h4>
                      <div className="space-y-3">
                        {Object.entries(selectedStudentData.subjects).map(([subject, data]) => (
                          <div key={subject} className="space-y-2">
                            <div className="flex justify-between">
                              <span className="font-medium capitalize">{subject}</span>
                              <span className="text-sm text-muted-foreground">
                                {data.progress}% • Last Score: {data.lastScore}%
                              </span>
                            </div>
                            <Progress value={data.progress} className="h-2" />
                          </div>
                        ))}
                      </div>
                    </div>

                    {/* Assignments Status */}
                    <div>
                      <h4 className="font-semibold mb-3">Assignment Status</h4>
                      <div className="grid grid-cols-3 gap-4">
                        <div className="text-center p-3 bg-green-50 rounded-lg">
                          <div className="text-lg font-bold text-green-600">{selectedStudentData.assignments.completed}</div>
                          <div className="text-sm text-green-600">Completed</div>
                        </div>
                        <div className="text-center p-3 bg-yellow-50 rounded-lg">
                          <div className="text-lg font-bold text-yellow-600">{selectedStudentData.assignments.pending}</div>
                          <div className="text-sm text-yellow-600">Pending</div>
                        </div>
                        <div className="text-center p-3 bg-red-50 rounded-lg">
                          <div className="text-lg font-bold text-red-600">{selectedStudentData.assignments.overdue}</div>
                          <div className="text-sm text-red-600">Overdue</div>
                        </div>
                      </div>
                    </div>

                    {/* Strengths and Improvements */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <h4 className="font-semibold mb-3 text-green-600">Strengths</h4>
                        <ul className="space-y-1">
                          {selectedStudentData.strengths.map((strength, index) => (
                            <li key={index} className="text-sm flex items-center gap-2">
                              <CheckCircle className="w-3 h-3 text-green-500" />
                              {strength}
                            </li>
                          ))}
                        </ul>
                      </div>
                      <div>
                        <h4 className="font-semibold mb-3 text-orange-600">Areas for Improvement</h4>
                        <ul className="space-y-1">
                          {selectedStudentData.improvements.map((improvement, index) => (
                            <li key={index} className="text-sm flex items-center gap-2">
                              <Target className="w-3 h-3 text-orange-500" />
                              {improvement}
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="syllabus" className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Syllabus Coverage - Grade {selectedGrade}</h3>
                <p className="text-sm text-muted-foreground">Track curriculum completion across subjects</p>
              </CardHeader>
              <CardContent>
                <div className="space-y-6">
                  {syllabusData.map((subject) => (
                    <div key={subject.subject} className="space-y-3">
                      <div className="flex justify-between items-center">
                        <div>
                          <span className="font-medium">{subject.subject}</span>
                          <div className="text-sm text-muted-foreground">
                            {subject.completedTopics}/{subject.totalTopics} topics completed
                          </div>
                        </div>
                        <div className="text-right">
                          <div className="text-sm font-medium">{subject.coverage}%</div>
                          <div className="text-xs text-muted-foreground">
                            {subject.upcomingDeadlines} deadlines
                          </div>
                        </div>
                      </div>
                      <Progress value={subject.coverage} className="h-3" />
                      <div className="flex justify-between text-xs text-muted-foreground">
                        <span>Started: Sep 2024</span>
                        <span>Target: Mar 2025</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>

          <TabsContent value="reports" className="space-y-4">
            <Card>
              <CardHeader>
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="text-lg font-semibold">Daily Reports</h3>
                    <p className="text-sm text-muted-foreground">Create and manage daily teaching reports</p>
                  </div>
                  <Button 
                    onClick={() => setShowNewReport(true)}
                    className="hover-elevate"
                    data-testid="button-create-report"
                  >
                    <Plus className="w-4 h-4 mr-2" />
                    Create Report
                  </Button>
                </div>
              </CardHeader>
              <CardContent className="space-y-4">
                <div className="space-y-3">
                  {dailyReports.map((report) => (
                    <div key={report.id} className="p-4 rounded-lg border hover-elevate">
                      <div className="flex justify-between items-start mb-2">
                        <div>
                          <h4 className="font-medium">{report.subject} - Grade {report.grade}</h4>
                          <p className="text-sm text-muted-foreground">{report.date}</p>
                        </div>
                        <div className="flex items-center gap-2">
                          <Badge variant={report.status === 'published' ? 'default' : 'secondary'}>
                            {report.status}
                          </Badge>
                          <Badge variant="outline">
                            {report.type}
                          </Badge>
                        </div>
                      </div>
                      <p className="text-sm mb-3 line-clamp-2">{report.content}</p>
                      {report.attachments.length > 0 && (
                        <div className="flex items-center gap-2 text-xs text-muted-foreground">
                          <FileText className="w-3 h-3" />
                          <span>{report.attachments.length} attachment(s)</span>
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>

            {/* New Report Modal */}
            {showNewReport && (
              <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
                <Card className="w-full max-w-2xl">
                  <CardHeader>
                    <h3 className="font-bold">Create Daily Report</h3>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <label className="text-sm font-medium">Grade</label>
                        <Select value={selectedGrade.toString()} onValueChange={(value) => setSelectedGrade(parseInt(value))}>
                          <SelectTrigger>
                            <SelectValue />
                          </SelectTrigger>
                          <SelectContent>
                            {[6,7,8,9,10,11,12].map(grade => (
                              <SelectItem key={grade} value={grade.toString()}>Grade {grade}</SelectItem>
                            ))}
                          </SelectContent>
                        </Select>
                      </div>
                      <div>
                        <label className="text-sm font-medium">Subject</label>
                        <Input 
                          placeholder="Enter subject" 
                          value={reportSubject}
                          onChange={(e) => setReportSubject(e.target.value)}
                          data-testid="input-report-subject"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Report Type</label>
                      <div className="flex gap-2 mt-2">
                        <Button
                          variant={reportType === 'text' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setReportType('text')}
                        >
                          <FileText className="w-4 h-4 mr-2" />
                          Text
                        </Button>
                        <Button
                          variant={reportType === 'audio' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setReportType('audio')}
                        >
                          <Mic className="w-4 h-4 mr-2" />
                          Audio
                        </Button>
                        <Button
                          variant={reportType === 'file' ? 'default' : 'outline'}
                          size="sm"
                          onClick={() => setReportType('file')}
                        >
                          <Upload className="w-4 h-4 mr-2" />
                          File
                        </Button>
                      </div>
                    </div>
                    <div>
                      <label className="text-sm font-medium">Report Content</label>
                      <Textarea 
                        placeholder="Write your daily report here..." 
                        rows={6}
                        value={reportContent}
                        onChange={(e) => setReportContent(e.target.value)}
                        data-testid="textarea-report-content"
                      />
                    </div>
                    <div className="flex justify-end gap-2">
                      <Button 
                        variant="outline" 
                        onClick={() => setShowNewReport(false)}
                        data-testid="button-cancel-report"
                      >
                        Cancel
                      </Button>
                      <Button 
                        onClick={handleSaveReport}
                        data-testid="button-save-report"
                        className="hover-elevate"
                      >
                        Save Report
                      </Button>
                    </div>
                  </CardContent>
                </Card>
              </div>
            )}
          </TabsContent>

          <TabsContent value="analytics" className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <Card>
                <CardHeader>
                  <h3 className="font-semibold flex items-center gap-2">
                    <BarChart3 className="w-5 h-5 text-primary" />
                    Class Performance Trends
                  </h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <span className="text-sm">This Week vs Last Week</span>
                      <Badge variant="secondary">+12% improvement</Badge>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Average Completion Rate</span>
                        <span className="font-medium">87%</span>
                      </div>
                      <Progress value={87} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Student Engagement</span>
                        <span className="font-medium">92%</span>
                      </div>
                      <Progress value={92} className="h-2" />
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Assignment Submission</span>
                        <span className="font-medium">78%</span>
                      </div>
                      <Progress value={78} className="h-2" />
                    </div>
                  </div>
                </CardContent>
              </Card>

              <Card>
                <CardHeader>
                  <h3 className="font-semibold">Weekly Activity Summary</h3>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    <div className="grid grid-cols-2 gap-4 text-center">
                      <div className="p-3 bg-accent/20 rounded-lg">
                        <div className="text-2xl font-bold text-primary">156</div>
                        <div className="text-sm text-muted-foreground">Lessons Delivered</div>
                      </div>
                      <div className="p-3 bg-accent/20 rounded-lg">
                        <div className="text-2xl font-bold text-primary">89</div>
                        <div className="text-sm text-muted-foreground">Assignments Graded</div>
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span>Most Active Day</span>
                        <span className="font-medium">Wednesday</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Peak Learning Hours</span>
                        <span className="font-medium">10 AM - 12 PM</span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span>Students Needing Support</span>
                        <span className="font-medium text-orange-600">12 students</span>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </TabsContent>

          <TabsContent value="development" className="space-y-4">
            <Card>
              <CardHeader>
                <h3 className="text-lg font-semibold">Faculty Development Courses</h3>
                <p className="text-sm text-muted-foreground">Enhance your teaching skills with professional development courses</p>
              </CardHeader>
              <CardContent>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {facultyCourses.map((course) => (
                    <div key={course.id} className="p-4 rounded-lg border hover-elevate">
                      <div className="flex justify-between items-start mb-3">
                        <div>
                          <h4 className="font-medium">{course.title}</h4>
                          <p className="text-sm text-muted-foreground mt-1">{course.description}</p>
                        </div>
                        <Badge variant="outline" className="capitalize">
                          {course.category}
                        </Badge>
                      </div>
                      
                      <div className="space-y-3">
                        <div className="flex justify-between text-sm">
                          <span>Duration: {course.duration}</span>
                          <span className="capitalize">{course.difficulty}</span>
                        </div>
                        
                        {course.enrolled && (
                          <div className="space-y-1">
                            <div className="flex justify-between text-sm">
                              <span>Progress</span>
                              <span>{course.progress}%</span>
                            </div>
                            <Progress value={course.progress} className="h-2" />
                          </div>
                        )}
                        
                        <div className="flex justify-end">
                          {course.enrolled ? (
                            course.progress === 100 ? (
                              <Badge variant="default">
                                <CheckCircle className="w-3 h-3 mr-1" />
                                Completed
                              </Badge>
                            ) : (
                              <Button size="sm" className="hover-elevate">
                                Continue
                              </Button>
                            )
                          ) : (
                            <Button 
                              size="sm" 
                              variant="outline"
                              onClick={() => handleEnrollCourse(course.id)}
                              className="hover-elevate"
                              data-testid={`button-enroll-${course.id}`}
                            >
                              Enroll Now
                            </Button>
                          )}
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
}