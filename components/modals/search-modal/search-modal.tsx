'use client';

import { formatISO } from 'date-fns';
import { useRouter, useSearchParams } from 'next/navigation';
import qs from 'query-string';
import React, { useCallback, useMemo, useState } from 'react';
import type { Range } from 'react-date-range';

import Modal from '@/components/modals/modal';
import BodyContent from '@/components/modals/search-modal/body-content';
import SearchStepDate from '@/components/modals/search-modal/search-step-date';
import SearchStepInfo from '@/components/modals/search-modal/search-step-info';
import { useModalStore } from '@/store';
import type { CountrySelectValue } from '@/types';

enum STEPS {
  LOCATION = 0,
  DATE = 1,
  INFO = 2,
}

export default function SearchModal() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { closeSearch, isSearchOpen } = useModalStore();

  const [step, setStep] = useState(STEPS.LOCATION);

  const [location, setLocation] = useState<CountrySelectValue>();
  const [guestCount, setGuestCount] = useState(1);
  const [roomCount, setRoomCount] = useState(1);
  const [bathroomCount, setBathroomCount] = useState(1);
  const [dateRange, setDateRange] = useState<Range>({
    startDate: new Date(),
    endDate: new Date(),
    key: 'selection',
  });

  const onBack = useCallback(() => {
    setStep((value) => value - 1);
  }, []);

  const onNext = useCallback(() => {
    setStep((value) => value + 1);
  }, []);

  const onSubmit = useCallback(async () => {
    if (step !== STEPS.INFO) {
      return onNext();
    }

    let currentQuery = {};

    if (searchParams) {
      currentQuery = qs.parse(searchParams.toString());
    }

    const updatedQuery: any = {
      ...currentQuery,
      locationValue: location?.value,
      guestCount,
      roomCount,
      bathroomCount,
    };

    if (dateRange.startDate) {
      updatedQuery.startDate = formatISO(dateRange.startDate);
    }

    if (dateRange.endDate) {
      updatedQuery.endDate = formatISO(dateRange.endDate);
    }

    const url = qs.stringifyUrl(
      {
        url: '/',
        query: updatedQuery,
      },
      { skipNull: true },
    );

    setStep(STEPS.LOCATION);
    closeSearch();
    router.push(url);
  }, [
    step,
    searchParams,
    location?.value,
    guestCount,
    roomCount,
    bathroomCount,
    dateRange.startDate,
    dateRange.endDate,
    closeSearch,
    router,
    onNext,
  ]);

  const actionLabel = useMemo(() => {
    if (step === STEPS.INFO) {
      return 'Search';
    }

    return 'Next';
  }, [step]);

  const secondaryActionLabel = useMemo(() => {
    if (step === STEPS.LOCATION) {
      return undefined;
    }

    return 'Back';
  }, [step]);

  const ChangeSection = useMemo(() => {
    switch (step) {
      case STEPS.DATE:
        return <SearchStepDate dateRange={dateRange} setDateRange={setDateRange} />;
      case STEPS.INFO:
        return (
          <SearchStepInfo
            setRoomCount={setRoomCount}
            setBathroomCount={setBathroomCount}
            setGuestCount={setGuestCount}
            bathroomCount={bathroomCount}
            guestCount={guestCount}
            roomCount={roomCount}
          />
        );
      default:
        return <BodyContent location={location} setLocation={setLocation} />;
    }
  }, [bathroomCount, dateRange, guestCount, location, roomCount, step]);

  return (
    <Modal
      isOpen={isSearchOpen}
      title="Filters"
      actionLabel={actionLabel}
      onSubmit={onSubmit}
      secondaryActionLabel={secondaryActionLabel}
      secondaryAction={step === STEPS.LOCATION ? undefined : onBack}
      onClose={closeSearch}
      body={ChangeSection}
    />
  );
}
