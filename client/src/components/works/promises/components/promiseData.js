export default [
  {
    code: `const promise1 = new Promise(function(resolve, reject) {
			setTimeout(resolve, 100, 'foo');
		});
		
		promise1.then( result => {
			console.log(result);
		});
		
    console.log("=-", promise1);`,
    title: "Example 1: Race condition",
    overview: `A promise will wait to execute the code within until after the resolution. This is necessary because of Javascript's 
    non blocking nature. These are most often used for network calls or for complicated methods that would cause a race condition
    within the javascript code. I have provided a few examples below.`
  },
  {
    code: `const promise1 = new Promise(function(resolve, reject) {
			setTimeout(resolve, 100, 'foo');
		});
		
		promise1.then( result => {
      console.log(result);
      console.log("what up!!!");
		});`,
    title: "Example 2: Chained Promises",
    overview: `Sometimes a promise is dependent on the result from another promise.`
  }
];