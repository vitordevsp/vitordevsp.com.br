> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Page properties

## Overview

A [page object](/reference/page) is made up of page properties that contain data about the page.

When you send a request to [Create a page](/reference/post-page), set the page properties in the `properties` object body parameter.

[Retrieve a page](/reference/retrieve-a-page) surfaces the identifier, type, and value of a page’s properties.

[Retrieve a page property item](/reference/retrieve-a-page-property) returns information about a single property ID. Especially for formulas, rollups, and relations, Notion recommends using this API to ensure you get an accurate, up-to-date property value that isn't truncating any results. Refer to [Page property items](/reference/property-item-object) for specific API shape details when using this endpoint.

An [Update page](/reference/patch-page) query modifies the page property values specified in the `properties` object body param.

<Check>
  **Pages that live in a data source are easier to query and manage.**

  **Page properties** are most useful when interacting with a page that is an entry in a data source, represented as a row in the Notion app UI.

  If a page is not part of a data source, then its only available property is its `title`.
</Check>

## Attributes

Each page property value object contains the following fields:

| Field                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                  | Type            | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                    | Example value      |
| :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :----------------- |
| `id`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                   | `string`        | An underlying identifier for the property. Historically, this may be a UUID, but newer IDs are a short ID that's always URL-encoded in the API and in [integration webhooks](/reference/webhooks).<br /><br /> `id` may be used in place of name when creating or updating pages.<br /><br /> `id` remains constant when the property name changes.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            | `"f%5C%5C%3Ap"`    |
| `type`                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `string` (enum) | The type of the property in the page object. Possible type values are: <br /> <br />- [`checkbox`](#checkbox) <br /> - [`created_by`](#created-by) <br />- [`created_time`](#created-time) <br /> - [`date`](#date) <br /> - [`email`](#email)<br /> - [`files`](#files) <br />- [`formula`](#formula)<br /> - [`last_edited_by`](#last-edited-by) <br />- [`last_edited_time`](#last-edited-time)<br /> - [`multi_select`](#multi-select)<br /> - [`number`](#number)<br /> - [`people`](#people)<br /> - [`phone_number`](#phone-number)<br /> - [`relation`](#relation) - [`rollup`](#rollup)<br /> - [`rich_text`](#rich-text) <br />- [`select`](#select) <br />- [`status`](#status)<br /> - [`title`](#title)<br /> - [`url`](#url) <br />- [`unique_id`](#unique-id)<br /> - [`verification`](#verification)Refer to specific type sections below for details on type-specific values. | `"rich_text"`      |
| [`checkbox`](#checkbox)<br />[`created_by`](#created-by)<br />[`created_time`](#created-time)<br />[`date`](#date)<br />[`email`](#email)<br />[`files`](#files)<br />[`formula`](#formula)<br />[`last_edited_by`](#last-edited-by)<br />[`last_edited_time`](#last-edited-time)<br />[`multi_select`](#multi-select)<br />[`number`](#number)<br />[`people`](#people)<br />[`phone_number`](#phone-number)<br />[`relation`](#relation)<br />[`rollup`](#rollup)<br />[`rich_text`](#rich-text)<br />[`select`](#select)[`status`](#status)<br />[`title`](#title)<br />[`url`](#url)[`unique_id`](#unique-id)<br />[`verification`](#verification) | `object`        | A type object that contains data specific to the page property type, including the page property value.<br /><br /> Refer to the [type objects section](#type-objects) for descriptions and examples of each type.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `"checkbox": true` |

<Info>
  **Size limits for page property values**

  For information about size limitations for specific page property objects, refer to the [limits for property values documentation](/reference/request-limits#limits-for-property-values).
</Info>

When returned from the [Retrieve page property item](/changelog/retrieve-page-property-values) API, there's an additional field, `object`, which is always the string `"property_item"`, as described in [Page property items](/reference/property-item-object).

## Type objects

### Checkbox

<Info>Data source property config: [Checkbox](/reference/property-object#checkbox)</Info>

| Field      | Type      | Description                                                      | Example value |
| :--------- | :-------- | :--------------------------------------------------------------- | :------------ |
| `checkbox` | `boolean` | Whether the checkbox is checked (`true`) or unchecked (`false`). | `true`        |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `checkbox` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Task completed": {
        "checkbox": true
      }
    }
  }
  ```
</CodeGroup>

#### Example `checkbox` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Task completed": {
      "id": "ZI%40W",
      "type": "checkbox",
      "checkbox": true
    }
  }
  ```
</CodeGroup>

### Created by

<Info>Data source property config: [Created by](/reference/property-object#created-by)</Info>

| Field        | Type     | Description                                                                                                                             | Example value                                |
| :----------- | :------- | :-------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| `created_by` | `object` | A [user object](/reference/user) containing information about the user who created the page. <br /><br />`created_by` can’t be updated. | Refer to the example response objects below. |

#### Example `created_by` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "created_by": {
      "object": "user",
      "id": "c2f20311-9e54-4d11-8c79-7398424ae41e"
    }
  }
  ```
</CodeGroup>

### Created time

<Info>Data source property config: [Created time](/reference/property-object#created-time)</Info>

| Field          | Type                                                                        | Description                                                                                          | Example value                |
| :------------- | :-------------------------------------------------------------------------- | :--------------------------------------------------------------------------------------------------- | :--------------------------- |
| `created_time` | `string` ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time) | The date and time that the page was created. <br /><br /> The `created_time` value can’t be updated. | `"2022-10-12T16:34:00.000Z"` |

#### Example `created_time` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Created time": {
      "id": "eB_%7D",
      "type": "created_time",
      "created_time": "2022-10-24T22:54:00.000Z"
    }
  }
  ```
