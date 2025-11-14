import { headers } from 'next/headers';
import { Container } from '@/components/container';
import { EmptyState } from '@/components/empty-state';
import { Heading } from '@/components/heading';
import ListingCard from '@/components/listings/listing-card';
import { auth } from '@/server/auth';

export default async function FavoritePage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  // @ts-expect-error
  if (!session?.user.favorites?.length) return <EmptyState />;

  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you favorited!" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {/*// @ts-expect-error*/}
        {session?.user.favorites?.map((favorite: any) => (
          <ListingCard key={favorite.id} data={favorite} currentUser={session.user} />
        ))}
      </div>
    </Container>
  );
}
