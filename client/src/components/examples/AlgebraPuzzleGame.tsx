import AlgebraPuzzleGame from '../games/AlgebraPuzzleGame'

export default function AlgebraPuzzleGameExample() {
  return (
    <AlgebraPuzzleGame 
      onBack={() => console.log('Back from algebra game')}
    />
  )
}