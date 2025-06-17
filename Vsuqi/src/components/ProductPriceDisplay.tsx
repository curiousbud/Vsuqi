
'use client';

import { useContext } from 'react';
import { CurrencyContext, type Currency } from '@/context/CurrencyContext';

interface ProductPriceDisplayProps {
  priceUSD: number;
  className?: string;
}

export default function ProductPriceDisplay({ priceUSD, className }: ProductPriceDisplayProps) {
  const context = useContext(CurrencyContext);

  if (!context) {
    // Fallback if context is not available (should not happen in normal execution)
    return <span className={className}>${priceUSD.toFixed(2)} USD</span>;
  }

  const { selectedCurrency, currencies, exchangeRates } = context;

  const targetCurrencyDetails = currencies.find(c => c.code === selectedCurrency);
  const rate = exchangeRates[selectedCurrency];

  if (!targetCurrencyDetails || typeof rate !== 'number') {
    // Fallback to USD if currency or rate is not found
    return <span className={className}>${priceUSD.toFixed(2)} USD</span>;
  }

  const convertedPrice = (priceUSD * rate).toFixed(2);

  return (
    <span className={className}>
      {targetCurrencyDetails.symbol}
      {convertedPrice}
    </span>
  );
}
