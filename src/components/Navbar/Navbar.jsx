import { motion } from "framer-motion";
import { Globe2, Sparkles, Menu } from "lucide-react";
import "./Navbar.css";
const Navbar = () => {
  return (
    <motion.header
      initial={{ y: -80, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.7 }}
      className="fixed top-5 left-1/2 -translate-x-1/2 z-50 w-[92%] max-w-7xl"
    >
      <nav className="backdrop-blur-2xl bg-white/5 border border-white/10 rounded-2xl px-8 h-20 flex items-center justify-between shadow-[0_0_40px_rgba(124,58,237,.15)]">
        <div className="flex items-center gap-4">
          <div className="w-12 h-12 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 flex items-center justify-center shadow-[0_0_25px_rgba(124,58,237,.6)]">
            <Globe2 size={24} />
          </div>

          <div>
            <h1 className="text-2xl font-black tracking-tight">
              Vox<span className="text-cyan-400">late</span>
            </h1>

            <p className="text-xs text-slate-400">AI Meeting Intelligence</p>
          </div>
        </div>

        <div className="hidden lg:flex items-center gap-10">
          {["Features", "Pipeline", "Dashboard", "Languages"].map((item) => (
            <a
              key={item}
              href="#"
              className="text-slate-300 hover:text-white transition duration-300 relative group"
            >
              {item}

              <span className="absolute left-0 -bottom-2 h-[2px] w-0 bg-gradient-to-r from-violet-500 to-cyan-400 transition-all duration-300 group-hover:w-full"></span>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button className="hidden md:flex items-center gap-2 px-5 py-3 rounded-xl border border-white/10 bg-white/5 hover:bg-white/10 transition">
            <Sparkles size={18} />
            Watch Demo
          </button>

          <button className="px-6 py-3 rounded-xl bg-gradient-to-r from-violet-600 to-cyan-500 font-semibold hover:scale-105 transition shadow-[0_0_25px_rgba(124,58,237,.5)]">
            Launch Demo
          </button>

          <button className="lg:hidden">
            <Menu />
          </button>
        </div>
      </nav>
    </motion.header>
  );
};

export default Navbar;