</CodeGroup>

### Date

<Info>Data source property config: [Date](/reference/property-object#date)</Info>

If the `type` of a page property value is `"date"`, then the property value contains a `"date"` object with the following fields:

| Field   | Type                                                                        | Description                                                                                                                       | Example value            |
| :------ | :-------------------------------------------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :----------------------- |
| `end`   | `string` ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time) | (Optional) A string representing the end of a date range.<br /><br /> If the value is `null`, then the date value is not a range. | `"2020-12-08T12:00:00Z"` |
| `start` | `string` ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time) | A date, with an optional time.<br /><br /> If the `date` value is a range, then `start` represents the start of the range.        | `"2020-12-08T12:00:00Z”` |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a date page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Due date": {
        "date": {
          "start": "2023-02-23"
        }
      }
    }
  }
  ```
</CodeGroup>

#### Example `date` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Due date": {
      "id": "M%3BBw",
      "type": "date",
      "date": {
        "start": "2023-02-07",
        "end": null,
        "time_zone": null
      }
    }
  }
  ```
</CodeGroup>

### Email

<Info>Data source property config: [Email](/reference/property-object#email)</Info>

| Field   | Type     | Description                           | Example value          |
| :------ | :------- | :------------------------------------ | :--------------------- |
| `email` | `string` | A string describing an email address. | `"ada@makenotion.com"` |

#### Example `properties` body param for a POST or PATCH page request that creates or updates an `email` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Email": {
        "email": "ada@makenotion.com"
      }
    }
  }
  ```
</CodeGroup>

#### Example `email` page property value as returned in a GET page request

<CodeGroup>
  ```json json theme={null}
  {
    "Email": {
      "id": "y%5C%5E_",
      "type": "email",
      "email": "ada@makenotion.com"
    }
  }
  ```
</CodeGroup>

### Files

<Info>Data source property config: [Files](/reference/property-object#files)</Info>

| Field   | Type                                            | Description                                                 | Example value                                |
| :------ | :---------------------------------------------- | :---------------------------------------------------------- | :------------------------------------------- |
| `files` | array of [file objects](/reference/file-object) | An array of objects containing information about the files. | Refer to the example response objects below. |

#### Example creation or update of `files` property

The following is an example `properties` body parameter for a `POST` or `PATCH` page request that creates or updates a `files` page property value.

When providing an `external` URL, the `name` parameter is required.

When providing a `file_upload`, the `name` is optional and defaults to the `filename` of the original [File Upload](/reference/file-upload).

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Blueprint": {
        "files": [
          {
            "name": "Project Alpha blueprint",
            "external": {
              "url": "https://www.figma.com/file/g7eazMtXnqON4i280CcMhk/project-alpha-blueprint?node-id=0%3A1&t=nXseWIETQIgv31YH-1"
            }
          }
        ]
      }
    }
  }
  ```
</CodeGroup>

#### Example `files` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Blueprint": {
      "id": "tJPS",
      "type": "files",
      "files": [
        {
          "name": "Project blueprint",
          "type": "external",
          "external": {
            "url": "https://www.figma.com/file/g7eazMtXnqON4i280CcMhk/project-alpha-blueprint?node-id=0%3A1&t=nXseWIETQIgv31YH-1"
          }
        }
      ]
    }
  }
  ```
</CodeGroup>

<Info>
  **Array parameter overwrites the entire existing value**

  When updating a `files` page property value, the value is overwritten by the new array of `files` passed.

  If you pass a `file` object containing a file hosted by Notion, it remains one of the files. To remove any file, don't pass it in the update request.
</Info>

### Formula

<Info>Data source property config: [Formula](/reference/property-object#formula)</Info>

Formula property value objects represent the result of evaluating a formula described in the [data source's properties](/reference/property-object#formula).

If the `type` of a page property value is `"formula"`, then the property value contains a `"formula"` object with the following fields:

| Field                                             | Type                                              | Description                                                                                                                            | Example value |
| :------------------------------------------------ | :------------------------------------------------ | :------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `boolean` \|\| `date` \|\| `number` \|\| `string` | `boolean` \|\| `date` \|\| `number` \|\| `string` | The value of the result of the formula. The value can’t be updated directly via the API.                                               | 42            |
| `type`                                            | `string` (enum)                                   | A string indicating the data type of the result of the formula. Possible `type` values are: - `boolean` - `date` - `number` - `string` | `"number"`    |

#### Example `formula` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Days until launch": {
      "id": "CSoE",
      "type": "formula",
      "formula": {
        "type": "number",
        "number": 56
      }
    }
  }
  ```
