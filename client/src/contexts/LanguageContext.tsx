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