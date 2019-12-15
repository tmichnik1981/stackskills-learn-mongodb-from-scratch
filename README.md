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

#### Performance tuning

##### Indexes

- keys to the documents' locations
- avoid scanning all documents

```shell
# query execution plan - general
> db.studentsInfoCollection.find({"name.firstName": "Alun"}).explain();
{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "classInfo.studentsInfoCollection",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"name.firstName" : {
				"$eq" : "Alun"
			}
		},
		"winningPlan" : {
			"stage" : "COLLSCAN",
			"filter" : {
				"name.firstName" : {
					"$eq" : "Alun"
				}
			},
			"direction" : "forward"
		},
		"rejectedPlans" : [ ]
	},
	"serverInfo" : {
		"host" : "tommic-desktop",
		"port" : 27017,
		"version" : "3.6.4",
		"gitVersion" : "d0181a711f7e7f39e60b5aeb1dc7097bf6ae5856"
	},
	"ok" : 1
}
# query execution plan - executionStats
> db.studentsInfoCollection.find({"name.firstName": "Alun"}).explain("executionStats")
{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "classInfo.studentsInfoCollection",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"name.firstName" : {
				"$eq" : "Alun"
			}
		},
		"winningPlan" : {
			"stage" : "COLLSCAN",
			"filter" : {
				"name.firstName" : {
					"$eq" : "Alun"
				}
			},
			"direction" : "forward"
		},
		"rejectedPlans" : [ ]
	},
	"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 1,
		"executionTimeMillis" : 0,
		"totalKeysExamined" : 0,
		"totalDocsExamined" : 6,
		"executionStages" : {
			"stage" : "COLLSCAN",
			"filter" : {
				"name.firstName" : {
					"$eq" : "Alun"
				}
			},
			"nReturned" : 1,
			"executionTimeMillisEstimate" : 0,
			"works" : 8,
			"advanced" : 1,
			"needTime" : 6,
			"needYield" : 0,
			"saveState" : 0,
			"restoreState" : 0,
			"isEOF" : 1,
			"invalidates" : 0,
			"direction" : "forward",
			"docsExamined" : 6
		}
	},
	"serverInfo" : {
		"host" : "tommic-desktop",
		"port" : 27017,
		"version" : "3.6.4",
		"gitVersion" : "d0181a711f7e7f39e60b5aeb1dc7097bf6ae5856"
	},
	"ok" : 1
}

# quering by indexed field
# "totalKeysExamined" : 1,
# "totalDocsExamined" : 1,

db.studentsInfoCollection.find({"_id": ObjectId("5ae6c3e33c9899fa1b25d009")}).explain("executionStats")
{
	"queryPlanner" : {
		"plannerVersion" : 1,
		"namespace" : "classInfo.studentsInfoCollection",
		"indexFilterSet" : false,
		"parsedQuery" : {
			"_id" : {
				"$eq" : ObjectId("5ae6c3e33c9899fa1b25d009")
			}
		},
		"winningPlan" : {
			"stage" : "IDHACK"
		},
		"rejectedPlans" : [ ]
	},
	"executionStats" : {
		"executionSuccess" : true,
		"nReturned" : 1,
		"executionTimeMillis" : 0,
		"totalKeysExamined" : 1,
		"totalDocsExamined" : 1,
		"executionStages" : {
			"stage" : "IDHACK",
			"nReturned" : 1,
			"executionTimeMillisEstimate" : 0,
			"works" : 2,
			"advanced" : 1,
			"needTime" : 0,
			"needYield" : 0,
			"saveState" : 0,
			"restoreState" : 0,
			"isEOF" : 1,
			"invalidates" : 0,
			"keysExamined" : 1,
			"docsExamined" : 1
		}
	},
	"serverInfo" : {
		"host" : "tommic-desktop",
		"port" : 27017,
		"version" : "3.6.4",
		"gitVersion" : "d0181a711f7e7f39e60b5aeb1dc7097bf6ae5856"
	},
	"ok" : 1
}

```

