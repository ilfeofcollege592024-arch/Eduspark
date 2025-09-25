import Leaderboard from '../Leaderboard'

export default function LeaderboardExample() {
  return (
    <Leaderboard 
      onBack={() => console.log('Back from leaderboard')}
      onUserClick={(userId) => console.log('User clicked:', userId)}
    />
  )
}