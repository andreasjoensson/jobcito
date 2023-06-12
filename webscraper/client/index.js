const redis = require("redis");
require("dotenv").config();

const client = redis.createClient({
  password: "ryKmjWL30ZWF2VeI9MiNpF7hBTZrmzw7",
  socket: {
    host: "redis-16972.c263.us-east-1-2.ec2.cloud.redislabs.com",
    port: 16972,
  },
});

(async () => {
  client.on("error", (err) => console.log(err));
  await client.connect();
})();

module.exports = client;
