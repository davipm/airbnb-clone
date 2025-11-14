import getListingById from '@/actions/getListingById';
import getReservations from '@/actions/getReservations';
import { EmptyState } from '@/components/empty-state';
import ListingContainer from '@/components/listing-container';
import { getCurrentUser } from '@/utils/auth';

type Props = {
  params: {
    listingId?: string;
  };
};
export default async function ListingsPage({ params }: Props) {
  const listing = await getListingById(params);
  const reservations = await getReservations(params);
  const currentUser = await getCurrentUser();

  if (!listing) return <EmptyState />;

  return (
    <ListingContainer listing={listing} reservations={reservations} currentUser={currentUser} />
  );
}
