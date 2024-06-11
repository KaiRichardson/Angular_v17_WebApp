
export interface GithubApi {
  items: GithubIssue[];
  total_count: number;
}

export interface GithubIssue {
  title: string;
  created_at: string;
  updated_at: string;
}