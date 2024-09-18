import React from 'react';
import { useSelector } from 'react-redux';

export default function DonationAmountDisplay() {
  const donationSelector = useSelector((state) => state.donate);
  const NumFormat = (price) =>
    `${Intl.NumberFormat().format((Math.round(price * 100) / 100).toFixed(2))}`;

  return (
    <div className="flex flex-col gap-2 justify-center items-center">
      <h4 className="">All donations</h4>
      <div className="flex flex-row gap-2 justify-center items-center">
        <h2 className="font-medium text-primary">
          {NumFormat(donationSelector)}
        </h2>
        <h5 className="font-light">THB</h5>
      </div>
    </div>
  );
}
