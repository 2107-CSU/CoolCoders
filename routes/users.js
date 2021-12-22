require("dotenv").config();
const express = require("express");
const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;
const bcrypt = require("bcrypt");
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

usersRouter.get("/", requireUser, requireAdmin, async (req, res, next) => {
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
      const { email, id, name, active, userStatus } = user;
      const token = jwt.sign(
        {
          email,
          id,
          name,
          active,
        },
        process.env.JWT_SECRET,
        {
          expiresIn: "1w",
        }
      );
      req.user = user;
      console.log("at the end of login function, req.user = ", req.user);
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
        userStatus,
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

usersRouter.get("/:userId", requireUser, async (req, res, next) => {
  const { userId } = req.params;

  try {
    const user = await getUserById(userId);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

// usersRouter.delete("/:userId", requireUser, requireAdmin, async (req, res, next) => {
usersRouter.delete("/:userId", requireUser, async (req, res, next) => {
  const { userId } = req.params;

  try {
    //retrieve user to be deleted
    const userToDelete = await getUserById(userId);

    if (userToDelete) {
      //check if user making the request is the same as the user to delete or if they are an admin
      if (req.user.id === userToDelete.id || req.user.userStatus === "admin") {
        const response = await deactivateUser(userId);

        if (response) {
          res.send({
            msg: `user #${userId} has been successfully deactivated`,
          });
        } else {
          res.send({
            msg: `something went wrong trying to delete user #${userId}`,
          });
        }
      }
    }
  } catch (error) {
    next(error);
  }
});

usersRouter.patch("/:userId", requireUser, async (req, res, next) => {
  // Should a user be allowed to change anything other than their name?

  const { userId } = req.params;
  const updateObj = { ...req.body };

  // console.log("API EDIT USER: ", updateObj);
  if (updateObj.password) {
    //salt and hash the password before calling updateUser
    updateObj.password = await bcrypt.hash(updateObj.password, 13);
  }

  try {
    const user = await updateUser(userId, updateObj);
    res.send(user);
  } catch (error) {
    next(error);
  }
});

usersRouter.patch(
  "/admin/:userId",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    // Should a user be allowed to change anything other than their name?

    const { userId } = req.params;
    const updateObj = { ...req.body };

    try {
      const user = await updateUser(userId, updateObj);
      res.send(user);
    } catch (error) {
      next(error);
    }
  }
);

//retrieves a user object given a jwt token
//returns email, user id,
usersRouter.get("/userinfo/me", requireUser, async (req, res, next) => {
  // console.log("REQUEST: ", req.headers.authorization)

  //grab the token from the request headers
  //use slice method to remove 'Bearer ' prefix
  const prefix = "Bearer ";
  let token = req.headers.authorization;
  token = token.slice(prefix.length, token.length);

  // console.log("TOKEN IS:",token);

  try {
    //verify token and send user obj
    //remove iat and exp before returning to client
    const userObj = await jwt.verify(token, JWT_SECRET);
    delete userObj.iat;
    delete userObj.exp;

    res.send(userObj);
  } catch (error) {
    next(error);
  }
});

usersRouter.patch(
  "/admin/:userId",
  requireUser,
  requireAdmin,
  async (req, res, next) => {
    // Should a user be allowed to change anything other than their name?

    const { userId } = req.params;
    const updateObj = { ...req.body };

    try {
      const user = await updateUser(userId, updateObj);
      res.send(user);
    } catch (error) {
      next(error);
    }
  }
);

module.exports = usersRouter;
