# malver
Detects URLs considered to be malware-ish using simple sentiment analysis

# Install

```
npm install malver
```

# Use

Command line:

```
$ node malver nba.com
nba.com is 0% malwareish
$ node malver cnn.com
cnn.com is 0% malwareish
$ node malver tasearch.com
tasearch.com is 90% malwareish
$ 
```

API:

```js
var malver = require('malver');

var url = 'tasearch.com';

malver.analyze(url, function (err, percent_malwareish) {
  if (err) {
    throw err;
  }

  console.log(url, 'is', percent_malwareish + '% malware-ish');
});
```
