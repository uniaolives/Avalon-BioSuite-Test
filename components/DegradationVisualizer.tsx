
import React, { useMemo } from 'react';
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ReferenceLine } from 'recharts';
import { Database, Shield, Zap, Thermometer } from 'lucide-react';

interface Props {
  years: number;
  temperature: number;
}

const DegradationVisualizer: React.FC<Props> = ({ years, temperature }) => {
  const data = useMemo(() => {
    const tempK = temperature + 273.15;
    const R = 8.314;
    
    // DNA glass_encapsulated constants
    const dnaBaseRate = 5e-6;
    const dnaActivationEnergy = 1.5e5;
    const kDna = dnaBaseRate * Math.exp(-dnaActivationEnergy / (R * tempK)) * 1.01; // humidity factor

    // Blockchain bitcoin constants
    const bcReplication = 10000;
    const bcChurnLossRate = 0.20 * 0.01;
    const bcProtocolStability = 0.999;

    const points = [];
    for (let t = 0; t <= years; t += years / 50) {
      // DNA Integrity: Modelo exponencial + dano linear por radiação
      const dnaRadDamage = 1e-7 * t;
      const dnaIntegrity = Math.max(0, (Math.exp(-kDna * t)) - (dnaRadDamage / years));
      
      // Blockchain Integrity: Redundância de nós + estabilidade de protocolo
      const nodeSurvival = Math.exp(-bcChurnLossRate * t);
      const survivalProb = 1 - Math.pow((1 - nodeSurvival), bcReplication);
      const protocolSurvival = Math.pow(bcProtocolStability, t / 10);
      const bcIntegrity = survivalProb * protocolSurvival;

      // Hybrid: 1 - (Probabilidade de AMBOS falharem)
      const hybridIntegrity = 1 - (1 - dnaIntegrity) * (1 - bcIntegrity);

      points.push({
        year: Math.round(t),
        dna: Number((dnaIntegrity * 100).toFixed(2)),
        blockchain: Number((bcIntegrity * 100).toFixed(2)),
        hybrid: Number((hybridIntegrity * 100).toFixed(2)),
      });
    }
    return points;
  }, [years, temperature]);

  return (
    <div className="flex flex-col gap-8 h-full">
      <div className="bg-black/40 border border-white/10 rounded-[3rem] p-10 relative overflow-hidden">
        <div className="flex justify-between items-start mb-10 relative z-10">
          <div>
            <h4 className="orbitron text-xl font-bold text-white uppercase tracking-widest flex items-center gap-4">
              <Shield className="text-orange-500" /> Genomic Preservation Protocol
            </h4>
            <p className="text-[10px] text-white/40 uppercase tracking-widest mt-1">Entropy Resistance: Synthetic DNA vs Blockchain Substrate</p>
          </div>
          <div className="flex gap-6 items-center">
            <div className="flex items-center gap-3 px-6 py-2 bg-white/5 rounded-full border border-white/10">
               <Thermometer size={16} className="text-cyan-400" />
               <span className="orbitron text-xs text-white/60">{temperature}°C</span>
            </div>
            <div className="flex items-center gap-3 px-6 py-2 bg-orange-500/10 rounded-full border border-orange-500/30">
               <Zap size={16} className="text-orange-500" />
               <span className="orbitron text-xs text-orange-500">Hal Finney Mode</span>
            </div>
          </div>
        </div>

        <div className="h-72 relative z-10">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={data}>
              <CartesianGrid strokeDasharray="3 3" stroke="#ffffff05" vertical={false} />
              <XAxis dataKey="year" stroke="#ffffff22" fontSize={10} label={{ value: 'Years', position: 'insideBottomRight', offset: -10, fill: '#ffffff44' }} />
              <YAxis stroke="#ffffff22" fontSize={10} domain={[0, 105]} label={{ value: 'Integrity %', angle: -90, position: 'insideLeft', fill: '#ffffff44' }} />
              <Tooltip 
                contentStyle={{ backgroundColor: '#000', border: '1px solid #333', borderRadius: '12px' }}
                itemStyle={{ fontSize: '11px', textTransform: 'uppercase' }}
              />
              <Legend verticalAlign="top" height={36}/>
              <ReferenceLine y={50} stroke="#ff0000" strokeDasharray="3 3" label={{ value: 'Half-Life', position: 'right', fill: '#ff0000', fontSize: 10 }} />
              <Line type="monotone" dataKey="dna" stroke="#00f3ff" strokeWidth={2} dot={false} name="DNA (Glass Encapsulated)" />
              <Line type="monotone" dataKey="blockchain" stroke="#f59e0b" strokeWidth={2} dot={false} name="Blockchain (Bitcoin)" />
              <Line type="monotone" dataKey="hybrid" stroke="#10b981" strokeWidth={4} dot={false} name="Hybrid Protocol (VLD 2.2)" />
            </LineChart>
          </ResponsiveContainer>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <DataCard 
          icon={<Database size={20} />} 
          label="DNA Half-Life" 
          value="1,240" 
          unit="Years" 
          detail="-80°C Storage"
          color="text-cyan-400"
        />
        <DataCard 
          icon={<Zap size={20} />} 
          label="Bitcoin Stability" 
          value="850" 
          unit="Years" 
          detail="Decentralized Sync"
          color="text-orange-400"
        />
        <DataCard 
          icon={<Shield size={20} />} 
          label="Hybrid Longevity" 
          value="2,400" 
          unit="Years" 
          detail="99.7% Prob @ 500y"
          color="text-emerald-400"
        />
      </div>
    </div>
  );
};

const DataCard: React.FC<{ icon: any, label: string, value: string, unit: string, detail: string, color: string }> = ({ icon, label, value, unit, detail, color }) => (
  <div className="bg-white/5 border border-white/10 rounded-[2.5rem] p-8 hover:bg-white/10 transition-all group">
    <div className={`p-4 bg-white/5 rounded-2xl w-fit mb-6 ${color} group-hover:scale-110 transition-transform`}>{icon}</div>
    <span className="text-[10px] text-white/30 uppercase font-bold tracking-widest block mb-1">{label}</span>
    <div className="flex items-baseline gap-2 mb-2">
      <span className={`orbitron text-3xl font-bold ${color}`}>{value}</span>
      <span className="text-[10px] text-white/20 font-bold uppercase">{unit}</span>
    </div>
    <p className="text-[9px] text-white/10 uppercase font-mono">{detail}</p>
  </div>
);

export default DegradationVisualizer;
