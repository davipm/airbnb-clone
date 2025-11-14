import { useCallback } from 'react';
import { AiOutlineMinus, AiOutlinePlus } from 'react-icons/ai';

import type { CounterProps as Props } from '@/lib/types';

export default function Counter({ onChange, value, subtitle, title }: Props) {
  const onAdd = useCallback(() => {
    onChange(value + 1);
  }, [onChange, value]);

  const onReduce = useCallback(() => {
    if (value === 1) return;
    onChange(value - 1);
  }, [onChange, value]);

  return (
    <section className="counter">
      <header className="control__header">
        <h2 className="font-medium">{title}</h2>
        <h3 className="font-light text-gray-600">{subtitle}</h3>
      </header>

      <article className="flex flex-row items-center gap-4">
        <button onClick={onReduce} className="control-counter" aria-label="Reducer">
          <AiOutlineMinus />
        </button>

        <div className="font-light text-xl text-neutral-600">{value}</div>

        <button onClick={onAdd} className="control-counter" aria-label="Add">
          <AiOutlinePlus />
        </button>
      </article>
    </section>
  );
}
