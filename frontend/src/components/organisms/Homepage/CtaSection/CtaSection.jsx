import Button from '@/components/atoms/Homepage/Button/Button';

export default function CTA() {
  return (
    <section className="py-20 px-6 sm:px-10">
      <div className="mx-auto max-w-4xl overflow-hidden rounded-[2.5rem] border border-white/10 bg-linear-to-r from-slate-900/95 via-slate-950 to-slate-900/90 p-10 shadow-2xl shadow-cyan-500/10">
        <div className="flex flex-col items-center gap-6 text-center lg:flex-row lg:text-left lg:items-center lg:justify-center">
          <div>
            <h2 className="text-3xl font-semibold text-white sm:text-4xl pl-20">
              Ready to own your next interview?
            </h2>
            <p className="mt-4 text-slate-400">
              Launch a room, collaborate with peers, and sharpen your skills in
              a polished, interview-ready workspace.
            </p>
          </div>
          {/* button intentionally removed to simplify CTA */}
        </div>
        <div className="mt-6 border-t border-white/6 pt-6 text-center">
          <p className="text-sm text-slate-400 flex items-center justify-center gap-2">
            Made with
            <svg
              className="inline-block text-red-600"
              width="14"
              height="14"
              viewBox="0 0 24 24"
              fill="currentColor"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 6.42 3.42 5 5.5 5c1.54 0 3.04.99 3.57 2.36h1.87C13.46 5.99 14.96 5 16.5 5 18.58 5 20 6.42 20 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            by <span className="font-semibold text-white">Himanshu</span>
          </p>

          <div className="mt-3 flex items-center justify-center gap-4">
            <a
              href="https://github.com/hp1430"
              aria-label="GitHub"
              className="text-slate-300 hover:text-white"
              rel="noopener noreferrer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M12 .5C5.37.5 0 5.87 0 12.5c0 5.29 3.438 9.773 8.205 11.363.6.113.82-.262.82-.582 0-.287-.01-1.04-.015-2.04-3.338.726-4.042-1.61-4.042-1.61-.546-1.387-1.333-1.757-1.333-1.757-1.09-.745.083-.73.083-.73 1.205.085 1.84 1.238 1.84 1.238 1.07 1.835 2.807 1.305 3.492.998.108-.775.418-1.305.762-1.605-2.665-.304-5.466-1.333-5.466-5.932 0-1.31.468-2.382 1.235-3.222-.124-.303-.535-1.526.117-3.176 0 0 1.008-.322 3.3 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.29-1.552 3.297-1.23 3.297-1.23.653 1.65.242 2.873.118 3.176.77.84 1.234 1.912 1.234 3.222 0 4.61-2.804 5.625-5.476 5.921.43.372.814 1.102.814 2.222 0 1.606-.015 2.901-.015 3.294 0 .322.216.698.825.58C20.565 22.27 24 17.79 24 12.5 24 5.87 18.63.5 12 .5z" />
              </svg>
            </a>
            <a
              href="https://www.linkedin.com/in/hp1430/"
              aria-label="LinkedIn"
              className="text-slate-300 hover:text-white"
              rel="noopener noreferrer"
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 24 24"
                fill="currentColor"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.85-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.352V9h3.414v1.561h.049c.476-.9 1.637-1.85 3.37-1.85 3.602 0 4.268 2.368 4.268 5.451v6.29zM5.337 7.433a2.062 2.062 0 11.001-4.124 2.062 2.062 0 01-.001 4.124zM7.119 20.452H3.554V9h3.565v11.452z" />
              </svg>
            </a>
          </div>
        </div>
      </div>
    </section>
  );
}
