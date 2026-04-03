import Button from '@/components/atoms/Homepage/Button/Button';

export default function Navbar() {
  return (
    <nav className="flex justify-between items-center px-8 py-4">
      <h1 className="text-2xl font-bold">CodeNexus</h1>
      <div className="flex gap-4">
        <Button className="bg-transparent text-black">Login</Button>
        <Button>Login</Button>
      </div>
    </nav>
  );
}