##### Creating an Index

```shell
# creating an index 
# 1 ascending
# -1 descending
> db.studentsInfoCollection.createIndex({"age":1});
{
	"createdCollectionAutomatically" : false,
	"numIndexesBefore" : 1,
	"numIndexesAfter" : 2,
	"ok" : 1
}

```

##### Finding Indexes

```shell
> db.studentsInfoCollection.getIndexes();
[
	{
		"v" : 2,
		"key" : {
			"_id" : 1
		},
		"name" : "_id_",
		"ns" : "classInfo.studentsInfoCollection"
	},
	{
		"v" : 2,
		# <FIELD>
		"key" : {
			"age" : 1
		},
		"name" : "age_1",
		# <DB>.<COLLECTION>
		"ns" : "classInfo.studentsInfoCollection"
	}
]

```

##### Dropping Index

```shell
> db.studentsInfoCollection.dropIndex("age_1");
{ "nIndexesWas" : 2, "ok" : 1 }
```

#### ObjectIds in MongoDB

- ObjectId = Primary key
- Immutable
- Unique
- bson datatype
- 12 byte value

##### Creating ObjectIds

```shell
> db.productDetails.insert({"prdtName": "microphone"});
WriteResult({ "nInserted" : 1 })
# creating own ObjectId
> db.productDetails.insert({_id:001, "prdtName": "Television"});
WriteResult({ "nInserted" : 1 })

```

##### Advantages of Objectids created by MongoDB

```shell
> db.productDetails.find()[0]._id
ObjectId("5ae710198e6e7ae9b2f8ea29")
> db.productDetails.find()[0]._id.getTimestamp();
ISODate("2018-04-30T12:46:17Z")
```

##### Disadvantages of Objectids created by MongoD

- Cumbersome in rest apps when you want to go deep inside the resource: **bookShop/productDetails/1** 


#### Aggregration Framework

- Process data records and return results
- Group values from various documents in colection together
- Performs various operations on the grouped data
- aggregate() method: `db.collectionName.aggregate();`
  - `$sum`, `$avg`, `$min`, `$max`, `$first`, `$last`

##### Using aggregate() method

```shell
> load("/opt/mongodb/ExerciseFiles/AggregationExample.js")
# $group Group
# _id By
# total_posts - field with result
# $sum: 1 - calculate records
> db.AggregationExample.aggregate([{$group:{_id: "$author", total_posts: {$sum: 1}}}]);

> db.AggregationExample.aggregate([{$group:{_id: "$author", total_posts: {$sum: $likes}}}]);
```

##### Using distinct() and count()

```shell
# returns distinct values of field  subjects
> db.studentsInfoCollection.distinct("subjects");
[
	"Chemistry",
	"English",
	"Maths",
	"Physics",
	undefined,
	"Journalist",
	"Medium Business",
	"Small Business"
]
# number of documents
>  db.studentsInfoCollection.count();
6
# number of "Maths"
> db.studentsInfoCollection.find({"subjects": "Maths"}).count();
5
```

##### Sorting documents

```shell
# sort by age asc
db.studentsInfoCollection.find().sort({"age":1}).pretty();
# sort by age desc
db.studentsInfoCollection.find().sort({"age":-1}).pretty();

db.studentsInfoCollection.find().sort({"name.firstName": 1}).pretty();
# print in a nautural order
db.studentsInfoCollection.find().sort({$natural: 1}).pretty();
```

#### Data Modeling in MongoDB

- Schemaless
- Collections do not enforce a structure
- We can map a document onto an object 
- Referencing/Embedding

##### Data Modeling using References

```
Employee Document{
    id: <objectId_1>,
    emply_name: "Sunil",
    designation: "Trainer"
}
Address Document{
    id: <objectId_2>,
    emply_id: <objectId_1>,
    city: "Bangalore",
    Country: "India"
}

```

