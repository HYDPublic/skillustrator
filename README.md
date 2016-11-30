# Skillustrator

## API

### Run the application in ASP.NET Core container and database container

1. If you haven't built yet, run: 

    `docker-compose build`

1. To start the containers & the app, run: 

    `docker-compose up -d`

It should be running on http://localhost:5000/api/articles now.

1. If you need to log into the container (i.e. run migrations or troubleshoot), use this command. Use `docker ps` to list running containers and see the name:

    `docker exec -it <container_name> bash`

1. When you're finished developing, run this to *stop the app & containers*. Simply run the up command above to restart them:

    `docker-compose stop`

    *NOTES:* 
    If you want to stop and destory the containers (and will also delete the database server & data), run `docker-compose down`. You can see what Docker images you have with `docker images`, and what *running* containers you have with `docker ps` (put -a on to see them all). 
    
    You might want to delete containers and images. Please refer to `docker rm` and `docker rmi` for how.

1. To see the console output within the container, run `docker logs <container_name>`

### NOTE: To run a web container only

1. If you haven't built the image, run:

    `docker build -t <tag>:<image name> . `

1. Then run this to create the container: 

    `docker run -dt -p 5000:5000 -v $(pwd):/app -t msexcella:aspnetcore-dev-env`

### Add a database migration when model changes 

1. Log into the app container (see instructions above)

1. Run `dotnet ef migrations add <name>`

1. Run `dotnet ef database update`

1. Add an item to the database. You can either use the following curl command, or your favorite tool like Postman:

    `
    curl -H "Content-Type: application/json" -X POST -d '{"name":"Posted"}' http://localhost:5000/api/articles
    `

### Manage the database via psql CLI

1. Install Postgres or the client only

1. Run `psql -h localhost -p 5432 -d skillustrator -U postgres --password`

1. To list tables in the database type, `\dt`. You can do other database operations here. 

1. To exit type, `\q`

## UI

### To run this Angular 2/Angular-CLI UI:

First, you will need Node 4 or higher, as well as NPM 3 or higher (download here https://nodejs.org/en/download/).

Second, install Angular-CLI globally:
```bash
npm install -g angular-cli
```

Run the following commands to install dependencies and create a server:

```bash
cd UI
npm install
ng serve
```
Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.


## Specs

- Database
    - Local: SQL Server localdb, Production: Azure SQL
- API: 
    - ASP.NET Core Web API in a Docker container
    - Data layer: EF Core 1.0, repository pattern
- UI: Angular 2