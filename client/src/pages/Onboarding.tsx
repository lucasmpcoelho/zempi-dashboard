import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import ChatMessage from "@/components/ChatMessage";
import ChatOption from "@/components/ChatOption";
import ChatInput from "@/components/ChatInput";
import DateInput from "@/components/DateInput";
import BotAvatar from "@/components/BotAvatar";
import WelcomeScreen from "@/components/WelcomeScreen";
import SuccessScreen from "@/components/SuccessScreen";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { useToast } from "@/hooks/use-toast";
import { Pill, Heart, Utensils, Activity, ArrowLeft } from "lucide-react";
import { useMutation } from "@tanstack/react-query";
import { apiRequest } from "@/lib/queryClient";

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
  "Como de tudo",
  "Low-carb",
  "Equilibrado",
  "Flexível",
  "Vegano",
  "Vegetariano",
  "Sem Lactose",
  "Sem Glúten",
];

const comorbidityOptions = [
  "Hipertensão",
  "DM2",
  "Dislipidemia",
  "DRGE",
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
  const [isGoingBack, setIsGoingBack] = useState(false);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, showOptions]);

  useEffect(() => {
    if (step > 0 && step <= 12 && !isGoingBack) {
      addBotMessage();
    }
    if (isGoingBack) {
      setIsGoingBack(false);
      setShowOptions(true);
    }
  }, [step]);

  const addBotMessage = () => {
    setShowOptions(false);
    
    setTimeout(() => {
      const botMessages: Record<number, { text: string; hint?: string }> = {
        1: { 
          text: "Olá! Eu sou a Zempi 🌱 Vamos começar! Como você se chama?" 
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
          text: "Estamos quase lá! Qual é a dose que você está tomando? 💉" 
        },
        5: { 
          text: "Ótimo! Agora me conta, qual é a sua altura? 📏" 
        },
        6: { 
          text: "Legal! E qual é o seu peso atual? ⚖️" 
        },
        7: { 
          text: "Qual é o seu peso alvo? 🎯",
          hint: "Vamos criar um plano gradual e saudável para alcançar seu objetivo"
        },
        8: { 
          text: "Quando você começou o tratamento? 📅",
          hint: "Isso nos ajuda a entender em que fase você está e ajustar as orientações"
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
      setShowOptions(false);
      setIsTransitioning(true);
      setIsGoingBack(true);
      
      setTimeout(() => {
        // Remove last 2 messages (bot question + user answer)
        setMessages((prev) => prev.slice(0, -2));
        setStep(step - 1);
        setIsTransitioning(false);
      }, 200);
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

  const saveMutation = useMutation({
    mutationFn: async (profileData: any) => {
      const response = await apiRequest("POST", "/api/profile", profileData);
      return await response.json();
    },
    onSuccess: () => {
      toast({
        title: "Dados salvos com sucesso! 🎉",
        description: "Suas informações foram registradas de forma segura.",
      });
      setStep(13);
    },
    onError: (error: any) => {
      toast({
        title: "Erro ao salvar dados",
        description: error.message || "Tente novamente mais tarde.",
        variant: "destructive",
      });
    },
  });

  const handleComplete = () => {
    // Don't include userId in the request - server will inject it
    const profileData = {
      name: data.name,
      dateOfBirth: data.dateOfBirth,
      medication: data.medication,
      height: parseFloat(data.height),
      weight: parseFloat(data.weight),
      targetWeight: parseFloat(data.targetWeight),
      treatmentStartDate: data.treatmentStartDate,
      dose: data.dose,
      bodyType: data.bodyType,
      foodPreferences: data.foodPreferences,
      comorbidities: data.comorbidities,
    };

    saveMutation.mutate(profileData);
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
            <p className="font-semibold">Zempi 🌱</p>
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
                  className="space-y-2 pt-2"
                >
                  {step === 1 && (
                    <ChatInput
                      onSubmit={(value) => handleInputSubmit(value, "name")}
                      placeholder="Digite seu nome completo..."
                    />
                  )}

                  {step === 2 && (
                    <DateInput
                      onSubmit={(value) => handleInputSubmit(value, "dateOfBirth")}
                      placeholder="DD/MM/AAAA"
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
                          delay={index * 0.04}
                          icon={<Pill className="h-4 w-4" />}
                        />
                      ))}
                    </>
                  )}

                  {step === 4 && (
                    <ChatInput
                      type="number"
                      onSubmit={(value) => handleInputSubmit(value, "dose")}
                      placeholder="Dose em mg (ex: 0.5)"
                    />
                  )}

                  {step === 5 && (
                    <ChatInput
                      type="number"
                      onSubmit={(value) => handleInputSubmit(value, "height")}
                      placeholder="Altura em centímetros (ex: 170)"
                    />
                  )}

                  {step === 6 && (
                    <ChatInput
                      type="number"
                      onSubmit={(value) => handleInputSubmit(value, "weight")}
                      placeholder="Peso em quilogramas (ex: 75)"
                    />
                  )}

                  {step === 7 && (
                    <ChatInput
                      type="number"
                      onSubmit={(value) => handleInputSubmit(value, "targetWeight")}
                      placeholder="Peso alvo em kg (ex: 65)"
                    />
                  )}

                  {step === 8 && (
                    <DateInput
                      onSubmit={(value) => handleInputSubmit(value, "treatmentStartDate")}
                      placeholder="DD/MM/AAAA"
                    />
                  )}

                  {step === 9 && (
                    <>
                      {bodyTypes.map((type, index) => (
                        <ChatOption
                          key={type.value}
                          label={type.label}
                          description={type.description}
                          selected={data.bodyType === type.value}
                          onClick={() => handleOptionSelect(type.value, "bodyType")}
                          delay={index * 0.04}
                          icon={<Activity className="h-4 w-4" />}
                        />
                      ))}
                    </>
                  )}

                  {step === 10 && (
                    <>
                      <div className="space-y-2">
                        {foodPreferenceOptions.map((preference, index) => (
                          <motion.div
                            key={preference}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className="flex items-center space-x-2 px-3 py-2 rounded-lg border hover-elevate"
                            data-testid={`option-preference-${preference.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <Checkbox
                              id={preference}
                              checked={data.foodPreferences.includes(preference)}
                              onCheckedChange={(checked) => {
                                const newPreferences = checked
                                  ? [...data.foodPreferences, preference]
                                  : data.foodPreferences.filter(p => p !== preference);
                                setData({ ...data, foodPreferences: newPreferences });
                              }}
                            />
                            <Label htmlFor={preference} className="flex-1 cursor-pointer text-sm flex items-center gap-2">
                              <Utensils className="h-3.5 w-3.5 text-primary" />
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
                        className="w-full py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover-elevate active-elevate-2"
                        data-testid="button-continue-preferences"
                      >
                        Continuar
                      </motion.button>
                    </>
                  )}

                  {step === 11 && (
                    <>
                      <div className="space-y-2">
                        {comorbidityOptions.map((condition, index) => (
                          <motion.div
                            key={condition}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.03 }}
                            className="flex items-center space-x-2 px-3 py-2 rounded-lg border hover-elevate"
                            data-testid={`option-comorbidity-${condition.toLowerCase().replace(/\s+/g, '-')}`}
                          >
                            <Checkbox
                              id={condition}
                              checked={data.comorbidities.includes(condition)}
                              onCheckedChange={(checked) => {
                                const newComorbidities = checked
                                  ? [...data.comorbidities, condition]
                                  : data.comorbidities.filter(c => c !== condition);
                                setData({ ...data, comorbidities: newComorbidities });
                              }}
                            />
                            <Label htmlFor={condition} className="flex-1 cursor-pointer text-sm flex items-center gap-2">
                              <Heart className="h-3.5 w-3.5 text-primary" />
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
                        className="w-full py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover-elevate active-elevate-2"
                        data-testid="button-continue-comorbidities"
                      >
                        Continuar
                      </motion.button>
                    </>
                  )}

                  {step === 12 && (
                    <div className="space-y-3">
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="p-4 bg-card rounded-xl border space-y-3"
                      >
                        <h3 className="font-semibold text-sm">Consentimento e Privacidade</h3>
                        
                        <div className="space-y-2 text-xs leading-relaxed text-muted-foreground">
                          <p>
                            <strong className="text-foreground">Uso dos dados:</strong> As informações fornecidas serão utilizadas exclusivamente para personalizar sua experiência e fornecer orientações adequadas ao seu tratamento com GLP-1.
                          </p>
                          
                          <p>
                            <strong className="text-foreground">Privacidade:</strong> Seus dados são protegidos e não serão compartilhados com terceiros sem seu consentimento explícito.
                          </p>
                          
                          <p>
                            <strong className="text-foreground">Finalidade educativa:</strong> Este aplicativo tem finalidade educativa e não substitui consultas médicas ou orientações profissionais.
                          </p>
                          
                          <p>
                            <strong className="text-foreground">Responsabilidade:</strong> Em caso de sintomas graves ou dúvidas sobre seu tratamento, procure sempre orientação médica presencial.
                          </p>
                        </div>
                      </motion.div>

                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="flex items-start space-x-2 px-3 py-2.5 rounded-lg border hover-elevate cursor-pointer"
                        onClick={() => setData({ ...data, privacyConsent: !data.privacyConsent })}
                        data-testid="option-consent"
                      >
                        <Checkbox
                          id="consent"
                          checked={data.privacyConsent}
                          onCheckedChange={(checked) => setData({ ...data, privacyConsent: checked as boolean })}
                        />
                        <Label htmlFor="consent" className="cursor-pointer text-xs leading-relaxed">
                          Confirmo que li e concordo com os termos acima. Autorizo o uso das minhas informações para personalização do meu acompanhamento e entendo que este aplicativo tem finalidade educativa.
                        </Label>
                      </motion.div>

                      <motion.button
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ delay: 0.4 }}
                        onClick={handleComplete}
                        disabled={!data.privacyConsent}
                        className="w-full py-3 rounded-lg bg-primary text-primary-foreground text-sm font-medium hover-elevate active-elevate-2 disabled:opacity-50 disabled:cursor-not-allowed"
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
