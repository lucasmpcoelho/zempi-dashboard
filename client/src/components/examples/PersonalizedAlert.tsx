import PersonalizedAlert from '../PersonalizedAlert';

export default function PersonalizedAlertExample() {
  return (
    <div className="space-y-4 p-6 max-w-2xl">
      <PersonalizedAlert 
        type="warning"
        title="⚠️ Alerta de Massa Muscular"
        description="Sua ingestão de proteína está em 0.8g/kg (ideal: 1.6g/kg para GLP-1). Isso pode levar à perda muscular junto com a gordura."
        action={{
          label: "Ver recomendações",
          onClick: () => console.log('Action clicked')
        }}
      />
      
      <PersonalizedAlert 
        type="success"
        title="✅ Ótimo progresso!"
        description="Você perdeu 6.5kg em 6 semanas de forma saudável. Continue assim!"
      />
      
      <PersonalizedAlert 
        type="tip"
        title="💡 Dica personalizada"
        description="Considerando seu biotipo endomorfo, exercícios de resistência 3x por semana maximizarão seus resultados."
      />
    </div>
  );
}
