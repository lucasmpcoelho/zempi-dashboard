import QuestionCard from '../QuestionCard';

export default function QuestionCardExample() {
  return (
    <QuestionCard onBack={() => console.log('Back clicked')} showBack={true}>
      <h2 className="text-2xl font-semibold mb-4">Exemplo de Pergunta</h2>
      <p className="text-muted-foreground">Conteúdo do card aqui</p>
    </QuestionCard>
  );
}
