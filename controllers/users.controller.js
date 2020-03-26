const {
  fetchUsers,
  createNewUser,
  updateUserDetails
} = require("../models/users.model");

exports.patchUserDetails = (req, res, next) => {
  updateUserDetails(req.params, req.body)
    .then(user => res.send({ user }))
    .catch(err => next(err));
};

exports.getUserByUsername = (req, res, next) => {
  fetchUsers(req.params)
    .then(userArr => {
      const user = userArr[0]; // !!!!
      res.send({ user });
    })
    .catch(err => next(err));
};

exports.getUsers = (req, res, next) => {
  fetchUsers({})
    .then(users => {
      res.send({ users: users, validatedUser: req.user });
    })
    .catch(err => next(err));
};

exports.postNewUser = (req, res, next) => {
  createNewUser(req.body)
    .then(({ err, user }) => {
      if (err) {
        res.status(200).send({ err });
      } else res.status(201).send({ user });
    })
    .catch(err => {
      next(err);
    });
};
