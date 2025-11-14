import { headers } from 'next/headers';
import { Container } from '@/components/container';
import { EmptyState } from '@/components/empty-state';
import { Heading } from '@/components/heading';
import ReservationContainer from '@/components/reservation-container';
import { auth } from '@/server/auth';
import { getReservations } from '@/server/querys/get-reservations';

export default async function ReservationPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const reservations = await getReservations({ authorId: session?.user.id });

  if (!session?.user) return <EmptyState title="Unauthorized" subtitle="Please login" />;

  if (!reservations.length)
    return (
      <EmptyState
        title="No reservations found"
        subtitle="Looks like you have no reservations on your properties."
      />
    );

  return (
    <Container>
      <Heading title="Reservations" subtitle="Bookings on your properties" />

      <ReservationContainer reservations={reservations} currentUser={session?.user} />
    </Container>
  );
}
