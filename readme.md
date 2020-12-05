# Logger #
Logger is a boilerplate template created as example code for a mySQL, Prisma, and React stack using Passport.js to authenticate users. The backend is set to create both a user and user_accounts table. Functionality to login and register users is setup, as well as check for current session login that will redirect authenticated users past the login screen.

## Installation ##
If you'd like to see the template you can follow the steps below to get Logger up and running locally.
### Backend ###
You'll need to create a blank mySQL schema before getting started. Once that's complete, the following steps will start up your back end: 

In the server folder, run `npm i` to install the dependencies. After installing all dependencies the back end requires two `.env` files. The first should be placed in the `prisma` folder and contain the authentication string for your DB
```
//Username - Typically 'root'
//Password - password for your DB access
//Port - if running locally default mySQL is localhost:3306
//Schema name - name of the database
DATABASE_URL="mysql://USERNAME:PASSWORD@PORT/SCHEMANAME"
```

The second `.env` should be in the `server` folder and contain the following
```
//Session secret - You may wish to run node -e "console.log(require('crypto').randomBytes(32).toString('hex'));" 
//to generate a secret
//Port - the port to run the server on
SESSION_SECRET=...
PORT=...  //NOTE: expecting port 5000 here from the front end API calls, if you're using a different port you'll need to update the references in the API.js file
```

Once the `.env` files are added, run the migrate command to generate a migration file 
```
npx prisma migrate save --experimental
```
Name your migration file, and then run the migration
```
npx prisma migrate up --experimental
```
Note that you may receive an error about dropping the _migrations table, if this is the first migration you can ignore it as the table wouldn't have been created. At this point you should be able to check your database, you should have a `users` and `user_accounts` table created. If all went well, it's time to generate your `prisma schema`, to do this run
```
npx prisma generate
```
This should be the last step, from here all you'll need to do is run `npm start` to start your server.

### Frontend ###
Simpler than the back end, simply run `npm i` from the client folder to install dependencies, afterwards you can start the app with `npm start`

Note: The server is expecting requests from `localhost:3000`, if you're using a different port this will be blocked via CORS unless updated in the back end. Similarly, the front end is expecting to send API requests to port 5000, if this is not the proper port the variable will need to be updated.

## Notes ##

I hope the boilerplate helps you get started in understanding authentication, this was what I created when learning how to interact with `Passport.js` and the local strategy.


