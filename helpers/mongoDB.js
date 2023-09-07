const { MongoClientSettings, MongoClients, ServerApi, ServerApiVersion } = require('mongodb');


let settings;
let db;
class mongoDB{
                 
    async createDb(dbTableName) {
    const connectionString = `mongodb+srv://shilo:a72Y53vXKjhNDAJn@chatnews.uaripa9.mongodb.net/?retryWrites=true&w=majority`;
    const serverApi = ServerApi.builder()
      .version(ServerApiVersion.V1)
      .build();
     settings = MongoClientSettings.builder()
      .applyConnectionString(new connectionString(connectionString))
      .serverApi(serverApi)
      .build();

    console.log("Creating Mongo Connection...");

    const mongoClient = MongoClients.create(connectionString);
    db = mongoClient.getDatabase(dbTableName);
    
    console.log("Database created successfully");
}
}



module.exports= new mongoDB();