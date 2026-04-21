> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Rich text

> Notion uses rich text to allow users to customize their content. Rich text refers to a type of document where content can be styled and formatted in a variety of customizable ways. This includes styling decisions, such as the use of italics, font size, and font color, as well as formatting, such as the use of hyperlinks or code blocks.

Notion includes rich text objects in [block objects](/reference/block) to indicate how blocks in a page are represented. [Blocks](/reference/block) that support rich text will include a rich text object; however, not all block types offer rich text.

When blocks are retrieved from a page using the [Retrieve a block](/reference/retrieve-a-block) or [Retrieve block children](/reference/get-block-children) endpoints, an array of rich text objects will be included in the block object (when available). Developers can use this array to retrieve the plain text (`plain_text`) for the block or get all the rich text styling and formatting options applied to the block.

<CodeGroup>
  ```json An example rich text object theme={null}
  {
    "type": "text",
    "text": {
      "content": "Some words ",
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
    "plain_text": "Some words ",
    "href": null
  }
  ```
</CodeGroup>

<Note>
  Many [block types](/reference/block#block-type-objects) support rich text. In cases where it is supported, a `rich_text` object will be included in the block `type` object. All `rich_text` objects will include a `plain_text` property, which provides a convenient way for developers to access unformatted text from the Notion block.
</Note>

Each rich text object contains the following fields.

| Field                             | Type                | Description                                                                                                                                           | Example value                                                      |
| :-------------------------------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------------------------------------------------------- |
| `type`                            | `string` (enum)     | The type of this rich text object. Possible type values are: `"text"`, `"mention"`, `"equation"`.                                                     | `"text"`                                                           |
| `text` \| `mention` \| `equation` | `object`            | An object containing type-specific configuration.  <br /><br />Refer to the rich text type objects section below for details on type-specific values. | Refer to the rich text type objects section below for examples.    |
| `annotations`                     | `object`            | The information used to style the rich text object. Refer to the annotation object section below for details.                                         | Refer to the annotation object section below for examples.         |
| `plain_text`                      | `string`            | The plain text without annotations.                                                                                                                   | `"Some words "`                                                    |
| `href`                            | `string` (optional) | The URL of any link or Notion mention in this text, if any.                                                                                           | `"https://www.notion.so/Avocado-d093f1d200464ce78b36e58a3f0d8043"` |

## The annotation object

All rich text objects contain an `annotations` object that sets the styling for the rich text. `annotations` includes the following fields:

| Property        | Type            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | Example value |
| :-------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | :------------ |
| `bold`          | `boolean`       | Whether the text is **bolded**.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `true`        |
| `italic`        | `boolean`       | Whether the text is *italicized*.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `true`        |
| `strikethrough` | `boolean`       | Whether the text is struck through.                                                                                                                                                                                                                                                                                                                                                                                                                                                                     | `false`       |
| `underline`     | `boolean`       | Whether the text is underlined.                                                                                                                                                                                                                                                                                                                                                                                                                                                                         | `false`       |
| `code`          | `boolean`       | Whether the text is `code style`.                                                                                                                                                                                                                                                                                                                                                                                                                                                                       | `true`        |
| `color`         | `string` (enum) | Color of the text. Possible values include: <br /><br />- `"blue"` <br />- `"blue_background"` <br />- `"brown"` <br />- `"brown_background"` <br />- `"default"` <br />- `"gray"` <br />- `"gray_background"` <br />- `"green"` <br />- `"green_background"` <br />- `"orange"` <br />-`"orange_background"` <br />- `"pink"` <br />- `"pink_background"` <br />- `"purple"` <br />- `"purple_background"` <br />- `"red"` <br />- `"red_background”` <br />- `"yellow"` <br />- `"yellow_background"` | `"green"`     |

## Rich text type objects

### Equation

Notion supports inline LaTeX equations as rich text object’s with a type value of `"equation"`. The corresponding equation type object contains the following:

| Field        | Type     | Description                                        | Example value                                  |
| ------------ | -------- | -------------------------------------------------- | ---------------------------------------------- |
| `expression` | `string` | The LaTeX string representing the inline equation. | `"\frac{{ - b \pm \sqrt {b^2 - 4ac} }}{{2a}}"` |

#### Example rich text `equation` object

<CodeGroup>
  ```json JSON theme={null}
  {
    "type": "equation",
    "equation": {
      "expression": "E = mc^2"
    },
    "annotations": {
      "bold": false,
      "italic": false,
      "strikethrough": false,
      "underline": false,
      "code": false,
      "color": "default"
    },
    "plain_text": "E = mc^2",
    "href": null
  }
  ```
</CodeGroup>

### Mention

Mention objects represent an inline mention of a database, date, link preview mention, page, template mention, or user. A mention is created in the Notion UI when a user types `@` followed by the name of the reference.

If a rich text object’s `type` value is `"mention"`, then the corresponding `mention` object contains the following:

| Field                                                                            | Type            | Description                                                                                                                                                                                  | Example value                                                       |
| :------------------------------------------------------------------------------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------------------------------ |
| `type`                                                                           | `string` (enum) | The type of the inline mention. Possible values include: <br /><br />- `"database"` <br />- `"date"` <br />- `"link_preview"` <br />- `"page"` <br />- `"template_mention"` <br />- `"user"` | `"user"`                                                            |
| `database` \| `date` \| `link_preview` \| `page` \| `template_mention` \| `user` | `object`        | An object containing type-specific configuration. Refer to the mention type object sections below for details.                                                                               | Refer to the mention type object sections below for example values. |

#### Database mention type object

Database mentions contain a database reference within the corresponding `database` field. A database reference is an object with an `id` key and a string value (UUIDv4) corresponding to a database ID.

If an integration doesn’t have [access](/reference/capabilities) to the mentioned database, then the mention is returned with just the ID. The `plain_text` value that would be a title appears as `"Untitled"` and the annotation object’s values are defaults.

*Example rich text `mention` object for a `database` mention*

<CodeGroup>
  ```json JSON theme={null}
  {
    "type": "mention",
    "mention": {
      "type": "database",
      "database": {
        "id": "a1d8501e-1ac1-43e9-a6bd-ea9fe6c8822b"
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
    "plain_text": "Database with test things",
    "href": "https://www.notion.so/a1d8501e1ac143e9a6bdea9fe6c8822b"
  }
  ```
</CodeGroup>

#### Date mention type object

Date mentions contain a [date property value object](/reference/page-property-values#date) within the corresponding `date` field.

*Example rich text `mention` object for a `date` mention*

<CodeGroup>
  ```json JSON theme={null}
  {
    "type": "mention",
    "mention": {
      "type": "date",
      "date": {
        "start": "2022-12-16",
        "end": null
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
    "plain_text": "2022-12-16",
    "href": null
  }
  ```
</CodeGroup>

#### Link Preview mention type object

If a user opts to share a [Link Preview](/guides/link-previews/introduction) as a mention, then the API handles the Link Preview mention as a rich text object with a `type` value of `link_preview`. Link preview rich text mentions contain a corresponding `link_preview` object that includes the `url` that is used to create the Link Preview mention.

*Example rich text `mention` object for a `link_preview` mention*

<CodeGroup>
  ```json JSON theme={null}
  {
    "type": "mention",
    "mention": {
      "type": "link_preview",
      "link_preview": {
        "url": "https://workspace.slack.com/archives/C04PF0F9QSD/z1671139297838409?thread_ts=1671139274.065079&cid=C03PF0F9QSD"
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
    "plain_text": "https://workspace.slack.com/archives/C04PF0F9QSD/z1671139297838409?thread_ts=1671139274.065079&cid=C03PF0F9QSD",
    "href": "https://workspace.slack.com/archives/C04PF0F9QSD/z1671139297838409?thread_ts=1671139274.065079&cid=C03PF0F9QSD"
  }
  ```
</CodeGroup>

#### Page mention type object

Page mentions contain a page reference within the corresponding `page` field. A page reference is an object with an `id` property and a string value (UUIDv4) corresponding to a page ID.

If an integration doesn’t have [access](/reference/capabilities) to the mentioned page, then the mention is returned with just the ID. The `plain_text` value that would be a title appears as `"Untitled"` and the annotation object’s values are defaults.

*Example rich text `mention` object for a `page` mention*

<CodeGroup>
  ```json JSON theme={null}
  {
    "type": "mention",
    "mention": {
      "type": "page",
      "page": {
        "id": "3c612f56-fdd0-4a30-a4d6-bda7d7426309"
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
    "plain_text": "This is a test page",
    "href": "https://www.notion.so/3c612f56fdd04a30a4d6bda7d7426309"
  }
  ```
</CodeGroup>

#### Template mention type object

The content inside a [template button](https://www.notion.so/help/template-buttons) in the Notion UI can include placeholder date and user mentions that populate when a template is duplicated. Template mention type objects contain these populated values.

Template mention rich text objects contain a `template_mention` object with a nested `type` key that is either `"template_mention_date"` or `"template_mention_user"`.

If the `type` key is `"template_mention_date"`, then the rich text object contains the following `template_mention_date` field:

| Field                   | Type            | Description                                                                   | Example value |
| :---------------------- | :-------------- | :---------------------------------------------------------------------------- | :------------ |
| `template_mention_date` | `string` (enum) | The type of the date mention. Possible values include: `"today"` and `"now"`. | `"today"`     |

*Example rich text `mention` object for a `template_mention_date` mention*

<CodeGroup>
  ```json JSON theme={null}
  {
    "type": "mention",
    "mention": {
      "type": "template_mention",
      "template_mention": {
        "type": "template_mention_date",
        "template_mention_date": "today"
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
    "plain_text": "@Today",
    "href": null
  }
  ```
</CodeGroup>

If the type key is `"template_mention_user"`, then the rich text object contains the following `template_mention_user` field:

| Field                   | Type            | Description                                                      | Example value |
| :---------------------- | :-------------- | :--------------------------------------------------------------- | :------------ |
| `template_mention_user` | `string` (enum) | The type of the user mention. The only possible value is `"me"`. | `"me"`        |

*Example rich text `mention` object for a `template_mention_user` mention*

<CodeGroup>
  ```json JSON theme={null}
  {
    "type": "mention",
    "mention": {
      "type": "template_mention",
      "template_mention": {
        "type": "template_mention_user",
        "template_mention_user": "me"
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
    "plain_text": "@Me",
    "href": null
  }
  ```
</CodeGroup>

#### User mention type object

If a rich text object’s `type` value is `"user"`, then the corresponding user field contains a [user object](/reference/user).

<Note>
  If your integration doesn’t yet have access to the mentioned user, then the `plain_text` that would include a user’s name reads as `"@Anonymous"`. To update the integration to get access to the user, update the integration capabilities on the integration settings page.
</Note>

*Example rich text `mention` object for a `user` mention*

<CodeGroup>
  ```json JSON theme={null}
  {
    "type": "mention",
    "mention": {
      "type": "user",
      "user": {
        "object": "user",
        "id": "b2e19928-b427-4aad-9a9d-fde65479b1d9"
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
    "plain_text": "@Anonymous",
    "href": null
  }
  ```
</CodeGroup>

### Text

If a rich text object’s `type` value is `"text"`, then the corresponding `text` field contains an object including the following:

| Field     | Type                | Description                                                                                                                                                                                                                                                                               | Example value                                 |
| :-------- | :------------------ | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------------- |
| `content` | `string`            | The actual text content of the text.                                                                                                                                                                                                                                                      | `"Some words "`                               |
| `link`    | `object` (optional) | An object with information about any inline link in this text, if included. <br /><br />If the text contains an inline link, then the object key is `url` and the value is the URL’s string web address. <br /><br />If the text doesn’t have any inline links, then the value is `null`. | `{ "url": "https://developers.notion.com/" }` |

#### Example rich text `text` object without link

<CodeGroup>
  ```json JSON theme={null}
  {
    "type": "text",
    "text": {
      "content": "This is an ",
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
    "plain_text": "This is an ",
    "href": null
  }
  ```
</CodeGroup>

#### Example rich `text` text object with link

<CodeGroup>
  ```json JSON theme={null}
  {
    "type": "text",
    "text": {
      "content": "inline link",
      "link": {
        "url": "https://developers.notion.com/"
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
    "plain_text": "inline link",
    "href": "https://developers.notion.com/"
  }
  ```
</CodeGroup>

<Note>
  **Rich text object limits**

  Refer to the request limits documentation page for information about [limits on the size of rich text objects](/reference/request-limits#limits-for-property-values).
</Note>
