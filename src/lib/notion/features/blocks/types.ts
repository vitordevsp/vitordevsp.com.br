import { NotionRichTextNode } from "../pages/types"

// ------------------------------
// Tipos de Blocks (essenciais para blog)
// ------------------------------

type NotionBlockBase = {
  object: "block";
  id: string;
  parent: { type: string;[k: string]: any };
  created_time: string;
  last_edited_time: string;
  created_by: { object: "user"; id: string };
  last_edited_by: { object: "user"; id: string };
  has_children: boolean;
  archived: boolean;
  in_trash: boolean;
  type: string;
};

// Alguns tipos mais comuns para posts de blog
export type ParagraphBlock = NotionBlockBase & {
  type: "paragraph";
  paragraph: {
    rich_text: NotionRichTextNode[];
    color: string;
  };
};

export type Heading1Block = NotionBlockBase & {
  type: "heading_1";
  heading_1: {
    rich_text: NotionRichTextNode[];
    is_toggleable?: boolean;
    color: string;
  };
};
export type Heading2Block = NotionBlockBase & {
  type: "heading_2";
  heading_2: {
    rich_text: NotionRichTextNode[];
    is_toggleable?: boolean;
    color: string;
  };
};
export type Heading3Block = NotionBlockBase & {
  type: "heading_3";
  heading_3: {
    rich_text: NotionRichTextNode[];
    is_toggleable?: boolean;
    color: string;
  };
};

export type BulletedListItemBlock = NotionBlockBase & {
  type: "bulleted_list_item";
  bulleted_list_item: {
    rich_text: NotionRichTextNode[];
    color: string;
    // quando has_children = true, você busca os filhos via children.list
  };
};

export type NumberedListItemBlock = NotionBlockBase & {
  type: "numbered_list_item";
  numbered_list_item: {
    rich_text: NotionRichTextNode[];
    color: string;
  };
};

export type QuoteBlock = NotionBlockBase & {
  type: "quote";
  quote: {
    rich_text: NotionRichTextNode[];
    color: string;
  };
};

export type CalloutBlock = NotionBlockBase & {
  type: "callout";
  callout: {
    rich_text: NotionRichTextNode[];
    icon: { type: "emoji"; emoji: string } | { type: "external" | "file";[k: string]: any } | null;
    color: string;
  };
};

export type CodeBlock = NotionBlockBase & {
  type: "code";
  code: {
    rich_text: NotionRichTextNode[];
    caption: NotionRichTextNode[];
    language: string;
  };
};

export type ImageBlock = NotionBlockBase & {
  type: "image";
  image: (
    | { type: "external"; external: { url: string }; caption: NotionRichTextNode[] }
    | { type: "file"; file: { url: string; expiry_time: string }; caption: NotionRichTextNode[] }
  );
};

export type DividerBlock = NotionBlockBase & { type: "divider"; divider: object };

export type AnyNotionBlock =
  | ParagraphBlock
  | Heading1Block
  | Heading2Block
  | Heading3Block
  | BulletedListItemBlock
  | NumberedListItemBlock
  | QuoteBlock
  | CalloutBlock
  | CodeBlock
  | ImageBlock
  | DividerBlock
  | NotionBlockBase; // fallback p/ tipos não mapeados ainda

// ------------------------------
// Opções e resposta padronizada
// ------------------------------

export type GetBlockChildrenOptions = {
  pageSize?: number;     // paginação
  startCursor?: string;  // paginação
};

export type BlockChildrenResponse<T> = {
  results: T[];
  nextCursor: string | null;
  hasMore: boolean;
};
