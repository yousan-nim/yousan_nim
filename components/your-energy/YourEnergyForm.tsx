"use client";

import { FormEvent, useState } from "react";
import {
  LuCheck,
  LuCopy,
  LuHeart,
  LuLocateFixed,
  LuMapPin,
  LuShieldCheck,
  LuSparkles,
} from "react-icons/lu";

type Reading = {
  ruleId: string;
  score: number;
  title: string;
  message: string;
  promptText: string;
  imagePrompt: string;
};

export default function YourEnergyForm() {
  const [location, setLocation] = useState("");
  const [locationSeed, setLocationSeed] = useState("");
  const [locationStatus, setLocationStatus] = useState("");
  const [locationConsent, setLocationConsent] = useState(false);
  const [reading, setReading] = useState<Reading | null>(null);
  const [submitError, setSubmitError] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copyStatus, setCopyStatus] = useState("");

  const copyImagePrompt = async () => {
    if (!reading) return;

    try {
      await navigator.clipboard.writeText(reading.imagePrompt);
      setCopyStatus("คัดลอกพรอมต์แล้ว");
    } catch {
      setCopyStatus("คัดลอกไม่สำเร็จ กรุณาลองอีกครั้ง");
    }
  };

  const requestLocation = (continueToForm = false) => {
    if (!navigator.geolocation) {
      setLocationStatus("อุปกรณ์นี้ไม่รองรับการระบุตำแหน่ง");
      return;
    }

    setLocationStatus("กำลังขออนุญาตตำแหน่ง…");
    navigator.geolocation.getCurrentPosition(
      ({ coords }) => {
        setLocation("ใช้ตำแหน่งอุปกรณ์แล้ว");
        setLocationSeed(`${coords.latitude.toFixed(3)},${coords.longitude.toFixed(3)}`);
        setLocationStatus("รับตำแหน่งเรียบร้อยแล้ว");
        if (continueToForm) setLocationConsent(true);
      },
      () => setLocationStatus("ยังไม่ได้รับอนุญาต กรุณาเปิดสิทธิ์ตำแหน่งแล้วลองอีกครั้ง"),
      { enableHighAccuracy: false, timeout: 10000 }
    );
  };

  const submit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    setIsSubmitting(true);
    setSubmitError("");
    setCopyStatus("");

    try {
      const response = await fetch("/api/your-energy", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          nickname: form.get("nickname"),
          birthDate: form.get("birthDate"),
          birthTime: form.get("birthTime") || undefined,
          birthPlace: form.get("birthPlace") || undefined,
          location: locationSeed || location,
          today: new Date().toLocaleDateString("en-CA"),
          previousRuleId: reading?.ruleId,
        }),
      });
      const result = await response.json();

      if (!response.ok) {
        throw new Error(result.error?.message || "สร้างคำทำนายไม่สำเร็จ");
      }

      setReading(result.data);
    } catch (error) {
      setSubmitError(
        error instanceof Error ? error.message : "เกิดข้อผิดพลาด กรุณาลองอีกครั้ง"
      );
    } finally {
      setIsSubmitting(false);
    }
  };

  const fieldClass =
    "your-energy-input mt-2 min-h-11 w-full rounded-xl border border-rose-200 bg-white/80 px-3 py-2.5 text-rose-950 shadow-sm placeholder:text-rose-300 transition focus:border-rose-400";

  return (
    <>
      {!locationConsent && (
        <div
          role="dialog"
          aria-modal="true"
          aria-labelledby="location-consent-title"
          aria-describedby="location-consent-description"
          className="fixed inset-0 z-50 grid place-items-center bg-rose-950/35 p-4 backdrop-blur-md"
        >
          <div className="w-full max-w-sm rounded-2xl border border-white/80 bg-rose-50 p-6 text-center shadow-[0_24px_70px_rgba(136,19,55,0.28)]">
            <div className="mx-auto grid h-14 w-14 place-items-center rounded-full bg-rose-100 text-rose-500">
              <LuMapPin aria-hidden className="h-7 w-7" />
            </div>
            <h2
              id="location-consent-title"
              className="mt-4 text-2xl font-bold text-rose-950"
            >
              ขอใช้ตำแหน่งของเธอนะ
            </h2>
            <p
              id="location-consent-description"
              className="mt-3 text-sm leading-6 text-rose-900/70"
            >
              เราใช้ตำแหน่งเพื่อสร้างคำทำนายให้เข้ากับพื้นที่ที่เธออยู่
              ข้อมูลจะส่งไปประมวลผลชั่วคราวและไม่ถูกบันทึกลงฐานข้อมูล
            </p>
            {locationStatus && (
              <p role="alert" className="mt-3 text-sm font-medium text-rose-700">
                {locationStatus}
              </p>
            )}
            <button
              autoFocus
              type="button"
              onClick={() => requestLocation(true)}
              className="mt-5 inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-rose-500 px-5 font-semibold text-white shadow-lg shadow-rose-300/40 transition hover:bg-rose-400"
            >
              <LuLocateFixed aria-hidden />
              ยินยอมและเปิดตำแหน่ง
            </button>
            <p className="mt-3 text-xs text-rose-900/50">
              มือถือจะแสดงหน้าต่างขออนุญาตอีกครั้ง
            </p>
          </div>
        </div>
      )}

      <section className="relative rounded-2xl border border-white/80 bg-white/65 p-5 shadow-[0_24px_70px_rgba(190,24,93,0.12)] backdrop-blur-xl md:p-8">
      <div
        aria-hidden
        className="absolute -right-3 -top-3 grid h-12 w-12 rotate-6 place-items-center rounded-2xl bg-rose-400 text-white shadow-md"
      >
        <LuHeart className="h-5 w-5" />
      </div>
      <form onSubmit={submit} className="space-y-5">
        <div className="grid gap-5 md:grid-cols-2">
          <label className="text-sm font-semibold text-rose-950/80">
            ชื่อเล่น
            <input
              name="nickname"
              required
              autoComplete="nickname"
              placeholder="ชื่อที่อยากให้เราเรียก"
              className={fieldClass}
            />
          </label>
          <label className="text-sm font-semibold text-rose-950/80">
            วันเดือนปีเกิด
            <input name="birthDate" required type="date" className={fieldClass} />
          </label>
          <label className="text-sm font-semibold text-rose-950/80">
            เวลาเกิด <span className="font-normal text-rose-900/50">(ถ้าทราบ)</span>
            <input name="birthTime" type="time" className={fieldClass} />
          </label>
          <label className="text-sm font-semibold text-rose-950/80">
            เมืองหรือประเทศที่เกิด
            <input
              name="birthPlace"
              placeholder="เช่น Bangkok, Thailand"
              className={fieldClass}
            />
          </label>
        </div>

        <fieldset>
          <legend className="text-sm font-semibold text-rose-950/80">ตอนนี้เธออยู่ที่ไหน</legend>
          <div className="mt-2 flex flex-col gap-2 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <LuMapPin aria-hidden className="absolute left-3 top-3.5 text-rose-400" />
              <input
                required
                value={location}
                onChange={(event) => {
                  setLocation(event.target.value);
                  setLocationSeed("");
                }}
                placeholder="พิมพ์ชื่อเมือง"
                aria-label="เมืองหรือตำแหน่งปัจจุบัน"
                className={`${fieldClass} mt-0 pl-10`}
              />
            </div>
            <span className="text-center text-sm text-rose-900/50">หรือ</span>
            <button
              type="button"
              onClick={() => requestLocation()}
              className="inline-flex min-h-11 items-center justify-center gap-2 rounded-xl border border-rose-200 bg-rose-50 px-4 text-sm font-semibold text-rose-700 transition hover:bg-rose-100"
            >
              <LuLocateFixed aria-hidden />
              {locationSeed ? "ใช้ตำแหน่งอุปกรณ์แล้ว" : "ใช้ตำแหน่งอุปกรณ์"}
            </button>
          </div>
          {locationStatus && (
            <p role="status" className="mt-2 text-sm text-rose-700">
              {locationStatus}
            </p>
          )}
          <p className="mt-2 flex gap-2 text-xs leading-5 text-rose-900/60">
            <LuShieldCheck aria-hidden className="mt-0.5 shrink-0 text-rose-500" />
            เบราว์เซอร์จะถามอนุญาตก่อนเสมอ ตำแหน่งจะส่งไปคำนวณชั่วคราวและไม่ถูกบันทึก
          </p>
        </fieldset>

        <label className="flex gap-3 rounded-xl bg-rose-50/80 p-3 text-sm leading-6 text-rose-900/70">
          <input required type="checkbox" className="mt-1 h-5 w-5 accent-rose-500" />
          ฉันยินยอมให้ส่งข้อมูลข้างต้นไปประมวลผลคำทำนาย โดยไม่มีการบันทึกลงฐานข้อมูล
        </label>

        <button
          type="submit"
          disabled={isSubmitting}
          className="inline-flex min-h-12 w-full items-center justify-center gap-2 rounded-xl bg-rose-500 px-5 font-semibold text-white shadow-lg shadow-rose-300/40 transition hover:-translate-y-0.5 hover:bg-rose-400"
        >
          <LuSparkles aria-hidden />
          {isSubmitting ? "กำลังอ่านพลังงาน…" : "ดูพลังงานของฉัน"}
        </button>
        {submitError && (
          <p role="alert" className="text-center text-sm font-medium text-rose-700">
            {submitError}
          </p>
        )}
      </form>

      {reading && (
        <div aria-live="polite" className="mt-8 rounded-2xl border border-rose-200 bg-gradient-to-br from-rose-50 to-orange-50 p-5 text-center shadow-sm">
          <LuSparkles aria-hidden className="mx-auto mb-2 h-7 w-7 text-rose-500" />
          <p className="text-sm font-bold uppercase tracking-wider text-rose-500">
            พลังงานวันนี้ {reading.score}%
          </p>
          <h2 className="mt-2 text-2xl font-bold text-rose-950">{reading.title}</h2>
          <p className="mt-3 text-rose-900/70">
            {reading.message}
          </p>
          <div className="mt-6 border-t border-rose-200 pt-5 text-left">
            <h3 className="font-bold text-rose-950">
              พรอมต์สร้างภาพให้กำลังใจ
            </h3>
            <p className="mt-1 text-sm text-rose-900/60">
              พร้อมนำไปใช้กับเครื่องมือสร้างภาพ
            </p>
            <pre className="mt-3 whitespace-pre-wrap rounded-xl bg-white/70 p-4 font-sans text-sm leading-6 text-rose-900/75">
              {reading.imagePrompt}
            </pre>
            <button
              type="button"
              onClick={copyImagePrompt}
              className="mt-3 inline-flex min-h-11 w-full items-center justify-center gap-2 rounded-xl border border-rose-300 bg-white px-4 text-sm font-bold text-rose-700 transition hover:bg-rose-100"
            >
              {copyStatus === "คัดลอกพรอมต์แล้ว" ? (
                <LuCheck aria-hidden />
              ) : (
                <LuCopy aria-hidden />
              )}
              {copyStatus || "คัดลอกพรอมต์สร้างภาพ"}
            </button>
          </div>
        </div>
      )}
      </section>
    </>
  );
}
