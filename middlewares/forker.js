function longComputation() {
  let sum = 0;
  for (let i = 0; i < 1e3; i++) {
    sum += i;
  }
  return sum;
}

process.on("message", (message) => {
  if (message === "start") {
    const sum = longComputation();
    console.log("summing up");
    process.send(sum);
  }
});
