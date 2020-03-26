const { DB_URL } = process.env;

const ENV = process.env.NODE_ENV || "development";
//This checks the environment choice.
const baseConfig = {
  client: "pg",
  migrations: {
    directory: "./db/migrations"
  },
  //Migrations creates the Schema.
  seeds: {
    directory: "./db/seeds"
  }
  //Seed populates that schema with data.
};

// And this below is what figures the environment choice.
const customConfig = {
  production: {
    connection: `${DB_URL}?ssl=true`
  },
  development: {
    connection: {
      database: "nc_news",
      user: "heihachu",
      password: "showcalves"
    }
  },
  test: {
    connection: {
      database: "nc_news_test",
      user: "heihachu",
      password: "showcalves"
    }
  }
};

const JWT_SECRET =
  "3acb898d09f4566cf6b1be2b86c66dc7568729974e211dc66a62b48935fdb8c606ab97eeb14911aa1bef7b83141f051b7d370e9a54bd5e623ad5c5627a8c76f02c91ae9d7d3874b58ba9f0cc15f8739916f0b07a7575932731d03e4625fb7ea36c3842b4b917eaa1d327fe03e429916c8d97a3798c86a91d538c6f1738959028adf17b5082d3dd2649b75d2ff44a7bb4cde7cd2ccc28a2b3e0f1663bcbaad5ef";

//Here we export which data set based on environment choice.
module.exports = { ...customConfig[ENV], ...baseConfig, JWT_SECRET };
