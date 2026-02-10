import React from "react";
import { useNavigate } from "react-router-dom";
import { setAuth, AppRole } from "@/services/storage/localStorage/auth.store";

type RoleCard = {
  role: AppRole;
  title: string;
  subtitle: string;
  target: string;
  email: string;
};

const roles: RoleCard[] = [
  {
    role: "ADMIN",
    title: "Admin",
    subtitle: "Access: People, Content, Commercial, Reports, System",
    target: "/admin/dashboard",
    email: "admin@smart.local",
  },
  {
    role: "LICENCIADO",
    title: "Licenciado",
    subtitle: "Dashboard, Profile, Students, Content, Orders",
    target: "/licenciado/dashboard",
    email: "licenciado@smart.local",
  },
  {
    role: "PROFESSOR_EXPRESS",
    title: "Professor Express",
    subtitle: "Audios, E-books (read-only), Trainings, Placement Tests",
    target: "/professor-express/audios",
    email: "professor@smart.local",
  },
  {
    role: "ALUNO",
    title: "Aluno",
    subtitle: "Audios, (optional) Shop if enabled, Extra materials",
    target: "/aluno/dashboard",
    email: "aluno@smart.local",
  },
];

export default function DevRoleSelector() {
  const navigate = useNavigate();

  const handleLogin = (r: RoleCard) => {
    setAuth({
      user: {
        id: `dev-${r.role.toLowerCase()}`,
        name: `Dev ${r.title}`,
        email: r.email,
        role: r.role,
      },
      token: `dev-token-${r.role.toLowerCase()}`,
    });

    navigate(r.target, { replace: true });
  };

  return (
    <div className="min-h-screen w-full bg-[#F7FAFC] flex items-center justify-center p-6">
      <div className="w-full max-w-5xl">
        <div className="mb-8">
          <div className="flex items-center gap-3">
            <div className="h-10 w-10 rounded-xl bg-[#5FD3F3]" />
            <div>
              <h1 className="text-2xl font-bold text-slate-900">
                Smart Idiomas — Dev Access
              </h1>
              <p className="text-slate-600">
                Select a profile to simulate login and enter the correct dashboard.
              </p>
            </div>
          </div>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {roles.map((r) => (
            <button
              key={r.role}
              onClick={() => handleLogin(r)}
              className="text-left rounded-2xl bg-white border border-slate-100 shadow-sm hover:shadow-md transition p-4 focus:outline-none focus:ring-2 focus:ring-[#5FD3F3]"
            >
              <div className="flex items-center justify-between mb-3">
                <span className="text-xs font-semibold px-2 py-1 rounded-full bg-[#EAF7FC] text-slate-700">
                  {r.role}
                </span>
                <span className="h-2.5 w-2.5 rounded-full bg-[#FF4FB7]" />
              </div>

              <h2 className="text-lg font-semibold text-slate-900">
                {r.title}
              </h2>
              <p className="text-sm text-slate-600 mt-1">{r.subtitle}</p>

              <div className="mt-4 text-sm font-semibold text-[#2F6FED]">
                Enter →
              </div>
            </button>
          ))}
        </div>

        <div className="mt-6 text-sm text-slate-500">
          This is a temporary dev screen. It writes <code>smart_auth</code> into localStorage.
        </div>
      </div>
    </div>
  );
}
