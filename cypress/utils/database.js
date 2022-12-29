const { Pool } = require('pg')

const cn = {
  user: "postgres",
  password: "6RlUMtRC7xUc6hFnicx3wE0SSXkHOnRX",
  host: "blossomolbrds-dev-cluster.cluster-csls5euwsof9.us-east-2.rds.amazonaws.com",
  database: "blossom-testing",
  port: 5432
};

async function queryDb(query){
  const pool = new Pool(cn);
  try{
    const result = await pool.query(query);
    if(result.rows === 'undefined' || result.rows === null || result.rows.length === 0){
      return JSON.stringify({
        message :`rows affected ${result.rowCount}`,
        commandSql: result.command
      });
    }else{
      return {
        result:result.rows,
        commandSql: result.command
      }
    }
  }catch(err){
    console.error('Error executing query', err.stack);
  } finally{
    pool.end();
  }
};

async function queryDbValues(query,values){
  const pool = new Pool(cn);
  try{
    const result = await pool.query(query,values);
    if(result.rows === 'undefined' || result.rows === null || result.rows.length === 0){
      return JSON.stringify({
        message :`rows affected ${result.rowCount}`,
        commandSql: result.command
      });
    }else{
      return {
        result:result.rows,
        commandSql: result.command
      }
    }
  }catch(err){
    console.error('Error executing query', err.stack);
  } finally{
    pool.end().then(()=>console.log('the conection has terminated'));
  }
};
module.exports.queryDb = queryDb;
module.exports.queryDbValues = queryDbValues;

