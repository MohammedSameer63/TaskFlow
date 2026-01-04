const { Client } = require("pg");
const c = new Client({
  host: "localhost", port: 5432,
  user: "taskflow", password: "taskflow", database: "taskflow",
});
(async () => {
  await c.connect();
  const r = await c.query("select 1 as ok");
  console.log(r.rows);
  await c.end();
})();
