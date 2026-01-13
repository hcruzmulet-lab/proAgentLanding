'use client';

import { useState } from 'react';
import Icon from '@mdi/react';
import { mdiChevronDown } from '@mdi/js';
import './FAQItem.scss';

interface FAQItemProps {
  question: string;
  answer: string;
}

export function FAQItem({ question, answer }: FAQItemProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="faq-item">
      <button className="faq-item__question" onClick={() => setIsOpen(!isOpen)}>
        <span>{question}</span>
        <Icon
          path={mdiChevronDown}
          size={1}
          className={`faq-item__icon ${isOpen ? 'faq-item__icon--open' : ''}`}
        />
      </button>
      {isOpen && <div className="faq-item__answer">{answer}</div>}
    </div>
  );
}
