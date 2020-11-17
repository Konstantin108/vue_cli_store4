1) Install JSON Server:

		npm install -g json-server

2) Create a db.json file with some data in main directory of project

{
  "posts": [
    {
      "id": 1,
      "title": "json-server",
      "author": "typicode"
    }
  ],
  "comments": [
    {
      "id": 1,
      "body": "some comment",
      "postId": 1
    }
  ],
  "profile": {
    "name": "typicode"
  }
}

3) Start JSON Server

		json-server --watch db.json

4) Now if you go to http://localhost:3000/posts/1, you'll get

	{ "id": 1, "title": "json-server", "author": "typicode" }