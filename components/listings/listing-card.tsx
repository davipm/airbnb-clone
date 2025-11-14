'use client';

import { format } from 'date-fns';
import Image from 'next/image';
import Link from 'next/link';
import { type MouseEvent, useCallback, useMemo } from 'react';

import Button from '@/components/button';
import HeartButton from '@/components/heart-button';
import useCountries from '@/hooks/useCountries';
import type { ListingCardProps as Props } from '@/lib/types';
import { formatToMoney } from '@/lib/utils';

export default function ListingCard({
  actionId = '',
  onAction,
  actionLabel,
  reservation,
  data,
  disabled,
  currentUser,
}: Props) {
  const { getByValue } = useCountries();

  const location = getByValue(data.locationValue);

  const handleCancel = useCallback(
    (event: MouseEvent<HTMLButtonElement>) => {
      event.stopPropagation();
      if (disabled) return;
      onAction?.(actionId);
    },
    [actionId, disabled, onAction],
  );

  const price = useMemo(() => {
    if (reservation) return formatToMoney(reservation.totalPrice);
    return formatToMoney(data.price);
  }, [data.price, reservation]);

  const reservationDate = useMemo(() => {
    if (!reservation) return null;
    const start = new Date(reservation.startDate);
    const end = new Date(reservation.endDate);

    return `${format(start, 'PP')} - ${format(end, 'PP')}`;
  }, [reservation]);

  return (
    <Link href={`/listings/${data.id}`}>
      <article className="col-span-1 cursor-pointer group">
        <div className="flex flex-col gap-2 w-full">
          <figure className="aspect-square w-full relative overflow-hidden rounded-xl">
            <Image
              src={data.imageSrc}
              alt="Listing"
              fill
              priority
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
              className="object-cover h-full w-full group-hover:scale-110 transition"
            />
            <div className="absolute top-3 right-3">
              <HeartButton listingId={data.id} currentUser={currentUser} />
            </div>
          </figure>

          <h1 className="font-semibold text-lg">
            {location?.region}, {location?.label}
          </h1>

          <p className="font-light text-neutral-500">{reservationDate || data.category}</p>

          <footer className="flex flex-row items-center gap-1">
            <h3 className="font-semibold">{price}</h3>
            {!reservation && <p className="font-light">Night</p>}
          </footer>

          {onAction && actionLabel && (
            <Button small disabled={disabled} label={actionLabel} onClick={handleCancel} />
          )}
        </div>
      </article>
    </Link>
  );
}
