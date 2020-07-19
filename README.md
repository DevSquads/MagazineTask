# MagazineTask

## Description
- Magazine articles application using Nodejs, you can do the following actions:
    - List Articles
    - Create Article
    - Update Article
    - Delete Article

## How to use the app:

- clone the repo
``` ssh
$ git clone https://github.com/Moon04/MagazineTask.git
```
- install dependencies
```ssh
$ npm install
```
- make sure mongodb service is running locally 
```ssh
$ sudo systemctl status mongod
```
- **Optional**:
    > if mongodb service is running locally, simply ignore this step. The app will detect the absence of the .env file and will connect to localhost on magazineDB.

    if for any reason your mongodb service is not running you can use this test database:
    - create `.env` file in the root directory of the server
    - add the following environment variables:
```bash
PORT=3000
DB_USERNAME=dbUser
DB_PASSWORD=9ZbHMgq8ik59Cnq5
DB_CLUSTER=cluster0
DB_NAME=magazineDB
```

- start the server in development mode using nodemon
```ssh
$ npm run dev
```
or 
```ssh
$ npm start
```
    
## Documentation:
[Magazine Task Postman collection](https://documenter.getpostman.com/view/11135864/T1DjkfP5?version=latest)

