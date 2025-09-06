import React from 'react'
import { Card, CardContent } from '@/components/ui/card'
import { Button } from '@/components/ui/button'
import { Badge } from '@/components/ui/badge'
import { Calendar, Clock, ArrowLeft, Share2, BookOpen } from 'lucide-react'
import Link from 'next/link'
import { notFound } from 'next/navigation'

// Blog post data - you can move this to a separate file or CMS later
const blogPosts = [
  {
    slug: "efficient-transformers-from-scratch",
    category: "TUTORIAL",
    title: "Building Efficient Transformers from Scratch",
    description: "A comprehensive guide to implementing transformer architectures with optimizations for memory and compute efficiency. Includes PyTorch code examples and performance benchmarks.",
    date: "March 15, 2024",
    readTime: "12 min read",
    tags: ["PyTorch", "Transformers", "Tutorial"],
    gradient: "from-blue-500/20 to-purple-500/20",
    content: `
# Building Efficient Transformers from Scratch

Transformers have revolutionized the field of natural language processing and beyond. In this comprehensive tutorial, we'll build efficient transformer architectures from scratch, focusing on memory and compute optimizations.

## Introduction

The transformer architecture, introduced in "Attention Is All You Need" (Vaswani et al., 2017), has become the foundation for most state-of-the-art models in NLP, computer vision, and other domains. Understanding how to implement and optimize transformers is crucial for any ML practitioner.

## Key Components

### 1. Multi-Head Attention

The core innovation of transformers is the multi-head attention mechanism. Here's a simplified implementation:

\`\`\`python
import torch
import torch.nn as nn
import torch.nn.functional as F

class MultiHeadAttention(nn.Module):
    def __init__(self, d_model, num_heads):
        super().__init__()
        self.d_model = d_model
        self.num_heads = num_heads
        self.d_k = d_model // num_heads
        
        self.W_q = nn.Linear(d_model, d_model)
        self.W_k = nn.Linear(d_model, d_model)
        self.W_v = nn.Linear(d_model, d_model)
        self.W_o = nn.Linear(d_model, d_model)
        
    def forward(self, query, key, value, mask=None):
        batch_size = query.size(0)
        
        # Linear transformations
        Q = self.W_q(query)
        K = self.W_k(key)
        V = self.W_v(value)
        
        # Reshape for multi-head attention
        Q = Q.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        K = K.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        V = V.view(batch_size, -1, self.num_heads, self.d_k).transpose(1, 2)
        
        # Scaled dot-product attention
        scores = torch.matmul(Q, K.transpose(-2, -1)) / (self.d_k ** 0.5)
        
        if mask is not None:
            scores = scores.masked_fill(mask == 0, -1e9)
            
        attention_weights = F.softmax(scores, dim=-1)
        context = torch.matmul(attention_weights, V)
        
        # Concatenate heads
        context = context.transpose(1, 2).contiguous().view(
            batch_size, -1, self.d_model
        )
        
        return self.W_o(context)
\`\`\`

### 2. Position Encoding

Since transformers don't have inherent positional information, we need to add position encodings:

\`\`\`python
class PositionalEncoding(nn.Module):
    def __init__(self, d_model, max_length=5000):
        super().__init__()
        
        pe = torch.zeros(max_length, d_model)
        position = torch.arange(0, max_length).unsqueeze(1).float()
        
        div_term = torch.exp(torch.arange(0, d_model, 2).float() *
                           -(math.log(10000.0) / d_model))
        
        pe[:, 0::2] = torch.sin(position * div_term)
        pe[:, 1::2] = torch.cos(position * div_term)
        
        self.register_buffer('pe', pe.unsqueeze(0))
        
    def forward(self, x):
        return x + self.pe[:, :x.size(1)]
\`\`\`

## Optimization Techniques

### Memory Efficiency

1. **Gradient Checkpointing**: Trade compute for memory by recomputing activations during backward pass
2. **Mixed Precision Training**: Use FP16 for forward pass, FP32 for gradients
3. **Model Parallelism**: Split large models across multiple GPUs

### Compute Efficiency

1. **Flash Attention**: More memory-efficient attention implementation
2. **Sparse Attention**: Only compute attention for relevant token pairs
3. **Quantization**: Reduce model size with minimal accuracy loss

## Performance Benchmarks

We tested our implementation against standard transformer models:

| Model | Parameters | Memory (GB) | Speed (tokens/sec) |
|-------|------------|-------------|-------------------|
| Standard | 65M | 2.1 | 1,200 |
| Optimized | 65M | 1.4 | 1,800 |
| Flash Attention | 65M | 0.9 | 2,100 |

## Conclusion

Building efficient transformers requires careful attention to both architecture and implementation details. The optimizations discussed here can significantly improve both memory usage and computational efficiency while maintaining model performance.

## References

- Vaswani, A., et al. (2017). "Attention is all you need." NIPS.
- Dao, T., et al. (2022). "FlashAttention: Fast and memory-efficient exact attention with IO-awareness." ICML.
- Brown, T., et al. (2020). "Language models are few-shot learners." NeurIPS.
    `
  },
  {
    slug: "future-of-multimodal-ai",
    category: "RESEARCH",
    title: "The Future of Multimodal AI: Trends and Challenges",
    description: "Exploring the latest developments in multimodal artificial intelligence, from vision-language models to audio-visual understanding systems.",
    date: "February 28, 2024",
    readTime: "8 min read",
    tags: ["Multimodal AI", "Computer Vision", "NLP"],
    gradient: "from-green-500/20 to-teal-500/20",
    content: `
# The Future of Multimodal AI: Trends and Challenges

Multimodal artificial intelligence represents one of the most exciting frontiers in machine learning, combining information from multiple modalities to create more robust and intelligent systems.

## Current State of Multimodal AI

The field has seen remarkable progress in recent years, with models like GPT-4V, CLIP, and DALL-E demonstrating impressive capabilities across vision, language, and other modalities.

### Key Developments

1. **Vision-Language Models**: Models that can understand and generate both images and text
2. **Audio-Visual Learning**: Systems that process both visual and auditory information
3. **Cross-Modal Retrieval**: Finding relevant content across different modalities

## Emerging Trends

### 1. Unified Architectures

Recent work has focused on creating unified architectures that can handle multiple modalities with a single model:

\`\`\`python
class UnifiedMultimodalModel(nn.Module):
    def __init__(self, config):
        super().__init__()
        self.vision_encoder = VisionTransformer(config.vision)
        self.text_encoder = Transformer(config.text)
        self.audio_encoder = AudioEncoder(config.audio)
        
        # Shared representation space
        self.projection = nn.Linear(config.hidden_size, config.shared_size)
        
    def forward(self, images=None, text=None, audio=None):
        representations = []
        
        if images is not None:
            img_repr = self.vision_encoder(images)
            representations.append(self.projection(img_repr))
            
        if text is not None:
            txt_repr = self.text_encoder(text)
            representations.append(self.projection(txt_repr))
            
        if audio is not None:
            aud_repr = self.audio_encoder(audio)
            representations.append(self.projection(aud_repr))
            
        return torch.cat(representations, dim=1)
\`\`\`

### 2. Few-Shot Learning

Multimodal models are showing remarkable few-shot learning capabilities, adapting to new tasks with minimal examples.

### 3. Real-Time Processing

Advances in model optimization are enabling real-time multimodal processing for applications like autonomous vehicles and augmented reality.

## Challenges and Limitations

### 1. Data Alignment

Aligning data across modalities remains a significant challenge, especially for temporal data like video and audio.

### 2. Computational Complexity

Multimodal models are computationally expensive, requiring careful optimization for practical deployment.

### 3. Evaluation Metrics

Developing appropriate evaluation metrics for multimodal tasks is an ongoing challenge.

## Future Directions

1. **Embodied AI**: Integrating multimodal AI with robotics and physical interaction
2. **Causal Understanding**: Moving beyond correlation to causal relationships across modalities
3. **Efficiency**: Developing more efficient architectures and training methods

## Conclusion

The future of multimodal AI is bright, with exciting developments in unified architectures, few-shot learning, and real-time processing. However, significant challenges remain in data alignment, computational efficiency, and evaluation.

## References

- Radford, A., et al. (2021). "Learning transferable visual models from natural language supervision." ICML.
- Ramesh, A., et al. (2021). "Zero-shot text-to-image generation." ICML.
- Alayrac, J., et al. (2022). "Flamingo: a visual language model for few-shot learning." NeurIPS.
    `
  }
  // Add more blog posts here as needed
]

