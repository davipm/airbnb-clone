import Image from 'next/image';

import Heading from '@/components/heading';
import HeartButton from '@/components/heart-button';
import useCountries from '@/hooks/useCountries';
import type { ListingHeadProps as Props } from '@/types';

export default function ListingHead({ id, currentUser, ...rest }: Props) {
  const { getByValue } = useCountries();
  const location = getByValue(rest.locationValue);

  return (
    <>
      <Heading title={rest.title} subtitle={`${location?.region}, ${location?.label}`} />
      <figure className="w-full h-[60vh] overflow-hidden rounded-xl relative">
        <Image
          src={rest.imageSrc}
          alt="Image"
          className="object-cover w-full"
          sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
          fill
          priority
        />
        <div className="absolute top-5 right-5">
          <HeartButton listingId={id} currentUser={currentUser} />
        </div>
      </figure>
    </>
  );
}
