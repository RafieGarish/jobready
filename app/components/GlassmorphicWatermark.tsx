export default function GlassmorphicWatermark() {
  return (
    <div className="fixed bottom-6 right-6 z-40">
      <div className="glassmorphic-watermark bg-white/10 backdrop-blur-md border border-white/20 rounded-2xl px-4 py-3 shadow-2xl">
        <div className="flex items-center gap-2">
          <div className="flex row" >
            <span className="text-black/80 text-xs ml-1 drop-shadow-md">©2025 by </span>
            <a href="https://rafie-garish.vercel.app/" className="text-black/80 text-xs ml-1 drop-shadow-md underline font-bold">RafieGarish</a>
          </div>
        </div>
      </div>
    </div>
  );
}