import type { Range } from 'react-date-range';

import { Heading } from '@/components/heading';
import Calendar from '@/components/inputs/calendar';

interface Props {
  dateRange: Range;
  setDateRange: (value: any) => void;
}

export default function SearchStepDate({ setDateRange, dateRange }: Props) {
  return (
    <div className="flex flex-col gap-8">
      <Heading title="When do you plan to go?" subtitle="Make sure everyone is free!" />
      <Calendar onChange={(value) => setDateRange(value.selection)} value={dateRange} />
    </div>
  );
}
