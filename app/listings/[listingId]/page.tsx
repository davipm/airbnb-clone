import { headers } from 'next/headers';
import { EmptyState } from '@/components/empty-state';
import { ListingContainer } from '@/components/listing-container';
import { auth } from '@/server/auth';
import { getListingById } from '@/server/querys/get-listing-by-id';
import { getReservations } from '@/server/querys/get-reservations';

type Props = {
  params: Promise<{ listingId: string }>;
};
export default async function Page({ params }: Props) {
  const { listingId } = await params;
  const listing = await getListingById({ listingId });
  const reservations = await getReservations({ listingId });

  const session = await auth.api.getSession({
    headers: await headers(),
  });

  if (!listing) return <EmptyState />;

  return (
    <ListingContainer listing={listing} reservations={reservations} currentUser={session?.user} />
  );
}
