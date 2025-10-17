import { Button } from "@/components/ui/button";
import welcomeImage from "@assets/generated_images/Medical_professional_welcome_illustration_07363990.png";

interface WelcomeScreenProps {
  onStart: () => void;
}

export default function WelcomeScreen({ onStart }: WelcomeScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fade-in">
      <div className="w-full max-w-2xl text-center space-y-8">
        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Bem-vindo ao Zempi
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Seu acompanhamento clínico contínuo para tratamento com GLP-1. 
            Vamos conhecer você em apenas alguns minutos.
          </p>
        </div>
        
        <div className="w-full max-w-md mx-auto rounded-2xl overflow-hidden">
          <img 
            src={welcomeImage} 
            alt="Profissional médico" 
            className="w-full h-auto"
            data-testid="img-welcome"
          />
        </div>

        <div className="space-y-3">
          <Button 
            size="lg" 
            className="w-full max-w-xs text-base h-12"
            onClick={onStart}
            data-testid="button-start"
          >
            Começar Agora
          </Button>
          <p className="text-sm text-muted-foreground">
            Levará apenas 5 minutos • Totalmente seguro
          </p>
        </div>
      </div>
    </div>
  );
}
