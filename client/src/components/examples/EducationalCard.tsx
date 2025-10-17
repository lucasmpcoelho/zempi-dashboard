import EducationalCard from '../EducationalCard';
import { Lightbulb } from 'lucide-react';

export default function EducationalCardExample() {
  return (
    <EducationalCard 
      icon={Lightbulb} 
      title="Dica do Dia" 
      description="Mantenha-se hidratado durante todo o dia para minimizar efeitos colaterais."
    />
  );
}
