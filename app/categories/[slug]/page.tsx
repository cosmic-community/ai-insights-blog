// app/categories/[slug]/page.tsx
import { getCategory, getArticlesByCategory, getCategories } from '@/lib/cosmic'
import { Article, Category } from '@/types'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import ArticleCard from '@/components/ArticleCard'

export const revalidate = 60

export async function generateStaticParams() {
  const categories = await getCategories() as Category[]
  
  return categories.map((category) => ({
    slug: category.slug,
  }))
}

interface CategoryPageProps {
  params: Promise<{
    slug: string;
  }>;
}

export async function generateMetadata({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug) as Category | null

  if (!category) {
    return {
      title: 'Category Not Found',
    }
  }

  return {
    title: `${category.title} - AI Insights Blog`,
    description: category.metadata?.description || `Articles about ${category.title}`,
  }
}

export default async function CategoryPage({ params }: CategoryPageProps) {
  const { slug } = await params
  const category = await getCategory(slug) as Category | null

  if (!category) {
    notFound()
  }

  const articles = await getArticlesByCategory(category.id) as Article[]

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <Link
        href="/"
        className="inline-flex items-center text-primary hover:underline mb-8"
      >
        ← Back to Home
      </Link>

      <div className="mb-12">
        <h1 className="text-4xl md:text-5xl font-bold mb-4">
          {category.title}
        </h1>
        {category.metadata?.description && (
          <p className="text-xl text-gray-600">
            {category.metadata.description}
          </p>
        )}
      </div>

      {articles.length === 0 ? (
        <p className="text-center text-gray-600">
          No articles found in this category.
        </p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {articles.map((article) => (
            <ArticleCard key={article.id} article={article} />
          ))}
        </div>
      )}
    </div>
  )
}