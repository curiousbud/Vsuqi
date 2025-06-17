
'use client';

import type { ReactNode } from 'react';
import { createContext, useState, useMemo } from 'react';
import currencyConfigData from '@/config/currencies.json';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

// Use the imported data
const { currencies: currenciesList, exchangeRates: exchangeRatesData } = currencyConfigData;

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
    currencies: currenciesList as Currency[], // Cast because import might not be typed
    exchangeRates: exchangeRatesData,
  }), [selectedCurrency]);

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
}
