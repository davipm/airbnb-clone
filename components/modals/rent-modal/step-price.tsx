import type { FieldErrors } from 'react-hook-form';

import Heading from '@/components/heading';
import Input from '@/components/inputs/input';

type Props = {
  loading: boolean;
  register: any;
  errors: FieldErrors;
};

export default function StepPrice({ loading, register, errors }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <Heading title="Now, set your price" subtitle="How much do you charge per night?" />
      <Input
        id="price"
        label="Price"
        formatPrice
        type="number"
        disabled={loading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
}
