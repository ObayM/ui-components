import { AccordionFAQ, FAQItem } from '@/components/ui/accordion';

const myFaqItems: FAQItem[] = [
  {
    question: 'Why should I use this?',
    answer: 'Okay look, its a really good question. I mean, why not? It\'s free, it\'s easy to use, and it looks great!'
  },
  {
    question: 'Why vote for me?',
    answer: 'Oh, cool question! but simply look around you, do you see a cool liquid ui library? no? well then you know what to do :)'
  }
];

const ComponentPreview = () => (
  <div>
    <AccordionFAQ faqItems={myFaqItems} />
  </div>
);

export {ComponentPreview};