</CodeGroup>

<Info>
  The [Retrieve a page endpoint](/reference/retrieve-a-page) returns a maximum of 25 inline page or person references for a `formula` property. If a `formula` property includes more than 25 references, then you can use the [Retrieve a page property item endpoint](/reference/retrieve-a-page-property) for the specific `formula` property to get its complete list of references.
</Info>

### Icon

<Info>
  **Page icon and cover are not nested under `properties`**

  The `icon` and `cover` fields in the [Create a page](/reference/post-page) and [Update page](/reference/patch-page) APIs are top-level parameters, not nested under `properties`.
</Info>

The `icon` field is a discriminated union on the `type` key. Different types are available depending on whether you are reading or writing:

| `type`           | Read | Write | Description                                                                                                               |
| :--------------- | :--- | :---- | :------------------------------------------------------------------------------------------------------------------------ |
| `"emoji"`        | Yes  | Yes   | A standard emoji character. See [Emoji](/reference/emoji-and-icon#emoji).                                                 |
| `"custom_emoji"` | Yes  | Yes   | A workspace custom emoji, referenced by `id`. See [Custom emoji](/reference/emoji-and-icon#custom-emoji).                 |
| `"icon"`         | Yes  | Yes   | A native Notion icon with `name` and `color`. See [Icon](/reference/emoji-and-icon#icon).                                 |
| `"external"`     | Yes  | Yes   | An externally hosted image URL. See [File object](/reference/file-object).                                                |
| `"file"`         | Yes  | No    | A Notion-hosted file (uploaded via the UI). Returned in responses only. See [File object](/reference/file-object).        |
| `"file_upload"`  | No   | Yes   | A file uploaded via the [File Upload API](/reference/file-upload). Write-only. See [File object](/reference/file-object). |

For full schema details and examples of each type, see the [Emoji and icon](/reference/emoji-and-icon) reference.

#### Example responses

<CodeGroup>
  ```json Emoji theme={null}
  {
    "icon": {
      "type": "emoji",
      "emoji": "😀"
    }
  }
  ```

  ```json Native icon theme={null}
  {
    "icon": {
      "type": "icon",
      "icon": {
        "name": "pizza",
        "color": "blue"
      }
    }
  }
  ```

  ```json Custom emoji theme={null}
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

  ```json Notion-hosted file theme={null}
  {
    "icon": {
      "type": "file",
      "file": {
        "url": "https://local-files-secure.s3.us-west-2.amazonaws.com/...",
        "expiry_time": "2024-12-03T19:44:56.932Z"
      }
    }
  }
  ```
</CodeGroup>

#### Example: setting an icon

<CodeGroup>
  ```json Emoji theme={null}
  {
    "icon": { "type": "emoji", "emoji": "🥑" }
  }
  ```

  ```json Native icon theme={null}
  {
    "icon": {
      "type": "icon",
      "icon": { "name": "pizza", "color": "blue" }
    }
  }
  ```

  ```json Custom emoji (by ID) theme={null}
  {
    "icon": {
      "type": "custom_emoji",
      "custom_emoji": { "id": "45ce454c-d427-4f53-9489-e5d0f3d1db6b" }
    }
  }
  ```

  ```json File upload theme={null}
  {
    "icon": {
      "type": "file_upload",
      "file_upload": { "id": "43833259-72ae-404e-8441-b6577f3159b4" }
    }
  }
  ```
</CodeGroup>

<Tip>
  To set the **cover** image, use the `cover` parameter with the same file types (`external`, `file_upload`) in the [Create a page](/reference/post-page) or [Update page](/reference/patch-page) request body.
</Tip>

### Last edited by

<Info>Data source property config: [Last edited by](/reference/property-object#last-edited-by)</Info>

| Field            | Type     | Description                                                                                                                          | Example value                                |
| :--------------- | :------- | :----------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| `last_edited_by` | `object` | A [user object](/reference/user) containing information about the user who last updated the page. `last_edited_by` can’t be updated. | Refer to the example response objects below. |

#### Example `last_edited_by` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Last edited by column name": {
      "id": "uGNN",
      "type": "last_edited_by",
      "last_edited_by": {
        "object": "user",
        "id": "9188c6a5-7381-452f-b3dc-d4865aa89bdf",
        "name": "Test Integration",
        "avatar_url": "https://s3-us-west-2.amazonaws.com/public.notion-static.com/3db373fe-18f6-4a3c-a536-0f061cb9627f/leplane.jpeg",
        "type": "bot",
        "bot": {}
      }
    }
  }
  ```
</CodeGroup>

### Last edited time

<Info>Data source property config: [Last edited time](/reference/property-object#last-edited-time)</Info>

| Field              | Type                                                                        | Description                                                                                     | Example value                |
| :----------------- | :-------------------------------------------------------------------------- | :---------------------------------------------------------------------------------------------- | :--------------------------- |
| `last_edited_time` | `string` ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time) | The date and time that the page was last edited. The `last_edited_time` value can’t be updated. | `"2022-10-12T16:34:00.000Z"` |

#### Example `last_edited_time` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Last edited time": {
      "id": "%3Defk",
      "type": "last_edited_time",
      "last_edited_time": "2023-02-24T21:06:00.000Z"
    }
  }
  ```
</CodeGroup>

### Multi-select

<Info>Data source property config: [Multi-select](/reference/property-object#multi-select)</Info>

If the `type` of a page property value is `"multi_select"`, then the property value contains a `"multi_select"` array with the following fields:

| Field   | Type            | Description                                                                                                                                                                                                                                                                                                                                                                | Example value                            |
| :------ | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| `color` | `string` (enum) | Color of the option. Note: the `color` value can’t be updated via the API. <br /><br /> Possible `"color"` values are: <br /><br /> - `blue`<br /> - `brown`<br /> - `default`(the default value)<br /> - `gray`<br /> - `green`<br /> - `orange`<br /> - `pink`<br /> - `purple`<br /> - `red`<br /> - `yellow`                                                           | `"red"`                                  |
| `id`    | `string`        | The ID of the option. <br /><br /> You can use `id` or `name` to update a multi-select property.                                                                                                                                                                                                                                                                           | `"b3d773ca-b2c9-47d8-ae98-3c2ce3b2bffb"` |
| `name`  | `string`        | The name of the option as it appears in Notion. <br /><br /> If the multi-select [data source property](/reference/property-object) does not yet have an option by that name, then the name will be added to the data source schema if the integration also has write access to the parent data source. <br /><br /> Note: Commas (`","`) are not valid for select values. | `"JavaScript"`                           |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `multi_select` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Programming language": {
        "multi_select": [
          {
            "name": "TypeScript"
          },
          {
            "name": "Python"
          }
        ]
      }
    }
  }
  ```
</CodeGroup>

#### Example `multi_select` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Programming language": {
      "id": "QyRn",
      "name": "Programming language",
      "type": "multi_select",
      "multi_select": [
        {
          "id": "tC;=",
          "name": "TypeScript",
          "color": "purple"
        },
        {
          "id": "e4413a91-9f84-4c4a-a13d-5b4b3ef870bb",
          "name": "JavaScript",
          "color": "red"
        },
        {
          "id": "fc44b090-2166-40c8-8c58-88f2d8085ec0",
          "name": "Python",
          "color": "gray"
        }
      ]
    }
  }
  ```
</CodeGroup>

<Info>
  If you want to add a new option to a multi-select property via the [Update page](/reference/patch-page) or [Update data source](/reference/update-a-data-source) endpoint, then your integration needs write access to the parent database.
</Info>

### Number

<Info>Data source property config: [Number](/reference/property-object#number)</Info>

| Field    | Type     | Description                       | Example value |
| :------- | :------- | :-------------------------------- | :------------ |
| `number` | `number` | A number representing some value. | `1234`        |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `number` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Number of subscribers": {
        "number": 42
      }
    }
  }
  ```
