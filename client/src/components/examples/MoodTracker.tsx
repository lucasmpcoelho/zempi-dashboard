import MoodTracker from '../MoodTracker';
import { subDays } from 'date-fns';

export default function MoodTrackerExample() {
  const mockEntries = [
    { 
      date: new Date(), 
      mood: "good" as const, 
      symptoms: [],
      notes: "Me sentindo ótimo hoje!"
    },
    { 
      date: subDays(new Date(), 1), 
      mood: "neutral" as const, 
      symptoms: ["Náusea leve"] 
    },
    { 
      date: subDays(new Date(), 2), 
      mood: "bad" as const, 
      symptoms: ["Náusea", "Fadiga"],
      notes: "Dia difícil após a dose"
    },
    { 
      date: subDays(new Date(), 3), 
      mood: "good" as const, 
      symptoms: [] 
    },
    { 
      date: subDays(new Date(), 4), 
      mood: "neutral" as const, 
      symptoms: ["Dor de cabeça"] 
    },
  ];
  
  return (
    <div className="p-6 max-w-md">
      <MoodTracker entries={mockEntries} />
    </div>
  );
}
