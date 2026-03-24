

<header className="fixed top-0 w-full z-50 bg-white/80 dark:bg-slate-950/80 backdrop-blur-md shadow-[0_4px_12px_rgba(153,65,0,0.08)]">
<div className="flex items-center justify-between px-6 py-4 max-w-md mx-auto">
<div className="flex items-center gap-3">
<span className="material-symbols-outlined text-orange-600 dark:text-orange-500" data-icon="arrow_back">arrow_back</span>
<h1 className="font-plus-jakarta font-bold text-lg text-orange-600 dark:text-orange-500 tracking-tight">전체 일정 종합 대시보드</h1>
</div>
<span className="material-symbols-outlined text-slate-500" data-icon="calendar_today">calendar_today</span>
</div>
</header>
<main className="max-w-md mx-auto pt-24 px-6 space-y-8">

<section className="space-y-4">
<div className="flex items-end justify-between px-1">
<h2 className="text-on-surface font-bold text-xl">최적의 시간대 Top 3</h2>
<span className="text-label-sm uppercase tracking-widest text-primary font-bold text-[10px]">Analytics</span>
</div>
<div className="grid gap-4">

<div className="relative overflow-hidden bg-surface-container-lowest p-5 rounded-xl shadow-[0_12px_32px_-4px_rgba(153,65,0,0.08)] group border-l-4 border-primary">
<div className="flex justify-between items-start">
<div>
<p className="text-label-sm font-bold text-primary mb-1">1위 - 가장 선호됨</p>
<h3 className="text-xl font-extrabold text-on-surface">금요일 19:00</h3>
</div>
<div className="bg-primary-container text-on-primary-container px-3 py-1 rounded-full text-sm font-bold">
                            25명 가능
                        </div>
</div>
</div>

<div className="grid grid-cols-2 gap-4">
<div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border-l-4 border-secondary">
<p className="text-[10px] font-bold text-secondary mb-1">2위</p>
<h4 className="text-md font-bold text-on-surface">토요일 14:00</h4>
<p className="text-xs text-on-surface-variant mt-1">22명 참석 가능</p>
</div>
<div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm border-l-4 border-tertiary">
<p className="text-[10px] font-bold text-tertiary mb-1">3위</p>
<h4 className="text-md font-bold text-on-surface">수요일 18:30</h4>
<p className="text-xs text-on-surface-variant mt-1">19명 참석 가능</p>
</div>
</div>
</div>
</section>

<section className="space-y-4">
<div className="flex items-center justify-between px-1">
<div className="flex items-center gap-2">
<i className="w-5 h-5 text-orange-500" data-lucide="bar-chart-3"></i>
<h2 className="text-on-surface font-bold text-xl">참석 통계</h2>
</div>
</div>
<div className="grid gap-4">

<div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-orange-100">
<div className="flex items-center gap-2 mb-6">
<i className="w-4 h-4 text-orange-500" data-lucide="calendar"></i>
<h3 className="text-sm font-bold text-on-surface">요일별 평균 참석 가능 인원</h3>
</div>
<div className="flex items-end justify-between h-32 gap-2 px-1">

<div className="flex-1 flex flex-col items-center gap-2">
<div className="w-full bg-orange-100 rounded-t-sm chart-bar" style="height: 45%;"></div>
<span className="text-[10px] font-medium text-on-surface-variant">월</span>
</div>

<div className="flex-1 flex flex-col items-center gap-2">
<div className="w-full bg-orange-200 rounded-t-sm chart-bar" style="height: 55%;"></div>
<span className="text-[10px] font-medium text-on-surface-variant">화</span>
</div>

<div className="flex-1 flex flex-col items-center gap-2">
<div className="w-full bg-orange-300 rounded-t-sm chart-bar" style="height: 70%;"></div>
<span className="text-[10px] font-medium text-on-surface-variant">수</span>
</div>

<div className="flex-1 flex flex-col items-center gap-2">
<div className="w-full bg-orange-200 rounded-t-sm chart-bar" style="height: 50%;"></div>
<span className="text-[10px] font-medium text-on-surface-variant">목</span>
</div>

<div className="flex-1 flex flex-col items-center gap-2">
<div className="w-full bg-orange-500 rounded-t-sm chart-bar" style="height: 90%;"></div>
<span className="text-[10px] font-bold text-orange-600">금</span>
</div>

<div className="flex-1 flex flex-col items-center gap-2">
<div className="w-full bg-orange-400 rounded-t-sm chart-bar" style="height: 80%;"></div>
<span className="text-[10px] font-medium text-on-surface-variant">토</span>
</div>

<div className="flex-1 flex flex-col items-center gap-2">
<div className="w-full bg-orange-100 rounded-t-sm chart-bar" style="height: 30%;"></div>
<span className="text-[10px] font-medium text-on-surface-variant">일</span>
</div>
</div>
</div>

<div className="bg-surface-container-lowest p-5 rounded-xl shadow-sm border border-orange-100">
<div className="flex items-center gap-2 mb-6">
<i className="w-4 h-4 text-orange-500" data-lucide="pie-chart"></i>
<h3 className="text-sm font-bold text-on-surface">시간대별 선호 비중</h3>
</div>
<div className="flex items-center justify-between">

