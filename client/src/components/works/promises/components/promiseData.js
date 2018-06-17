export default [
  {
    code: `const promise1 = new Promise(function(resolve, reject) {
			setTimeout(resolve, 200, 'foo');
		});
		
		promise1.then( result => {
			console.log(result);
		});
		
    console.log("promise before resolution:", promise1);`,
    title: "Example 1: Race condition",
    overview: `A promise will wait to execute the code within until after the resolution. This is necessary because of Javascript's 
    non blocking nature. These are most often used for network calls or for complicated methods that would cause a race condition
    within the javascript code. I have provided a few examples below.`
  },
  {
    code: `const promise1 = new Promise(function(resolve, reject) {
			setTimeout(resolve, 400, 'never gonna give you up');
    });
    
    const promise2 = new Promise(function(resolve, reject) {
			setTimeout(resolve, 400, 'never gonna let you down');
    });
    
    const promise3 = new Promise(function(resolve, reject) {
			setTimeout(resolve, 400, 'never gonna turn around and desert you');
		});
		
		promise1.then( result => {
      console.log(result);
      return promise2;
		}).then( result => {
      console.log(result);
      return promise3;
    }).then(result => {
      console.log(result);
    });`,
    title: "Example 2: Chained Promises",
    overview: `Sometimes a promise is dependent on the result from another promise. In this case you will need to chain your promises
    together, to be sure that they will execute in the correct order.`
  },
  {
    code: `const promise1 = new Promise(function(resolve, reject) {
			setTimeout(resolve, 400, 'never gonna make you cry');
    });
    
    const promise2 = new Promise(function(resolve, reject) {
			setTimeout(resolve, 400, 'never gonna say goodbye');
    });
    
    const promise3 = new Promise(function(resolve, reject) {
			setTimeout(resolve, 400, 'never gonna tell a lie or hurt you');
		});
    
    let promiseArray = [promise1, promise2, promise3];

    Promise.all(promiseArray).then(resultArray => {
      resultArray.forEach(result => {
        console.log(result);
      });
    });
		`,
    title: "Example 3: Promise Async",
    overview: `If you have many promises to resolve that are not dependent on each other you can resolve them asynchronously with a promise all shown below. The promise
    all will take in an array of promises and return an array of the responses in the same order.`    
  },
  {
    code: `const promise1 = new Promise(function(resolve, reject) {
			setTimeout(reject, 200, 'never gonna make you cry');
    }).catch( ()=> {
      return 'Ricky Astley broken...';
    });
    
    const promise2 = new Promise(function(resolve, reject) {
			setTimeout(resolve, 400, 'never gonna say goodbye');
    });
    
    const promise3 = new Promise(function(resolve, reject) {
			setTimeout(resolve, 400, 'never gonna tell a lie or hurt you');
		});
    
    let promiseArray = [promise1, promise2, promise3];
    
    Promise.all(promiseArray).then(resultArray => {
      resultArray.forEach(result => {
        console.log(result);
      });
    });
		`,
    title: "Example 4: Promise Error handling",
    overview: `let's say you are running a promise all, but one of the promises fails... What then? You can catch each promise individually and handle the failure gracefully
    ensuring that if the other promises resolve you still have the result from those. As seen in the example below promise1 will fail, and the catch will fire. The promise all 
    will still execute.`    
  },
  {
    code: `
    
    const promise = new Promise(function(resolve, reject) {
			setTimeout(resolve, 400, 'bingo!!!');
    });
    async function numbers() {
      let response = await promise;
      alert(response);
      return response;
    }
    console.log(numbers());`,
    title: "Example 5: Async and Await",
    overview: `The aync keyword can be placed in front of any function delaration and that function will automatically be wrapped in a promise. The await keyword will ensure 
    that the promise has resolved before it continues`    
  }
];