'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { differenceInDays, eachDayOfInterval } from 'date-fns';
import { useRouter } from 'next/navigation';
import { useSession } from 'next-auth/react';
import { useCallback, useEffect, useMemo, useState } from 'react';
import type { Range } from 'react-date-range';

// import { toast } from 'react-hot-toast';

import { toast } from 'sonner';
import Container from '@/components/container';
import ListingHead from '@/components/listings/listing-head';
import ListingInfo from '@/components/listings/listing-info';
import ListingReservation from '@/components/listings/listing-reservation';
import { categories } from '@/constants';
import type { ListingClientProps as Props } from '@/lib/types';
import { useModalStore } from '@/store';

const initialDateRange = {
  startDate: new Date(),
  endDate: new Date(),
  key: 'selection',
};

export default function ListingContainer({ listing, reservations, currentUser }: Props) {
  const router = useRouter();
  const { openLogin } = useModalStore();
  const { status } = useSession();

  const [totalPrice, setTotalPrice] = useState(listing.price);
  const [dateRange, setDateRange] = useState<Range>(initialDateRange);

  const { mutate, isPending } = useMutation({
    mutationFn: () =>
      axios.post('/api/reservations', {
        totalPrice,
        startDate: dateRange.startDate,
        endDate: dateRange.endDate,
        listingId: listing?.id,
      }),
    onSuccess: () => {
      toast.success('Listing reserved!');
      setDateRange(initialDateRange);
      router.push('/trips');
    },
    onError: () => {
      toast.error('Something went wrong.');
    },
  });

  const handleCreateReservation = useCallback(() => {
    if (status === 'unauthenticated') return openLogin();
    mutate();
  }, [mutate, openLogin, status]);

  const disableDates = useMemo(() => {
    if (!reservations || reservations.length === 0) return [];

    // @ts-expect-error
    return reservations.reduce((allDates, reservation) => {
      const range = eachDayOfInterval({
        start: new Date(reservation.startDate),
        end: new Date(reservation.endDate),
      });

      return [...allDates, ...range];
    }, []);
  }, [reservations]);

  const category = useMemo(() => {
    return categories.find((items) => items.label === listing.category);
  }, [listing.category]);

  useEffect(() => {
    if (dateRange.startDate && dateRange.endDate) {
      const dayCount = differenceInDays(dateRange.endDate, dateRange.startDate);

      if (dayCount && listing.price) {
        setTotalPrice(dayCount * listing.price);
      } else {
        setTotalPrice(listing.price);
      }
    }
  }, [dateRange.endDate, dateRange.startDate, listing.price]);

  return (
    <Container>
      <div className="max-w-screen-lg mx-auto">
        <div className="flex flex-col gap-6">
          <ListingHead {...listing} currentUser={currentUser} />

          <section className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
            <ListingInfo {...listing} category={category} />
            <aside className="order-first md:order-last md:col-span-3">
              <ListingReservation
                price={listing.price}
                totalPrice={totalPrice}
                onChangeDate={(value) => setDateRange(value)}
                dateRange={dateRange}
                onSubmit={handleCreateReservation}
                disabled={isPending}
                disabledDates={disableDates}
              />
            </aside>
          </section>
        </div>
      </div>
    </Container>
  );
}
