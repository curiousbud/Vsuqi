
'use client';

import type { ReactNode } from 'react';
import { createContext, useState, useMemo } from 'react';
import currencyConfigData from '@/config/currencies.json';

export interface Currency {
  code: string;
  name: string;
  symbol: string;
}

const { currencies: currenciesList, exchangeRates: exchangeRatesData, defaultCurrencyCode } = currencyConfigData;

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
  // Use defaultCurrencyCode from JSON if available, otherwise fallback to 'INR' or 'USD'
  const initialCurrency = defaultCurrencyCode && currenciesList.some(c => c.code === defaultCurrencyCode) 
                          ? defaultCurrencyCode 
                          : (currenciesList.some(c => c.code === 'INR') ? 'INR' : 'USD');
  
  const [selectedCurrency, setSelectedCurrency] = useState<string>(initialCurrency);

  const contextValue = useMemo(() => ({
    selectedCurrency,
    setSelectedCurrency,
    currencies: currenciesList as Currency[], 
    exchangeRates: exchangeRatesData,
  }), [selectedCurrency]);

  return (
    <CurrencyContext.Provider value={contextValue}>
      {children}
    </CurrencyContext.Provider>
  );
}
