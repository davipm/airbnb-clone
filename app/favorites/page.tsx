import { Container } from '@/components/container';
import { EmptyState } from '@/components/empty-state';
import { Heading } from '@/components/heading';
import ListingCard from '@/components/listings/listing-card';
import { getCurrentUser } from '@/utils/auth';

export default async function FavoritePage() {
  const { user } = await getCurrentUser();
  const currentUser = await getCurrentUser();

  if (!user.favorites?.length) return <EmptyState />;

  return (
    <Container>
      <Heading title="Favorites" subtitle="List of places you favorited!" />
      <div className="mt-10 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8">
        {user.favorites?.map((favorite) => (
          <ListingCard key={favorite.id} data={favorite} currentUser={currentUser} />
        ))}
      </div>
    </Container>
  );
}
