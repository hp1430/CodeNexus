import Button from '@/components/atoms/Homepage/Button/Button';

export default function CTA() {
  return (
    <section className="py-20 px-6 sm:px-10">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-gradient-to-r from-slate-900/95 via-slate-950 to-slate-900/90 p-10 shadow-2xl shadow-cyan-500/10">
        <div className="flex flex-col items-center justify-between gap-6 text-center lg:flex-row lg:text-left">
          <div>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl">
              Ready to own your next interview?
            </h2>
            <p className="mt-4 text-slate-400">
              Launch a room, collaborate with peers, and sharpen your skills in
              a polished, interview-ready workspace.
            </p>
          </div>
          <Button variant="primary" className="w-full max-w-xs">
            Get Started
          </Button>
        </div>
      </div>
    </section>
  );
}