</CodeGroup>

#### Example `number` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Number of subscribers": {
      "id": "WPj%5E",
      "type": "number",
      "number": 42
    }
  }
  ```
</CodeGroup>

### People

<Info>Data source property config: [People](/reference/property-object#people)</Info>

| Field    | Type                                     | Description               | Example value                                |
| :------- | :--------------------------------------- | :------------------------ | :------------------------------------------- |
| `people` | array of [user objects](/reference/user) | An array of user objects. | Refer to the example response objects below. |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `people` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Stakeholders": {
        "people": [{
          "object": "user",
          "id": "c2f20311-9e54-4d11-8c79-7398424ae41e"
        }]
      }
    }
  }
  ```
</CodeGroup>

#### Example `people` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Stakeholders": {
      "id": "%7BLUX",
      "type": "people",
      "people": [
        {
          "object": "user",
          "id": "c2f20311-9e54-4d11-8c79-7398424ae41e",
          "name": "Kimberlee Johnson",
          "avatar_url": null,
          "type": "person",
          "person": {
            "email": "[email protected]"
          }
        }
      ]
    }
  }
  ```
</CodeGroup>

<Info>
  **Retrieve individual property items to avoid truncation**

  The [Retrieve a page endpoint](/reference/retrieve-a-page) can’t be guaranteed to return more than 25 people per `people` page property. If a `people` page property includes more than 25 people, then you can use the [Retrieve a page property item endpoint](/reference/retrieve-a-page-property) for the specific `people` property to get a complete list of people.
</Info>

### Phone number

<Info>Data source property config: [Phone number](/reference/property-object#phone-number)</Info>

| Field          | Type     | Description                                                               | Example value    |
| :------------- | :------- | :------------------------------------------------------------------------ | :--------------- |
| `phone_number` | `string` | A string representing a phone number. No phone number format is enforced. | `"415-867-5309"` |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `phone_number` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Contact phone number": {
        "phone_number": "415-202-4776"
      }
    }
  }
  ```
