import BotAvatar from '../BotAvatar';

export default function BotAvatarExample() {
  return (
    <div className="flex gap-4 items-center p-6">
      <BotAvatar size="sm" />
      <BotAvatar size="md" />
      <BotAvatar size="lg" />
    </div>
  );
}
