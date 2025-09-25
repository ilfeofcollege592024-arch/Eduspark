import { useState } from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Card, CardHeader, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Navigation from "./Navigation";
import { Mail, Send, Star, Building, GraduationCap, Search } from "lucide-react";

interface ScholarshipMail {
  id: string;
  from: string;
  company: string;
  subject: string;
  content: string;
  criteria: string[];
  deadline: string;
  amount: string;
  unread: boolean;
  starred: boolean;
  timestamp: string;
}

interface MailBoxProps {
  onBack: () => void;
}

export default function MailBox({ onBack }: MailBoxProps) {
  const { t } = useLanguage();
  const [selectedMail, setSelectedMail] = useState<ScholarshipMail | null>(null);
  const [searchTerm, setSearchTerm] = useState("");
  const [showCompose, setShowCompose] = useState(false);

  // Mock scholarship mails from NGOs and corporates
  const scholarshipMails: ScholarshipMail[] = [
    {
      id: "1",
      from: "scholarship@tata.com",
      company: "Tata Trust",
      subject: "Rural Education Scholarship Program 2024",
      content: "We are pleased to announce our Rural Education Scholarship Program for bright students from rural schools. This scholarship covers full tuition fees and provides a monthly stipend for deserving students.",
      criteria: ["Grade 9-12 students", "Rural school background", "Minimum 85% marks", "Family income < ₹3 lakhs"],
      deadline: "March 15, 2024",
      amount: "₹50,000 per year",
      unread: true,
      starred: false,
      timestamp: "2 hours ago"
    },
    {
      id: "2", 
      from: "education@infosys.org",
      company: "Infosys Foundation",
      subject: "STEM Excellence Scholarship",
      content: "The Infosys Foundation is offering scholarships to exceptional students pursuing STEM education. We are looking for students with strong performance in Mathematics and Science.",
      criteria: ["Grades 10-12", "STEM subjects excellence", "Leadership qualities", "Innovation projects"],
      deadline: "April 10, 2024", 
      amount: "₹75,000 per year",
      unread: true,
      starred: true,
      timestamp: "1 day ago"
    },
    {
      id: "3",
      from: "scholars@azimpremiifoundation.org", 
      company: "Azim Premji Foundation",
      subject: "Merit Scholarship for Underprivileged Students",
      content: "Our foundation supports bright students from underprivileged backgrounds to pursue quality education. This scholarship includes mentorship and career guidance.",
      criteria: ["Financial need", "Academic excellence", "Community involvement", "Leadership potential"],
      deadline: "February 28, 2024",
      amount: "₹40,000 per year",
      unread: false,
      starred: false,
      timestamp: "3 days ago"
    },
    {
      id: "4",
      from: "education@reliance.com",
      company: "Reliance Foundation",
      subject: "Digital Learning Scholarship",
      content: "Empowering rural students with digital learning opportunities. This scholarship includes access to online learning platforms and technology resources.",
      criteria: ["Rural background", "Digital literacy interest", "Grades 8-12", "Teacher recommendation"],
      deadline: "March 30, 2024",
      amount: "₹60,000 + Tech Kit",
      unread: false,
      starred: true,
      timestamp: "5 days ago"
    }
  ];

  const handleMailClick = (mail: ScholarshipMail) => {
    console.log("Mail opened:", mail.subject);
    setSelectedMail(mail);
    // Mark as read
  };

  const handleStarToggle = (mailId: string) => {
    console.log("Star toggled for mail:", mailId);
    // In real app, would update star status
  };

  const handleRecommendStudent = (mailId: string) => {
    console.log("Recommend student for scholarship:", mailId);
    setShowCompose(true);
    // In real app, would open student recommendation form
  };

  const handleApplyScholarship = (mailId: string) => {
    console.log("Apply for scholarship:", mailId);
    // In real app, would redirect to application form
  };

  const filteredMails = scholarshipMails.filter(mail =>
    mail.subject.toLowerCase().includes(searchTerm.toLowerCase()) ||
    mail.company.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-background">
      <Navigation onBack={onBack} />
      
      <div className="container mx-auto px-4 py-6">
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground mb-2 flex items-center gap-2">
            <Mail className="w-6 h-6 text-primary" />
            Teacher Mailbox
          </h1>
          <p className="text-muted-foreground">
            Scholarship opportunities and student recommendations
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Mail List */}
          <div className="lg:col-span-1">
            <Card>
              <CardHeader className="pb-3">
                <div className="flex items-center gap-2">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                    <Input
                      placeholder="Search scholarships..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="pl-9"
                      data-testid="input-search-mail"
                    />
                  </div>
                </div>
              </CardHeader>
              <CardContent className="p-0">
                <div className="space-y-1">
                  {filteredMails.map((mail) => (
                    <div
                      key={mail.id}
                      className={`p-3 cursor-pointer hover-elevate border-b last:border-b-0 ${
                        selectedMail?.id === mail.id ? 'bg-accent' : ''
                      } ${mail.unread ? 'bg-accent/20' : ''}`}
                      onClick={() => handleMailClick(mail)}
                      data-testid={`mail-${mail.id}`}
                    >
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center gap-2">
                          <Building className="w-4 h-4 text-muted-foreground" />
                          <span className="font-medium text-sm">{mail.company}</span>
                          {mail.unread && (
                            <Badge variant="secondary" className="text-xs">New</Badge>
                          )}
                        </div>
                        <Button
                          variant="ghost"
                          size="icon"
                          onClick={(e) => {
                            e.stopPropagation();
                            handleStarToggle(mail.id);
                          }}
                          className="w-6 h-6 p-0 hover-elevate"
                          data-testid={`button-star-${mail.id}`}
                        >
                          <Star className={`w-3 h-3 ${mail.starred ? 'fill-current text-yellow-500' : ''}`} />
                        </Button>
                      </div>
                      <h4 className="font-medium text-sm mb-1 line-clamp-2">
                        {mail.subject}
                      </h4>
                      <div className="flex items-center justify-between text-xs text-muted-foreground">
                        <span>{mail.amount}</span>
                        <span>{mail.timestamp}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </CardContent>
            </Card>
          </div>

          {/* Mail Content */}
          <div className="lg:col-span-2">
            {selectedMail ? (
              <Card>
                <CardHeader>
                  <div className="flex items-center justify-between">
                    <div>
                      <h2 className="text-xl font-bold mb-1">{selectedMail.subject}</h2>
                      <p className="text-sm text-muted-foreground">
                        From: {selectedMail.company} • {selectedMail.timestamp}
                      </p>
                    </div>
                    <div className="flex gap-2">
                      <Badge variant="secondary">{selectedMail.amount}</Badge>
                      <Badge variant="outline">Due: {selectedMail.deadline}</Badge>
                    </div>
                  </div>
                </CardHeader>
                <CardContent className="space-y-6">
                  <div className="prose max-w-none">
                    <p className="text-card-foreground leading-relaxed">
                      {selectedMail.content}
                    </p>
                  </div>

                  <div>
                    <h3 className="font-semibold mb-3">Eligibility Criteria:</h3>
                    <ul className="space-y-2">
                      {selectedMail.criteria.map((criterion, index) => (
                        <li key={index} className="flex items-center gap-2">
                          <GraduationCap className="w-4 h-4 text-primary" />
                          <span className="text-sm">{criterion}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <Alert>
                    <AlertDescription>
                      <strong>Deadline:</strong> {selectedMail.deadline} • 
                      <strong> Scholarship Amount:</strong> {selectedMail.amount}
                    </AlertDescription>
                  </Alert>

                  <div className="flex gap-3">
                    <Button
                      onClick={() => handleRecommendStudent(selectedMail.id)}
                      className="hover-elevate"
                      data-testid="button-recommend-student"
                    >
                      <Send className="w-4 h-4 mr-2" />
                      Recommend Student
                    </Button>
                    <Button
                      variant="outline"
                      onClick={() => handleApplyScholarship(selectedMail.id)}
                      className="hover-elevate"
                      data-testid="button-apply-scholarship"
                    >
                      <GraduationCap className="w-4 h-4 mr-2" />
                      View Application
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ) : (
              <Card>
                <CardContent className="flex items-center justify-center h-96">
                  <div className="text-center text-muted-foreground">
                    <Mail className="w-12 h-12 mx-auto mb-4 opacity-50" />
                    <p>Select a scholarship opportunity to view details</p>
                  </div>
                </CardContent>
              </Card>
            )}
          </div>
        </div>

        {/* Student Recommendation Modal */}
        {showCompose && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <Card className="w-full max-w-md">
              <CardHeader>
                <h3 className="font-bold">Recommend Student for Scholarship</h3>
              </CardHeader>
              <CardContent className="space-y-4">
                <div>
                  <label className="text-sm font-medium">Student Name</label>
                  <Input placeholder="Enter student name" data-testid="input-student-name" />
                </div>
                <div>
                  <label className="text-sm font-medium">Grade & Performance</label>
                  <Input placeholder="Grade 9, 92% average" data-testid="input-student-grade" />
                </div>
                <div>
                  <label className="text-sm font-medium">Recommendation Letter</label>
                  <Textarea 
                    placeholder="Write your recommendation..." 
                    rows={4}
                    data-testid="textarea-recommendation"
                  />
                </div>
                <div className="flex justify-end gap-2">
                  <Button 
                    variant="outline" 
                    onClick={() => setShowCompose(false)}
                    data-testid="button-cancel-recommendation"
                  >
                    Cancel
                  </Button>
                  <Button 
                    onClick={() => {
                      console.log("Student recommendation submitted");
                      setShowCompose(false);
                    }}
                    data-testid="button-submit-recommendation"
                    className="hover-elevate"
                  >
                    <Send className="w-4 h-4 mr-2" />
                    Submit
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        )}
      </div>
    </div>
  );
}