<div className="relative w-24 h-24">
<svg className="w-full h-full transform -rotate-90" viewBox="0 0 36 36">
<circle className="stroke-orange-100" cx="18" cy="18" fill="none" r="16" strokeWidth="4"></circle>

<circle className="stroke-orange-500" cx="18" cy="18" fill="none" r="16" strokeDasharray="60, 100" strokeDashoffset="0" strokeWidth="4"></circle>

<circle className="stroke-orange-300" cx="18" cy="18" fill="none" r="16" strokeDasharray="25, 100" strokeDashoffset="-60" strokeWidth="4"></circle>

<circle className="stroke-orange-200" cx="18" cy="18" fill="none" r="16" strokeDasharray="15, 100" strokeDashoffset="-85" strokeWidth="4"></circle>
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
<span className="text-xs font-bold">60%</span>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-orange-300"></div>
<span className="text-xs text-on-surface-variant">오후 (12:00~)</span>
</div>
<span className="text-xs font-bold">25%</span>
</div>
<div className="flex items-center justify-between">
<div className="flex items-center gap-2">
<div className="w-2 h-2 rounded-full bg-orange-200"></div>
<span className="text-xs text-on-surface-variant">오전 (~12:00)</span>
</div>
<span className="text-xs font-bold">15%</span>
</div>
</div>
</div>
</div>
</div>
</section>

<section className="space-y-4">
<div className="flex items-center justify-between px-1">
<h2 className="text-on-surface font-bold text-xl">참석 가능 현황 (Heatmap)</h2>
<div className="flex items-center gap-1">
<div className="w-3 h-3 bg-orange-100 rounded-sm"></div>
<div className="w-3 h-3 bg-orange-700 rounded-sm"></div>
<span className="text-[10px] text-on-surface-variant ml-1">Density</span>
</div>
</div>
<div className="bg-surface-container-lowest p-4 rounded-xl shadow-sm">

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
<div className="grid grid-cols-8 gap-1 items-center">
<div className="text-[9px] text-right pr-2 text-on-surface-variant">09:00</div>
<div className="heatmap-cell bg-orange-50 rounded-sm hover:ring-2 ring-primary transition-all cursor-pointer"></div>
<div className="heatmap-cell bg-orange-100 rounded-sm hover:ring-2 ring-primary transition-all cursor-pointer"></div>
<div className="heatmap-cell bg-orange-200 rounded-sm hover:ring-2 ring-primary transition-all cursor-pointer"></div>
<div className="heatmap-cell bg-orange-50 rounded-sm hover:ring-2 ring-primary transition-all cursor-pointer"></div>
<div className="heatmap-cell bg-orange-300 rounded-sm hover:ring-2 ring-primary transition-all cursor-pointer"></div>
<div className="heatmap-cell bg-orange-100 rounded-sm hover:ring-2 ring-primary transition-all cursor-pointer"></div>
<div className="heatmap-cell bg-orange-50 rounded-sm hover:ring-2 ring-primary transition-all cursor-pointer"></div>
</div>
<div className="grid grid-cols-8 gap-1 items-center">
<div className="text-[9px] text-right pr-2 text-on-surface-variant font-bold">19:00</div>
<div className="heatmap-cell bg-orange-400 rounded-sm hover:ring-2 ring-primary transition-all cursor-pointer"></div>
<div className="heatmap-cell bg-orange-500 rounded-sm hover:ring-2 ring-primary transition-all cursor-pointer"></div>
<div className="heatmap-cell bg-orange-600 rounded-sm hover:ring-2 ring-primary transition-all cursor-pointer"></div>
<div className="heatmap-cell bg-orange-500 rounded-sm hover:ring-2 ring-primary transition-all cursor-pointer"></div>
<div className="heatmap-cell bg-orange-700 rounded-sm hover:ring-2 ring-primary transition-all cursor-pointer shadow-inner"></div>
<div className="heatmap-cell bg-orange-400 rounded-sm hover:ring-2 ring-primary transition-all cursor-pointer"></div>
<div className="heatmap-cell bg-orange-200 rounded-sm hover:ring-2 ring-primary transition-all cursor-pointer"></div>
</div>
<div className="grid grid-cols-8 gap-1 items-center opacity-60">
<div className="text-[9px] text-right pr-2 text-on-surface-variant">21:00</div>
<div className="heatmap-cell bg-orange-200 rounded-sm"></div>
<div className="heatmap-cell bg-orange-300 rounded-sm"></div>
<div className="heatmap-cell bg-orange-400 rounded-sm"></div>
<div className="heatmap-cell bg-orange-300 rounded-sm"></div>
<div className="heatmap-cell bg-orange-500 rounded-sm"></div>
<div className="heatmap-cell bg-orange-200 rounded-sm"></div>
<div className="heatmap-cell bg-orange-100 rounded-sm"></div>
</div>
</div>
</div>
</section>

