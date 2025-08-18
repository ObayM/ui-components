import { Typewriter } from "@/components/ui/type-writer";

export function ComponentPreview() {
  return (
    <div className="w-full h-[calc(100vh-400px)] flex justify-center items-center">
        <Typewriter texts={[
            "What do you think ?",
            "Is it good ?",
            "then go vote for me 😂"
        ]} />
    </div>
  );
}