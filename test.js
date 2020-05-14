async function a() {
  return 1
}

(async () => {
  const ab = await ([1,2,3].map(async n => await a()))
  console.log(ab)
})()