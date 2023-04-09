const makeid = (length = 5) => {
  let result = '';
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  const charactersLength = characters.length;
  let counter = 0;
  while (counter < length) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength));
    counter += 1;
  }
  return result;
}

const convertPlainArrayToNestedArray = (array = [], parent = '0') => {
  const rootCategories = array.filter(obj => obj.parent === parent);
  rootCategories.forEach(rootCate => {
    const checkChildrenExist = convertPlainArrayToNestedArray(array, rootCate.id);
    if (checkChildrenExist.length) {
      rootCate['children'] = checkChildrenExist;
    }
  });
  return rootCategories;
}

module.exports = {
  makeid,
  convertPlainArrayToNestedArray
}