import { headers } from 'next/headers';
import { Container } from '@/components/container';
import { EmptyState } from '@/components/empty-state';
import { Heading } from '@/components/heading';
import { TripContainer } from '@/components/trip-container';
import { auth } from '@/server/auth';
import { getReservations } from '@/server/querys/get-reservations';

export default async function TripsPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const reservations = await getReservations({ userId: session?.user.id });

  if (!session?.user) return <EmptyState title="Unauthorized" subtitle="Please login" />;

  if (!reservations.length)
    return (
      <EmptyState title="No trips found" subtitle="Looks like you havent reserved any trips." />
    );

  return (
    <Container>
      <Heading title="Trips" subtitle="Where you've been and where you're going" />
      <TripContainer reservations={reservations} currentUser={session?.user} />
    </Container>
  );
}
