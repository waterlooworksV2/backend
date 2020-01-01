const mongoose = require('mongoose');
const passport = require('passport');
const router = require('express').Router();
const auth = require('../middleware/auth');
const Users = mongoose.model('Users');

router.post('/', auth.optional, async (req, res, next) => {
  const { body: { user } } = req;
  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  const finalUser = new Users(user);

  finalUser.setPassword(user.password);
  try {
    await finalUser.save();
    res.json({ user: finalUser.toAuthJSON() });
  } catch(err) {
    if (err.name === 'MongoError' && err.code === 11000) {
      // Duplicate user
      return res.status(422).send({ 
        succes: false, 
        message: `User with email:${user.email} already exists!` 
      });
    }
    next(err);
  }
});

router.delete('/', auth.required, async (req, res, next) => {
  const { payload: { id } } = req;
  const user = await Users.findById(id);
  
  if(!user) {
    return res.status(404).send({
      status: 'User not found'
    });
  }
  const email = user.email;
  try {
    user.deleteOne();
  } catch (err) {
    next(err);
  }
  
  return res.json({ 
    email: email,
    status: 'deleted',
  });
    
});

router.post('/login', auth.optional, async (req, res, next) => {
  const { body: { user } } = req;
  if(!user.email) {
    return res.status(422).json({
      errors: {
        email: 'is required',
      },
    });
  }

  if(!user.password) {
    return res.status(422).json({
      errors: {
        password: 'is required',
      },
    });
  }
  
  return passport.authenticate('local', { session: true }, (err, passportUser, info) => {
    if(err) {
      return next(err);
    }

    if(passportUser) {
      const user = passportUser;
      user.token = passportUser.generateJWT();

      return res.json({ token: user.token });
    }
    return res.status(401).send(info);
  })(req, res, next);
});

router.get('/current', auth.required, async (req, res, next) => {
  const { payload: { id } } = req;
  const user = await Users.findById(id);
  if(!user) {
    return res.sendStatus(401);
  }
  return res.json({ user: user.toAuthJSON() });
});

module.exports = router;