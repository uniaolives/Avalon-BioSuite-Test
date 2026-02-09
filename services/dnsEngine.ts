
import { PHI, QHTTP_NODES, GENESIS_VERIFIERS } from '../constants';
import { DNSRecord, NodeDNSConfig, ArkheCoefficients } from '../types';

export class DNSEngine {
  private static INITIAL_RECORDS: DNSRecord[] = [
    { id: '1', host: 'prism.crown.leo', address: '0xFIELD_7FF8A2', protocol: 'qdn', ttl: 1618, status: 'resolved', consensusWeight: 1.0, verifiers: GENESIS_VERIFIERS.map(v => v.name), coefficients: { C: 0.8, I: 0.9, E: 0.7, F: 0.9 } },
    { id: '2', host: 'cortex.plexus.atl', address: '0xARKHE_BB4201', protocol: 'qhttp', ttl: 432, status: 'resolved', consensusWeight: 0.98, verifiers: [GENESIS_VERIFIERS[0].name, GENESIS_VERIFIERS[1].name, GENESIS_VERIFIERS[3].name], coefficients: { C: 0.6, I: 0.95, E: 0.4, F: 0.85 } },
    { id: '3', host: 'vault.root.ant', address: '0xPIP_ZERO_SUM', protocol: 'field', ttl: 24000, status: 'resolved', consensusWeight: 1.0, verifiers: GENESIS_VERIFIERS.map(v => v.name), coefficients: { C: 0.9, I: 0.5, E: 0.9, F: 0.7 } },
    { id: '4', host: 'mirror.omega.null', address: '0xSYNC_45E_INF', protocol: 'qhttp', ttl: 1, status: 'propagating', consensusWeight: 0.1, verifiers: [], coefficients: { C: 0.7, I: 0.7, E: 0.7, F: 0.7 } }
  ];

  static getInitialRecords(): DNSRecord[] {
    return [...this.INITIAL_RECORDS];
  }

  static getInitialNodeConfigs(): NodeDNSConfig[] {
    return QHTTP_NODES.map(node => ({
      nodeId: node.id,
      primaryResolver: '0.0.0.Ω',
      recursiveDepth: 3,
      cacheTTL: Math.floor(PHI * 100),
      encryptionMode: 'ZKP_STEALTH',
      fieldRigidity: 0.88,
      consensusStake: 1.618e9,
      localArkhe: { C: 0.6, I: 0.5, E: 0.4, F: 0.8 }
    }));
  }

  static calculateResonance(local: ArkheCoefficients, target: ArkheCoefficients): number {
    const v1 = [local.C, local.I, local.E, local.F];
    const v2 = [target.C, target.I, target.E, target.F];
    
    const dot = v1.reduce((acc, val, i) => acc + val * v2[i], 0);
    const mag1 = Math.sqrt(v1.reduce((acc, val) => acc + val * val, 0));
    const mag2 = Math.sqrt(v2.reduce((acc, val) => acc + val * val, 0));
    
    if (mag1 === 0 || mag2 === 0) return 0;
    return Math.pow(dot / (mag1 * mag2), 2); // P(L) = |<local|target>|^2
  }

  static generateRecord(host: string, protocol: DNSRecord['protocol']): DNSRecord {
    const salt = Math.floor(Math.random() * 1e6).toString(16).toUpperCase();
    return {
      id: Math.random().toString(36).substr(2, 9),
      host,
      address: `0x${protocol.toUpperCase()}_${salt}`,
      protocol,
      ttl: Math.floor(PHI * 1000),
      status: protocol === 'qhttp' ? 'byzantine_check' : 'propagating',
      consensusWeight: 0,
      verifiers: [],
      coefficients: {
        C: Math.random(),
        I: Math.random(),
        E: Math.random(),
        F: Math.random()
      }
    };
  }

  static processPropagation(records: DNSRecord[], localArkhe?: ArkheCoefficients): DNSRecord[] {
    return records.map(r => {
      if (r.status === 'propagating' && Math.random() > 0.95) {
        return { ...r, status: 'resolved', consensusWeight: 1.0 };
      }
      
      if (r.status === 'byzantine_check') {
        const nextVerifier = GENESIS_VERIFIERS.find(v => !r.verifiers.includes(v.name));
        if (nextVerifier && Math.random() > 0.85) {
          const newVerifiers = [...r.verifiers, nextVerifier.name];
          const newWeight = newVerifiers.length / GENESIS_VERIFIERS.length;
          
          // Fix: explicitly type status to allow assignment of 'resolved' or 'decoherence_error'
          // within the byzantine_check Narrowing block.
          let status: DNSRecord['status'] = r.status;
          if (newWeight > 0.66) {
             // Check resonance for final resolution
             if (localArkhe) {
               const resonance = this.calculateResonance(localArkhe, r.coefficients);
               status = resonance > 0.7 ? 'resolved' : 'decoherence_error';
             } else {
               status = 'resolved';
             }
          }

          return {
            ...r,
            verifiers: newVerifiers,
            consensusWeight: newWeight,
            status: status as any
          };
        }
      }
      return r;
    });
  }

  static async performPlanetarySweep(nodeConfigs: NodeDNSConfig[]): Promise<NodeDNSConfig[]> {
    return nodeConfigs.map(config => ({
      ...config,
      fieldRigidity: Math.min(1.0, config.fieldRigidity + 0.05),
      consensusStake: config.consensusStake * 1.01
    }));
  }

  static resolve(host: string, records: DNSRecord[]): string | null {
    const match = records.find(r => r.host === host && r.status === 'resolved');
    return match ? match.address : null;
  }
}
