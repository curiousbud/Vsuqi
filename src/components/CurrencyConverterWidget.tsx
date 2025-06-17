
'use client';

import { useState, useEffect } from 'react';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Label } from '@/components/ui/label';
import { Coins, Loader2 } from 'lucide-react';

interface Currency {
  code: string;
  name: string;
  symbol: string;
}

const currencies: Currency[] = [
  { code: 'USD', name: 'US Dollar', symbol: '$' },
  { code: 'EUR', name: 'Euro', symbol: '€' },
  { code: 'GBP', name: 'British Pound', symbol: '£' },
  { code: 'JPY', name: 'Japanese Yen', symbol: '¥' },
  { code: 'CAD', name: 'Canadian Dollar', symbol: 'C$' },
];

// Base currency is USD
const exchangeRates: Record<string, number> = {
  USD: 1,
  EUR: 0.92,
  GBP: 0.79,
  JPY: 157.0,
  CAD: 1.37,
};

export default function CurrencyConverterWidget() {
  const [amount, setAmount] = useState<string>('100');
  const [fromCurrency, setFromCurrency] = useState<string>('USD');
  const [toCurrency, setToCurrency] = useState<string>('EUR');
  const [convertedAmount, setConvertedAmount] = useState<number | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const handleConvert = () => {
    setIsLoading(true);
    const numericAmount = parseFloat(amount);
    if (isNaN(numericAmount) || !exchangeRates[fromCurrency] || !exchangeRates[toCurrency]) {
      setConvertedAmount(null);
      setIsLoading(false);
      return;
    }

    const amountInUSD = numericAmount / exchangeRates[fromCurrency];
    const finalAmount = amountInUSD * exchangeRates[toCurrency];
    
    setTimeout(() => {
        setConvertedAmount(finalAmount);
        setIsLoading(false);
    }, 300);
  };

  useEffect(() => {
    if (amount) { // Only convert if amount is not empty
        handleConvert();
    } else {
        setConvertedAmount(null); // Clear conversion if amount is empty
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [amount, fromCurrency, toCurrency]);


  return (
    <div className="p-4 space-y-4 w-full max-w-xs">
      <h3 className="text-lg font-semibold text-center text-foreground">Currency Converter</h3>
      
      <div className="space-y-2">
        <Label htmlFor="amount">Amount</Label>
        <Input
          id="amount"
          type="number"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
          placeholder="Enter amount"
        />
      </div>

      <div className="space-y-2">
        <Label htmlFor="fromCurrency">From</Label>
        <Select value={fromCurrency} onValueChange={setFromCurrency}>
          <SelectTrigger id="fromCurrency">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="space-y-2">
        <Label htmlFor="toCurrency">To</Label>
        <Select value={toCurrency} onValueChange={setToCurrency}>
          <SelectTrigger id="toCurrency">
            <SelectValue placeholder="Select currency" />
          </SelectTrigger>
          <SelectContent>
            {currencies.map((currency) => (
              <SelectItem key={currency.code} value={currency.code}>
                {currency.code} - {currency.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>
      
      {isLoading && !convertedAmount && (
         <div className="mt-4 p-3 text-center flex justify-center items-center">
           <Loader2 className="h-5 w-5 animate-spin mr-2 text-muted-foreground" />
           <span className="text-sm text-muted-foreground">Calculating...</span>
         </div>
      )}

      {!isLoading && convertedAmount !== null && (
        <div className="mt-4 p-3 bg-accent rounded-md text-center">
          <p className="text-sm text-muted-foreground">Converted Amount:</p>
          <p className="text-xl font-bold text-accent-foreground">
            {currencies.find(c => c.code === toCurrency)?.symbol}
            {convertedAmount.toFixed(2)}
          </p>
        </div>
      )}
    </div>
  );
}
