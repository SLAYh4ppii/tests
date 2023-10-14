import { Client } from "@elastic/elasticsearch";

let client;

export async function connectToElasticsearch() {

  if(client) {
    const es = client;
    return es;
  }

  const ESS_CLOUD_ID = process.env.ESS_CLOUD_ID || "https://elasticsearch-105272-0.cloudclusters.net:10214"
  const ESS_CLOUD_USERNAME = process.env.ESS_CLOUD_USERNAME || "elastic"
  const ESS_CLOUD_PASSWORD = process.env.ESS_CLOUD_PASSWORD || "JuljXRwl"

  if (!ESS_CLOUD_ID || !ESS_CLOUD_USERNAME || !ESS_CLOUD_PASSWORD) {
    return 'ERR_ENV_NOT_DEFINED'
  }

  const connection = new Client({
    node: ESS_CLOUD_ID,
    auth: {
      username: ESS_CLOUD_USERNAME,
      password: ESS_CLOUD_PASSWORD,
    },
  })

  client = connection;

  return connection;
}