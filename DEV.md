# Setup Instructions
> Mostly MacOS, because I don't have a windows laptop to test

## Step 1: Clone the repository
`https://github.com/waterlooworksV2/backend.git`

## Step 2: Install dependencies
1. [brew](brew.sh)
2. [node.js](https://nodejs.org/en/)
3. [yarn](https://yarnpkg.com/lang/en/docs/install/#mac-stable)
4. [ElasticSearch](https://www.elastic.co/downloads/elasticsearch)
  - You might also have to fulfill the Java Requirement for ElasticSearch to run: `brew cask install homebrew/cask-versions/java8`
5. [mongodb](https://docs.mongodb.com/manual/tutorial/install-mongodb-on-os-x/)
  - install `mongodb` using brew
6. Run `yarn install`

## Step 3: Start background services
1. ElasticSearch:
  - Navigate to the zip folder where you downloaded ElasticSearch and unpack it
  - Go to extracted directory and open `bin/` and double click on `elasticsearch`
  - This should hopefully start elasticsearch on it's default 9200 port [You might have to allow permissions from your laptop to start elastic]

2. mongodb:
  - Get the data dump from one of the existing contributors
  - Extract the dump.zip file and navigate to that directory in terminal
  - Use: `mongorestore dump` to get all the data into the required database
  - If you installed using brew: `brew services start mongodb` to start mongodb

## Step 4: Initialise `.env` file
1. Navigate into the backend repo directory
2. Type: `vi .env` then type `i` and paste the contents of the file below
```bash
PORT=9000
DB_URI=mongodb://localhost:27017/jobs_database
ELASTIC_SEARCH_URL=http://localhost:9200/
```
3. Type `:x` and press enter to save and exit vim

## Step 5: The Big Red Button
Navigate to the repository's directory in terminal and type `yarn dev`
