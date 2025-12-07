import { getArticles } from '@/lib/cosmic'
import { Article } from '@/types'
import ArticleCard from '@/components/ArticleCard'
import Link from 'next/link'

export const revalidate = 60 // Revalidate every 60 seconds

export default async function HomePage() {
  const articles = await getArticles() as Article[]

  if (!articles || articles.length === 0) {
    return (
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <p className="text-center text-gray-600">No articles found.</p>
      </div>
    )
  }

  const featuredArticle = articles[0]
  const otherArticles = articles.slice(1)

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      {/* Hero Section with Featured Article */}
      {featuredArticle && (
        <div className="mb-16">
          <div className="bg-white rounded-lg shadow-lg overflow-hidden">
            <div className="md:flex">
              <div className="md:w-1/2">
                {featuredArticle.metadata?.featured_image && (
                  <img
                    src={`${featuredArticle.metadata.featured_image.imgix_url}?w=800&h=600&fit=crop&auto=format,compress`}
                    alt={featuredArticle.title}
                    className="w-full h-64 md:h-full object-cover"
                    width={800}
                    height={600}
                  />
                )}
              </div>
              <div className="md:w-1/2 p-8">
                <div className="mb-4">
                  {featuredArticle.metadata?.category && (
                    <span className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full">
                      {featuredArticle.metadata.category.title}
                    </span>
                  )}
                </div>
                <h1 className="text-3xl md:text-4xl font-bold mb-4">
                  {featuredArticle.title}
                </h1>
                <div className="flex items-center gap-4 text-sm text-gray-600 mb-6">
                  {featuredArticle.metadata?.author_name && (
                    <span>By {featuredArticle.metadata.author_name}</span>
                  )}
                  {featuredArticle.metadata?.publish_date && (
                    <span>
                      {new Date(featuredArticle.metadata.publish_date).toLocaleDateString('en-US', {
                        year: 'numeric',
                        month: 'long',
                        day: 'numeric'
                      })}
                    </span>
                  )}
                </div>
                <Link
                  href={`/articles/${featuredArticle.slug}`}
                  className="inline-block bg-primary text-white px-6 py-3 rounded-lg hover:bg-blue-700 transition-colors"
                >
                  Read Article
                </Link>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Other Articles Grid */}
      {otherArticles.length > 0 && (
        <div>
          <h2 className="text-3xl font-bold mb-8">Latest Articles</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {otherArticles.map((article) => (
              <ArticleCard key={article.id} article={article} />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}