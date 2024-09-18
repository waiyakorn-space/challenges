import React from 'react';
export default function DonationPayment(props) {
  const { currency, handlePay, selectedAmount, setSelectedAmount } = props;
  const paymentOptions = [10, 20, 50, 100, 500];

  return (
    <>
      <h4 className="text-black font-semibold mb-10 lg:mb-6">{`Select the amount to donate (${currency})`}</h4>
      <div className="grid grid-cols-2 gap-6 lg:gap-4 w-full">
        {paymentOptions.map((amount, idx) => (
          <div
            key={idx}
            className={'flex justify-center items-center cursor-pointer'}
            onClick={() => setSelectedAmount(amount)}
          >
            <div
              className={`${selectedAmount === amount ? 'bg-secondary' : 'bg-drop'} w-full p-6 lg:p-2 border-2 text-center border-primary rounded-full`}
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
      <button
        className="w-full bg-primary text-white hover:opacity-80  p-6 lg:p-2 mt-10 text-lg h-max rounded-full"
        onClick={handlePay}
      >
        <h4>Donate</h4>
      </button>
    </>
  );
}
