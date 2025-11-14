import { headers } from 'next/headers';
import { Container } from '@/components/container';
import { EmptyState } from '@/components/empty-state';
import { Heading } from '@/components/heading';
import PropertiesContainer from '@/components/properties-container';
import { auth } from '@/server/auth';
import { getListings } from '@/server/querys/get-listings';

export default async function PropertiesPage() {
  const session = await auth.api.getSession({
    headers: await headers(),
  });

  const listings = await getListings({ userId: session?.user.id });

  if (!session?.user) return <EmptyState title="Unauthorized" subtitle="Please login" />;

  if (!listings.length)
    return <EmptyState title="No properties found" subtitle="Looks like you have no properties." />;

  return (
    <Container>
      <Heading title="Properties" subtitle="List of your properties" />
      <PropertiesContainer listings={listings} currentUser={session?.user} />
    </Container>
  );
}
