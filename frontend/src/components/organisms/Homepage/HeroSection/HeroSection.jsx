import Button from '@/components/atoms/Homepage/Button/Button';

export default function Hero() {
  return (
    <section className="text-center py-20 px-6">
      <h1 className="text-5xl font-bold leading-tight">
        Crack Interviews with <span className="text-indigo-600">CodeNexus</span>
      </h1>
      <p className="mt-4 text-gray-600 text-lg">
        Real-time coding interviews, AI feedback, and collaborative rooms.
      </p>

      <div className="mt-8 flex justify-center gap-4">
        <Button>Start Interview</Button>
        <Button className="bg-gray-200 text-black">Join Room</Button>
      </div>
    </section>
  );
}
