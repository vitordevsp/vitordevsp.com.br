> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Sort database entries

<Danger>
  **Deprecated as of version 2025-09-03**

  This page describes the API for versions up to and including `2022-06-28`. In the new `2025-09-03` version, the concepts of databases and data sources were split up, as described in [Upgrading to 2025-09-03](/guides/get-started/upgrade-guide-2025-09-03).

  Refer to the new page instead:

  * [Sort data source entries](/reference/sort-data-source-entries)
</Danger>

A sort is a condition used to order the entries returned from a database query.

A [database query](/reference/post-database-query) can be sorted by a property and/or timestamp and in a given direction. For example, a library database can be sorted by the "Name of a book" (i.e. property) and in `ascending` (i.e. direction).

Here is an example of a sort on a database property.

<CodeGroup>
  ```json Sorting by "Name" property in ascending direction theme={null}
  {
      "sorts": [
          {
              "property": "Name",
              "direction": "ascending"
          }
      ]
  }
  ```
</CodeGroup>

If you’re using the [Notion SDK for JavaScript](https://github.com/makenotion/notion-sdk-js), you can apply this sorting property to your query like so:

<CodeGroup>
  ```javascript JavaScript theme={null}
  const { Client } = require('@notionhq/client');

  const notion = new Client({ auth: process.env.NOTION_API_KEY });
  // replace with your own database ID
  const databaseId = 'd9824bdc-8445-4327-be8b-5b47500af6ce';

  const sortedRows = async () => {
  	const response = await notion.databases.query({
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

Database queries can also be sorted by two or more properties, which is formally called a nested sort. The sort object listed first in the nested sort list takes precedence.

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

In this example, the database query will first be sorted by "Food group" and the set with the same food group is then sorted by "Name".

## Sort object

### Property value sort

This sort orders the database query by a particular property.

The sort object must contain the following properties:

| Property    | Type            | Description                                                                      | Example value   |
| :---------- | :-------------- | :------------------------------------------------------------------------------- | :-------------- |
| `property`  | `string`        | The name of the property to sort against.                                        | `"Ingredients"` |
| `direction` | `string` (enum) | The direction to sort. Possible values include `"ascending"` and `"descending"`. | `"descending"`  |

### Entry timestamp sort

This sort orders the database query by the timestamp associated with a database entry.

The sort object must contain the following properties:

| Property    | Type            | Description                                                                                                   | Example value        |
| :---------- | :-------------- | :------------------------------------------------------------------------------------------------------------ | :------------------- |
| `timestamp` | `string` (enum) | The name of the timestamp to sort against. Possible values include `"created_time"` and `"last_edited_time"`. | `"last_edited_time"` |
| `direction` | `string` (enum) | The direction to sort. Possible values include `"ascending"` and `"descending"`.                              | `"descending"`       |
