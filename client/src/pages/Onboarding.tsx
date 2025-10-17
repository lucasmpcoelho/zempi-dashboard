import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessage from "@/components/ChatMessage";
import ChatOption from "@/components/ChatOption";
import ChatInput from "@/components/ChatInput";
import BotAvatar from "@/components/BotAvatar";
import WelcomeScreen from "@/components/WelcomeScreen";
import SuccessScreen from "@/components/SuccessScreen";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { useToast } from "@/hooks/use-toast";
import { Pill, Heart, Utensils, Activity } from "lucide-react";

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

const medications = [
  { value: "Ozempic", label: "Ozempic" },
  { value: "Mounjaro", label: "Mounjaro" },
  { value: "Saxenda", label: "Saxenda" },
  { value: "Wegovy", label: "Wegovy" },
  { value: "Outro", label: "Outro" },
];

const bodyTypes = [
  { value: "Magro", label: "Magro" },
  { value: "Atlético", label: "Atlético" },
  { value: "Arredondado", label: "Arredondado" },
  { value: "Não sei", label: "Não sei" },
];

const foodRestrictionOptions = ["Vegano", "Vegetariano", "Sem Lactose", "Sem Glúten", "Nenhuma"];
const comorbidityOptions = ["Hipertensão", "Diabetes Tipo 2", "Apneia do Sono", "Colesterol Alto", "Nenhuma"];

interface OnboardingProps {
  onComplete: () => void;
}

