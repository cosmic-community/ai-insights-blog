import { MetadataRoute } from 'next'
import { getArticles, getCategories } from '@/lib/cosmic'
import { Article, Category } from '@/types'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://your-domain.com'
  
  const articles = await getArticles() as Article[]
  const categories = await getCategories() as Category[]
  
  const articleUrls = articles.map((article) => ({
    url: `${baseUrl}/articles/${article.slug}`,
    lastModified: new Date(article.modified_at),
    changeFrequency: 'weekly' as const,
    priority: 0.8,
  }))
  
  const categoryUrls = categories.map((category) => ({
    url: `${baseUrl}/categories/${category.slug}`,
    lastModified: new Date(),
    changeFrequency: 'weekly' as const,
    priority: 0.7,
  }))
  
  return [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    ...articleUrls,
    ...categoryUrls,
  ]
}