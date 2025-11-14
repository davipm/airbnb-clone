import Select from 'react-select';

import useCountries from '@/hooks/useCountries';
import type { CountrySelectProps, CountrySelectValue } from '@/lib/types';

export default function CountrySelect({ onChange, value }: CountrySelectProps) {
  const { getAll } = useCountries();

  return (
    <Select
      className="z-20"
      placeholder="Anywhere"
      isClearable
      options={getAll()}
      value={value}
      onChange={(newValue) => onChange(newValue as CountrySelectValue)}
      formatOptionLabel={(data) => (
        <div className="flex items-center gap-3">
          <div>{data.flag}</div>
          <div>
            {data.label},<span className="text-neutral-500 ml-1">{data.region}</span>
          </div>
        </div>
      )}
      classNames={{
        control: () => 'p-3 border-2',
        input: () => 'text-lg',
        option: () => 'text-lg',
      }}
      theme={(theme) => ({
        ...theme,
        borderRadius: 6,
        colors: {
          ...theme.colors,
          primary: 'black',
          primary25: '#ffe4e6',
        },
      })}
    />
  );
}
