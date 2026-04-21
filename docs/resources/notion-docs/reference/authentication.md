> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Authentication

> Learn how to authenticate your integration requests using bearer tokens.

Requests use the HTTP `Authorization` header to both authenticate and authorize operations. The Notion API accepts bearer tokens in this header. Bearer tokens are provided to you when you create an integration. If you're creating a public OAuth integration, the integration also receives bearer tokens each time a user completes the OAuth flow.

<CodeGroup>
  ```curl cURL theme={null}
  curl 'https://api.notion.com/v1/users' \
    -H 'Authorization: Bearer '"$NOTION_ACCESS_TOKEN"'' \
    -H "Notion-Version: 2026-03-11"
  ```
</CodeGroup>

Inside Notion, users will see updates made by integrations attributed to a bot. The bot's name and avatar are controlled in the integration settings.

Using the [Notion SDK for JavaScript](https://github.com/makenotion/notion-sdk-js), a bearer token can be passed once to initialize a `Client` and the client can be used to send multiple authenticated requests.

<CodeGroup>
  ```javascript Notion SDK for JS theme={null}
  const { Client } = require('@notionhq/client');

  const client = new Client({ auth: process.env.NOTION_ACCESS_TOKEN });
  ```
</CodeGroup>

Learn more in the [Authorization guide](/guides/get-started/authorization).
