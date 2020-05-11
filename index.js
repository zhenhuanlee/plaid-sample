/* plaid flow
1. user grant us access and plaid will return a public_token (one-time use, expire after 30 mins)
2. we can exchange the public_token for an access_token and item_id
3. access user's transactions via this access_token (never expire)

5. public_token can create by access_token https://plaid.com/docs/#create-public-token
*/

const plaid = require('plaid')
const moment = require('moment')
const fs = require('fs');

const PLAID_CLIENT_ID = '5eb118010b2dcc00124d04f3'
const PLAID_SECRET = '81d7438fc4dc4f2508966b701e5192'
const PLAID_PUBLIC_KEY = '6922f254ead6cd2e5c1552f534f291'

const plaidClient = new plaid.Client(
  PLAID_CLIENT_ID,
  PLAID_SECRET,
  PLAID_PUBLIC_KEY,
  plaid.environments.sandbox,
  {version: '2019-05-29'} // '2019-05-29' | '2018-05-22' | '2017-03-08'
);


(async () => {
  /* create public token
  let res = await plaidClient.sandboxPublicTokenCreate("ins_13", ['auth'])
  if (res.status_code !== 200) throw new Error("create public token failed:", res.status_code)
  const publicToken = res.public_token
   */
  

  /* exchange public token for access token 
  res = await plaidClient.exchangePublicToken(publicToken)
  if (res.status_code !== 200) throw new Error("exchage public token failed:", res.status_code)
  const accessToken = res.access_token
   */

  await getCategories()
})()

async function getCategories() {
  const categories = await plaidClient.getCategories()
  fs.writeFileSync('./categories.json', JSON.stringify(categories))
}

async function getTx() {
  const accessToken = 'access-sandbox-293e2a2d-6300-4b49-a8e0-91da55ce1fba'
 
  var startDate = moment().subtract(30, 'days').format('YYYY-MM-DD');
  var endDate = moment().format('YYYY-MM-DD');

  const txs = await plaidClient.getTransactions(accessToken, startDate, endDate)

  console.log(JSON.stringify(txs, null, 2))
}