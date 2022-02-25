import { ReactElement } from 'react'
import { Heading, Text } from '@chakra-ui/react'
import { NotionBlockType } from '../../services/notion/types/notion.types'
import { PropTextType } from '../../services/notion/types/notionBlocks.types'

const getContentByBlockTextProp = (textTypeObjs: PropTextType[]) => {
  const bodyChunks = textTypeObjs.map(textTypeObj => {
    const {
      annotations: { code, bold, italic, underline, strikethrough, color },
      text: { content, link },
    } = textTypeObj

    let textType: 'default' | 'link' | 'code' | 'annotation' = 'default'
    const hasAnnotation = [bold, italic, underline, strikethrough, color !== 'default'].includes(true)

    if (link) textType = 'link'
    else if (code) textType = 'code'
    else if (hasAnnotation) textType = 'annotation'

    const textsTypes = {
      link() {
        if (!link) return ''

        const style = 'color: #FF0083'
        return `<a href="${link.url}" style="${style}" target="_blank">${content}</a>`
      },

      code() {
        const style = `
        color: orange;
        background: rgba(255, 255, 255, 0.1);
        padding: 2px 4px;
        border-radius: 6px;
      `

        return `<span style="${style}">${content}</span>`
      },

      annotation() {
        let style = ''

        if (bold) style += 'font-weight: bold;'
        if (italic) style += 'font-style: italic;'
        if (italic) style += 'text-decoration: underline;'
        if (strikethrough) style += 'text-decoration: line-through;'
        if (color !== 'default') style += `color: ${color};`

        return `<span style="${style}">${content}</span>`
      },

      default() {
        return content
      },
    }

    const body = textsTypes[textType]()

    return body
  })

  const body = bodyChunks.join(' ')

  return body
}

export const MapComponent = {
  paragraph(block: NotionBlockType): ReactElement | null {
    const textTypeObjs = block?.paragraph?.text

    if (!textTypeObjs) return null

    const body = getContentByBlockTextProp(textTypeObjs)

    return (
      <Text dangerouslySetInnerHTML={{ __html: body }} />
    )
  },

  heading_1(block: NotionBlockType): ReactElement | null {
    const textTypeObjs = block?.heading_1?.text

    if (!textTypeObjs) return null

    const body = getContentByBlockTextProp(textTypeObjs)

    return (
      <Heading as="h1" padding="32px 0 8px">{body}</Heading>
    )
  },

  heading_2(block: NotionBlockType): ReactElement | null {
    const textTypeObjs = block?.heading_2?.text

    if (!textTypeObjs) return null

    const body = getContentByBlockTextProp(textTypeObjs)

    return (
      <Heading as="h2" padding="32px 0 8px">{body}</Heading>
    )
  },

  heading_3(block: NotionBlockType): ReactElement | null {
    const textTypeObjs = block?.heading_3?.text

    if (!textTypeObjs) return null

    const body = getContentByBlockTextProp(textTypeObjs)

    return (
      <Heading as="h3" padding="32px 0 8px">{body}</Heading>
    )
  },

  bulleted_list_item(block: NotionBlockType): ReactElement | null {
    const textTypeObjs = block?.bulleted_list_item?.text

    if (!textTypeObjs) return null

    const body = getContentByBlockTextProp(textTypeObjs)

    const style = { marginLeft: '4px' }

    return (
      <li style={style} dangerouslySetInnerHTML={{ __html: body }} />
    )
  },

  numbered_list_item(block: NotionBlockType): ReactElement | null {
    return null
  },

  code(block: NotionBlockType): ReactElement | null {
    const textTypeObjs = block?.code?.text

    if (!textTypeObjs) return null

    const body = getContentByBlockTextProp(textTypeObjs)

    const style = {
      background: 'rgba(255, 255, 255, 0.1)',
      padding: '16px',
      borderRadius: '6px',
    }

    return (
      <pre style={style}>
        {/* <code> */}
        {body}
        {/* </code> */}
      </pre>
    )
  },

  to_do(block: NotionBlockType): ReactElement | null {
    return null
  },

  toggle(block: NotionBlockType): ReactElement | null {
    return null
  },

  child_page(block: NotionBlockType): ReactElement | null {
    return null
  },

  child_database(block: NotionBlockType): ReactElement | null {
    return null
  },

  embed(block: NotionBlockType): ReactElement | null {
    return null
  },

  image(block: NotionBlockType): ReactElement | null {
    const url = block.image?.file.url
    return <img src={url} alt="image" />
  },

  video(block: NotionBlockType): ReactElement | null {
    return null
  },

  file(block: NotionBlockType): ReactElement | null {
    return null
  },

  pdf(block: NotionBlockType): ReactElement | null {
    return null
  },

  bookmark(block: NotionBlockType): ReactElement | null {
    return null
  },

  callout(block: NotionBlockType): ReactElement | null {
    return null
  },

  quote(block: NotionBlockType): ReactElement | null {
    return null
  },

  equation(block: NotionBlockType): ReactElement | null {
    return null
  },

  divider(block: NotionBlockType): ReactElement | null {
    const style = {
      display: 'block',
      height: '2px',
      background: 'rgba(255, 255, 255, 0.1)',
      borderRadius: '6px',
      margin: '8px 0',
    }

    return (
      <div>
        <div style={style} />
      </div>
    )
  },

  table_of_contents(block: NotionBlockType): ReactElement | null {
    return null
  },

  column(block: NotionBlockType): ReactElement | null {
    return null
  },

  column_list(block: NotionBlockType): ReactElement | null {
    return null
  },

  link_preview(block: NotionBlockType): ReactElement | null {
    return null
  },

  synced_block(block: NotionBlockType): ReactElement | null {
    return null
  },

  template(block: NotionBlockType): ReactElement | null {
    return null
  },

  link_to_page(block: NotionBlockType): ReactElement | null {
    return null
  },

  table(block: NotionBlockType): ReactElement | null {
    return null
  },

  table_row(block: NotionBlockType): ReactElement | null {
    return null
  },

  unsupported(): ReactElement | null {
    return null
  },
}
