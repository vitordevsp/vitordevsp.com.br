> ## Documentation Index
> Fetch the complete documentation index at: https://developers.notion.com/llms.txt
> Use this file to discover all available pages before exploring further.

# Internal integrations

> Learn how internal integrations work, how permissions are managed, and how to create one.

export const integrationsDashboardUrl = "https://www.notion.so/profile/integrations";

## What is an internal integration?

An internal integration is scoped to a single Notion workspace. Only members of that workspace can use it. Internal integrations are ideal for building custom automations and workflows — things like syncing data from external tools, sending notifications when pages change, or powering internal dashboards.

Internal integrations use a static API token for authentication. There's no OAuth flow to implement — you get a token immediately when you create the integration, and you use that same token for every API request.

In this guide, you'll learn:

* How internal integration permissions work (and how they differ from public integrations)
* How to create an internal integration and share pages with it
* How to authenticate API requests using your integration token

## How permissions work

An internal integration operates as its own **bot user**. It is not tied to any specific workspace member. This means:

* **Permissions belong to the integration, not to a person.** When a page is shared with the integration, the integration itself has access — regardless of which workspace member shared it.
* **Access is inherited.** Sharing a parent page with the integration grants access to all of its child pages as well.
* **Access persists independently of users.** If the user who shared a page leaves the workspace, the integration retains access to that page.
* **Any Workspace Owner can see the integration.** All internal integrations are visible in the Creator dashboard to every Workspace Owner in the workspace, including integrations created by others.

This is one of the biggest differences from [public integrations](/guides/get-started/public-integrations), where the integration acts on behalf of the individual user who authorized it.

## Creating an internal integration

You must be a [Workspace Owner](https://www.notion.so/help/add-members-admins-guests-and-groups) to create an integration.

<Steps>
  <Step>
    Navigate to the <a href={integrationsDashboardUrl}>Creator dashboard</a>.
  </Step>

  <Step>
    In the **Build** section of the sidebar, select **Internal integrations**.
  </Step>

  <Step>
    Click **Create a new integration** and fill in the integration name and associated workspace.

    <Frame>
      <img src="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/aef3bab-new_integrations_2.png?fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=d55ed2a2949f8b719643d18be3bbbb04" alt="" width="1198" height="699" data-path="images/docs/aef3bab-new_integrations_2.png" />
    </Frame>
  </Step>

  <Step>
    After creation, visit the **Configuration** tab to retrieve your API token (the "Internal Integration Secret").

    <Frame>
      <img src="https://mintcdn.com/notion-demo/LHm9qfrJYJOPRxs6/images/docs/7ec836a-integrations_3.png?fit=max&auto=format&n=LHm9qfrJYJOPRxs6&q=85&s=177eb1a48ba6864af95ee77c30f09d6b" alt="" width="1198" height="699" data-path="images/docs/7ec836a-integrations_3.png" />
    </Frame>
  </Step>
</Steps>

You can also configure the integration's [capabilities](/reference/capabilities) — such as whether it can read content, update content, insert content, or read user information — from the **Configuration** tab.

## Granting page access

Before your integration can access any data, it must be explicitly granted access to pages or databases. There are two ways to do this.

### From the Creator dashboard

The integration owner can manage access directly from the **Content access** tab in the Creator dashboard. This is the quickest way to get started after creating an integration.

<Steps>
  <Step>
    Open your integration in the <a href={integrationsDashboardUrl}>Creator dashboard</a>.
  </Step>

  <Step>
    Click the **Content access** tab.
  </Step>

  <Step>
    Click **Edit access**, then select the pages and databases you want the integration to access.
  </Step>
</Steps>

### From the Notion UI

Workspace members can also share individual pages with the integration from within Notion.

<Steps>
  <Step>
    Open a Notion page you want the integration to access.
  </Step>

  <Step>
    Click the **•••** menu in the top-right corner of the page.
  </Step>

  <Step>
    Select **Connections**, then click **+ Add connection**.
  </Step>

  <Step>
    Search for your integration and select it.
  </Step>

  <Step>
    Confirm the integration can access the page and all of its child pages.
  </Step>
</Steps>

<Warning>
  **Your integration needs page access to make API requests**

  A newly created integration has no page access by default. If you skip this step, any API request will return an error. Use the **Content access** tab or **Add connections** menu to grant access before making requests.
</Warning>

## Authentication

Internal integrations authenticate every API request using the API token retrieved from the **Configuration** tab. Include the token in the `Authorization` header:

<CodeGroup>
  ```http HTTP theme={null}
  GET /v1/pages/b55c9c91-384d-452b-81db-d1ef79372b75 HTTP/1.1
  Authorization: Bearer {INTEGRATION_TOKEN}
  ```
</CodeGroup>

If you're using the [Notion SDK for JavaScript](https://github.com/makenotion/notion-sdk-js), the token is set once when initializing the client:

<CodeGroup>
  ```javascript JavaScript theme={null}
  const { Client } = require("@notionhq/client")

  const notion = new Client({
  	auth: process.env.NOTION_TOKEN,
  })
  ```
</CodeGroup>

<Warning>
  **Keep your token secret.** Never store the token in source code or commit it to version control. Use environment variables or a secret manager instead. If your token is accidentally exposed, you can refresh it from the integration's **Configuration** tab.

  [Learn more: Best practices for handling API keys](/guides/get-started/handling-api-keys)
</Warning>

For the full details on internal integration authentication, see the [Authorization guide](/guides/get-started/authorization#internal-integration-auth-flow-set-up).

## Next steps

<CardGroup cols={2}>
  <Card title="Getting started" icon="rocket" href="/guides/get-started/quick-start" horizontal color="#0076d7">
    Build your first integration with a hands-on tutorial.
  </Card>

  <Card title="API reference" icon="code-simple" href="/reference/intro" horizontal color="#0076d7">
    Explore all available endpoints.
  </Card>
</CardGroup>
