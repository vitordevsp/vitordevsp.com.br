> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

> Retrieve the content of a page rendered as enhanced markdown.

# Retrieve a page as markdown

export const integrationsDashboardUrl = "https://www.notion.so/profile/integrations";

### Use cases

Use this endpoint to retrieve the full content of a Notion page as [enhanced markdown](/guides/data-apis/enhanced-markdown), instead of working with the [block-based API](/reference/get-block-children). This is especially useful for agentic systems and developer tools that work natively with markdown.

The endpoint also accepts non-navigable block IDs returned in `unknown_block_ids` from a previous truncated response. Pass these IDs to fetch additional subtrees of a large page.

### General behavior

Returns a `page_markdown` object containing the page content as an enhanced markdown string.

<Info>
  **Requirements**

  Your integration must have [read content capabilities](/reference/capabilities#content-capabilities) on the target page in order to call this endpoint. To update your integration's capabilities, navigate to the <a href={integrationsDashboardUrl}>My integrations</a> dashboard, select your integration, go to the **Capabilities** tab, and update your settings as needed.

  Attempting to call this endpoint without read content capabilities returns an HTTP response with a 403 status code.
</Info>

### Unknown blocks

Some blocks may appear as `<unknown url="..." alt="..."/>` tags in the markdown output. This happens when:

* **Truncation**: The page exceeds the record limit (approximately 20,000 blocks) and some blocks could not be loaded.
* **Permissions**: The page contains child pages or other content that is not shared with the integration.
* **Unsupported block types**: Certain block types (such as bookmarks, embeds, and link previews) are [not yet supported](/guides/data-apis/working-with-markdown-content#unsupported-block-types) in the markdown format.

When truncation or permissions cause unknown blocks, the `truncated` field is set to `true` and the `unknown_block_ids` array contains the affected block IDs.

You can attempt to fetch unloaded blocks by passing their IDs back to this same endpoint as the `page_id` path parameter. Blocks that are unknown due to permissions will return a 404 error since the integration does not have access.

<Note>
  The `unknown_block_ids` array does not distinguish between truncated and inaccessible blocks. Handle `object_not_found` errors gracefully when re-fetching unknown block IDs.
</Note>

For unsupported block types, use the [block-based API](/reference/retrieve-a-block) to retrieve the full structured data.

### Errors

Returns a 404 HTTP response if the page doesn't exist, or if the integration doesn't have access to the page.

Returns a 400 or 429 HTTP response if the request exceeds the [request limits](/reference/request-limits).

*Each Public API endpoint can return several possible error codes. See the [Error codes section](/reference/status-codes#error-codes) of the Status codes documentation for more information.*


## OpenAPI

````yaml get /v1/pages/{page_id}/markdown
openapi: 3.1.0
info:
  title: Notion API
  version: 1.0.0
  termsOfService: >-
    https://notion.notion.site/Terms-and-Privacy-28ffdd083dc3473e9c2da6ec011b58ac
servers:
  - url: https://api.notion.com
security:
  - bearerAuth: []
tags:
  - name: Databases
    description: Database endpoints
  - name: Data sources
    description: Data source endpoints
  - name: Pages
    description: Page endpoints
  - name: Blocks
    description: Block endpoints
  - name: Comments
    description: Comment endpoints
  - name: File uploads
    description: File upload endpoints
  - name: OAuth
    description: OAuth endpoints (basic authentication)
  - name: Users
    description: User endpoints
  - name: Search
    description: Search endpoints
  - name: Views
    description: View endpoints
  - name: Custom emojis
    description: Custom emoji endpoints
paths:
  /v1/pages/{page_id}/markdown:
    get:
      tags:
        - Pages
      summary: Retrieve a page as markdown
      operationId: retrieve-page-markdown
      parameters:
        - name: page_id
          in: path
          required: true
          schema:
            $ref: '#/components/schemas/idRequest'
            description: >-
              The ID of the page (or block) to retrieve as markdown.
              Non-navigable block IDs from truncated responses can be passed
              here to fetch their subtrees.
        - name: include_transcript
          in: query
          schema:
            type: boolean
            description: >-
              Whether to include meeting note transcripts. Defaults to false.
              When true, full transcripts are included; when false, a
              placeholder with the meeting note URL is shown instead.
        - $ref: '#/components/parameters/notionVersion'
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/pageMarkdownResponse'
        '400':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/error_api_400'
        '401':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/error_api_401'
        '403':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/error_api_403'
        '404':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/error_api_404'
        '409':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/error_api_409'
        '429':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/error_api_429'
        '500':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/error_api_500'
        '503':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/error_api_503'
        '504':
          description: ''
          content:
            application/json:
              schema:
                $ref: '#/components/schemas/error_api_504'
      x-codeSamples:
        - lang: javascript
          label: TypeScript SDK
          source: |-
            import { Client } from "@notionhq/client"

            const notion = new Client({ auth: process.env.NOTION_API_KEY })

            const response = await notion.pages.retrieveMarkdown({
              page_id: "b55c9c91-384d-452b-81db-d1ef79372b75"
            })

            console.log(response.markdown)
components:
  schemas:
    idRequest:
      type: string
    pageMarkdownResponse:
      type: object
      properties:
        object:
          type: string
          const: page_markdown
          description: The type of object, always 'page_markdown'.
        id:
          $ref: '#/components/schemas/idResponse'
          description: The ID of the page or block.
        markdown:
          type: string
          description: The page content rendered as enhanced Markdown.
        truncated:
          type: boolean
          description: >-
            Whether the content was truncated due to exceeding the record count
            limit.
        unknown_block_ids:
          type: array
          items:
            $ref: '#/components/schemas/idResponse'
          maxItems: 100
          description: >-
            Block IDs that could not be loaded (appeared as <unknown> tags in
            the markdown). Pass these IDs back to this endpoint to fetch their
            content separately.
      additionalProperties: false
      required:
        - object
        - id
        - markdown
        - truncated
        - unknown_block_ids
    error_api_400:
      allOf:
        - $ref: '#/components/schemas/publicApiCommonErrorResponse'
        - type: object
          properties:
            code:
              enum:
                - invalid_json
                - invalid_request_url
                - invalid_request
                - missing_version
                - validation_error
            status:
              const: 400
          required:
            - code
            - status
          additionalProperties: false
    error_api_401:
      allOf:
        - $ref: '#/components/schemas/publicApiCommonErrorResponse'
        - type: object
          properties:
            code:
              enum:
                - unauthorized
            status:
              const: 401
          required:
            - code
            - status
          additionalProperties: false
    error_api_403:
      allOf:
        - $ref: '#/components/schemas/publicApiCommonErrorResponse'
        - type: object
          properties:
            code:
              enum:
                - restricted_resource
            status:
              const: 403
          required:
            - code
            - status
          additionalProperties: false
    error_api_404:
      allOf:
        - $ref: '#/components/schemas/publicApiCommonErrorResponse'
        - type: object
          properties:
            code:
              enum:
                - object_not_found
            status:
              const: 404
          required:
            - code
            - status
          additionalProperties: false
    error_api_409:
      allOf:
        - $ref: '#/components/schemas/publicApiCommonErrorResponse'
        - type: object
          properties:
            code:
              enum:
                - conflict_error
            status:
              const: 409
          required:
            - code
            - status
          additionalProperties: false
    error_api_429:
      allOf:
        - $ref: '#/components/schemas/publicApiCommonErrorResponse'
        - type: object
          properties:
            code:
              enum:
                - rate_limited
            status:
              const: 429
          required:
            - code
            - status
          additionalProperties: false
    error_api_500:
      allOf:
        - $ref: '#/components/schemas/publicApiCommonErrorResponse'
        - type: object
          properties:
            code:
              enum:
                - internal_server_error
            status:
              const: 500
          required:
            - code
            - status
          additionalProperties: false
    error_api_503:
      allOf:
        - $ref: '#/components/schemas/publicApiCommonErrorResponse'
        - type: object
          properties:
            code:
              enum:
                - service_unavailable
            status:
              const: 503
          required:
            - code
            - status
          additionalProperties: false
    error_api_504:
      allOf:
        - $ref: '#/components/schemas/publicApiCommonErrorResponse'
        - type: object
          properties:
            code:
              enum:
                - gateway_timeout
            status:
              const: 504
          required:
            - code
            - status
          additionalProperties: false
    idResponse:
      type: string
      format: uuid
    publicApiCommonErrorResponse:
      type: object
      properties:
        object:
          const: error
        message:
          type: string
        additional_data:
          type: object
          additionalProperties:
            oneOf:
              - type: string
              - type: array
                items:
                  type: string
      required:
        - object
        - message
  parameters:
    notionVersion:
      name: Notion-Version
      in: header
      required: true
      schema:
        enum:
          - '2026-03-11'
      description: >-
        The [API version](/reference/versioning) to use for this request. The
        latest version is `2026-03-11`.
  securitySchemes:
    bearerAuth:
      type: http
      scheme: bearer

````