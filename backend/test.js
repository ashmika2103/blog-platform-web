const { MongoClient } = require("mongodb");

const uri =
"mongodb+srv://ashmika:Ashmika12345@cluster0.usqajlj.mongodb.net/blogDB?retryWrites=true&w=majority&appName=Cluster0";

async function run() {
  try {
    const client = new MongoClient(uri);

    await client.connect();

    console.log("Connected Successfully ✅");

    await client.close();
  } catch (err) {
    console.error(err);
  }
}

run();