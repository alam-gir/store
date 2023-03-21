const compareTwoObj = (obj1, obj2) => {
  let objEqual
  const obj1Keys = Object.keys(obj1).sort();
  const obj2Keys = Object.keys(obj2).sort();
  if (obj1Keys.length !== obj2Keys.length) {
        objEqual = false
  } else {
    const areEqual = obj1Keys.every((key, index) => {
      const objValue1 = obj1[key];
      const objValue2 = obj2[key];// initaillly was ==== obj2[obj2Keys[index]]
      return objValue1 === objValue2;
    });
    if (areEqual) {
      objEqual = true;
    } else {
      objEqual = false
    }
  }
  return objEqual
};

const compareTwoObjByPrimaryObjKeys = (primayObj, obj) => {
  // take primay objects keys
  const keys = Object.keys(primayObj)
  const result = keys.every(key => primayObj[key] === obj[key])
  return result
}

export { compareTwoObj, compareTwoObjByPrimaryObjKeys };
