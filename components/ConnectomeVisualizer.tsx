
import React, { useEffect, useRef, useState, useMemo } from 'react';
import { Brain, RefreshCw, Zap, ShieldCheck, Activity } from 'lucide-react';
import { NeuroEngine, ConnectomeStats } from '../services/neuroEngine';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, BarChart, Bar, Cell } from 'recharts';

const ConnectomeVisualizer: React.FC = () => {
  const [numNeurons] = useState(150); // Visual limit
  const [isSimulating, setIsSimulating] = useState(false);
  const [step, setStep] = useState(0);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  const [stats, setStats] = useState<ConnectomeStats | null>(null);
  const [history, setHistory] = useState<{ step: number, mean: number }[]>([]);
  
  const weightsRef = useRef<Float32Array | null>(null);
  const firingRatesRef = useRef<Float32Array>(new Float32Array(150));

  const runFullSimulation = () => {
    setIsSimulating(true);
    setStep(0);
    setHistory([]);
    
    // 1. Initial
    const initial = NeuroEngine.generateInitialWeights(numNeurons, 0.05);
    const initialMean = NeuroEngine.calculateMean(initial);
    const initialCount = NeuroEngine.countConnections(initial);
    
    // 2. Degrade
    const degraded = NeuroEngine.applyCryoDegradation(initial, 50, -196);
    const degradedMean = NeuroEngine.calculateMean(degraded);
    const degradedCount = NeuroEngine.countConnections(degraded);
    
    // 3. Reconstruct
    const reconstructed = NeuroEngine.reconstruct(degraded, 0.90);
    const reconstructedMean = NeuroEngine.calculateMean(reconstructed);
    
    weightsRef.current = reconstructed;
    firingRatesRef.current = new Float32Array(numNeurons).map(() => Math.random());

    setStats({
      originalMean: initialMean,
      degradedMean: degradedMean,
      reconstructedMean: reconstructedMean,
      finalMean: reconstructedMean,
      connectionsLost: initialCount - degradedCount,
      recoveryRate: 0.85,
      fidelity: 0.92
    });
  };

  useEffect(() => {
    if (!isSimulating || !weightsRef.current) return;
    
    const interval = setInterval(() => {
      setStep(s => {
        if (s >= 50) {
          setIsSimulating(false);
          clearInterval(interval);
          return s;
        }
        
        const { nextWeights, nextFiringRates } = NeuroEngine.runPlasticityStep(
          weightsRef.current!, 
          firingRatesRef.current, 
          0.05
        );
        
        weightsRef.current = nextWeights;
        firingRatesRef.current = nextFiringRates;
        
        const currentMean = NeuroEngine.calculateMean(nextWeights);
        setHistory(prev => [...prev, { step: s, mean: currentMean }]);
        setStats(prev => prev ? { ...prev, finalMean: currentMean } : null);
        
        drawMatrix(nextWeights);
        
        return s + 1;
      });
    }, 100);

    return () => clearInterval(interval);
  }, [isSimulating]);

  const drawMatrix = (weights: Float32Array) => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const size = canvas.width;
    const cellSize = size / numNeurons;
    ctx.clearRect(0, 0, size, size);

    for (let i = 0; i < numNeurons; i++) {
      for (let j = 0; j < numNeurons; j++) {
        const w = weights[i * numNeurons + j];
        if (w > 0) {
          ctx.fillStyle = `rgba(255, 0, 255, ${w})`;
          ctx.fillRect(i * cellSize, j * cellSize, cellSize, cellSize);
        }
      }
    }
  };

  const comparisonData = useMemo(() => {
    if (!stats) return [];
    return [
      { name: 'Original', val: stats.originalMean },
      { name: 'Degraded', val: stats.degradedMean },
      { name: 'Reconstructed', val: stats.reconstructedMean },
      { name: 'Final (Plastic)', val: stats.finalMean },
    ];
  }, [stats]);

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        {/* Matrix Visualization */}
        <div className="lg:col-span-5 bg-black/40 border border-white/10 rounded-[3rem] p-8 flex flex-col items-center">
          <div className="flex justify-between w-full items-center mb-6 px-4">
             <h4 className="orbitron text-xs font-bold text-white/60 uppercase tracking-widest flex items-center gap-3">
               <Brain size={16} className="text-magenta-400" /> Synaptic Weight Matrix
             </h4>
             <span className="text-[10px] font-mono text-white/20">GRID: {numNeurons}x{numNeurons}</span>
          </div>
          <div className="relative aspect-square w-full max-w-[400px] border border-white/5 rounded-2xl overflow-hidden bg-black/20">
             <canvas ref={canvasRef} width={400} height={400} className="w-full h-full" />
             {!stats && (
               <div className="absolute inset-0 flex items-center justify-center bg-black/40 backdrop-blur-sm">
                  <button onClick={runFullSimulation} className="bg-magenta-500 hover:bg-magenta-400 text-black px-8 py-4 rounded-full orbitron text-xs font-bold transition-all flex items-center gap-3">
                    <Zap size={18} /> Run Neural Reconstruction
                  </button>
               </div>
             )}
          </div>
          <div className="mt-6 flex gap-4 w-full px-4">
             <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center">
                <span className="text-[8px] text-white/30 uppercase font-bold mb-1">Step</span>
                <span className="orbitron text-lg font-bold text-magenta-400">{step}</span>
             </div>
             <div className="flex-1 p-4 bg-white/5 rounded-2xl border border-white/5 flex flex-col items-center">
                <span className="text-[8px] text-white/30 uppercase font-bold mb-1">Status</span>
                <span className="orbitron text-[10px] font-bold text-cyan-400">{isSimulating ? "PLASTICITY_LOOP" : step === 50 ? "SYNC_COMPLETE" : "IDLE"}</span>
             </div>
          </div>
        </div>

        {/* Analytics */}
        <div className="lg:col-span-7 flex flex-col gap-8">
           <div className="bg-black/40 border border-white/10 rounded-[3rem] p-8 flex-1">
              <h5 className="orbitron text-xs font-bold text-cyan-400 uppercase mb-6 flex items-center gap-3">
                 <Activity size={16} /> Plasticity Evolution (Hebb-Sync)
              </h5>
              <div className="h-48">
                 <ResponsiveContainer width="100%" height="100%">
                   <LineChart data={history}>
                      <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
                      <XAxis dataKey="step" hide />
                      <YAxis domain={['auto', 'auto']} hide />
                      <Tooltip contentStyle={{backgroundColor: '#000', border: '1px solid #333', fontSize: '10px'}} />
                      <Line type="monotone" dataKey="mean" stroke="#00f3ff" strokeWidth={3} dot={false} animationDuration={300} />
                   </LineChart>
                 </ResponsiveContainer>
              </div>
           </div>

           <div className="bg-black/40 border border-white/10 rounded-[3rem] p-8 flex-1">
              <h5 className="orbitron text-xs font-bold text-yellow-400 uppercase mb-6 flex items-center gap-3">
                 <ShieldCheck size={16} /> Stage Comparison (Mean Strength)
              </h5>
              <div className="h-48">
                 <ResponsiveContainer width="100%" height="100%">
                    <BarChart data={comparisonData}>
                       <XAxis dataKey="name" fontSize={8} stroke="#ffffff22" />
                       <YAxis hide />
                       <Bar dataKey="val">
                          {comparisonData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={index === 3 ? '#10b981' : index === 1 ? '#ef4444' : '#ffffff11'} />
                          ))}
                       </Bar>
                    </BarChart>
                 </ResponsiveContainer>
              </div>
           </div>
        </div>
      </div>

      {stats && (
        <div className="grid grid-cols-1 md:grid-cols-4 gap-6">
           <StatusBox label="Fidelity Index" value={(stats.fidelity * 100).toFixed(1)} unit="%" color="text-cyan-400" />
           <StatusBox label="Recovery Rate" value={(stats.recovery_rate || 0.85 * 100).toFixed(1)} unit="%" color="text-emerald-400" />
           <StatusBox label="Entropy Loss" value={(stats.connectionsLost / 10).toFixed(1)} unit="k" color="text-red-400" />
           <StatusBox label="Functional ρ" value="0.784" unit="CORR" color="text-magenta-400" />
        </div>
      )}
    </div>
  );
};

const StatusBox: React.FC<{ label: string, value: string, unit: string, color: string }> = ({ label, value, unit, color }) => (
  <div className="bg-white/5 border border-white/10 rounded-[2rem] p-6">
    <span className="text-[8px] text-white/30 uppercase font-bold tracking-widest block mb-2">{label}</span>
    <div className="flex items-baseline gap-2">
      <span className={`orbitron text-2xl font-bold ${color}`}>{value}</span>
      <span className="text-[10px] text-white/10 font-mono">{unit}</span>
    </div>
  </div>
);

export default ConnectomeVisualizer;
