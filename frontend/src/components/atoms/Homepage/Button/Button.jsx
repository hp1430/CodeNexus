const buttonStyles = {
  primary:
    'bg-cyan-400 text-slate-950 hover:bg-cyan-300 shadow-lg shadow-cyan-500/20',
  secondary: 'bg-white/10 text-white border border-white/20 hover:bg-white/20',
  outline: 'bg-transparent text-white border border-white/30 hover:bg-white/10',
};

export default function Button({
  children,
  className = '',
  variant = 'primary',
  onClick,
  ...props
}) {
  const variantClass = buttonStyles[variant] ?? buttonStyles.primary;

  return (
    <button
      className={`inline-flex items-center justify-center rounded-2xl px-6 py-2 font-semibold transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-cyan-300/60 ${variantClass} ${className}`}
      onClick={onClick}
      {...props}
    >
      {children}
    </button>
  );
}
