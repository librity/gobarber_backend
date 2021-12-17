```bash
$ sudo docker run --name database -e POSTGRES_PASSWORD=docker -p 5432:5432 -d postgres:11
username: postgres
password: docker
$ docker stop database
$ docker start database
$ docker logs database
$ docker ps -a
$ docker stop $(docker ps -a -q); docker rm $(docker ps -a -q);
```

Object-Relational-Mapper => Sequelize
^^^Allows your web app to make equivalences between its objects and Database Schemas.
With this, we don't have to write migrations, entries and queries in SQL;
Migrations => database version control

Migration example:

```js
module.export = {
  up: (queryInterface, Sequelize) => {
    return queryInterface.createTable("users", {
      id: {
        allowNull: false,
        autoIncrement:true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      name: {
        allowNull:false,
        type: Sequelize.STRING
      },
      email: {
        allowNull:false,
        unique:true,
        type: Sequelize.STRING
      }
    })
  },

  down: (queryInterface, Sequelize) => {
    return queryInterface.dropTable("Users")
  }
}
```

up runs for the migration, down rollbacks it;
any up must have a down (at least it should);
!!There's no ROLLBACKS in production environments!!
* One table/migration;
Seeds => they populate fake elements in our DB for examples, testing, etc.
!!Never use SEEDS in PRODUCTION!!
Seeds != DatabaseConstants

MVC Architecture
Model       => DB abstraction, manipulates data in DB;
View        => The response data (what the clients recieve); non-API=>HTML
Controller  => What interacts with the two above, where the server operates;
  An Object class, that returns a JSON (RESTAPI) & NEVER calls another controller;
  You should have a controller for each Model, but you don't need a controller w/
  a model (like authentication => sessions.controller);

```bash
$ yarn eslint --fix src --ext .js

$ netstat -ano | grep 5432

# Lists all terminal control character assignments
$ stty -a
# Sends SIGnalCONTinue (to a ^Z SIGnalSUSPended shell)
$ kill -cont $shellpid
# Look process by name & find its $shellpid
$ ps x | grep bash
# List background processes
$ jobs
# Bring process back to foreground
$ fg $jobid

$ sudo apt-get --purge remove postgres*

$ yarn sequelize db:migrate
$ yarn sequelize db:migrate:undo:all
```

Ctrl+SPACE = list all Object options
Ctrl+MouseOver = show Object where it was defined
^^^^^^^^^^HellaGood shortcuts

JWT => Json Web Token
HEADER (token type & crypt algorithm) => eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.
```json
{
  "alg": "HS256",
  "typ": "JWT"
}
```

PAYLOAD (aditional, non-sensitive data) => eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.
```json
{
  "sub": "1234567890",
  "name": "John Doe",
  "iat": 1516239022
}
```

SIGNATURE (digital signature & sensitive data) => SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
```js
  HMACSHA256(
    base64UrlEncode(header) + "." +
    base64UrlEncode(payload),
    <your-256-bit-secret-goes-here-aka-encryption-key>
  )
```
They have expiration validity, yet aren't overwritten by default;

YUP => Schema Validation Library

.gitignore generator => https://www.gitignore.io/api/node

!!Use non-Relational databases for non-structured&performanceHeavy data!!
  aka NoSQL, like => mongoDB
  Mongo uses schemas instead of tables: rows in the db have diferent columns.
  There's no migrations involved: we simply create and omit fields as we like.

```bash
$ sudo docker run --name mongobarber -p 27017:27017 -d -t mongo

$ sudo docker run --name redisbarber -p 6379:6379 -d -t redis:alpine
```

Amazon SES, Mailgun, Sparkpost, Mandril(Mailchimp), Mailtrap(free while DEV), Gmail(free, limited sends), etc.
Email Services^^^^^^^

sentry, honeybadger, bugsnag => application monitoring tools

.env => where environment variables & sesible data go, should de added to .gitignore