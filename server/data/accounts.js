export const initialAccounts = [
  {
    id: 'acc-1',
    provider: 'microsoft',
    email: 'alexander.wright@apexholdings.com',
    name: 'Alexander Wright (Corporate)',
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
  }
];
