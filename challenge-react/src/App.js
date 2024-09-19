import React, { useEffect, useState } from 'react';
import { useDispatch } from 'react-redux';
import {
  createPayment,
  getCharities,
  getPayments,
} from './services/apiService';
import { summaryDonations } from './services/helpers';
import DonationAmountDisplay from './components/DonationAmountDisplay';
import { ToastComponent } from './components/ToastComponent';
import CharityCard from './components/CharityCard';
function App() {
  const currency = 'THB';
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [incrementId, setIncrementId] = useState(1);
  const [charitiesData, setCharitiesData] = useState();
  const [selectedCharities, setSelectedCharities] = useState();
  const [selectedAmount, setSelectedAmount] = useState();

  async function handlePay(id, amount, currency) {
    try {
      const response = await createPayment(id, amount, currency, incrementId);
      if (response.status === 201) {
        setIncrementId(incrementId + 1);
        setSelectedAmount(null);
        setSelectedCharities(null);
        dispatch({ type: 'UPDATE_TOTAL_DONATE', amount: amount });
        dispatch({ type: 'UPDATE_MESSAGE', message: 'Payment successful' });
        ToastComponent('Payment successful', 'success');
      }
    } catch (error) {
      ToastComponent('Error to create payment', 'error');
      throw error;
    }
  }

  const fetchData = async () => {
    try {
      setIsLoading(true);
      const { data: charities } = await getCharities();
      setCharitiesData(charities);

      const { data: payments } = await getPayments();
      if (payments.length > 0) {
        const sortedPayments = payments.sort((a, b) => b.id - a.id);
        setIncrementId(sortedPayments[0].id + 1);
        dispatch({
          type: 'UPDATE_TOTAL_DONATE',
          amount: summaryDonations(payments.map((p) => p.amount)),
        });
      }
      setIsLoading(false);
    } catch (error) {
      ToastComponent('Error fetching data', 'error');
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();
  }, []);

  return (
    <div className="flex flex-col items-center justify-center p-20 xl:px-40">
      <h1 className="font-semibold text-primary text-center">
        Omise Tamboon React
      </h1>
      <div className="my-20 lg:my-10">
        <DonationAmountDisplay />
      </div>
      {isLoading || !charitiesData ? (
        <>isLoading...</>
      ) : (
        <div className="grid grid-cols-1 gap-20 lg:gap-10 lg:grid-cols-2">
          {charitiesData.map((item, index) => (
            <CharityCard
              key={index}
              item={item}
              isSelected={selectedCharities === item.id ? '' : 'hidden'}
              selectedCharities={selectedCharities}
              setSelectedCharities={setSelectedCharities}
              selectedAmount={selectedAmount}
              setSelectedAmount={setSelectedAmount}
              handlePay={handlePay}
              currency={currency}
            />
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
