export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="rounded-3xl border border-white/10 bg-slate-900/85 p-7 shadow-xl shadow-slate-950/20 transition hover:-translate-y-1">
      <div className="flex h-16 w-16 items-center justify-center rounded-3xl bg-cyan-500/10 text-3xl text-cyan-300 shadow-inner shadow-cyan-500/10">
        {icon}
      </div>
      <h3 className="mt-6 text-xl font-semibold text-white">{title}</h3>
      <p className="mt-3 text-sm text-slate-400">{description}</p>
    </div>
  );
}
