const express = require('express');
const bodyParser = require('body-parser');
const app = express();
const PORT = 3000; // You can change this to your preferred port number

app.use(bodyParser.json());

// Sample in-memory data store for currencies
let currencies = {
  USD: 1000,
  EUR: 500,
};

// Routes
app.get('/currencies', (req, res) => {
  res.json(currencies);
});

app.post('/add', (req, res) => {
  const { currency, amount } = req.body;
  if (!currency || !amount || isNaN(amount)) {
    return res.status(400).json({ error: 'Invalid request. Please provide a valid currency and amount.' });
  }

  if (!currencies[currency]) {
    currencies[currency] = 0;
  }

  currencies[currency] += Number(amount);
  res.json({ message: `Added ${amount} ${currency}. Current balance: ${currencies[currency]}` });
});

app.post('/remove', (req, res) => {
  const { currency, amount } = req.body;
  if (!currency || !amount || isNaN(amount)) {
    return res.status(400).json({ error: 'Invalid request. Please provide a valid currency and amount.' });
  }

  if (!currencies[currency]) {
    return res.status(400).json({ error: 'Currency not found.' });
  }

  if (currencies[currency] < amount) {
    return res.status(400).json({ error: 'Insufficient balance.' });
  }

  currencies[currency] -= Number(amount);
  res.json({ message: `Removed ${amount} ${currency}. Current balance: ${currencies[currency]}` });
});

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
