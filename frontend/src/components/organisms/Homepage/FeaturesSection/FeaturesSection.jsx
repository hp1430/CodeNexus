import FeatureCard from '@/components/molecules/Homepage/FeatureCard/FeatureCard';

export default function Features() {
  const features = [
    {
      icon: '💻',
      title: 'Live Coding',
      description:
        'Work together in a synced editor with instant collaboration.',
    },
    {
      icon: '⚡',
      title: 'Execute Instantly',
      description:
        'Compile and run code while you interview, without context switches.',
    },
    {
      icon: '🎥',
      title: 'Video Interviewing',
      description:
        'Keep the conversation flowing with built-in video and screenshare.',
    },
  ];

  return (
    <section className="mx-auto max-w-7xl px-6 py-20 sm:px-8">
      <div className="grid gap-6 md:grid-cols-3">
        {features.map((f, i) => (
          <FeatureCard key={i} {...f} />
        ))}
      </div>
    </section>
  );
}
