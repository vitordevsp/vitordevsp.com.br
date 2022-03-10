import { ReactElement } from 'react'
import { NotionBlockType } from '../../pages/api/notion/_resources/notionRepository/types/notion.types'
import { MapComponent, unifyComponents } from './MapComponent'

export function parseBlocksToComponents(blocks: NotionBlockType[]): ReactElement[] {
  const components = blocks.map(block => {
    try {
      const { type, children } = block

      const component = MapComponent[type](block)

      if (children) {
        const components = children
          .map(childrenBlock => {
            try {
              const { type } = childrenBlock

              const component = MapComponent[type](childrenBlock)

              return component
            } catch {
              return null
            }
          })
          .filter(component => !!component)

        return unifyComponents(component, components)
      }

      return component
    } catch {
      return null
    }
  })

  const componentsFiltered = components.filter(component => !!component)

  return componentsFiltered as ReactElement[]
}
