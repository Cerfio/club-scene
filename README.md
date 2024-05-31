```
# Club Scene

Mini Instagram clone with user authentication, media upload, and follow system.

## Running the Application

To run the application in "watch" mode, use the following command:

```bash
$ pnpm run start:dev
```

The default port for the application is 3000.

## Postman Collection
A Postman collection is available in the root directory "Club-Scene.postman_collection.json" of the project. You can import it into Postman to test the application.

## Available Routes

Here are the routes available in the application:

- **POST /authentication/register**: To create a new user account.
- **POST /authentication/login**: To log in to an existing user account.
- **DELETE /users**: To delete your user account.
- **GET /profiles**: To get your user profiles.
- **PUT /profiles**: To update your user profile.
- **POST /medias**: To create a new media.
- **GET /medias**: To get the list of your medias.
- **PUT /medias/:id**: To update your specific media.
- **DELETE /medias/:id**: To delete your specific media.
- **POST /followers**: To follow a user.
- **GET /followers**: To get the list of followed users.
- **GET /feed**: To get the feed of medias from followed users.

Note: Replace ":id" in routes with the specific identifier.
```
