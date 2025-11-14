import type { CategoryViewProps as Props } from '@/lib/types';

export default function ListingCategory({ icon: Icon, ...rest }: Props) {
  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-row items-center gap-4">
        <Icon size={40} className="text-neutral-600" />
        <div className="flex flex-col">
          <div className="text-lg font-semibold">{rest.label}</div>
          <div className="text-neutral-500 font-light">{rest.description}</div>
        </div>
      </div>
    </div>
  );
}
