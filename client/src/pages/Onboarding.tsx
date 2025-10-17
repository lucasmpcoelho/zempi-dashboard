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
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Pill, Heart, Utensils, Activity, ArrowLeft, Target, Calendar } from "lucide-react";

interface OnboardingData {
  name: string;
  dateOfBirth: string;
  medication: string;
  height: string;
  weight: string;
  targetWeight: string;
  treatmentStartDate: string;
  dose: string;
  bodyType: string;
  foodPreferences: string[];
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
  { 
    value: "Ectomorfo", 
    label: "Ectomorfo", 
    description: "Corpo naturalmente magro, metabolismo acelerado" 
  },
  { 
    value: "Mesomorfo", 
    label: "Mesomorfo", 
    description: "Estrutura atlética, facilidade para ganhar músculo" 
  },
  { 
    value: "Endomorfo", 
    label: "Endomorfo", 
    description: "Corpo arredondado, metabolismo mais lento" 
  },
  { 
    value: "Não sei", 
    label: "Não sei", 
    description: "Deixe a IA ajudar a identificar" 
  },
];

const foodPreferenceOptions = [
  "Low-carb (pouco carboidrato)",
  "Equilibrado",
  "Flexível",
  "Vegano",
  "Vegetariano",
  "Sem Lactose",
  "Sem Glúten",
];

