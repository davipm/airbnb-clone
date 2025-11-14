'use client';

import dynamic from 'next/dynamic';

import Avatar from '@/components/avatar';
import ListingCategory from '@/components/listings/listing-category';
import useCountries from '@/hooks/useCountries';
import type { ListingInfoProps as Props } from '@/types';

const Map = dynamic(() => import('../map'), {
  loading: () => <p>loading...</p>,
  ssr: false,
});

export default function ListingInfo({
  category,
  bathroomCount,
  guestCount,
  roomCount,
  user,
  locationValue,
  description,
}: Props) {
  const { getByValue } = useCountries();
  const coordinates = getByValue(locationValue)?.latlng;

  return (
    <article className="col-span-4 flex flex-col gap-8">
      <header className="flex flex-col gap-2">
        <div className="text-xl font-semibold flex items-center gap-2">
          <h2>Hosted by {user.name}</h2>
          <Avatar src={user.image} />
        </div>
        <ul className="flex items-center gap-4 font-light text-neutral-500">
          <li>{guestCount} guests</li>
          <li>{roomCount} rooms</li>
          <li>{bathroomCount} bathrooms</li>
        </ul>
      </header>
      <hr />
      {category && (
        <ListingCategory
          description={category.description}
          label={category.label}
          icon={category.icon}
        />
      )}
      <div className="text-lg font-light text-neutral-500">{description}</div>
      <hr />
      <Map center={coordinates} />
    </article>
  );
}
