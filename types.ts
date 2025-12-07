// Base Cosmic object interface
export interface CosmicObject {
  id: string;
  slug: string;
  title: string;
  content?: string;
  metadata: Record<string, any>;
  type: string;
  created_at: string;
  modified_at: string;
  status?: string;
  published_at?: string;
}

// Category type definition
export interface Category extends CosmicObject {
  type: 'categories';
  metadata: {
    name?: string;
    description?: string;
  };
}

// Article type definition
export interface Article extends CosmicObject {
  type: 'articles';
  metadata: {
    title?: string;
    content?: string;
    featured_image?: {
      url: string;
      imgix_url: string;
    };
    publish_date?: string;
    author_name?: string;
    category?: Category;
  };
}

// API response types
export interface CosmicResponse<T> {
  objects: T[];
  total: number;
  limit?: number;
  skip?: number;
}

export interface CosmicSingleResponse<T> {
  object: T;
}

// Type guard functions
export function isArticle(obj: CosmicObject): obj is Article {
  return obj.type === 'articles';
}

export function isCategory(obj: CosmicObject): obj is Category {
  return obj.type === 'categories';
}