import MacroCard from '../MacroCard';

export default function MacroCardExample() {
  return (
    <div className="grid grid-cols-2 gap-4 p-6 max-w-2xl">
      <MacroCard label="Proteína" current={85} target={120} unit="g" />
      <MacroCard label="Carboidratos" current={150} target={180} unit="g" />
    </div>
  );
}
