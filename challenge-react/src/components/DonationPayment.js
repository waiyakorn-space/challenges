import React from 'react';
import { buttonAnimation } from '../style_constant';

export default function DonationPayment(props) {
  const {
    item,
    selectedAmount,
    setSelectedAmount,
    selectedCharities,
    setSelectedCharities,
  } = props;
  const paymentOptions = [10, 20, 50, 100, 500];

  return (
    <div
      className={`absolute inset-0 w-full h-full flex flex-col items-center ${item.id === selectedCharities ? '' : 'hidden'}`}
    >
      <img
        src="icons/close_icon.svg"
        alt="close_icon"
        className={`absolute right-0 p-2 m-2 hover:bg-gray-400 rounded-full ${buttonAnimation}`}
        onClick={() => setSelectedCharities(null)}
        draggable="false"
      />
      <div className="flex-1  w-full">
        <div className="grid grid-cols-2 gap-4 p-10 h-full w-full">
          {paymentOptions.map((amount, idx) => (
            <div
              key={idx}
              className={'flex justify-center items-center cursor-pointer'}
              onClick={() => setSelectedAmount(amount)}
            >
              <div
                className={`${selectedAmount === amount ? 'bg-secondary' : 'bg-drop'} w-full p-2 border-2 text-center border-primary rounded-full`}
              >
                <h5
                  className={
                    selectedAmount === amount ? 'text-white' : 'text-primary'
                  }
                >
                  {amount}
                </h5>
              </div>
            </div>
          ))}
        </div>
      </div>
      <div className="flex justify-center items-center w-full h-24">
        <button
          className="absolute w-1/2 bg-primary text-white hover:opacity-80 p-2 text-lg h-max rounded-full"
          onClick={() => {}}
        >
          Donate
        </button>
      </div>
    </div>
  );
}
