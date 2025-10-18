import MedicationTracker from '../MedicationTracker';
import { addDays } from 'date-fns';

export default function MedicationTrackerExample() {
  const mockDoses = [
    { date: addDays(new Date(), 7), completed: false, dose: "1.0 mg" },
    { date: new Date(), completed: false, dose: "1.0 mg" },
    { date: addDays(new Date(), -7), completed: true, dose: "1.0 mg" },
    { date: addDays(new Date(), -14), completed: true, dose: "0.5 mg" },
  ];
  
  return (
    <div className="p-6 max-w-md">
      <MedicationTracker doses={mockDoses} />
    </div>
  );
}
