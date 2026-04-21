> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Overview

> Discover what Notion integrations are, when to use each type, and what you can build.

## Using the Notion API

Notion integrations let you connect your workspace to external tools and automate workflows through code. With the REST API, you can read, create, and update nearly everything in a workspace — pages, databases, users, comments, and more.

When you create an integration, you define what it can do: which API endpoints it can call, what content it can read or write, and how it authenticates. Each integration gets its own credentials and its own set of permissions.

## What is a Notion integration?

A Notion integration — sometimes called a [connection](https://www.notion.so/help/add-and-manage-connections-with-the-api) — connects your workspace to external apps and tools. That could be a SaaS product, an automation script, or a custom tool you've built.

Integrations are added to Notion workspaces and require **explicit permission** from users to access Notion pages and databases.

<Frame caption="Create Notion integrations that unlock new possibilities for teams.">
  <img src="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/0f06356-notion_overview.jpg?fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=ab31886c0c84514c8db8a2801d4fffe4" width="1800" height="1200" data-path="images/docs/0f06356-notion_overview.jpg" />
</Frame>

Notion already has a [library](https://www.notion.so/integrations/all) of integrations you can browse. For developers who want to build their own, Notion supports both internal and public integrations — both powered by the same REST API.

## Integration types

Notion integrations come in two types:

* **Internal integrations** are scoped to a single workspace and use a static API token. They're ideal for custom automations and workflows — things like syncing data, sending notifications, or building internal dashboards.
* **Public integrations** use OAuth 2.0 for authentication. At creation time, you choose their [installation scope](/guides/get-started/public-integrations#installation-scope): **Any workspace** (any Notion user can install; Marketplace-eligible) or **Selected workspaces only** (restricted to workspaces you approve; not Marketplace-eligible).

<Note>
  Public integrations must undergo a Notion security review before being [listed on the Marketplace](/guides/get-started/marketplace-listing). You can create and use a public integration without listing it.
</Note>

### Comparison

| Feature            | Internal integrations                                               | Public integrations                                                                                        |
| :----------------- | :------------------------------------------------------------------ | :--------------------------------------------------------------------------------------------------------- |
| Installation scope | Single workspace.                                                   | Any workspace, or a specific set of workspaces chosen at creation time. Scope can't change after creation. |
| User access        | Only members of the workspace where it's installed.                 | Any user in a workspace where the integration is allowed to install.                                       |
| Content access     | Granted directly to the integration, not tied to any specific user. | Users choose which pages to share during the OAuth flow or via the Add connections menu.                   |
| Authentication     | Static API token.                                                   | OAuth 2.0.                                                                                                 |

<Info>
  **Looking for SCIM or SAML SSO?**

  Enterprise identity management (user provisioning, group management, and Single Sign-On) is covered in Notion's Help Center, not in these API docs.

  <CardGroup cols={2}>
    <Card title="Provision users and groups with SCIM" icon="angles-right" href="https://www.notion.so/help/provision-users-and-groups-with-scim" horizontal color="#0076d7" />

    <Card title="SAML SSO configuration" icon="angles-right" href="https://www.notion.so/help/saml-sso-configuration" horizontal color="#0076d7" />
  </CardGroup>
</Info>

## Shared concepts

All integration types share a few core concepts.

### Capabilities

Every integration has a set of capabilities that control what it can do — read content, update content, insert content, read comments, and more. You configure capabilities when you create an integration, and you can update them later. See the [Capabilities reference](/reference/capabilities) for the full list.

<CardGroup cols={2}>
  <Card title="Pages" icon="file-lines" href="/guides/data-apis/working-with-page-content" horizontal color="#0076d7">
    Create, update, and retrieve page content.
  </Card>

  <Card title="Databases" icon="database" href="/guides/data-apis/working-with-databases" horizontal color="#0076d7">
    Manage database, properties, entries, and schemas.
  </Card>

  <Card title="Views" icon="table-columns" href="/guides/data-apis/working-with-views" horizontal color="#0076d7">
    Create and configure database views programmatically.
  </Card>

  <Card title="Data sources" icon="database" href="/reference/data-source" horizontal color="#0076d7">
    Manage data sources, properties, entries, and schemas.
  </Card>

  <Card title="File uploads" icon="file-arrow-up" href="/guides/data-apis/working-with-files-and-media" horizontal color="#0076d7">
    Upload and attach files to pages and databases.
  </Card>

  <Card title="Comments" icon="comment-dots" href="/guides/data-apis/working-with-comments" horizontal color="#0076d7">
    Handle page and inline comments.
  </Card>

  <Card title="Content queries" icon="magnifying-glass" href="/reference/post-search" horizontal color="#0076d7">
    Search through workspace content.
  </Card>

  <Card title="Users" icon="users" href="/reference/user" horizontal color="#0076d7">
    Access user profiles and permissions.
  </Card>
</CardGroup>

### Content access

Integrations must be explicitly granted access to pages and databases before they can interact with them. The mechanism differs by type:

* **Internal integrations** can be granted access in two ways: the integration owner can add pages directly from the **Content access** tab in the Creator dashboard, or workspace members can share pages via the **Add connections** menu in Notion.
* **Public integrations** use the OAuth page picker, where users select which pages to grant access to during the authorization flow.

See the [Internal integrations](/guides/get-started/internal-integrations) and [Public integrations](/guides/get-started/public-integrations) guides for specifics on how content access works for each type.

### Webhooks

Integrations can subscribe to real-time events — like page updates, property changes, and new comments — via webhooks. This allows your integration to react to changes in Notion without polling the API. See the [Webhooks guide](/reference/webhooks) for details on setting up webhook subscriptions.

## Starting your integration journey

We recommend starting with an internal integration — it's the fastest way to begin building. You get an API token immediately and can focus entirely on using the API within your workspace, without worrying about OAuth or Marketplace listing. You can always create a public integration later if you need multi-workspace support.

Here's a guided path through the documentation:

<Steps>
  <Step>
    [**Quickstart**](/guides/get-started/quick-start) — Build your first integration with a hands-on tutorial.
  </Step>

  <Step>
    [**Internal integrations**](/guides/get-started/internal-integrations) — Understand how internal integrations work, including the permissions model.
  </Step>

  <Step>
    [**Public integrations**](/guides/get-started/public-integrations) — Learn how public integrations work, including installation scope and the OAuth flow.
  </Step>

  <Step>
    [**Authorization**](/guides/get-started/authorization) — Implement the OAuth 2.0 flow for public integrations.
  </Step>

  <Step>
    [**Handling API keys**](/guides/get-started/handling-api-keys) — Secure and manage your API tokens in production.
  </Step>

  <Step>
    [**Preparing for users**](/guides/get-started/preparing-for-users) — Set up databases, pages, and views automatically when users install your integration.
  </Step>

  <Step>
    [**List on the Marketplace**](/guides/get-started/marketplace-listing) — Make your public integration discoverable to all Notion users.
  </Step>
</Steps>

## Resources

Explore the links below to get started, and join the [Notion Devs Slack community](https://join.slack.com/t/notiondevs/shared_invite/zt-3u9oid9q8-HLUBmMVWYK~g9HFo4U4raA) to share your projects and connect with fellow developers.

<CardGroup cols={2}>
  <Card title="API reference" icon="code-simple" href="/reference/intro" horizontal color="#0076d7" />

  <Card title="Notion SDK for JavaScript" icon="js" href="https://github.com/makenotion/notion-sdk-js" horizontal color="#0076d7" />

  <Card title="Starter templates" icon="code" href="https://github.com/makenotion/notion-sdk-typescript-starter" horizontal color="#0076d7" />

  <Card title="Postman collection" icon="box" href="https://www.postman.com/notionhq/notion-s-api-workspace/collection/52041987-03f70d8f-b6e5-4306-805c-f95f7cdf05b9" horizontal color="#0076d7" />

  <Card title="FAQs" icon="circle-question" href="/page/frequently-asked-questions" horizontal color="#0076d7" />

  <Card title="Notion Devs Slack" icon="slack" href="https://join.slack.com/t/notiondevs/shared_invite/zt-3u9oid9q8-HLUBmMVWYK~g9HFo4U4raA" horizontal color="#0076d7" />
</CardGroup>
