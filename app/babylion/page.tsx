"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";

const DAYS = [
  { label: "월", value: "MON" },
  { label: "화", value: "TUE" },
  { label: "수", value: "WED" },
  { label: "목", value: "THU" },
  { label: "금", value: "FRI" },
  { label: "토", value: "SAT", isWeekend: true },
  { label: "일", value: "SUN", isWeekend: true },
];

const TIMES = Array.from({ length: 15 }, (_, i) => i + 9); // 9 to 23

export default function BabylionPage() {
  const router = useRouter();
  const [name, setName] = useState("");
  const [pin, setPin] = useState("");
  const [unavailableSlots, setUnavailableSlots] = useState<string[]>([]);
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    const storedName = localStorage.getItem("mutsa-name");
    const storedPin = localStorage.getItem("mutsa-pin");
    if (!storedName || !storedPin) {
      alert("로그인이 필요합니다.");
      router.push("/");
    } else {
      setName(storedName);
      setPin(storedPin);

      fetch(`/api/schedule?name=${encodeURIComponent(storedName)}&pin=${encodeURIComponent(storedPin)}`)
        .then(async (res) => {
          if (res.status === 401) {
            alert("입력한 이름(Identity)의 PIN 번호가 맞지 않습니다. 다시 로그인해 주세요.");
            localStorage.removeItem("mutsa-name");
            localStorage.removeItem("mutsa-pin");
            router.push("/");
            return;
          }
          if (res.ok) {
            const data = await res.json();
            if (data && Array.isArray(data.unavailableSlots)) {
              setUnavailableSlots(data.unavailableSlots);
            }
          }
        })
        .catch(console.error);
    }
  }, [router]);

  const toggleSlot = (day: string, time: number) => {
    const slot = `${day}-${time.toString().padStart(2, "0")}`;
    setUnavailableSlots((prev) =>
      prev.includes(slot) ? prev.filter((s) => s !== slot) : [...prev, slot]
    );
  };

  const handleSubmit = async () => {
    if (isSubmitting) return;
    setIsSubmitting(true);
    try {
      const res = await fetch("/api/schedule", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name, pin, unavailableSlots }),
      });
      if (res.ok) {
        alert("제출 완료되었습니다.");
      } else if (res.status === 401) {
        alert("비밀번호 불일치: 기존에 제출된 이름의 PIN 번호와 다릅니다.");
      } else {
        alert("제출에 실패했습니다. 다시 시도해 주세요.");
      }
    } catch (error) {
      console.error(error);
      alert("오류가 발생했습니다.");
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="bg-background text-on-surface font-body max-w-md mx-auto min-h-screen relative pb-32">
      <header className="bg-white/80 dark:bg-slate-950/80 backdrop-blur-md fixed top-0 w-full z-50 shadow-[0_4px_12px_rgba(153,65,0,0.08)] max-w-md mx-auto">
        <div className="flex items-center justify-between px-6 py-4">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="text-orange-600 active:scale-95 duration-200 transition-colors hover:bg-orange-50 p-1 rounded-full">
              <span className="material-symbols-outlined" data-icon="arrow_back">arrow_back</span>
            </button>
            <h1 className="text-orange-600 font-plus-jakarta font-bold text-lg">환영합니다, {name}님!</h1>
          </div>
          <div className="flex items-center gap-4">
            <span className="material-symbols-outlined text-orange-600" data-icon="calendar_today">calendar_today</span>
          </div>
        </div>
      </header>
      
      <main className="pt-24 px-6">
        <section className="mb-8">
          <div className="flex items-center gap-2 mb-2">
            <span className="bg-primary-container/20 text-primary font-bold text-[10px] px-2 py-0.5 rounded-full uppercase tracking-wider">Babylion Mode</span>
          </div>
          <h2 className="font-headline text-2xl font-extrabold text-on-surface tracking-tight mb-2">활동 가능 시간 설정</h2>
          <p className="text-on-surface-variant text-sm leading-relaxed">참석이 불가능한 시간을 터치해서 제외해 주세요. <br/>나머지 시간은 활동 가능 시간으로 제출됩니다.</p>
        </section>

        <div className="bg-surface-container-lowest rounded-2xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] overflow-hidden">
          <div className="grid grid-cols-8 border-b border-surface-container">
            <div className="h-10 border-r border-surface-container"></div>
            <div className="flex items-center justify-center font-label text-[10px] font-bold text-on-surface-variant">월</div>
            <div className="flex items-center justify-center font-label text-[10px] font-bold text-on-surface-variant">화</div>
            <div className="flex items-center justify-center font-label text-[10px] font-bold text-on-surface-variant">수</div>
            <div className="flex items-center justify-center font-label text-[10px] font-bold text-on-surface-variant">목</div>
            <div className="flex items-center justify-center font-label text-[10px] font-bold text-on-surface-variant">금</div>
            <div className="flex items-center justify-center font-label text-[10px] font-bold text-on-surface-variant">토</div>
            <div className="flex items-center justify-center font-label text-[10px] font-bold text-on-surface-variant">일</div>
          </div>

          <div className="max-h-[500px] overflow-y-auto no-scrollbar">
            <div className="grid grid-cols-8">
              {TIMES.map((time) => (
                <div key={time} className="contents relative">
                  <div className="flex items-center justify-center border-r border-b border-surface-container-low h-10 text-[9px] font-medium text-outline pt-0" style={{ gridColumn: '1 / 2' }}>
                    {time === 18 ? (
                      <div className="flex items-center justify-center border-r border-b border-surface-container-low h-10 text-[9px] font-medium text-outline text-center">18:00<br/>(PM)</div>
                    ) : `${String(time).padStart(2,"0")}:00`}
                  </div>
                  
                  {DAYS.map((day, idx) => {
                    const slotStr = `${day.value}-${time.toString().padStart(2, "0")}`;
                    const isUnavailable = unavailableSlots.includes(slotStr);
                    const isLast = idx === DAYS.length - 1;
                    const borderClass = isLast ? "border-b border-surface-container-low h-10" : "border-r border-b border-surface-container-low h-10";

                    return (
                      <div 
                        key={day.value}
                        onClick={() => toggleSlot(day.value, time)}
                        className={`${borderClass} ${
                          isUnavailable 
                            ? "bg-surface-container-high flex items-center justify-center cursor-pointer" 
                            : "bg-orange-50/50 hover:bg-orange-100 transition-colors cursor-pointer"
                        }`}
                      >
                        {isUnavailable && (
                          <span className="material-symbols-outlined text-outline text-xs" data-icon="close">close</span>
                        )}
                      </div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="mt-6 p-5 bg-primary-container/10 rounded-2xl flex items-start gap-4">
          <span className="material-symbols-outlined text-primary mt-0.5" data-icon="info">info</span>
          <div>
            <p className="text-sm font-bold text-primary mb-1">제출 전 확인해 주세요</p>
            <p className="text-xs text-on-surface-variant leading-relaxed">입력된 시간은 운영진의 학술 일정 및 스터디 배정에 중요한 자료로 활용됩니다.</p>
          </div>
        </div>
      </main>

      <div className="fixed bottom-24 left-6 right-6 z-40 max-w-[400px] mx-auto">
        <button 
          onClick={handleSubmit}
          disabled={isSubmitting}
          className="w-full bg-gradient-to-r from-primary to-primary-container text-white py-4 rounded-xl flex items-center justify-center gap-2 shadow-[0_12px_32px_-4px_rgba(153,65,0,0.3)] active:scale-95 transition-all duration-200 group"
        >
          {isSubmitting ? (
            <span className="font-headline font-bold">제출 중...</span>
          ) : (
            <>
              <span className="material-symbols-outlined font-bold transition-transform group-hover:scale-110" data-icon="check_circle" style={{ fontVariationSettings: "'FILL' 1" }}>check_circle</span>
              <span className="font-headline font-bold">시간표 제출하기</span>
            </>
          )}
        </button>
      </div>

      <nav className="bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl fixed bottom-0 left-0 right-0 max-w-md mx-auto flex justify-around items-center px-4 pb-6 pt-2 z-50 rounded-t-3xl shadow-[0_-4px_12px_rgba(0,0,0,0.03)] border-t border-slate-100">
        <div onClick={() => router.push("/")} className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 px-5 py-2 hover:text-orange-500 transition-all active:scale-90 duration-150 cursor-pointer">
          <span className="material-symbols-outlined mb-1" data-icon="login">login</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Home</span>
        </div>
        <div onClick={() => router.push("/babylion")} className="flex flex-col items-center justify-center bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-2xl px-5 py-2 active:scale-90 duration-150 cursor-pointer">
          <span className="material-symbols-outlined mb-1" data-icon="grid_view" style={{ fontVariationSettings: "'FILL' 1" }}>grid_view</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Schedule</span>
        </div>
        <div onClick={() => router.push("/admin")} className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 px-5 py-2 hover:text-orange-500 transition-all active:scale-90 duration-150 cursor-pointer">
          <span className="material-symbols-outlined mb-1" data-icon="dashboard">dashboard</span>
          <span className="text-[10px] font-bold uppercase tracking-widest">Admin</span>
        </div>
      </nav>
    </div>
  );
}
