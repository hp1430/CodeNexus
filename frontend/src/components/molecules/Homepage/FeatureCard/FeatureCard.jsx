export default function FeatureCard({ icon, title, description }) {
  return (
    <div className="p-6 rounded-2xl shadow-md hover:shadow-xl transition bg-white">
      <div className="text-3xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold">{title}</h3>
      <p className="text-gray-500 mt-2">{description}</p>
    </div>
  );
}