export default function Onboarding({ onComplete }: OnboardingProps) {
  const [step, setStep] = useState(0);
  const { toast } = useToast();
  const messagesEndRef = useRef<HTMLDivElement>(null);
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

  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean }>>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showOptions]);

  useEffect(() => {
    if (step > 0 && step <= 10) {
      addBotMessage();
    }
  }, [step]);

  const addBotMessage = () => {
    setShowOptions(false);
    
    setTimeout(() => {
      const botMessages: Record<number, string> = {
        1: "Olá! Eu sou a Zempi AI 👋 Vamos começar! Como você se chama?",
        2: "Prazer em conhecer você! 😊 Qual é a sua data de nascimento?",
        3: "Perfeito! Qual medicamento GLP-1 você está usando? 💊",
        4: "Ótimo! Agora me conta, qual é a sua altura? 📏",
        5: "Legal! E qual é o seu peso atual? ⚖️",
        6: "Estamos quase lá! Qual é a dose que você está tomando? 💉",
        7: "Como você descreveria seu tipo corporal? 💪",
        8: "Você tem alguma restrição alimentar? 🥗",
        9: "Você tem alguma condição de saúde que devemos saber? ❤️",
        10: "Última etapa! Precisamos do seu consentimento para cuidar de você com segurança 🔒",
      };

      setMessages((prev) => [...prev, { text: botMessages[step], isBot: true }]);
      
      setTimeout(() => {
        setShowOptions(true);
      }, 400);
    }, 300);
  };

  const handleOptionSelect = (value: string, field: keyof OnboardingData) => {
    setData({ ...data, [field]: value });
    setMessages((prev) => [...prev, { text: value, isBot: false }]);
    
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(step + 1);
      setIsTransitioning(false);
    }, 600);
  };

  const handleInputSubmit = (value: string, field: keyof OnboardingData) => {
    setData({ ...data, [field]: value });
    
    let displayValue = value;
    if (field === "height") displayValue = `${value} cm`;
    if (field === "weight") displayValue = `${value} kg`;
    if (field === "dose") displayValue = `${value} mg`;
    
    setMessages((prev) => [...prev, { text: displayValue, isBot: false }]);
    
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(step + 1);
      setIsTransitioning(false);
    }, 600);
  };

  const handleMultiSelect = (field: "foodRestrictions" | "comorbidities") => {
    const selectedItems = data[field];
    const displayText = selectedItems.length > 0 ? selectedItems.join(", ") : "Nenhuma";
    setMessages((prev) => [...prev, { text: displayText, isBot: false }]);
    
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(step + 1);
      setIsTransitioning(false);
    }, 600);
  };

  const toggleArrayItem = (array: string[], item: string) => {
    if (array.includes(item)) {
      return array.filter((i) => i !== item);
    }
    return [...array, item];
  };

  const handleComplete = () => {
    console.log("Onboarding data:", data);
    toast({
      title: "Dados salvos com sucesso! 🎉",
      description: "Suas informações foram registradas de forma segura.",
    });
    setStep(11);
  };

  if (step === 0) {
    return <WelcomeScreen onStart={() => setStep(1)} />;
  }

  if (step === 11) {
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
    <div className="min-h-screen bg-background flex flex-col">
      <div className="sticky top-0 z-10 bg-background/95 backdrop-blur-sm border-b p-4">
        <div className="max-w-2xl mx-auto flex items-center gap-3">
          <BotAvatar size="sm" />
          <div>
            <p className="font-semibold">Zempi AI</p>
            <p className="text-xs text-muted-foreground">online</p>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <ChatMessage key={index} message={msg.text} isBot={msg.isBot} />
            ))}

            <AnimatePresence>
              {showOptions && !isTransitioning && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  exit={{ opacity: 0 }}
                  className="space-y-3 pt-2"
                >
                  {step === 1 && (
                    <ChatInput
                      onSubmit={(value) => handleInputSubmit(value, "name")}
                      placeholder="Digite seu nome completo..."
                    />
                  )}

                  {step === 2 && (
                    <ChatInput
                      type="date"
                      onSubmit={(value) => handleInputSubmit(value, "dateOfBirth")}
                      placeholder="dd/mm/aaaa"
                    />
                  )}

                  {step === 3 && (
                    <>
                      {medications.map((med, index) => (
                        <ChatOption
                          key={med.value}
                          label={med.label}
                          selected={data.medication === med.value}
                          onClick={() => handleOptionSelect(med.value, "medication")}
                          delay={index * 0.05}
                          icon={<Pill className="h-5 w-5" />}
                        />
                      ))}
                    </>
                  )}

                  {step === 4 && (
                    <ChatInput
                      type="number"
                      onSubmit={(value) => handleInputSubmit(value, "height")}
                      placeholder="Altura em centímetros (ex: 170)"
                    />
                  )}

                  {step === 5 && (
                    <ChatInput
                      type="number"
                      onSubmit={(value) => handleInputSubmit(value, "weight")}
                      placeholder="Peso em quilogramas (ex: 75)"
                    />
                  )}

                  {step === 6 && (
                    <ChatInput
                      type="number"
                      onSubmit={(value) => handleInputSubmit(value, "dose")}
                      placeholder="Dose em mg (ex: 0.5)"
                    />
                  )}

                  {step === 7 && (
                    <>
                      {bodyTypes.map((type, index) => (
                        <ChatOption
                          key={type.value}
                          label={type.label}
                          selected={data.bodyType === type.value}
                          onClick={() => handleOptionSelect(type.value, "bodyType")}
                          delay={index * 0.05}
                          icon={<Activity className="h-5 w-5" />}
                        />
                      ))}
                    </>
                  )}

                  {step === 8 && (
                    <>
                      <div className="space-y-3">
                        {foodRestrictionOptions.map((restriction) => (
                          <motion.div
                            key={restriction}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
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
                                setData({
                                  ...data,
                                  foodRestrictions: toggleArrayItem(data.foodRestrictions, restriction),
                                })
                              }
                            />
                            <Label htmlFor={restriction} className="flex-1 cursor-pointer font-medium flex items-center gap-2">
                              <Utensils className="h-4 w-4 text-primary" />
                              {restriction}
                            </Label>
                          </motion.div>
                        ))}
                      </div>
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        onClick={() => handleMultiSelect("foodRestrictions")}
                        className="w-full p-4 rounded-xl bg-primary text-primary-foreground font-medium hover-elevate active-elevate-2"
                        data-testid="button-continue-restrictions"
                      >
                        Continuar
                      </motion.button>
                    </>
                  )}

                  {step === 9 && (
                    <>
                      <div className="space-y-3">
                        {comorbidityOptions.map((condition) => (
                          <motion.div
                            key={condition}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
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
                            <Label htmlFor={condition} className="flex-1 cursor-pointer font-medium flex items-center gap-2">
                              <Heart className="h-4 w-4 text-primary" />
                              {condition}
                            </Label>
                          </motion.div>
                        ))}
                      </div>
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        onClick={() => handleMultiSelect("comorbidities")}
                        className="w-full p-4 rounded-xl bg-primary text-primary-foreground font-medium hover-elevate active-elevate-2"
                        data-testid="button-continue-comorbidities"
                      >
                        Continuar
                      </motion.button>
                    </>
                  )}

                  {step === 10 && (
                    <div className="space-y-4">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-6 bg-card rounded-2xl border space-y-4"
                      >
                        <p className="text-sm leading-relaxed text-muted-foreground">
                          Ao continuar, você concorda que a Zempi colete e processe suas informações de saúde para
                          fornecer acompanhamento clínico personalizado.
                        </p>
                        <ul className="space-y-2 text-sm text-muted-foreground">
                          <li>✓ Criptografia hospitalar (AES-256)</li>
                          <li>✓ Conformidade LGPD</li>
                          <li>✓ Dados no Brasil</li>
                          <li>✓ Você pode deletar a qualquer momento</li>
                        </ul>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
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
                          Eu concordo com os termos de uso e política de privacidade
                        </Label>
                      </motion.div>

                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        onClick={handleComplete}
                        disabled={!data.privacyConsent}
                        className="w-full p-4 rounded-xl bg-primary text-primary-foreground font-medium hover-elevate active-elevate-2 disabled:opacity-50 disabled:cursor-not-allowed"
                        data-testid="button-complete"
                      >
                        Finalizar e Salvar 🎉
                      </motion.button>
                    </div>
                  )}
                </motion.div>
              )}
            </AnimatePresence>

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>
    </div>
  );
}