<section className="bg-primary text-on-primary p-6 rounded-2xl flex items-center justify-between overflow-hidden relative">
<div className="relative z-10">
<p className="text-sm font-medium opacity-80">전체 응답 인원</p>
<h3 className="text-4xl font-extrabold mt-1 tracking-tighter">42 / 50</h3>
<p className="text-[10px] mt-2 uppercase font-bold tracking-widest">Response rate 84%</p>
</div>
<div className="absolute -right-4 -bottom-4 opacity-20">
<span className="material-symbols-outlined text-9xl" data-icon="dashboard">dashboard</span>
</div>
</section>
</main>

<div className="fixed inset-0 bg-inverse-surface/40 backdrop-blur-sm z-[60] flex items-end justify-center">
<div className="w-full max-w-md bg-surface-container-lowest rounded-t-[2.5rem] p-8 shadow-2xl space-y-6">
<div className="w-12 h-1.5 bg-surface-container-high rounded-full mx-auto mb-2"></div>
<div className="flex items-center justify-between">
<div>
<h3 className="text-2xl font-bold text-on-surface">금요일 19:00</h3>
<p className="text-on-surface-variant font-medium">참석 가능 여부 상세</p>
</div>
<div className="bg-orange-50 p-3 rounded-full">
<span className="material-symbols-outlined text-orange-600" data-icon="group">group</span>
</div>
</div>
<div className="space-y-6">
<div className="space-y-3">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-primary text-sm" data-icon="check_circle" data-weight="fill" style="font-variation-settings: 'FILL' 1;">check_circle</span>
<span className="font-bold text-sm uppercase tracking-wider text-primary">Available (25)</span>
</div>
<div className="flex flex-wrap gap-2">
<span className="px-3 py-1 bg-surface-container-low rounded-full text-xs font-medium text-on-surface">Kim</span>
<span className="px-3 py-1 bg-surface-container-low rounded-full text-xs font-medium text-on-surface">Lee</span>
<span className="px-3 py-1 bg-surface-container-low rounded-full text-xs font-medium text-on-surface">Park</span>
<span className="px-3 py-1 bg-surface-container-low rounded-full text-xs font-medium text-on-surface">Choi</span>
<span className="px-3 py-1 bg-surface-container-low rounded-full text-xs font-medium text-on-surface">Jung</span>
<span className="px-3 py-1 bg-surface-container-low rounded-full text-xs font-medium text-on-surface">+20 more</span>
</div>
</div>
<div className="space-y-3">
<div className="flex items-center gap-2">
<span className="material-symbols-outlined text-error text-sm" data-icon="cancel" data-weight="fill" style="font-variation-settings: 'FILL' 1;">cancel</span>
<span className="font-bold text-sm uppercase tracking-wider text-error">Unavailable (17)</span>
</div>
<div className="flex flex-wrap gap-2 opacity-60">
<span className="px-3 py-1 bg-surface-container-low rounded-full text-xs font-medium text-on-surface">Kang</span>
<span className="px-3 py-1 bg-surface-container-low rounded-full text-xs font-medium text-on-surface">Yoon</span>
<span className="px-3 py-1 bg-surface-container-low rounded-full text-xs font-medium text-on-surface">Song</span>
<span className="px-3 py-1 bg-surface-container-low rounded-full text-xs font-medium text-on-surface">Lim</span>
</div>
</div>
</div>
<button className="w-full py-4 bg-primary text-on-primary rounded-xl font-bold shadow-lg active:scale-95 transition-transform">
                상세 일정 확인하기
            </button>
</div>
</div>

<nav className="fixed bottom-0 left-0 right-0 max-w-md mx-auto bg-white/90 dark:bg-slate-900/90 backdrop-blur-xl flex justify-around items-center px-4 pb-6 pt-2 z-50 rounded-t-3xl shadow-[0_-4px_12px_rgba(0,0,0,0.03)]">
<div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 px-5 py-2 hover:text-orange-500 transition-all active:scale-90 duration-150">
<span className="material-symbols-outlined" data-icon="login">login</span>
<span className="text-[10px] font-bold uppercase tracking-widest mt-1">Home</span>
</div>
<div className="flex flex-col items-center justify-center text-slate-400 dark:text-slate-500 px-5 py-2 hover:text-orange-500 transition-all active:scale-90 duration-150">
<span className="material-symbols-outlined" data-icon="grid_view">grid_view</span>
<span className="text-[10px] font-bold uppercase tracking-widest mt-1">Schedule</span>
</div>
<div className="flex flex-col items-center justify-center bg-orange-100 dark:bg-orange-900/30 text-orange-700 dark:text-orange-300 rounded-2xl px-5 py-2 active:scale-90 duration-150">
<span className="material-symbols-outlined" data-icon="dashboard" data-weight="fill" style="font-variation-settings: 'FILL' 1;">dashboard</span>
<span className="text-[10px] font-bold uppercase tracking-widest mt-1">Admin</span>
</div>
</nav>
<script>
        // Initialize Lucide icons
        lucide.createIcons();
    </script>
