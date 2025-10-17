import ChatMessage from '../ChatMessage';

export default function ChatMessageExample() {
  return (
    <div className="space-y-4 p-6 max-w-md">
      <ChatMessage message="Olá! Eu sou a Zempi 🌱" isBot={true} />
      <ChatMessage message="Olá!" isBot={false} />
    </div>
  );
}
