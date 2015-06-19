angular.module('starter.services', [])

.factory('factoryMail', function($http) {
      return {
        getFolders: function() {
          return $http.get('http://localhost:3000/mailapi/folders');
        },
        //Get mails by folder
        getByFolder: function(folder) {
          var url = 'http://localhost:3000/mailapi/shbyfolder/' + folder;
          return $http.get(url);
        },
        //Get mail by _id
        getMail: function(mailID) {
          var url='http://localhost:3000/mailapi/show/' + mailID;
          console.log("factory.betMail(): "+url);
          return $http.get(url);
        },
        //Delete mail by _id
        deleteMail: function(mail) {
          var url = 'http://localhost:3000/mailapi/deletemail/' + mail._id;
          console.log("deleteMail(): "+url);
          return $http.delete(url);
        },
        //Delete folder by foldername
        deleteFolder: function(folder) {
          return $http.delete('http://localhost:3000/mailapi/deletefolder/' + folder);
        },
        //Rename folder by foldername
        renameFolder: function(folder, newName) {
          return $http.put('http://localhost:3000/mailapi/updfoldername/' + folder, {folder: newName});
        },
        //Move mail by foldername
        moveMail: function(mail, newName) {
          return $http.put('http://localhost:3000/mailapi/mailapi/movemail/' + mail._id, {folder: newName});
        },
        //Create new mail
        newMail: function(mail) {
          var recipients = mail.rec.split(';');
          var paras = {
            sender: mail.sender,
            recipients: recipients,
            text: mail.text,
            subject: mail.subject,
            date: mail.date,
            folder: mail.folder
          };
          console.log("create mail:" );
          console.log(paras);
          return $http.post('http://localhost:3000/mailapi/mailapi/createmail', paras);
        }
      };
    });