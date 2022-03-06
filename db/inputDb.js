const db = require('./db');
const helper = require('../helper');
const config = require('../config');

async function getMultiple(page = 1){
  const offset = helper.getOffset(page, config.listPerPage);
  const rows = await db.query(
    `SELECT id, value, added_on 
    FROM input LIMIT ${offset},${config.listPerPage}`
  );
  const data = helper.emptyOrRows(rows);
  const meta = {page};

  return {
    data,
    meta
  }
}


async function create(value){
    const result = await db.query(
      `INSERT INTO input 
      (value, added_on)
      VALUES 
      ('${value}', NOW())`
    );
  
    let message = 'Error in creating input';
  
    if (result.affectedRows) {
      message = 'Input created successfully';
    }
  
    return {message};
  }


  async function remove(id){
    const result = await db.query(
      `DELETE FROM input WHERE id=${id}`
    );
  
    let message = 'Error in deleting input value';
  
    if (result.affectedRows) {
      message = 'Value deleted successfully';
    }
  
    return {message};
  }
module.exports = {
  getMultiple,
  create,
  remove
}

