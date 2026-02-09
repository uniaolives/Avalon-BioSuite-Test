
import React from 'react';
/* Fix: Added Activity to the lucide-react imports */
import { FileText, Layers, Scale, Bookmark, Activity } from 'lucide-react';

const TechnicalSupplement: React.FC = () => {
  return (
    <div className="flex flex-col gap-12 max-w-4xl mx-auto p-8 md:p-12 lg:p-16 bg-white/[0.02] border border-white/10 rounded-[4rem] text-white/80 font-serif leading-relaxed shadow-2xl backdrop-blur-xl h-full overflow-y-auto custom-scrollbar relative">
      <div className="absolute top-12 right-12 opacity-5 pointer-events-none">
        <Bookmark size={120} />
      </div>

      {/* Header */}
      <div className="border-b border-white/10 pb-12 text-center relative z-10">
        <h2 className="orbitron text-4xl font-bold text-white mb-4 tracking-tighter uppercase">ASCI Technical Supplement</h2>
        <p className="orbitron text-sm text-magenta-400 font-bold tracking-[0.5em] uppercase">Noise Budget & Phase Stability Analysis</p>
      </div>

      {/* Appendix A */}
      <section className="space-y-8 relative z-10">
        <h3 className="orbitron text-xl font-bold text-cyan-400 uppercase tracking-widest flex items-center gap-4">
          <FileText size={28} /> Appendix A: Phase Noise Budget for a 10 km Optical Fiber Link
        </h3>
        <p className="text-lg opacity-90 first-letter:text-5xl first-letter:font-bold first-letter:mr-3 first-letter:float-left first-letter:text-cyan-400">
          The kilometer-scale phase coherence required by ASCI is fundamentally limited by the stability of the frequency distribution network linking detector stations. We analyze a state-of-the-art stabilized optical fiber link, the prevailing technology for high-precision frequency transfer.
        </p>

        <div className="bg-black/40 p-8 rounded-[2.5rem] border border-white/5 font-mono text-sm leading-relaxed shadow-inner">
           <h4 className="text-white mb-6 font-bold border-b border-white/10 pb-2 flex items-center justify-between">
             A.1 Phase Noise Spectral Density Model
             <span className="text-[10px] text-white/20">NLDS_A1</span>
           </h4>
           <div className="text-cyan-300 mb-8 text-center text-xl italic py-6 bg-white/[0.02] rounded-2xl border border-white/5">
              S<sub>φ</sub><sup>total</sup>(f) = S<sub>φ</sub><sup>tech</sup>(f) + S<sub>φ</sub><sup>fiber</sup>(f) + S<sub>φ</sub><sup>RF</sup>(f)
           </div>
           
           <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/5">
                <strong className="text-white block mb-2 border-b border-white/10 pb-1">1. Technical Noise</strong>
                <p className="opacity-60 text-[11px]">Includes laser frequency noise and shot noise. L₀ ≈ -150 dBc/Hz at 10 kHz offset.</p>
              </div>
              <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/5">
                <strong className="text-white block mb-2 border-b border-white/10 pb-1">2. Fiber Noise</strong>
                <p className="opacity-60 text-[11px]">Acoustic/Seismic (f &lt; 100 Hz). The fiber acts as a distributed sensor for S<sub>x</sub><sup>seis</sup>(f).</p>
              </div>
              <div className="p-6 bg-white/[0.03] rounded-3xl border border-white/5">
                <strong className="text-white block mb-2 border-b border-white/10 pb-1">3. RF Conversion</strong>
                <p className="opacity-60 text-[11px]">Phase noise of the local oscillator used for ~24 GHz downconversion to baseband.</p>
              </div>
           </div>
        </div>
      </section>

      {/* Figure 1 Implementation */}
      <section className="space-y-8 relative z-10">
        <h3 className="orbitron text-xl font-bold text-yellow-400 uppercase tracking-widest flex items-center gap-4">
          <Layers size={28} /> Figure 1: Coherence Scale Comparison
        </h3>
        
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
           {/* Panel A: Stochastic */}
           <div className="bg-black/40 p-10 rounded-[3rem] border border-white/5 flex flex-col items-center group hover:bg-white/[0.04] transition-colors">
              <span className="orbitron text-[11px] text-white/40 mb-6 font-bold uppercase tracking-widest">Panel A: Stochastic Field (SHM)</span>
              <div className="w-full h-40 relative">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                   <line x1="10" y1="80" x2="190" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                   <text x="180" y="90" fill="rgba(255,255,255,0.3)" fontSize="6">x (km)</text>
                   {/* Stochastic wave pattern */}
                   {Array.from({length: 45}).map((_, i) => {
                     const phase = Math.sin(i * 1.5) * 15;
                     return (
                       <circle key={i} cx={15 + i*4} cy={50 + phase} r="1" fill="#00f3ff" opacity="0.3" />
                     );
                   })}
                   <path d="M 10,50 Q 15,35 20,50 T 30,50 T 40,50 T 50,50 T 60,50 T 70,50 T 80,50 T 90,50 T 100,50 T 110,50 T 120,50 T 130,50 T 140,50 T 150,50 T 160,50 T 170,50 T 180,50 T 190,50" 
                      fill="none" stroke="#00f3ff" strokeWidth="0.75" />
                   
                   <circle cx="40" cy="80" r="3" fill="#ef4444" className="animate-pulse" />
                   <text x="38" y="95" fill="#ef4444" fontSize="10" fontWeight="bold">A</text>
                   <circle cx="160" cy="80" r="3" fill="#ef4444" className="animate-pulse" />
                   <text x="158" y="95" fill="#ef4444" fontSize="10" fontWeight="bold">B</text>
                   <line x1="40" y1="92" x2="160" y2="92" stroke="white" strokeWidth="0.5" strokeDasharray="3,3" />
                   <text x="100" y="99" fill="white" fontSize="7" textAnchor="middle" fontWeight="bold">d = 10 km ≫ λc</text>
                </svg>
              </div>
              <p className="text-[12px] text-white/40 mt-6 text-center italic max-w-[200px]">Standard Halo Model: Detectors sample uncorrelated phases.</p>
           </div>

           {/* Panel B: Soliton */}
           <div className="bg-black/40 p-10 rounded-[3rem] border border-white/5 flex flex-col items-center group hover:bg-white/[0.04] transition-colors">
              <span className="orbitron text-[11px] text-white/40 mb-6 font-bold uppercase tracking-widest">Panel B: Soliton Field (VLD 2.0)</span>
              <div className="w-full h-40 relative">
                <svg viewBox="0 0 200 100" className="w-full h-full">
                   <line x1="10" y1="80" x2="190" y2="80" stroke="rgba(255,255,255,0.2)" strokeWidth="0.5" />
                   {/* Soliton Envelope */}
                   <path d="M 30,80 Q 100,-10 170,80" fill="rgba(217,70,239,0.15)" stroke="#d946ef" strokeWidth="1" strokeDasharray="4,2" />
                   {/* Coherent carrier wave */}
                   <path d="M 30,80 L 35,70 L 40,80 L 45,70 L 50,80 L 55,70 L 60,80 L 65,70 L 70,80 L 75,70 L 80,80 L 85,70 L 90,80 L 95,70 L 100,80 L 105,70 L 110,80 L 115,70 L 120,80 L 125,70 L 130,80 L 135,70 L 140,80 L 145,70 L 150,80 L 155,70 L 160,80 L 165,70 L 170,80" 
                      fill="none" stroke="#d946ef" strokeWidth="1.5" strokeLinejoin="round" />
                   
                   <circle cx="65" cy="80" r="3" fill="#ef4444" />
                   <text x="63" y="95" fill="#ef4444" fontSize="10" fontWeight="bold">A</text>
                   <circle cx="135" cy="80" r="3" fill="#ef4444" />
                   <text x="133" y="95" fill="#ef4444" fontSize="10" fontWeight="bold">B</text>
                   
                   <defs>
                     <marker id="arrowhead" markerWidth="10" markerHeight="7" refX="0" refY="3.5" orient="auto">
                       <polygon points="0 0, 10 3.5, 0 7" fill="white" />
                     </marker>
                   </defs>
                   <line x1="10" y1="20" x2="35" y2="20" stroke="white" strokeWidth="1.5" markerEnd="url(#arrowhead)" />
                   <text x="15" y="15" fill="white" fontSize="8" fontWeight="bold">v</text>
                </svg>
              </div>
              <p className="text-[12px] text-white/40 mt-6 text-center italic max-w-[200px]">NLDS Solitonic Lattice: Detectors share persistent phase coherence.</p>
           </div>
        </div>
      </section>

      {/* A.3 Performance Summary */}
      <section className="space-y-8 relative z-10">
        <h3 className="orbitron text-xl font-bold text-emerald-400 uppercase tracking-widest flex items-center gap-4">
          <Scale size={28} /> A.3 Performance & Experimental Sensitivity
        </h3>
        <p className="text-lg opacity-90">
          The relevant figure of merit is the integrated phase jitter over the soliton transit time τ<sub>cross</sub> ≈ 45 ms. State-of-the-art demonstrations [1] achieve sub-milliradian phase stability (σ<sub>Δφ</sub> &lt; 10⁻³ rad) over 10 km, which is the foundational enabling technology for the ASCI discovery Reach.
        </p>
        <div className="bg-magenta-500/10 p-10 rounded-[3rem] border border-magenta-500/30 shadow-2xl backdrop-blur-md relative overflow-hidden group">
          <div className="absolute top-0 left-0 w-2 h-full bg-magenta-500 opacity-50" />
          <h4 className="orbitron text-xs font-bold text-magenta-400 mb-4 uppercase tracking-[0.3em] flex items-center gap-3">
             <Activity size={16} /> Falsifiability Threshold
          </h4>
          <p className="text-white/80 italic text-lg leading-relaxed font-serif">
            "If phase-locked correlation persists beyond the 1 meter coherence length of the standard model, the stochastic nature of dark matter is falsified. The noise floor becomes the seismology of a higher-dimensional manifold."
          </p>
        </div>
      </section>

      {/* Footer / Citation */}
      <div className="pt-12 border-t border-white/10 flex flex-col md:flex-row justify-between items-center text-[10px] orbitron font-bold text-white/20 uppercase tracking-[0.4em] gap-4 relative z-10">
         <div className="flex gap-8">
            <span>Doc_ID: ASCI-NLDS-V2.2.A</span>
            <span>Auth: Arquiteto-Ω</span>
         </div>
         <div className="flex gap-4 items-center">
            <div className="w-2 h-2 rounded-full bg-cyan-400 animate-pulse" />
            <span>TOPOLOGICAL_DATA_LOCKED</span>
         </div>
      </div>
    </div>
  );
};

export default TechnicalSupplement;
