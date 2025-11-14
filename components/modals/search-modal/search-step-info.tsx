import Heading from '@/components/heading';
import Counter from '@/components/inputs/counter';

type Props = {
  guestCount: number;
  roomCount: number;
  bathroomCount: number;
  setGuestCount: (value: any) => void;
  setRoomCount: (value: any) => void;
  setBathroomCount: (value: any) => void;
};

export default function SearchStepInfo({
  guestCount,
  roomCount,
  bathroomCount,
  setBathroomCount,
  setGuestCount,
  setRoomCount,
}: Props) {
  return (
    <div className="flex flex-col gap-8">
      <Heading title="More information" subtitle="Find your perfect place!" />
      <Counter
        onChange={(value) => setGuestCount(value)}
        value={guestCount}
        title="Guests"
        subtitle="How many guests are coming?"
      />
      <hr />
      <Counter
        onChange={(value) => setRoomCount(value)}
        value={roomCount}
        title="Rooms"
        subtitle="How many rooms do you need?"
      />
      <hr />
      <Counter
        onChange={(value) => {
          setBathroomCount(value);
        }}
        value={bathroomCount}
        title="Bathrooms"
        subtitle="How many bahtrooms do you need?"
      />
    </div>
  );
}
