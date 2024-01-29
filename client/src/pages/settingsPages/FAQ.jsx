import React from 'react';

const FAQ = () => {
  const faqData = [
    {
      question: 'What is the purpose of this application?',
      answer: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
    },
    {
      question: 'How can I contact customer support?',
      answer: 'You can contact our customer support team by visiting the Contact Us page.',
    },
    {
      question: 'Is there a mobile app available?',
      answer: 'Yes, we have a mobile app available for both iOS and Android platforms.',
    },
    // Add more FAQ items as needed
  ];

  return (
    <div>
      <h1>Frequently Asked Questions (FAQ)</h1>
      {faqData.map((item, index) => (
        <div key={index}>
          <h3>{item.question}</h3>
          <p>{item.answer}</p>
        </div>
      ))}
    </div>
  );
};

export default FAQ;