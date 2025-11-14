import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useRouter } from 'next/navigation';

import { useSession } from 'next-auth/react';
import { type MouseEvent, useCallback, useMemo } from 'react';
import { toast } from 'sonner';
import type { SessionInterface } from '@/lib/types';
import { useModalStore } from '@/store';

interface IUseFavorite {
  listingId: string;
  currentUser?: SessionInterface | null;
}

export default function useFavorite({ listingId, currentUser }: IUseFavorite) {
  const router = useRouter();
  const { openLogin } = useModalStore();
  const { status } = useSession();

  const hasFavorite = useMemo(() => {
    const list = currentUser?.user.favoriteIds || [];
    return list.includes(listingId);
  }, [currentUser?.user.favoriteIds, listingId]);

  const { mutate } = useMutation(
    () => {
      if (hasFavorite) {
        return axios.delete(`/api/favorites/${listingId}`);
      } else {
        return axios.post(`/api/favorites/${listingId}`);
      }
    },
    {
      onSuccess: () => {
        router.refresh();
        toast.success('Success');
      },
      onError: (error) => {
        console.error(error);
        toast.error('Something went wrong.');
      },
    },
  );

  const toggleFavorite = useCallback(
    (event: MouseEvent<HTMLDivElement>) => {
      event.stopPropagation();
      if (status === 'unauthenticated') return openLogin();
      mutate();
    },
    [mutate, openLogin, status],
  );

  return {
    hasFavorite,
    toggleFavorite,
  };
}
