import fs from "fs";
import path from "path";
import matter from "gray-matter";
import { Card, CardContent } from "@/components/ui/card";
import MdxPost from "./MdxPost.client";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, Clock, ArrowLeft, Share2, BookOpen } from "lucide-react";
import Link from "next/link";
import { notFound } from "next/navigation";

export async function generateStaticParams() {
  const postsDir = path.join(process.cwd(), "content/blog");
  const files = fs.readdirSync(postsDir);
  return files
    .filter((file) => file.endsWith(".mdx"))
    .map((file) => ({
      slug: file.replace(/\.mdx$/, ""),
    }));
}

interface BlogPostPageProps {
  params: {
    slug: string;
  };
}

// Server component (default export)
export default async function BlogPostPage({ params }: BlogPostPageProps) {
  const postsDir = path.join(process.cwd(), "content/blog");
  const filePath = path.join(postsDir, `${params.slug}.mdx`);

  if (!fs.existsSync(filePath)) {
    notFound();
  }

  const source = fs.readFileSync(filePath, "utf8");
  const { content, data } = matter(source);

  return (
    <main className="min-h-screen bg-background text-foreground">
      {/* Header */}
      <div className="bg-background border-b border-border">
        <div className="max-w-4xl mx-auto px-6 py-8">
          <div className="flex items-center gap-4 mb-6">
            <Link href="/blog">
              <Button variant="ghost" size="sm" className="test-font-mono">
                <ArrowLeft className="w-4 h-4 mr-2" />
                Back to Blog
              </Button>
            </Link>
          </div>
        </div>
      </div>

      {/* Article Header */}
      <div className="max-w-4xl mx-auto px-6 py-12">
        <div>
          <div className="flex items-center gap-2 mb-4">
            <Badge variant="outline" className="text-xs font-medium">
              {data.category}
            </Badge>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{data.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{data.readTime}</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 test-font-courier text-primary leading-tight">
            {data.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-8 test-font-mono leading-relaxed">
            {data.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {data.tags?.map((tag: string, index: number) => (
              <Badge key={index} variant="secondary" className="text-sm">
                {tag}
              </Badge>
            ))}
          </div>

          <div className="flex items-center gap-4 pb-8 border-b border-border">
            <Button variant="outline" size="sm" className="test-font-mono">
              <Share2 className="w-4 h-4 mr-2" />
              Share
            </Button>
            <Button variant="outline" size="sm" className="test-font-mono">
              <BookOpen className="w-4 h-4 mr-2" />
              Save
            </Button>
          </div>
        </div>
      </div>

      {/* Article Content */}
      <div className="max-w-4xl mx-auto px-6 pb-20">
        <Card className="border-0 shadow-none">
          <CardContent className="p-0">
            <div
              className="prose prose-lg max-w-none test-font-mono"
              style={{
                color: "var(--foreground)",
                lineHeight: "1.7",
              }}
            >
              {/* <MdxPost content={content} frontmatter={data} /> */}
              <MdxPost />
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  );
}