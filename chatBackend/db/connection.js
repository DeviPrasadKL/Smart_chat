import mysql from 'mysql';

const con = mysql.createConnection({
  host: "10.80.4.91", 
  port: "3306", 
  user: "soft",
  password: "$0ft%963$",
  database: "_e6fc54c1613e3755"
});

con.connect((err) => {
  if (err) {
    console.error("Connection error:", err);
    return;
  }
  console.log("Connected to MySQL!");
});

export default con;
