# Learn Mongodb from scratch

#### Features

- Cross-platform
- Open-source
- Document oriented database
- High performance
- High avalilability
- automatic and easy scalability
- RDBMS / Mongo
  - Tables / Collections
  - Rows / Documents

#### The advantages of using documents

- Documents correspond to native data types in many programming languages.
- Embedded documents and attays reduce need for expensive joins
- Ability to perform dynamic queries on documents using document-based query language
- Conversion of objects to database objects is not needed
- High Performance - uses internal memory to store working set for quick data access

##### Installing 

1. Download mongodb
2. unpack
3. Go to MongoDB directory
   - run `./bin/mongod --dbpath ./data/db`
4. Connecting to mongodb
   - run `./bin/mongo`

##### Configuration file

- Create a file with the name as “mongo.config” and add the below entries:

```properties
bind_ip = 127.0.0.1
port = 27017
quiet = true
dbpath=D:\mongodb\data\db
logpath=D:\mongodb\log\mongo.log
logappend = true
## log read and write operations 
diaglog=3
## It ensures write durability and data consistency much as any journaling scheme would be expected to do
##Only set this to false if you don't really care about your data
journal = true
```

- Starting with a config `mongod --config PATH_TO_mongo.config --journal`


#### Basics

- [Database methods](https://docs.mongodb.com/manual/reference/method/js-database/)

##### First Database

```shell
# switch to DB
use myblogs

# add document to collection articles
db.articles.insert({name: "mongoDB intro", category:"database", tags:["nosql","db", "bigdata"]})
# result
WriteResult({ "nInserted" : 1 })

# search all
db.articles.find()
{ "_id" : ObjectId("5ae0ec7baade3575de1a80b7"), "name" : "mongoDB intro", "category" : "database", "tags" : [ "nosql", "db", "bigdata" ] }

# search all, print formatted
db.articles.find().pretty()
```

##### Creating Document and saving it

```shell
var articleInfo={};
articleInfo.articleName="MongoDB Introduction";
articleInfo.authorName="Sunil G";
articleInfo.tags=["database", "NoSQL", "DBA", "Dev"];
articleInfo.metaData={};
articleInfo.metaData.authors=["Sunil G", "Kumar"];
articleInfo.metaData.description="About MongoDB";
articleInfo.metaData.created_on= new Date();
# saving
db.articles.save(articleInfo);
db.articles.find()

```

##### Dropping DB

```shell
# switch to  myblogs
using myblogs
# drop db
db.dropDatabase();
```

##### Creating a Collection

- `db.createCollection(name, options)`
- options:
  - capped (true / false) - removes old documents when they reach the size limit 
    - if **true** specify **size**
  - autoIndexID (true / false default) - create an index under field **_ID**  
  - max -  maximum no of documents

 

```shell
# switch to  myblogs
use myblogs
# create a collection with no options
db.createCollection("articles");
# display collections
show collections;
# # create a collection with parameters
db.createCollection("blogs", { capped : true, autoIndexId : true, size : 
   6142800, max : 10000 } );
```

##### Dropping a Collection

- `db.articles.drop()`

#### MongoDB CRUD Operations

##### Creating/Inserting a document

- prepare and run js script

  ```javascript
  // studentsInfo.js

  db.studentInfo.insert(
      {
          name: {firstName: "John", lastName: "Doe"},
          class: 6,
          rollNo: 23,
          subjects: ["Maths", "Physics", "English", "Chemistry"],
          attendance: {
              January: "90%",
              February: "85%",
              March: "98%"
          }
      }
  );
  /*-------------*/
  ```

  ```shell
  > use classInfo
  switched to db classInfo
  > load("/opt/mongodb/ExerciseFiles/studentsInfo.js")
  true
  > show collections
  studentInfo
  > db.studentInfo.find().pretty()
  ```

##### Inserting Array of documents

- prepare and run js script

  ```javascript
  // studentsInfoArray.js
  var studentsInfoArray=

  [
      {
          name: {firstName: "Sunil", lastName: "Gupta"},
          class: 16,
          subjects: ["Maths", "Physics", "English", "Chemistry"],
          attendance: {
              January: "100%",
              February: "99%",
              March: "100%"
          }
      },
     /* {
         ------------ 
      }*/
      ];
  ```

  ```shell
  > load("/opt/mongodb/ExerciseFiles/studentsInfoArray.js")
  true
  > show collections
  studentInfo
  studentsInfoCollection
  ```

##### Reading a Document

```shell
# quering all documents
db.studentsInfoCollection.find().pretty()

# quering a student with name Sunil
db.studentsInfoCollection.find({"name.firstName":"Sunil"}).pretty()
# quering a student with rollNo = 12
db.studentsInfoCollection.find({"rollNo":12}).pretty()
# equivalent
db.studentsInfoCollection.find({"rollNo":{$eq:12}}).pretty()

```

##### Reading a Document with lt, gt

```shell
# quering  < 15
db.studentsInfoCollection.find({"rollNo":{$lt:15}}).pretty()
# quering  > 15
db.studentsInfoCollection.find({"rollNo":{$gt:15}}).pretty()
```

##### Other query operators

```shell
# $gte operator (>=)
db.studentsInfoCollection.find({"rollNo":{$gte:15}}).pretty();
# $lte operator (<=)
db.studentsInfoCollection.find({"rollNo":{$lte:15}}).pretty();
# $ne operator (!=)
db.studentsInfoCollection.find({"rollNo":{$ne:15}}).pretty();
# $in operator
db.studentsInfoCollection.find({"subjects":{$in:["Small Business"]}}).pretty();
# $in operator
db.studentsInfoCollection.find({"subjects":{$in:["Small Business"]}}).pretty();
# $nin operator (not in)
db.studentsInfoCollection.find({"subjects":{$nin:["Small Business"]}}).pretty();
# $exists operator (collection must exists)
db.studentsInfoCollection.find({"subjects":{$exists:true, $nin:["Small Business"]}}).pretty();
```

##### Updating Documents

```shell
# update({<CONDITION>}, {<VALUE>})
db.studentsInfoCollection.update({"name.firstName": "Sunil"}, {$set:{"age" :17}});

# update / insert
db.studentsInfoCollection.update({"name.firstName": "Sameer"}, {$set:{"age" :37}}, {upsert:true});

# update element of an array
db.studentsInfoCollection.update({"name.firstName": "Sunil"}, {$set: {"subjects.1": "Science"}});

```

##### Deleting Documents

```shell
# remove({<CONDITION>})
# remove documents when name.firstName = Alun
db.studentsInfoCollection.remove({"name.firstName": "Alun"});
# remove documents with an array "subjects" containing "Maths"
db.studentsInfoCollection.remove({"subjects": "Maths"});
# remove just 1 document
db.studentsInfoCollection.remove({"subjects": "Maths"}, 1);
# clean the collection
db.studentsInfoCollection.remove({});
```

