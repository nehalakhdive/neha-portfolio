import { useState, type PointerEvent } from "react";
import { MapPin, Sparkles, Terminal } from "lucide-react";

import stylizedPortrait from "@/assets/neha-stylized-portrait.jpg";

/**
 * Interactive 3D-tilting stylized portrait frame with orbiting pink/purple/blue aura
 * and cleanly separated caption pills below the image (zero overlap on the face).
 */
export function AnimatedPortrait() {
  const [tilt, setTilt] = useState({ rx: 0, ry: 0, gx: 50, gy: 50 });

  const handlePointerMove = (e: PointerEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const px = (e.clientX - rect.left) / rect.width;
    const py = (e.clientY - rect.top) / rect.height;
    setTilt({
      rx: (0.5 - py) * 12,
      ry: (px - 0.5) * 14,
      gx: px * 100,
      gy: py * 100,
    });
  };

  const handlePointerLeave = () => {
    setTilt({ rx: 0, ry: 0, gx: 50, gy: 50 });
  };

  return (
    <div className="mx-auto flex w-full max-w-[390px] flex-col items-center select-none">
      <div
        className="relative w-full [perspective:1100px]"
        onPointerMove={handlePointerMove}
        onPointerLeave={handlePointerLeave}
      >
        {/* Orbiting pink + purple + blue halo */}
        <div
          aria-hidden="true"
          className="animate-spin-slow pointer-events-none absolute -inset-5 rounded-full bg-[conic-gradient(from_0deg,rgba(255,77,166,0.55),rgba(168,85,247,0.45),rgba(56,189,248,0.5),rgba(255,77,166,0.55))] opacity-70 blur-2xl"
        />

        {/* Tilting animated portrait container (completely unobstructed) */}
        <div
          className="animate-float relative rounded-[2rem] border border-[#d8b4fe]/35 bg-[#28113b]/80 p-3 shadow-[0_30px_80px_-20px_rgba(168,85,247,0.55)] backdrop-blur-xl transition-transform duration-300 ease-out"
          style={{
            transform: `rotateX(${tilt.rx}deg) rotateY(${tilt.ry}deg)`,
            transformStyle: "preserve-3d",
          }}
        >
          <div className="relative overflow-hidden rounded-[1.5rem] border border-[#d8b4fe]/25">
            <img
              src={stylizedPortrait}
              alt="Stylized studio portrait of Neha Lakhdive"
              className="aspect-square w-full object-cover transition-transform duration-500 hover:scale-[1.03]"
            />

            {/* Interactive specular sheen */}
            <div
              aria-hidden="true"
              className="pointer-events-none absolute inset-0 transition-opacity duration-300"
              style={{
                background: `radial-gradient(240px circle at ${tilt.gx}% ${tilt.gy}%, rgba(216, 180, 254, 0.22), transparent 65%)`,
              }}
            />
          </div>
        </div>
      </div>

      {/* Non-overlapping badges placed cleanly beneath the portrait */}
      <div className="mt-5 flex flex-wrap items-center justify-center gap-2.5">
        <span className="pink-sticker px-3.5 py-1 text-xs">
          <Sparkles className="size-3.5 shrink-0" />
          <span className="font-script tracking-wide">Software Engineer</span>
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#93c5fd]/35 bg-[#1b123d]/80 px-3 py-1 font-mono text-[11px] text-[#dbeafe]">
          <MapPin className="size-3 text-[#7dd3fc]" /> Pune, India
        </span>
        <span className="inline-flex items-center gap-1.5 rounded-full border border-[#d8b4fe]/30 bg-[#28113b]/80 px-3 py-1 font-mono text-[11px] text-[#f3e8ff]">
          <Terminal className="size-3 text-[#ff77bc]" /> dream it · code it · ship it
        </span>
      </div>
    </div>
  );
}
