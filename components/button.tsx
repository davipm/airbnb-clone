import type { ButtonProps as Props } from '@/lib/types';
import { cn } from '@/lib/utils';

export default function Button({ icon: Icon, ...rest }: Props) {
  return (
    <button
      onClick={rest.onClick}
      type={rest.type}
      className={cn(
        'relative disabled:opacity-70 disabled:cursor-not-allowed rounded-lg hover:opacity-80 transition duration-300 w-full',
        rest.outline ? 'bg-white border-black' : 'bg-rose-500 text-white border-transparent',
        rest.small ? 'text-sm py-1 font-light border-[1px]' : 'text-md py-3 font-semibold border-2',
      )}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {rest.label}
    </button>
  );
}
