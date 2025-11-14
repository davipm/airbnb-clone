'use client';

import { useMutation } from '@tanstack/react-query';
import { useRouter } from 'next/navigation';
import { signIn } from 'next-auth/react';
import { type FieldValues, useForm } from 'react-hook-form';

import { toast } from 'sonner';
import LoginBodyContent from '@/components/modals/login-modal/login-body-content';
import LoginFooter from '@/components/modals/login-modal/login-footer';
import Modal from '@/components/modals/modal';
import { useModalStore } from '@/store';

export default function LoginModal() {
  const router = useRouter();
  const { closeLogin, isLoginOpen } = useModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<FieldValues>({
    defaultValues: {
      email: '',
      password: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data: FieldValues) => {
      return await signIn('credentials', {
        ...data,
        redirect: false,
      });
    },
    onSuccess: (data) => {
      if (data?.error) {
        toast.error('Error trying to login');
        return;
      }

      toast.success('Logged in');
      router.refresh();
      closeLogin();
    },
  });

  return (
    <Modal
      disabled={isPending}
      isOpen={isLoginOpen}
      title="Login"
      actionLabel="Continue"
      onClose={closeLogin}
      onSubmit={handleSubmit((data) => mutate(data))}
      body={<LoginBodyContent errors={errors} register={register} isLoading={isPending} />}
      footer={<LoginFooter />}
    />
  );
}
