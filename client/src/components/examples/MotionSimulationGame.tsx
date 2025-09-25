import MotionSimulationGame from '../games/MotionSimulationGame'

export default function MotionSimulationGameExample() {
  return (
    <MotionSimulationGame 
      onBack={() => console.log('Back from motion game')}
    />
  )
}