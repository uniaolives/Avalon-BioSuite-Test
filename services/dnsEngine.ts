
import { PHI, QHTTP_NODES, GENESIS_VERIFIERS } from '../constants';
import { DNSRecord, NodeDNSConfig } from '../types';

export class DNSEngine {
  private static INITIAL_RECORDS: DNSRecord[] = [
    { id: '1', host: 'prism.crown.leo', address: '0xFIELD_7FF8A2', protocol: 'qdn', ttl: 1618, status: 'resolved', consensusWeight: 1.0, verifiers: GENESIS_VERIFIERS.map(v => v.name) },
    { id: '2', host: 'cortex.plexus.atl', address: '0xARKHE_BB4201', protocol: 'qhttp', ttl: 432, status: 'resolved', consensusWeight: 0.98, verifiers: [GENESIS_VERIFIERS[0].name, GENESIS_VERIFIERS[1].name, GENESIS_VERIFIERS[3].name] },
    { id: '3', host: 'vault.root.ant', address: '0xPIP_ZERO_SUM', protocol: 'field', ttl: 24000, status: 'resolved', consensusWeight: 1.0, verifiers: GENESIS_VERIFIERS.map(v => v.name) },
    { id: '4', host: 'mirror.omega.null', address: '0xSYNC_45E_INF', protocol: 'qhttp', ttl: 1, status: 'propagating', consensusWeight: 0.1, verifiers: [] }
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
      consensusStake: 1.618e9
    }));
  }

  /**
   * Generates a new record with a unique quantum field address and Byzantine check state.
   */
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
      verifiers: []
    };
  }

  /**
   * Simulates the Byzantine consensus process for qhttp nodes.
   */
  static processPropagation(records: DNSRecord[]): DNSRecord[] {
    return records.map(r => {
      // Propagation for non-Byzantine protocols
      if (r.status === 'propagating' && Math.random() > 0.95) {
        return { ...r, status: 'resolved', consensusWeight: 1.0 };
      }
      
      // Byzantine verification for qhttp
      if (r.status === 'byzantine_check') {
        const nextVerifier = GENESIS_VERIFIERS.find(v => !r.verifiers.includes(v.name));
        if (nextVerifier && Math.random() > 0.85) {
          const newVerifiers = [...r.verifiers, nextVerifier.name];
          const newWeight = newVerifiers.length / GENESIS_VERIFIERS.length;
          return {
            ...r,
            verifiers: newVerifiers,
            consensusWeight: newWeight,
            status: newWeight > 0.66 ? 'resolved' : 'byzantine_check'
          };
        }
      }
      return r;
    });
  }

  static resolve(host: string, records: DNSRecord[]): string | null {
    const match = records.find(r => r.host === host && r.status === 'resolved');
    return match ? match.address : null;
  }
}
