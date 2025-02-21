export interface Proposal {
  id: string;
  author: string;
  created: number;
  symbol: string;
  type?: string;
  title: string;
  start: number;
  end: number;
  quorum: number;
  snapshot?: number;
  state?: string;
  link?: string;
  app?: string;
  scores?: number[];
  votes: number;
  approved: boolean;
  scores_total?: number;
  formatted_score?: string;
  yes?: number;
}

export interface ProjectListProps {
  proposals: Proposal[];
  searchQuery: string;
  showApproved: boolean;
}
