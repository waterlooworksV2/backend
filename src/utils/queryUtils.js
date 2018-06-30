const stopword = require('stopword');

function fuzzyifyString(query) {
  const importantWords = stopword.removeStopwords(query.toLowerCase().split(' '));
  return importantWords.map(v => `${v}~`).join(' ');
}

module.exports = {
  fuzzyifyString
};
