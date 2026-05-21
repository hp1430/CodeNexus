import Button from '@/components/atoms/Homepage/Button/Button';

const highlights = [
  {
    title: 'Live Code Collaboration',
    desc: 'Pair program in real time with synchronized editing and instant feedback.',
  },
  {
    title: 'Instant Execution',
    desc: 'Run solutions and inspect outputs without leaving the interview flow.',
  },
  {
    title: 'HD Video Calls',
    desc: 'Keep interviews fluid with built-in video and screen sharing.',
  },
];

export default function Hero({
  onCreateRoom,
  isCreatingRoom,
  onJoinRoomClick,
}) {
  return (
    <section className="relative overflow-hidden py-24 px-6 sm:px-10">
      <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-cyan-500/20 to-transparent opacity-80" />
      <div className="pointer-events-none absolute right-0 top-10 h-72 w-72 rounded-full bg-violet-500/15 blur-3xl" />
      <div className="relative mx-auto max-w-6xl">
        <div className="max-w-3xl text-center mx-auto">
          <p className="text-sm uppercase tracking-[0.35em] text-cyan-300/80 mb-6">
            Collaborative interviewing, runtime feedback, and video calling
          </p>
          <h1 className="text-5xl font-semibold tracking-tight text-white sm:text-6xl">
            Build interview confidence with{' '}
            <span className="text-cyan-300">CodeNexus</span>
          </h1>
          <p className="mt-6 text-lg leading-8 text-slate-300">
            Practice in a modern interview environment with a shared code
            editor, live execution, and seamless video collaboration.
          </p>
        </div>

        <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:justify-center">
          <Button
            variant="primary"
            className="w-full sm:w-auto"
            onClick={onCreateRoom}
            disabled={isCreatingRoom}
          >
            {isCreatingRoom ? 'Creating Room...' : 'Create Room'}
          </Button>
          <Button
            variant="secondary"
            className="w-full sm:w-auto"
            onClick={onJoinRoomClick}
          >
            Join Room
          </Button>
        </div>

        <div className="mt-14 grid gap-4 sm:grid-cols-3">
          {highlights.map((item) => (
            <div
              key={item.title}
              className="rounded-3xl border border-white/10 bg-slate-900/85 p-6 shadow-[0_35px_60px_-40px_rgba(15,23,42,0.75)] transition hover:-translate-y-1"
            >
              <h3 className="text-base font-semibold text-cyan-300">
                {item.title}
              </h3>
              <p className="mt-3 text-sm leading-6 text-slate-400">
                {item.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
