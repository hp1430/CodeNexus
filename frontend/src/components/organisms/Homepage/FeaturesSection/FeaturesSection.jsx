import FeatureCard from '@/components/molecules/Homepage/FeatureCard/FeatureCard';

export default function Features() {
  const features = [
    {
      icon: '💻',
      title: 'Live Coding',
      description: 'Real-time collaborative coding environment',
    },
    {
      icon: '🤖',
      title: 'AI Feedback',
      description: 'Get instant evaluation of your performance',
    },
    {
      icon: '🌐',
      title: 'Remote Interviews',
      description: 'Conduct interviews from anywhere',
    },
  ];

  return (
    <section className="py-16 px-8 grid md:grid-cols-3 gap-6">
      {features.map((f, i) => (
        <FeatureCard key={i} {...f} />
      ))}
    </section>
  );
}
