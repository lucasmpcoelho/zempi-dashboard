import { Button } from "@/components/ui/button";
import { CheckCircle2 } from "lucide-react";
import successImage from "@assets/generated_images/Success_celebration_illustration_f38a7b79.png";

interface SuccessScreenProps {
  onContinueToDashboard: () => void;
  onContinueToWhatsApp: () => void;
}

export default function SuccessScreen({ onContinueToDashboard, onContinueToWhatsApp }: SuccessScreenProps) {
  return (
    <div className="flex flex-col items-center justify-center min-h-screen p-6 animate-fade-in">
      <div className="w-full max-w-2xl text-center space-y-8">
        <div className="flex justify-center">
          <CheckCircle2 className="h-20 w-20 text-primary" data-testid="icon-success" />
        </div>

        <div className="space-y-4">
          <h1 className="text-4xl md:text-5xl font-bold text-foreground">
            Perfeito!
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Suas informações foram salvas com sucesso. Agora você pode acompanhar sua jornada.
          </p>
        </div>
        
        <div className="w-full max-w-sm mx-auto">
          <img 
            src={successImage} 
            alt="Sucesso" 
            className="w-full h-auto"
            data-testid="img-success"
          />
        </div>

        <div className="space-y-3 max-w-md mx-auto">
          <Button 
            size="lg" 
            className="w-full text-base h-12"
            onClick={onContinueToDashboard}
            data-testid="button-dashboard"
          >
            Ir para o Dashboard
          </Button>
          <Button 
            variant="outline" 
            size="lg" 
            className="w-full text-base h-12"
            onClick={onContinueToWhatsApp}
            data-testid="button-whatsapp"
          >
            Continuar no WhatsApp
          </Button>
          <p className="text-sm text-muted-foreground pt-2">
            💡 Você nunca está sozinho desde o primeiro dia
          </p>
        </div>
      </div>
    </div>
  );
}
