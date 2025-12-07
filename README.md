# AI Insights Blog

![AI Insights Blog](https://imgix.cosmicjs.com/6402d390-d3ba-11f0-8d90-59746c6baee3-photo-1677442136019-21780ecad995-1765145793702.jpg?w=1200&h=300&fit=crop&auto=format,compress)

A modern, responsive blog platform showcasing articles about artificial intelligence and emerging technologies. Built with Next.js 16 and powered by Cosmic CMS, this application provides an engaging reading experience with intelligent content organization.

## Features

- 📝 **Dynamic Article Display** - Automatically fetches and displays articles from Cosmic CMS
- 🏷️ **Category Filtering** - Organize content by AI, Future Tech, and Technology categories
- 🎨 **Modern UI Design** - Clean, responsive interface with Tailwind CSS
- 📱 **Mobile-First Responsive** - Perfect display across all device sizes
- ⚡ **Performance Optimized** - Next.js 16 App Router with Server Components
- 🖼️ **Image Optimization** - Automatic image optimization using imgix
- 🔍 **SEO Ready** - Proper metadata and semantic HTML structure
- 🎯 **Featured Article Spotlight** - Highlight your most important content

## Clone this Project

Want to create your own version of this project with all the content and structure? Clone this Cosmic bucket and code repository to get started instantly:

[![Clone this Project](https://img.shields.io/badge/Clone%20this%20Project-29abe2?style=for-the-badge&logo=cosmic&logoColor=white)](https://app.cosmicjs.com/projects/new?clone_bucket=6935fc783584465d0a2fb466&clone_repository=6935fe843584465d0a2fb489)

## Prompts

This application was built using the following prompts to generate the content structure and code:

### Content Model Prompt

> "Eye-Opening Look at How Fast Artificial Intelligence is Advancing"

### Code Generation Prompt

> Based on the content model I created for "Eye-Opening Look at How Fast Artificial Intelligence is Advancing", now build a complete web application that showcases this content. Include a modern, responsive design with proper navigation, content display, and user-friendly interface.

The app has been tailored to work with your existing Cosmic content structure and includes all the features requested above.

## Technologies Used

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type-safe development
- **Tailwind CSS** - Utility-first styling
- **Cosmic CMS** - Headless CMS for content management
- **Cosmic SDK** - Official JavaScript SDK for Cosmic
- **imgix** - Image optimization and delivery

## Getting Started

### Prerequisites

- Node.js 18+ or Bun runtime
- A Cosmic account with bucket credentials

### Installation

1. Clone the repository or download the project files

2. Install dependencies:
```bash
bun install
```

3. Create a `.env.local` file in the root directory with your Cosmic credentials:
```env
COSMIC_BUCKET_SLUG=your-bucket-slug
COSMIC_READ_KEY=your-read-key
COSMIC_WRITE_KEY=your-write-key
```

4. Run the development server:
```bash
bun run dev
```

5. Open [http://localhost:3000](http://localhost:3000) in your browser

## Cosmic SDK Examples

### Fetching All Articles

```typescript
import { cosmic } from '@/lib/cosmic'

const { objects: articles } = await cosmic.objects
  .find({ type: 'articles' })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1) // Include connected category data
```

### Fetching Single Article

```typescript
const response = await cosmic.objects
  .findOne({
    type: 'articles',
    slug: articleSlug
  })
  .props(['id', 'title', 'slug', 'metadata'])
  .depth(1)

const article = response.object
```

### Fetching Categories

```typescript
const { objects: categories } = await cosmic.objects
  .find({ type: 'categories' })
  .props(['id', 'title', 'slug', 'metadata'])
```

## Cosmic CMS Integration

This application integrates with your Cosmic bucket using two content types:

### Articles Object Type
- **Title** (text) - Article headline
- **Content** (html-textarea) - Full article body with rich formatting
- **Featured Image** (file) - Hero image for the article
- **Publish Date** (date) - Publication date
- **Author Name** (text) - Article author
- **Category** (object) - Connected category object

### Categories Object Type
- **Name** (text) - Category name
- **Description** (textarea) - Category description

The application uses the Cosmic SDK's `depth` parameter to automatically fetch connected category data when retrieving articles, eliminating the need for separate queries.

## Deployment Options

### Deploy to Vercel (Recommended for Next.js)

1. Push your code to GitHub
2. Import your repository in Vercel
3. Add environment variables in the Vercel dashboard:
   - `COSMIC_BUCKET_SLUG`
   - `COSMIC_READ_KEY`
   - `COSMIC_WRITE_KEY`
4. Deploy

### Deploy to Netlify

1. Push your code to GitHub
2. Connect your repository in Netlify
3. Set build command: `bun run build`
4. Set publish directory: `.next`
5. Add environment variables in Netlify dashboard
6. Deploy

## Project Structure

```
├── app/
│   ├── layout.tsx          # Root layout with navigation
│   ├── page.tsx             # Homepage with featured articles
│   ├── articles/
│   │   └── [slug]/
│   │       └── page.tsx     # Individual article pages
│   └── categories/
│       └── [slug]/
│           └── page.tsx     # Category-filtered article pages
├── components/
│   ├── ArticleCard.tsx      # Article preview card component
│   ├── CategoryBadge.tsx    # Category label component
│   └── CosmicBadge.tsx      # "Built with Cosmic" badge
├── lib/
│   └── cosmic.ts            # Cosmic SDK configuration
├── types.ts                 # TypeScript type definitions
└── public/
    └── dashboard-console-capture.js  # Console logging for dashboard
```

<!-- README_END -->