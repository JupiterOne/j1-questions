const uniqueArray = (array : string[]) => {
  var set = new Set(array);
  let newArray = []
  for (var item of Array.from(set.values())) {
    if (item !== undefined) newArray.push(item)
  }
  return newArray
}
export default uniqueArray;
