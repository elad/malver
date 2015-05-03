var google = require('google'),
    async = require('async'),
    _ = require('underscore');

google.resultsPerPage = 25;

var SAMPLE_SIZE = 20;
var MALWORDS = ['malware', 'remove', 'virus', 'infect', 'junk', 'spy', 'spam', 'phish'];

function get_words(s) {
  return _.map(s.split(' '), function (word) { return word.toLowerCase(); });
}

function has_malword(word) {
  return !!_.find(MALWORDS, function (malword) {
    return word.indexOf(malword) !== -1;
  });  
}

function is_malwareish(link) {
  var words = get_words(link.title).concat(get_words(link.description));
  return !!_.find(words, has_malword);
}

function analyze(url, callback) {
  var count = 0,
      num_malwareish = 0;
  return async.whilst(
    function () { return count < SAMPLE_SIZE; },
    function (callback) {
      return google(url, function (err, next, links){
        if (err) {
          return callback(err);
        }

        _.detect(links, function (link) {
          if (is_malwareish(link)) {
            num_malwareish++;
          }

          if (++count >= SAMPLE_SIZE) {
            next = callback;
            return true;
          }
        });

        return next();
      });
    },
    function (err) {
      var percent_malwareish = (num_malwareish / SAMPLE_SIZE) * 100;

      return callback(err, percent_malwareish);
    }
  );
}

module.exports.analyze = analyze;
