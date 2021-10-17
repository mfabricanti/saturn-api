# saturn-api Project

**This is the saturn-api Project.
A clean, fast and light-weight social network.**

## Startup

1. Start a blank database
>     docker run --name mydb -e MYSQL_ROOT_PASSWORD=secretpass --rm -p 3306:3306 -d mysql:latest

2. Install dependencies
>     npm install

3. After DB full start, run:
>     npx sequelize db:create
>     node startDatabase.js

4. Start the system
>     npm start
    
5. Navigate to http://localhost:8082/health

## API routes

### Health

GET / OR /health - Apps' Healthcheck

### Usuarios

GET /users - Lists all users

GET /users?fullName=teste - Lists all users filtered by name

GET /users/:id - Get an user data

POST /users - Creates new user

DELETE /users/:id - Deletes an user

PUT /users/:id - Updates user data

PUT /users/:id/photo - Upload new photo to user

### Posts

GET /posts - Lists all posts (feed)

GET /posts/user/:id - Get post from an user

DELETE /posts/:id - Deletes an post

POST /posts - Creates new post

GET /feed - List all posts

### Comments

GET /comments/post/:id - Lists all comments from one post

DELETE /comments/:id - Deletes an user

POST /comments - Creates new user

## Maintained By

* Marcelo Fabricanti

* Rafael Silva