import { createContext, useContext, useState } from "react";

type Language = "en" | "hi" | "od";

interface Translations {
  [key: string]: {
    en: string;
    hi: string;
    od: string;
  };
}

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

const translations: Translations = {
  // Navigation
  "nav.back": { en: "Back", hi: "वापस", od: "ପଛକୁ" },
  "nav.home": { en: "Home", hi: "होम", od: "ଘର" },
  "nav.logout": { en: "Logout", hi: "लॉगआउट", od: "ଲଗଆଉଟ" },
  "nav.exit": { en: "Exit", hi: "बाहर", od: "ବାହାର" },
  
  // Authentication
  "auth.login": { en: "Login", hi: "लॉगिन", od: "ଲଗଇନ" },
  "auth.email": { en: "Email", hi: "ईमेल", od: "ଇମେଲ" },
  "auth.password": { en: "Password", hi: "पासवर्ड", od: "ପାସୱାର୍ଡ" },
  "auth.student": { en: "Student", hi: "छात्र", od: "ଛାତ୍ର" },
  "auth.teacher": { en: "Teacher", hi: "शिक्षक", od: "ଶିକ୍ଷକ" },
  "auth.developer": { en: "Developer", hi: "डेवलपर", od: "ଡେଭେଲପର" },
  "auth.forgot_password": { en: "Forgot Password?", hi: "पासवर्ड भूल गए?", od: "ପାସୱାର୍ଡ ଭୁଲିଗଲେ?" },
  "auth.signup": { en: "Sign Up", hi: "साइन अप", od: "ସାଇନ ଅପ" },
  "auth.offline_access": { en: "Offline Access", hi: "ऑफलाइन एक्सेस", od: "ଅଫଲାଇନ ଆକ୍ସେସ" },
  
  // Subjects
  "subject.math": { en: "Mathematics", hi: "गणित", od: "ଗଣିତ" },
  "subject.science": { en: "Science", hi: "विज्ञान", od: "ବିଜ୍ଞାନ" },
  "subject.physics": { en: "Physics", hi: "भौतिकी", od: "ପଦାର୍ଥ ବିଜ୍ଞାନ" },
  "subject.chemistry": { en: "Chemistry", hi: "रसायन", od: "ରସାୟନ" },
  "subject.biology": { en: "Biology", hi: "जीवविज्ञान", od: "ଜୀବ ବିଜ୍ଞାନ" },
  "subject.english": { en: "English", hi: "अंग्रेजी", od: "ଇଂରାଜୀ" },
  "subject.social_science": { en: "Social Science", hi: "सामाजिक विज्ञान", od: "ସାମାଜିକ ବିଜ୍ଞାନ" },
  "subject.social_studies": { en: "Social Studies", hi: "सामाजिक अध्ययन", od: "ସାମାଜିକ ଅଧ୍ୟୟନ" },
  "subject.local_language": { en: "Local Language", hi: "स्थानीय भाषा", od: "ସ୍ଥାନୀୟ ଭାଷା" },
  "subject.hindi": { en: "Hindi", hi: "हिंदी", od: "ହିନ୍ଦୀ" },
  "subject.odia": { en: "Odia", hi: "उड़िया", od: "ଓଡ଼ିଆ" },
  
  // Actions
  "action.learn_game": { en: "Learn this as a Game", hi: "खेल के रूप में सीखें", od: "ଖେଳ ଭାବରେ ଶିଖନ୍ତୁ" },
  "action.continue": { en: "Continue", hi: "जारी रखें", od: "ଜାରି ରଖନ୍ତୁ" },
  "action.start": { en: "Start", hi: "शुरू करें", od: "ଆରମ୍ଭ କରନ୍ତୁ" },
  "action.retry": { en: "Try Again", hi: "फिर कोशिश करें", od: "ପୁଣି ଚେଷ୍ଟା କରନ୍ତୁ" },
  
  // Messages
  "msg.game_not_available": { en: "⚠️ Game not yet available for this grade. Please continue with the lesson.", hi: "⚠️ इस कक्षा के लिए खेल अभी उपलब्ध नहीं है। कृपया पाठ के साथ आगे बढ़ें।", od: "⚠️ ଏହି ଶ୍ରେଣୀ ପାଇଁ ଖେଳ ଏପର୍ଯ୍ୟନ୍ତ ଉପଲବ୍ଧ ନାହିଁ। ଦୟାକରି ପାଠ ସହିତ ଆଗକୁ ବଢ଼ନ୍ତୁ।" },
  
  // General
  "general.grade": { en: "Grade", hi: "कक्षा", od: "ଶ୍ରେଣୀ" },
  "general.progress": { en: "Progress", hi: "प्रगति", od: "ପ୍ରଗତି" },
  "general.leaderboard": { en: "Leaderboard", hi: "लीडरबोर्ड", od: "ଲିଡରବୋର୍ଡ" },
  "general.profile": { en: "Profile", hi: "प्रोफाइल", od: "ପ୍ରୋଫାଇଲ" },
  "general.xp": { en: "XP", hi: "XP", od: "XP" },
  "general.rank": { en: "Rank", hi: "रैंक", od: "ର୍ୟାଙ୍କ" },
  "general.lessons": { en: "Lessons", hi: "पाठ", od: "ପାଠ" },
  "general.units": { en: "Units", hi: "इकाइयाँ", od: "ଏକକ" },
  "general.chapters": { en: "Chapters", hi: "अध्याय", od: "ଅଧ୍ୟାୟ" },
  
  // Teacher Dashboard
  "teacher.dashboard": { en: "Teacher Dashboard", hi: "शिक्षक डैशबोर्ड", od: "ଶିକ୍ଷକ ଡ୍ୟାସବୋର୍ଡ" },
  "teacher.overview": { en: "Overview", hi: "अवलोकन", od: "ସମୀକ୍ଷା" },
  "teacher.students": { en: "Students", hi: "छात्र", od: "ଛାତ୍ର" },
  "teacher.syllabus": { en: "Syllabus", hi: "पाठ्यक्रम", od: "ପାଠ୍ୟକ୍ରମ" },
  "teacher.reports": { en: "Reports", hi: "रिपोर्ट", od: "ରିପୋର୍ଟ" },
  "teacher.analytics": { en: "Analytics", hi: "विश्लेषण", od: "ବିଶ୍ଳେଷଣ" },
  "teacher.development": { en: "Development", hi: "विकास", od: "ବିକାଶ" },
  "teacher.class_progress": { en: "Class Progress", hi: "कक्षा प्रगति", od: "ଶ୍ରେଣୀ ପ୍ରଗତି" },
  "teacher.student_reports": { en: "Student Reports", hi: "छात्र रिपोर्ट", od: "ଛାତ୍ର ରିପୋର୍ଟ" },
  "teacher.daily_reports": { en: "Daily Reports", hi: "दैनिक रिपोर्ट", od: "ଦୈନିକ ରିପୋର୍ଟ" },
  "teacher.faculty_development": { en: "Faculty Development", hi: "संकाय विकास", od: "ଅଧ୍ୟାପକ ବିକାଶ" },
  "teacher.syllabus_coverage": { en: "Syllabus Coverage", hi: "पाठ्यक्रम कवरेज", od: "ପାଠ୍ୟକ୍ରମ କଭରେଜ" },
  "teacher.active_students": { en: "Active Students", hi: "सक्रिय छात्र", od: "ସକ୍ରିୟ ଛାତ୍ର" },
  "teacher.total_students": { en: "Total Students", hi: "कुल छात्र", od: "ମୋଟ ଛାତ୍ର" },
  "teacher.avg_completion": { en: "Avg Completion", hi: "औसत पूर्णता", od: "ହାରାହାରି ସମାପ୍ତି" },
  "teacher.achievements": { en: "Achievements", hi: "उपलब्धियाँ", od: "ସଫଳତା" },
  "teacher.need_attention": { en: "Need Attention", hi: "ध्यान चाहिए", od: "ଧ୍ୟାନ ଦରକାର" },
  "teacher.online_now": { en: "Online Now", hi: "अभी ऑनलाइन", od: "ବର୍ତ୍ତମାନ ଅନଲାଇନ" },
  "teacher.performance": { en: "Performance", hi: "प्रदर्शन", od: "ପ୍ରଦର୍ଶନ" },
  "teacher.excellent": { en: "Excellent", hi: "उत्कृष्ट", od: "ଉତ୍କୃଷ୍ଟ" },
  "teacher.good": { en: "Good", hi: "अच्छा", od: "ଭଲ" },
  "teacher.average": { en: "Average", hi: "औसत", od: "ହାରାହାରି" },
  "teacher.needs_attention": { en: "Needs Attention", hi: "ध्यान चाहिए", od: "ଧ୍ୟାନ ଦରକାର" },
  "teacher.create_report": { en: "Create Report", hi: "रिपोर्ट बनाएं", od: "ରିପୋର୍ଟ ତିଆରି କରନ୍ତୁ" },
  "teacher.upload_file": { en: "Upload File", hi: "फ़ाइल अपलोड करें", od: "ଫାଇଲ ଅପଲୋଡ କରନ୍ତୁ" },
  "teacher.record_audio": { en: "Record Audio", hi: "ऑडियो रिकॉर्ड करें", od: "ଅଡିଓ ରେକର୍ଡ କରନ୍ତୁ" },
  "teacher.enroll_course": { en: "Enroll Course", hi: "कोर्स में दाखिला", od: "କୋର୍ସରେ ନାମ ଲେଖାନ୍ତୁ" },
  "teacher.continue_course": { en: "Continue Course", hi: "कोर्स जारी रखें", od: "କୋର୍ସ ଜାରି ରଖନ୍ତୁ" },
  "teacher.completed": { en: "Completed", hi: "पूर्ण", od: "ସମ୍ପୂର୍ଣ୍ଣ" },
  "teacher.pending": { en: "Pending", hi: "लंबित", od: "ବିଚାରାଧୀନ" },
  "teacher.overdue": { en: "Overdue", hi: "देर से", od: "ବିଳମ୍ବିତ" },
  "teacher.strengths": { en: "Strengths", hi: "शक्तियाँ", od: "ଶକ୍ତି" },
  "teacher.improvements": { en: "Areas for Improvement", hi: "सुधार के क्षेत्र", od: "ଉନ୍ନତିର କ୍ଷେତ୍ର" },
  "teacher.assignment_status": { en: "Assignment Status", hi: "असाइनमेंट स्थिति", od: "ଆସାଇନମେଣ୍ଟ ସ୍ଥିତି" },
  "teacher.subject_progress": { en: "Subject Progress", hi: "विषय प्रगति", od: "ବିଷୟ ପ୍ରଗତି" },
  "teacher.detailed_report": { en: "Detailed Report", hi: "विस्तृत रिपोर्ट", od: "ବିସ୍ତୃତ ରିପୋର୍ଟ" },
  "teacher.search_students": { en: "Search students...", hi: "छात्रों को खोजें...", od: "ଛାତ୍ରମାନଙ୍କୁ ଖୋଜନ୍ତୁ..." },
  "teacher.all_status": { en: "All Status", hi: "सभी स्थिति", od: "ସମସ୍ତ ସ୍ଥିତି" },
  "teacher.online": { en: "Online", hi: "ऑनलाइन", od: "ଅନଲାଇନ" },
  "teacher.offline": { en: "Offline", hi: "ऑफलाइन", od: "ଅଫଲାଇନ" },
  "teacher.away": { en: "Away", hi: "दूर", od: "ଦୂରରେ" },
};

const LanguageContext = createContext<LanguageContextType | undefined>(undefined);

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [language, setLanguage] = useState<Language>("en");

  const t = (key: string): string => {
    return translations[key]?.[language] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
}

export function useLanguage() {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
}