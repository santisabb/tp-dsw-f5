import { MongoClient, Db } from "mongodb"

const connection = process.env.MONGO_URI || 'mongodb://127.0.0.1:27017'

const cli = new MongoClient(connection)
await cli.connect()

export let db: Db = cli.db('tpF5')