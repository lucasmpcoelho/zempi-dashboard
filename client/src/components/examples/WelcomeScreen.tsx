import WelcomeScreen from '../WelcomeScreen';

export default function WelcomeScreenExample() {
  return <WelcomeScreen onStart={() => console.log('Start clicked')} />;
}
