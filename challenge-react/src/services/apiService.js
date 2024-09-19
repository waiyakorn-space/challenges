import axios from 'axios';

export const getCharities = () => axios.get('http://localhost:3001/charities');
export const getPayments = () => axios.get('http://localhost:3001/payments');
export const createPayment = (id, amount, currency, incrementId) =>
  axios.post('http://localhost:3001/payments', {
    charitiesId: id,
    amount: amount,
    currency: currency,
    id: incrementId,
  });
