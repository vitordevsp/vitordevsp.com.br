import { ReactElement } from 'react'
import { NotionBlockType } from '../../services/notion/types/notion.types'

export const MapComponent = {
  paragraph(block: NotionBlockType): ReactElement | null {
    const text = block.paragraph?.text[0].text.content

    return (
      <p>{text}</p>
    )
  },

  heading_1(block: NotionBlockType): ReactElement | null {
    return (
      <h1></h1>
    )
  },

  heading_2(block: NotionBlockType): ReactElement | null {
    return (
      <h2></h2>
    )
  },

  heading_3(block: NotionBlockType): ReactElement | null {
    return (
      <h3></h3>
    )
  },

  bulleted_list_item(block: NotionBlockType): ReactElement | null {
    return null
  },

  numbered_list_item(block: NotionBlockType): ReactElement | null {
    return null
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
    return null
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
    return <hr />
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
