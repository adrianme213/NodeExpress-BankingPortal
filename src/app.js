const fs = require('fs');
const path = require('path');
const express = require('express');

const app = express();

app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'ejs');

app.use(express.static(path.join(__dirname, 'public')));
const accountData = fs.readFileSync(path.join(__dirname, 'json', 'accounts.json'), 'UTF8', (err, data) => {
  if (err) {
    console.error(err);
    return err;
  }
  return data
});
const accounts = JSON.parse(accountData);
const userData = fs.readFileSync(path.join(__dirname, 'json', 'users.json'), 'UTF8', (err, data) => {
  if (err) {
    console.error(err);
    return err;
  }
  return data
});
const users = JSON.parse(userData);

app.get('/', (req, res) => {
  res.render('index', { accounts, title: 'Account Summary' })
});
app.get('/savings', (req, res) => {
  res.render('account', { account: accounts.savings })
});
app.get('/checking', (req, res) => {
  res.render('account', { account: accounts.checking })
});
app.get('/credit', (req, res) => {
  res.render('account', { account: accounts.credit })
});
app.get('/profile', (req, res) => {
  res.render('profile', { user: users[0] })
});

app.listen(3000, () => console.log('Project running on Port 3000.'));
