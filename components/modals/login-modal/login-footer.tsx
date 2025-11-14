'use client';

import { signIn } from 'next-auth/react';
import { useCallback } from 'react';
import { FcGoogle } from 'react-icons/fc';

import Button from '@/components/button';
import { useModalStore } from '@/store';

export default function LoginFooter() {
  const { closeLogin, openRegister } = useModalStore();

  const onToggle = useCallback(() => {
    closeLogin();
    openRegister();
  }, [closeLogin, openRegister]);

  return (
    <div className="flex flex-col gap-4 mt-3">
      <hr />
      <Button
        outline
        label="Continue with Google"
        icon={FcGoogle}
        onClick={() => signIn('google')}
      />
      <div className="text-neutral-500 text-center mt-4 font-light">
        <p>
          First time using Airbnb?
          <span onClick={onToggle} className="text-neutral-800 cursor-pointer hover:underline">
            {' '}
            Create an account
          </span>
        </p>
      </div>
    </div>
  );
}
