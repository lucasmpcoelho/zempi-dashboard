import SuccessScreen from '../SuccessScreen';

export default function SuccessScreenExample() {
  return (
    <SuccessScreen 
      onContinueToDashboard={() => console.log('Dashboard clicked')} 
      onContinueToWhatsApp={() => console.log('WhatsApp clicked')} 
    />
  );
}
