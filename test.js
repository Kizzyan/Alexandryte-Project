const removeItem = (item, list) => {
  const index = list.indexOf(item);
  return list.splice(index, 1);
};

let number = 54;

let arr = [1, 43, 56, 23, 75, 54, 12, 542, 75];

console.log(arr);

removeItem(number, arr);

console.log(arr);