</CodeGroup>

#### Example `phone_number` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Contact phone number": {
      "id": "%5DKhQ",
      "type": "phone_number",
      "phone_number": "415-202-4776"
    }
  }
  ```
</CodeGroup>

### Relation

<Info>Data source property config: [Relation](/reference/property-object#relation)</Info>

| Field      | Type                        | Description                                                                                                                                                                                   | Example value                                |
| :--------- | :-------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| `has_more` | `boolean`                   | If a `relation` has more than 25 references, then the `has_more` value for the relation in the response object is `true`. If a relation doesn’t exceed the limit, then `has_more` is `false`. | Refer to the example response objects below. |
| `relation` | an array of page references | An array of related page references. A page reference is an object with an `id` key and a string value corresponding to a page ID in another data source.                                     | Refer to the example response objects below. |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `relation` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Related tasks": {
        "relation": [
          {
            "id": "dd456007-6c66-4bba-957e-ea501dcda3a6"
          },
          {
            "id": "0c1f7cb2-8090-4f18-924e-d92965055e32"
          }
        ]
      }
    }
  }
  ```
</CodeGroup>

#### Example `relation` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Related tasks": {
      "id": "hgMz",
      "type": "relation",
      "relation": [
        {
          "id": "dd456007-6c66-4bba-957e-ea501dcda3a6"
        },
        {
          "id": "0c1f7cb2-8090-4f18-924e-d92965055e32"
        }
      ],
      "has_more": false
    }
  }
  ```
</CodeGroup>

<Info>
  **To update a `relation` property value via the API, share the related parent database with the integration.**

  If a `relation` property value is unexpectedly empty, then make sure that you have shared the original source database for the data source that the `relation` points to with the integration.

  Ensuring correct permissions is also important for complete results for `rollup` and `formula` properties.
</Info>

### Rollup

<Info>Data source property config: [Rollup](/reference/property-object#rollup)</Info>

If the `type` of a page property value is `"rollup"`, then the property value contains a `"rollup"` object with the following fields:

| Field                                                                  | Type                                                                                                                  | Description                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                          | Example value |
| ---------------------------------------------------------------------- | --------------------------------------------------------------------------------------------------------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------ | ------------- |
| `array` \|\| `date` \|\| `incomplete` \|\| `number` \|\| `unsupported` | Corresponds to the field. <br /><br /> For example, if the field is `number`, then the type of the value is `number`. | The value of the calculated rollup. The value can't be directly updated via the API.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 | `1234`        |
| `function`                                                             | `string` (enum)                                                                                                       | The function that is evaluated for every page in the relation of the rollup. Possible `"function"` values are: <br /><br />- `average` <br />- `checked` <br />- `count` <br />- `count_per_group` <br />- `count_values` <br />- `date_range` <br />- `earliest_date` <br />- `empty` <br />- `latest_date` <br />- `max` <br />- `median` <br />- `min` <br />- `not_empty` <br />- `percent_checked` <br />- `percent_empty` <br />- `percent_not_empty` <br />- `percent_per_group` <br />- `percent_unchecked` <br />- `range` <br />- `show_original` <br />- `show_unique` <br />- `sum` <br />- `unchecked` <br />- `unique` | `"sum"`       |
| `type`                                                                 | `array` \|\| `date` \|\| `incomplete` \|\| `number` \|\| `unsupported`                                                | The value type of the calculated rollup.                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                             | `number`      |

#### Example `rollup` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Number of units": {
      "id": "hgMz",
      "type": "rollup",
      "rollup": {
        "type": "number",
        "number": 2,
        "function": "count"
      }
    }
  }
  ```
</CodeGroup>

