import { Heading } from '@/components/heading';
import Counter from '@/components/inputs/counter';

type Props = {
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  setCustomValue: (id: string, value: any) => void;
};

export default function StepInfo({ setCustomValue, guestCount, roomCount, bathroomCount }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <Heading title="Share some basics about your place" subtitle="What amenitis do you have?" />
      <Counter
        onChange={(value) => setCustomValue('guestCount', value)}
        value={guestCount}
        title="Guests"
        subtitle="How many guests do you allow?"
      />
      <hr />
      <Counter
        onChange={(value) => setCustomValue('roomCount', value)}
        value={roomCount}
        title="Rooms"
        subtitle="How many rooms do you have?"
      />
      <hr />
      <Counter
        onChange={(value) => setCustomValue('bathroomCount', value)}
        value={bathroomCount}
        title="Bathrooms"
        subtitle="How many bathrooms do you have?"
      />
    </div>
  );
}
