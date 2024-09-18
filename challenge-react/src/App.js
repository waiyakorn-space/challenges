import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useDispatch } from 'react-redux';
import { summaryDonations } from './helpers';
import DonationAmountDisplay from './components/DonationAmountDisplay';
import DonationPayment from './components/DonationPayment';

function App() {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const [charitiesData, setCharitiesData] = useState([
    {
      id: 1,
      name: 'Baan Kru Noi',
      image: 'baan-kru-noi.jpg',
      currency: 'THB',
    },
    {
      id: 2,
      name: 'Habitat for Humanity Thailand',
      image: 'habitat-for-humanity-thailand.jpg',
      currency: 'THB',
    },
    {
      id: 3,
      name: 'Paper Ranger',
      image: 'paper-ranger.jpg',
      currency: 'THB',
    },
    {
      id: 4,
      name: 'Makhampom Theater',
      image: 'makhampom-theater.jpg',
      currency: 'THB',
    },
    {
      id: 5,
      name: 'Thailand Association of the Blind',
      image: 'thailand-association-of-the-blind.jpg',
      currency: 'THB',
    },
  ]);
  const [selectedCharities, setSelectedCharities] = useState(1);
  const [selectedAmount, setSelectedAmount] = useState();

  const getCharitiesData = async () => {
    try {
      setIsLoading(true);
      const response = await axios.get('http://localhost:3001/charities');
      setCharitiesData(response.data);
      setIsLoading(false);
      return response;
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching charities', error);
      throw error;
    }
  };

  const getPayment = async () => {
    try {
      const { data } = await axios.get('http://localhost:3001/payments');
      console.log({ getPayment: data });
      dispatch({
        type: 'UPDATE_TOTAL_DONATE',
        amount: summaryDonations(data.map((item) => item.amount)),
      });
      return data;
    } catch (error) {
      setIsLoading(false);
      console.error('Error fetching charities', error);
      throw error;
    }
  };

  useEffect(() => {
    getPayment();
    getCharitiesData();
  }, []);

  useEffect(() => {
    setIsLoading(false);
    console.log({ charitiesData });
  }, [charitiesData]);

  return (
    <div className="flex flex-col bg-red-200 lg:bg-[#F3F2EC] justify-center items-center px-10 lg:px-40 py-20">
      <h1 className="font-semibold">Omise Tamboon React</h1>
      <div className="my-10">
        <DonationAmountDisplay />
      </div>
      {isLoading || !charitiesData ? (
        <>isLoading...</>
      ) : (
        <div className="grid grid-cols-1 gap-10 xl:grid-cols-2">
          {charitiesData.map((item, index) => (
            <div
              className="flex flex-col relative w-full shadow-md overflow-hidden rounded-xl"
              key={index}
            >
              <div
                className={`absolute inset-0 w-full h-full bg-white opacity-80 ${item.id === selectedCharities ? '' : 'hidden'}`}
              />
              <DonationPayment
                item={item}
                selectedAmount={selectedAmount}
                setSelectedAmount={setSelectedAmount}
                selectedCharities={selectedCharities}
                setSelectedCharities={setSelectedCharities}
              />
              <div className="flex-1">
                <img
                  src={`images/${item.image}`}
                  alt={item.image}
                  className="h-full w-full object-top object-cover"
                />
              </div>
              <div className="bg-white h-24 p-4 flex flex-row justify-between overflow-hidden gap-4">
                <h4 className=" line-clamp-2 break-all h-max">{item.name}</h4>
                <button
                  className="py-1 text-primary hover:text-secondary px-3 text-lg h-max border-primary border rounded-full"
                  onClick={() => setSelectedCharities(item.id)}
                >
                  Donate
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default App;
