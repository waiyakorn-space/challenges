import React from 'react';
import { useSelector } from 'react-redux';

export default function DonationAmountDisplay() {
  const donationSelector = useSelector((state) => state.donate);
  const NumFormat = (price) =>
    `${Intl.NumberFormat().format((Math.round(price * 100) / 100).toFixed(2))}`;

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h2>All donations</h2>
      <div className="flex flex-row gap-2 justify-center items-center">
        <h1 className="font-semibold text-primary">
          {NumFormat(donationSelector)}
        </h1>
        <h5>THB</h5>
      </div>
    </div>
  );
}
