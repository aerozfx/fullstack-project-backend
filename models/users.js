const pool = require("../utils/db_conn");
const queries_users = require("./queries/users.queries");

const createUser = async (data) => {
  let { nickname, name, surname, email, hashedPassword } = data;
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(queries_users.createUser, [
      nickname,
      name,
      surname,
      email,
      hashedPassword,
    ]);
    result = data.rows[0];
  } catch (err) {
    console.log(err);
    result = err.detail;
  } finally {
    client.release();
  }
  return result;
};
const getAllNicknames = async () => {
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(queries_users.getAllNicknames);
    result = data.rows;
  } catch (err) {
    result = err.detail;
  } finally {
    client.release();
  }
  return result;
};
const getUserById = async (id) => {
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(queries_users.getUserById, [id]);
    result = data.rows;
    return result;
  } catch (error) {
    console.log(error);
  } finally {
    client.release();
  }
};

const getUserByEmail = async (email) => {
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(queries_users.getUserByEmail, [email]);
    result = data.rows[0];
  } catch (error) {
    result = error;
  } finally {
    client.release();
  }
  return result;
};

const getUsers = async () => {
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(queries_users.getAllUsers);
    result = data.rows;
  } catch (error) {
    result = err.detail;
  } finally {
    client.release();
  }
  return result;
};

const updateUserById = async (data) => {
  let { newNickname, newName, newSurname, newEmail, newPassword, email } = data;
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(queries_users.updateUserById, [
      newNickname,
      newName,
      newSurname,
      newEmail,
      newPassword,
      email,
    ]);
    result = data.rows[0];
    return result;
  } catch (error) {
    result = error.detail;
  } finally {
    client.release();
  }
  return result;
};

const deleteUserById = async (id) => {
  let client, result;
  try {
    client = await pool.connect();
    let data = await client.query(queries_users.deleteUser, [id]);
    result = data.rows[0];
  } catch (error) {
    result = error.detail;
  } finally {
    client.release();
  }
  return result;
};

module.exports = {
  createUser,
  getUserById,
  getUserByEmail,
  getAllNicknames,
  getUsers,
  updateUserById,
  deleteUserById,
};
