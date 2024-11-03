Spinbet Backend

Installation
To install this project, you need to have Node.js and npm installed. Follow the steps below to set up the project:

1. Clone the repository:
- git clone <https://github.com/cedric28/spinbet-backend.git>
- cd spinbet-backend

2. Install dependencies:
- Run the following command to install the required libraries:
- npm install

3. Set up environment variables:

- Create a .env file in the root of the project and add the necessary environment variables. For example:

- DATABASE_URL=your_database_url
- JWT_PRIVATE_KEY=your_jwt_secret_key

Running the Project
- To start the project, use the following command:

- npm run dev

- This will start the server in development mode using nodemon, which automatically restarts the server when changes are detected.


Postman Collection Overview
- check the postman collection in the collection folder

1. REGISTER 
- Endpoint: POST /api/auth/register
- Description: Registers a new user.
- Body (JSON):
```
{
    "name": "cedced",
    "email": "ceds@gmail.com",
    "password": "passw0rd"
}
```

2. LOGIN
- Endpoint: POST /api/auth/login
- Description: Logs in the user and retrieves a JWT token.
- Body (JSON):
```
{
    "email": "ceds@gmail.com",
    "password": "passw0rd"
}
```

- Authentication: Bearer token (from previous login response if needed).

3. CREATE PARTICIPATIONS

- Endpoint: POST /api/participation
- Description: Creates a new participation entry.
- Body (JSON):
```
{
    "firstName": "Sample2",
    "lastName": "Sample 2",
    "percentage": 5,
    "userId": 13
}
```

- Authentication: Bearer token required.
4. GET ALL PARTICIPATIONS BY USER ID
- Endpoint: GET /api/participation/user/{id}
- Description: Retrieves all participation entries.
- Authentication: Bearer token required.

5. UPDATE PARTICIPATION
- Endpoint: PUT /api/participation/{id}
- Description: Updates a specific participation entry.
- Body (JSON):
```
{
    "firstName": "Sample3",
    "lastName": "Sample 3",
    "percentage": 8,
    "userId": 13
}
```
- Authentication: Bearer token required.

6. DELETE PARTICIPATION
- Endpoint: DELETE /api/participation/{id}
- Description: Deletes a specific participation entry.
- Authentication: Bearer token required.

7. GET PARTICIPATION
- Endpoint: GET /api/participation/{id}
- Description: Retrieves details of a specific participation entry.
- Authentication: Bearer token required.

Notes
- Replace {id} in the endpoints with the specific participation ID as needed.
- Update any expired tokens in the request headers if required.
- Ensure that the local server is running on localhost:5000 or modify the base URL accordingly.


Dependencies
- @prisma/client: The Prisma Client is an auto-generated and type-safe query builder for Node.js, which makes database interactions easy and efficient.

- bcryptjs: A library to hash passwords, providing a secure way to store user credentials.

- compression: Middleware to compress response bodies, improving performance and reducing bandwidth.

- dotenv: A zero-dependency module that loads environment variables from a .env file into process.env.

- express: A web framework for Node.js that simplifies building web applications and APIs.

- express-async-errors: A middleware that allows for easier error handling in asynchronous Express route handlers.

- helmet: A collection of middleware to secure Express apps by setting various HTTP headers.

- jsonwebtoken: A library for creating and verifying JSON Web Tokens (JWT), often used for authentication.

- pg: A PostgreSQL client for Node.js, enabling interaction with PostgreSQL databases.

- prisma: An ORM that simplifies database access and management with a type-safe API.

-  winston: A versatile logging library for Node.js, allowing you to log messages in various formats and transports.

Development Dependencies
- @types/bcryptjs: TypeScript type definitions for bcryptjs.

- @types/compression: TypeScript type definitions for compression.

- @types/dotenv: TypeScript type definitions for dotenv.

- @types/express: TypeScript type definitions for express.

- @types/jest: TypeScript type definitions for Jest, a JavaScript testing framework.

- @types/jsonwebtoken: TypeScript type definitions for jsonwebtoken.

- @types/node: TypeScript type definitions for Node.js.

- @types/supertest: TypeScript type definitions for supertest, a library for testing HTTP servers.

- jest: A testing framework that allows for unit and integration testing.

- nodemon: A utility that monitors changes in the source code and automatically restarts the server.

- supertest: A library for testing HTTP requests in Node.js, making it easier to test APIs.

- ts-jest: A Jest transformer that allows you to run TypeScript tests.

- ts-node: A TypeScript execution engine for Node.js, allowing you to run TypeScript scripts directly.

- typescript: The TypeScript language, providing static typing for JavaScript.