import Onboarding from '../../pages/Onboarding';
import { TooltipProvider } from "@/components/ui/tooltip";
import { Toaster } from "@/components/ui/toaster";

export default function OnboardingExample() {
  return (
    <TooltipProvider>
      <Onboarding onComplete={() => console.log('Onboarding completed')} />
      <Toaster />
    </TooltipProvider>
  );
}
