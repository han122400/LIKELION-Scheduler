"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { BarChart3, Calendar, PieChart } from "lucide-react";

type ScheduleData = {
  name: string;
  unavailableSlots: string[];
};

const DAYS = [
  { label: "월", value: "MON" },
  { label: "화", value: "TUE" },
  { label: "수", value: "WED" },
  { label: "목", value: "THU" },
  { label: "금", value: "FRI" },
  { label: "토", value: "SAT" },
  { label: "일", value: "SUN" },
];

const TIMES = Array.from({ length: 15 }, (_, i) => i + 9); // 9 to 23

export default function AdminPage() {
  const router = useRouter();
  const [schedules, setSchedules] = useState<ScheduleData[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedSlot, setSelectedSlot] = useState<string | null>(null);
  
  const [adminUnlocked, setAdminUnlocked] = useState(false);
  const [adminPinInput, setAdminPinInput] = useState("");

  useEffect(() => {
    if (!adminUnlocked) return;

    fetch("/api/schedule")
      .then((res) => res.json())
      .then((data) => {
        if (Array.isArray(data)) {
          setSchedules(data);
        } else {
          setSchedules([]);
          console.error("API Error:", data);
        }
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setLoading(false);
      });
  }, [adminUnlocked]);

  const totalRespondents = schedules.length;

  // slotCounts tracking unavailable counts
  const slotCounts: Record<string, number> = {};
  DAYS.forEach((d) => {
    TIMES.forEach((t) => {
      slotCounts[`${d.value}-${t.toString().padStart(2, "0")}`] = 0;
    });
  });

  schedules.forEach((sub) => {
    sub.unavailableSlots.forEach((slot) => {
      if (slotCounts[slot] !== undefined) {
        slotCounts[slot]++;
      }
    });
  });

  const sortedSlots = Object.entries(slotCounts).sort((a, b) => a[1] - b[1]);
  const bestSlots = sortedSlots.slice(0, 3);

  const getDayLabel = (dayValue: string) => DAYS.find((d) => d.value === dayValue)?.label || "";

  // Days average for bar chart
  const averageByDay = DAYS.map((d) => {
    let dayTotalAvail = 0;
    TIMES.forEach((t) => {
      const unavail = slotCounts[`${d.value}-${t.toString().padStart(2, "0")}`] || 0;
      dayTotalAvail += (totalRespondents - unavail);
    });
    const avg = Math.max(0, Math.round(dayTotalAvail / TIMES.length));
    const percent = totalRespondents > 0 ? (avg / totalRespondents) * 100 : 0;
    return { day: d.label, avg, percent };
  });

  // Buckets for donout chart
  let morningAvail = 0, afternoonAvail = 0, eveningAvail = 0;
  DAYS.forEach(d => {
    TIMES.forEach(t => {
      const avail = totalRespondents - (slotCounts[`${d.value}-${t.toString().padStart(2, "0")}`] || 0);
      if (t < 12) morningAvail += avail;
      else if (t < 18) afternoonAvail += avail;
      else eveningAvail += avail;
    });
  });
  const totalAvailSlots = morningAvail + afternoonAvail + eveningAvail || 1; 
  const eveningPct = Math.round((eveningAvail / totalAvailSlots) * 100);
  const afternoonPct = Math.round((afternoonAvail / totalAvailSlots) * 100);
  const morningPct = Math.round((morningAvail / totalAvailSlots) * 100);

  const getHeatmapColor = (unavailCount: number) => {
    if (totalRespondents === 0) return "bg-orange-50";
    const ratio = (totalRespondents - unavailCount) / totalRespondents;
    if (ratio >= 0.8) return "bg-orange-600 shadow-inner";
    if (ratio >= 0.6) return "bg-orange-500";
    if (ratio >= 0.4) return "bg-orange-400";
    if (ratio >= 0.2) return "bg-orange-200";
    return "bg-orange-50";
  };

  const getSlotDetails = (slotKey: string) => {
    const available = schedules.filter(s => !s.unavailableSlots.includes(slotKey)).map(s => s.name);
    const unavailable = schedules.filter(s => s.unavailableSlots.includes(slotKey)).map(s => s.name);
    return { available, unavailable };
  };

  const selectedDetails = selectedSlot ? getSlotDetails(selectedSlot) : null;
  const selectedStr = selectedSlot ? `${getDayLabel(selectedSlot.split("-")[0])}요일 ${selectedSlot.split("-")[1]}:00` : "";

  if (!adminUnlocked) {
    return (
      <main className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden bg-background">
        <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl"></div>
        <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-tertiary-container/10 rounded-full blur-3xl"></div>
        <div className="w-full max-w-md z-10 space-y-8 bg-surface-container-lowest rounded-[2rem] p-8 shadow-[0_12px_32px_-4px_rgba(0,0,0,0.03)] border border-outline-variant/15">
          <div className="flex flex-col items-center mb-6">
            <span className="material-symbols-outlined text-4xl text-primary mb-2">admin_panel_settings</span>
            <h2 className="font-headline font-extrabold text-2xl text-on-surface">임원진 로그인</h2>
          </div>
          <div className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary tracking-widest uppercase ml-1">Admin PIN</label>
              <div className="relative">
                <input 
                  className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary-fixed text-on-surface placeholder:text-outline p-4 rounded-xl transition-all duration-200 outline-none font-medium text-center tracking-widest" 
                  maxLength={4}
                  placeholder="관리자 PIN (기본: 0000)" 
                  type="password"
                  inputMode="numeric" 
                  value={adminPinInput}
                  onChange={(e) => setAdminPinInput(e.target.value.replace(/[^0-9]/g, '').slice(0, 4))}
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      const correctPin = process.env.NEXT_PUBLIC_ADMIN_PIN || "0000";
                      if (adminPinInput === correctPin) setAdminUnlocked(true);
                      else alert("관리자 PIN 번호가 일치하지 않습니다.");
                    }
                  }}
                />
              </div>
            </div>
            <button onClick={() => {
              const correctPin = process.env.NEXT_PUBLIC_ADMIN_PIN || "0000";
              if (adminPinInput === correctPin) setAdminUnlocked(true);
              else alert("관리자 PIN 번호가 일치하지 않습니다.");
            }} className="w-full kinetic-gradient hover:opacity-95 text-on-primary py-4 rounded-xl font-bold shadow-[0_8px_20px_-4px_rgba(153,65,0,0.2)] active:scale-95 transition-all">
              인증하기
            </button>
            <button onClick={() => router.push("/")} className="w-full py-4 text-on-surface-variant font-bold text-sm hover:bg-surface-container-high rounded-xl transition-all">
              돌아가기
            </button>
          </div>
        </div>
      </main>
    );
  }

  return (
    <div className="bg-background text-on-surface font-body w-full min-h-screen relative pb-32 overflow-x-hidden">
      <header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-[0_4px_12px_rgba(153,65,0,0.08)]">
        <div className="flex items-center justify-between px-6 py-4 max-w-md mx-auto">
          <div className="flex items-center gap-3">
            <button onClick={() => router.back()} className="text-orange-600 dark:text-orange-500 hover:bg-orange-50 p-1 rounded-full border-none bg-transparent">
              <span className="material-symbols-outlined">arrow_back</span>
            </button>
            <h1 className="font-plus-jakarta font-bold text-lg text-orange-600 dark:text-orange-500 tracking-tight">전체 일정 종합 대시보드</h1>
          </div>
          <span className="material-symbols-outlined text-slate-500">calendar_today</span>
        </div>
      </header>
      
      <main className="max-w-md mx-auto pt-24 px-6 space-y-8">
        {/* Top 3 Section */}
        <section className="space-y-4">
          <div className="flex items-end justify-between px-1">
            <h2 className="text-on-surface font-bold text-xl">최적의 시간대 Top 3</h2>
            <span className="text-label-sm uppercase tracking-widest text-primary font-bold text-[10px]">Analytics</span>
          </div>
          <div className="grid gap-4">
            {bestSlots.length > 0 && (
              <div className="relative overflow-hidden bg-surface-container-lowest p-5 rounded-xl shadow-[0_12px_32px_-4px_rgba(153,65,0,0.08)] group border-l-4 border-primary">
                <div className="flex justify-between items-start">
                  <div>
                    <p className="text-label-sm font-bold text-primary mb-1">1위 - 가장 선호됨</p>
                    <h3 className="text-xl font-extrabold text-on-surface">{getDayLabel(bestSlots[0][0].split('-')[0])}요일 {bestSlots[0][0].split('-')[1]}:00</h3>
                  </div>
                  <div className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-sm font-bold">
                    {totalRespondents - bestSlots[0][1]}명 가능
                  </div>
                </div>
              </div>
            )}
            
            <div className="grid grid-cols-2 gap-4">
              {bestSlots.length > 1 && (
                <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border-l-4 border-secondary">
                  <p className="text-[10px] font-bold text-secondary mb-1">2위</p>
                  <h4 className="text-md font-bold text-on-surface">{getDayLabel(bestSlots[1][0].split('-')[0])}요일 {bestSlots[1][0].split('-')[1]}:00</h4>
                  <p className="text-xs text-on-surface-variant mt-1">{totalRespondents - bestSlots[1][1]}명 참석 가능</p>
                </div>
              )}
              {bestSlots.length > 2 && (
                <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border-l-4 border-tertiary">
                  <p className="text-[10px] font-bold text-tertiary mb-1">3위</p>
                  <h4 className="text-md font-bold text-on-surface">{getDayLabel(bestSlots[2][0].split('-')[0])}요일 {bestSlots[2][0].split('-')[1]}:00</h4>
                  <p className="text-xs text-on-surface-variant mt-1">{totalRespondents - bestSlots[2][1]}명 참석 가능</p>
                </div>
              )}
            </div>
          </div>
        </section>

        {/* Charts Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <div className="flex items-center gap-2">
              <BarChart3 className="w-5 h-5 text-orange-500" />
              <h2 className="text-on-surface font-bold text-xl">참석 통계</h2>
            </div>
          </div>
          
          <div className="grid gap-4">
            {/* Bar Chart */}
            <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="flex items-center gap-2 mb-6">
                <Calendar className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-bold text-on-surface">요일별 평균 참석 가능 인원</h3>
              </div>
              <div className="flex items-end justify-between h-32 gap-2 px-1">
                {averageByDay.map((d, idx) => {
                  const isHighest = Math.max(...averageByDay.map(x => x.percent)) === d.percent && d.percent > 0;
                  return (
                    <div key={idx} className="flex-1 h-full flex flex-col justify-end items-center gap-1">
                      <div className="w-full flex-1 flex flex-col justify-end">
                        <div className={`w-full ${isHighest ? 'bg-orange-500' : 'bg-orange-200 opacity-60'} rounded-t-sm`} style={{ height: `${Math.max(5, d.percent)}%` }}></div>
                      </div>
                      <div className="flex flex-col items-center">
                        <span className={`text-[10px] ${isHighest ? 'font-bold text-orange-600' : 'font-medium text-on-surface-variant'}`}>{d.day}</span>
                        <span className={`text-[9px] ${isHighest ? 'font-bold text-orange-500' : 'text-slate-400'}`}>{Math.round(d.percent)}%</span>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>

            {/* Donut Chart */}
            <div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-orange-100">
              <div className="flex items-center gap-2 mb-6">
                <PieChart className="w-4 h-4 text-orange-500" />
                <h3 className="text-sm font-bold text-on-surface">시간대별 선호 비중</h3>
              </div>
              <div className="flex items-center justify-between">
                <div className="relative w-24 h-24">
                  <svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
                    <circle className="stroke-orange-50" cx="18" cy="18" fill="none" r="16" strokeWidth="4"></circle>
                    <circle className="stroke-orange-500" cx="18" cy="18" fill="none" r="16" strokeDasharray={`${eveningPct}, 100`} strokeDashoffset="0" strokeWidth="4"></circle>
                    <circle className="stroke-orange-300" cx="18" cy="18" fill="none" r="16" strokeDasharray={`${afternoonPct}, 100`} strokeDashoffset={`-${eveningPct}`} strokeWidth="4"></circle>
                    <circle className="stroke-orange-200" cx="18" cy="18" fill="none" r="16" strokeDasharray={`${morningPct}, 100`} strokeDashoffset={`-${eveningPct + afternoonPct}`} strokeWidth="4"></circle>
                  </svg>
                  <div className="absolute inset-0 flex flex-col items-center justify-center">
                    <span className="text-[10px] font-bold text-on-surface-variant">Peak</span>
                    <span className="text-xs font-extrabold text-orange-600">저녁</span>
                  </div>
                </div>
                
                <div className="flex flex-col gap-2 flex-1 ml-6">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-500"></div>
                      <span className="text-xs text-on-surface-variant">저녁 (18:00~)</span>
                    </div>
                    <span className="text-xs font-bold">{eveningPct || 0}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-300"></div>
                      <span className="text-xs text-on-surface-variant">오후 (12:00~)</span>
                    </div>
                    <span className="text-xs font-bold">{afternoonPct || 0}%</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <div className="w-2 h-2 rounded-full bg-orange-200"></div>
                      <span className="text-xs text-on-surface-variant">오전 (~12:00)</span>
                    </div>
                    <span className="text-xs font-bold">{morningPct || 0}%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Heatmap Section */}
        <section className="space-y-4">
          <div className="flex items-center justify-between px-1">
            <h2 className="text-on-surface font-bold text-xl">참석 가능 현황 (Heatmap)</h2>
            <div className="flex items-center gap-1">
              <div className="w-3 h-3 bg-orange-100 rounded-sm"></div>
              <div className="w-3 h-3 bg-orange-700 rounded-sm"></div>
              <span className="text-[10px] text-on-surface-variant ml-1">Density</span>
            </div>
          </div>
          <div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border border-orange-50">
            <div className="grid grid-cols-8 gap-1 mb-2">
              <div className="w-8"></div>
              <div className="text-[10px] font-bold text-center text-on-surface-variant">월</div>
              <div className="text-[10px] font-bold text-center text-on-surface-variant">화</div>
              <div className="text-[10px] font-bold text-center text-on-surface-variant">수</div>
              <div className="text-[10px] font-bold text-center text-on-surface-variant">목</div>
              <div className="text-[10px] font-bold text-center text-on-surface-variant">금</div>
              <div className="text-[10px] font-bold text-center text-on-surface-variant text-primary">토</div>
              <div className="text-[10px] font-bold text-center text-on-surface-variant text-error">일</div>
            </div>
            
            <div className="flex flex-col gap-1">
              {TIMES.map((time) => (
                <div key={time} className="grid grid-cols-8 gap-1 items-center">
                  <div className={`text-[9px] text-right pr-2 text-on-surface-variant ${time === 19 ? 'font-bold' : ''}`}>
                    {time.toString().padStart(2, "0")}:00
                  </div>
                  {DAYS.map((day) => {
                    const slotKey = `${day.value}-${time.toString().padStart(2, "0")}`;
                    const unavailableCount = slotCounts[slotKey] || 0;
                    return (
                      <div 
                        key={day.value}
                        onClick={() => setSelectedSlot(slotKey)}
                        className={`heatmap-cell ${getHeatmapColor(unavailableCount)} rounded-sm hover:ring-2 ring-primary transition-all cursor-pointer`}
                      ></div>
                    );
                  })}
                </div>
              ))}
            </div>
          </div>
        </section>

        <section className="bg-primary text-on-primary p-6 rounded-2xl flex items-center justify-between overflow-hidden relative">
          <div className="relative z-10">
            <p className="text-sm font-medium opacity-80">전체 응답 인원</p>
            <h3 className="text-4xl font-extrabold mt-1 tracking-tighter">{totalRespondents} 명</h3>
            <p className="text-[10px] mt-2 uppercase font-bold tracking-widest">Active users</p>
          </div>
          <div className="absolute -right-4 -bottom-4 opacity-20">
            <span className="material-symbols-outlined text-9xl">dashboard</span>
          </div>
        </section>
      </main>

      {/* Modal */}
      {selectedDetails && (
        <div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-[60] flex items-end justify-center" onClick={() => setSelectedSlot(null)}>
          <div className="w-full max-w-md bg-surface-container-lowest rounded-t-[2.5rem] p-8 shadow-2xl space-y-6" onClick={e => e.stopPropagation()}>
            <div className="w-12 h-1.5 bg-surface-container-high rounded-full mx-auto mb-2"></div>
            <div className="flex items-center justify-between">
              <div>
                <h3 className="text-2xl font-bold text-on-surface">{selectedStr}</h3>
                <p className="text-on-surface-variant font-medium">참석 가능 여부 상세</p>
              </div>
              <div className="bg-orange-50 p-3 rounded-full">
                <span className="material-symbols-outlined text-orange-600">group</span>
              </div>
            </div>
            <div className="space-y-6">
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-primary text-sm" style={{fontVariationSettings: "'FILL' 1"}}>check_circle</span>
                  <span className="font-bold text-sm uppercase tracking-wider text-primary">Available ({selectedDetails.available.length})</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {selectedDetails.available.length > 0 ? selectedDetails.available.map((n, i) => (
                    <span key={i} className="px-3 py-1 bg-surface-container-low rounded-full text-xs font-medium text-on-surface">{n}</span>
                  )) : (
                    <span className="text-xs text-on-surface-variant">없음</span>
                  )}
                </div>
              </div>
              <div className="space-y-3">
                <div className="flex items-center gap-2">
                  <span className="material-symbols-outlined text-error text-sm" style={{fontVariationSettings: "'FILL' 1"}}>cancel</span>
                  <span className="font-bold text-sm uppercase tracking-wider text-error">Unavailable ({selectedDetails.unavailable.length})</span>
                </div>
                <div className="flex flex-wrap gap-2 opacity-60">
                  {selectedDetails.unavailable.length > 0 ? selectedDetails.unavailable.map((n, i) => (
                    <span key={i} className="px-3 py-1 bg-surface-container-low rounded-full text-xs font-medium text-on-surface">{n}</span>
                  )) : (
                    <span className="text-xs text-on-surface-variant">없음</span>
                  )}
                </div>
              </div>
            </div>
            <button onClick={() => setSelectedSlot(null)} className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold shadow-lg active:scale-95 transition-transform">
              닫기
            </button>
          </div>
        </div>
      )}

      {/* Footer Nav */}
      <nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl flex justify-around items-center px-4 pb-6 pt-2 z-50 rounded-t-3xl shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
        <div onClick={() => router.push("/")} className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 px-5 py-2 hover:text-orange-500 transition-all active:scale-90 duration-150 cursor-pointer">
          <span className="material-symbols-outlined">login</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Home</span>
        </div>
        <div onClick={() => router.push("/babylion")} className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 px-5 py-2 hover:text-orange-500 transition-all active:scale-90 duration-150 cursor-pointer">
          <span className="material-symbols-outlined">grid_view</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Schedule</span>
        </div>
        <div className="flex flex-col items-center justify-center bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-2xl px-5 py-2 active:scale-90 duration-150 cursor-pointer">
          <span className="material-symbols-outlined" style={{fontVariationSettings: "'FILL' 1"}}>dashboard</span>
          <span className="text-[10px] font-bold uppercase tracking-widest mt-1">Admin</span>
        </div>
      </nav>
    </div>
  );
}
