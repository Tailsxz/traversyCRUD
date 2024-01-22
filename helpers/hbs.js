const moment = requires('moment');
// adding a hamburger helper, uh I mean handlebars helper.
//Utilizing moment.js library to help format our dates

//Setting up our format date function that takes in arguments of a date and the desired format. The globally exported moment object is deprecated and will be removed in the next major release!!! Keep this in mind if using moment in the future, with the version we are using for this project, this format is the standard for using moment.
module.exports = {
  formatDate: function(date, format) {
    return moment(date).format(format);
  }
}