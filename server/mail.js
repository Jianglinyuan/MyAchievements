Meteor.startup(function () {
  smtp = {
    username: 'sysulz19920512@163.com',   // eg: server@gentlenode.com
    password: 'ikwbepxwmnsmimvk',   // eg: 3eeP1gtizk5eziohfervU
    server:   'smtp.163.com',  // eg: mail.gandi.net
    port: 465
  };
  Accounts.emailTemplates.from = 'sysulz19920512@163.com';

  // The public name of your application. Defaults to the DNS name of the application (eg: awesome.meteor.com).
  Accounts.emailTemplates.siteName = 'Gentlenode Studio';

  // A Function that takes a user object and returns a String for the subject line of the email.
  Accounts.emailTemplates.verifyEmail.subject = function(user) {
      return 'Confirm Your Email Address';
  };

  // A Function that takes a user object and a url, and returns the body text for the email.
  // Note: if you need to return HTML instead, use Accounts.emailTemplates.verifyEmail.html
  Accounts.emailTemplates.verifyEmail.text = function(user, url) {
      return 'click on the following link to verify your email address: ' + url;
  };

  process.env.MAIL_URL = 'smtp://' + encodeURIComponent(smtp.username) + ':' + encodeURIComponent(smtp.password) + '@' + encodeURIComponent(smtp.server) + ':' + smtp.port;
});
