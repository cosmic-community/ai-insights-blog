// app/articles/[slug]/page.tsx
import { getArticle, getArticles } from '@/lib/cosmic'
import { Article } from '@/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import CategoryBadge from '@/components/CategoryBadge'

export const revalidate = 60

export async function generateStaticParams() {
  const articles = await getArticles() as Article[]
  
  return articles.map((article) => ({
    slug: article.slug,
  }))
}

interface ArticlePageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticle(slug) as Article | null

  if (!article) {
    return {
      title: 'Article Not Found',
    }
  }

  return {
    title: article.title,
    description: article.metadata?.title || article.title,
  }
}

export default async function ArticlePage({ params }: ArticlePageProps) {
  const { slug } = await params
  const article = await getArticle(slug) as Article | null

  if (!article) {
    notFound()
  }

  return (
    <article className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Article Header */}
      <div className="mb-8">
        <Link
          href="/"
          className="inline-flex items-center text-primary hover:underline mb-6"
        >
          ← Back to Home
        </Link>
        
        {article.metadata?.category && (
          <div className="mb-4">
            <CategoryBadge category={article.metadata.category} />
          </div>
        )}
        
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {article.title}
        </h1>
        
        <div className="flex items-center gap-4 text-gray-600">
          {article.metadata?.author_name && (
            <span className="font-medium">By {article.metadata.author_name}</span>
          )}
          {article.metadata?.publish_date && (
            <span>
              {new Date(article.metadata.publish_date).toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </span>
          )}
        </div>
      </div>

      {/* Featured Image */}
      {article.metadata?.featured_image && (
        <div className="mb-8">
          <img
            src={`${article.metadata.featured_image.imgix_url}?w=1200&h=600&fit=crop&auto=format,compress`}
            alt={article.title}
            className="w-full rounded-lg shadow-lg"
            width={1200}
            height={600}
          />
        </div>
      )}

      {/* Article Content */}
      <div
        className="article-content prose prose-lg max-w-none"
        dangerouslySetInnerHTML={{ __html: article.metadata?.content || '' }}
      />
    </article>
  )
}