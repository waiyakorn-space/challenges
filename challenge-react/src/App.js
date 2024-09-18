import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { summaryDonations } from './helpers';
import DonationAmountDisplay from './components/DonationAmountDisplay';
import DonationPayment from './components/DonationPayment';
import { absoluteCard, buttonAnimation } from './style_constant';
import { ToastComponent } from './components/ToastComponent';
function App() {
  const currency = 'THB';
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [incrementId, setIncrementId] = useState(1);
  const [charitiesData, setCharitiesData] = useState();
  const [selectedCharities, setSelectedCharities] = useState();
  const [selectedAmount, setSelectedAmount] = useState();

  const getCharitiesData = async () => {
    try {
      setIsLoading(true);
      const { data } = await axios.get('http://localhost:3001/charities');
      setCharitiesData(data);
      setIsLoading(false);
    } catch (error) {
      ToastComponent('Error fetching charities', 'error');
      throw error;
    }
  };

  const getPayment = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/payments');
      if (data.length > 0) {
        const sortData = data.sort((a, b) => b.id - a.id);
        setIncrementId(sortData[0].id + 1);
        dispatch({
          type: 'UPDATE_TOTAL_DONATE',
          amount: summaryDonations(data.map((item) => item.amount)),
        });
      }
    } catch (error) {
      setIsLoading(false);
      ToastComponent('Error fetching payment', 'error');
      throw error;
    }
  };

  async function handlePay(id, amount, currency) {
    try {
      const response = await axios.post('http://localhost:3001/payments', {
        charitiesId: id,
        amount: amount,
        currency: currency,
        id: incrementId,
      });
      if (response.status === 201) {
        setIncrementId(incrementId + 1);
        setSelectedAmount(null);
        setSelectedCharities(null);
        dispatch({
          type: 'UPDATE_TOTAL_DONATE',
          amount: amount,
        });
        ToastComponent('Payment successful', 'success');
        dispatch({
          type: 'UPDATE_MESSAGE',
          message: 'Payment successful',
        });
      }
    } catch (error) {
      ToastComponent('Error to create payment', 'error');
      throw error;
    }
  }

  useEffect(() => {
    getPayment();
    getCharitiesData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center px-10 py-20 xl:px-40">
      <h1 className="font-semibold text-primary">Omise Tamboon React</h1>
      <div className="my-10">
        <DonationAmountDisplay />
      </div>
      {isLoading || !charitiesData ? (
        <>isLoading...</>
      ) : (
        <div className="grid grid-cols-1 gap-10 lg:grid-cols-2">
          {charitiesData.map((item, index) => {
            const isSelected = selectedCharities === item.id ? '' : 'hidden';
            const cardClasses = `${absoluteCard} bg-white opacity-80 ${isSelected}`;
            const closeButtonClasses = `absolute h-16 w-16 lg:h-10 lg:w-10 right-0 z-10 mb-4 lg:m-2 cursor-pointer rounded-full p-2 hover:bg-gray-400 ${buttonAnimation} ${isSelected}`;
            const contentClasses = `${absoluteCard} flex flex-col items-center justify-center p-10 ${isSelected}`;

            return (
              <div
                className="relative flex w-full h-full flex-col overflow-hidden rounded-xl shadow-md"
                key={index}
              >
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
                  <h4 className=" line-clamp-2 h-max break-word">
                    {item.name}
                  </h4>
                  <button
                    className="hover:text-secondary h-max rounded-full border border-primary px-8 py-6 lg:px-3 lg:py-1 text-lg text-primary"
                    onClick={() => {
                      setSelectedAmount(null);
                      setSelectedCharities(item.id);
                    }}
                  >
                    <h4>Donate</h4>
                  </button>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
}

export default App;