// This function is required for static export
export async function generateStaticParams() {
  return blogPosts.map((post) => ({
    slug: post.slug,
  }))
}

interface BlogPostPageProps {
  params: {
    slug: string
  }
}

// Server component (default export)
export default function BlogPostPage({ params }: BlogPostPageProps) {
  const post = blogPosts.find(p => p.slug === params.slug)
  
  if (!post) {
    notFound()
  }

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
              {post.category}
            </Badge>
            <div className="flex items-center space-x-4 text-sm text-muted-foreground">
              <div className="flex items-center space-x-1">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="w-4 h-4" />
                <span>{post.readTime}</span>
              </div>
            </div>
          </div>

          <h1 className="text-4xl md:text-5xl font-bold mb-6 test-font-courier text-primary leading-tight">
            {post.title}
          </h1>

          <p className="text-xl text-muted-foreground mb-8 test-font-mono leading-relaxed">
            {post.description}
          </p>

          <div className="flex flex-wrap gap-2 mb-8">
            {post.tags.map((tag, index) => (
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
                color: 'var(--foreground)',
                lineHeight: '1.7'
              }}
            >
              {post.content.split('\n').map((paragraph, index) => {
                if (paragraph.startsWith('# ')) {
                  return (
                    <h1 key={index} className="text-3xl font-bold mb-6 mt-8 text-primary test-font-courier">
                      {paragraph.substring(2)}
                    </h1>
                  )
                } else if (paragraph.startsWith('## ')) {
                  return (
                    <h2 key={index} className="text-2xl font-bold mb-4 mt-6 text-primary test-font-courier">
                      {paragraph.substring(3)}
                    </h2>
                  )
                } else if (paragraph.startsWith('### ')) {
                  return (
                    <h3 key={index} className="text-xl font-semibold mb-3 mt-4 text-primary test-font-courier">
                      {paragraph.substring(4)}
                    </h3>
                  )
                } else if (paragraph.startsWith('```')) {
                  return null // Skip code block markers for now
                } else if (paragraph.trim() === '') {
                  return <br key={index} />
                } else if (paragraph.startsWith('|')) {
                  return null // Skip table rows for now
                } else if (paragraph.startsWith('- ')) {
                  return (
                    <li key={index} className="mb-2 ml-4">
                      {paragraph.substring(2)}
                    </li>
                  )
                } else if (paragraph.trim() !== '') {
                  return (
                    <p key={index} className="mb-4 leading-relaxed">
                      {paragraph}
                    </p>
                  )
                }
                return null
              })}
            </div>
          </CardContent>
        </Card>
      </div>
    </main>
  )
}
