require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");

const usersRouter = express.Router();
const {
  createUser,
  getUser,
  getUserById,
  getUserByEmail,
  deactivateUser,
  getAllUsers,
  updateUser,
  upgradeGuest,
} = require("../db");
const { requireUser, requireAdmin } = require("./utils");

usersRouter.use((req, res, next) => {
  console.log("a request is being made to /users");

  next();
});

usersRouter.get("/", async (req, res, next) => {
  const users = await getAllUsers();

  res.send({ users });
});

usersRouter.post("/login", async (req, res, next) => {
  const { email, password } = req.body;

  if (!email || !password) {
    next({
      name: "MissingCredentialsError",
      message: "Please supply both a email and password",
    });
  }

  try {
    const user = await getUser({ email, password });

    if (user) {
      // create token and return it
      const { email, id } = user;
      const token = jwt.sign(
        {
          email,
          id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      req.user = user;
      console.log('at the end of login function, req.user = ', req.user)
      res.send({ message: "you are logged in", user, token });
    } else {
      next({
        name: "IncorrectCredentialsError",
        message: "Username or password is incorrect",
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/register", async (req, res, next) => {
  const { email, name, password, userStatus } = req.body;

  try {
    const _user = await getUserByEmail(email);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user with that email address already exists",
      });
    }

    const user = await createUser({ email, name, password, userStatus });

    const token = jwt.sign(
      {
        email,
        id: user.id,
        userStatus
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "thank you for signing up with us",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.patch("/register/guest", requireUser, async (req, res, next) => {
  const { name, password, userId } = req.body;
  try {
    const user = await upgradeGuest(userId, name, password);
    const token = jwt.sign(
      {
        email: user.email,
        id: user.id,
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1w",
      }
    );

    res.send({
      message: "thank you for signing up with us",
      user,
      token,
    });
  } catch (error) {
    next(error);
  }
});

usersRouter.post("/register/guest", async (req, res, next) => {
  const { email } = req.body;

  try {
    const _user = await getUserByEmail(email);

    if (_user) {
      next({
        name: "UserExistsError",
        message: "A user with that email address already exists",
      });
    }

    let user = await createUser({
      email: `guest-${email}`,
      name: "Guest",
      password: "guest",
      userStatus: "guest",
    });

    const deactivateAccount = await deactivateUser(user.id);

    if (deactivateAccount) {
      const guest = await getUserById(user.id);
      user = guest;

      const token = jwt.sign(
        {
          email: guest.email,
          id: guest.id,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );

      res.send({
        message: "You may now continue as a guest.",
        user,
        token,
      });
    } else {
      next({
        name: "GuestUserError",
        message:
          "There was an error creating a guest account. Please try again.",
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.get("/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await getUserById(userId);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.delete("/:userId", async (req, res, next) => {
  const { userId } = req.params;

  try {
    const response = await deactivateUser(userId);

    if (response) {
      res.send({ msg: `user #${userId} has been successfully deactivated` });
    } else {
      res.send({
        msg: `something went wrong trying to delete user #${userId}`,
      });
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.patch("/:userId", async (req, res, next) => {
  // Should a user be allowed to change anything other than their name?

  const { userId } = req.params;
  const { name } = req.body;

  try {
    const user = await updateUser(userId, name);
    console.log("the user = ", user);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

module.exports = usersRouter;
