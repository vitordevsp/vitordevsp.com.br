import { ReactElement } from 'react'
import { NotionBlockType } from '../../services/notion/types/notion.types'
import { MapComponent } from './MapComponent'

export function parseBlocksToComponents(blocks: NotionBlockType[]): ReactElement[] {
  const components = blocks.map(block => {
    try {
      const { type } = block

      const mapComponent = MapComponent[type]

      const component = mapComponent(block)

      return component
    } catch {
      return null
    }
  })

  const componentsFiltered = components.filter(component => !!component)

  return componentsFiltered as ReactElement[]
}
