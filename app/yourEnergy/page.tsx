import type { Metadata } from "next";
import YourEnergyForm from "@/components/your-energy/YourEnergyForm";
import { LuHeart, LuMoonStar, LuSparkles } from "react-icons/lu";

export const metadata: Metadata = {
  title: "Your Energy",
  description:
    "Explore a light, symbolic energy reading from your birth details and current location.",
};

export default function YourEnergyPage() {
  return (
    <main className="relative min-h-dvh overflow-hidden bg-[radial-gradient(circle_at_top,#fce7f3_0%,#fdf2f8_28%,#fff7ed_72%)] px-4 pb-16 pt-24 text-rose-950 md:pt-28">
      <div
        aria-hidden
        className="pointer-events-none absolute -left-20 top-32 h-64 w-64 rounded-full bg-pink-300/40 blur-3xl"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute -right-20 bottom-24 h-72 w-72 rounded-full bg-orange-200/50 blur-3xl"
      />
      <div className="mx-auto w-[95%] max-w-3xl">
        <header className="relative mb-8 text-center">
          <LuMoonStar
            aria-hidden
            className="mx-auto mb-4 h-10 w-10 text-rose-400"
          />
          <p className="mb-3 inline-flex items-center gap-2 rounded-full bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-rose-500 shadow-sm">
            <LuSparkles aria-hidden />
            Your Energy
            <LuHeart aria-hidden />
          </p>
          <h1 className="text-4xl font-bold tracking-tight text-rose-950 md:text-6xl">
            เช็กพลังใจของเธอวันนี้
          </h1>
          <p className="mx-auto mt-4 max-w-xl text-base leading-7 text-rose-900/70 md:text-lg">
            ให้วันเกิดและสถานที่เล่าเรื่องเล็ก ๆ
            ที่อาจช่วยให้เธอเข้าใจหัวใจตัวเองมากขึ้น
          </p>
        </header>

        <YourEnergyForm />

        <p className="mt-6 text-center text-sm leading-6 text-rose-900/60">
          ผลลัพธ์นี้เป็นเนื้อหาเชิงความเชื่อและความบันเทิง
          ไม่ใช่คำแนะนำทางการแพทย์ การเงิน หรือการตัดสินใจสำคัญ
        </p>
      </div>
    </main>
  );
}
