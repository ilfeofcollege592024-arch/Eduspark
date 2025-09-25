import MailBox from '../MailBox'

export default function MailBoxExample() {
  return (
    <MailBox 
      onBack={() => console.log('Back from mailbox')}
    />
  )
}