const comorbidityOptions = [
  "Hipertensão",
  "DM2 (Diabetes Tipo 2)",
  "Dislipidemia",
  "DRGE (Refluxo)",
  "Pancreatite prévia",
  "Colelitíase",
  "Apneia do Sono",
  "Não sei",
  "Nenhuma",
];

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
    targetWeight: "",
    treatmentStartDate: "",
    dose: "",
    bodyType: "",
    foodPreferences: [],
    comorbidities: [],
    privacyConsent: false,
  });

  const [messages, setMessages] = useState<Array<{ text: string; isBot: boolean; hint?: string }>>([]);
  const [showOptions, setShowOptions] = useState(false);
  const [isTransitioning, setIsTransitioning] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showOptions]);

  useEffect(() => {
    if (step > 0 && step <= 13) {
      addBotMessage();
    }
  }, [step]);

  const addBotMessage = () => {
    setShowOptions(false);
    
    setTimeout(() => {
      const botMessages: Record<number, { text: string; hint?: string }> = {
        1: { 
          text: "Olá! Eu sou a Zempi AI 👋 Vamos começar! Como você se chama?" 
        },
        2: { 
          text: "Prazer em conhecer você! 😊 Qual é a sua data de nascimento?",
          hint: "Isso nos ajuda a personalizar suas recomendações por faixa etária"
        },
        3: { 
          text: "Perfeito! Qual medicamento GLP-1 você está usando? 💊",
          hint: "Cada medicamento tem protocolos específicos que vamos acompanhar"
        },
        4: { 
          text: "Ótimo! Agora me conta, qual é a sua altura? 📏" 
        },
        5: { 
          text: "Legal! E qual é o seu peso atual? ⚖️" 
        },
        6: { 
          text: "Qual é o seu peso alvo? 🎯",
          hint: "Vamos criar um plano gradual e saudável para alcançar seu objetivo"
        },
        7: { 
          text: "Quando você começou o tratamento? 📅",
          hint: "Isso nos ajuda a entender em que fase você está e ajustar as orientações"
        },
        8: { 
          text: "Estamos quase lá! Qual é a dose que você está tomando? 💉" 
        },
        9: { 
          text: "Como você descreveria seu tipo corporal? 💪",
          hint: "Seu biotipo influencia como seu corpo responde ao tratamento e quais exercícios são mais eficazes"
        },
        10: { 
          text: "Qual é a sua preferência alimentar? 🥗",
          hint: "Vamos sugerir receitas e planos que se encaixem no seu estilo"
        },
        11: { 
          text: "Você tem alguma condição de saúde que devemos saber? ❤️",
          hint: "Isso garante que todas as recomendações sejam seguras para você"
        },
        12: { 
          text: "Última etapa! Precisamos do seu consentimento para cuidar de você com segurança 🔒" 
        },
      };

      const messageData = botMessages[step];
      setMessages((prev) => [...prev, { text: messageData.text, isBot: true, hint: messageData.hint }]);
      
      setTimeout(() => {
        setShowOptions(true);
      }, 400);
    }, 300);
  };

  const handleBack = () => {
    if (step > 1) {
      // Remove last 2 messages (user answer and bot question)
      setMessages((prev) => prev.slice(0, -2));
      setStep(step - 1);
    }
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
    if (field === "targetWeight") displayValue = `${value} kg`;
    if (field === "dose") displayValue = `${value} mg`;
    if (field === "dateOfBirth" || field === "treatmentStartDate") {
      // Convert YYYY-MM-DD to DD/MM/YYYY
      const [year, month, day] = value.split("-");
      displayValue = `${day}/${month}/${year}`;
    }
    
    setMessages((prev) => [...prev, { text: displayValue, isBot: false }]);
    
    setIsTransitioning(true);
    setTimeout(() => {
      setStep(step + 1);
      setIsTransitioning(false);
    }, 600);
  };

  const handleMultiSelect = (field: "foodPreferences" | "comorbidities") => {
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
    setStep(13);
  };

  if (step === 0) {
    return <WelcomeScreen onStart={() => setStep(1)} />;
  }

  if (step === 13) {
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
          <div className="flex-1">
            <p className="font-semibold">Zempi AI</p>
            <p className="text-xs text-muted-foreground">online</p>
          </div>
          {step > 1 && (
            <Button 
              variant="ghost" 
              size="icon" 
              onClick={handleBack}
              data-testid="button-back"
            >
              <ArrowLeft className="h-5 w-5" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-2xl mx-auto px-4 py-6">
          <div className="space-y-4">
            {messages.map((msg, index) => (
              <div key={index}>
                <ChatMessage message={msg.text} isBot={msg.isBot} />
                {msg.isBot && msg.hint && (
                  <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.3 }}
                    className="text-xs text-muted-foreground mt-1 ml-2"
                  >
                    💡 {msg.hint}
                  </motion.p>
                )}
              </div>
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
                    <div className="space-y-2">
                      <ChatInput
                        type="date"
                        onSubmit={(value) => handleInputSubmit(value, "dateOfBirth")}
                        placeholder="dd/mm/aaaa"
                      />
                      <p className="text-xs text-muted-foreground ml-2">Formato: dia/mês/ano</p>
                    </div>
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
                      onSubmit={(value) => handleInputSubmit(value, "targetWeight")}
                      placeholder="Peso alvo em kg (ex: 65)"
                    />
                  )}

                  {step === 7 && (
                    <div className="space-y-2">
                      <ChatInput
                        type="date"
                        onSubmit={(value) => handleInputSubmit(value, "treatmentStartDate")}
                        placeholder="dd/mm/aaaa"
                      />
                      <p className="text-xs text-muted-foreground ml-2">Data de início do tratamento</p>
                    </div>
                  )}

                  {step === 8 && (
                    <ChatInput
                      type="number"
                      onSubmit={(value) => handleInputSubmit(value, "dose")}
                      placeholder="Dose em mg (ex: 0.5)"
                    />
                  )}

                  {step === 9 && (
                    <>
                      {bodyTypes.map((type, index) => (
                        <motion.button
                          key={type.value}
                          initial={{ opacity: 0, x: -20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ duration: 0.3, delay: index * 0.05 }}
                          onClick={() => handleOptionSelect(type.value, "bodyType")}
                          className={`
                            w-full p-4 rounded-xl border-2 text-left transition-all
                            hover-elevate active-elevate-2
                            ${
                              data.bodyType === type.value
                                ? "border-primary bg-primary/5"
                                : "border-border bg-background"
                            }
                          `}
                          data-testid={`option-${type.value.toLowerCase().replace(/\s+/g, '-')}`}
                        >
                          <div className="flex items-start gap-3">
                            <Activity className="h-5 w-5 text-primary mt-0.5 flex-shrink-0" />
                            <div className="flex-1">
                              <p className="font-medium">{type.label}</p>
                              <p className="text-sm text-muted-foreground mt-1">{type.description}</p>
                            </div>
                          </div>
                        </motion.button>
                      ))}
                    </>
                  )}

                  {step === 10 && (
                    <>
                      <div className="space-y-3">
                        {foodPreferenceOptions.map((preference) => (
                          <motion.div
                            key={preference}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="flex items-center space-x-3 p-4 rounded-xl border hover-elevate cursor-pointer"
                            onClick={() =>
                              setData({ ...data, foodPreferences: toggleArrayItem(data.foodPreferences, preference) })
                            }
                            data-testid={`option-preference-${preference.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <Checkbox
                              id={preference}
                              checked={data.foodPreferences.includes(preference)}
                              onCheckedChange={() =>
                                setData({
                                  ...data,
                                  foodPreferences: toggleArrayItem(data.foodPreferences, preference),
                                })
                              }
                            />
                            <Label htmlFor={preference} className="flex-1 cursor-pointer font-medium flex items-center gap-2">
                              <Utensils className="h-4 w-4 text-primary" />
                              {preference}
                            </Label>
                          </motion.div>
                        ))}
                      </div>
                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.3 }}
                        onClick={() => handleMultiSelect("foodPreferences")}
                        className="w-full p-4 rounded-xl bg-primary text-primary-foreground font-medium hover-elevate active-elevate-2"
                        data-testid="button-continue-preferences"
                      >
                        Continuar
                      </motion.button>
                    </>
                  )}

                  {step === 11 && (
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
                            data-testid={`option-comorbidity-${condition.toLowerCase().replace(/\s+/g, '-')}`}
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

                  {step === 12 && (
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
