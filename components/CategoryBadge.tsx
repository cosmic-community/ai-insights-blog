import { Category } from '@/types'
import Link from 'next/link'

interface CategoryBadgeProps {
  category: Category;
}

export default function CategoryBadge({ category }: CategoryBadgeProps) {
  return (
    <Link
      href={`/categories/${category.slug}`}
      className="inline-block bg-primary text-white text-xs font-semibold px-3 py-1 rounded-full hover:bg-blue-700 transition-colors"
    >
      {category.title}
    </Link>
  )
}