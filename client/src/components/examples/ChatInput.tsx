import ChatInput from '../ChatInput';

export default function ChatInputExample() {
  return (
    <div className="p-6 max-w-md">
      <ChatInput 
        onSubmit={(value) => console.log('Submitted:', value)} 
        placeholder="Digite seu nome..."
      />
    </div>
  );
}
