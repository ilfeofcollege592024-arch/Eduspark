import ProgressTracker from '../ProgressTracker'

export default function ProgressTrackerExample() {
  return (
    <ProgressTracker 
      onBack={() => console.log('Back from progress tracker')}
      onSubjectClick={(subjectId) => console.log('Subject clicked:', subjectId)}
    />
  )
}