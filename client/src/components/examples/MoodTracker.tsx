import MoodTracker from '../MoodTracker';
import { addDays } from 'date-fns';

export default function MoodTrackerExample() {
  const mockEntries = [
    { 
      date: new Date(), 
      mood: "good" as const, 
      symptoms: [] 
    },
    { 
      date: addDays(new Date(), -1), 
      mood: "neutral" as const, 
      symptoms: ["Náusea leve"] 
    },
    { 
      date: addDays(new Date(), -2), 
      mood: "bad" as const, 
      symptoms: ["Náusea", "Fadiga"] 
    },
  ];
  
  return (
    <div className="p-6 max-w-md">
      <MoodTracker entries={mockEntries} />
    </div>
  );
}
