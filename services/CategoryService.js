const fs = require('fs');
const { makeid, convertPlainArrayToNestedArray } = require('./common');

const getData = () => {
  return JSON.parse(fs.readFileSync('./data/categories.json'));
}

const setData = (users) => {
  fs.writeFileSync('./data/categories.json', JSON.stringify(users));
}

const addNew = (req, res) => {
  const category = req.body;
  category['id'] = makeid();

  const categories = getData();
  if (checkCategoryExist(category)) {
    res.status(400).send({ msg: `This category already exist`, data: 'NOK' });
  } else {
    categories.push(category);
    setData(categories);
    const list = getData();
    res.status(200).send({ msg: 'The category has been successfully created', data: convertPlainArrayToNestedArray(list) });
  }
}

const update = (req, res) => {
  const category = req.body;

  const categories = getData();
  if (checkCategoryExist(category)) {
    res.status(400).send({ msg: `This category already exist`, data: 'NOK' });
  } else {
    const index = categories.findIndex(cate => cate.id === category.id);
    categories[index] = category;
    setData(categories);
    const list = getData();
    res.status(200).send({ msg: 'The category has been successfully created', data: convertPlainArrayToNestedArray(list) });
  }
}

const checkCategoryExist = (category) => {
  const categories = getData();
  if (category?.id) {
    const checkcategory = categories.filter(cate => cate.id !== category.id && cate.parent === category.parent && cate.name === category.name);
    return checkcategory.length;
  } else {
    const checkcategory = categories.filter(cate => cate.parent === category.parent && cate.name === category.name);
    return checkcategory.length;
  }
}

const getAllList = (req, res) => {
  try {
    const list = getData();
    res.status(200).send({ data: convertPlainArrayToNestedArray(list) });
  } catch (error) {
    console.log(error);
    res.status(500).send({ msg: `Unable to fetch data`, data: 'NOK' });
  }
}

module.exports = {
  getAllList,
  addNew,
  update
}