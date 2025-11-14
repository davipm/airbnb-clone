import { AiFillHeart, AiOutlineHeart } from 'react-icons/ai';

import useFavorite from '@/hooks/useFavorite';
import type { HeartButtonProps as Props } from '@/lib/types';

export default function HeartButton({ listingId, currentUser }: Props) {
  const { toggleFavorite, hasFavorite } = useFavorite({
    listingId,
    currentUser,
  });

  return (
    <div onClick={toggleFavorite} className="relative hover:opacity-80 transition cursor-pointer">
      <AiOutlineHeart size={28} className="fill-white absolute" />
      <AiFillHeart size={28} className={hasFavorite ? 'fill-rose-500' : 'fill-neutral-500/70'} />
    </div>
  );
}
