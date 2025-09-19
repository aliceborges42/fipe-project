/* eslint-disable @typescript-eslint/no-explicit-any */
'use client';

import { useEffect, useReducer } from 'react';
import { Input } from './input';
import { Label } from './label';

const moneyFormatter = Intl.NumberFormat('pt-BR', {
  currency: 'BRL',
  currencyDisplay: 'symbol',
  currencySign: 'standard',
  style: 'currency',
  minimumFractionDigits: 2,
  maximumFractionDigits: 2,
});

type MoneyInputProps = {
  label?: string;
  placeholder?: string;
  value?: number;
  onChange?: (value: number) => void;
};

export default function MoneyInput({
  label,
  placeholder,
  value: externalValue,
  onChange,
}: MoneyInputProps) {
  const [value, setValue] = useReducer((_: any, next: string) => {
    const digits = next.replace(/\D/g, '');
    return moneyFormatter.format(Number(digits) / 100);
  }, '');

  useEffect(() => {
    if (externalValue !== undefined) {
      setValue(moneyFormatter.format(externalValue));
    }
  }, [externalValue]);

  function handleChange(formatted: string) {
    const digits = formatted.replace(/\D/g, '');
    const realValue = Number(digits) / 100;
    onChange?.(realValue);
  }

  return (
    <div className="flex flex-col gap-2">
      {label && <Label>{label}</Label>}
      <Input
        type="text"
        placeholder={placeholder}
        value={value}
        onChange={(e) => {
          const formatted = e.target.value;
          setValue(formatted);
          handleChange(formatted);
        }}
      />
    </div>
  );
}
