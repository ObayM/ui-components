import { StackedCards } from '@/components/ui/stacked-cards';

const featuresData = [
  { id: 'feat-1', content: 'Fully responsive by default.' },
  { id: 'feat-2', content: 'Built with Tailwind CSS for easy styling.' },
  { id: 'feat-3', content: 'Animated with GSAP for smooth performance.' },
  { id: 'feat-4', content: 'Type-safe with TypeScript.' },
  { id: 'feat-5', content: 'Composable and highly reusable.' },
];

export function ComponentPreview() {
  return (
    <StackedCards
      title="Key Component Features"
      subtitle="This is a live demonstration. Scroll down to see it in action."
      cards={featuresData}
    />
  );
}