<Warning>
  **For rollup properties with more than 25 references, use the Retrieve a page property endpoint**

  Both the [Retrieve a page](/reference/retrieve-a-page) and [Retrieve a page property](/reference/retrieve-a-page-property) endpoints will return information related to the page properties. In cases where a rollup property has more than 25 references, the [Retrieve a page property](/reference/retrieve-a-page-property) endpoint must but used.

  Learn more about rollup properties in Notion’s [Help Center](/reference/page-property-values#rollup).
</Warning>

<Warning>
  **The API does not support updating `rollup` page property values.**

  To change a page's `rollup` property, use the Notion UI.
</Warning>

### Rich text

<Info>Data source property config: [Rich text](/reference/property-object#rich-text)</Info>

| Field       | Type                                                  | Description                                           | Example value                                |
| :---------- | :---------------------------------------------------- | :---------------------------------------------------- | :------------------------------------------- |
| `rich_text` | an array of [rich text objects](/reference/rich-text) | An array of [rich text objects](/reference/rich-text) | Refer to the example response objects below. |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `rich_text` page property value

<CodeGroup>
  ```json JSON expandable theme={null}
  {
    "properties": {
      "Description": {
        "rich_text": [
          {
            "type": "text",
            "text": {
              "content": "There is some ",
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
            "plain_text": "There is some ",
            "href": null
          },
          {
            "type": "text",
            "text": {
              "content": "text",
              "link": null
            },
            "annotations": {
              "bold": true,
              "italic": false,
              "strikethrough": false,
              "underline": false,
              "code": false,
              "color": "default"
            },
            "plain_text": "text",
            "href": null
          },
          {
            "type": "text",
            "text": {
              "content": " in this property!",
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
            "plain_text": " in this property!",
            "href": null
          }
        ]
      }
    }
  }
  ```
</CodeGroup>

#### Example `rich_text` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON expandable theme={null}
  {
    "Description": {
      "id": "HbZT",
      "type": "rich_text",
      "rich_text": [
        {
          "type": "text",
          "text": {
            "content": "There is some ",
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
          "plain_text": "There is some ",
          "href": null
        },
        {
          "type": "text",
          "text": {
            "content": "text",
            "link": null
          },
          "annotations": {
            "bold": true,
            "italic": false,
            "strikethrough": false,
            "underline": false,
            "code": false,
            "color": "default"
          },
          "plain_text": "text",
          "href": null
        },
        {
          "type": "text",
          "text": {
            "content": " in this property!",
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
          "plain_text": " in this property!",
          "href": null
        }
      ]
    }
  }
  ```
</CodeGroup>

<Info>
  The [Retrieve a page endpoint](/reference/retrieve-a-page) returns a maximum of 25 populated inline page or person references for a `rich_text` property. If a `rich_text` property includes more than 25 references, then you can use the [Retrieve a page property item endpoint](/reference/retrieve-a-page-property) for the specific `rich_text` property to get its complete list of references.
</Info>

### Select

<Info>Data source property config: [Select](/reference/property-object#select)</Info>

If the type of a page property value is `select`, then the property value contains a `select` object with the following fields:

| Property | Type            | Description                                                                                                                                                                                                                                                                                                                                                    | Example value                           |
| :------- | :-------------- | :------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :-------------------------------------- |
| `color`  | `string` (enum) | The color of the option. Possible `"color"` values are: <br /><br />- `blue`<br /> - `brown`<br /> - `default`<br /> - `gray`<br /> - `green`<br /> - `orange`<br /> - `pink`<br /> - `purple`<br /> - `red`<br /> - `yellow`<br /><br />Defaults to `default`. The `color` value can’t be updated via the API.                                                | `red`                                   |
| `id`     | `string`        | The ID of the option. <br /><br /> You can use `id` or `name` to [update](/reference/patch-page) a select property.                                                                                                                                                                                                                                            | `"b3d73ca-b2c9-47d8-ae98-3c2ce3b2bffb"` |
| `name`   | `string`        | The name of the option as it appears in Notion. <br /><br /> If the select [data source property](/reference/property-object) doesn't have an option by that name yet, then the name is added to the data source schema if the integration also has write access to the parent data source. <br /><br /> Note: Commas (`","`) are not valid for select values. | `"jQuery"`                              |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `select` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Department": {
        "select": {
          "name": "Marketing"
        }
      }
    }
  }
  ```
</CodeGroup>

#### Example select page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Department": {
      "id": "Yc%3FJ",
      "type": "select",
      "select": {
        "id": "ou@_",
        "name": "jQuery",
        "color": "purple"
      }
    }
  }
  ```
</CodeGroup>

### Status

<Info>Data source property config: [Status](/reference/property-object#status)</Info>

If the type of a page property value is `status`, then the property value contains a `status` object with the following fields:

| Property | Type            | Description                                                                                                                                                                                                                                                                                          | Example value                            |
| :------- | :-------------- | :--------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| `color`  | `string` (enum) | The color of the option. Possible `"color"` values are: <br /><br />- `blue`<br /> - `brown`<br /> - `default`<br /> - `gray`<br /> - `green`<br /> - `orange`<br /> - `pink`<br /> - `purple`<br /> - `red`<br /> - `yellow` Defaults to `default`. The `color` value can’t be updated via the API. | `"red"`                                  |
| `id`     | `string`        | `string`                                                                                                                                                                                                                                                                                             | `"b3d773ca-b2c9-47d8-ae98-3c2ce3b2bffb"` |
| `name`   | `string`        | The name of the option as it appears in Notion.                                                                                                                                                                                                                                                      | `"In progress"`                          |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `status` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Status": {
        "status": {
          "name": "Not started"
        }
      }
    }
  }
  ```
</CodeGroup>

#### Example `status` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Status": {
      "id": "Z%3ClH",
      "type": "status",
      "status": {
        "id": "539f2705-6529-42d8-a215-61a7183a92c0",
        "name": "In progress",
        "color": "blue"
      }
    }
  }
  ```
</CodeGroup>

### Title

<Info>Data source property config: [Title](/reference/property-object#title)</Info>

| Field   | Type                                                  | Description                                            | Example value                                |
| :------ | :---------------------------------------------------- | :----------------------------------------------------- | :------------------------------------------- |
| `title` | an array of [rich text objects](/reference/rich-text) | An array of [rich text objects](/reference/rich-text). | Refer to the example response objects below. |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `title` page property value

<CodeGroup>
  ```json JSON expandable theme={null}
  {
    "properties": {
      "Title": {
        "id": "title",
        "type": "title",
        "title": [
          {
            "type": "text",
            "text": {
              "content": "A better title for the page",
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
            "plain_text": "This is also not done",
            "href": null
          }
        ]
      }
    }
  }
  ```
</CodeGroup>

#### Example `title` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON expandable theme={null}
  {
    "Title": {
      "id": "title",
      "type": "title",
      "title": [
        {
          "type": "text",
          "text": {
            "content": "A better title for the page",
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
          "plain_text": "This is also not done",
          "href": null
        }
      ]
    }
  }
  ```
</CodeGroup>

<Info>
  The [Retrieve a page endpoint](/reference/retrieve-a-page) returns a maximum of 25 inline page or person references for a `title` property. If a `title` property includes more than 25 references, then you can use the [Retrieve a page property item endpoint](/reference/retrieve-a-page-property) for the specific `title` property to get its complete list of references.
</Info>

### URL

<Info>Data source property config: [URL](/reference/property-object#url)</Info>

| Field | Type     | Description                            | Example value                      |
| :---- | :------- | :------------------------------------- | :--------------------------------- |
| `url` | `string` | A string that describes a web address. | `"https://developers.notion.com/"` |

#### Example `properties` body param for a POST or PATCH page request that creates or updates a `url` page property value

<CodeGroup>
  ```json JSON theme={null}
  {
    "properties": {
      "Website": {
        "url": "https://developers.notion.com/"
      }
    }
  }
  ```
</CodeGroup>

#### Example `url` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "Website": {
      "id": "bB%3D%5B",
      "type": "url",
      "url": "https://developers.notion.com/"
    }
  }
  ```
</CodeGroup>

### Unique ID

<Info>Data source property config: [Unique ID](/reference/property-object#unique-id)</Info>

| Field    | Type               | Description                                        | Example value |
| :------- | :----------------- | :------------------------------------------------- | :------------ |
| `number` | `number`           | The ID count (auto-incrementing).                  | 3             |
| `prefix` | `string` or `null` | An optional prefix to be applied to the unique ID. | "RL"          |

<Check>
  Unique IDs can be read using the API with a [GET page](/reference/retrieve-a-page) request, but they cannot be updated with the API, since they are auto-incrementing.
</Check>

#### Example `unique_id` page property value as returned in a GET page request

<CodeGroup>
  ```json JSON theme={null}
  {
    "test-ID": {
      "id": "tqqd",
      "type": "unique_id",
      "unique_id": {
        "number": 3,
        "prefix": "RL",
      },
    },
  }
  ```
</CodeGroup>

### Verification

The verification status of a page in a wiki database. Pages can be verified, unverified, or expired (when a verification's end date is in the past).

You can set or update the verification status via the [Create page](/reference/post-page) and [Update page](/reference/patch-page) endpoints. The `verified_by` field is read-only and is automatically set to the acting integration.

<Info>
  The `verification` property is only available for pages that are part of a [wiki database](/guides/data-apis/working-with-databases#wiki-databases). To learn more about wiki databases and verifying pages, see our [Help Center article](https://www.notion.so/help/wikis-and-verified-pages#verifying-pages).
</Info>

| Field         | Type                                     | Description                                                                                                                                                                                                                                                     | Example value                                |
| :------------ | :--------------------------------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------------------------------- |
| `state`       | `string`                                 | The verification state of the page. Possible values: `"verified"`, `"unverified"`, or `"expired"` (returned when the end date is in the past).                                                                                                                  | `"unverified"`                               |
| `verified_by` | [User](/reference/user) object or `null` | If the page is verified, a [User](/reference/user) object indicating who verified the page. Read-only — automatically set to the acting integration when writing.                                                                                               | Refer to the example response objects below. |
| `date`        | Object or `null`                         | If the page is verified, the date object will include the date the verification started (`start`). If an expiration date is set for the verification, an end date (`end`) will be included. ([ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date and time.) | Refer to the example response objects below. |

#### Example `verification` page property values as returned in a GET page request

**Unverified**

<CodeGroup>
  ```json JSON theme={null}
  {
    "Verification": {
      "id": "fpVq",
      "type": "verification",
      "verification": {
        "state": "unverified",
        "verified_by": null,
        "date": null
      }
    }
  }
  ```
</CodeGroup>

**Verified with no expiration date set**

<CodeGroup>
  ```json JSON theme={null}
  {
    "Verification": {
      "id": "fpVq",
      "type": "verification",
      "verification": {
        "state": "verified",
        "verified_by": {
          "object": "user",
          "id": "01e46064-d5fb-4444-8ecc-ad47d076f804",
          "name": "User Name",
          "avatar_url": null,
          "type": "person",
          "person": {}
        },
        "date": {
          "start": "2023-08-01T04:00:00.000Z",
          "end": null,
          "time_zone": null
        }
      }
    }
  }
  ```
</CodeGroup>

**Verified with 90-day expiration date**

<CodeGroup>
  ```json JSON theme={null}
  {
    "Verification": {
      "id": "fpVq",
      "type": "verification",
      "verification": {
        "state": "verified",
        "verified_by": {
          "object": "user",
          "id": "01e46064-d5fb-4444-8ecc-ad47d076f804"
        },
        "date": {
          "start": "2023-08-01T04:00:00.000Z",
          "end": "2023-10-30T04:00:00.000Z",
          "time_zone": null
        }
      }
    }
  }
  ```
</CodeGroup>

#### Example: set verification via [Update page](/reference/patch-page)

<CodeGroup>
  ```bash cURL theme={null}
  curl https://api.notion.com/v1/pages/60bdc8bd-3880-44b8-a9cd-8a145b3ffbd7 \
    -H 'Authorization: Bearer '"$NOTION_API_KEY"'' \
    -H "Content-Type: application/json" \
    -H "Notion-Version: 2026-03-11" \
    -X PATCH \
    --data '{
    "properties": {
      "Verification": {
        "verification": {
          "state": "verified",
          "date": {
            "start": "2026-03-25T00:00:00.000Z",
            "end": "2026-06-25T00:00:00.000Z"
          }
        }
      }
    }
  }'
  ```

  ```json Unverify a page theme={null}
  {
    "properties": {
      "Verification": {
        "verification": {
          "state": "unverified"
        }
      }
    }
  }
  ```
</CodeGroup>

<Note>
  The `verified_by` field is ignored when writing — the acting integration is always recorded as the verifier. Do not set the verification `Owner` property in the same request; it is managed automatically.
</Note>

### Unsupported properties

The Public API supports a subset of property types. Unsupported types will be returned with a `null` value. Exclude these unsupported types when you are updating page properties.

<CodeGroup>
  ```json JSON theme={null}
  {
  	"properties": {
  		"Place": {
        "id": "%60%40Gq",
        "type": "place",
        "place": null
      }
  	}
  }
  ```
</CodeGroup>

## Paginated page properties

The `title`, `rich_text`, `relation` and `people` page properties are returned as a paginated `list` object of individual `property_item` objects.

An abridged set of the the properties found in the `list` object is below. Refer to the [pagination documentation](/reference/intro#pagination) for additional information.

| Field           | Type               | Description                                                   | Example value                                                                                                                      |
| :-------------- | :----------------- | :------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------------------------------- |
| `object`        | `"list"`           | Always `"list"`.                                              | `"list"`                                                                                                                           |
| `type`          | `"property_item"`  | Always `"property_item"`.                                     | `"property_item"`                                                                                                                  |
| `results`       | `list`             | List of `property_item` objects.                              | `[{"object": "property_item", "id": "vYdV", "type": "relation", "relation": { "id": "535c3fb2-95e6-4b37-a696-036e5eac5cf6"}}... ]` |
| `property_item` | `object`           | A `property_item` object that describes the property.         | `{"id": "title", "next_url": null, "type": "title", "title": {}}`                                                                  |
| `next_url`      | `string` or `null` | The URL the user can request to get the next page of results. | `"http://api.notion.com/v1/pages/0e5235bf86aa4efb93aa772cce7eab71/properties/vYdV?start_cursor=LYxaUO&page_size=25"`               |
