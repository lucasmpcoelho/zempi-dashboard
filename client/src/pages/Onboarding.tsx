import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Checkbox } from "@/components/ui/checkbox";
import QuestionCard from "@/components/QuestionCard";
import ProgressBar from "@/components/ProgressBar";
import WelcomeScreen from "@/components/WelcomeScreen";
import SuccessScreen from "@/components/SuccessScreen";
import { useToast } from "@/hooks/use-toast";

interface OnboardingData {
  name: string;
  dateOfBirth: string;
  medication: string;
  height: string;
  weight: string;
  dose: string;
  bodyType: string;
  foodRestrictions: string[];
  comorbidities: string[];
  privacyConsent: boolean;
}

const medications = ["Ozempic", "Mounjaro", "Saxenda", "Wegovy", "Outro"];
const bodyTypes = ["Magro", "Atlético", "Arredondado", "Não sei"];
const foodRestrictionOptions = ["Vegano", "Vegetariano", "Sem Lactose", "Sem Glúten", "Nenhuma"];
const comorbidityOptions = ["Hipertensão", "Diabetes Tipo 2", "Apneia do Sono", "Colesterol Alto", "Nenhuma"];

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const { toast } = useToast();
  const [data, setData] = useState<OnboardingData>({
    name: "",
    dateOfBirth: "",
    medication: "",
    height: "",
    weight: "",
    dose: "",
    bodyType: "",
    foodRestrictions: [],
    comorbidities: [],
    privacyConsent: false,
  });

  const totalSteps = 10;

  const handleNext = () => {
    if (step < totalSteps) {
      setStep(step + 1);
    }
  };

  const handleBack = () => {
    if (step > 1) {
      setStep(step - 1);
    }
  };

  const handleComplete = () => {
    console.log("Onboarding data:", data);
    toast({
      title: "Dados salvos com sucesso!",
      description: "Suas informações foram registradas de forma segura.",
    });
    setStep(totalSteps + 1);
  };

  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter((i) => i !== item);
    }
    return [...array, item];
  };

  if (step === 0) {
    return <WelcomeScreen onStart={() => setStep(1)} />;
  }

  if (step === totalSteps + 1) {
    return (
      <SuccessScreen
        onContinueToDashboard={onComplete}
        onContinueToWhatsApp={() => {
          window.open("https://wa.me/", "_blank");
          onComplete();
        }}
      />
    );
  }

  return (
    <div className="min-h-screen flex flex-col items-center justify-center p-6 py-12">
      <div className="w-full max-w-md mb-8">
        <ProgressBar currentStep={step} totalSteps={totalSteps} />
      </div>

      {step === 1 && (
        <QuestionCard onBack={handleBack} showBack={false}>
          <h2 className="text-2xl font-semibold mb-2">Como você se chama?</h2>
          <p className="text-sm text-muted-foreground mb-6">Vamos começar nos conhecendo!</p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="name">Nome completo</Label>
              <Input
                id="name"
                placeholder="Digite seu nome"
                value={data.name}
                onChange={(e) => setData({ ...data, name: e.target.value })}
                className="h-14 text-base"
                data-testid="input-name"
              />
            </div>
            <Button
              className="w-full h-12"
              onClick={handleNext}
              disabled={!data.name.trim()}
              data-testid="button-continue"
            >
              Continuar
            </Button>
          </div>
        </QuestionCard>
      )}

      {step === 2 && (
        <QuestionCard onBack={handleBack}>
          <h2 className="text-2xl font-semibold mb-2">Qual é a sua data de nascimento?</h2>
          <p className="text-sm text-muted-foreground mb-6">Para personalizar seu acompanhamento</p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="dob">Data de nascimento</Label>
              <Input
                id="dob"
                type="date"
                value={data.dateOfBirth}
                onChange={(e) => setData({ ...data, dateOfBirth: e.target.value })}
                className="h-14 text-base"
                data-testid="input-dob"
              />
            </div>
            <Button
              className="w-full h-12"
              onClick={handleNext}
              disabled={!data.dateOfBirth}
              data-testid="button-continue"
            >
              Continuar
            </Button>
          </div>
        </QuestionCard>
      )}

      {step === 3 && (
        <QuestionCard onBack={handleBack}>
          <h2 className="text-2xl font-semibold mb-2">Qual medicamento você usa?</h2>
          <p className="text-sm text-muted-foreground mb-6">Selecione seu medicamento GLP-1</p>
          <div className="space-y-4">
            <RadioGroup value={data.medication} onValueChange={(value) => setData({ ...data, medication: value })}>
              <div className="grid gap-3">
                {medications.map((med) => (
                  <div
                    key={med}
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-colors cursor-pointer hover-elevate ${
                      data.medication === med ? "border-primary bg-primary/5" : "border-border"
                    }`}
                    onClick={() => setData({ ...data, medication: med })}
                    data-testid={`option-medication-${med.toLowerCase()}`}
                  >
                    <RadioGroupItem value={med} id={med} />
                    <Label htmlFor={med} className="flex-1 cursor-pointer font-medium">
                      {med}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
            <Button
              className="w-full h-12"
              onClick={handleNext}
              disabled={!data.medication}
              data-testid="button-continue"
            >
              Continuar
            </Button>
          </div>
        </QuestionCard>
      )}

      {step === 4 && (
        <QuestionCard onBack={handleBack}>
          <h2 className="text-2xl font-semibold mb-2">Qual é a sua altura?</h2>
          <p className="text-sm text-muted-foreground mb-6">Em centímetros</p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="height">Altura (cm)</Label>
              <Input
                id="height"
                type="number"
                placeholder="170"
                value={data.height}
                onChange={(e) => setData({ ...data, height: e.target.value })}
                className="h-14 text-base"
                data-testid="input-height"
              />
            </div>
            <Button
              className="w-full h-12"
              onClick={handleNext}
              disabled={!data.height || Number(data.height) <= 0}
              data-testid="button-continue"
            >
              Continuar
            </Button>
          </div>
        </QuestionCard>
      )}

      {step === 5 && (
        <QuestionCard onBack={handleBack}>
          <h2 className="text-2xl font-semibold mb-2">Qual é o seu peso atual?</h2>
          <p className="text-sm text-muted-foreground mb-6">Em quilogramas</p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="weight">Peso (kg)</Label>
              <Input
                id="weight"
                type="number"
                placeholder="75"
                value={data.weight}
                onChange={(e) => setData({ ...data, weight: e.target.value })}
                className="h-14 text-base"
                data-testid="input-weight"
              />
            </div>
            <Button
              className="w-full h-12"
              onClick={handleNext}
              disabled={!data.weight || Number(data.weight) <= 0}
              data-testid="button-continue"
            >
              Continuar
            </Button>
          </div>
        </QuestionCard>
      )}

      {step === 6 && (
        <QuestionCard onBack={handleBack}>
          <h2 className="text-2xl font-semibold mb-2">Qual é a sua dose?</h2>
          <p className="text-sm text-muted-foreground mb-6">Em miligramas (mg)</p>
          <div className="space-y-4">
            <div>
              <Label htmlFor="dose">Dose (mg)</Label>
              <Input
                id="dose"
                type="number"
                placeholder="0.5"
                step="0.1"
                value={data.dose}
                onChange={(e) => setData({ ...data, dose: e.target.value })}
                className="h-14 text-base"
                data-testid="input-dose"
              />
            </div>
            <Button
              className="w-full h-12"
              onClick={handleNext}
              disabled={!data.dose || Number(data.dose) <= 0}
              data-testid="button-continue"
            >
              Continuar
            </Button>
          </div>
        </QuestionCard>
      )}

      {step === 7 && (
        <QuestionCard onBack={handleBack}>
          <h2 className="text-2xl font-semibold mb-2">Como você descreveria seu tipo corporal?</h2>
          <p className="text-sm text-muted-foreground mb-6">Isso nos ajuda a personalizar suas orientações</p>
          <div className="space-y-4">
            <RadioGroup value={data.bodyType} onValueChange={(value) => setData({ ...data, bodyType: value })}>
              <div className="grid gap-3">
                {bodyTypes.map((type) => (
                  <div
                    key={type}
                    className={`flex items-center space-x-3 p-4 rounded-xl border-2 transition-colors cursor-pointer hover-elevate ${
                      data.bodyType === type ? "border-primary bg-primary/5" : "border-border"
                    }`}
                    onClick={() => setData({ ...data, bodyType: type })}
                    data-testid={`option-bodytype-${type.toLowerCase()}`}
                  >
                    <RadioGroupItem value={type} id={type} />
                    <Label htmlFor={type} className="flex-1 cursor-pointer font-medium">
                      {type}
                    </Label>
                  </div>
                ))}
              </div>
            </RadioGroup>
            <Button
              className="w-full h-12"
              onClick={handleNext}
              disabled={!data.bodyType}
              data-testid="button-continue"
            >
              Continuar
            </Button>
          </div>
        </QuestionCard>
      )}

      {step === 8 && (
        <QuestionCard onBack={handleBack}>
          <h2 className="text-2xl font-semibold mb-2">Você tem alguma restrição alimentar?</h2>
          <p className="text-sm text-muted-foreground mb-6">Selecione todas que se aplicam</p>
          <div className="space-y-4">
            <div className="space-y-3">
              {foodRestrictionOptions.map((restriction) => (
                <div
                  key={restriction}
                  className="flex items-center space-x-3 p-4 rounded-xl border hover-elevate cursor-pointer"
                  onClick={() =>
                    setData({ ...data, foodRestrictions: toggleArrayItem(data.foodRestrictions, restriction) })
                  }
                  data-testid={`option-restriction-${restriction.toLowerCase()}`}
                >
                  <Checkbox
                    id={restriction}
                    checked={data.foodRestrictions.includes(restriction)}
                    onCheckedChange={() =>
                      setData({ ...data, foodRestrictions: toggleArrayItem(data.foodRestrictions, restriction) })
                    }
                  />
                  <Label htmlFor={restriction} className="flex-1 cursor-pointer font-medium">
                    {restriction}
                  </Label>
                </div>
              ))}
            </div>
            <Button className="w-full h-12" onClick={handleNext} data-testid="button-continue">
              Continuar
            </Button>
          </div>
        </QuestionCard>
      )}

      {step === 9 && (
        <QuestionCard onBack={handleBack}>
          <h2 className="text-2xl font-semibold mb-2">Você tem alguma comorbidade?</h2>
          <p className="text-sm text-muted-foreground mb-6">Selecione todas que se aplicam</p>
          <div className="space-y-4">
            <div className="space-y-3">
              {comorbidityOptions.map((condition) => (
                <div
                  key={condition}
                  className="flex items-center space-x-3 p-4 rounded-xl border hover-elevate cursor-pointer"
                  onClick={() =>
                    setData({ ...data, comorbidities: toggleArrayItem(data.comorbidities, condition) })
                  }
                  data-testid={`option-comorbidity-${condition.toLowerCase()}`}
                >
                  <Checkbox
                    id={condition}
                    checked={data.comorbidities.includes(condition)}
                    onCheckedChange={() =>
                      setData({ ...data, comorbidities: toggleArrayItem(data.comorbidities, condition) })
                    }
                  />
                  <Label htmlFor={condition} className="flex-1 cursor-pointer font-medium">
                    {condition}
                  </Label>
                </div>
              ))}
            </div>
            <Button className="w-full h-12" onClick={handleNext} data-testid="button-continue">
              Continuar
            </Button>
          </div>
        </QuestionCard>
      )}

      {step === 10 && (
        <QuestionCard onBack={handleBack}>
          <h2 className="text-2xl font-semibold mb-4">Consentimento de Privacidade</h2>
          <div className="space-y-6">
            <div className="p-4 bg-muted/50 rounded-lg text-sm space-y-3">
              <p className="text-foreground leading-relaxed">
                Ao continuar, você concorda que a Zempi colete e processe suas informações de saúde para fornecer
                acompanhamento clínico personalizado.
              </p>
              <ul className="space-y-2 text-muted-foreground">
                <li>✓ Seus dados são criptografados com padrão hospitalar (AES-256)</li>
                <li>✓ Conformidade total com LGPD e regulamentações médicas</li>
                <li>✓ Seus dados permanecem no Brasil e não são compartilhados</li>
                <li>✓ Você pode solicitar exclusão a qualquer momento</li>
              </ul>
            </div>

            <div
              className="flex items-start space-x-3 p-4 rounded-xl border hover-elevate cursor-pointer"
              onClick={() => setData({ ...data, privacyConsent: !data.privacyConsent })}
              data-testid="option-consent"
            >
              <Checkbox
                id="consent"
                checked={data.privacyConsent}
                onCheckedChange={(checked) => setData({ ...data, privacyConsent: checked as boolean })}
              />
              <Label htmlFor="consent" className="cursor-pointer leading-relaxed">
                Eu concordo com os termos de uso e política de privacidade da Zempi
              </Label>
            </div>

            <Button
              className="w-full h-12"
              onClick={handleComplete}
              disabled={!data.privacyConsent}
              data-testid="button-complete"
            >
              Finalizar e Salvar
            </Button>
          </div>
        </QuestionCard>
      )}
    </div>
  );
}
