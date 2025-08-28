'use client';

import { useState, ReactNode } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { FaChevronDown } from 'react-icons/fa';
import { clsx } from 'clsx';

export interface FAQItem {
  question: string;
  answer: string | ReactNode;
}

interface AccordionItemProps {
  item: FAQItem;
  isOpen: boolean;
  onClick: () => void;
  className?: string;
  questionClassName?: string;
  answerClassName?: string;
  icon?: ReactNode;
  iconClassName?: string;
}

const AccordionItem = ({
  item,
  isOpen,
  onClick,
  className,
  questionClassName,
  answerClassName,
  icon,
  iconClassName,
}: AccordionItemProps) => (
  <div className={clsx('border-b border-white/10', className)}>
    <button
      onClick={onClick}
      className="w-full flex justify-between items-center text-left py-6 px-2"
    >
      <span className={clsx('text-lg font-medium text-foreground', questionClassName)}>
        {item.question}
      </span>
      <motion.div
        animate={{ rotate: isOpen ? 180 : 0 }}
        transition={{ duration: 0.3 }}
      >
        {icon || (
          <FaChevronDown
            className={clsx('text-primary transition-colors', { 'text-primary': isOpen }, iconClassName)}
          />
        )}
      </motion.div>
    </button>
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          transition={{ duration: 0.3, ease: 'easeInOut' }}
          className="overflow-hidden"
        >
          <div className={clsx('pb-6 px-2 text-muted-foreground leading-relaxed', answerClassName)}>
            {typeof item.answer === 'string' ? <p>{item.answer}</p> : item.answer}
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  </div>
);

interface AccordionFAQProps {
  faqItems: FAQItem[];
  className?: string;
  itemClassName?: string;
  questionClassName?: string;
  answerClassName?: string;
  icon?: ReactNode;
  iconClassName?: string;
  title?: string;
  titleClassName?: string;
  showTitle?: boolean;
}

export const AccordionFAQ = ({
  faqItems,
  className,
  itemClassName,
  questionClassName,
  answerClassName,
  icon,
  iconClassName,
  title = 'Frequently Asked Questions',
  titleClassName,
  showTitle = true,
}: AccordionFAQProps) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  const handleClick = (index: number) => {
    setOpenIndex(openIndex === index ? null : index);
  };

  return (
    <section id="faq" className={clsx('max-w-4xl mx-auto', className)}>
      {showTitle && (
        <motion.h2
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.8 }}
          className={clsx(
            'text-4xl sm:text-5xl font-bold font-display text-center mb-16 tracking-wide',
            titleClassName
          )}
        >
          {title}
        </motion.h2>
      )}
      <div className="p-4">
        {faqItems.map((item, index) => (
          <AccordionItem
            key={index}
            item={item}
            isOpen={openIndex === index}
            onClick={() => handleClick(index)}
            className={itemClassName}
            questionClassName={questionClassName}
            answerClassName={answerClassName}
            icon={icon}
            iconClassName={iconClassName}
          />
        ))}
      </div>
    </section>
  );
};