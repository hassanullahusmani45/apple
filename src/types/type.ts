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
export interface ContactMessageType {
  name: string;
  email: string;
  subject?: string;
  message: string;
}
export interface registerType {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
}
export interface loginType {
  email: string;
  password: string;
}
export interface commentType {
  id: number;
  article_id: number;
  visitor_id?: string | null;
  team_member_id?: string | null;
  comment_text: string;
  parent_comment_id?: number | null;
  created_at: string;

  visitors?: {
    first_name: string;
    last_name: string;
    role_id: number;
    profile: string;
  } | null;

  team_members?: {
    first_name: string;
    last_name: string;
    role_id: number;
    profile: string;
  } | null;
}

export interface newCommentType {
  article_id: number;
  visitor_id: string;
  comment_text: string;
}