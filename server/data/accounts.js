export const initialAccounts = [
  {
    id: 'acc-1',
    clientId: 'client-1',
    clientName: 'Alexander Wright',
    clientRole: 'Founder & CEO, Apex Holdings',
    provider: 'microsoft',
    email: 'alexander.wright@apexholdings.com',
    name: 'Alexander Wright (Apex Corporate)',
    status: 'connected',
    syncStatus: 'synced',
    lastSyncedAt: new Date(Date.now() - 3 * 60 * 1000).toISOString(),
    unreadCount: 5,
    totalCount: 42,
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    color: '#0078d4'
  },
  {
    id: 'acc-2',
    clientId: 'client-1',
    clientName: 'Alexander Wright',
    clientRole: 'Founder & CEO, Apex Holdings',
    provider: 'google',
    email: 'alex.wright.personal@gmail.com',
    name: 'Alexander Wright (Personal/Advisory)',
    status: 'connected',
    syncStatus: 'synced',
    lastSyncedAt: new Date(Date.now() - 7 * 60 * 1000).toISOString(),
    unreadCount: 3,
    totalCount: 29,
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    color: '#ea4335'
  },
  {
    id: 'acc-3',
    clientId: 'client-2',
    clientName: 'Dr. Sophia Chen',
    clientRole: 'Managing Partner, BioVenture Capital',
    provider: 'google',
    email: 'sophia.chen@bioventures.com',
    name: 'Dr. Sophia Chen (BioVentures)',
    status: 'connected',
    syncStatus: 'synced',
    lastSyncedAt: new Date(Date.now() - 12 * 60 * 1000).toISOString(),
    unreadCount: 2,
    totalCount: 18,
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    color: '#10b981'
  }
];

export const initialClients = [
  {
    id: 'client-1',
    name: 'Alexander Wright',
    role: 'Founder & CEO, Apex Holdings',
    email: 'alexander.wright@apexholdings.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    company: 'Apex Holdings',
    primaryColor: '#4f46e5'
  },
  {
    id: 'client-2',
    name: 'Dr. Sophia Chen',
    role: 'Managing Partner, BioVenture Capital',
    email: 'sophia.chen@bioventures.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    company: 'BioVentures Capital',
    primaryColor: '#059669'
  }
];
