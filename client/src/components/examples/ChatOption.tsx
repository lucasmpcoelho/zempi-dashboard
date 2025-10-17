import { useState } from 'react';
import ChatOption from '../ChatOption';
import { Pill } from 'lucide-react';

export default function ChatOptionExample() {
  const [selected, setSelected] = useState<string | null>(null);
  
  return (
    <div className="space-y-3 p-6 max-w-md">
      <ChatOption 
        label="Ozempic" 
        selected={selected === 'ozempic'} 
        onClick={() => setSelected('ozempic')}
        icon={<Pill className="h-5 w-5" />}
      />
      <ChatOption 
        label="Mounjaro" 
        selected={selected === 'mounjaro'} 
        onClick={() => setSelected('mounjaro')}
        icon={<Pill className="h-5 w-5" />}
      />
    </div>
  );
}
