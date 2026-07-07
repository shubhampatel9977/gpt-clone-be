export interface AccountProfile {
  id: string;
  name: string;
  email: string;
  role: string;
  provider: string;
}

export interface AccountStats {
  chatCount: number;
  projectCount: number;
  messageCount: number;
  totalTokens: number;
}

export interface AccountResponse {
  profile: AccountProfile;
  stats: AccountStats;
}
