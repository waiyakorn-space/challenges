import React from 'react';
import { absoluteCard, buttonAnimation } from '../styles/style_constant';
import DonationPayment from './DonationPayment';
import { ToastComponent } from './ToastComponent';

export default function CharityCard(props) {
  const {
    item,
    isSelected,
    selectedCharities,
    setSelectedCharities,
    selectedAmount,
    setSelectedAmount,
    handlePay,
    currency,
  } = props;
  const cardClasses = `${absoluteCard} bg-white opacity-80 ${isSelected}`;
  const closeButtonClasses = `absolute h-16 w-16 lg:h-10 lg:w-10 right-0 z-10 mb-4 lg:m-2 cursor-pointer rounded-full p-2 hover:bg-gray-400 ${buttonAnimation} ${isSelected}`;
  const contentClasses = `${absoluteCard} flex flex-col items-center justify-center p-10 ${isSelected}`;

  return (
    <div className="relative flex w-full h-full flex-col overflow-hidden rounded-xl shadow-md">
      <div className={cardClasses} />
      <img
        src="icons/close_icon.svg"
        alt="close_icon"
        className={closeButtonClasses}
        onClick={() => setSelectedCharities(null)}
        draggable="false"
      />
      <div className={contentClasses}>
        <DonationPayment
          currency={currency}
          handlePay={() =>
            selectedAmount
              ? handlePay(selectedCharities, selectedAmount, currency)
              : ToastComponent('Please select amount', 'error')
          }
          selectedAmount={selectedAmount}
          setSelectedAmount={setSelectedAmount}
        />
      </div>
      <div className="flex-1">
        <img
          src={`images/${item.image}`}
          alt={item.image}
          className="h-full w-full object-cover object-top aspect-video"
        />
      </div>
      <div className="flex h-40 lg:h-24 flex-row justify-between gap-4 overflow-hidden bg-white p-6 lg:p-4">
        <h3 className=" line-clamp-2 h-max break-word">{item.name}</h3>
        <button
          className="hover:text-secondary h-max rounded-full border border-primary px-8 py-6 lg:px-3 lg:py-1 text-lg text-primary"
          onClick={() => {
            setSelectedAmount(null);
            setSelectedCharities(item.id);
          }}
        >
          <h3>Donate</h3>
        </button>
      </div>
    </div>
  );
}
