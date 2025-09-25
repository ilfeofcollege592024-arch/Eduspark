import Navigation from '../Navigation'

export default function NavigationExample() {
  return (
    <Navigation 
      onBack={() => console.log('Back clicked')}
      onHome={() => console.log('Home clicked')}
      showBack={true}
      showHome={true}
    />
  )
}