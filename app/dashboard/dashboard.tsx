'use client';

import { useQuery } from '@tanstack/react-query';
import type { $Infer } from '@/lib/auth-client';
import { orpc } from '@/utils/orpc';

type Props = {
  session: typeof $Infer.Session;
};

export function Dashboard({ session }: Props) {
  const privateData = useQuery(orpc.privateData.queryOptions());

  return (
    <div>
      <p>API: {privateData.data?.message}</p>
      <p>API User Name: {privateData.data?.user.email}</p>
      <p>Active Session User: {session?.user.name}</p>
    </div>
  );
}
