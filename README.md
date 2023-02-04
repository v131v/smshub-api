# smshub-api
API for smshub.org

## Installation 

`npm i https://github.com/v131v/smshub-api.git`

## Usage

```js
const SmsHubAPI = require('smshub-api');

(async function() {
  const token = 'some token';
  const api = new SmsHubAPI(token);
  
  const { balance } = await api.getBalance();
  
  if (+balance > 0) {
    const order = await api.getNumber('vk', api.country.RU);
    
    console.log(`Number: ${order.number}`);
    
    let status = await api.getStatus(order.id);
    
    const waitTimeSec = 5;
    while (!order.code) {
      await timer(5 * 1000);
      status = await api.getStatus(order.id);
    }
    
    console.log(`Code: ${status.code}`);
  }
})()

async function timer(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}
```

## Methods
All methods return promises that resolves objects

### getNumberStatus

Arguments:
* `country` - `String`
* `operator` - `String`

Returns:
* `serviceName_0` - `Number` count of available numbers for service serviceName

### getBalance

Returns: 
* `balance` - `String` value of balance

### getNumber

Arguments:
* `service` - `String` service name (like 'vk')
* `country` - `String` country code (available with apiInstance.COUNTRY)
* `operator` - `String` operator name

Returns:
* `id` - `String` order id
* `number` - `String` phone number

### getStatus

Arguments:
* `id` - `String` order id recieved with `getNumber()`

Returns:
* `status` - `String` current status of order
* `code` - `String` code sent on phone number (only if it has already sent)

### setStatus

Arguments:
* `status` - `String` status for order (available with apiInstance.STATUS)
* `id` - `String` order id

Returns:
* `status` - `String` status of operation
