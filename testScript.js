for (let i = 0; i < 10; i++) {
  console.log(i)
}
[1, 2, 3, 4].forEach(item => {
  console.log(item)
})
return arr.concat([1, 2, 3]).map(item => ({
  ...item,
  name,
  ...obj
}))