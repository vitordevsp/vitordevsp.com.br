> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Block

> A block object represents a piece of content within Notion. The API translates the headings, toggles, paragraphs, lists, media, and more that you can interact with in the Notion UI as different [block type objects](/reference/block#block-type-objects).

For example, the following block object represents a `Heading 2` in the Notion UI:

<CodeGroup>
  ```json Example Block Object expandable theme={null}
  {
  	"object": "block",
  	"id": "c02fc1d3-db8b-45c5-a222-27595b15aea7",
  	"parent": {
  		"type": "page_id",
  		"page_id": "59833787-2cf9-4fdf-8782-e53db20768a5"
  	},
  	"created_time": "2022-03-01T19:05:00.000Z",
  	"last_edited_time": "2022-07-06T19:41:00.000Z",
  	"created_by": {
  		"object": "user",
  		"id": "ee5f0f84-409a-440f-983a-a5315961c6e4"
  	},
  	"last_edited_by": {
  		"object": "user",
  		"id": "ee5f0f84-409a-440f-983a-a5315961c6e4"
  	},
  	"has_children": false,
  	"in_trash": false,
  	"type": "heading_2",
  	"heading_2": {
  		"rich_text": [
  			{
  				"type": "text",
  				"text": {
  					"content": "Lacinato kale",
  					"link": null
  				},
  				"annotations": {
  					"bold": false,
  					"italic": false,
  					"strikethrough": false,
  					"underline": false,
  					"code": false,
  					"color": "green"
  				},
  				"plain_text": "Lacinato kale",
  				"href": null
  			}
  		],
  		"color": "default",
      "is_toggleable": false
  	}
  }
  ```
</CodeGroup>

Use the [Retrieve block children](/reference/get-block-children) endpoint to list all of the blocks on a page.

## Keys

<Note>
  Fields marked with an \* are available to integrations with any capabilities. Other properties require read content capabilities in order to be returned from the Notion API. Consult the [integration capabilities reference](/reference/capabilities) for details.
</Note>

| Field              | Type                                                                    | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | Example value                                                                                                  |
| :----------------- | :---------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------------- |
| `object`\*         | `string`                                                                | Always `"block"`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                      | `"block"`                                                                                                      |
| `id`\*             | `string` (UUIDv4)                                                       | Identifier for the block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | `"7af38973-3787-41b3-bd75-0ed3a1edfac9"`                                                                       |
| `parent`           | `object`                                                                | Information about the block's parent. See [Parent object](/reference/parent-object).                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `{ "type": "block_id", "block_id": "7d50a184-5bbe-4d90-8f29-6bec57ed817b" }`                                   |
| `type`             | `string` (enum)                                                         | Type of block. Possible values are: <br /><br />- [`"bookmark"`](/reference/block#bookmark) <br />- [`"breadcrumb"`](/reference/block#breadcrumb) <br />- [`"bulleted_list_item"`](/reference/block#bulleted-list-item) <br />- [`"callout"`](/reference/block#callout) <br />- [`"child_database"`](/reference/block#child-database) <br />- [`"child_page"`](/reference/block#child-page) <br />- [`"column"`](/reference/block#column-list-and-column) <br />- [`"column_list"`](/reference/block#column-list-and-column) <br />- [`"divider"`](/reference/block#divider) <br />- [`"embed"`](/reference/block#embed) <br />- [`"equation"`](/reference/block#equation) <br />- [`"file"`](/reference/block#file) <br />- [`"heading_1"`](/reference/block#headings) <br />- [`"heading_2"`](/reference/block#headings) <br />- [`"heading_3"`](/reference/block#headings) <br />- [`"heading_4"`](/reference/block#headings) <br />- [`"image"`](/reference/block#image) <br />- [`"link_preview"`](/reference/block#link-preview) <br />- [`"numbered_list_item"`](/reference/block#numbered-list-item) <br />- [`"paragraph"`](/reference/block#paragraph) <br />- [`"pdf"`](/reference/block#pdf) <br />- [`"quote"`](/reference/block#quote) <br />- [`"synced_block"`](/reference/block#synced-block) <br />- [`"table"`](/reference/block#table) <br />- [`"table_of_contents"`](/reference/block#table-of-contents) <br />- [`"table_row"`](/reference/block#table-rows) <br />- [`"template"`](/reference/block#template) <br />- [`"to_do"`](/reference/block#to-do) <br />- [`"toggle"`](/reference/block#toggle-blocks) <br />- [`"transcription"`](/reference/block#transcription) <br />- [`"unsupported"`](/reference/block#unsupported) <br />- [`"video"`](/reference/block#video) | `"paragraph"`                                                                                                  |
| `created_time`     | `string` ([ISO 8601 date time](https://en.wikipedia.org/wiki/ISO_8601)) | Date and time when this block was created. Formatted as an [ISO 8601 date time](https://en.wikipedia.org/wiki/ISO_8601) string.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `"2020-03-17T19:10:04.968Z"`                                                                                   |
| `created_by`       | [Partial User](/reference/user)                                         | User who created the block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `{"object": "user","id": "45ee8d13-687b-47ce-a5ca-6e2e45548c4b"}`                                              |
| `last_edited_time` | `string` ([ISO 8601 date time](https://en.wikipedia.org/wiki/ISO_8601)) | Date and time when this block was last updated. Formatted as an [ISO 8601 date time](https://en.wikipedia.org/wiki/ISO_8601) string.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `"2020-03-17T19:10:04.968Z"`                                                                                   |
| `last_edited_by`   | [Partial User](/reference/user)                                         | User who last edited the block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                        | `{"object": "user","id": "45ee8d13-687b-47ce-a5ca-6e2e45548c4b"}`                                              |
| `archived`         | `boolean`                                                               | **Deprecated.** Use `in_trash` instead. This is an alias for `in_trash` and always returns the same value.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `false`                                                                                                        |
| `in_trash`         | `boolean`                                                               | Whether the block has been trashed. Use this field to check if a block is in the trash, and as a body parameter in [Update a block](/reference/update-a-block) to trash or restore a block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `false`                                                                                                        |
| `has_children`     | `boolean`                                                               | Whether or not the block has children blocks nested within it.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `true`                                                                                                         |
| `{type}`           | [`block type object`](/reference/block#block-type-objects)              | An object containing type-specific block information.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Refer to the [block type object section](/reference/block#block-type-objects) for examples of each block type. |

#### Block types that support child blocks

Some block types contain nested blocks. The following block types support child blocks:

* [Bulleted list item](/reference/block#bulleted-list-item)
* [Callout](/reference/block#callout)
* [Child database](/reference/block#child-database)
* [Child page](/reference/block#child-page)
* [Column](/reference/block#column-list-and-column)
* [Heading 1](/reference/block#headings), when the `is_toggleable` property is `true`
* [Heading 2](/reference/block#headings), when the `is_toggleable` property is `true`
* [Heading 3](/reference/block#headings), when the `is_toggleable` property is `true`
* [Heading 4](/reference/block#headings), when the `is_toggleable` property is `true`
* [Meeting notes](/reference/block#meeting-notes) (renamed from [Transcription](/reference/block#transcription) in `2026-03-11`)
* [Numbered list item](/reference/block#numbered-list-item)
* [Paragraph](/reference/block#paragraph)
* [Quote](/reference/block#quote)
* [Synced block](/reference/block#synced-block)
* [Table](/reference/block#table)
* [Template](/reference/block#template)
* [To do](/reference/block#to-do)
* [Toggle](/reference/block#toggle-blocks)

<Note>
  **The API does not support all block types.**

  Only the block type objects listed in the reference below are supported. Any unsupported block types appear in the structure, but contain a `type` set to `"unsupported"`. The [`unsupported`](/reference/block#unsupported) object includes a `block_type` field that identifies the underlying block type (e.g., `"form"`, `"button"`).
</Note>

## Block type objects

Every block object has a key corresponding to the value of `type`. Under the key is an object with type-specific block information.

<Note>
  Many block types support rich text. In cases where it is supported, a [`rich_text` object](/reference/rich-text) will be included in the block `type` object. All `rich_text` objects will include a `plain_text` property, which provides a convenient way for developers to access unformatted text from the Notion block.
</Note>

### Audio

Audio block objects contain a [file object](/reference/file-object) detailing information about the audio file.

<CodeGroup>
  ```json Example Audio block object theme={null}
  {
    "type": "audio",
    //...other keys excluded
    "audio": {
      "type": "external",
      "external": {
        "url": "https://companywebsite.com/files/sample.mp3"
      }
    }
  }
  ```
</CodeGroup>

#### Supported audio types

The following file types can be attached with external URLs in the API as well as in the Notion app UI:

* `.mp3`
* `.wav`
* `.ogg`
* `.oga`
* `.m4a`

A wider set of audio files is [supported in the File Upload API](/guides/data-apis/working-with-files-and-media) and can be attached using a `file_upload` ID.

#### Supported file upload types

See the [file upload reference](/reference/file-upload#file-types-and-sizes) for a list of supported file extensions and content types when attaching a File Upload to a block.

Audio blocks only support file types in the "audio" section of the table.

### Bookmark

Bookmark block objects contain the following information within the `bookmark` property:

| Field     | Type                                                    | Description                   |
| :-------- | :------------------------------------------------------ | :---------------------------- |
| `caption` | array of [rich text objects](/reference/rich-text) text | The caption for the bookmark. |
| `url`     | string                                                  | The link for the bookmark.    |

<CodeGroup>
  ```json Example Bookmark block object theme={null}
  {
    //...other keys excluded
    "type": "bookmark",
    //...other keys excluded
    "bookmark": {
      "caption": [],
      "url": "https://companywebsite.com"
    }
  }
  ```
</CodeGroup>

### Breadcrumb

Breadcrumb block objects do not contain any information within the `breadcrumb` property.

<CodeGroup>
  ```json Example Breadcrumb block object theme={null}
  {
    //...other keys excluded
    "type": "breadcrumb",
    //...other keys excluded
    "breadcrumb": {}
  }
  ```
</CodeGroup>

### Bulleted list item

Bulleted list item block objects contain the following information within the `bulleted_list_item` property:

| Field       | Type                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------- | :--------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rich_text` | `array` of [rich text objects](/reference/rich-text) | The rich text in the `bulleted_list_item` block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                            |
| `color`     | `string` (enum)                                      | The color of the block. Possible values are: <br /><br />- `"blue"` <br />- `"blue_background"` <br />- `"brown"`<br /> - `"brown_background"` <br />- `"default"` <br />- `"gray"` <br />- `"gray_background"` <br />- `"green"` <br />- `"green_background"` <br />- `"orange"` <br />- `"orange_background"` <br />- `"yellow"` <br />- `"green"` <br />- `"pink"` <br />- `"pink_background"` <br />- `"purple"` <br />- `"purple_background"` <br />- `"red"` <br />- `"red_background"` <br />- `"yellow_background"` |
| `children`  | `array` of [block objects](/reference/block)         | The nested child blocks (if any) of the `bulleted_list_item` block.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

<CodeGroup>
  ```json Example Bulleted list item block object theme={null}
  {
    //...other keys excluded
    "type": "bulleted_list_item",
    //...other keys excluded
    "bulleted_list_item": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          "link": null
        }
        // ..other keys excluded
      }],
      "color": "default",
      "children":[{
        "type": "paragraph"
        // ..other keys excluded
      }]
    }
  }
  ```
</CodeGroup>

### Callout

Callout block objects contain the following information within the `callout` property:

| Field       | Type                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------- | :--------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rich_text` | `array` of [rich text objects](/reference/rich-text) | The rich text in the `callout` block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |
| `icon`      | `object`                                             | The callout's icon. Can be an [emoji](/reference/emoji-and-icon#emoji), [custom emoji](/reference/emoji-and-icon#custom-emoji), [native icon](/reference/emoji-and-icon#icon), or [file](/reference/file-object).                                                                                                                                                                                                                                                                                                           |
| `color`     | `string` (enum)                                      | The color of the block. Possible values are: <br /><br />- `"blue"` <br />- `"blue_background"` <br />- `"brown"`<br /> - `"brown_background"` <br />- `"default"` <br />- `"gray"` <br />- `"gray_background"` <br />- `"green"` <br />- `"green_background"` <br />- `"orange"` <br />- `"orange_background"` <br />- `"yellow"` <br />- `"green"` <br />- `"pink"` <br />- `"pink_background"` <br />- `"purple"` <br />- `"purple_background"` <br />- `"red"` <br />- `"red_background"` <br />- `"yellow_background"` |

<CodeGroup>
  ```json Example Callout block object expandable theme={null}
  {
    //...other keys excluded
  	"type": "callout",
     // ..other keys excluded
     "callout": {
     	"rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          "link": null
        }
        // ..other keys excluded
      }],
       "icon": {
         "emoji": "⭐"
       },
       "color": "default"
     }
  }
  ```
</CodeGroup>

### Child database

Child database block objects contain the following information within the `child_database` property:

| Field   | Type     | Description                           |
| :------ | :------- | :------------------------------------ |
| `title` | `string` | The plain text title of the database. |

<CodeGroup>
  ```json Example Child database block theme={null}
  {
    //...other keys excluded
    "type": "child_database",
    //...other keys excluded
    "child_database": {
      "title": "My database"
    }
  }
  ```
</CodeGroup>

<Note>
  **Creating and updating `child_database` blocks**

  To create or update `child_database` type blocks, use the [Create a database](/reference/create-a-database) and the [Update a database](/reference/update-a-database) endpoints, specifying the ID of the parent page in the `parent` body param.
</Note>

### Child page

Child page block objects contain the following information within the `child_page` property:

| Field   | Type     | Description                         |
| :------ | :------- | :---------------------------------- |
| `title` | `string` | The plain text `title` of the page. |

<CodeGroup>
  ```json Example Child page block object theme={null}
  {
    //...other keys excluded
    "type": "child_page",
    //...other keys excluded
    "child_page": {
      "title": "Lacinato kale"
    }
  }
  ```
</CodeGroup>

<Note>
  **Creating and updating `child_page` blocks**

  To create or update `child_page` type blocks, use the [Create a page](/reference/post-page) and the [Update page](/reference/patch-page) endpoints, specifying the ID of the parent page in the `parent` body param.
</Note>

### Code

Code block objects contain the following information within the `code` property:

| Field       | Type                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Description                                           |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------- |
| `caption`   | `array` of [Rich text object](/reference/rich-text) text objects                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | The rich text in the caption of the code block.       |
| `rich_text` | `array` of [Rich text object](/reference/rich-text) text objects                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                              | The rich text in the code block.                      |
| `language`  | - `"abap"` - `"arduino"` - `"bash"` - `"basic"` - `"c"` - `"clojure"` - `"coffeescript"` - `"c++"` - `"c#"` - `"css"` - `"dart"` - `"diff"` - `"docker"` - `"elixir"` - `"elm"` - `"erlang"` - `"flow"` - `"fortran"` - `"f#"` - `"gherkin"` - `"glsl"` - `"go"` - `"graphql"` - `"groovy"` - `"haskell"` - `"html"` - `"java"` - `"javascript"` - `"json"` - `"julia"` - `"kotlin"` - `"latex"` - `"less"` - `"lisp"` - `"livescript"` - `"lua"` - `"makefile"` - `"markdown"` - `"markup"` - `"matlab"` - `"mermaid"` - `"nix"` - `"objective-c"` - `"ocaml"` - `"pascal"` - `"perl"` - `"php"` - `"plain text"` - `"powershell"` - `"prolog"` - `"protobuf"` - `"python"` - `"r"` - `"reason"` - `"ruby"` - `"rust"` - `"sass"` - `"scala"` - `"scheme"` - `"scss"` - `"shell"` - `"sql"` - `"swift"` - `"typescript"` - `"vb.net"` - `"verilog"` - `"vhdl"` - `"visual basic"` - `"webassembly"` - `"xml"` - `"yaml"` - `"java/c/c++/c#"` | The language of the code contained in the code block. |

<CodeGroup>
  ```json Example Code block object theme={null}
  {
    // ... other keys excluded
    "type": "code",
    // ... other keys excluded
    "code": {
      "caption": [],
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "const a = 3"
        }
      }],
      "language": "javascript"
    }
  }
  ```
</CodeGroup>

### Column list and column

Column lists are parent blocks for columns. They do not contain any information within the `column_list` property.

<CodeGroup>
  ```json Example Column list block object theme={null}
  {
    // ... other keys excluded
    "type": "column_list",
    // ... other keys excluded
    "column_list": {}
  }
  ```
</CodeGroup>

Columns are parent blocks for any block types listed in this reference except for other `column`s. They do not require any information within the `column` property, but a `width_ratio` number between 0 and 1 can be provided to customize the width of a column relative to others in the same column list. When omitted, the default is to use equal widths for all columns. When provided, `width_ratio`s should add up to 1.

Columns can only be appended to `column_list`s.

<CodeGroup>
  ```json Example Column object theme={null}
  {
    // ... other keys excluded
    "type": "column",
    // ... other keys excluded
    "column": {
      "width_ratio": 0.25
    }
  }
  ```
</CodeGroup>

When creating a `column_list` block using [Append block children](/reference/patch-block-children), the `column_list` must have at least two `column`s, and each `column` must have at least one child.

#### Retrieve the content in a column list

Follow these steps to fetch the content in a `column_list`:

<Steps>
  <Step>
    Get the `column_list` ID from a query to [Retrieve block children](/reference/get-block-children) for the parent page.
  </Step>

  <Step>
    Get the `column` children from a query to Retrieve block children for the `column_list`.
  </Step>

  <Step>
    Get the content in each individual `column` from a query to Retrieve block children for the unique `column` ID.
  </Step>
</Steps>

### Divider

Divider block objects do not contain any information within the `divider` property.

<CodeGroup>
  ```json Example Divider block object theme={null}
  {
    //...other keys excluded
    "type": "divider",
    //...other keys excluded
    "divider": {}
  }
  ```
</CodeGroup>

### Embed

Embed block objects include information about another website displayed within the Notion UI. The `embed` property contains the following information:

| Field | Type     | Description                                            |
| :---- | :------- | :----------------------------------------------------- |
| `url` | `string` | The link to the website that the embed block displays. |

<CodeGroup>
  ```json Example Embed block object theme={null}
  {
    //...other keys excluded
    "type": "embed",
    //...other keys excluded
    "embed": {
      "url": "https://companywebsite.com"
    }
  }
  ```
</CodeGroup>

<Warning>
  **Differences in embed blocks between the Notion app and the API**

  The Notion app uses a 3rd-party service, iFramely, to validate and request metadata for embeds given a URL. This works well in a web app because Notion can kick off an asynchronous request for URL information, which might take seconds or longer to complete, and then update the block with the metadata in the UI after receiving a response from iFramely.

  We chose not to call iFramely when creating embed blocks in the API because the API needs to be able to return faster than the UI, and because the response from iFramely could actually cause us to change the block type. This would result in a slow and potentially confusing experience as the block in the response would not match the block sent in the request.

  The result is that embed blocks created using the API may not look exactly like their counterparts created in the Notion app.
</Warning>

<Check>
  Vimeo video links can be embedded in a Notion page using the API using the embed block type.

  For example, the following object can be passed to the [Append block children endpoint](/reference/patch-block-children):

  ```json JSON theme={null}
  {
    "children": [
      {
        "embed": {
          "url": "https://player.vimeo.com/video/226053498?h=a1599a8ee9"
        }
      }
    ]
  }
  ```

  For other video sources, see [Supported video types](/reference/block#supported-video-types).
</Check>

### Equation

Equation block objects are represented as children of [paragraph](/reference/block#paragraph) blocks. They are nested within a [rich text object](/reference/rich-text) and contain the following information within the `equation` property:

| Field        | Type     | Description                |
| :----------- | :------- | :------------------------- |
| `expression` | `string` | A KaTeX compatible string. |

<CodeGroup>
  ```json Example Equation object theme={null}
  {
    //...other keys excluded
    "type": "equation",
    //...other keys excluded
    "equation": {
      "expression": "e=mc^2"
    }
  }
  ```
</CodeGroup>

### File

File block objects contain the following information within the `file` property:

| Field         | Type                                                                        | Description                                                                                                                                                                                                                                                                                                                                                                                         |
| :------------ | :-------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `caption`     | `array` of [rich text objects](/reference/rich-text)                        | The caption of the file block.                                                                                                                                                                                                                                                                                                                                                                      |
| `type`        | One of: <br /><br />- `"file"` <br />- `"external"` <br />- `"file_upload"` | Type of file. This enum value indicates which of the following three objects are populated.                                                                                                                                                                                                                                                                                                         |
| `file`        | [Notion-hosted file object](/reference/file-object#notion-hosted-files)     | A file object that details information about the file contained in the block: a temporary download `url` and `expiry_time`. After the `expiry_time`, fetch the block again from the API to get a new `url`. <br /><br />Only valid as a parameter if copied verbatim from the `file` field of a recent block API response from Notion. To attach a file, provide a `type` of `file_upload` instead. |
| `external`    | [External file object](/reference/file-object#external-files)               | An object with a `url` property, identifying a publicly accessible URL.                                                                                                                                                                                                                                                                                                                             |
| `file_upload` | [File upload object](/reference/file-upload#file-types-and-sizes)           | An object with the `id` of a [FileUpload](/reference/file-upload) to attach to the block. After attaching, the API response responds with a type of `file`, not `file_upload`, so your integration can access a download `url`.                                                                                                                                                                     |
| `name`        | `string`                                                                    | The name of the file, as shown in the Notion UI. Note that the UI may auto-append `.pdf` or other extensions.<br /><br /> When attaching a `file_upload`, the `name` parameter is not required.                                                                                                                                                                                                     |

<CodeGroup>
  ```json Example File block theme={null}
  {
    // ... other keys excluded
    "type": "file",
    // ... other keys excluded
    "file": {
      "caption": [],
      "type": "external",
      "external": {
        "url": "https://companywebsite.com/files/doc.txt"
      },
      "name": "doc.txt"
    }
  }
  ```
</CodeGroup>

### Headings

All heading block objects, `heading_1`, `heading_2`, `heading_3`, and `heading_4`, contain the following information within their corresponding objects:

| Field           | Type                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :-------------- | :--------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rich_text`     | `array` of [rich text objects](/reference/rich-text) | The rich text of the heading.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `color`         | `string` (enum)                                      | The color of the block. Possible values are: <br /><br />- `"blue"` <br />- `"blue_background"` <br />- `"brown"` <br />- `"brown_background"` <br />- `"default"` <br />- `"gray"` <br />- `"gray_background"` <br />- `"green"` <br />- `"green_background"` <br />- `"orange"` <br />- `"orange_background"` <br />- `"yellow"` <br />- `"green"` <br />- `"pink"` <br />- `"pink_background"` <br />- `"purple"` <br />- `"purple_background"` <br />- `"red"` <br />- `"red_background"` <br />- `"yellow_background"` |
| `is_toggleable` | `boolean`                                            | Whether or not the heading block is a toggle heading or not. If `true`, then the heading block toggles and can support children. If `false`, then the heading block is a static heading block.                                                                                                                                                                                                                                                                                                                              |

<CodeGroup>
  ```json Example Heading 1 block object theme={null}
  {
    //...other keys excluded
    "type": "heading_1",
    //...other keys excluded
    "heading_1": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          "link": null
        }
      }],
      "color": "default",
      "is_toggleable": false
    }
  }
  ```
</CodeGroup>

<CodeGroup>
  ```json Example Heading 2 block object theme={null}
  {
    //...other keys excluded
    "type": "heading_2",
    //...other keys excluded
    "heading_2": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          "link": null
        }
      }],
      "color": "default",
      "is_toggleable": false
    }
  }
  ```
</CodeGroup>

<CodeGroup>
  ```json Example Heading 3 block object theme={null}
  {
    //...other keys excluded
    "type": "heading_3",
    //...other keys excluded
    "heading_3": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          "link": null
        }
      }],
      "color": "default",
      "is_toggleable": false
    }
  }
  ```
</CodeGroup>

<CodeGroup>
  ```json Example Heading 4 block object theme={null}
  {
    //...other keys excluded
    "type": "heading_4",
    //...other keys excluded
    "heading_4": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          "link": null
        }
      }],
      "color": "default",
      "is_toggleable": false
    }
  }
  ```
</CodeGroup>

### Image

Image block objects contain a [file object](/reference/file-object) detailing information about the image.

<CodeGroup>
  ```json Example Image block object theme={null}
  {
    // ... other keys excluded
    "type": "image",
    // ... other keys excluded
    "image": {
      "type": "external",
      "external": {
        "url": "https://website.domain/images/image.png"
      }
    }
  }
  ```
</CodeGroup>

#### Supported external image types

The image must be directly hosted. In other words, the `url` cannot point to a service that retrieves the image. The following image types are supported:

* `.bmp`
* `.gif`
* `.heic`
* `.jpeg`
* `.jpg`
* `.png`
* `.svg`
* `.tif`
* `.tiff`

#### Supported file upload types

See the [file upload reference](/reference/file-upload#file-types-and-sizes) for a list of supported file extensions and content types when attaching a File Upload to a block.

Image blocks only support file types in the "image" section of the table.

### Link Preview

[Link Preview](/guides/link-previews/introduction) block objects contain the originally pasted `url`:

<CodeGroup>
  ```json Example Link preview block object theme={null}
  {
    //...other keys excluded
    "type": "link_preview",
    //...other keys excluded
    "link_preview": {
      "url": "https://github.com/example/example-repo/pull/1234"
    }
  }
  ```
</CodeGroup>

<Warning>
  The `link_preview` block can only be returned as part of a response. The API does not support creating or appending `link_preview` blocks.
</Warning>

### Meeting notes

<Note>
  In API version `2026-03-11`, the `transcription` block type was renamed to `meeting_notes`. If you're using an older API version, see [`transcription`](/reference/block#transcription) below.
</Note>

Meeting notes block objects represent [AI meeting notes](https://www.notion.com/help/ai-meeting-notes) in the Notion UI. The block surfaces metadata about a meeting — its title, lifecycle status, calendar event details, and recording window — along with pointers to child blocks that hold the generated summary, notes, and transcript content.

<Note>
  Meeting notes blocks are **read-only**. You cannot create or update them using the API. Use the child block IDs returned in the `children` field to fetch the full content of each section using the [Retrieve a block](/reference/retrieve-a-block) or [Retrieve block children](/reference/get-block-children) endpoints.
</Note>

Meeting notes block objects contain the following information within the `meeting_notes` (or `transcription` in older API versions) property:

| Field            | Type                                                 | Description                                                                                                                                                                                       |
| :--------------- | :--------------------------------------------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ |
| `title`          | `array` of [rich text objects](/reference/rich-text) | The display name of the meeting notes session.                                                                                                                                                    |
| `status`         | `string` (enum)                                      | The lifecycle status of the transcription. Possible values are: `"transcription_not_started"`, `"transcription_paused"`, `"transcription_in_progress"`, `"summary_in_progress"`, `"notes_ready"`. |
| `children`       | `object`                                             | Pointers to the related content blocks. Contains `summary_block_id`, `notes_block_id`, and `transcript_block_id` (each an optional UUID string).                                                  |
| `calendar_event` | `object`                                             | Calendar metadata for the meeting. Contains `start_time` and `end_time` (ISO 8601 timestamps) and `attendees` (an optional array of user IDs).                                                    |
| `recording`      | `object`                                             | The recording time window. Contains `start_time` and `end_time` (ISO 8601 timestamps).                                                                                                            |

All top-level fields are optional and only present when the corresponding data is available.

<CodeGroup>
  ```json Example Meeting notes block object (2026-03-11) expandable theme={null}
  {
    "object": "block",
    "id": "d7b3c8f4-9e6e-4c1a-b5b8-2c0f4a0c5b8e",
    "type": "meeting_notes",
    //...other keys excluded
    "meeting_notes": {
      "title": [
        {
          "type": "text",
          "text": {
            "content": "Team Sync",
            "link": null
          },
          "plain_text": "Team Sync",
          "href": null
        }
      ],
      "status": "notes_ready",
      "children": {
        "summary_block_id": "a1b2c3d4-5678-9abc-def0-1234567890ab",
        "notes_block_id": "b2c3d4e5-6789-abcd-ef01-234567890abc",
        "transcript_block_id": "c3d4e5f6-789a-bcde-f012-34567890abcd"
      },
      "calendar_event": {
        "attendees": ["ee5f0f84-409a-440f-983a-a5315961c6e4"],
        "start_time": "2026-02-24T10:00:00.000Z",
        "end_time": "2026-02-24T10:45:00.000Z"
      },
      "recording": {
        "start_time": "2026-02-24T10:00:00.000Z",
        "end_time": "2026-02-24T10:45:00.000Z"
      }
    }
  }
  ```
</CodeGroup>

### Mention

A mention block object is a child of a [rich text object](/reference/rich-text) that is nested within a [paragraph block object](/reference/block#paragraph). This block type represents any `@` tag in the Notion UI, for a user, date, Notion page, Notion database, or a miniaturized version of a [Link Preview](/reference/unfurl-attribute-object).

A mention block object contains the following fields:

| Field                                                                                                    | Type                                                                                                     | Description                                                 |
| :------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------- |
| `type`                                                                                                   | `"database"`<br /><br /> `"date"`<br /><br /> `"link_preview"`<br /><br /> `"page"`<br /><br /> `"user"` | A constant string representing the type of the mention.     |
| `"database"`<br /><br /> `"date"`<br /><br /> `"link_preview"`<br /><br /> `"page"`<br /><br /> `"user"` | `object`                                                                                                 | An object with type-specific information about the mention. |

<CodeGroup>
  ```json Example Mention object theme={null}
  {
    //...other keys excluded
    "type": "page",
    "page": {
      "id": "3c612f56-fdd0-4a30-a4d6-bda7d7426309"
    }
  }
  ```
</CodeGroup>

### Numbered list item

Numbered list item block objects contain the following information within the `numbered_list_item` property:

| Field              | Type                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :----------------- | :--------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rich_text`        | `array` of [rich text objects](/reference/rich-text) | The rich text displayed in the `numbered_list_item` block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |
| `color`            | `string` (enum)                                      | The color of the block. Possible values are: <br /><br />- `"blue"` <br />- `"blue_background"` <br />- `"brown"` <br />- `"brown_background"` <br />- `"default"` <br />- `"gray"` <br />- `"gray_background"` <br />- `"green"` <br />- `"green_background"` <br />- `"orange"` <br />- `"orange_background"` <br />- `"yellow"` <br />- `"green"` <br />- `"pink"` <br />- `"pink_background"` <br />- `"purple"` <br />- `"purple_background"` <br />- `"red"` <br />- `"red_background"` <br />- `"yellow_background"` |
| `list_start_index` | `integer` (optional)                                 | The start index of a list, used to represent a list that doesn't start at 1. <br /> Only present on the first item of a list.                                                                                                                                                                                                                                                                                                                                                                                               |
| `list_format`      | `string` (enum) (optional)                           | The type of list format. Possible values are: `"numbers"`, `"letters"`, and `"roman"`. <br /> Only present on the first item of a list.                                                                                                                                                                                                                                                                                                                                                                                     |
| `children`         | `array` of [block objects](/reference/block)         | The nested child blocks (if any) of the `numbered_list_item` block.                                                                                                                                                                                                                                                                                                                                                                                                                                                         |

<CodeGroup>
  ```json Example Numbered list item block theme={null}
  {
    //...other keys excluded
    "type": "numbered_list_item",
    "numbered_list_item": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "Finish reading the docs",
            "link": null
          }
        }
      ],
      "color": "default"
    }
  }
  ```
</CodeGroup>

### Paragraph

Paragraph block objects contain the following information within the `paragraph` property:

| Field       | Type                                                                                                                                                                                          | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rich_text` | `array` of [rich text objects](/reference/rich-text)                                                                                                                                          | The rich text displayed in the paragraph block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                             |
| `color`     | `string` (enum)                                                                                                                                                                               | The color of the block. Possible values are: <br /><br />- `"blue"` <br />- `"blue_background"` <br />- `"brown"` <br />- `"brown_background"` <br />- `"default"` <br />- `"gray"` <br />- `"gray_background"` <br />- `"green"` <br />- `"green_background"` <br />- `"orange"` <br />- `"orange_background"` <br />- `"yellow"` <br />- `"green"` <br />- `"pink"` <br />- `"pink_background"` <br />- `"purple"` <br />- `"purple_background"` <br />- `"red"` <br />- `"red_background"` <br />- `"yellow_background"` |
| `icon`      | [emoji](/reference/emoji-and-icon#emoji), [custom emoji](/reference/emoji-and-icon#custom-emoji), [icon](/reference/emoji-and-icon#icon), or [file object](/reference/file-object) (nullable) | An optional icon for the paragraph. Can only be set when the paragraph is a direct child of a [tab](/reference/block#tab) block.                                                                                                                                                                                                                                                                                                                                                                                            |
| `children`  | `array` of [block objects](/reference/block)                                                                                                                                                  | The nested child blocks (if any) of the `paragraph` block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                  |

<CodeGroup>
  ```json Example Paragraph block object theme={null}
  {
    //...other keys excluded
    "type": "paragraph",
    //...other keys excluded
    "paragraph": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Lacinato kale",
          "link": null
        }
      }],
      "color": "default",
      "icon": null
  }
  ```
</CodeGroup>

<CodeGroup>
  ```json Example Paragraph block object with a child Mention block object expandable theme={null}
  {
  //...other keys excluded
  	"type": "paragraph",
    	"paragraph":{
    		"rich_text": [
      		{
        		"type": "mention",
        		"mention": {
          		"type": "date",
          		"date": {
            		"start": "2023-03-01",
            		"end": null,
            		"time_zone": null
          		}
        		},
        		"annotations": {
          		"bold": false,
          		"italic": false,
          		"strikethrough": false,
          		"underline": false,
          		"code": false,
          		"color": "default"
        		},
        		"plain_text": "2023-03-01",
        		"href": null
      		},
      		{
            "type": "text",
        		"text": {
          		"content": " ",
          		"link": null
        		},
        		"annotations": {
          		"bold": false,
          		"italic": false,
          		"strikethrough": false,
          		"underline": false,
          		"code": false,
          		"color": "default"
        		},
        		"plain_text": " ",
        		"href": null
      		}
    		],
    		"color": "default"
    	}
  }
  ```
</CodeGroup>

### PDF

A PDF block object represents a PDF that has been embedded within a Notion page. It contains the following fields:

| Property                            | Type                                                                        | Description                                                                                                                                                                                                                                                  |
| :---------------------------------- | :-------------------------------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `caption`                           | `array` of [rich text objects](/reference/rich-text)                        | A caption, if provided, for the PDF block.                                                                                                                                                                                                                   |
| `type`                              | One of: <br /><br />- `"file"` <br />- `"external"` <br />- `"file_upload"` | A constant string representing the type of PDF. `file` indicates a Notion-hosted file, and `external` represents a third-party link. `file_upload` is only valid when providing parameters to attach a [File Upload](/reference/file-upload) to a PDF block. |
| `external` \|`file` \|`file_upload` | [file object](/reference/file-object)                                       | An object containing type-specific information about the PDF.                                                                                                                                                                                                |

<CodeGroup>
  ```json JSON theme={null}
  {
    //...other keys excluded
    "type": "pdf",
    //...other keys excluded
    "pdf": {
      "type": "external",
      "external": {
        "url": "https://website.domain/files/doc.pdf"
      }
    }
  }
  ```
</CodeGroup>

#### Supported file upload types

See the [file upload reference](/reference/file-upload#file-types-and-sizes) for a list of supported file extensions and content types when attaching a File Upload to a block.

PDF blocks only support a type of `.pdf`.

### Quote

Quote block objects contain the following information within the `quote` property:

| Field       | Type                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------- | :--------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rich_text` | `array` of [rich text objects](/reference/rich-text) | The rich text displayed in the quote block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `color`     | `string` (enum)                                      | The color of the block. Possible values are: <br /><br />- `"blue"` <br />- `"blue_background"` <br />- `"brown"` <br />- `"brown_background"` <br />- `"default"` <br />- `"gray"` <br />- `"gray_background"` <br />- `"green"` <br />- `"green_background"` <br />- `"orange"` <br />- `"orange_background"` <br />- `"yellow"` <br />- `"green"` <br />- `"pink"` <br />- `"pink_background"` <br />- `"purple"` <br />- `"purple_background"` <br />- `"red"` <br />- `"red_background"` <br />- `"yellow_background"` |
| `children`  | `array` of [block objects](/reference/block)         | The nested child blocks, if any, of the quote block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

<CodeGroup>
  ```json Example Quote block theme={null}
  {
  	//...other keys excluded
  	"type": "quote",
     //...other keys excluded
     "quote": {
     	"rich_text": [{
        "type": "text",
        "text": {
          "content": "To be or not to be...",
          "link": null
        },
      	//...other keys excluded
      }],
      //...other keys excluded
      "color": "default"
     }
  }
  ```
</CodeGroup>

### Synced block

Similar to the Notion UI, there are two versions of a `synced_block` object: the original block that was created first and doesn't yet sync with anything else, and the duplicate block or blocks synced to the original.

<Note>
  An original synced block must be created before corresponding duplicate block or blocks can be made.
</Note>

#### Original synced block

Original synced block objects contain the following information within the `synced_block` property:

| Field         | Type                                         | Description                                                                                                                  |
| :------------ | :------------------------------------------- | :--------------------------------------------------------------------------------------------------------------------------- |
| `synced_from` | `null`                                       | The value is always `null` to signify that this is an original synced block that does not refer to another block.            |
| `children`    | `array` of [block objects](/reference/block) | The nested child blocks, if any, of the `synced_block` block. These blocks will be mirrored in the duplicate `synced_block`. |

<CodeGroup>
  ```json Example Original synced block theme={null}
  {
      //...other keys excluded
    	"type": "synced_block",
      "synced_block": {
          "synced_from": null,
          "children": [
              {
                  "callout": {
                      "rich_text": [
                          {
                              "type": "text",
                              "text": {
                                  "content": "Callout in synced block"
                              }
                          }
                      ]
                  }
              }
          ]
      }
  }
  ```
</CodeGroup>

#### Duplicate synced block

Duplicate synced block objects contain the following information within the `synced_from` object:

| Field      | Type              | Description                                                                                     |
| :--------- | :---------------- | :---------------------------------------------------------------------------------------------- |
| `type`     | `string` (enum)   | The type of the synced from object.<br /><br /> Possible values are: <br /><br />- `"block_id"` |
| `block_id` | `string` (UUIDv4) | An identifier for the original `synced_block`.                                                  |

<CodeGroup>
  ```json Example Duplicate synced block object theme={null}
  {
      //...other keys excluded
    	"type": "synced_block",
      "synced_block": {
          "synced_from": {
              "block_id": "original_synced_block_id"
          }
      }
  }
  ```
</CodeGroup>

<Warning>
  The API does not supported updating synced block content.
</Warning>

### Table

Table block objects are parent blocks for table row children. Table block objects contain the following fields within the `table` property:

| Field               | Type      | Description                                                                                                                         |
| :------------------ | :-------- | :---------------------------------------------------------------------------------------------------------------------------------- |
| `table_width`       | `integer` | The number of columns in the table. <br /><br />**Note that this cannot be changed using the API once a table is created.**         |
| `has_column_header` | `boolean` | Whether the table has a column header. If `true`, then the first row in the table appears visually distinct from the other rows.    |
| `has_row_header`    | `boolean` | Whether the table has a header row. If `true`, then the first column in the table appears visually distinct from the other columns. |

<CodeGroup>
  ```json Example Table block object theme={null}
  {
    //...other keys excluded
    "type": "table",
    "table": {
      "table_width": 2,
      "has_column_header": false,
      "has_row_header": false
    }
  }
  ```
</CodeGroup>

<Warning>
  **`table_width` can only be set when the table is first created.**

  Note that the number of columns in a table can only be set when the table is first created. Calls to the Update block endpoint to update `table_width` fail.
</Warning>

#### Table rows

Follow these steps to fetch the `table_row`s of a `table`:

<Steps>
  <Step>
    Get the `table` ID from a query to [Retrieve block children](/reference/get-block-children) for the parent page.
  </Step>

  <Step>
    Get the `table_rows` from a query to Retrieve block children for the `table`.
  </Step>
</Steps>

A `table_row` block object contains the following fields within the `table_row` property:

| Property | Type                                                          | Description                                                                                        |
| :------- | :------------------------------------------------------------ | :------------------------------------------------------------------------------------------------- |
| `cells`  | `array` of array of [rich text objects](/reference/rich-text) | An array of cell contents in horizontal display order. Each cell is an array of rich text objects. |

<CodeGroup>
  ```json Example Table row block object expandable theme={null}
  {
    //...other keys excluded
    "type": "table_row",
    "table_row": {
      "cells": [
        [
          {
            "type": "text",
            "text": {
              "content": "column 1 content",
              "link": null
            },
            "annotations": {
              "bold": false,
              "italic": false,
              "strikethrough": false,
              "underline": false,
              "code": false,
              "color": "default"
            },
            "plain_text": "column 1 content",
            "href": null
          }
        ],
        [
          {
            "type": "text",
            "text": {
              "content": "column 2 content",
              "link": null
            },
            "annotations": {
              "bold": false,
              "italic": false,
              "strikethrough": false,
              "underline": false,
              "code": false,
              "color": "default"
            },
            "plain_text": "column 2 content",
            "href": null
          }
        ],
        [
          {
            "type": "text",
            "text": {
              "content": "column 3 content",
              "link": null
            },
            "annotations": {
              "bold": false,
              "italic": false,
              "strikethrough": false,
              "underline": false,
              "code": false,
              "color": "default"
            },
            "plain_text": "column 3 content",
            "href": null
          }
        ]
      ]
    }
  }
  ```
</CodeGroup>

<Note>
  When creating a table block using the [Append block children](/reference/patch-block-children) endpoint, the `table` must have at least one `table_row` whose `cells` array has the same length as the `table_width`.
</Note>

### Table of contents

Table of contents block objects contain the following information within the `table_of_contents` property:

| Property | Type            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :------- | :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `color`  | `string` (enum) | The color of the block. Possible values are: <br /><br />- `"blue"` <br />- `"blue_background"` <br />- `"brown"` <br />- `"brown_background"` <br />- `"default"` <br />- `"gray"` <br />- `"gray_background"` <br />- `"green"` <br />- `"green_background"` <br />- `"orange"` <br />- `"orange_background"` <br />- `"yellow"` <br />- `"green"` <br />- `"pink"` <br />- `"pink_background"` <br />- `"purple"` <br />- `"purple_background"` <br />- `"red"` <br />- `"red_background"` <br />- `"yellow_background"` |

<CodeGroup>
  ```json Example Table of contents block object theme={null}
  {
    //...other keys excluded
  	"type": "table_of_contents",
    "table_of_contents": {
    	"color": "default"
    }
  }
  ```
</CodeGroup>

### Tab

Tab block objects represent a tabbed container. The `tab` property is an empty object (`{}`). Each tab within the container is a [paragraph](/reference/block#paragraph) child block — the paragraph's `rich_text` serves as the tab label, the paragraph's `icon` sets the tab icon, and the paragraph's `children` contain the tab's content.

Only `paragraph` blocks can be direct children of a tab block. When creating tabs via [Append block children](/reference/patch-block-children), provide a `tab` block with paragraph children, each containing their own nested content blocks. Each paragraph child can optionally include an `icon` to display alongside the tab label.

| Field     | Type     | Description                                                                                      |
| :-------- | :------- | :----------------------------------------------------------------------------------------------- |
| *(empty)* | `object` | The `tab` property is an empty object. Tab metadata is expressed through its paragraph children. |

<CodeGroup>
  ```json Example Tab block object theme={null}
  {
    "object": "block",
    "type": "tab",
    "has_children": true,
    //...other keys excluded
    "tab": {}
  }
  ```

  ```json Creating a tab block with icons theme={null}
  {
    "type": "tab",
    "tab": {
      "children": [
        {
          "type": "paragraph",
          "paragraph": {
            "rich_text": [{ "type": "text", "text": { "content": "Overview" } }],
            "icon": { "emoji": "📋" },
            "children": [
              {
                "type": "paragraph",
                "paragraph": {
                  "rich_text": [{ "type": "text", "text": { "content": "Tab 1 content" } }]
                }
              }
            ]
          }
        },
        {
          "type": "paragraph",
          "paragraph": {
            "rich_text": [{ "type": "text", "text": { "content": "Details" } }],
            "icon": { "emoji": "🔍" },
            "children": [
              {
                "type": "paragraph",
                "paragraph": {
                  "rich_text": [{ "type": "text", "text": { "content": "Tab 2 content" } }]
                }
              }
            ]
          }
        }
      ]
    }
  }
  ```
</CodeGroup>

### Template

<Danger>
  **Deprecation Notice**

  As of March 27, 2023 creation of template blocks will no longer be supported.
</Danger>

Template blocks represent [template buttons](https://www.notion.so/help/template-buttons) in the Notion UI.

Template block objects contain the following information within the `template` property:

| Field       | Type                                                 | Description                                                                                                                    |
| :---------- | :--------------------------------------------------- | :----------------------------------------------------------------------------------------------------------------------------- |
| `rich_text` | `array` of [rich text objects](/reference/rich-text) | The rich text displayed in the title of the template.                                                                          |
| `children`  | `array` of [block objects](/reference/block)         | The nested child blocks, if any, of the template block. These blocks are duplicated when the template block is used in the UI. |

<CodeGroup>
  ```json Example Template block object theme={null}
  {
    //...other keys excluded
    "template": {
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "Add a new to-do",
            "link": null
          },
          "annotations": {
            //...other keys excluded
          },
          "plain_text": "Add a new to-do",
          "href": null
        }
      ]
    }
  }
  ```
</CodeGroup>

### To do

To do block objects contain the following information within the `to_do` property:

| Field       | Type                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------- | :--------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rich_text` | `array` of [rich text objects](/reference/rich-text) | The rich text displayed in the To do block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| `checked`   | `boolean` (optional)                                 | Whether the To do is checked.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| `color`     | `string` (enum)                                      | The color of the block. Possible values are: <br /><br />- `"blue"` <br />- `"blue_background"` <br />- `"brown"` <br />- `"brown_background"` <br />- `"default"` <br />- `"gray"` <br />- `"gray_background"` <br />- `"green"` <br />- `"green_background"` <br />- `"orange"` <br />- `"orange_background"` <br />- `"yellow"` <br />- `"green"` <br />- `"pink"` <br />- `"pink_background"` <br />- `"purple"` <br />- `"purple_background"` <br />- `"red"` <br />- `"red_background"` <br />- `"yellow_background"` |
| `children`  | `array` of [block objects](/reference/block)         | The nested child blocks, if any, of the To do block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                        |

<CodeGroup>
  ```json Example To do block object theme={null}
  {
    //...other keys excluded
    "type": "to_do",
    "to_do": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Finish Q3 goals",
          "link": null
        }
      }],
      "checked": false,
      "color": "default",
      "children":[{
        "type": "paragraph"
        // ..other keys excluded
      }]
    }
  }
  ```
</CodeGroup>

### Toggle blocks

Toggle block objects contain the following information within the `toggle` property:

| Field       | Type                                                 | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 |
| :---------- | :--------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `rich_text` | `array` of [rich text objects](/reference/rich-text) | The rich text displayed in the Toggle block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                |
| `color`     | `string` (enum)                                      | The color of the block. Possible values are: <br /><br />- `"blue"` <br />- `"blue_background"` <br />- `"brown"` <br />- `"brown_background"` <br />- `"default"` <br />- `"gray"` <br />- `"gray_background"` <br />- `"green"` <br />- `"green_background"` <br />- `"orange"` <br />- `"orange_background"` <br />- `"yellow"` <br />- `"green"` <br />- `"pink"` <br />- `"pink_background"` <br />- `"purple"` <br />- `"purple_background"` <br />- `"red"` <br />- `"red_background"` <br />- `"yellow_background"` |
| `children`  | `array` of [block objects](/reference/block)         | The nested child blocks, if any, of the Toggle block.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       |

<CodeGroup>
  ```json Toggle Block theme={null}
  {
    //...other keys excluded
    "type": "toggle",
    "toggle": {
      "rich_text": [{
        "type": "text",
        "text": {
          "content": "Additional project details",
          "link": null
        }
        //...other keys excluded
      }],
      "color": "default",
      "children":[{
        "type": "paragraph"
        // ..other keys excluded
      }]
    }
  }
  ```
</CodeGroup>

### Transcription

<Warning>
  **Deprecated in `2026-03-11`** — This block type has been renamed to [`meeting_notes`](/reference/block#meeting-notes). The `transcription` type name is still returned for API versions prior to `2026-03-11`.
</Warning>

The `transcription` block type is identical to [`meeting_notes`](/reference/block#meeting-notes) except for the type name. In responses, `type` is `"transcription"` and the content object key is `transcription` instead of `meeting_notes`. All fields are the same — see the [meeting notes reference](/reference/block#meeting-notes) for details.

### Unsupported

When a block type is not yet supported by the API, the response includes `type` set to `"unsupported"` and an `unsupported` object with a `block_type` field. The `block_type` value is a plain string identifying the underlying internal block type (e.g., `"form"`, `"button"`, `"drive"`). This field is informational only and does not expose block content.

| Field        | Type     | Description                                                                                                                     |
| :----------- | :------- | :------------------------------------------------------------------------------------------------------------------------------ |
| `block_type` | `string` | The underlying block type that is not currently supported by the Notion API. Example values include: `form`, `button`, `drive`. |

<CodeGroup>
  ```json Example Unsupported block object theme={null}
  {
    "object": "block",
    "id": "7af38973-3787-41b3-bd75-0ed3a1edfac9",
    "type": "unsupported",
    //...other keys excluded
    "unsupported": {
      "block_type": "form"
    }
  }
  ```
</CodeGroup>

<Note>
  The `block_type` value is a plain string, not an enum. New values may appear as Notion adds new block types. Do not rely on a fixed set of values.
</Note>

### Video

Video block objects contain a [file object](/reference/file-object) detailing information about the video.

<CodeGroup>
  ```json Example Video block object theme={null}
  {
    "type": "video",
    //...other keys excluded
    "video": {
      "type": "external",
      "external": {
        "url": "https://companywebsite.com/files/video.mp4"
      }
    }
  }
  ```
</CodeGroup>

#### Supported video types

* `.amv`
* `.asf`
* `.avi`
* `.f4v`
* `.flv`
* `.gifv`
* `.mkv`
* `.mov`
* `.mpg`
* `.mpeg`
* `.mpv`
* `.mp4`
* `.m4v`
* `.qt`
* `.wmv`
* YouTube video links that include `embed` or `watch`. E.g. `https://www.youtube.com/watch?v=[id]`, `https://www.youtube.com/embed/[id]`

<Note>
  Vimeo video links are not currently supported by the video block type. However, they can be embedded in Notion pages using the `embed` block type. See [Embed](/reference/block#embed) for more information.
</Note>

#### Supported file upload types

See the [file upload reference](/reference/file-upload#file-types-and-sizes) for a list of supported file extensions and content types when attaching a File Upload to a block.

Video blocks only support file types in the "video" section of the table.
