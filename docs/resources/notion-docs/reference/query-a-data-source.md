> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Query a data source

### Overview

Gets a list of [pages](/reference/page) contained in the data source, filtered and ordered according to the filter conditions and sort criteria provided in the request. The response may contain fewer than `page_size` of results. If the response includes a `next_cursor` value, refer to the [pagination reference](/reference/intro#pagination) for details about how to use a cursor to iterate through the list.

<Info>
  **Databases, data sources, and wikis**

  [Wiki](https://www.notion.so/help/wikis-and-verified-pages) data sources can contain either pages or databases as children. In all other cases, the children can only be pages.

  For wikis, instead of directly returning any [database](/reference/database) results, this API returns all [data sources](/reference/data-source) that are children of *that* database. Surfacing the data source instead of the direct database child helps make it easier to craft your next API request (for example, retrieving the data source or listing its children.)

  Another tip for wikis is to use the `result_type` filter of `"page"` or `"data_source"` if you're only looking for query results that are one of those two types instead of both.
</Info>

### Filtering

[**Filters**](/reference/filter-data-source-entries) are similar to the [filters provided in the Notion UI](https://www.notion.so/help/views-filters-and-sorts) where the set of filters and filter groups chained by "And" in the UI is equivalent to having each filter in the array of the compound `"and"` filter. Similar a set of filters chained by "Or" in the UI would be represented as filters in the array of the `"or"` compound filter.
Filters operate on data source properties and can be combined. If no filter is provided, all the pages in the data source will be returned with pagination.

<Frame caption="The above filters in the UI can be represented as the following filter object">
  <img src="https://mintcdn.com/notion-demo/S-I3qLQnwRa7HjdK/images/reference/image-6.png?fit=max&auto=format&n=S-I3qLQnwRa7HjdK&q=85&s=27e3bc94089d8d763ae7de032ded2fa3" width="1340" height="550" data-path="images/reference/image-6.png" />
</Frame>

```json Filter object expandable theme={null}
{
  "and": [
    {
      "property": "Done",
      "checkbox": {
        "equals": true
      }
    },
    {
      "or": [
        {
          "property": "Tags",
          "contains": "A"
        },
        {
          "property": "Tags",
          "contains": "B"
        }
      ]
  	}
  ]
}
```

In addition to chained filters, data sources can be queried with single filters.

```json JSON theme={null}
{
    "property": "Done",
    "checkbox": {
        "equals": true
   }
 }
```

### Sorting

[**Sorts**](/reference/sort-data-source-entries) are similar to the [sorts provided in the Notion UI](https://notion.so/notion/Intro-to-databases-fd8cd2d212f74c50954c11086d85997e#0eb303043b1742468e5aff2f3f670505). Sorts operate on database properties or page timestamps and can be combined. The order of the sorts in the request matter, with earlier sorts taking precedence over later ones.

Notion doesn't guarantee any particular sort order when no sort parameters are provided.

### Pagination limit

This endpoint supports paginating through up to **10,000 results** per query. If a data source contains more matching entries than this limit, pagination will stop at the 10,000th result.

For integrations that need to process all pages in a large data source, we recommend:

* Using [filters](/reference/filter-data-source-entries) to narrow the result set (e.g. filter by `last_edited_time` to fetch only recently changed pages).
* Setting up [integration webhooks](/reference/webhooks) for incremental sync instead of polling the full data source on a schedule.

<Warning>
  **Incremental sync via webhooks**

  If your integration polls this endpoint on a recurring schedule to detect changes, consider switching to [integration webhooks](/reference/webhooks) instead. Webhooks notify your integration of changes in real time, eliminating the need to paginate through the entire data source. This is faster, more efficient, and avoids hitting the pagination limit.
</Warning>

### Recommendations for performance

Use the `filter_properties` query parameter to filter only the properties of the data source schema you need from the response items. For example:

```bash theme={null}
https://api.notion.com/v1/data_sources/[DATA_SOURCE_ID]/query?filter_properties[]=title
```

Multiple filter properties can be provided by chaining the `filter_properties` query param. For example:

```bash theme={null}
https://api.notion.com/v1/data_sources/[DATA_SOURCE_ID]/query?filter_properties[]=title&filter_properties[]=status
```

This parameter accepts property IDs or property names. Property IDs can be determined with the [Retrieve a data source](/reference/retrieve-a-data-source) endpoint.

If you are using the [Notion JavaScript SDK](https://github.com/makenotion/notion-sdk-js), the `filter_properties` endpoint expects an array of strings. For example:

```typescript TypeScript theme={null}
notion.dataSources.query({
	data_source_id: id,
	filter_properties: ["title", "status"]
})
```

Using `filter_properties` can make a significant improvement to the speed of the API and size of the JSON objects in the results, especially for databases with lots of properties, some of which might be rollups, relations, or formulas. If you need additional properties from each returned page, you can make subsequent calls to the [Retrieve page property item](/changelog/retrieve-page-property-values) or [Retrieve a page](/reference/retrieve-a-page) APIs.

If you're still running into long query times with this API, other tips include:

* Using more specific filter conditions to reduce the result set, e.g. a more specific title query or a shorter time window.
* Dividing large data sources (ones with more than several dozen thousand pages) into multiple; e.g. splitting a "tasks" database into "Tasks" and "Bugs".
* Pruning data source schemas to remove any complex formulas, rollups, two-way relations, or other properties that are no longer in use.
* Setting up [integration webhooks](/reference/webhooks) to reduce the need for polling this API by instead automatically notifying your system of incremental workspace events.

For more information, visit our [help center article on optimizing database load times](https://www.notion.com/help/optimize-database-load-times-and-performance).

### Other important details and tips

<Info>
  **Permissions**

  Before an integration can query a data source, its parent database must be shared with the integration. Attempting to query a data source in a database that has not been shared will return an HTTP response with a 404 status code.

  To share a database with an integration, click the ••• menu at the top right of a database page, scroll to `Add connections`, and use the search bar to find and select the integration from the dropdown list.
</Info>

<Info>
  **Integration capabilities**

  This endpoint requires an integration to have read content capabilities. Attempting to call this API without read content capabilities will return an HTTP response with a 403 status code. For more information on integration capabilities, see the [capabilities guide](/reference/capabilities).
</Info>

<Info>
  **To display the page titles of related pages rather than just the ID:**

  1. Add a rollup property to the data source which uses a formula to get the related page's title. This works well if you have access to [update](/reference/update-a-data-source) the data source's schema.
  2. Otherwise, [retrieve the individual related pages](/reference/retrieve-a-page) using each page ID.
</Info>

<Warning>
  **Formula and rollup limitations**

  * If a formula depends on a page property that is a relation, and that relation has more than 25 references, only 25 will be evaluated as part of the formula.
  * Rollups and formulas that depend on multiple layers of relations may not return correct results.
  * Notion recommends individually [retrieving each page property item](/reference/retrieve-a-page-property) to get the most accurate result.
</Warning>

### Errors

Returns a 404 HTTP response if the data source doesn't exist, or if the integration doesn't have access to the data source.

Returns a 400 or a 429 HTTP response if the request exceeds the [request limits](/reference/request-limits).

Returns a 503 HTTP response if the data source query is temporarily unavailable due to backend datastore timeouts. The response body includes an `additional_data` object with retry guidance:

```json 503 response example theme={null}
{
  "object": "error",
  "status": 503,
  "code": "service_unavailable",
  "message": "Public API data source query is temporarily unavailable due to backend datastore timeouts. Retry with exponential backoff; if retries continue to fail, reduce page_size or narrow filters/sorts.",
  "additional_data": {
    "endpoint_name": "public_queryDataSource",
    "notion_error_name": "PgPoolWaitConnectionTimeout",
    "retry_guidance": [
      "Use exponential backoff with jitter",
      "Reduce page_size",
      "Narrow query filters/sorts"
    ]
  }
}
```

<Danger>
  **Note**: Each Public API endpoint can return several possible error codes. See the [Error codes section](/reference/status-codes#error-codes) of the Status codes documentation for more information.
</Danger>


## OpenAPI

````yaml post /v1/data_sources/{data_source_id}/query
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
  /v1/data_sources/{data_source_id}/query:
    post:
      tags:
        - Data sources
      summary: Query a data source
      operationId: post-database-query
      parameters:
        - name: data_source_id
          in: path
          required: true
          schema:
            $ref: '#/components/schemas/idRequest'
        - name: filter_properties
          in: query
          schema:
            type: array
            items:
              type: string
        - $ref: '#/components/parameters/notionVersion'
      requestBody:
        required: true
        content:
          application/json:
            schema:
              type: object
              properties:
                sorts:
                  type: array
                  items:
                    anyOf:
                      - type: object
                        properties:
                          property:
                            type: string
                          direction:
                            type: string
                            enum:
                              - ascending
                              - descending
                        required:
                          - property
                          - direction
                      - type: object
                        properties:
                          timestamp:
                            type: string
                            enum:
                              - created_time
                              - last_edited_time
                          direction:
                            type: string
                            enum:
                              - ascending
                              - descending
                        required:
                          - timestamp
                          - direction
                filter:
                  anyOf:
                    - anyOf:
                        - type: object
                          properties:
                            or:
                              $ref: '#/components/schemas/groupFilterOperatorArray'
                          required:
                            - or
                        - type: object
                          properties:
                            and:
                              $ref: '#/components/schemas/groupFilterOperatorArray'
                          required:
                            - and
                    - $ref: '#/components/schemas/propertyFilter'
                    - $ref: '#/components/schemas/timestampFilter'
                start_cursor:
                  type: string
                  format: uuid
                page_size:
                  type: number
                in_trash:
                  type: boolean
                result_type:
                  description: >-
                    Optionally filter the results to only include pages or data
                    sources. Regular, non-wiki databases only support page
                    children. The default behavior is no result type filtering,
                    in other words, returning both pages and data sources for
                    wikis.
                  type: string
                  enum:
                    - page
                    - data_source
              additionalProperties: false
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                title: Page Or Data Source
                type: object
                properties:
                  type:
                    type: string
                    const: page_or_data_source
                  page_or_data_source:
                    $ref: '#/components/schemas/emptyObject'
                  object:
                    type: string
                    const: list
                  next_cursor:
                    type:
                      - string
                      - 'null'
                  has_more:
                    type: boolean
                  results:
                    type: array
                    items:
                      anyOf:
                        - anyOf:
                            - $ref: '#/components/schemas/pageObjectResponse'
                            - $ref: '#/components/schemas/partialPageObjectResponse'
                        - anyOf:
                            - $ref: >-
                                #/components/schemas/partialDataSourceObjectResponse
                            - $ref: '#/components/schemas/dataSourceObjectResponse'
                  request_status:
                    type: object
                    properties:
                      type:
                        type: string
                        enum:
                          - complete
                          - incomplete
                      incomplete_reason:
                        type: string
                        enum:
                          - query_result_limit_reached
                    required:
                      - type
                required:
                  - type
                  - page_or_data_source
                  - object
                  - next_cursor
                  - has_more
                  - results
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

            const response = await notion.dataSources.query({
              data_source_id: "d9824bdc-8445-4327-be8b-5b47500af6ce",
              filter: {
                property: "Status",
                select: { equals: "Done" }
              },
              sorts: [
                {
                  property: "Created",
                  direction: "descending"
                }
              ]
            })
components:
  schemas:
    idRequest:
      type: string
    groupFilterOperatorArray:
      type: array
      items:
        anyOf:
          - $ref: '#/components/schemas/propertyOrTimestampFilter'
          - anyOf:
              - type: object
                properties:
                  or:
                    $ref: '#/components/schemas/propertyOrTimestampFilterArray'
                required:
                  - or
              - type: object
                properties:
                  and:
                    $ref: '#/components/schemas/propertyOrTimestampFilterArray'
                required:
                  - and
      maxItems: 100
    propertyFilter:
      anyOf:
        - title: Title
          type: object
          properties:
            title:
              $ref: '#/components/schemas/textPropertyFilter'
            property:
              type: string
            type:
              type: string
              const: title
          additionalProperties: false
          required:
            - title
            - property
        - title: Rich Text
          type: object
          properties:
            rich_text:
              $ref: '#/components/schemas/textPropertyFilter'
            property:
              type: string
            type:
              type: string
              const: rich_text
          additionalProperties: false
          required:
            - rich_text
            - property
        - title: Number
          type: object
          properties:
            number:
              $ref: '#/components/schemas/numberPropertyFilter'
            property:
              type: string
            type:
              type: string
              const: number
          additionalProperties: false
          required:
            - number
            - property
        - title: Checkbox
          type: object
          properties:
            checkbox:
              $ref: '#/components/schemas/checkboxPropertyFilter'
            property:
              type: string
            type:
              type: string
              const: checkbox
          additionalProperties: false
          required:
            - checkbox
            - property
        - title: Select
          type: object
          properties:
            select:
              $ref: '#/components/schemas/selectPropertyFilter'
            property:
              type: string
            type:
              type: string
              const: select
          additionalProperties: false
          required:
            - select
            - property
        - title: Multi Select
          type: object
          properties:
            multi_select:
              $ref: '#/components/schemas/multiSelectPropertyFilter'
            property:
              type: string
            type:
              type: string
              const: multi_select
          additionalProperties: false
          required:
            - multi_select
            - property
        - title: Status
          type: object
          properties:
            status:
              $ref: '#/components/schemas/statusPropertyFilter'
            property:
              type: string
            type:
              type: string
              const: status
          additionalProperties: false
          required:
            - status
            - property
        - title: Date
          type: object
          properties:
            date:
              $ref: '#/components/schemas/datePropertyFilter'
            property:
              type: string
            type:
              type: string
              const: date
          additionalProperties: false
          required:
            - date
            - property
        - title: People
          type: object
          properties:
            people:
              $ref: '#/components/schemas/peoplePropertyFilter'
            property:
              type: string
            type:
              type: string
              const: people
          additionalProperties: false
          required:
            - people
            - property
        - title: Files
          type: object
          properties:
            files:
              $ref: '#/components/schemas/existencePropertyFilter'
            property:
              type: string
            type:
              type: string
              const: files
          additionalProperties: false
          required:
            - files
            - property
        - title: Url
          type: object
          properties:
            url:
              $ref: '#/components/schemas/textPropertyFilter'
            property:
              type: string
            type:
              type: string
              const: url
          additionalProperties: false
          required:
            - url
            - property
        - title: Email
          type: object
          properties:
            email:
              $ref: '#/components/schemas/textPropertyFilter'
            property:
              type: string
            type:
              type: string
              const: email
          additionalProperties: false
          required:
            - email
            - property
        - title: Phone Number
          type: object
          properties:
            phone_number:
              $ref: '#/components/schemas/textPropertyFilter'
            property:
              type: string
            type:
              type: string
              const: phone_number
          additionalProperties: false
          required:
            - phone_number
            - property
        - title: Relation
          type: object
          properties:
            relation:
              $ref: '#/components/schemas/relationPropertyFilter'
            property:
              type: string
            type:
              type: string
              const: relation
          additionalProperties: false
          required:
            - relation
            - property
        - title: Created By
          type: object
          properties:
            created_by:
              $ref: '#/components/schemas/peoplePropertyFilter'
            property:
              type: string
            type:
              type: string
              const: created_by
          additionalProperties: false
          required:
            - created_by
            - property
        - title: Created Time
          type: object
          properties:
            created_time:
              $ref: '#/components/schemas/datePropertyFilter'
            property:
              type: string
            type:
              type: string
              const: created_time
          additionalProperties: false
          required:
            - created_time
            - property
        - title: Last Edited By
          type: object
          properties:
            last_edited_by:
              $ref: '#/components/schemas/peoplePropertyFilter'
            property:
              type: string
            type:
              type: string
              const: last_edited_by
          additionalProperties: false
          required:
            - last_edited_by
            - property
        - title: Last Edited Time
          type: object
          properties:
            last_edited_time:
              $ref: '#/components/schemas/datePropertyFilter'
            property:
              type: string
            type:
              type: string
              const: last_edited_time
          additionalProperties: false
          required:
            - last_edited_time
            - property
        - title: Formula
          type: object
          properties:
            formula:
              $ref: '#/components/schemas/formulaPropertyFilter'
            property:
              type: string
            type:
              type: string
              const: formula
          additionalProperties: false
          required:
            - formula
            - property
        - title: Unique Id
          type: object
          properties:
            unique_id:
              $ref: '#/components/schemas/numberPropertyFilter'
            property:
              type: string
            type:
              type: string
              const: unique_id
          additionalProperties: false
          required:
            - unique_id
            - property
        - title: Rollup
          type: object
          properties:
            rollup:
              $ref: '#/components/schemas/rollupPropertyFilter'
            property:
              type: string
            type:
              type: string
              const: rollup
          additionalProperties: false
          required:
            - rollup
            - property
        - title: Verification
          type: object
          properties:
            verification:
              $ref: '#/components/schemas/verificationPropertyStatusFilter'
            property:
              type: string
            type:
              type: string
              const: verification
          additionalProperties: false
          required:
            - verification
            - property
    timestampFilter:
      anyOf:
        - $ref: '#/components/schemas/timestampCreatedTimeFilter'
        - $ref: '#/components/schemas/timestampLastEditedTimeFilter'
    emptyObject:
      type: object
      properties: {}
      additionalProperties: false
    pageObjectResponse:
      type: object
      properties:
        object:
          type: string
          const: page
          description: The page object type name.
        id:
          $ref: '#/components/schemas/idResponse'
          description: The ID of the page.
        created_time:
          type: string
          format: date-time
          description: Date and time when this page was created.
        last_edited_time:
          type: string
          format: date-time
          description: Date and time when this page was last edited.
        in_trash:
          type: boolean
          description: Whether the page is in trash.
        is_archived:
          type: boolean
          description: Whether the page has been archived.
        is_locked:
          type: boolean
          description: Whether the page is locked from editing in the Notion app UI.
        url:
          type: string
          description: The URL of the Notion page.
        public_url:
          oneOf:
            - type: string
            - type: 'null'
          description: >-
            The public URL of the Notion page, if it has been published to the
            web.
        parent:
          $ref: '#/components/schemas/parentForBlockBasedObjectResponse'
          description: Information about the page's parent.
        properties:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/pagePropertyValueWithIdResponse'
          description: Property values of this page.
        icon:
          oneOf:
            - $ref: '#/components/schemas/pageIconResponse'
            - type: 'null'
          description: Page icon.
        cover:
          oneOf:
            - $ref: '#/components/schemas/pageCoverResponse'
            - type: 'null'
          description: Page cover image.
        created_by:
          $ref: '#/components/schemas/partialUserObjectResponse'
          description: User who created the page.
        last_edited_by:
          $ref: '#/components/schemas/partialUserObjectResponse'
          description: User who last edited the page.
      additionalProperties: false
      required:
        - object
        - id
        - created_time
        - last_edited_time
        - in_trash
        - is_archived
        - is_locked
        - url
        - public_url
        - parent
        - properties
        - icon
        - cover
        - created_by
        - last_edited_by
    partialPageObjectResponse:
      type: object
      properties:
        object:
          type: string
          const: page
          description: The page object type name.
        id:
          $ref: '#/components/schemas/idResponse'
          description: The ID of the page.
      additionalProperties: false
      required:
        - object
        - id
    partialDataSourceObjectResponse:
      type: object
      properties:
        object:
          type: string
          const: data_source
          description: The data source object type name.
        id:
          $ref: '#/components/schemas/idResponse'
          description: The ID of the data source.
        properties:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/databasePropertyConfigResponse'
          description: The properties schema of the data source.
      additionalProperties: false
      required:
        - object
        - id
        - properties
    dataSourceObjectResponse:
      type: object
      properties:
        object:
          type: string
          const: data_source
          description: The data source object type name.
        id:
          $ref: '#/components/schemas/idResponse'
          description: The ID of the data source.
        title:
          type: array
          items:
            $ref: '#/components/schemas/richTextItemResponse'
          maxItems: 100
          description: The title of the data source.
        description:
          type: array
          items:
            $ref: '#/components/schemas/richTextItemResponse'
          maxItems: 100
          description: The description of the data source.
        parent:
          $ref: '#/components/schemas/parentOfDataSourceResponse'
          description: The parent of the data source.
        database_parent:
          $ref: '#/components/schemas/parentOfDatabaseResponse'
          description: >-
            The parent of the data source's containing database. This is
            typically a page, block, or workspace, but can be another database
            in the case of wikis.
        is_inline:
          type: boolean
          description: Whether the data source is inline.
        in_trash:
          type: boolean
          description: Whether the data source is in the trash.
        created_time:
          type: string
          format: date-time
          description: The time when the data source was created.
        last_edited_time:
          type: string
          format: date-time
          description: The time when the data source was last edited.
        created_by:
          $ref: '#/components/schemas/partialUserObjectResponse'
          description: The user who created the data source.
        last_edited_by:
          $ref: '#/components/schemas/partialUserObjectResponse'
          description: The user who last edited the data source.
        properties:
          type: object
          additionalProperties:
            $ref: '#/components/schemas/databasePropertyConfigResponse'
          description: The properties schema of the data source.
        icon:
          oneOf:
            - $ref: '#/components/schemas/pageIconResponse'
            - type: 'null'
          description: The icon of the data source.
        cover:
          oneOf:
            - $ref: '#/components/schemas/pageCoverResponse'
            - type: 'null'
          description: The cover of the data source.
        url:
          type: string
          description: The URL of the data source.
        public_url:
          oneOf:
            - type: string
            - type: 'null'
          description: The public URL of the data source if it is publicly accessible.
      additionalProperties: false
      required:
        - object
        - id
        - title
        - description
        - parent
        - database_parent
        - is_inline
        - in_trash
        - created_time
        - last_edited_time
        - created_by
        - last_edited_by
        - properties
        - icon
        - cover
        - url
        - public_url
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
    propertyOrTimestampFilter:
      anyOf:
        - $ref: '#/components/schemas/propertyFilter'
        - $ref: '#/components/schemas/timestampFilter'
    propertyOrTimestampFilterArray:
      type: array
      items:
        $ref: '#/components/schemas/propertyOrTimestampFilter'
      maxItems: 100
    textPropertyFilter:
      anyOf:
        - anyOf:
            - type: object
              properties:
                equals:
                  type: string
              required:
                - equals
            - type: object
              properties:
                does_not_equal:
                  type: string
              required:
                - does_not_equal
            - type: object
              properties:
                contains:
                  type: string
              required:
                - contains
            - type: object
              properties:
                does_not_contain:
                  type: string
              required:
                - does_not_contain
            - type: object
              properties:
                starts_with:
                  type: string
              required:
                - starts_with
            - type: object
              properties:
                ends_with:
                  type: string
              required:
                - ends_with
        - $ref: '#/components/schemas/existencePropertyFilter'
    numberPropertyFilter:
      anyOf:
        - anyOf:
            - type: object
              properties:
                equals:
                  type: number
              required:
                - equals
            - type: object
              properties:
                does_not_equal:
                  type: number
              required:
                - does_not_equal
            - type: object
              properties:
                greater_than:
                  type: number
              required:
                - greater_than
            - type: object
              properties:
                less_than:
                  type: number
              required:
                - less_than
            - type: object
              properties:
                greater_than_or_equal_to:
                  type: number
              required:
                - greater_than_or_equal_to
            - type: object
              properties:
                less_than_or_equal_to:
                  type: number
              required:
                - less_than_or_equal_to
        - $ref: '#/components/schemas/existencePropertyFilter'
    checkboxPropertyFilter:
      anyOf:
        - type: object
          properties:
            equals:
              type: boolean
          required:
            - equals
        - type: object
          properties:
            does_not_equal:
              type: boolean
          required:
            - does_not_equal
    selectPropertyFilter:
      anyOf:
        - anyOf:
            - type: object
              properties:
                equals:
                  $ref: '#/components/schemas/stringOrStringArray'
              required:
                - equals
            - type: object
              properties:
                does_not_equal:
                  $ref: '#/components/schemas/stringOrStringArray'
              required:
                - does_not_equal
        - $ref: '#/components/schemas/existencePropertyFilter'
    multiSelectPropertyFilter:
      anyOf:
        - anyOf:
            - type: object
              properties:
                contains:
                  $ref: '#/components/schemas/stringOrStringArray'
              required:
                - contains
            - type: object
              properties:
                does_not_contain:
                  $ref: '#/components/schemas/stringOrStringArray'
              required:
                - does_not_contain
        - $ref: '#/components/schemas/existencePropertyFilter'
    statusPropertyFilter:
      anyOf:
        - anyOf:
            - type: object
              properties:
                equals:
                  $ref: '#/components/schemas/stringOrStringArray'
              required:
                - equals
            - type: object
              properties:
                does_not_equal:
                  $ref: '#/components/schemas/stringOrStringArray'
              required:
                - does_not_equal
        - $ref: '#/components/schemas/existencePropertyFilter'
    datePropertyFilter:
      anyOf:
        - anyOf:
            - type: object
              properties:
                equals:
                  $ref: '#/components/schemas/dateOrRelativeDate'
              required:
                - equals
            - type: object
              properties:
                before:
                  $ref: '#/components/schemas/dateOrRelativeDate'
              required:
                - before
            - type: object
              properties:
                after:
                  $ref: '#/components/schemas/dateOrRelativeDate'
              required:
                - after
            - type: object
              properties:
                on_or_before:
                  $ref: '#/components/schemas/dateOrRelativeDate'
              required:
                - on_or_before
            - type: object
              properties:
                on_or_after:
                  $ref: '#/components/schemas/dateOrRelativeDate'
              required:
                - on_or_after
            - type: object
              properties:
                this_week:
                  $ref: '#/components/schemas/emptyObject'
              required:
                - this_week
            - type: object
              properties:
                past_week:
                  $ref: '#/components/schemas/emptyObject'
              required:
                - past_week
            - type: object
              properties:
                past_month:
                  $ref: '#/components/schemas/emptyObject'
              required:
                - past_month
            - type: object
              properties:
                past_year:
                  $ref: '#/components/schemas/emptyObject'
              required:
                - past_year
            - type: object
              properties:
                next_week:
                  $ref: '#/components/schemas/emptyObject'
              required:
                - next_week
            - type: object
              properties:
                next_month:
                  $ref: '#/components/schemas/emptyObject'
              required:
                - next_month
            - type: object
              properties:
                next_year:
                  $ref: '#/components/schemas/emptyObject'
              required:
                - next_year
        - $ref: '#/components/schemas/existencePropertyFilter'
    peoplePropertyFilter:
      anyOf:
        - anyOf:
            - type: object
              properties:
                contains:
                  $ref: '#/components/schemas/personIdOrMe'
              required:
                - contains
            - type: object
              properties:
                does_not_contain:
                  $ref: '#/components/schemas/personIdOrMe'
              required:
                - does_not_contain
        - $ref: '#/components/schemas/existencePropertyFilter'
    existencePropertyFilter:
      anyOf:
        - type: object
          properties:
            is_empty:
              type: boolean
              const: true
          required:
            - is_empty
        - type: object
          properties:
            is_not_empty:
              type: boolean
              const: true
          required:
            - is_not_empty
    relationPropertyFilter:
      anyOf:
        - anyOf:
            - type: object
              properties:
                contains:
                  $ref: '#/components/schemas/idRequest'
              required:
                - contains
            - type: object
              properties:
                does_not_contain:
                  $ref: '#/components/schemas/idRequest'
              required:
                - does_not_contain
        - $ref: '#/components/schemas/existencePropertyFilter'
    formulaPropertyFilter:
      anyOf:
        - type: object
          properties:
            string:
              $ref: '#/components/schemas/textPropertyFilter'
          required:
            - string
        - type: object
          properties:
            checkbox:
              $ref: '#/components/schemas/checkboxPropertyFilter'
          required:
            - checkbox
        - type: object
          properties:
            number:
              $ref: '#/components/schemas/numberPropertyFilter'
          required:
            - number
        - type: object
          properties:
            date:
              $ref: '#/components/schemas/datePropertyFilter'
          required:
            - date
    rollupPropertyFilter:
      anyOf:
        - type: object
          properties:
            any:
              $ref: '#/components/schemas/rollupSubfilterPropertyFilter'
          required:
            - any
        - type: object
          properties:
            none:
              $ref: '#/components/schemas/rollupSubfilterPropertyFilter'
          required:
            - none
        - type: object
          properties:
            every:
              $ref: '#/components/schemas/rollupSubfilterPropertyFilter'
          required:
            - every
        - type: object
          properties:
            date:
              $ref: '#/components/schemas/datePropertyFilter'
          required:
            - date
        - type: object
          properties:
            number:
              $ref: '#/components/schemas/numberPropertyFilter'
          required:
            - number
    verificationPropertyStatusFilter:
      type: object
      properties:
        status:
          type: string
          enum:
            - verified
            - expired
            - none
      additionalProperties: false
      required:
        - status
    timestampCreatedTimeFilter:
      title: Created Time
      type: object
      properties:
        created_time:
          $ref: '#/components/schemas/datePropertyFilter'
        timestamp:
          type: string
          const: created_time
        type:
          type: string
          const: created_time
      additionalProperties: false
      required:
        - created_time
        - timestamp
    timestampLastEditedTimeFilter:
      title: Last Edited Time
      type: object
      properties:
        last_edited_time:
          $ref: '#/components/schemas/datePropertyFilter'
        timestamp:
          type: string
          const: last_edited_time
        type:
          type: string
          const: last_edited_time
      additionalProperties: false
      required:
        - last_edited_time
        - timestamp
    idResponse:
      type: string
      format: uuid
    parentForBlockBasedObjectResponse:
      oneOf:
        - $ref: '#/components/schemas/databaseParentResponse'
        - $ref: '#/components/schemas/dataSourceParentResponse'
        - $ref: '#/components/schemas/pageIdParentForBlockBasedObjectResponse'
        - $ref: '#/components/schemas/blockIdParentForBlockBasedObjectResponse'
        - $ref: '#/components/schemas/workspaceParentForBlockBasedObjectResponse'
    pagePropertyValueWithIdResponse:
      allOf:
        - $ref: '#/components/schemas/idObjectResponse'
        - oneOf:
            - $ref: '#/components/schemas/simpleOrArrayPropertyValueResponse'
            - $ref: '#/components/schemas/partialRollupPropertyResponse'
    pageIconResponse:
      oneOf:
        - $ref: '#/components/schemas/emojiPageIconResponse'
        - $ref: '#/components/schemas/filePageIconResponse'
        - $ref: '#/components/schemas/externalPageIconResponse'
        - $ref: '#/components/schemas/customEmojiPageIconResponse'
        - $ref: '#/components/schemas/iconPageIconResponse'
    pageCoverResponse:
      oneOf:
        - $ref: '#/components/schemas/filePageCoverResponse'
        - $ref: '#/components/schemas/externalPageCoverResponse'
    partialUserObjectResponse:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/idResponse'
        object:
          type: string
          const: user
          description: Always `user`
      additionalProperties: false
      required:
        - id
        - object
    databasePropertyConfigResponse:
      allOf:
        - $ref: '#/components/schemas/databasePropertyConfigResponseCommon'
        - oneOf:
            - $ref: '#/components/schemas/numberDatabasePropertyConfigResponse'
            - $ref: '#/components/schemas/formulaDatabasePropertyConfigResponse'
            - $ref: '#/components/schemas/selectDatabasePropertyConfigResponse'
            - $ref: '#/components/schemas/multiSelectDatabasePropertyConfigResponse'
            - $ref: '#/components/schemas/statusDatabasePropertyConfigResponse'
            - $ref: '#/components/schemas/relationDatabasePropertyConfigResponse'
            - $ref: '#/components/schemas/rollupDatabasePropertyConfigResponse'
            - $ref: '#/components/schemas/uniqueIdDatabasePropertyConfigResponse'
            - $ref: '#/components/schemas/titleDatabasePropertyConfigResponse'
            - $ref: '#/components/schemas/richTextDatabasePropertyConfigResponse'
            - $ref: '#/components/schemas/urlDatabasePropertyConfigResponse'
            - $ref: '#/components/schemas/peopleDatabasePropertyConfigResponse'
            - $ref: '#/components/schemas/filesDatabasePropertyConfigResponse'
            - $ref: '#/components/schemas/emailDatabasePropertyConfigResponse'
            - $ref: '#/components/schemas/phoneNumberDatabasePropertyConfigResponse'
            - $ref: '#/components/schemas/dateDatabasePropertyConfigResponse'
            - $ref: '#/components/schemas/checkboxDatabasePropertyConfigResponse'
            - $ref: '#/components/schemas/createdByDatabasePropertyConfigResponse'
            - $ref: '#/components/schemas/createdTimeDatabasePropertyConfigResponse'
            - $ref: '#/components/schemas/lastEditedByDatabasePropertyConfigResponse'
            - $ref: >-
                #/components/schemas/lastEditedTimeDatabasePropertyConfigResponse
    richTextItemResponse:
      allOf:
        - $ref: '#/components/schemas/richTextItemResponseCommon'
        - oneOf:
            - $ref: '#/components/schemas/textRichTextItemResponse'
            - $ref: '#/components/schemas/mentionRichTextItemResponse'
            - $ref: '#/components/schemas/equationRichTextItemResponse'
    parentOfDataSourceResponse:
      oneOf:
        - $ref: '#/components/schemas/databaseParentResponse'
        - $ref: '#/components/schemas/dataSourceParentResponse'
      description: >-
        The parent of the data source. This is typically a database
        (`database_id`), but for externally synced data sources, can be another
        data source (`data_source_id`).
    parentOfDatabaseResponse:
      oneOf:
        - $ref: '#/components/schemas/pageIdParentForBlockBasedObjectResponse'
        - $ref: '#/components/schemas/workspaceParentForBlockBasedObjectResponse'
        - $ref: '#/components/schemas/databaseParentResponse'
        - $ref: '#/components/schemas/blockIdParentForBlockBasedObjectResponse'
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
    stringOrStringArray:
      anyOf:
        - type: string
        - type: array
          items:
            type: string
    dateOrRelativeDate:
      anyOf:
        - type: string
          format: date
        - $ref: '#/components/schemas/relativeDateValue'
    personIdOrMe:
      anyOf:
        - $ref: '#/components/schemas/idRequest'
        - type: string
          const: me
    rollupSubfilterPropertyFilter:
      anyOf:
        - type: object
          properties:
            rich_text:
              $ref: '#/components/schemas/textPropertyFilter'
          required:
            - rich_text
        - type: object
          properties:
            number:
              $ref: '#/components/schemas/numberPropertyFilter'
          required:
            - number
        - type: object
          properties:
            checkbox:
              $ref: '#/components/schemas/checkboxPropertyFilter'
          required:
            - checkbox
        - type: object
          properties:
            select:
              $ref: '#/components/schemas/selectPropertyFilter'
          required:
            - select
        - type: object
          properties:
            multi_select:
              $ref: '#/components/schemas/multiSelectPropertyFilter'
          required:
            - multi_select
        - type: object
          properties:
            relation:
              $ref: '#/components/schemas/relationPropertyFilter'
          required:
            - relation
        - type: object
          properties:
            date:
              $ref: '#/components/schemas/datePropertyFilter'
          required:
            - date
        - type: object
          properties:
            people:
              $ref: '#/components/schemas/peoplePropertyFilter'
          required:
            - people
        - type: object
          properties:
            files:
              $ref: '#/components/schemas/existencePropertyFilter'
          required:
            - files
        - type: object
          properties:
            status:
              $ref: '#/components/schemas/statusPropertyFilter'
          required:
            - status
    databaseParentResponse:
      type: object
      properties:
        type:
          type: string
          const: database_id
          description: The parent type.
        database_id:
          $ref: '#/components/schemas/idResponse'
          description: The ID of the parent database.
      additionalProperties: false
      required:
        - type
        - database_id
    dataSourceParentResponse:
      type: object
      properties:
        type:
          type: string
          const: data_source_id
          description: The parent type.
        data_source_id:
          $ref: '#/components/schemas/idResponse'
          description: The ID of the parent data source.
        database_id:
          $ref: '#/components/schemas/idResponse'
          description: The ID of the data source's parent database.
      additionalProperties: false
      required:
        - type
        - data_source_id
        - database_id
    pageIdParentForBlockBasedObjectResponse:
      type: object
      properties:
        type:
          type: string
          const: page_id
          description: The parent type.
        page_id:
          $ref: '#/components/schemas/idResponse'
          description: The ID of the parent page.
      additionalProperties: false
      required:
        - type
        - page_id
    blockIdParentForBlockBasedObjectResponse:
      type: object
      properties:
        type:
          type: string
          const: block_id
          description: The parent type.
        block_id:
          $ref: '#/components/schemas/idResponse'
          description: The ID of the parent block.
      additionalProperties: false
      required:
        - type
        - block_id
    workspaceParentForBlockBasedObjectResponse:
      type: object
      properties:
        type:
          type: string
          const: workspace
          description: The parent type.
        workspace:
          type: boolean
          const: true
          description: Always true for workspace parent.
      additionalProperties: false
      required:
        - type
        - workspace
    idObjectResponse:
      type: object
      properties:
        id:
          type: string
      required:
        - id
    simpleOrArrayPropertyValueResponse:
      oneOf:
        - $ref: '#/components/schemas/simplePropertyValueResponse'
        - $ref: '#/components/schemas/arrayBasedPropertyValueResponse'
    partialRollupPropertyResponse:
      type: object
      properties:
        type:
          type: string
          const: rollup
          description: Always `rollup`
        rollup:
          $ref: '#/components/schemas/partialRollupValueResponse'
      additionalProperties: false
      required:
        - type
        - rollup
    emojiPageIconResponse:
      type: object
      properties:
        type:
          type: string
          const: emoji
          description: Type of icon. In this case, an emoji.
        emoji:
          $ref: '#/components/schemas/emojiRequest'
          description: The emoji character used as the icon.
      additionalProperties: false
      required:
        - type
        - emoji
      title: Emoji
    filePageIconResponse:
      type: object
      properties:
        type:
          type: string
          const: file
          description: Type of icon. In this case, a file.
        file:
          $ref: '#/components/schemas/internalFileResponse'
          description: The file URL for the icon.
      additionalProperties: false
      required:
        - type
        - file
      title: File
    externalPageIconResponse:
      type: object
      properties:
        type:
          type: string
          const: external
          description: Type of icon. In this case, an external URL.
        external:
          type: object
          properties:
            url:
              type: string
              description: The URL of the external file or resource.
          additionalProperties: false
          required:
            - url
          description: The external URL for the icon.
      additionalProperties: false
      required:
        - type
        - external
      title: External
    customEmojiPageIconResponse:
      type: object
      properties:
        type:
          type: string
          const: custom_emoji
          description: Type of icon. In this case, a custom emoji.
        custom_emoji:
          $ref: '#/components/schemas/customEmojiResponse'
          description: The custom emoji details for the icon.
      additionalProperties: false
      required:
        - type
        - custom_emoji
      title: Custom Emoji
    iconPageIconResponse:
      type: object
      properties:
        type:
          type: string
          const: icon
          description: Type of icon. In this case, a Notion native icon.
        icon:
          $ref: '#/components/schemas/noticonIconResponse'
          description: The Notion native icon, specified by name and color.
      additionalProperties: false
      required:
        - type
        - icon
      title: Icon
    filePageCoverResponse:
      type: object
      properties:
        type:
          type: string
          const: file
          description: Type of cover. In this case, a file.
        file:
          $ref: '#/components/schemas/internalFileResponse'
          description: The file URL for the cover.
      additionalProperties: false
      required:
        - type
        - file
      title: File
    externalPageCoverResponse:
      type: object
      properties:
        type:
          type: string
          const: external
          description: Type of cover. In this case, an external URL.
        external:
          type: object
          properties:
            url:
              type: string
              description: The URL of the external file or resource.
          additionalProperties: false
          required:
            - url
          description: The external URL for the cover.
      additionalProperties: false
      required:
        - type
        - external
      title: External
    databasePropertyConfigResponseCommon:
      type: object
      properties:
        id:
          type: string
          description: The ID of the property.
        name:
          type: string
          description: The name of the property.
        description:
          oneOf:
            - $ref: '#/components/schemas/propertyDescriptionRequest'
            - type: 'null'
          description: The description of the property.
      additionalProperties: false
      required:
        - id
        - name
        - description
    numberDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: number
          description: Always `number`
        number:
          type: object
          properties:
            format:
              $ref: '#/components/schemas/numberFormat'
              description: The number format for the property.
          additionalProperties: false
          required:
            - format
      required:
        - type
        - number
      title: Number
    formulaDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: formula
          description: Always `formula`
        formula:
          type: object
          properties:
            expression:
              type: string
          additionalProperties: false
          required:
            - expression
      required:
        - type
        - formula
      title: Formula
    selectDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: select
          description: Always `select`
        select:
          type: object
          properties:
            options:
              type: array
              items:
                $ref: '#/components/schemas/selectPropertyResponse'
              maxItems: 100
          additionalProperties: false
          required:
            - options
      required:
        - type
        - select
      title: Select
    multiSelectDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: multi_select
          description: Always `multi_select`
        multi_select:
          type: object
          properties:
            options:
              type: array
              items:
                $ref: '#/components/schemas/selectPropertyResponse'
              maxItems: 100
          additionalProperties: false
          required:
            - options
      required:
        - type
        - multi_select
      title: Multi Select
    statusDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: status
          description: Always `status`
        status:
          type: object
          properties:
            options:
              type: array
              items:
                $ref: '#/components/schemas/statusPropertyResponse'
              maxItems: 100
              description: The options for the status property.
            groups:
              type: array
              items:
                type: object
                properties:
                  id:
                    type: string
                    description: The ID of the status group.
                  name:
                    type: string
                    description: The name of the status group.
                  color:
                    $ref: '#/components/schemas/selectColor'
                    description: The color of the status group.
                  option_ids:
                    type: array
                    items:
                      type: string
                    maxItems: 100
                    description: The IDs of the status options in this group.
                additionalProperties: false
                required:
                  - id
                  - name
                  - color
                  - option_ids
              maxItems: 100
              description: The groups for the status property.
          additionalProperties: false
          required:
            - options
            - groups
      required:
        - type
        - status
      title: Status
    relationDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: relation
          description: Always `relation`
        relation:
          $ref: '#/components/schemas/databasePropertyRelationConfigResponse'
      required:
        - type
        - relation
      title: Relation
    rollupDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: rollup
          description: Always `rollup`
        rollup:
          type: object
          properties:
            function:
              $ref: '#/components/schemas/rollupFunction'
              description: >-
                The function to use for the rollup, e.g. count, count_values,
                percent_not_empty, max.
            rollup_property_name:
              type: string
            relation_property_name:
              type: string
            rollup_property_id:
              type: string
            relation_property_id:
              type: string
          additionalProperties: false
          required:
            - function
            - rollup_property_name
            - relation_property_name
            - rollup_property_id
            - relation_property_id
      required:
        - type
        - rollup
      title: Rollup
    uniqueIdDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: unique_id
          description: Always `unique_id`
        unique_id:
          type: object
          properties:
            prefix:
              oneOf:
                - type: string
                - type: 'null'
              description: The prefix for the unique ID.
          additionalProperties: false
          required:
            - prefix
      required:
        - type
        - unique_id
      title: Unique Id
    titleDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: title
          description: Always `title`
        title:
          $ref: '#/components/schemas/emptyObject'
      required:
        - type
        - title
      title: Title
    richTextDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: rich_text
          description: Always `rich_text`
        rich_text:
          $ref: '#/components/schemas/emptyObject'
      required:
        - type
        - rich_text
      title: Rich Text
    urlDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: url
          description: Always `url`
        url:
          $ref: '#/components/schemas/emptyObject'
      required:
        - type
        - url
      title: Url
    peopleDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: people
          description: Always `people`
        people:
          $ref: '#/components/schemas/emptyObject'
      required:
        - type
        - people
      title: People
    filesDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: files
          description: Always `files`
        files:
          $ref: '#/components/schemas/emptyObject'
      required:
        - type
        - files
      title: Files
    emailDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: email
          description: Always `email`
        email:
          $ref: '#/components/schemas/emptyObject'
      required:
        - type
        - email
      title: Email
    phoneNumberDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: phone_number
          description: Always `phone_number`
        phone_number:
          $ref: '#/components/schemas/emptyObject'
      required:
        - type
        - phone_number
      title: Phone Number
    dateDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: date
          description: Always `date`
        date:
          $ref: '#/components/schemas/emptyObject'
      required:
        - type
        - date
      title: Date
    checkboxDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: checkbox
          description: Always `checkbox`
        checkbox:
          $ref: '#/components/schemas/emptyObject'
      required:
        - type
        - checkbox
      title: Checkbox
    createdByDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: created_by
          description: Always `created_by`
        created_by:
          $ref: '#/components/schemas/emptyObject'
      required:
        - type
        - created_by
      title: Created By
    createdTimeDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: created_time
          description: Always `created_time`
        created_time:
          $ref: '#/components/schemas/emptyObject'
      required:
        - type
        - created_time
      title: Created Time
    lastEditedByDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: last_edited_by
          description: Always `last_edited_by`
        last_edited_by:
          $ref: '#/components/schemas/emptyObject'
      required:
        - type
        - last_edited_by
      title: Last Edited By
    lastEditedTimeDatabasePropertyConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: last_edited_time
          description: Always `last_edited_time`
        last_edited_time:
          $ref: '#/components/schemas/emptyObject'
      required:
        - type
        - last_edited_time
      title: Last Edited Time
    richTextItemResponseCommon:
      type: object
      properties:
        plain_text:
          type: string
          description: The plain text content of the rich text object, without any styling.
        href:
          oneOf:
            - type: string
            - type: 'null'
          description: A URL that the rich text object links to or mentions.
        annotations:
          $ref: '#/components/schemas/annotationResponse'
          description: >-
            All rich text objects contain an annotations object that sets the
            styling for the rich text.
      additionalProperties: false
      required:
        - plain_text
        - href
        - annotations
    textRichTextItemResponse:
      type: object
      properties:
        type:
          type: string
          const: text
          description: Always `text`
        text:
          type: object
          properties:
            content:
              type: string
              maxLength: 2000
              description: The actual text content of the text.
            link:
              oneOf:
                - type: object
                  properties:
                    url:
                      type: string
                      examples:
                        - https://www.notion.com
                      description: The URL of the link.
                  additionalProperties: false
                  required:
                    - url
                - type: 'null'
              description: >-
                An object with information about any inline link in this text,
                if included.
          additionalProperties: false
          required:
            - content
            - link
          description: >-
            If a rich text object's type value is `text`, then the corresponding
            text field contains an object including the text content and any
            inline link.
      required:
        - type
        - text
      title: Text
    mentionRichTextItemResponse:
      type: object
      properties:
        type:
          type: string
          const: mention
          description: Always `mention`
        mention:
          oneOf:
            - type: object
              properties:
                type:
                  type: string
                  const: user
                  description: Always `user`
                user:
                  $ref: '#/components/schemas/userValueResponse'
                  description: Details of the user mention.
              additionalProperties: false
              required:
                - type
                - user
              title: User
            - type: object
              properties:
                type:
                  type: string
                  const: date
                  description: Always `date`
                date:
                  $ref: '#/components/schemas/dateResponse'
                  description: Details of the date mention.
              additionalProperties: false
              required:
                - type
                - date
              title: Date
            - type: object
              properties:
                type:
                  type: string
                  const: link_preview
                  description: Always `link_preview`
                link_preview:
                  $ref: '#/components/schemas/linkPreviewMentionResponse'
                  description: Details of the link preview mention.
              additionalProperties: false
              required:
                - type
                - link_preview
              title: Link Preview
            - type: object
              properties:
                type:
                  type: string
                  const: link_mention
                  description: Always `link_mention`
                link_mention:
                  $ref: '#/components/schemas/linkMentionResponse'
                  description: Details of the link mention.
              additionalProperties: false
              required:
                - type
                - link_mention
              title: Link Mention
            - type: object
              properties:
                type:
                  type: string
                  const: page
                  description: Always `page`
                page:
                  type: object
                  properties:
                    id:
                      $ref: '#/components/schemas/idResponse'
                      description: The ID of the page in the mention.
                  additionalProperties: false
                  required:
                    - id
                  description: Details of the page mention.
              additionalProperties: false
              required:
                - type
                - page
              title: Page
            - type: object
              properties:
                type:
                  type: string
                  const: database
                  description: Always `database`
                database:
                  type: object
                  properties:
                    id:
                      $ref: '#/components/schemas/idResponse'
                      description: The ID of the database in the mention.
                  additionalProperties: false
                  required:
                    - id
                  description: Details of the database mention.
              additionalProperties: false
              required:
                - type
                - database
              title: Database
            - type: object
              properties:
                type:
                  type: string
                  const: template_mention
                  description: Always `template_mention`
                template_mention:
                  $ref: '#/components/schemas/templateMentionResponse'
                  description: Details of the template mention.
              additionalProperties: false
              required:
                - type
                - template_mention
              title: Template Mention
            - type: object
              properties:
                type:
                  type: string
                  const: custom_emoji
                  description: Always `custom_emoji`
                custom_emoji:
                  $ref: '#/components/schemas/customEmojiResponse'
                  description: Details of the custom emoji mention.
              additionalProperties: false
              required:
                - type
                - custom_emoji
              title: Custom Emoji
          description: >-
            Mention objects represent an inline mention of a database, date,
            link preview mention, page, template mention, or user. A mention is
            created in the Notion UI when a user types `@` followed by the name
            of the reference.
      required:
        - type
        - mention
      title: Mention
    equationRichTextItemResponse:
      type: object
      properties:
        type:
          type: string
          const: equation
          description: Always `equation`
        equation:
          type: object
          properties:
            expression:
              type: string
              examples:
                - e=mc^2
              description: A KaTeX compatible string.
          additionalProperties: false
          required:
            - expression
          description: >-
            Notion supports inline LaTeX equations as rich text objects with a
            type value of `equation`.
      required:
        - type
        - equation
      title: Equation
    relativeDateValue:
      type: string
      enum:
        - today
        - tomorrow
        - yesterday
        - one_week_ago
        - one_week_from_now
        - one_month_ago
        - one_month_from_now
    simplePropertyValueResponse:
      oneOf:
        - $ref: '#/components/schemas/numberSimplePropertyValueResponse'
        - $ref: '#/components/schemas/urlSimplePropertyValueResponse'
        - $ref: '#/components/schemas/selectSimplePropertyValueResponse'
        - $ref: '#/components/schemas/multiSelectSimplePropertyValueResponse'
        - $ref: '#/components/schemas/statusSimplePropertyValueResponse'
        - $ref: '#/components/schemas/dateSimplePropertyValueResponse'
        - $ref: '#/components/schemas/emailSimplePropertyValueResponse'
        - $ref: '#/components/schemas/phoneNumberSimplePropertyValueResponse'
        - $ref: '#/components/schemas/checkboxSimplePropertyValueResponse'
        - $ref: '#/components/schemas/filesSimplePropertyValueResponse'
        - $ref: '#/components/schemas/createdBySimplePropertyValueResponse'
        - $ref: '#/components/schemas/createdTimeSimplePropertyValueResponse'
        - $ref: '#/components/schemas/lastEditedBySimplePropertyValueResponse'
        - $ref: '#/components/schemas/lastEditedTimeSimplePropertyValueResponse'
        - $ref: '#/components/schemas/formulaSimplePropertyValueResponse'
        - $ref: '#/components/schemas/buttonSimplePropertyValueResponse'
        - $ref: '#/components/schemas/uniqueIdSimplePropertyValueResponse'
        - $ref: '#/components/schemas/verificationSimplePropertyValueResponse'
        - $ref: '#/components/schemas/placeSimplePropertyValueResponse'
    arrayBasedPropertyValueResponse:
      oneOf:
        - $ref: '#/components/schemas/titleArrayBasedPropertyValueResponse'
        - $ref: '#/components/schemas/richTextArrayBasedPropertyValueResponse'
        - $ref: '#/components/schemas/peopleArrayBasedPropertyValueResponse'
        - $ref: '#/components/schemas/relationArrayBasedPropertyValueResponse'
    partialRollupValueResponse:
      allOf:
        - $ref: '#/components/schemas/partialRollupValueResponseCommon'
        - oneOf:
            - $ref: '#/components/schemas/numberPartialRollupValueResponse'
            - $ref: '#/components/schemas/datePartialRollupValueResponse'
            - $ref: '#/components/schemas/arrayPartialRollupValueResponse'
    emojiRequest:
      type: string
    internalFileResponse:
      type: object
      properties:
        url:
          type: string
          description: The URL of the file.
        expiry_time:
          type: string
          format: date-time
          description: The time when the URL will expire.
      additionalProperties: false
      required:
        - url
        - expiry_time
    customEmojiResponse:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/idResponse'
          description: The ID of the custom emoji.
        name:
          type: string
          description: The name of the custom emoji.
        url:
          type: string
          description: The URL of the custom emoji.
      additionalProperties: false
      required:
        - id
        - name
        - url
    noticonIconResponse:
      type: object
      properties:
        name:
          $ref: '#/components/schemas/noticonName'
          description: >-
            The name of the Notion icon (e.g. pizza, meeting, home). See the
            Notion icon picker for valid names.
        color:
          $ref: '#/components/schemas/noticonColor'
          description: >-
            The color variant of the icon. Valid values: gray, lightgray, brown,
            yellow, orange, green, blue, purple, pink, red.
      additionalProperties: false
      required:
        - name
        - color
    propertyDescriptionRequest:
      type: string
      minLength: 1
      maxLength: 280
    numberFormat:
      type: string
    selectPropertyResponse:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        color:
          $ref: '#/components/schemas/selectColor'
        description:
          oneOf:
            - type: string
            - type: 'null'
      additionalProperties: false
      required:
        - id
        - name
        - color
        - description
    statusPropertyResponse:
      type: object
      properties:
        id:
          type: string
          description: The ID of the status option.
        name:
          type: string
          description: The name of the status option.
        color:
          $ref: '#/components/schemas/selectColor'
          description: The color of the status option.
        description:
          oneOf:
            - type: string
            - type: 'null'
          description: The description of the status option.
      additionalProperties: false
      required:
        - id
        - name
        - color
        - description
    selectColor:
      type: string
      enum:
        - default
        - gray
        - brown
        - orange
        - yellow
        - green
        - blue
        - purple
        - pink
        - red
      description: >-
        One of: `default`, `gray`, `brown`, `orange`, `yellow`, `green`, `blue`,
        `purple`, `pink`, `red`
    databasePropertyRelationConfigResponse:
      allOf:
        - $ref: '#/components/schemas/databasePropertyRelationConfigResponseCommon'
        - oneOf:
            - $ref: >-
                #/components/schemas/singlePropertyDatabasePropertyRelationConfigResponse
            - $ref: >-
                #/components/schemas/dualPropertyDatabasePropertyRelationConfigResponse
    rollupFunction:
      type: string
      enum:
        - count
        - count_values
        - empty
        - not_empty
        - unique
        - show_unique
        - percent_empty
        - percent_not_empty
        - sum
        - average
        - median
        - min
        - max
        - range
        - earliest_date
        - latest_date
        - date_range
        - checked
        - unchecked
        - percent_checked
        - percent_unchecked
        - count_per_group
        - percent_per_group
        - show_original
    annotationResponse:
      type: object
      properties:
        bold:
          type: boolean
        italic:
          type: boolean
        strikethrough:
          type: boolean
        underline:
          type: boolean
        code:
          type: boolean
        color:
          $ref: '#/components/schemas/apiColor'
      additionalProperties: false
      required:
        - bold
        - italic
        - strikethrough
        - underline
        - code
        - color
    userValueResponse:
      oneOf:
        - $ref: '#/components/schemas/partialUserObjectResponse'
        - $ref: '#/components/schemas/userObjectResponse'
    dateResponse:
      type: object
      properties:
        start:
          type: string
          format: date
          description: The start date of the date object.
        end:
          oneOf:
            - type: string
              format: date
            - type: 'null'
          description: The end date of the date object, if any.
        time_zone:
          oneOf:
            - $ref: '#/components/schemas/timeZoneRequest'
            - type: 'null'
          description: The time zone of the date object.
      additionalProperties: false
      required:
        - start
        - end
        - time_zone
    linkPreviewMentionResponse:
      type: object
      properties:
        url:
          type: string
          description: The URL of the link preview mention.
      additionalProperties: false
      required:
        - url
    linkMentionResponse:
      type: object
      properties:
        href:
          type: string
          description: The href of the link mention.
        title:
          type: string
          description: The title of the link.
        description:
          type: string
          description: The description of the link.
        link_author:
          type: string
          description: The author of the link.
        link_provider:
          type: string
          description: The provider of the link.
        thumbnail_url:
          type: string
          description: The thumbnail URL of the link.
        icon_url:
          type: string
          description: The icon URL of the link.
        iframe_url:
          type: string
          description: The iframe URL of the link.
        height:
          type: integer
          description: The height of the link preview iframe.
        padding:
          type: integer
          description: The padding of the link preview iframe.
        padding_top:
          type: integer
          description: The top padding of the link preview iframe.
      additionalProperties: false
      required:
        - href
    templateMentionResponse:
      oneOf:
        - $ref: '#/components/schemas/templateMentionDateTemplateMentionResponse'
        - $ref: '#/components/schemas/templateMentionUserTemplateMentionResponse'
    numberSimplePropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: number
          description: Always `number`
        number:
          oneOf:
            - type: number
            - type: 'null'
      additionalProperties: false
      required:
        - type
        - number
      title: Number
    urlSimplePropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: url
          description: Always `url`
        url:
          oneOf:
            - type: string
            - type: 'null'
      additionalProperties: false
      required:
        - type
        - url
      title: Url
    selectSimplePropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: select
          description: Always `select`
        select:
          oneOf:
            - $ref: '#/components/schemas/partialSelectPropertyValueResponse'
            - type: 'null'
      additionalProperties: false
      required:
        - type
        - select
      title: Select
    multiSelectSimplePropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: multi_select
          description: Always `multi_select`
        multi_select:
          type: array
          items:
            $ref: '#/components/schemas/partialSelectPropertyValueResponse'
          maxItems: 100
      additionalProperties: false
      required:
        - type
        - multi_select
      title: Multi Select
    statusSimplePropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: status
          description: Always `status`
        status:
          oneOf:
            - $ref: '#/components/schemas/partialSelectPropertyValueResponse'
            - type: 'null'
      additionalProperties: false
      required:
        - type
        - status
      title: Status
    dateSimplePropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: date
          description: Always `date`
        date:
          oneOf:
            - $ref: '#/components/schemas/dateResponse'
            - type: 'null'
      additionalProperties: false
      required:
        - type
        - date
      title: Date
    emailSimplePropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: email
          description: Always `email`
        email:
          oneOf:
            - type: string
            - type: 'null'
      additionalProperties: false
      required:
        - type
        - email
      title: Email
    phoneNumberSimplePropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: phone_number
          description: Always `phone_number`
        phone_number:
          oneOf:
            - type: string
            - type: 'null'
      additionalProperties: false
      required:
        - type
        - phone_number
      title: Phone Number
    checkboxSimplePropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: checkbox
          description: Always `checkbox`
        checkbox:
          type: boolean
      additionalProperties: false
      required:
        - type
        - checkbox
      title: Checkbox
    filesSimplePropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: files
          description: Always `files`
        files:
          type: array
          items:
            $ref: '#/components/schemas/internalOrExternalFileWithNameResponse'
          maxItems: 100
      additionalProperties: false
      required:
        - type
        - files
      title: Files
    createdBySimplePropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: created_by
          description: Always `created_by`
        created_by:
          $ref: '#/components/schemas/userValueResponse'
      additionalProperties: false
      required:
        - type
        - created_by
      title: Created By
    createdTimeSimplePropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: created_time
          description: Always `created_time`
        created_time:
          type: string
          format: date-time
      additionalProperties: false
      required:
        - type
        - created_time
      title: Created Time
    lastEditedBySimplePropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: last_edited_by
          description: Always `last_edited_by`
        last_edited_by:
          $ref: '#/components/schemas/userValueResponse'
      additionalProperties: false
      required:
        - type
        - last_edited_by
      title: Last Edited By
    lastEditedTimeSimplePropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: last_edited_time
          description: Always `last_edited_time`
        last_edited_time:
          type: string
          format: date-time
      additionalProperties: false
      required:
        - type
        - last_edited_time
      title: Last Edited Time
    formulaSimplePropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: formula
          description: Always `formula`
        formula:
          $ref: '#/components/schemas/formulaPropertyValueResponse'
      additionalProperties: false
      required:
        - type
        - formula
      title: Formula
    buttonSimplePropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: button
          description: Always `button`
        button:
          $ref: '#/components/schemas/emptyObject'
      additionalProperties: false
      required:
        - type
        - button
      title: Button
    uniqueIdSimplePropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: unique_id
          description: Always `unique_id`
        unique_id:
          $ref: '#/components/schemas/uniqueIdPropertyValueResponse'
      additionalProperties: false
      required:
        - type
        - unique_id
      title: Unique Id
    verificationSimplePropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: verification
          description: Always `verification`
        verification:
          oneOf:
            - $ref: '#/components/schemas/verificationPropertyValueResponse'
            - type: 'null'
      additionalProperties: false
      required:
        - type
        - verification
      title: Verification
    placeSimplePropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: place
          description: Always `place`
        place:
          oneOf:
            - $ref: '#/components/schemas/placePropertyValueResponse'
            - type: 'null'
      additionalProperties: false
      required:
        - type
        - place
      title: Place
    titleArrayBasedPropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: title
          description: Always `title`
        title:
          type: array
          items:
            $ref: '#/components/schemas/richTextItemResponse'
          maxItems: 100
      additionalProperties: false
      required:
        - type
        - title
      title: Title
    richTextArrayBasedPropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: rich_text
          description: Always `rich_text`
        rich_text:
          type: array
          items:
            $ref: '#/components/schemas/richTextItemResponse'
          maxItems: 100
      additionalProperties: false
      required:
        - type
        - rich_text
      title: Rich Text
    peopleArrayBasedPropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: people
          description: Always `people`
        people:
          type: array
          items:
            oneOf:
              - $ref: '#/components/schemas/userValueResponse'
              - $ref: '#/components/schemas/groupObjectResponse'
          maxItems: 100
      additionalProperties: false
      required:
        - type
        - people
      title: People
    relationArrayBasedPropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: relation
          description: Always `relation`
        relation:
          type: array
          items:
            $ref: '#/components/schemas/relationItemPropertyValueResponse'
          maxItems: 100
      additionalProperties: false
      required:
        - type
        - relation
      title: Relation
    partialRollupValueResponseCommon:
      type: object
      properties:
        function:
          $ref: '#/components/schemas/rollupFunction'
          description: >-
            The function used for the rollup, e.g. count, count_values,
            percent_not_empty, max.
      additionalProperties: false
      required:
        - function
    numberPartialRollupValueResponse:
      type: object
      properties:
        type:
          type: string
          const: number
          description: Always `number`
        number:
          oneOf:
            - type: number
            - type: 'null'
      required:
        - type
        - number
      title: Number
    datePartialRollupValueResponse:
      type: object
      properties:
        type:
          type: string
          const: date
          description: Always `date`
        date:
          oneOf:
            - $ref: '#/components/schemas/dateResponse'
            - type: 'null'
      required:
        - type
        - date
      title: Date
    arrayPartialRollupValueResponse:
      type: object
      properties:
        type:
          type: string
          const: array
          description: Always `array`
        array:
          type: array
          items:
            $ref: '#/components/schemas/simpleOrArrayPropertyValueResponse'
          maxItems: 100
      required:
        - type
        - array
      title: Array
    noticonName:
      type: string
      examples:
        - pizza
        - meeting
        - home
        - star
        - robot
    noticonColor:
      type: string
      enum:
        - gray
        - lightgray
        - brown
        - yellow
        - orange
        - green
        - blue
        - purple
        - pink
        - red
      description: >-
        One of: `gray`, `lightgray`, `brown`, `yellow`, `orange`, `green`,
        `blue`, `purple`, `pink`, `red`
    databasePropertyRelationConfigResponseCommon:
      type: object
      properties:
        database_id:
          $ref: '#/components/schemas/idResponse'
        data_source_id:
          $ref: '#/components/schemas/idResponse'
      additionalProperties: false
      required:
        - database_id
        - data_source_id
    singlePropertyDatabasePropertyRelationConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: single_property
          description: Always `single_property`
        single_property:
          $ref: '#/components/schemas/emptyObject'
      required:
        - type
        - single_property
      title: Single Property
    dualPropertyDatabasePropertyRelationConfigResponse:
      type: object
      properties:
        type:
          type: string
          const: dual_property
          description: Always `dual_property`
        dual_property:
          type: object
          properties:
            synced_property_id:
              type: string
            synced_property_name:
              type: string
          additionalProperties: false
          required:
            - synced_property_id
            - synced_property_name
      required:
        - dual_property
      title: Dual Property
    apiColor:
      type: string
      enum:
        - default
        - gray
        - brown
        - orange
        - yellow
        - green
        - blue
        - purple
        - pink
        - red
        - default_background
        - gray_background
        - brown_background
        - orange_background
        - yellow_background
        - green_background
        - blue_background
        - purple_background
        - pink_background
        - red_background
      description: >-
        One of: `default`, `gray`, `brown`, `orange`, `yellow`, `green`, `blue`,
        `purple`, `pink`, `red`, `default_background`, `gray_background`,
        `brown_background`, `orange_background`, `yellow_background`,
        `green_background`, `blue_background`, `purple_background`,
        `pink_background`, `red_background`
    userObjectResponse:
      allOf:
        - $ref: '#/components/schemas/userObjectResponseCommon'
        - oneOf:
            - $ref: '#/components/schemas/personUserObjectResponse'
            - $ref: '#/components/schemas/botUserObjectResponse'
    timeZoneRequest:
      type: string
    templateMentionDateTemplateMentionResponse:
      type: object
      properties:
        type:
          type: string
          const: template_mention_date
          description: Always `template_mention_date`
        template_mention_date:
          type: string
          enum:
            - today
            - now
          description: The date of the template mention.
      additionalProperties: false
      required:
        - type
        - template_mention_date
      title: Template Mention Date
    templateMentionUserTemplateMentionResponse:
      type: object
      properties:
        type:
          type: string
          const: template_mention_user
          description: Always `template_mention_user`
        template_mention_user:
          type: string
          const: me
          description: The user of the template mention.
      additionalProperties: false
      required:
        - type
        - template_mention_user
      title: Template Mention User
    partialSelectPropertyValueResponse:
      type: object
      properties:
        id:
          type: string
        name:
          type: string
        color:
          type: string
          enum:
            - default
            - gray
            - brown
            - orange
            - yellow
            - green
            - blue
            - purple
            - pink
            - red
          description: >-
            One of: `default`, `gray`, `brown`, `orange`, `yellow`, `green`,
            `blue`, `purple`, `pink`, `red`
      additionalProperties: false
      required:
        - id
        - name
        - color
    internalOrExternalFileWithNameResponse:
      allOf:
        - $ref: '#/components/schemas/internalOrExternalFileWithNameResponseCommon'
        - oneOf:
            - $ref: '#/components/schemas/fileInternalOrExternalFileWithNameResponse'
            - $ref: >-
                #/components/schemas/externalInternalOrExternalFileWithNameResponse
    formulaPropertyValueResponse:
      oneOf:
        - $ref: '#/components/schemas/booleanFormulaPropertyValueResponse'
        - $ref: '#/components/schemas/dateFormulaPropertyValueResponse'
        - $ref: '#/components/schemas/numberFormulaPropertyValueResponse'
        - $ref: '#/components/schemas/stringFormulaPropertyValueResponse'
    uniqueIdPropertyValueResponse:
      type: object
      properties:
        prefix:
          oneOf:
            - type: string
            - type: 'null'
        number:
          oneOf:
            - type: number
            - type: 'null'
      additionalProperties: false
      required:
        - prefix
        - number
    verificationPropertyValueResponse:
      oneOf:
        - $ref: '#/components/schemas/verificationPropertyUnverifiedResponse'
        - $ref: '#/components/schemas/verificationPropertyResponse'
    placePropertyValueResponse:
      type: object
      properties:
        lat:
          type: number
        lon:
          type: number
        name:
          oneOf:
            - type: string
            - type: 'null'
        address:
          oneOf:
            - type: string
            - type: 'null'
        aws_place_id:
          oneOf:
            - type: string
            - type: 'null'
        google_place_id:
          oneOf:
            - type: string
            - type: 'null'
      additionalProperties: false
      required:
        - lat
        - lon
    groupObjectResponse:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/idResponse'
          description: The ID of the group.
        object:
          type: string
          const: group
          description: The group object type name.
        name:
          oneOf:
            - type: string
            - type: 'null'
          description: The name of the group.
      additionalProperties: false
      required:
        - id
        - object
        - name
    relationItemPropertyValueResponse:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/idRequest'
      required:
        - id
    userObjectResponseCommon:
      type: object
      properties:
        id:
          $ref: '#/components/schemas/idResponse'
          description: The ID of the user.
        object:
          type: string
          const: user
          description: The user object type name.
        name:
          oneOf:
            - type: string
            - type: 'null'
          description: The name of the user.
        avatar_url:
          oneOf:
            - type: string
            - type: 'null'
          description: The avatar URL of the user.
      additionalProperties: false
      required:
        - id
        - object
        - name
        - avatar_url
    personUserObjectResponse:
      type: object
      properties:
        type:
          type: string
          const: person
          description: Indicates this user is a person.
        person:
          type: object
          properties:
            email:
              type: string
              description: The email of the person.
          additionalProperties: false
          description: Details about the person, when the `type` of the user is `person`.
      required:
        - type
        - person
      title: Person
    botUserObjectResponse:
      type: object
      properties:
        type:
          type: string
          const: bot
          description: Indicates this user is a bot.
        bot:
          oneOf:
            - $ref: '#/components/schemas/emptyObject'
            - $ref: '#/components/schemas/botInfoResponse'
          description: Details about the bot, when the `type` of the user is `bot`.
      required:
        - type
        - bot
      title: Bot
    internalOrExternalFileWithNameResponseCommon:
      type: object
      properties:
        name:
          type: string
          description: The name of the file.
      additionalProperties: false
      required:
        - name
    fileInternalOrExternalFileWithNameResponse:
      type: object
      properties:
        type:
          type: string
          const: file
          description: >-
            Type of attachment. In this case, a file uploaded to a Notion
            workspace.
        file:
          $ref: '#/components/schemas/internalFileResponse'
          description: The file URL.
      required:
        - type
        - file
      title: File
    externalInternalOrExternalFileWithNameResponse:
      type: object
      properties:
        type:
          type: string
          const: external
          description: Type of attachment. In this case, an external URL.
        external:
          type: object
          properties:
            url:
              type: string
              description: The URL of the external file or resource.
          additionalProperties: false
          required:
            - url
          description: The external URL.
      required:
        - type
        - external
      title: External
    booleanFormulaPropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: boolean
          description: Always `boolean`
        boolean:
          oneOf:
            - type: boolean
            - type: 'null'
      additionalProperties: false
      required:
        - type
        - boolean
      title: Boolean
    dateFormulaPropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: date
          description: Always `date`
        date:
          oneOf:
            - $ref: '#/components/schemas/dateResponse'
            - type: 'null'
      additionalProperties: false
      required:
        - type
        - date
      title: Date
    numberFormulaPropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: number
          description: Always `number`
        number:
          oneOf:
            - type: number
            - type: 'null'
      additionalProperties: false
      required:
        - type
        - number
      title: Number
    stringFormulaPropertyValueResponse:
      type: object
      properties:
        type:
          type: string
          const: string
          description: Always `string`
        string:
          oneOf:
            - type: string
            - type: 'null'
      additionalProperties: false
      required:
        - type
        - string
      title: String
    verificationPropertyUnverifiedResponse:
      type: object
      properties:
        state:
          type: string
          const: unverified
          description: Always `unverified`
        date:
          type: 'null'
        verified_by:
          type: 'null'
      additionalProperties: false
      required:
        - state
        - date
        - verified_by
      title: Unverified
    verificationPropertyResponse:
      type: object
      properties:
        state:
          type: string
          enum:
            - verified
            - expired
          description: 'One of: `verified`, `expired`'
        date:
          oneOf:
            - $ref: '#/components/schemas/dateResponse'
            - type: 'null'
        verified_by:
          oneOf:
            - $ref: '#/components/schemas/userValueResponse'
            - type: 'null'
      additionalProperties: false
      required:
        - state
        - date
        - verified_by
      title: Verified
    botInfoResponse:
      type: object
      properties:
        owner:
          oneOf:
            - type: object
              properties:
                type:
                  type: string
                  const: user
                  description: Always `user`
                user:
                  oneOf:
                    - type: object
                      properties:
                        id:
                          $ref: '#/components/schemas/idResponse'
                          description: The ID of the user.
                        object:
                          type: string
                          const: user
                          description: The user object type name.
                        name:
                          oneOf:
                            - type: string
                            - type: 'null'
                          description: The name of the user.
                        avatar_url:
                          oneOf:
                            - type: string
                            - type: 'null'
                          description: The avatar URL of the user.
                        type:
                          type: string
                          const: person
                          description: The type of the user.
                        person:
                          type: object
                          properties:
                            email:
                              type: string
                              description: The email of the person.
                          additionalProperties: false
                          description: The person info of the user.
                      additionalProperties: false
                      required:
                        - id
                        - object
                        - name
                        - avatar_url
                        - type
                        - person
                    - $ref: '#/components/schemas/partialUserObjectResponse'
                  description: >-
                    Details about the owner of the bot, when the `type` of the
                    owner is `user`. This means the bot is for a integration.
              additionalProperties: false
              required:
                - type
                - user
              title: User
            - type: object
              properties:
                type:
                  type: string
                  const: workspace
                  description: Always `workspace`
                workspace:
                  type: boolean
                  const: true
                  description: >-
                    Details about the owner of the bot, when the `type` of the
                    owner is `workspace`. This means the bot is for an internal
                    integration.
              additionalProperties: false
              required:
                - type
                - workspace
              title: Workspace
          description: Details about the owner of the bot.
        workspace_id:
          type: string
          description: The ID of the bot's workspace.
        workspace_limits:
          type: object
          properties:
            max_file_upload_size_in_bytes:
              type: integer
              minimum: 0
              description: The maximum allowable size of a file upload, in bytes
          additionalProperties: false
          required:
            - max_file_upload_size_in_bytes
          description: Limits and restrictions that apply to the bot's workspace
        workspace_name:
          oneOf:
            - type: string
            - type: 'null'
          description: The name of the bot's workspace.
      additionalProperties: false
      required:
        - owner
        - workspace_id
        - workspace_limits
        - workspace_name
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