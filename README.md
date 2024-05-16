# CSCE 608 Database Systems Project 1
## BOBA - BOBA, Better Organized, Better Appetites 

[BOBA](http://3.21.0.245/) is a website application, providing three primary features: managing your food inventory, creating shopping lists, and discovering recipes.

The client directory is for React and the server directory is for Express.

To run the project,
1. Create the database and import the data: The sql file and all the date are under the data directory.
2. Create a `.env` file under the server directory. It should include:
    ```
    MODE_ENV = development
    PORT = 8080

    DB_HOST = localhost
    DB_USER = root
    DB_NAME = ***YOUR DATABASE***
    DB_PASSWORD = ***YOUR PASSWORD***

    PASSPORT_SECRET = ***A SECRET***
    ``` 

3. Run the server:
   - Move to server directory
   - Run `npm install` to install all the dependencies
   - Run `npm start` to start the server, and it will run on localhost:8080
4. Run the client:
   - Move to client directory
   - Run `npm install` to install all the dependencies
   - Run `npm start` to start the client, and it will run on localhost:3000
