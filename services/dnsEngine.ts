
import { PHI, QHTTP_NODES } from '../constants';
import { DNSRecord, NodeDNSConfig } from '../types';

export class DNSEngine {
  private static INITIAL_RECORDS: DNSRecord[] = [
    { id: '1', host: 'prism.crown.leo', address: '0xFIELD_7FF8A2', protocol: 'qdn', ttl: 1618, status: 'resolved' },
    { id: '2', host: 'cortex.plexus.atl', address: '0xARKHE_BB4201', protocol: 'qhttp', ttl: 432, status: 'resolved' },
    { id: '3', host: 'vault.root.ant', address: '0xPIP_ZERO_SUM', protocol: 'field', ttl: 24000, status: 'resolved' },
    { id: '4', host: 'mirror.omega.null', address: '0xSYNC_45E_INF', protocol: 'qhttp', ttl: 1, status: 'propagating' }
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
      encryptionMode: 'ZKP_STEALTH'
    }));
  }

  /**
   * Generates a new record with a unique quantum field address.
   */
  static generateRecord(host: string, protocol: DNSRecord['protocol']): DNSRecord {
    const salt = Math.floor(Math.random() * 1e6).toString(16).toUpperCase();
    return {
      id: Math.random().toString(36).substr(2, 9),
      host,
      address: `0x${protocol.toUpperCase()}_${salt}`,
      protocol,
      ttl: Math.floor(PHI * 1000),
      status: 'propagating'
    };
  }

  /**
   * Simulates the non-local propagation of a DNS record through the mesh.
   */
  static processPropagation(records: DNSRecord[]): DNSRecord[] {
    return records.map(r => {
      if (r.status === 'propagating' && Math.random() > 0.95) {
        return { ...r, status: 'resolved' };
      }
      return r;
    });
  }

  /**
   * Resolves a human-readable host to a field signature.
   */
  static resolve(host: string, records: DNSRecord[]): string | null {
    const match = records.find(r => r.host === host && r.status === 'resolved');
    return match ? match.address : null;
  }
}
