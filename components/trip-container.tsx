'use client';

import ListingCard from '@/components/listings/listing-card';
import { useReservation } from '@/hooks/useReservation';
import type { SafeReservation, SessionInterface } from '@/lib/types';

interface Props {
  reservations: SafeReservation[];
  currentUser?: SessionInterface | null;
}

export default function TripContainer({ reservations, currentUser }: Props) {
  const { mutate, deletingId } = useReservation();

  return (
    <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
      {reservations.map((reservation) => (
        <ListingCard
          key={reservation.id}
          data={reservation.listing}
          reservation={reservation}
          actionId={reservation.id}
          onAction={mutate}
          disabled={deletingId === reservation.id}
          actionLabel="Cancel guest reservation"
          currentUser={currentUser}
        />
      ))}
    </div>
  );
}
