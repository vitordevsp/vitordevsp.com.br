> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Introduction

> Learn the conventions, authentication, and pagination patterns used across the Notion API.

Integrations use the API to access Notion's pages, databases, and users. Integrations can connect services to Notion and build interactive experiences for users within Notion. Using the navigation on the left, you'll find details for objects and endpoints used in the API.

<Note>
  You need an integration token to interact with the Notion API. You can find an integration token after you create an integration on the integration settings page. If this is your first look at the Notion API, we recommend beginning with the [Getting started guide](/guides/get-started/overview) to learn how to create an integration.

  If you want to work on a specific integration, but can't access the token, confirm that you are an admin in the associated workspace. You can check inside the Notion UI via `Settings & Members` in the left sidebar. If you're not an admin in any of your workspaces, you can create a personal workspace for free.
</Note>

## Conventions

The base URL to send all API requests is `https://api.notion.com`. HTTPS is required for all API requests.

The Notion API follows RESTful conventions when possible, with most operations performed via `GET`, `POST`, `PATCH`, and `DELETE` requests on page and database resources. Request and response bodies are encoded as JSON.

### JSON conventions

* Top-level resources have an `"object"` property. This property can be used to determine the type of the resource (e.g. `"database"`, `"user"`, etc.)
* Top-level resources are addressable by a UUIDv4 `"id"` property. You may omit dashes from the ID when making requests to the API, e.g. when copying the ID from a Notion URL.
* Property names are in `snake_case` (not `camelCase` or `kebab-case`).
* Temporal values (dates and datetimes) are encoded in [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) strings. Datetimes will include the time value (`2020-08-12T02:12:33.231Z`) while dates will include only the date (`2020-08-12`)
* The Notion API does not support empty strings. To unset a string value for properties like a `url` [page property value](/reference/page-property-values), for example, use an explicit `null` instead of `""`.

## Code samples & SDKs

Samples requests and responses are shown for each endpoint. Requests are shown using the Notion [JavaScript SDK](https://github.com/makenotion/notion-sdk-js), and [cURL](https://curl.se/). These samples make it easy to copy, paste, and modify as you build your integration.

Notion SDKs are open source projects that you can install to easily start building. You may also choose any other language or library that allows you to make HTTP requests.

## Pagination

Endpoints that return lists of objects support cursor-based pagination requests. By default, Notion returns ten items per API call. If the number of items in a response from a support endpoint exceeds the default, then an integration can use pagination to request a specific set of the results and/or to limit the number of returned items.

### Supported endpoints

| HTTP method | Endpoint                                                             |
| :---------- | :------------------------------------------------------------------- |
| GET         | [List all users](/reference/get-users)                               |
| GET         | [List block children](/reference/get-block-children)                 |
| GET         | [List comments](/reference/list-comments)                            |
| GET         | [Retrieve a page property item](/reference/retrieve-a-page-property) |
| GET         | [List file uploads](/reference/list-file-uploads)                    |
| GET         | [List data source templates](/reference/list-data-source-templates)  |
| GET         | [List views](/reference/list-views)                                  |
| GET         | [Get view query results](/reference/get-view-query-results)          |
| POST        | [Query a data source](/reference/query-a-data-source)                |
| POST        | [Create a view query](/reference/create-view-query)                  |
| POST        | [Search](/reference/post-search)                                     |

### Responses

If an endpoint supports pagination, then the response object contains the below fields.

| Field         | Type                                                                                                                                                                                                                                    | Description                                                                                                                                                                                                                                                 |
| :------------ | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `has_more`    | `boolean`                                                                                                                                                                                                                               | Whether the response includes the end of the list. `false` if there are no more results. Otherwise, `true`.                                                                                                                                                 |
| `next_cursor` | `string`                                                                                                                                                                                                                                | A string that can be used to retrieve the next page of results by passing the value as the `start_cursor` [parameter](#parameters-for-paginated-requests) to the same endpoint.<br /><br /> Only available when `has_more` is true.                         |
| `object`      | `"list"`                                                                                                                                                                                                                                | The constant string `"list"`.                                                                                                                                                                                                                               |
| `results`     | `array of objects`                                                                                                                                                                                                                      | The list, or partial list, of endpoint-specific results. Refer to a [supported endpoint](#supported-endpoints)'s individual documentation for details.                                                                                                      |
| `type`        | `"block"`<br /><br />`"comment"`<br /><br />`"data_source"`<br /><br />`"file_upload"`<br /><br />`"page"`<br /><br />`"page_or_database"`<br /><br />`"property_item"`<br /><br />`"template"`<br /><br />`"user"`<br /><br />`"view"` | A constant string that represents the type of the objects in `results`.                                                                                                                                                                                     |
| `{type}`      | [`paginated list object`](/reference/page-property-values#paginated-page-properties)                                                                                                                                                    | An object containing type-specific pagination information. For `property_item`s, the value corresponds to the [paginated page property type](/reference/page-property-values#paginated-page-properties). For all other types, the value is an empty object. |

### Parameters for paginated requests

<Warning>
  **Parameter location varies by endpoint**

  `GET` requests accept parameters in the query string.

  `POST` requests receive parameters in the request body.
</Warning>

| Parameter      | Type     | Description                                                                                                                                                                                                |
| :------------- | :------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| `page_size`    | `number` | The number of items from the full list to include in the response. <br /><br /> **Default**: `100`<br />**Maximum**: `100` <br /><br /> The response may contain fewer than the default number of results. |
| `start_cursor` | `string` | A `next_cursor` value returned in a previous [response](#responses). Treat this as an opaque value. <br /><br /> Defaults to `undefined`, which returns results from the beginning of the list.            |

### How to send a paginated request

<Steps>
  <Step>
    Send an initial request to a [supported endpoint](#supported-endpoints).
  </Step>

  <Step>
    Retrieve the `next_cursor` value from the response (only available when `has_more` is `true`).
  </Step>

  <Step>
    Send a follow up request to the endpoint that includes the `next_cursor` param in either the query string (for `GET` requests) or in the body params (`POST` requests).
  </Step>
</Steps>

#### Example: paginate through query results from a data source

<CodeGroup>
  ```bash cURL theme={null}
  curl -X POST 'https://api.notion.com/v1/data_sources/<data_source_id>/query' \
    -H 'Authorization: Bearer <secret_bot>' \
    -H 'Notion-Version: 2026-03-11' \
    -H 'Content-Type: application/json' \
    --data '{
      "start_cursor": "33e19cb9-751f-4993-b74d-234d67d0d534"
    }'
  ```

  ```javascript JavaScript SDK theme={null}
  import { Client, iteratePaginatedAPI } from "@notionhq/client";

  const notion = new Client({
    auth: process.env.NOTION_API_KEY,
    notionVersion: "2026-03-11",
  });

  // Option 1: iterate one page of results at a time (async iterator)
  for await (const page of iteratePaginatedAPI(
    notion.dataSources.query,
    { data_source_id: "<data_source_id>" }
  )) {
    // Process each page result as it arrives
    console.log(page);
  }

  // Option 2: collect all results into an array
  import { collectPaginatedAPI } from "@notionhq/client";

  const allPages = await collectPaginatedAPI(
    notion.dataSources.query,
    { data_source_id: "<data_source_id>" }
  );
  ```
</CodeGroup>
