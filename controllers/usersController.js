const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const users = require("../models/users.js");

const createUser = async (req, res) => {
  // TOOD Encriptar contraseñas con bcrypt
  let { nickname, name, surname, email, password } = req.body;
  let user = await users.getUserByEmail(email);
  let nicknames = await users.getAllNicknames();
  nicknames = nicknames.filter((ele) => ele.nickname === nickname);
  if (!user && nicknames.length === 0) {
    try {
      let hashedPassword = await bcrypt.hash(password, 10);
      let data = await users.createUser({
        nickname,
        name,
        surname,
        email,
        hashedPassword,
      });
      let payload = {
        user_id: data.user_id,
        isLogged: true,
      };
      let token = jwt.sign(payload, "secret_key", {
        expiresIn: "365d",
      });
      res
        .status(200)
        .cookie("access-token", token, { sameSite: "lax" })
        .json({ status: 200, message: { ...data } });
    } catch (error) {
      res.status(300).json({ message: error });
    }
  } else {
    res.status(200).json({
      state: "error",
      email: email === user?.email ? "Este email ya existe" : "",
      nickname:
        nickname === nicknames[0]?.["nickname"] ? "Nickname en uso" : "",
    });
  }
};

const getUser = async (req, res) => {
  try {
    if (req.params.email) {
      let email = req.params.email;
      let data = await users.getUserByEmail(email);
      res.status(200).json({ data });
    } else {
      let data = await users.getUsers();
      res.status(200).json({ data });
    }
  } catch (error) {
    res.status({ error });
  }
};

const updateUser = async (req, res) => {
  let { newNickname, newName, newSurname, newEmail, newPassword, email } =
    req.body;
  try {
    let data = await users.updateUserByEmail({
      newNickname,
      newName,
      newSurname,
      newEmail,
      newPassword,
      email,
    });
    res.status(200).json({ data });
  } catch (error) {
    throw new Error(error);
  }
};

const deleteUser = async (req, res) => {
  let { id } = req.params;
  try {
    let data = await users.deleteUserById(id);
    if (data !== undefined) {
      res
        .status(200)
        .json({ response: 200, message: "Se ha borrado el usuario", data });
    } else {
      res.status(403).json({
        response: 403,
        message: "No existe ningún usuario con ese email!",
      });
    }
  } catch (error) {
    res.status(400).json({ message: error });
  }
};

const loginUser = async (req, res) => {
  let { email, password } = req.body;
  try {
    let user = await users.getUserByEmail(email);
    if (user) {
      let match = await bcrypt.compare(password, user.password);
      if ((user.email = email && match)) {
        let payload = {
          user_id: user.user_id,
          isLogged: true,
        };
        let token = jwt.sign(payload, "secret_key", {
          expiresIn: "365d",
        });
        res
          .status(200)
          .cookie("access-token", token, { sameSite: "lax" })
          .json({ user: user.user_id });
      } else {
        res.status(400).json({ message: "Email o contraseña incorrectos" });
      }
    } else {
      res.status(401).send();
    }
  } catch (error) {
    console.log(error);
    res.status(500).send();
  }
};

module.exports = { createUser, getUser, updateUser, deleteUser, loginUser };
