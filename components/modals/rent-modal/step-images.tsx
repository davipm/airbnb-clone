import Image from 'next/image';
import type { ChangeEvent } from 'react';
import { TbPhotoPlus } from 'react-icons/tb';

import { Heading } from '@/components/heading';

type Props = {
  imageSrc: string;
  setCustomValue: (id: string, value: any) => void;
};

export default function StepImages({ setCustomValue, imageSrc }: Props) {
  function handleImageChange(event: ChangeEvent<HTMLInputElement>) {
    event.preventDefault();

    const file = event.target.files?.[0];

    if (!file) return;

    if (!file.type.includes('image')) {
      return alert('Please upload an image file');
    }

    const reader = new FileReader();
    reader.readAsDataURL(file);

    reader.onload = () => {
      const result = reader.result as string;
      setCustomValue('imageSrc', result);
    };
  }

  return (
    <div className="flex flex-col gap-8">
      <Heading
        title="Add a photo of your place"
        subtitle="Show guests what your place looks like!"
      />

      <div className="relative cursor-pointer hover:opacity-70 transition border-dashed border-2 p-20 border-neutral-300 flex flex-col justify-center items-center gap-4 text-neutral-600">
        <TbPhotoPlus size={50} />
        <label htmlFor="poster" className="font-semibold text-lg">
          Click to upload
        </label>

        <input
          type="file"
          id="poster"
          name="poster"
          accept="image/*"
          required={!imageSrc}
          className="absolute z-30 w-full opacity-0 h-full cursor-pointer"
          onChange={handleImageChange}
        />

        {imageSrc && (
          <div className="absolute inset-0 w-full h-full">
            <Image
              src={imageSrc}
              alt="House"
              className="object-cover z-20"
              fill
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
            />
          </div>
        )}
      </div>
    </div>
  );
}
