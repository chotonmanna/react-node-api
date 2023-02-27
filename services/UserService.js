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
  users.push(req.body);
  setData(users);

  res.send({status: 'success'});
}