> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Enhanced markdown format

> Reference for the Notion-flavored Markdown format used by the markdown content endpoints.

## Overview

Enhanced markdown (also called "Notion-flavored Markdown") is an extended Markdown format that supports all Notion block and rich text types. It is used by the markdown content endpoints: `POST /v1/pages` (via the `markdown` body param), `GET /v1/pages/:page_id/markdown`, and `PATCH /v1/pages/:page_id/markdown`.

This format extends standard Markdown with XML-like tags and attribute lists to represent Notion-specific features such as callouts, toggles, columns, mentions, and block-level colors.

## Indentation

Use tabs for indentation. Child blocks are indented one tab deeper than their parent.

## Escaping

Use backslashes to escape special characters. The following characters should be escaped outside of code blocks: `\` `*` `~` `` ` `` `$` `[` `]` `<` `>` `{` `}` `|` `^`

Do **not** escape characters inside code blocks. Code block content is literal.

## Block types

### Text

```
Rich text {color="Color"}
	Children
```

### Headings

```
# Heading 1 {color="Color"}
## Heading 2 {color="Color"}
### Heading 3 {color="Color"}
#### Heading 4 {color="Color"}
```

Headings do not support children. Headings 5 and 6 are converted to heading 4.

### Lists

```
- Bulleted list item {color="Color"}
	Children

1. Numbered list item {color="Color"}
	Children
```

List items should contain inline rich text. Other block types render as children of an empty list item.

### To-do

```
- [ ] Unchecked item {color="Color"}
	Children
- [x] Checked item {color="Color"}
	Children
```

### Quote

```
> Rich text {color="Color"}
	Children
```

For multi-line quotes, use `<br>` tags within a single `>` line:

```
> Line 1<br>Line 2<br>Line 3 {color="Color"}
```

Multiple `>` lines render as separate quote blocks, not a single multi-line quote.

### Toggle

```html theme={null}
<details color="Color">
<summary>Toggle title</summary>
Children (must be indented)
</details>
```

Toggle headings use the `{toggle="true"}` attribute:

```
# Heading {toggle="true" color="Color"}
	Children
```

### Callout

```
<callout icon="emoji" color="Color">
	Rich text
	Children
</callout>
```

Callouts can contain multiple blocks and nested children, not just inline rich text. Each child block should be indented.

### Code

````
```language
Code content
```
````

Do not escape special characters inside code blocks. Set the language if known. Use ` ```mermaid ` for Mermaid diagrams.

### Equation

```
$$
Equation
$$
```

### Table

```html theme={null}
<table fit-page-width="true|false" header-row="true|false" header-column="true|false">
	<colgroup>
		<col color="Color">
	</colgroup>
	<tr color="Color">
		<td color="Color">Cell content</td>
	</tr>
</table>
```

All attributes are optional (default to `false`). Color precedence from highest to lowest: cell, row, column. Table cells can only contain rich text.

### Divider

```
---
```

### Empty line

```
<empty-block/>
```

Must be on its own line. Plain empty lines are stripped out.

### Columns

```html theme={null}
<columns>
	<column>
		Children
	</column>
	<column>
		Children
	</column>
</columns>
```

### Media blocks

```
![Caption](URL) {color="Color"}
```

```html theme={null}
<audio src="URL" color="Color">Caption</audio>
<video src="URL" color="Color">Caption</video>
<file src="URL" color="Color">Caption</file>
<pdf src="URL" color="Color">Caption</pdf>
```

### Page and database references

```html theme={null}
<page url="URL" color="Color">Title</page>
<database url="URL" inline="true|false" icon="Emoji" color="Color">Title</database>
```

### Table of contents

```html theme={null}
<table_of_contents color="Color"/>
```

### Synced block

```html theme={null}
<synced_block url="URL">
	Children
</synced_block>

<synced_block_reference url="URL">
	Children
</synced_block_reference>
```

## Rich text formatting

| Format        | Syntax                               |
| ------------- | ------------------------------------ |
| Bold          | `**text**`                           |
| Italic        | `*text*`                             |
| Strikethrough | `~~text~~`                           |
| Underline     | `<span underline="true">text</span>` |
| Inline code   | `` `code` ``                         |
| Link          | `[text](URL)`                        |
| Inline math   | `$equation$`                         |
| Line break    | `<br>`                               |
| Color         | `<span color="Color">text</span>`    |

### Mentions

```html theme={null}
<mention-user url="URL">User name</mention-user>
<mention-page url="URL">Page title</mention-page>
<mention-database url="URL">Database name</mention-database>
<mention-data-source url="URL">Data source name</mention-data-source>
<mention-agent url="URL">Agent name</mention-agent>
<mention-date start="YYYY-MM-DD" end="YYYY-MM-DD"/>
<mention-date start="YYYY-MM-DD" startTime="HH:mm" timeZone="IANA_TIMEZONE"/>
```

Self-closing format is also supported: `<mention-user url="URL"/>`.

### Custom emoji

```
:emoji_name:
```

### Citations

```
[^URL]
```

## Colors

### Text colors

`gray`, `brown`, `orange`, `yellow`, `green`, `blue`, `purple`, `pink`, `red`

### Background colors

`gray_bg`, `brown_bg`, `orange_bg`, `yellow_bg`, `green_bg`, `blue_bg`, `purple_bg`, `pink_bg`, `red_bg`

### Usage

* **Block colors**: Add `{color="Color"}` attribute to the first line of any block.
* **Inline text colors**: Use `<span color="Color">Rich text</span>`.

## Complete example

A Notion page with a heading, a callout, a to-do list, and a code block renders as:

````
# Project kickoff {color="blue"}

<callout icon="🎯" color="blue_bg">
	Ship the MVP by **Friday**.
</callout>

- [x] Write spec
- [ ] Build prototype
- [ ] Collect feedback

```python
def greet(name):
    return f"Hello, {name}!"
```

| Status | Owner |
|---|---|
| In progress | <mention-user url="{{user://abc123}}">Ada</mention-user> |
````
