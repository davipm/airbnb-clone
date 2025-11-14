'use client';

import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useForm } from 'react-hook-form';
import { toast } from 'react-hot-toast';

import Modal from '@/components/modals/modal';
import RegisterBody from '@/components/modals/register-modal/register-body';
import RegisterFooter from '@/components/modals/register-modal/register-footer';
import { useModalStore } from '@/store';

export default function RegisterModal() {
  const { openLogin, closeRegister, isRegisterOpen } = useModalStore();

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      name: '',
      email: '',
      password: '',
    },
  });

  const { mutate, isPending } = useMutation({
    mutationFn: async (data) => axios.post('/api/register', data),
    onSuccess: () => {
      toast.success('Registered!');
      closeRegister();
      openLogin();
    },
    onError: () => {
      toast.error('Error Register');
    },
  });

  return (
    <Modal
      disabled={isPending}
      isOpen={isRegisterOpen}
      onClose={closeRegister}
      // @ts-expect-error
      onSubmit={handleSubmit(mutate)}
      actionLabel="Continue"
      title="Register"
      body={<RegisterBody register={register} errors={errors} isLoading={isPending} />}
      footer={<RegisterFooter />}
    />
  );
}
