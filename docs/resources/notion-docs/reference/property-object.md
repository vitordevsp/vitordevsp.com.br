> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Data source properties

> Data source property objects define the schema of a data source and are rendered as columns in the Notion UI.

All [data source objects](/reference/data-source) include a child `properties` object composed of individual data source property objects. These define the data source schema and are rendered as columns in the Notion UI.

<Info>
  **Looking for page property values?**

  To set or read values on individual rows (pages), see [Page property values](/reference/page-property-values). The API treats data source rows as pages.
</Info>

Every data source property object contains the following fields:

| Field         | Type            | Description                                                                                                                                                                                                                                                                                                                                                                                | Example value |
| :------------ | :-------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `id`          | `string`        | An identifier for the property, usually a short string of random letters and symbols. Some automatically generated property types have special human-readable IDs (e.g. all Title properties have an `id` of `"title"`).                                                                                                                                                                   | `"fy:{"`      |
| `name`        | `string`        | The name of the property as it appears in Notion.                                                                                                                                                                                                                                                                                                                                          |               |
| `description` | `string`        | The description of a property as it appears in Notion.                                                                                                                                                                                                                                                                                                                                     |               |
| `type`        | `string` (enum) | The type that controls the behavior of the property. Possible values are: `"checkbox"`, `"created_by"`, `"created_time"`, `"date"`, `"email"`, `"files"`, `"formula"`, `"last_edited_by"`, `"last_edited_time"`, `"multi_select"`, `"number"`, `"people"`, `"phone_number"`, `"place"`, `"relation"`, `"rich_text"`, `"rollup"`, `"select"`, `"status"`, `"title"`, `"unique_id"`, `"url"` | `"rich_text"` |

Each data source property object also contains a type object. The key of the object is the `type`, and the value is an object containing type-specific configuration. The following sections detail these type-specific objects.

***

## Checkbox

