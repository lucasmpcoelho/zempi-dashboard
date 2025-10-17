import { useState } from "react";
import { Card } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Button } from "@/components/ui/button";
import MetricCard from "@/components/MetricCard";
import EducationalCard from "@/components/EducationalCard";
import { 
  Weight, 
  Ruler, 
  Syringe, 
  Calendar,
  Lightbulb,
  Apple,
  Activity,
  TrendingDown,
  MessageSquare,
  User
} from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from "recharts";
import educationalImage from "@assets/generated_images/GLP-1_mechanism_educational_diagram_01265cd8.png";

const mockWeightData = [
  { date: "Sem 1", weight: 85 },
  { date: "Sem 2", weight: 84 },
  { date: "Sem 3", weight: 82.5 },
  { date: "Sem 4", weight: 81 },
  { date: "Sem 5", weight: 80 },
  { date: "Sem 6", weight: 78.5 },
];

export default function Dashboard() {
  const [activeTab, setActiveTab] = useState("visao-geral");

  return (
    <div className="min-h-screen bg-background">
      <header className="border-b bg-card/50 backdrop-blur-sm sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 md:px-8 py-4">
          <div className="flex items-center justify-between">
            <div>
              <h1 className="text-2xl font-bold">Zempi</h1>
              <p className="text-sm text-muted-foreground">Olá, Maria! 👋</p>
            </div>
            <Button variant="outline" size="icon" data-testid="button-profile">
              <User className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 md:px-8 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="space-y-8">
          <TabsList className="grid w-full grid-cols-3 md:w-auto md:inline-grid" data-testid="tabs-navigation">
            <TabsTrigger value="visao-geral" data-testid="tab-overview">Visão Geral</TabsTrigger>
            <TabsTrigger value="educacao" data-testid="tab-education">Educação</TabsTrigger>
            <TabsTrigger value="perfil" data-testid="tab-profile">Perfil</TabsTrigger>
          </TabsList>

          <TabsContent value="visao-geral" className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Suas Métricas</h2>
              <p className="text-muted-foreground mb-6">Acompanhe seu progresso em tempo real</p>
              
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <MetricCard icon={Weight} label="Peso Atual" value="78.5 kg" />
                <MetricCard icon={Ruler} label="Altura" value="165 cm" />
                <MetricCard icon={Syringe} label="Dose Atual" value="1.0 mg" />
                <MetricCard icon={Calendar} label="Dias de Tratamento" value="42" />
              </div>
            </div>

            <Card className="p-6">
              <div className="flex items-center justify-between mb-6">
                <div>
                  <h3 className="text-xl font-semibold">Evolução de Peso</h3>
                  <p className="text-sm text-muted-foreground">Últimas 6 semanas</p>
                </div>
                <div className="flex items-center gap-2 text-chart-2">
                  <TrendingDown className="h-5 w-5" />
                  <span className="font-semibold">-6.5 kg</span>
                </div>
              </div>
              
              <div className="h-64" data-testid="chart-weight">
                <ResponsiveContainer width="100%" height="100%">
                  <LineChart data={mockWeightData}>
                    <CartesianGrid strokeDasharray="3 3" className="stroke-border" />
                    <XAxis 
                      dataKey="date" 
                      className="text-xs"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <YAxis 
                      domain={[75, 90]}
                      className="text-xs"
                      tick={{ fill: "hsl(var(--muted-foreground))" }}
                    />
                    <Tooltip 
                      contentStyle={{
                        backgroundColor: "hsl(var(--card))",
                        border: "1px solid hsl(var(--border))",
                        borderRadius: "6px"
                      }}
                    />
                    <Line 
                      type="monotone" 
                      dataKey="weight" 
                      stroke="hsl(var(--chart-1))" 
                      strokeWidth={3}
                      dot={{ fill: "hsl(var(--chart-1))", r: 5 }}
                    />
                  </LineChart>
                </ResponsiveContainer>
              </div>
            </Card>

            <div>
              <h3 className="text-xl font-semibold mb-4">Dicas Personalizadas</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <EducationalCard
                  icon={Apple}
                  title="Nutrição Balanceada"
                  description="Aumente sua ingestão de proteínas para 1.6g/kg para preservar massa muscular durante a perda de peso."
                />
                <EducationalCard
                  icon={Activity}
                  title="Atividade Física"
                  description="Exercícios de resistência 3x por semana ajudam a manter a massa magra enquanto você perde gordura."
                />
              </div>
            </div>

            <Card className="p-6 bg-primary/5 border-primary/20">
              <div className="flex items-start gap-4">
                <div className="p-3 rounded-full bg-primary/10 text-primary">
                  <MessageSquare className="h-6 w-6" />
                </div>
                <div className="flex-1">
                  <h3 className="font-semibold mb-2">Suporte 24/7 via WhatsApp</h3>
                  <p className="text-sm text-muted-foreground mb-4">
                    Tem alguma dúvida ou efeito colateral? Nossa equipe está sempre disponível para ajudar.
                  </p>
                  <Button data-testid="button-whatsapp-support">
                    Falar com Suporte
                  </Button>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="educacao" className="space-y-8 animate-fade-in">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Entenda seu Tratamento</h2>
              <p className="text-muted-foreground mb-6">Aprenda sobre GLP-1 e como otimizar seus resultados</p>
            </div>

            <Card className="overflow-hidden">
              <div className="p-6 space-y-4">
                <h3 className="text-xl font-semibold">O que é GLP-1?</h3>
                <div className="w-full max-w-2xl mx-auto">
                  <img 
                    src={educationalImage} 
                    alt="Mecanismo GLP-1" 
                    className="w-full h-auto rounded-lg"
                    data-testid="img-glp1-mechanism"
                  />
                </div>
                <div className="prose prose-sm max-w-none">
                  <p className="text-muted-foreground leading-relaxed">
                    GLP-1 (Glucagon-Like Peptide-1) é um hormônio natural que seu corpo produz. Medicamentos como 
                    Ozempic e Mounjaro imitam este hormônio para ajudar a controlar o apetite, melhorar o controle 
                    de açúcar no sangue e promover perda de peso sustentável.
                  </p>
                </div>
              </div>
            </Card>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <EducationalCard
                icon={Lightbulb}
                title="Redução de Efeitos Colaterais"
                description="Náusea é comum no início. Coma porções menores, evite alimentos gordurosos e mantenha-se hidratado. 80% dos pacientes veem melhora após 2-3 semanas."
              />
              <EducationalCard
                icon={Apple}
                title="Alimentação Inteligente"
                description="Divida sua proteína ao longo do dia. Alvo: 1.6g/kg de peso corporal para preservar massa muscular enquanto perde gordura."
              />
              <EducationalCard
                icon={Activity}
                title="Importância do Exercício"
                description="Exercícios de resistência são essenciais. Eles preservam músculo durante a perda de peso, melhorando sua composição corporal final."
              />
              <EducationalCard
                icon={Calendar}
                title="Paciência no Processo"
                description="Resultados sustentáveis levam tempo. Foque em mudanças de hábitos, não apenas no número da balança. A jornada média é de 6+ meses."
              />
            </div>

            <Card className="p-6">
              <h3 className="text-xl font-semibold mb-4">Perguntas Frequentes</h3>
              <div className="space-y-4">
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Por quanto tempo devo usar GLP-1?</h4>
                  <p className="text-sm text-muted-foreground">
                    A duração varia por pessoa. Muitos pacientes usam por 6-12 meses ou mais, com supervisão médica 
                    contínua para ajustar doses e avaliar progresso.
                  </p>
                </div>
                <div className="p-4 bg-muted/50 rounded-lg">
                  <h4 className="font-semibold mb-2">Vou recuperar o peso depois de parar?</h4>
                  <p className="text-sm text-muted-foreground">
                    Manter hábitos saudáveis é fundamental. O Zempi ajuda você a construir uma rotina sustentável 
                    que continua funcionando mesmo após o tratamento.
                  </p>
                </div>
              </div>
            </Card>
          </TabsContent>

          <TabsContent value="perfil" className="space-y-6 animate-fade-in">
            <div>
              <h2 className="text-2xl font-semibold mb-2">Meu Perfil</h2>
              <p className="text-muted-foreground mb-6">Suas informações pessoais e de tratamento</p>
            </div>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Informações Pessoais</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Nome</p>
                  <p className="font-medium" data-testid="text-profile-name">Maria Costa</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Idade</p>
                  <p className="font-medium" data-testid="text-profile-age">42 anos</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Altura</p>
                  <p className="font-medium font-mono" data-testid="text-profile-height">165 cm</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Peso Inicial</p>
                  <p className="font-medium font-mono" data-testid="text-profile-initial-weight">85 kg</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Detalhes do Tratamento</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Medicamento</p>
                  <p className="font-medium" data-testid="text-profile-medication">Ozempic</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Dose Atual</p>
                  <p className="font-medium font-mono" data-testid="text-profile-dose">1.0 mg</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Tipo Corporal</p>
                  <p className="font-medium" data-testid="text-profile-bodytype">Arredondado</p>
                </div>
                <div>
                  <p className="text-sm text-muted-foreground mb-1">Início do Tratamento</p>
                  <p className="font-medium" data-testid="text-profile-start-date">15 de Agosto, 2024</p>
                </div>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Restrições Alimentares</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-primary/10 text-primary rounded-full text-sm" data-testid="badge-restriction">
                  Sem Lactose
                </span>
              </div>
            </Card>

            <Card className="p-6">
              <h3 className="text-lg font-semibold mb-4">Comorbidades</h3>
              <div className="flex flex-wrap gap-2">
                <span className="px-3 py-1 bg-chart-3/10 text-chart-3 rounded-full text-sm" data-testid="badge-comorbidity">
                  Hipertensão
                </span>
              </div>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
