'use client';

import { signIn } from 'next-auth/react';
import { useCallback } from 'react';
import { FcGoogle } from 'react-icons/fc';

import Button from '@/components/button';
import { useModalStore } from '@/store';

export default function RegisterFooter() {
  const { closeRegister, openLogin } = useModalStore();

  const onToggle = useCallback(() => {
    closeRegister();
    openLogin();
  }, [closeRegister, openLogin]);

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
          Already have an account?
          <span onClick={onToggle} className="text-neutral-800 cursor-pointer hover:underline">
            {' '}
            Log in
          </span>
        </p>
      </div>
    </div>
  );
}