A checkbox property contains checkboxes. The `checkbox` type object is empty; there is no additional configuration.

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example checkbox data source property theme={null}
    {
      "Task complete": {
        "id": "BBla",
        "name": "Task complete",
        "type": "checkbox",
        "checkbox": {}
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    When [setting page property values](/reference/page-property-values#checkbox), pass a boolean:

    ```json Example checkbox page property value theme={null}
    {
      "Task complete": {
        "checkbox": true
      }
    }
    ```
  </Tab>
</Tabs>

***

## Created by

Contains people mentions of each row's author. The `created_by` type object is empty. This value is read-only.

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example created by data source property theme={null}
    {
      "Created by": {
        "id": "%5BJCR",
        "name": "Created by",
        "type": "created_by",
        "created_by": {}
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Returns a [user object](/reference/user). See [Created by page property values](/reference/page-property-values#created-by).

    ```json Example created by page property value theme={null}
    {
      "Created by": {
        "id": "%5BJCR",
        "type": "created_by",
        "created_by": {
          "object": "user",
          "id": "c2f20311-9e54-4d11-8c79-7398424ae41e"
        }
      }
    }
    ```
  </Tab>
</Tabs>

***

## Created time

Contains timestamps of when each row was created. The `created_time` type object is empty. This value is read-only.

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example created time data source property theme={null}
    {
      "Created time": {
        "id": "XcAf",
        "name": "Created time",
        "type": "created_time",
        "created_time": {}
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Returns an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date string. See [Created time page property values](/reference/page-property-values#created-time).

    ```json Example created time page property value theme={null}
    {
      "Created time": {
        "id": "XcAf",
        "type": "created_time",
        "created_time": "2022-10-24T22:54:00.000Z"
      }
    }
    ```
  </Tab>
</Tabs>

***

## Date

Contains date values. The `date` type object is empty; there is no additional configuration.

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example date data source property theme={null}
    {
      "Task due date": {
        "id": "AJP%7D",
        "name": "Task due date",
        "type": "date",
        "date": {}
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Pass a date object with `start` and optional `end` and `time_zone`. See [Date page property values](/reference/page-property-values#date).

    ```json Example date page property value theme={null}
    {
      "Task due date": {
        "date": {
          "start": "2023-02-23",
          "end": null,
          "time_zone": null
        }
      }
    }
    ```
  </Tab>
</Tabs>

***

## Email

Contains email address values. The `email` type object is empty.

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example email data source property theme={null}
    {
      "Contact email": {
        "id": "oZbC",
        "name": "Contact email",
        "type": "email",
        "email": {}
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Pass a string with the email address. See [Email page property values](/reference/page-property-values#email).

    ```json Example email page property value theme={null}
    {
      "Contact email": {
        "email": "ada@makenotion.com"
      }
    }
    ```
  </Tab>
</Tabs>

***

## Files

Contains files uploaded to Notion or external links. The `files` type object is empty.

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example files data source property theme={null}
    {
      "Product image": {
        "id": "pb%3E%5B",
        "name": "Product image",
        "type": "files",
        "files": {}
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Pass an array of [file objects](/reference/file-object). See [Files page property values](/reference/page-property-values#files).

    ```json Example files page property value theme={null}
    {
      "Product image": {
        "files": [
          {
            "type": "external",
            "name": "Space Wallpaper",
            "external": {
              "url": "https://website.domain/images/space.png"
            }
          }
        ]
      }
    }
    ```
  </Tab>
</Tabs>

***

## Formula

Contains values derived from a provided expression. The `formula` type object has:

| Field        | Type     | Description                                                                                                            | Example value           |
| :----------- | :------- | :--------------------------------------------------------------------------------------------------------------------- | :---------------------- |
| `expression` | `string` | The formula used to compute values. Refer to the [Notion help center](https://www.notion.so/help/formulas) for syntax. | `"prop(\"Price\") / 2"` |

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example formula data source property theme={null}
    {
      "Updated price": {
        "id": "YU%7C%40",
        "name": "Updated price",
        "type": "formula",
        "formula": {
          "expression": "prop(\"Price\") / 2"
        }
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Returns a computed result. The value can't be updated directly. See [Formula page property values](/reference/page-property-values#formula).

    ```json Example formula page property value theme={null}
    {
      "Updated price": {
        "id": "YU%7C%40",
        "type": "formula",
        "formula": {
          "type": "number",
          "number": 56
        }
      }
    }
    ```
  </Tab>
</Tabs>

***

## Last edited by

Contains people mentions of the person who last edited each row. The `last_edited_by` type object is empty. This value is read-only.

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example last edited by data source property theme={null}
    {
      "Last edited by": {
        "id": "eB_}",
        "name": "Last edited by",
        "type": "last_edited_by",
        "last_edited_by": {}
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Returns a [user object](/reference/user). See [Last edited by page property values](/reference/page-property-values#last-edited-by).

    ```json Example last edited by page property value theme={null}
    {
      "Last edited by": {
        "id": "eB_}",
        "type": "last_edited_by",
        "last_edited_by": {
          "object": "user",
          "id": "9188c6a5-7381-452f-b3dc-d4865aa89bdf"
        }
      }
    }
    ```
  </Tab>
</Tabs>

***

## Last edited time

Contains timestamps of when each row was last edited. The `last_edited_time` type object is empty. This value is read-only.

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example last edited time data source property theme={null}
    {
      "Last edited time": {
        "id": "jGdo",
        "name": "Last edited time",
        "type": "last_edited_time",
        "last_edited_time": {}
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Returns an [ISO 8601](https://en.wikipedia.org/wiki/ISO_8601) date string. See [Last edited time page property values](/reference/page-property-values#last-edited-time).

    ```json Example last edited time page property value theme={null}
    {
      "Last edited time": {
        "id": "jGdo",
        "type": "last_edited_time",
        "last_edited_time": "2023-02-24T21:06:00.000Z"
      }
    }
    ```
  </Tab>
</Tabs>

***

## Multi-select

Contains values from a range of options. Each row can have one or more options.

The `multi_select` type object includes an `options` array. Each option has:

| Field   | Type            | Description                                                                                                                        | Example value                            |
| :------ | :-------------- | :--------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| `color` | `string` (enum) | The color of the option. Possible values: `blue`, `brown`, `default`, `gray`, `green`, `orange`, `pink`, `purple`, `red`, `yellow` | `"blue"`                                 |
| `id`    | `string`        | An identifier for the option. Does not change if the name is changed.                                                              | `"ff8e9269-9579-47f7-8f6e-83a84716863c"` |
| `name`  | `string`        | The name of the option as it appears in Notion. Commas are not valid. Names must be unique (case-insensitive).                     | `"Fruit"`                                |

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example multi-select data source property expandable theme={null}
    {
      "Store availability": {
        "id": "flsb",
        "name": "Store availability",
        "type": "multi_select",
        "multi_select": {
          "options": [
            {
              "id": "5de29601-9c24-4b04-8629-0bca891c5120",
              "name": "Duc Loi Market",
              "color": "blue"
            },
            {
              "id": "385890b8-fe15-421b-b214-b02959b0f8d9",
              "name": "Rainbow Grocery",
              "color": "gray"
            }
          ]
        }
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Pass an array of option objects with `name` or `id`. See [Multi-select page property values](/reference/page-property-values#multi-select).

    ```json Example multi-select page property value theme={null}
    {
      "Store availability": {
        "multi_select": [
          { "name": "Duc Loi Market" },
          { "name": "Rainbow Grocery" }
        ]
      }
    }
    ```
  </Tab>
</Tabs>

***

## Number

Contains numeric values. The `number` type object has:

| Field    | Type            | Description                                                                                                                                                                                                                                                                       | Example value |
| :------- | :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------ |
| `format` | `string` (enum) | How the number displays in Notion. Values include: `number`, `number_with_commas`, `percent`, `dollar`, `euro`, `pound`, `yen`, `yuan`, `won`, `ruble`, `rupee`, `franc`, `real`, `lira`, `krona`, `ringgit`, and [more](/reference/property-schema-object#number-configuration). | `"percent"`   |

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example number data source property theme={null}
    {
      "Price": {
        "id": "%7B%5D_P",
        "name": "Price",
        "type": "number",
        "number": {
          "format": "dollar"
        }
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Pass a number. See [Number page property values](/reference/page-property-values#number).

    ```json Example number page property value theme={null}
    {
      "Price": {
        "number": 42
      }
    }
    ```
  </Tab>
</Tabs>

***

## People

Contains people mentions. The `people` type object is empty.

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example people data source property theme={null}
    {
      "Project owner": {
        "id": "FlgQ",
        "name": "Project owner",
        "type": "people",
        "people": {}
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Pass an array of [user objects](/reference/user) with `id`. See [People page property values](/reference/page-property-values#people).

    ```json Example people page property value theme={null}
    {
      "Project owner": {
        "people": [
          {
            "object": "user",
            "id": "c2f20311-9e54-4d11-8c79-7398424ae41e"
          }
        ]
      }
    }
    ```
  </Tab>
</Tabs>

***

## Phone number

Contains phone number values. The `phone_number` type object is empty. No format is enforced.

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example phone number data source property theme={null}
    {
      "Contact phone number": {
        "id": "ULHa",
        "name": "Contact phone number",
        "type": "phone_number",
        "phone_number": {}
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Pass a string. See [Phone number page property values](/reference/page-property-values#phone-number).

    ```json Example phone number page property value theme={null}
    {
      "Contact phone number": {
        "phone_number": "415-867-5309"
      }
    }
    ```
  </Tab>
</Tabs>

***

## Place

Contains location values. Can be used with the Map view. The `place` type object is empty.

<Warning>
  Place page property values are not fully supported via the API. Reading a place property returns `null`. See [Unsupported properties](/reference/page-property-values#unsupported-properties).
</Warning>

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example place data source property theme={null}
    {
      "Place": {
        "id": "Xqz4",
        "name": "Place",
        "type": "place",
        "place": {}
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Place values are currently not fully supported via the API. See [Unsupported properties](/reference/page-property-values#unsupported-properties).

    ```json Example place page property value (read-only) theme={null}
    {
      "Place": {
        "id": "%60%40Gq",
        "type": "place",
        "place": null
      }
    }
    ```
  </Tab>
</Tabs>

***

## Relation

Contains [relations](https://www.notion.so/help/relations-and-rollups) — references to pages in another data source.

The `relation` type object has:

| Field            | Type            | Description                                                                                                                                                           | Example value                            |
| :--------------- | :-------------- | :-------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| `data_source_id` | `string` (UUID) | The data source that the relation refers to. Linked page values must belong to this data source.                                                                      | `"668d797c-76fa-4934-9b05-ad288df2d136"` |
| `dual_property`  | `object`        | An object with `synced_property_id` and `synced_property_name` for the corresponding property in the related data source. Present for dual (bidirectional) relations. | See example below.                       |

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example relation data source property theme={null}
    {
      "Projects": {
        "id": "~pex",
        "name": "Projects",
        "type": "relation",
        "relation": {
          "data_source_id": "6c4240a9-a3ce-413e-9fd0-8a51a4d0a49b",
          "dual_property": {
            "synced_property_name": "Tasks",
            "synced_property_id": "JU]K"
          }
        }
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Pass an array of page references with `id`. See [Relation page property values](/reference/page-property-values#relation).

    ```json Example relation page property value theme={null}
    {
      "Projects": {
        "relation": [
          { "id": "dd456007-6c66-4bba-957e-ea501dcda3a6" },
          { "id": "0c1f7cb2-8090-4f18-924e-d92965055e32" }
        ]
      }
    }
    ```
  </Tab>
</Tabs>

<Info>
  **Related databases must be shared with your integration**

  To retrieve or update relation properties, the related database must also be shared with your integration.
</Info>

***

## Rich text

Contains text values. The `rich_text` type object is empty.

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example rich text data source property theme={null}
    {
      "Project description": {
        "id": "NZZ%3B",
        "name": "Project description",
        "type": "rich_text",
        "rich_text": {}
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Pass an array of [rich text objects](/reference/rich-text). See [Rich text page property values](/reference/page-property-values#rich-text).

    ```json Example rich text page property value theme={null}
    {
      "Project description": {
        "rich_text": [
          {
            "type": "text",
            "text": { "content": "A project description" }
          }
        ]
      }
    }
    ```
  </Tab>
</Tabs>

***

## Rollup

Contains values pulled from a related data source via a [rollup](https://www.notion.so/help/relations-and-rollups).

The `rollup` type object has:

| Field                    | Type            | Description                                                                                                                                                                                                                                                                                                                                                 | Example value        |
| :----------------------- | :-------------- | :---------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- | :------------------- |
| `function`               | `string` (enum) | The function that computes the rollup value. Values include: `average`, `checked`, `count`, `count_values`, `date_range`, `earliest_date`, `empty`, `latest_date`, `max`, `median`, `min`, `not_empty`, `percent_checked`, `percent_empty`, `percent_not_empty`, `percent_unchecked`, `range`, `show_original`, `show_unique`, `sum`, `unchecked`, `unique` | `"sum"`              |
| `relation_property_id`   | `string`        | The `id` of the related data source property.                                                                                                                                                                                                                                                                                                               | `"fy:{"`             |
| `relation_property_name` | `string`        | The `name` of the related data source property.                                                                                                                                                                                                                                                                                                             | `"Tasks"`            |
| `rollup_property_id`     | `string`        | The `id` of the property being rolled up.                                                                                                                                                                                                                                                                                                                   | `"fy:{"`             |
| `rollup_property_name`   | `string`        | The `name` of the property being rolled up.                                                                                                                                                                                                                                                                                                                 | `"Days to complete"` |

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example rollup data source property theme={null}
    {
      "Estimated total project time": {
        "id": "%5E%7Cy%3C",
        "name": "Estimated total project time",
        "type": "rollup",
        "rollup": {
          "rollup_property_name": "Days to complete",
          "relation_property_name": "Tasks",
          "rollup_property_id": "\\nyY",
          "relation_property_id": "Y]<y",
          "function": "sum"
        }
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Returns a computed result. The value can't be updated directly. See [Rollup page property values](/reference/page-property-values#rollup).

    ```json Example rollup page property value theme={null}
    {
      "Estimated total project time": {
        "id": "%5E%7Cy%3C",
        "type": "rollup",
        "rollup": {
          "type": "number",
          "number": 14,
          "function": "sum"
        }
      }
    }
    ```
  </Tab>
</Tabs>

***

## Select

Contains values from a selection of options. Only one option per row.

The `select` type object includes an `options` array. Each option has:

| Field   | Type            | Description                                                                                                                        | Example value                            |
| :------ | :-------------- | :--------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| `color` | `string` (enum) | The color of the option. Possible values: `blue`, `brown`, `default`, `gray`, `green`, `orange`, `pink`, `purple`, `red`, `yellow` | `"red"`                                  |
| `id`    | `string`        | An identifier for the option. Does not change if the name is changed.                                                              | `"ff8e9269-9579-47f7-8f6e-83a84716863c"` |
| `name`  | `string`        | The name of the option as it appears in Notion. Commas are not valid. Names must be unique (case-insensitive).                     | `"Fruit"`                                |

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example select data source property expandable theme={null}
    {
      "Food group": {
        "id": "%40Q%5BM",
        "name": "Food group",
        "type": "select",
        "select": {
          "options": [
            {
              "id": "e28f74fc-83a7-4469-8435-27eb18f9f9de",
              "name": "Vegetable",
              "color": "purple"
            },
            {
              "id": "6132d771-b283-4cd9-ba44-b1ed30477c7f",
              "name": "Fruit",
              "color": "red"
            },
            {
              "id": "fc9ea861-820b-4f2b-bc32-44ed9eca873c",
              "name": "Protein",
              "color": "yellow"
            }
          ]
        }
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Pass an option object with `name` or `id`. See [Select page property values](/reference/page-property-values#select).

    ```json Example select page property value theme={null}
    {
      "Food group": {
        "select": {
          "name": "Fruit"
        }
      }
    }
    ```
  </Tab>
</Tabs>

***

## Status

Contains values from a list of status options, organized into groups.

The `status` type object includes `options` and `groups` arrays.

**Options** — each has:

| Field   | Type            | Description                                                                                                                        | Example value                            |
| :------ | :-------------- | :--------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| `color` | `string` (enum) | The color of the option. Possible values: `blue`, `brown`, `default`, `gray`, `green`, `orange`, `pink`, `purple`, `red`, `yellow` | `"green"`                                |
| `id`    | `string`        | An identifier for the option.                                                                                                      | `"ff8e9269-9579-47f7-8f6e-83a84716863c"` |
| `name`  | `string`        | The name of the option as it appears in Notion. Commas are not valid. Names must be unique (case-insensitive).                     | `"In progress"`                          |

**Groups** — each has:

| Field        | Type             | Description                                                                                                                       | Example value                            |
| :----------- | :--------------- | :-------------------------------------------------------------------------------------------------------------------------------- | :--------------------------------------- |
| `color`      | `string` (enum)  | The color of the group. Possible values: `blue`, `brown`, `default`, `gray`, `green`, `orange`, `pink`, `purple`, `red`, `yellow` | `"purple"`                               |
| `id`         | `string`         | An identifier for the group.                                                                                                      | `"ff8e9269-9579-47f7-8f6e-83a84716863c"` |
| `name`       | `string`         | The name of the group as it appears in Notion.                                                                                    | `"To do"`                                |
| `option_ids` | array of strings | Sorted list of `id`s of options that belong to this group.                                                                        |                                          |

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example status data source property expandable theme={null}
    {
      "Status": {
        "id": "biOx",
        "name": "Status",
        "type": "status",
        "status": {
          "options": [
            { "id": "034ece9a-384d-4d1f-97f7-7f685b29ae9b", "name": "Not started", "color": "default" },
            { "id": "330aeafb-598c-4e1c-bc13-1148aa5963d3", "name": "In progress", "color": "blue" },
            { "id": "497e64fb-01e2-41ef-ae2d-8a87a3bb51da", "name": "Done", "color": "green" }
          ],
          "groups": [
            { "id": "b9d42483-e576-4858-a26f-ed940a5f678f", "name": "To-do", "color": "gray", "option_ids": ["034ece9a-384d-4d1f-97f7-7f685b29ae9b"] },
            { "id": "cf4952eb-1265-46ec-86ab-4bded4fa2e3b", "name": "In progress", "color": "blue", "option_ids": ["330aeafb-598c-4e1c-bc13-1148aa5963d3"] },
            { "id": "4fa7348e-ae74-46d9-9585-e773caca6f40", "name": "Complete", "color": "green", "option_ids": ["497e64fb-01e2-41ef-ae2d-8a87a3bb51da"] }
          ]
        }
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Pass an option object with `name` or `id`. See [Status page property values](/reference/page-property-values#status).

    ```json Example status page property value theme={null}
    {
      "Status": {
        "status": {
          "name": "In progress"
        }
      }
    }
    ```
  </Tab>
</Tabs>

<Note>
  When creating a status property without specifying options, defaults ("Not started", "In progress", "Done") with groups ("To-do", "In progress", "Complete") are created. To reconfigure groups after creation, use the Notion UI.
</Note>

***

## Title

Controls the title that appears at the top of a page when a data source row is opened. The `title` type object is empty.

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example title data source property theme={null}
    {
      "Project name": {
        "id": "title",
        "name": "Project name",
        "type": "title",
        "title": {}
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Pass an array of [rich text objects](/reference/rich-text). See [Title page property values](/reference/page-property-values#title).

    ```json Example title page property value theme={null}
    {
      "Project name": {
        "title": [
          {
            "type": "text",
            "text": { "content": "My project" }
          }
        ]
      }
    }
    ```
  </Tab>
</Tabs>

<Warning>
  **All data sources require exactly one `title` property.**
  The API throws errors if you create a data source without a `title` property, or attempt to add or remove a `title` property.
</Warning>

<Info>
  **Title data source property vs. data source title**

  A `title` data source property is a type of column in a data source. A data source `title` defines the name of the data source itself, found on the [data source object](/reference/data-source). Every data source requires both.
</Info>

***

## Unique ID

Automatically incremented, unique across all pages in a data source. Useful for task or bug report IDs (e.g. `TASK-1234`). This value is read-only.

The `unique_id` type object has an optional `prefix`:

| Field    | Type               | Description                                                                                  | Example value |
| :------- | :----------------- | :------------------------------------------------------------------------------------------- | :------------ |
| `prefix` | `string` or `null` | A common prefix assigned to pages. When set, enables lookup URLs like `notion.so/TASK-1234`. | `"TASK"`      |

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example unique ID data source property theme={null}
    {
      "Task ID": {
        "id": "tqqd",
        "name": "Task ID",
        "type": "unique_id",
        "unique_id": {
          "prefix": "TASK"
        }
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Returns the auto-incremented number and optional prefix. See [Unique ID page property values](/reference/page-property-values#unique-id).

    ```json Example unique ID page property value theme={null}
    {
      "Task ID": {
        "id": "tqqd",
        "type": "unique_id",
        "unique_id": {
          "number": 3,
          "prefix": "TASK"
        }
      }
    }
    ```
  </Tab>
</Tabs>

***

## URL

Contains URL values. The `url` type object is empty.

<Tabs sync={false} borderBottom={true}>
  <Tab title="Property">
    ```json Example URL data source property theme={null}
    {
      "Project URL": {
        "id": "BZKU",
        "name": "Project URL",
        "type": "url",
        "url": {}
      }
    }
    ```
  </Tab>

  <Tab title="Value">
    Pass a string with the URL. See [URL page property values](/reference/page-property-values#url).

    ```json Example URL page property value theme={null}
    {
      "Project URL": {
        "url": "https://developers.notion.com/"
      }
    }
    ```
  </Tab>
</Tabs>
