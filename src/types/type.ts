export interface TeamMember {
  id: string;
  first_name: string;
  last_name: string;
  email: string;
  role_id?: number;
  position?: string;
  biography?: string;
  skills?: string;
  info?: string;
  jobplace?: string;
  address?: string;
  weblink?: string;
  emaillink?: string;
  linkedinlink?: string;
  profile?: string;
  created_at?: string;
  updated_at?: string | null;
  deleted_at?: string | null;
}

export interface ArticleSection {
  id: number;
  section_title: string;
  section_topic?: string;
  section_img?: string;
  order_number?: number;
  created_at: string;
  updated_at: string;
}

export interface Article {
  id: number;
  author_id: string;
  category_id: number;
  title: string;
  summary?: string;
  view_count: number;
  cover_image?: string;
  status: "draft" | "published";
  published_at?: string;
  created_at: string;
  updated_at: string;
  team_members: TeamMember;
  article_sections: ArticleSection[];
  authorName: string;
}

export interface TeamMemberCardType {
  id: string;
  profile?: string;
  emaillink?: string;
  linkedinlink?: string;
  weblink?: string;
  name: string;
  positionTitle: string;
  quickInfo?: string;
};

export interface ArticleCardType {
  src: string;
  author: string;
  authorID: string;
  date: string;
  link: string;
  title: string;
  desc: string;
  viewCount: number;
  className?: string;
};

export interface LandingCounterSectionProps {
  teamMembers: number;
  articles: number;
  subscribers: number;
}