const fs = require('fs');
const { makeid } = require('./common');

const getData = () => {
  return JSON.parse(fs.readFileSync('./data/users.json'));
}

const setData = (users) => {
  fs.writeFileSync('./data/users.json', JSON.stringify(users));
}

const addNewUser = (req, res) => {
  const user = req.body;
  user['id'] = makeid();
  delete user.termsCondition;
  delete user.confirmPassword;

  const users = getData();
  // if (checkUserExist(user)) {
  //   const existingValues = checkUserExist(user);
  //   res.status(400).send({ msg: `${existingValues} already exist`, data: 'NOK' });
  // } else {
    users.push(user);
    setData(users);
    res.status(200).send({ msg: 'The user has been successfully registered', data: 'OK' });
  //}

}

const checkUserExist = (data) => {
  const uniqueFields = ['email', 'mobile', 'username'];
  const users = getData();
  const existingValues = [];
  uniqueFields.forEach(fieldName => {
    const checkuser = users.filter(user => user[fieldName] === data[fieldName]);
    if (checkuser.length) {
      existingValues.push(data[fieldName]);
    }
  });

  return existingValues.join();
}

const login = (req, res) => {
  const data = req.body; // {username: '632927', password: 'nopass'}
  const users = getData();
  const checkuser = users.filter(user => user.username === data.username && user.password === data.password);
  if (!checkuser.length) {
    res.status(400).send({ msg: `Invalid username and password`, data: 'NOK' });
  } else {
    res.status(200).send({
      msg: 'You are loggedin successfully', data: {
        userid: checkuser[0].id,
        name: `${checkuser[0].firstName} ${checkuser[0].lastName}`
      }
    });
  }
}

module.exports = {
  addNewUser,
  checkUserExist,
  login
}