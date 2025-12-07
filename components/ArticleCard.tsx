import { Article } from '@/types'
import Link from 'next/link'
import CategoryBadge from './CategoryBadge'

interface ArticleCardProps {
  article: Article;
}

export default function ArticleCard({ article }: ArticleCardProps) {
  return (
    <article className="bg-white rounded-lg shadow-md overflow-hidden hover:shadow-xl transition-shadow">
      {article.metadata?.featured_image && (
        <Link href={`/articles/${article.slug}`}>
          <img
            src={`${article.metadata.featured_image.imgix_url}?w=600&h=400&fit=crop&auto=format,compress`}
            alt={article.title}
            className="w-full h-48 object-cover hover:opacity-90 transition-opacity"
            width={600}
            height={400}
          />
        </Link>
      )}
      
      <div className="p-6">
        {article.metadata?.category && (
          <div className="mb-3">
            <CategoryBadge category={article.metadata.category} />
          </div>
        )}
        
        <Link href={`/articles/${article.slug}`}>
          <h2 className="text-xl font-bold mb-3 hover:text-primary transition-colors">
            {article.title}
          </h2>
        </Link>
        
        <div className="flex items-center gap-3 text-sm text-gray-600">
          {article.metadata?.author_name && (
            <span>{article.metadata.author_name}</span>
          )}
          {article.metadata?.publish_date && (
            <span>
              {new Date(article.metadata.publish_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'short',
                day: 'numeric'
              })}
            </span>
          )}
        </div>
      </div>
    </article>
  )
}