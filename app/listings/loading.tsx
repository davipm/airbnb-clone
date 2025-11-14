'use client';

import 'react-loading-skeleton/dist/skeleton.css';

import Skeleton from 'react-loading-skeleton';

import { Container } from '@/components/container';

export default function Loading() {
  return (
    <Container>
      <div className="flex flex-col gap-2 max-w-screen-lg mx-auto">
        <Skeleton height={32} />
        <Skeleton height={24} />
        <Skeleton height={514} />

        <div className="grid grid-cols-1 md:grid-cols-7 md:gap-10 mt-6">
          <div className="col-span-4 ">
            <Skeleton height={514} />
          </div>

          <div className="order-first md:order-last md:col-span-3">
            <Skeleton height={514} />
          </div>
        </div>
      </div>
    </Container>
  );
}
