
'use client';

import type { ReactNode } from 'react';
import { createContext, useState, useMemo } from 'react';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

export const currenciesList: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
];

export const exchangeRatesData: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 157.0,
  CAD: 1.37,
};

interface CurrencyContextType {
  selectedCurrency: string;
  setSelectedCurrency: (currencyCode: string) => void;
  currencies: Currency[];
  exchangeRates: Record<string, number>;
}

export const CurrencyContext = createContext<CurrencyContextType | undefined>(undefined);

interface CurrencyProviderProps {
  children: ReactNode;
}

export function CurrencyProvider({ children }: CurrencyProviderProps) {
  const [selectedCurrency, setSelectedCurrency] = useState<string>('USD');

  const contextValue = useMemo(() => ({
    selectedCurrency,
    setSelectedCurrency,
    currencies: currenciesList,
    exchangeRates: exchangeRatesData,
  }), [selectedCurrency]);

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
}
