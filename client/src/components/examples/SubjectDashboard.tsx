import SubjectDashboard from '../SubjectDashboard'

export default function SubjectDashboardExample() {
  return (
    <SubjectDashboard 
      grade={9}
      onSubjectSelect={(subject) => console.log('Subject selected:', subject)}
      onBack={() => console.log('Back clicked')}
    />
  )
}