import { CodeBlock } from "@/components/docs/code-block";
import { Tabs } from "@/components/ui/tabs";
import { ComponentPreview } from "./preview";
import getFileCode from "@/lib/getFileCode";

const previewCodeString = getFileCode('/app/docs/glass-panel/preview.tsx'); 
const installationCode = `
npm install react-parallax-tilt framer-motion clsx
`;

const componentCode = getFileCode('/components/ui/glass-panel.tsx');

export default function DocsPage() {
  const previewTabs = [
    {
      label: 'Preview',
      content: <ComponentPreview />,
    },
    {
      label: 'Code',
      content: <CodeBlock code={previewCodeString} />,
    },
  ];

  return (
    <div className="bg-[#0b1120] text-gray-300 font-sans">
      <main className="max-w-5xl mx-auto px-4 py-16 sm:py-24">
        
        <section className="text-center mb-24">
          <h1 className="text-5xl md:text-6xl font-bold bg-clip-text text-transparent bg-gradient-to-b from-white to-gray-400">
            Glass Panel
          </h1>
          <p className="mt-4 max-w-2xl mx-auto text-lg md:text-xl text-gray-400">
            A visually stunning glass panel that reacts to mouse movements and scrolls, perfect for modern UIs.
          </p>
        </section>

        <div className="rounded-xl border border-gray-700 bg-gray-900/40">
           <Tabs tabs={previewTabs} />
        </div>
        
        <section className="mt-24">
          <h2 className="text-3xl font-bold mb-6 text-white">Installation</h2>
          <p className="text-gray-400 mb-4">
            First, install the necessary dependencies for the glass panel effect.
          </p>
          <CodeBlock code={installationCode} />

          <p className="mt-8 text-gray-400 mb-4">
            Next, copy and paste the following component code into your project.
          </p>
          <CodeBlock code={componentCode} fileName='components/ui/glass-panel.tsx' />
        </section>
        
      </main>
    </div>
  );
}