'use client';

import { useCallback, useEffect, useState } from 'react';
import { IoMdClose } from 'react-icons/io';
import { twJoin } from 'tailwind-merge';

import Button from '@/components/button';
import type { ModalProps as Props } from '@/lib/types';

export default function Modal({
  actionLabel,
  secondaryActionLabel,
  secondaryAction,
  disabled,
  footer,
  onClose,
  onSubmit,
  title,
  isOpen,
  body,
}: Props) {
  const [showModal, setShowModal] = useState(isOpen);

  useEffect(() => {
    setShowModal(isOpen);
  }, [isOpen]);

  const handleClose = useCallback(() => {
    if (disabled) return;
    setShowModal(true);
    setTimeout(() => onClose(), 300);
  }, [disabled, onClose]);

  const handleSubmit = useCallback(() => {
    if (disabled) return;
    onSubmit();
  }, [onSubmit, disabled]);

  const handleSecondaryAction = useCallback(() => {
    if (disabled || !secondaryAction) return;
    secondaryAction();
  }, [secondaryAction, disabled]);

  if (!isOpen) return null;

  return (
    <div className="modalOverlay">
      <div className="relative w-full md:w-4/6 lg:w-3/6 xl:w-2/5 my-6 mx-auto h-full lg:h-auto md:h-auto">
        <div
          className={twJoin(
            'translate duration-300 h-full',
            showModal ? 'translate-y-0 opacity-100' : 'translate-y-full opacity-0',
          )}
        >
          <div className="translate h-full lg:h-auto md:h-auto border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-white outline-none focus:outline-none">
            <div className="flex items-center p-6 rounded-t justify-center relative border-b-[1px]">
              <button
                onClick={handleClose}
                className="p-1 border-0 hover:opacity-70 transition absolute left-5"
              >
                <IoMdClose size={28} />
              </button>
              <div className="text-lg font-semibold">{title}</div>
            </div>
            <div className="relative p-6 flex-auto">{body}</div>
            <div className="flex flex-col gap-2 px-6 pb-6">
              <div className="flex flex-row items-center gap-4 w-full">
                {secondaryAction && secondaryActionLabel && (
                  <Button
                    label={secondaryActionLabel}
                    onClick={handleSecondaryAction}
                    disabled={disabled}
                    type="button"
                    outline
                  />
                )}
                <Button
                  label={actionLabel}
                  onClick={handleSubmit}
                  disabled={disabled}
                  type="button"
                />
              </div>
              {footer}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
