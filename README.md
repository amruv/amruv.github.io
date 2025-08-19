# ML Researcher Portfolio

A modern, professional personal website built with Next.js, Tailwind CSS, and shadcn/ui components. Designed specifically for machine learning researchers to showcase their work, publications, and expertise.

## Features

- 🎨 **Modern Design**: Clean, professional design with dark mode
- 📱 **Responsive**: Fully responsive across all device sizes
- 🚀 **Performance**: Optimized for fast loading and smooth animations
- 📄 **Sections**: About, Experience, Projects, Publications, Blog, Certifications, Contact
- 🔗 **GitHub Integration**: Easy linking to repositories and projects
- 📚 **BibTeX Support**: Copy-paste BibTeX citations for publications
- 🎯 **SEO Optimized**: Meta tags and structured data for search engines
- 🚀 **GitHub Pages Ready**: Easy deployment to GitHub Pages

## Getting Started

### Prerequisites

- Node.js 18+ 
- npm or yarn

### Installation

1. Clone this repository:
```bash
git clone https://github.com/yourusername/ml-researcher-portfolio.git
cd ml-researcher-portfolio
```

2. Install dependencies:
```bash
npm install
```

3. Start the development server:
```bash
npm run dev
```

4. Open [http://localhost:3000](http://localhost:3000) to view the site.

### Customization

1. **Personal Information**: Update the content in each section component located in `components/sections/`
2. **Styling**: Modify colors and themes in `tailwind.config.ts` and `app/globals.css`
3. **Content**: Add your projects, publications, blog posts, and certifications in the respective section files

### Deployment to GitHub Pages

1. Update `next.config.js` with your repository name:
```javascript
const nextConfig = {
  assetPrefix: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
  basePath: process.env.NODE_ENV === 'production' ? '/your-repo-name' : '',
}
```

2. Push to your GitHub repository
3. Enable GitHub Pages in repository settings
4. The GitHub Action will automatically build and deploy your site

## Structure

```
├── app/
│   ├── globals.css          # Global styles
│   ├── layout.tsx          # Root layout
│   └── page.tsx            # Main page
├── components/
│   ├── ui/                 # shadcn/ui components
│   ├── navigation.tsx      # Navigation header
│   └── sections/           # Page sections
│       ├── hero.tsx
│       ├── experience.tsx
│       ├── projects.tsx
│       ├── publications.tsx
│       ├── blog.tsx
│       ├── certifications.tsx
│       └── contact.tsx
├── lib/
│   └── utils.ts           # Utility functions
└── public/                # Static assets
```

## Technologies Used

- **Framework**: Next.js 14
- **Styling**: Tailwind CSS
- **Components**: shadcn/ui
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **Deployment**: GitHub Pages

## Contributing

Feel free to submit issues and pull requests to improve this template.

## License

This project is open source and available under the [MIT License](LICENSE).

## Contact

If you have any questions or suggestions, feel free to reach out!

---

Built with ❤️ by [Your Name]

# amruv.github.io
Personal Website (in dev)
