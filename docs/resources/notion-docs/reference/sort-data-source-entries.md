> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Sort data source entries

> A sort is a condition used to order the entries returned from a data source query.

A [data source query](/reference/query-a-data-source) can be sorted by a property and/or timestamp and in a given direction. For example, a library data source can be sorted by the "Name of a book" (i.e. property) and in `ascending` (i.e. direction).

Here is an example of a sort on a data source property.

<CodeGroup>
  ```json Sorting by "Name" property in ascending direction theme={null}
  {
    "sorts": [
      {
        "property": "created_time",
        "direction": "ascending"
      },
    ]
  }
  ```
</CodeGroup>

If you’re using the [Notion SDK for JavaScript](https://github.com/makenotion/notion-sdk-js), you can apply this sorting property to your query like so:

<CodeGroup>
  ```javascript JavaScript theme={null}
  const { Client } = require('@notionhq/client');

  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  // replace with your own data source ID
  const dataSourceId = 'd9824bdc-8445-4327-be8b-5b47500af6ce';

  const sortedRows = async () => {
    const response = await notion.dataSources.query({
      database_id: databaseId,
      sorts: [
        {
          property: "Name",
          direction: "ascending"
        }
      ],
    });
    return response;
  }
  ```
</CodeGroup>

Data source queries can also be sorted by two or more properties, which is formally called a nested sort. The sort object listed first in the nested sort list takes precedence.

Here is an example of a nested sort.

<CodeGroup>
  ```json JSON theme={null}
  {
    "sorts": [
          {
        "property": "Food group",
        "direction": "descending"
      },
      {
        "property": "Name",
        "direction": "ascending"
      }
    ]
  }
  ```
</CodeGroup>

In this example, the data source query will first be sorted by "Food group" and the set with the same food group is then sorted by "Name".

## Sort object

### Property value sort

This sort orders the data source query by a particular property.

The sort object must contain the following properties:

| Property    | Type            | Description                                                                      | Example value   |
| :---------- | :-------------- | :------------------------------------------------------------------------------- | :-------------- |
| `property`  | `string`        | The name of the property to sort against.                                        | `"Ingredients"` |
| `direction` | `string` (enum) | The direction to sort. Possible values include `"ascending"` and `"descending"`. | `"descending"`  |

### Entry timestamp sort

This sort orders the data source query by the timestamp associated with a data source entry.

The sort object must contain the following properties:

| Property    | Type            | Description                                                                                                   | Example value        |
| :---------- | :-------------- | :------------------------------------------------------------------------------------------------------------ | :------------------- |
| `timestamp` | `string` (enum) | The name of the timestamp to sort against. Possible values include `"created_time"` and `"last_edited_time"`. | `"last_edited_time"` |
| `direction` | `string` (enum) | The direction to sort. Possible values include `"ascending"` and `"descending"`.                              | `"descending"`       |
