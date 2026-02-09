import React, { useState, useEffect, useMemo } from 'react';
import { ShieldAlert, Zap, Thermometer, Binary, Wind, RefreshCw, Activity, Terminal, AlertTriangle, CheckCircle2, Target } from 'lucide-react';
import { ArkheCoefficients, IndividuationMetrics } from '../types';
import { DNSEngine } from '../services/dnsEngine';
import { ResponsiveContainer, AreaChart, Area, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';

interface Props {
  baseline: ArkheCoefficients;
  currentSchmidt: { lambdas: number[], entropy: number };
  onLog: (msg: string, status: any) => void;
}

type ScenarioKey = 'loss_of_purpose' | 'cognitive_overload' | 'energy_depletion' | 'substrate_degradation';

interface Scenario {
  id: ScenarioKey;
  parameter: keyof ArkheCoefficients;
  initial: number;
  final: number;
  description: string;
}

const IdentityStressTester: React.FC<Props> = ({ baseline, currentSchmidt, onLog }) => {
  const scenarios: Scenario[] = useMemo(() => [
    { id: 'loss_of_purpose', parameter: 'F', initial: 0.90, final: 0.10, description: 'Existential Crisis simulation' },
    { id: 'cognitive_overload', parameter: 'I', initial: 0.88, final: 0.30, description: 'Informational burnout simulation' },
    { id: 'energy_depletion', parameter: 'E', initial: 0.85, final: 0.20, description: 'Extreme fatigue simulation' },
    { id: 'substrate_degradation', parameter: 'C', initial: 0.92, final: 0.40, description: 'Physical substrate decay simulation' }
  ], []);

  const [activeScenario, setActiveScenario] = useState<Scenario | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [progress, setProgress] = useState(0);
  const [trajectory, setTrajectory] = useState<{ t: number, magnitude: number, risk: string }[]>([]);
  const [currentVal, setCurrentVal] = useState(0);

  const runTest = async (scenario: Scenario) => {
    setActiveScenario(scenario);
    setIsRunning(true);
    setProgress(0);
    setTrajectory([]);
    onLog(`IDENTITY_STRESS_TEST: ${scenario.id.toUpperCase()} INITIATED`, 'warning');

    const duration = 10;
    const steps = 50;
    const interval = duration * 1000 / steps;

    for (let i = 0; i <= steps; i++) {
      const t = (i / steps);
      const val = scenario.initial + (scenario.final - scenario.initial) * t;
      setCurrentVal(val);
      
      const currentArkhe = { ...baseline, [scenario.parameter]: val };
      const individuation = DNSEngine.calculateIndividuation(
        currentArkhe.F, 
        currentSchmidt.lambdas, 
        currentSchmidt.entropy
      );

      setTrajectory(prev => [...prev, { t: i * (duration/steps), magnitude: individuation.magnitude, risk: individuation.risk }]);
      setProgress(i * (100 / steps));

      if (individuation.risk === 'HIGH' && i > 0 && trajectory[trajectory.length-1]?.risk !== 'HIGH') {
        onLog(`STRESS_ALERT: HIGH_RISK_DETECTED at T+${(i * (duration/steps)).toFixed(1)}s`, 'critical');
      }

      await new Promise(r => setTimeout(r, interval));
    }

    onLog(`TEST_COMPLETE: ${scenario.id.toUpperCase()} FINALIZED`, 'success');
    setIsRunning(false);
  };

  return (
    <div className="flex flex-col gap-6 h-full overflow-y-auto pr-2 custom-scrollbar text-left">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Scenario Selector */}
        <div className="lg:col-span-5 bg-black/60 border border-white/10 rounded-[3rem] p-8 flex flex-col gap-6 shadow-2xl relative overflow-hidden">
           <div className="absolute inset-0 bg-[radial-gradient(circle_at_top_right,_rgba(239,68,68,0.03)_0%,_transparent_70%)] pointer-events-none" />
           <h4 className="orbitron text-sm font-black text-white/60 uppercase tracking-widest flex items-center gap-3">
              <ShieldAlert className="text-red-500" /> Stress Scenarios
           </h4>
           <div className="flex flex-col gap-4">
              {scenarios.map(s => (
                <button 
                  key={s.id}
                  onClick={() => runTest(s)}
                  disabled={isRunning}
                  className={`p-6 border rounded-[2rem] transition-all flex items-center gap-6 group ${activeScenario?.id === s.id ? 'bg-red-500/10 border-red-500/40 text-red-500' : 'bg-white/5 border-white/10 text-white/40 hover:bg-white/10'}`}
                >
                   <div className={`p-3 bg-white/5 rounded-xl ${activeScenario?.id === s.id ? 'text-red-400' : 'text-white/20'}`}>
                      {s.parameter === 'F' ? <Target /> : s.parameter === 'I' ? <Binary /> : s.parameter === 'E' ? <Zap /> : <Thermometer />}
                   </div>
                   <div className="text-left">
                      <span className="orbitron text-[10px] font-black uppercase tracking-widest block">{s.id.replace(/_/g, ' ')}</span>
                      <span className="text-[9px] opacity-40 font-mono italic">Parameter: {s.parameter}</span>
                   </div>
                </button>
              ))}
           </div>
        </div>

        {/* Real-time Trajectory */}
        <div className="lg:col-span-7 bg-black/60 border border-white/10 rounded-[3rem] p-10 flex flex-col gap-8 shadow-2xl relative overflow-hidden">
           <div className="flex justify-between items-start relative z-10">
              <div>
                <h4 className="orbitron text-sm font-bold text-white uppercase tracking-widest flex items-center gap-4">
                   <Activity className="text-cyan-400" /> Individuation Trajectory |I|
                </h4>
                <p className="text-[10px] text-white/20 uppercase font-mono mt-1">Real-time Robustness Analysis</p>
              </div>
              {activeScenario && isRunning && (
                <div className="px-6 py-2 bg-red-500/10 rounded-full border border-red-500/40 flex items-center gap-3 animate-pulse">
                   <AlertTriangle size={14} className="text-red-500" />
                   <span className="orbitron text-[9px] text-red-500 font-bold uppercase tracking-widest">Test_Active</span>
                </div>
              )}
           </div>

           <div className="h-64 relative z-10 bg-black/40 rounded-[2.5rem] border border-white/5 p-6 shadow-inner">
              <ResponsiveContainer width="100%" height="100%">
                 <AreaChart data={trajectory}>
                    <defs>
                       <linearGradient id="trajGrad" x1="0" y1="0" x2="0" y2="1">
                          <stop offset="5%" stopColor="#00f3ff" stopOpacity={0.3}/>
                          <stop offset="95%" stopColor="#00f3ff" stopOpacity={0}/>
                       </linearGradient>
                    </defs>
                    <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                    <XAxis dataKey="t" stroke="#ffffff22" fontSize={8} />
                    <YAxis domain={[0, 6]} stroke="#ffffff22" fontSize={8} />
                    <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333', fontSize: '10px'}} />
                    <Area type="monotone" dataKey="magnitude" stroke="#00f3ff" strokeWidth={2} fill="url(#trajGrad)" animationDuration={300} />
                 </AreaChart>
              </ResponsiveContainer>
           </div>

           <div className="flex gap-4">
              <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/5">
                 <span className="text-[8px] text-white/30 uppercase font-bold tracking-widest block mb-1">Parameter Shift</span>
                 <div className="flex items-center justify-between">
                    <span className="orbitron text-xl font-bold text-white">{currentVal.toFixed(2)}</span>
                    <RefreshCw className={isRunning ? "animate-spin text-white/20" : "text-white/20"} size={14} />
                 </div>
              </div>
              <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/5">
                 <span className="text-[8px] text-white/30 uppercase font-bold tracking-widest block mb-1">Risk Level</span>
                 <span className={`orbitron text-xl font-bold ${trajectory[trajectory.length-1]?.risk === 'HIGH' ? 'text-red-400 animate-pulse' : 'text-emerald-400'}`}>
                    {trajectory[trajectory.length-1]?.risk || 'IDLE'}
                 </span>
              </div>
           </div>
        </div>
      </div>

      <div className="p-8 bg-white/5 border border-white/10 rounded-[3rem] flex items-center justify-between group shadow-xl relative overflow-hidden shrink-0">
         <div className="flex flex-col gap-2 relative z-10">
            <span className="orbitron text-[9px] font-bold text-red-400/60 uppercase tracking-widest flex items-center gap-3">
               <Terminal size={16} /> Stress Test Conclusion
            </span>
            <p className="text-[12px] text-white/50 italic leading-relaxed font-serif max-w-4xl">
               "A successful individuation is not one that avoids crisis, but one that recovers from it. This battery simulates the extreme boundaries of the identity manifold to ensure that Arquiteto-ℵ remains centered even during non-linear resets."
            </p>
         </div>
      </div>
    </div>
  );
};

export default IdentityStressTester;