# Notion

api/notion -> recurso do notion dentro da api

## posts

* GET -> api/notion/posts -> retorna todos os posts

* GET -> api/notion/posts/uuid -> retorna um unico post
  + ?body=true -> adiciona o corpo do post no obj de retorno

## projects

* GET -> api/notion/projects -> retorna todos os projects

## videos

* GET -> api/notion/videos -> retorna todos os videos

## contents

* GET -> api/notion/contents -> retorna todos os contents

* GET -> api/notion/contents/tags -> retorna todos as tags de contents
  + ?pageSize=50
