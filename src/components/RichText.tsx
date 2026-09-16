import React from 'react'

type LexicalNode = {
  type?: string
  tag?: string
  text?: string
  format?: number
  url?: string
  children?: LexicalNode[]
  listType?: string
}

type LexicalContent = {
  root?: {
    children?: LexicalNode[]
  }
}

function renderText(node: LexicalNode, index: number): React.ReactNode {
  let text: React.ReactNode = node.text || ''
  const format = node.format || 0
  if (format & 1) text = <strong key={`b-${index}`}>{text}</strong>
  if (format & 2) text = <em key={`i-${index}`}>{text}</em>
  return <React.Fragment key={index}>{text}</React.Fragment>
}

function renderChildren(nodes: LexicalNode[] = []): React.ReactNode {
  return nodes.map((node, index) => {
    if (node.type === 'text') return renderText(node, index)
    if (node.type === 'linebreak') return <br key={index} />
    if (node.type === 'link') {
      return (
        <a key={index} href={node.url || '#'} target="_blank" rel="noreferrer">
          {renderChildren(node.children)}
        </a>
      )
    }
    if (node.type === 'paragraph') {
      return <p key={index}>{renderChildren(node.children)}</p>
    }
    if (node.type === 'heading') {
      const Tag = (node.tag || 'h2') as 'h1' | 'h2' | 'h3' | 'h4'
      return <Tag key={index}>{renderChildren(node.children)}</Tag>
    }
    if (node.type === 'list') {
      const Tag = node.listType === 'number' ? 'ol' : 'ul'
      return <Tag key={index}>{renderChildren(node.children)}</Tag>
    }
    if (node.type === 'listitem') {
      return <li key={index}>{renderChildren(node.children)}</li>
    }
    if (node.type === 'quote') {
      return <blockquote key={index}>{renderChildren(node.children)}</blockquote>
    }
    if (node.children) return <React.Fragment key={index}>{renderChildren(node.children)}</React.Fragment>
    return null
  })
}

export function RichText({ data }: { data: LexicalContent | null | undefined }) {
  if (!data?.root?.children?.length) return null
  return <div className="prose">{renderChildren(data.root.children)}</div>
}

export function lexicalParagraph(text: string): LexicalContent {
  return {
    root: {
      children: [
        {
          type: 'paragraph',
          children: [{ type: 'text', text, format: 0 }],
        },
      ],
    },
  }
}
