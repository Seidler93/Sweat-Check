import React, { useState } from 'react';

const PaymentMethods = () => {
  const [paymentMethods, setPaymentMethods] = useState([
    {
      id: 1,
      cardNumber: '**** **** **** 1234',
      cardType: 'Visa',
    },
    {
      id: 2,
      cardNumber: '**** **** **** 5678',
      cardType: 'MasterCard',
    },
    // Add more payment methods as needed
  ]);

  const addPaymentMethod = () => {
    // Placeholder logic to add a new payment method
    const newMethod = {
      id: Date.now(),
      cardNumber: 'New Card',
      cardType: 'New Type',
    };
    setPaymentMethods((prevMethods) => [...prevMethods, newMethod]);
  };

  const removePaymentMethod = (id) => {
    // Placeholder logic to remove a payment method
    setPaymentMethods((prevMethods) => prevMethods.filter((method) => method.id !== id));
  };

  return (
    <div>
      <h1>Payment Methods</h1>
      <ul>
        {paymentMethods.map((method) => (
          <li key={method.id}>
            <p>{method.cardType}</p>
            <p>{method.cardNumber}</p>
            <button onClick={() => removePaymentMethod(method.id)}>Remove</button>
          </li>
        ))}
      </ul>
      <button onClick={addPaymentMethod}>Add Payment Method</button>
    </div>
  );
};

export default PaymentMethods;