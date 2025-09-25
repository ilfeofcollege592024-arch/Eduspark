import LessonPage from '../LessonPage'

export default function LessonPageExample() {
  return (
    <LessonPage 
      subject={{ id: "math", name: "Mathematics" }}
      grade={9}
      onBack={() => console.log('Back clicked')}
      onPlayGame={(gameType) => console.log('Game started:', gameType)}
    />
  )
}