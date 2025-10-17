import DateInput from '../DateInput';

export default function DateInputExample() {
  return (
    <div className="p-6 max-w-md">
      <DateInput 
        onSubmit={(value) => console.log('Submitted:', value)} 
        placeholder="DD/MM/AAAA"
      />
    </div>
  );
}
