const express = require('express');
const axios = require('axios');

const app = express();
const port = 9876;


app.use(express.json());


const WINDOW_SIZE = 10;


const apiEndpoints = {
  p: 'http://20.244.56.144/test/primes',
  f: 'http://20.244.56.144/test/fibo',
  e: 'http://20.244.56.144/test/even',
  r: 'http://20.244.56.144/test/rand'
};


let window = [];


const calculateAverage = (numbers) => {
  if (numbers.length === 0) return 0;
  const sum = numbers.reduce((acc, num) => acc + num, 0);
  return parseFloat((sum / numbers.length).toFixed(2));
};


const validNumberIds = ['p', 'f', 'e', 'r'];


const handleRequest = async (req, res) => {
  const { numberid } = req.params;

  
  if (!validNumberIds.includes(numberid)) {
    return res.status(400).json({ error: 'Invalid numberid. Must be one of p, f, e, r.' });
  }

 
  const windowPrevState = [...window];

 
  let fetchedNumbers = [];
  try {
    const response = await axios.get(apiEndpoints[numberid], {
      timeout: 500 // 500ms timeout
    });
    fetchedNumbers = response.data.numbers || [];
  } catch (error) {
   
    fetchedNumbers = [];
  }

 
  const uniqueNewNumbers = [...new Set(fetchedNumbers)].filter(num => !window.includes(num));

  
  const newWindow = [...window, ...uniqueNewNumbers];
  if (newWindow.length > WINDOW_SIZE) {
    
    window = newWindow.slice(-WINDOW_SIZE);
  } else {
    window = newWindow;
  }

 
  const avg = calculateAverage(window);

  
  const response = {
    windowPrevState,
    windowCurrState: [...window],
    numbers: fetchedNumbers,
    avg
  };

  
  res.json(response);
};


app.get('/numbers/:numberid', handleRequest);


app.post('/numbers/:numberid', handleRequest);


app.listen(port, () => {
  console.log(`Server running on http://localhost:${port}`);
});