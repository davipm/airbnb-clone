import dynamic from 'next/dynamic';

import { Heading } from '@/components/heading';
import CountrySelect from '@/components/inputs/country-select';
import type { CountrySelectValue } from '@/types';

interface Props {
  location: CountrySelectValue | undefined;
  setLocation: (value: CountrySelectValue) => void;
}

const Map = dynamic(() => import('../../map'), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

export default function BodyContent({ setLocation, location }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <Heading title="Where do you wanna go?" subtitle="Find the perfect location!" />
      <CountrySelect
        value={location}
        onChange={(value) => setLocation(value as CountrySelectValue)}
      />
      <hr />
      <Map center={location?.latlng} />
    </div>
  );
}
