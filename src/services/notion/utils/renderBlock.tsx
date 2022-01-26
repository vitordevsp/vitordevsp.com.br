export function renderBlock(block: any) {
  const { type, id } = block
  const value = block[type]

  switch (type) {
    case 'paragraph':
      return (
        <p>
          {value.text}
        </p>
      )
    case 'heading_1':
      return (
        <h1>
          {value.text}
        </h1>
      )
    case 'heading_2':
      return (
        <h2>
          {value.text}
        </h2>
      )
    case 'heading_3':
      return (
        <h3>
          {value.text}
        </h3>
      )
    case 'bulleted_list_item':
    case 'numbered_list_item':
      return (
        <li>
          {value.text}
        </li>
      )
    case 'to_do':
      return (
        <div>
          <label htmlFor={id}>
            <input type="checkbox" id={id} defaultChecked={value.checked} />{' '}
            {value.text}
          </label>
        </div>
      )
    case 'toggle':
      return (
        <details>
          <summary>
            {value.text}
          </summary>
          {/* {value.children?.map((block) => (
            <Fragment key={block.id}>{renderBlock(block)}</Fragment>
          ))} */}
        </details>
      )
    case 'child_page':
      return <p>{value.title}</p>
    case 'image': {
      const src = value.type === 'external' ? value.external.url : value.file.url
      const caption = value.caption ? value.caption[0].plain_text : ''

      return (
        <figure>
          <img src={src} alt={caption} />
          {caption && <figcaption>{caption}</figcaption>}
        </figure>
      )
    }

    case 'divider':
      return <hr key={id} />
    case 'quote':
      return <blockquote key={id}>{value.text[0].plain_text}</blockquote>
    default:
      return `❌ Unsupported block (${type === 'unsupported' ? 'unsupported by Notion API' : type})`
  }
}
