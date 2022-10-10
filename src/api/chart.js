import client from "./index";

export default {
  chartApi: () =>
    client.get(
      "https://api.wirespec.dev/wirespec/stackoverflow/fetchchartdataforvuejs"
    ),
  geeksApi: () =>
    client.get(
      "https://datausa.io/api/data?drilldowns=Nation&measures=Population"
    ),
  testApi: () => client.get("https://jsonplaceholder.typicode.com/comments"),
};
