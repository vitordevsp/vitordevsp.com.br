> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Retrieve a page

<Warning>
  **This endpoint will not accurately return properties that exceed 25 references**

  Do **not** use this endpoint if a page property includes more than 25 references to receive the full list of references. Instead, use the [Retrieve a page property endpoint](/reference/retrieve-a-page-property) for the specific property to get its complete reference list.
</Warning>

Retrieves a [Page object](/reference/page) using the ID specified.

Responses contains page **properties**, not page content. To fetch page content, use the [Retrieve block children](/reference/get-block-children) endpoint.

Page properties are limited to up to **25 references** per page property. To retrieve data related to properties that have more than 25 references, use the [Retrieve a page property](/reference/retrieve-a-page-property#rollup-properties) endpoint. (See [Limits](/reference/retrieve-a-page#limits) below for additional information.)

### Parent objects: Pages vs. databases

If a page’s [Parent object](/reference/parent-object) is a database, then the property values will conform to the [database property schema](/reference/property-object).

If a page object is not part of a database, then the only property value available for that page is its `title`.

### Limits

The endpoint returns a maximum of 25 page or person references per [page property](/reference/page-property-values). If a page property includes more than 25 references, then the 26th reference and beyond might be returned as `Untitled`, `Anonymous`, or not be returned at all.

This limit affects the following properties:

* [`people`](/reference/page-property-values#people): response object can’t be guaranteed to return more than 25 people.
* [`relation`](/reference/page-property-values#relation): the `has_more` value of the `relation` in the response object is `true` if a `relation` contains more than 25 related pages. Otherwise, `has_more` is false.
* [`rich_text`](/reference/page-property-values#rich-text): response object includes a maximum of 25 populated inline page or person mentions.
* [`title`](/reference/page-property-values#title): response object includes a maximum of 25 inline page or person mentions.

<Info>
  **Integration capabilities**

  This endpoint requires an integration to have read content capabilities. Attempting to call this API without read content capabilities will return an HTTP response with a 403 status code. For more information on integration capabilities, see the [capabilities guide](/reference/capabilities).
</Info>

### Errors

Returns a 404 HTTP response if the page doesn't exist, or if the integration doesn't have access to the page.

Returns a 400 or 429 HTTP response if the request exceeds the [request limits](/reference/request-limits).

*Note: Each Public API endpoint can return several possible error codes. See the [Error codes section](/reference/status-codes#error-codes) of the Status codes documentation for more information.*


## OpenAPI

````yaml get /v1/pages/{page_id}
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
  /v1/pages/{page_id}:
    get:
      tags:
        - Pages
      summary: Retrieve a page
      operationId: retrieve-a-page
      parameters:
        - name: page_id
          in: path
          required: true
          schema:
            $ref: '#/components/schemas/idRequest'
            description: The ID of the page to retrieve.
        - name: filter_properties
          in: query
          schema:
            type: array
            items:
              type: string
            maxItems: 100
            description: >-
              Supply a list of property IDs to filter properties in the
              response. Note that if a page doesn't have a property, it won't be
              included in the filtered response.
        - $ref: '#/components/parameters/notionVersion'
      responses:
        '200':
          description: ''
          content:
            application/json:
              schema:
                oneOf:
                  - $ref: '#/components/schemas/partialPageObjectResponse'
                  - $ref: '#/components/schemas/pageObjectResponse'
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

            const response = await notion.pages.retrieve({
              page_id: "b55c9c91-384d-452b-81db-d1ef79372b75"
            })
components:
  schemas:
    idRequest:
      type: string
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
    internalOrExternalFileWithNameResponse:
      allOf:
        - $ref: '#/components/schemas/internalOrExternalFileWithNameResponseCommon'
        - oneOf:
            - $ref: '#/components/schemas/fileInternalOrExternalFileWithNameResponse'
            - $ref: >-
                #/components/schemas/externalInternalOrExternalFileWithNameResponse
    userValueResponse:
      oneOf:
        - $ref: '#/components/schemas/partialUserObjectResponse'
        - $ref: '#/components/schemas/userObjectResponse'
    formulaPropertyValueResponse:
      oneOf:
        - $ref: '#/components/schemas/booleanFormulaPropertyValueResponse'
        - $ref: '#/components/schemas/dateFormulaPropertyValueResponse'
        - $ref: '#/components/schemas/numberFormulaPropertyValueResponse'
        - $ref: '#/components/schemas/stringFormulaPropertyValueResponse'
    emptyObject:
      type: object
      properties: {}
      additionalProperties: false
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
    richTextItemResponse:
      allOf:
        - $ref: '#/components/schemas/richTextItemResponseCommon'
        - oneOf:
            - $ref: '#/components/schemas/textRichTextItemResponse'
            - $ref: '#/components/schemas/mentionRichTextItemResponse'
            - $ref: '#/components/schemas/equationRichTextItemResponse'
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
    timeZoneRequest:
      type: string
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
    userObjectResponse:
      allOf:
        - $ref: '#/components/schemas/userObjectResponseCommon'
        - oneOf:
            - $ref: '#/components/schemas/personUserObjectResponse'
            - $ref: '#/components/schemas/botUserObjectResponse'
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