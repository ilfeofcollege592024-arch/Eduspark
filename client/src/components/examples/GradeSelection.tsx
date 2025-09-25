import GradeSelection from '../GradeSelection'

export default function GradeSelectionExample() {
  return (
    <GradeSelection 
      onGradeSelect={(grade) => console.log('Grade selected:', grade)}
    />
  )
}