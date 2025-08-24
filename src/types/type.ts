export interface TeamMember {
  id: string;
  first_name: string;
  last_name: string;
  position: string;
  biography: string;
  jobplace: string;
  email: string;
  address: string;
  skills: string;
  profile?: string;
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
  authorName:string;
}