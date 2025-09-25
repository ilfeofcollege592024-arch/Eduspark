import TeacherDashboard from '../TeacherDashboard'

export default function TeacherDashboardExample() {
  return (
    <TeacherDashboard 
      onBack={() => console.log('Back from teacher dashboard')}
      onMailboxOpen={() => console.log('Mailbox opened')}
    />
  )
}