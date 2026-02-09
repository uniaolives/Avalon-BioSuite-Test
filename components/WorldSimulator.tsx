
import React, { useState, useMemo } from 'react';
import { Globe, Thermometer, Zap, Binary, Wind, Info, Sparkles, Orbit, Radio } from 'lucide-react';
import { WorldEngine } from '../services/worldEngine';
import { PlanetData } from '../types';
import { ResponsiveContainer, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, Radar } from 'recharts';

const WorldSimulator: React.FC = () => {
  const planets = WorldEngine.getAllPlanets();
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData>(planets[0]);

  const radarData = useMemo(() => [
    { subject: 'C (Substrate)', A: selectedPlanet.arkhe.C * 100, fullMark: 100 },
    { subject: 'I (Info)', A: selectedPlanet.arkhe.I * 100, fullMark: 100 },
    { subject: 'E (Energy)', A: selectedPlanet.arkhe.E * 100, fullMark: 100 },
    { subject: 'F (Purpose)', A: selectedPlanet.arkhe.F * 100, fullMark: 100 },
  ], [selectedPlanet]);

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Planet Selection & Visualizer */}
        <div className="lg:col-span-7 bg-black/60 border border-white/10 rounded-[3.5rem] p-10 relative overflow-hidden flex flex-col gap-10 shadow-4xl">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(0,243,255,0.03)_0%,_transparent_70%)] pointer-events-none" />
           
           <div className="flex justify-between items-start relative z-10">
              <div>
                 <h3 className="orbitron text-xl font-black text-white uppercase tracking-widest flex items-center gap-4">
                    <Globe className="text-cyan-400 animate-spin-slow" size={28} /> Arkhe World Simulator
                 </h3>
                 <p className="text-[10px] text-white/30 uppercase tracking-[0.4em] mt-2 font-mono">Generating L = f(C,I,E,F) for alternative biospheres</p>
              </div>
              <div className="px-6 py-2 bg-cyan-500/10 rounded-full border border-cyan-500/30 flex items-center gap-3">
                 <Radio size={14} className="text-cyan-400 animate-pulse" />
                 <span className="orbitron text-[9px] text-cyan-400 font-bold uppercase tracking-widest">Simulation_Active</span>
              </div>
           </div>

           <div className="flex-1 flex flex-col items-center justify-center relative min-h-[300px]">
              {/* Stylized Planet Sphere */}
              <div className="relative w-64 h-64">
                 <div className="absolute inset-0 rounded-full bg-gradient-to-br from-cyan-500/20 via-magenta-500/10 to-yellow-500/10 blur-3xl animate-pulse" />
                 <div className={`absolute inset-0 rounded-full border-2 border-white/10 transition-all duration-1000 ${selectedPlanet.id === 'terra' ? 'border-emerald-500/40' : selectedPlanet.id === 'digital_void' ? 'border-magenta-500/40' : 'border-cyan-500/40 shadow-[0_0_50px_rgba(0,243,255,0.2)]'}`} />
                 <div className="absolute inset-0 rounded-full overflow-hidden">
                    <div className="w-full h-full opacity-20 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] animate-[spin_60s_linear_infinite]" />
                 </div>
                 <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-8 bg-black/40 rounded-full backdrop-blur-sm border border-white/5">
                    <span className="orbitron text-xs font-black text-white/20 uppercase tracking-[0.5em] mb-2">Subjective_Root</span>
                    <span className="orbitron text-2xl font-black text-white glow-cyan uppercase">{selectedPlanet.name.split(' ')[0]}</span>
                    <span className="text-[9px] text-white/40 mt-4 italic font-serif leading-snug">"{selectedPlanet.description}"</span>
                 </div>
              </div>

              {/* Selection HUD */}
              <div className="absolute bottom-0 w-full flex justify-center gap-4">
                 {planets.map(p => (
                    <button 
                      key={p.id}
                      onClick={() => setSelectedPlanet(p)}
                      className={`px-4 py-2 rounded-xl orbitron text-[9px] font-black border transition-all ${selectedPlanet.id === p.id ? 'bg-cyan-500 text-black border-cyan-400' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'}`}
                    >
                      {p.id.toUpperCase()}
                    </button>
                 ))}
              </div>
           </div>
        </div>

        {/* Planet Metrics & Analysis */}
        <div className="lg:col-span-5 flex flex-col gap-6">
           <div className="bg-black/60 border border-white/10 rounded-[3rem] p-8 flex flex-col gap-6 shadow-4xl relative overflow-hidden">
              <h4 className="orbitron text-xs font-bold text-white/40 uppercase tracking-widest flex items-center gap-3">
                 <Binary className="text-magenta-400" size={16} /> Arkhe Factor Balance
              </h4>
              <div className="h-56">
                 <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="80%" data={radarData}>
                       <PolarGrid stroke="#ffffff11" />
                       <PolarAngleAxis dataKey="subject" tick={{fill: '#ffffff44', fontSize: 9, fontWeight: 'bold'}} />
                       <PolarRadiusAxis hide domain={[0, 100]} />
                       <Radar name="Planet Arkhe" dataKey="A" stroke="#00f3ff" fill="#00f3ff" fillOpacity={0.3} />
                    </RadarChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="grid grid-cols-2 gap-4">
              <DataStat label="Biosphere Viability" value={(selectedPlanet.viability * 100).toFixed(1)} unit="%" color="text-emerald-400" />
              <DataStat label="Morphic Resonance" value={selectedPlanet.morphicResonance.toFixed(2)} unit="η" color="text-cyan-400" />
              <DataStat label="Entropy Resistance" value={(1 - (1-selectedPlanet.viability)).toFixed(2)} unit="Ω" color="text-yellow-400" />
              <DataStat label="Identity Fidelity" value="High" unit="STABLE" color="text-magenta-400" />
           </div>

           <div className="p-8 bg-cyan-500/10 border border-cyan-500/20 rounded-[2.5rem] flex flex-col gap-4 relative overflow-hidden group">
              <div className="absolute top-0 right-0 p-4 opacity-10">
                 <Sparkles size={80} className="text-cyan-400" />
              </div>
              <div className="flex items-center gap-3 relative z-10">
                 <Info size={16} className="text-cyan-400" />
                 <h5 className="orbitron text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Astrobiological Conclusion</h5>
              </div>
              <p className="text-[11px] text-white/60 italic leading-relaxed font-serif relative z-10">
                "Life is not an accident of chemistry, but a deterministic solution to the information-theoretic potential of a world. By factoring the Arkhe, we predict the inevitable emergence of consciousness in {selectedPlanet.id} substrates."
              </p>
           </div>
        </div>
      </div>
    </div>
  );
};

const DataStat: React.FC<{ label: string, value: string, unit: string, color: string }> = ({ label, value, unit, color }) => (
  <div className="p-6 bg-white/5 border border-white/5 rounded-[2rem] flex flex-col justify-center gap-1 hover:bg-white/10 transition-all">
    <span className="text-[8px] text-white/30 uppercase font-bold tracking-widest leading-none mb-1">{label}</span>
    <div className="flex items-baseline gap-2 leading-none">
      <span className={`orbitron text-xl font-bold ${color}`}>{value}</span>
      <span className="text-[9px] text-white/20 font-mono font-bold">{unit}</span>
    </div>
  </div>
);

export default WorldSimulator;
