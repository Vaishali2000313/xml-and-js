const timeout = (ms) => {
  return new Promise(resolve=> {
      setTimeout(resolve, ms);
  })
}

function inc(a) {
  return new Promise(resolve=> {
    timeout(2000).then(() => { return resolve(a + 1)});
  })
}

function sum(a, b) {
   return new Promise(resolve => {
    timeout(2000).then(() => { return resolve(a + b); });
  });
}

function max(a, b) {
  return new Promise(resolve => {
    timeout(2000).then(() => { return resolve(a > b ? a : b); });
  });
}

function avg(a, b) {
  const s = sum(a, b);
  return new Promise(resolve => {
    timeout(2000).then(() => { return resolve(s) / 2; });
  });
}

const obj = {
  name: "Marcus Aurelius",
  split(sep = " ") {
    return new Promise(resolve=> {
      timeout(3000).then(()=> { return resolve(this.name.split(sep))});
    });
  },
};

class Person {
  constructor(name) {
    this.name = name;
  }

  static of(name) {
    return new Person(name);
  }

  split(sep = " ") {
    return new Promise(resolve=>{
      timeout(3000).then(()=> { return resolve(this.name.split(sep))});
    });
  }
}

const person = Person.of("Marcus Aurelius");

inc(8).then(result=>{
  console.log(result);
}).catch(err => {
  console.log(err);
})

sum(3,7).then(result=>{
  console.log(result);
}).catch(err => {
  console.log(err);
})

max(9,4).then(result=>{
  console.log(result);
}).catch(err => { 
  console.log(err);
})

avg(9,4).then(result=>{
  console.log(result);
}).catch(err => {
  console.log(err);
})

obj.split().then(result=> {
  console.log(result)
})

person.split().then(result=> {
  console.log(result);
})
.catch(err=>{
  console.log(err);
})


// function inc(a) {
// return a + 1;
// }
// const max = (a, b) => (a > b ? a : b);
// const avg = (a, b) => {
// const s = sum(a, b);
// return s;
// };

// const Obj = {
// name: "Marcus Aurelius",
//   async split(sep = " ") {
//     await timeout(2000);

  
//   return this.name.split(sep);
// },
// };

// class Person {
// constructor(name) {
//   this.name = name;
// }

// static of(name) {
//   return new Person(name);
// }

// split(sep = " ") {
//   return this.name.split(sep);
// }
// }

// const Person = Person.of("Marcus Aurelius");

// console.log("inc(8) =", inc(5));
// console.log("sum(3, 7) =", sum(3, 7));
// console.log("max(9, 4) =", max(9, 4));
// console.log("avg(9, 4) =", avg(9, 4));
// console.log("obj.split() =", obj.split());
// console.log("person.split() =", person.split());