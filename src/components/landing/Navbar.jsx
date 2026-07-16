import { Globe2 } from "lucide-react";

const Navbar = () => {
  return (
    <nav className="fixed top-0 left-0 w-full z-50 border-b border-white/10 bg-[#030712]/70 backdrop-blur-xl">
      <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-11 h-11 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center">
            <Globe2 size={22} />
          </div>

          <div>
            <h1 className="text-2xl font-bold tracking-wide">
              Vox<span className="text-violet-400">late</span>
            </h1>
          </div>
        </div>

        <div className="hidden md:flex items-center gap-10 text-gray-300">
          <a href="#">Features</a>
          <a href="#">How it Works</a>
          <a href="#">Languages</a>
          <a href="#">About</a>
        </div>

        <button className="px-5 py-2 rounded-xl bg-violet-600 hover:bg-violet-500 transition-all">
          Start Meeting
        </button>
      </div>
    </nav>
  );
};

export default Navbar;
