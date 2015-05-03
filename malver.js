var malver = require('./');

function main(url) {
  return malver.analyze(url, function (err, percent_malwareish) {
    if (err) {
      console.log('Failed');
      return;
    }

    console.log(url, 'is', percent_malwareish + '% malware-ish');
  });
}

main(process.argv[2]);
