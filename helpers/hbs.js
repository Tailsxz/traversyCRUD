const moment = require('moment');
// adding a hamburger helper, uh I mean handlebars helper.
//Utilizing moment.js library to help format our dates

//Setting up our format date function that takes in arguments of a date and the desired format. The globally exported moment object is deprecated and will be removed in the next major release!!! Keep this in mind if using moment in the future, with the version we are using for this project, this format is the standard for using moment.
module.exports = {
  formatDate: function(date, format) {
    return moment(date).format(format);
  },//Fancy word for shortening the "duration or extent of" something. Why use fancy word when small word work
  truncate: function(str, len) {
    if (str.length > len && str.length > 0) {
      console.log(str);
      let new_str = str + ' ';
      console.log(new_str);
      //please don't use substr, substr is deprecated and DEPRECATED BAD NON STANDARDIZED BAD BAD BAD
      //Since traversys original helper used the len to provide as the second argument of substr, to convert it using substring we can simple state the ending index as the length, as the ending index will be exclusive, giving us our desired string. For example if our string length passed as an argument is 4 and the word is Hello, passing in 4 will reference the o as the ending index which will NOT be included, producing 'Hell', our desired string length.
      new_str = str.substring(0, len);
      console.log(new_str)
      new_str = str.substring(0, new_str.lastIndexOf(' ')); // This line is confusing me, lets work through it. So with our string to form the new one we concatenate a space onto it. Lets say it was hello, now its 'hello '. If our passed in length is 7, OHHH So the first substring call is shortening to our length, but if the length we passed in is greater than the string length that means the space is still existing within the string and so we use the last index of the space, which is zero based, so this will produce the string without the space. So my question is why was the space added in the first place. If there isn't a space left, it will produce an instance of the exact string else shorten to a length equal to the lastIndex of the space. 'Hello World' len = 7, 'Hello World ', => 'Hello W' after lastIndex of Space => 'Hello' OHHH its to ensure that we do not clip words omg. Yea just tested, it will remove the last word after a space to ensure that there are never any clipped words. So the flow goes, first add a space in, now clip the string to the desired length, now clip it further to the index of the last space. If the space we added is still in the string, clip there otherwise this means that it is the last space seperating the last two words, we want to ensure that no words are clipped so clip there. Edge case: a long word, if we call the second substring() on a long word with no spaces, we recieve an empty string, which we check for below. If the length is 0, an empty string, then we just return the initial string clipped to our desired length. This seems kinda redundant as we can probably specify checks for a single long word and apply return it using a guard clause at the beginning of the function rather than performing all of these substring calls and then checking the length.
      console.log(new_str);
      new_str = new_str.length > 0 ? new_str : str.substring(0, len);
      //this last line ensures that for long words when the initial substring(0, len) is called, if the space we added is removed, since there is no spaces our second substring(lastindexof) call, will produce an empty string, therefore we check if it is empty str.length > 0, and if it is we return the original string calling a single substring on it of (0, len).
      console.log(new_str)
      return new_str + '...'
    }
    return str;
  },
  stripTags: function(input) {//regex replacing anything with the <> with nothing.
    input = input.replace('<p>', '');
    input = input.replace('</p>', '');
    return input;
  },
}