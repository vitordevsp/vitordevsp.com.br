> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Retrieve a data source

Retrieves a [data source](/reference/data-source) object — information that describes the structure and columns of a data source — for a provided data source ID. The response adheres to any limits to an integration’s capabilities and the permissions of the `parent` database.

To fetch data source *rows* (i.e. the child pages of a data source) rather than columns, use the [Query a data source](/reference/query-a-data-source) endpoint.

### Finding a data source ID

Navigate to the database URL in your Notion workspace. The ID is the string of characters in the URL that is between the slash following the workspace name (if applicable) and the question mark. The ID is a 32 characters alphanumeric string.

<Frame caption="Notion database ID">
  <img src="https://mintcdn.com/notion-demo/S-I3qLQnwRa7HjdK/images/reference/image-3.png?fit=max&auto=format&n=S-I3qLQnwRa7HjdK&q=85&s=051ded818c1263e52bb87f66a3d05ce5" width="1502" height="128" data-path="images/reference/image-3.png" />
</Frame>

Then, use the [Retrieve a database](/reference/retrieve-a-database) API to get a list of `data_sources` for that database. There is often only one data source, but when there are multiple, you may have the ID or name of the one you want to retrieve in mind (or you can retrieve each of them). Use that data source ID with this endpoint to get its `properties`.

To get a data source ID from the Notion app directly, the settings menu for a database includes a "Copy data source ID" button under "Manage data sources":

<Frame caption="Screenshot of the 'Manage data sources' menu for a database in Notion, with 'Copy data source ID' button.">
  <img src="https://mintcdn.com/notion-demo/S-I3qLQnwRa7HjdK/images/reference/image-4.png?fit=max&auto=format&n=S-I3qLQnwRa7HjdK&q=85&s=292ed34c84b1b7161b282444678c3bc6" width="570" height="458" data-path="images/reference/image-4.png" />
</Frame>

Refer to the [Build your first integration guide](/guides/get-started/quick-start) for more details.

### Errors

ErrorsEach Public API endpoint can return several possible error codes. See the [Error codes section](/reference/status-codes#error-codes) of the Status codes documentation for more information.

### Additional resources

* [How to share a database with your integration](/guides/get-started/quick-start#give-your-integration-page-permissions)
* [Working with databases guide](/guides/data-apis/working-with-databases)

<Info>
  **Data source relations must be shared with your integration**

  To retrieve data source properties from [database relations](https://www.notion.so/help/relations-and-rollups#what-is-a-database-relation), the related database must be shared with your integration in addition to the database being retrieved. If the related database is not shared, properties based on relations will not be included in the API response.
</Info>

<Warning>
  **The Notion API does not support retrieving linked data sources**

  To fetch the information in a [linked data source](https://www.notion.so/help/guides/using-linked-databases), share the original source database with your Notion integration.
</Warning>


## OpenAPI

````yaml get /v1/data_sources/{data_source_id}
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
  /v1/data_sources/{data_source_id}:
    get:
      tags:
        - Data sources
      summary: Retrieve a data source
      operationId: retrieve-a-data-source
      parameters:
        - name: data_source_id
          in: path
          required: true
          schema:
            $ref: '#/components/schemas/idRequest'
            description: ID of a Notion data source.
        - $ref: '#/components/parameters/notionVersion'
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                oneOf:
                  - $ref: '#/components/schemas/partialDataSourceObjectResponse'
                  - $ref: '#/components/schemas/dataSourceObjectResponse'
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

            const response = await notion.dataSources.retrieve({
              data_source_id: "d9824bdc-8445-4327-be8b-5b47500af6ce"
            })
components:
  schemas:
    idRequest:
      type: string
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
    idResponse:
      type: string
      format: uuid
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
    emptyObject:
      type: object
      properties: {}
      additionalProperties: false
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