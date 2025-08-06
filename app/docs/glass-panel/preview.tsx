import {GlassPanel} from "@/components/ui/glass-panel";

export function ComponentPreview () {
  return (
    <div className="flex flex-col items-center justify-center gap-8 p-8">
      <GlassPanel className="w-full max-w-md p-6">
        <h2 className="text-2xl font-bold mb-4">Glass Panel</h2>
        <p className="text-gray-300 mb-4">  
          This is a cool glass panel that reacts to mouse movements and scrolls.
        </p>
      </GlassPanel>
    </div>
  );
} 