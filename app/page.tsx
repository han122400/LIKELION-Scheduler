"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
  const [name, setName] = useState("");
  const router = useRouter();

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim()) {
      alert("이름을 입력해 주세요.");
      return;
    }
    localStorage.setItem("mutsa-name", name.trim());
    router.push("/babylion");
  };

  const handleAdminLogin = () => {
    router.push("/admin");
  };

  return (
    <main className="min-h-screen w-full flex items-center justify-center p-6 relative overflow-hidden">
      <div className="absolute -top-24 -right-24 w-96 h-96 bg-primary-container/10 rounded-full blur-3xl"></div>
      <div className="absolute -bottom-24 -left-24 w-96 h-96 bg-tertiary-container/10 rounded-full blur-3xl"></div>
      <div className="w-full max-w-md z-10 space-y-8">
        <div className="flex flex-col items-center text-center space-y-6">
          <div className="w-24 h-24 rounded-3xl kinetic-gradient shadow-[0_12px_32px_-4px_rgba(153,65,0,0.15)] flex items-center justify-center transform -rotate-3 hover:rotate-0 transition-transform duration-300">
            <img alt="Mutsa Logo" className="w-16 h-16 object-contain" src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcS2QuItPJLx65Rb2kqBsMRU7t3BmKc8jn98lw&s" />
          </div>
          <div className="space-y-2">
            <h1 className="font-headline font-extrabold text-4xl tracking-tight text-primary leading-tight">
              멋사<br />스케줄러
            </h1>
            <p className="text-on-surface-variant font-medium text-sm"><br /></p>
          </div>
        </div>

        <div className="bg-surface-container-lowest rounded-[2rem] p-8 shadow-[0_12px_32px_-4px_rgba(0,0,0,0.03)] border border-outline-variant/15 space-y-6">
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="space-y-2">
              <label className="text-xs font-bold text-primary tracking-widest uppercase ml-1" htmlFor="username">Identity</label>
              <div className="relative">
                <input 
                  className="w-full bg-surface-container-low border-2 border-transparent focus:border-primary-fixed text-on-surface placeholder:text-outline p-4 rounded-xl transition-all duration-200 outline-none font-medium" 
                  id="username" 
                  placeholder="이름을 입력하세요 (예: 김멋사)" 
                  type="text" 
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
                <div className="absolute right-4 top-1/2 -translate-y-1/2 text-outline-variant">
                  <span className="material-symbols-outlined" data-icon="person">person</span>
                </div>
              </div>
            </div>
            <button type="submit" className="w-full kinetic-gradient hover:opacity-95 text-on-primary py-4 rounded-xl font-bold shadow-[0_8px_20px_-4px_rgba(153,65,0,0.2)] active:scale-95 transition-all duration-200 flex items-center justify-center space-x-2 group">
              <span>입장하기</span>
              <span className="material-symbols-outlined group-hover:translate-x-1 transition-transform" data-icon="login">login</span>
            </button>
          </form>

          <div className="pt-4 flex items-center justify-between text-xs text-on-surface-variant font-medium">
            <div className="flex justify-center w-full">
              <button type="button" onClick={handleAdminLogin} className="flex items-center space-x-2 px-6 py-2 border border-primary/30 rounded-full text-primary hover:bg-primary/5 transition-colors duration-200 text-xs font-bold uppercase tracking-wider">
                <span className="material-symbols-outlined text-sm">admin_panel_settings</span>
                <span>임원진 로그인</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
