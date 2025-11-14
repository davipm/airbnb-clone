import { Heading } from '@/components/heading';
import Input from '@/components/inputs/input';
import type { LoginBodyContentProps as Props } from '@/lib/types';

export default function LoginBodyContent({ errors, register, isLoading }: Props) {
  return (
    <div className="flex flex-col gap-4">
      <Heading title="Welcome back" subtitle="Login to your account!" />
      <Input
        id="email"
        label="Email"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
      <Input
        id="password"
        label="Password"
        type="password"
        disabled={isLoading}
        register={register}
        errors={errors}
        required
      />
    </div>
  );
}
