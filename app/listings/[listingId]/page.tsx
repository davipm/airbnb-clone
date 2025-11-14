import { EmptyState } from '@/components/empty-state';
import { ListingContainer } from '@/components/listing-container';
import { getListingById } from '@/server/querys/get-listing-by-id';
import { getReservations } from '@/server/querys/get-reservations';
import { getCurrentUser } from '@/utils/auth';

type Props = {
  params: Promise<{ listingId: string }>;
};
export default async function Page({ params }: Props) {
  const { listingId } = await params;
  const listing = await getListingById({ listingId });
  const reservations = await getReservations({ listingId });
  const currentUser = await getCurrentUser();

  if (!listing) return <EmptyState />;

  return (
    <ListingContainer listing={listing} reservations={reservations} currentUser={currentUser} />
  );
}
