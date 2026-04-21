> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Emoji and icon

> Learn how to use emoji and icon objects in the Notion API.

Emoji and icon objects represent icons on pages, databases, and callout blocks. The `icon` field is a discriminated union on the `type` key:

| `type`           | Read | Write | Description                                                                                                               |
| :--------------- | :--- | :---- | :------------------------------------------------------------------------------------------------------------------------ |
| `"emoji"`        | Yes  | Yes   | A standard emoji character. See [Emoji](/reference/emoji-and-icon#emoji).                                                 |
| `"custom_emoji"` | Yes  | Yes   | A workspace custom emoji, referenced by `id`. See [Custom emoji](/reference/emoji-and-icon#custom-emoji).                 |
| `"icon"`         | Yes  | Yes   | A native Notion icon with `name` and `color`. See [Icon](/reference/emoji-and-icon#icon).                                 |
| `"external"`     | Yes  | Yes   | An externally hosted image URL. See [File object](/reference/file-object).                                                |
| `"file"`         | Yes  | No    | A Notion-hosted file (uploaded via the UI). Returned in responses only. See [File object](/reference/file-object).        |
| `"file_upload"`  | No   | Yes   | A file uploaded via the [File Upload API](/reference/file-upload). Write-only. See [File object](/reference/file-object). |

<Note>
  The read/write columns above apply to **page** and **database** icons. Callout block icons support all types except `file_upload` on write — use `emoji`, `external`, `custom_emoji`, or `icon` instead.
</Note>

***

## Emoji

<CodeGroup>
  ```json Example emoji object theme={null}
  {
    "type": "emoji",
    "emoji": "😻"
  }
  ```
</CodeGroup>

| Field   | Type      | Description                                                    | Example value |
| :------ | :-------- | :------------------------------------------------------------- | :------------ |
| `type`  | `"emoji"` | The constant string `"emoji"` that represents the object type. | `"emoji"`     |
| `emoji` | `string`  | The emoji character.                                           | `"😻"`        |

### Example: set a page icon via the [Create a page](/reference/post-page) endpoint

<CodeGroup>
  ```bash cURL theme={null}
  curl 'https://api.notion.com/v1/pages' \
    -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
    -H "Content-Type: application/json" \
    -H "Notion-Version: 2026-03-11" \
    --data '{
    "parent": {
      "page_id": "13d6da822f9343fa8ec14c89b8184d5a"
    },
    "properties": {
      "title": [
        {
          "type": "text",
          "text": {
            "content": "A page with an avocado icon",
            "link": null
          }
        }
      ]
    },
    "icon": {
      "type": "emoji",
      "emoji": "🥑"
    }
  }'
  ```
</CodeGroup>

### Example: set a page icon via the [Update page](/reference/patch-page) endpoint

<CodeGroup>
  ```bash cURL theme={null}
  curl https://api.notion.com/v1/pages/60bdc8bd-3880-44b8-a9cd-8a145b3ffbd7 \
    -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
    -H "Content-Type: application/json" \
    -H "Notion-Version: 2026-03-11" \
    -X PATCH \
  	--data '{
    "icon": {
  	  "type": "emoji",
  	  "emoji": "🥨"
      }
  }'
  ```
</CodeGroup>

***

## Custom emoji

Custom emojis are icons uploaded and managed in your workspace. Use the [List custom emojis](/reference/list-custom-emojis) endpoint to retrieve them.

| Field          | Type             | Description                                                           | Example value    |
| :------------- | :--------------- | :-------------------------------------------------------------------- | :--------------- |
| `type`         | `"custom_emoji"` | The constant string `"custom_emoji"` that represents the object type. | `"custom_emoji"` |
| `custom_emoji` | `object`         | Object containing `id`, `name`, and `url`.                            |                  |

### Example: custom emoji in a page icon response

<CodeGroup>
  ```json JSON theme={null}
  {
    "icon": {
      "type": "custom_emoji",
      "custom_emoji": {
        "id": "45ce454c-d427-4f53-9489-e5d0f3d1db6b",
        "name": "bufo",
        "url": "https://s3-us-west-2.amazonaws.com/public.notion-static.com/865e85fc-7442-44d3-b323-9b03a2111720/3c6796979c50f4aa.png"
      }
    }
  }
  ```
</CodeGroup>

### Example: inline custom emoji in rich text

<CodeGroup>
  ```json JSON theme={null}
  {
    "type": "mention",
    "mention": {
      "type": "custom_emoji",
      "custom_emoji": {
        "id": "45ce454c-d427-4f53-9489-e5d0f3d1db6b",
        "name": "bufo",
        "url": "https://s3-us-west-2.amazonaws.com/public.notion-static.com/865e85fc-7442-44d3-b323-9b03a2111720/3c6796979c50f4aa.png"
      }
    }
  }
  ```
</CodeGroup>

### Example: set a page icon to a custom emoji

When writing, only the `id` field is required inside `custom_emoji`.

<CodeGroup>
  ```bash cURL theme={null}
  curl https://api.notion.com/v1/pages/60bdc8bd-3880-44b8-a9cd-8a145b3ffbd7 \
    -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
    -H "Content-Type: application/json" \
    -H "Notion-Version: 2026-03-11" \
    -X PATCH \
    --data '{
    "icon": {
      "type": "custom_emoji",
      "custom_emoji": {
        "id": "45ce454c-d427-4f53-9489-e5d0f3d1db6b"
      }
    }
  }'
  ```
</CodeGroup>

### Example: look up a custom emoji by name

Use the `name` query parameter on [List custom emojis](/reference/list-custom-emojis) to resolve a custom emoji name to its ID, then use the ID to set a page icon.

<CodeGroup>
  ```bash cURL theme={null}
  curl 'https://api.notion.com/v1/custom_emojis?name=bufo' \
    -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
    -H "Notion-Version: 2026-03-11"
  ```

  ```javascript TypeScript SDK theme={null}
  import { Client } from "@notionhq/client"

  const notion = new Client()

  const response = await notion.customEmojis.list({ name: "bufo" })
  const emoji = response.results[0]

  // Use the ID to set a page icon
  if (emoji) {
    await notion.pages.update({
      page_id: "60bdc8bd-3880-44b8-a9cd-8a145b3ffbd7",
      icon: {
        type: "custom_emoji",
        custom_emoji: { id: emoji.id },
      },
    })
  }
  ```
</CodeGroup>

**Example response:**

<CodeGroup>
  ```json JSON theme={null}
  {
    "object": "list",
    "type": "custom_emoji",
    "results": [
      {
        "id": "45ce454c-d427-4f53-9489-e5d0f3d1db6b",
        "name": "bufo",
        "url": "https://s3-us-west-2.amazonaws.com/public.notion-static.com/865e85fc-7442-44d3-b323-9b03a2111720/3c6796979c50f4aa.png"
      }
    ],
    "has_more": false,
    "next_cursor": null
  }
  ```
</CodeGroup>

***

## Icon

Native Notion icons are built-in icons with a name and color. They appear in the Notion UI icon picker under the "Icons" tab.

<CodeGroup>
  ```json Example icon object theme={null}
  {
    "type": "icon",
    "icon": {
      "name": "pizza",
      "color": "blue"
    }
  }
  ```
</CodeGroup>

| Field  | Type     | Description                                                                                                | Example value |
| :----- | :------- | :--------------------------------------------------------------------------------------------------------- | :------------ |
| `type` | `"icon"` | The constant string `"icon"` that represents the object type.                                              | `"icon"`      |
| `icon` | `object` | An object with `name` (required) and `color` (optional, defaults to `"gray"`). See below for valid values. |               |

### Icon `name`

The `name` field identifies the icon. Refer to the Notion icon picker for valid names (e.g. `"pizza"`, `"meeting"`, `"home"`).

### Icon `color`

Valid color values: `"gray"`, `"lightgray"`, `"brown"`, `"yellow"`, `"orange"`, `"green"`, `"blue"`, `"purple"`, `"pink"`, `"red"`.

If omitted when setting an icon, the color defaults to `"gray"`.

### Example: set a page icon to a native icon

<CodeGroup>
  ```bash cURL theme={null}
  curl https://api.notion.com/v1/pages/60bdc8bd-3880-44b8-a9cd-8a145b3ffbd7 \
    -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
    -H "Content-Type: application/json" \
    -H "Notion-Version: 2026-03-11" \
    -X PATCH \
    --data '{
    "icon": {
      "type": "icon",
      "icon": {
        "name": "pizza",
        "color": "blue"
      }
    }
  }'
  ```

  ```javascript TypeScript SDK theme={null}
  import { Client } from "@notionhq/client"

  const notion = new Client()

  const response = await notion.pages.update({
    page_id: "60bdc8bd-3880-44b8-a9cd-8a145b3ffbd7",
    icon: {
      type: "icon",
      icon: { name: "pizza", color: "blue" },
    },
  })
  ```
</CodeGroup>
