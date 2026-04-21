import { Client } from "@notionhq/client"

/**
 * Cliente Notion singleton para toda a lib.
 *
 * Lê `NOTION_TOKEN` do ambiente. Não fixa `notionVersion` — herda o default
 * do SDK (`@notionhq/client`). Fixar a versão é tarefa do PLAN-002-T006.
 *
 * @see https://github.com/makenotion/notion-sdk-js
 */
export const notion = new Client({
  auth: process.env.NOTION_TOKEN,
})
