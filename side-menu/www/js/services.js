angular.module('starter.services', [])

.factory('Chats', function() {
  // Might use a resource here that returns a JSON array

  // Some fake testing data
  var chats = [{
    id: 0,
    name: 'Ben Sparrow',
    lastText: 'You on your way?',
    face: 'https://pbs.twimg.com/profile_images/514549811765211136/9SgAuHeY.png'
  }, {
    id: 1,
    name: 'Max Lynx',
    lastText: 'Hey, it\'s me',
    face: 'https://avatars3.githubusercontent.com/u/11214?v=3&s=460'
  },{
    id: 2,
    name: 'Adam Bradleyson',
    lastText: 'I should buy a boat',
    face: 'https://pbs.twimg.com/profile_images/479090794058379264/84TKj_qa.jpeg'
  }, {
    id: 3,
    name: 'Perry Governor',
    lastText: 'Look at my mukluks!',
    face: 'https://pbs.twimg.com/profile_images/598205061232103424/3j5HUXMY.png'
  }, {
    id: 4,
    name: 'Mike Harrington',
    lastText: 'This is wicked good ice cream.',
    face: 'https://pbs.twimg.com/profile_images/578237281384841216/R3ae1n61.png'
  }];

  return {
    all: function() {
      return chats;
    },
    remove: function(chat) {
      chats.splice(chats.indexOf(chat), 1);
    },
    get: function(chatId) {
      for (var i = 0; i < chats.length; i++) {
        if (chats[i].id === parseInt(chatId)) {
          return chats[i];
        }
      }
      return null;
    }
  };
}).factory('factoryMail', function($http) {
      return {
        getFolders: function() {
          return $http.get('http://localhost:3000/mailapi/folders');
        },
        //Get mails by folder
        getByFolder: function(folder) {
          return $http.get('http://localhost:3000/mailapi/shbyfolder/' + folder);
        },
        //Get mail by _id
        getMail: function(mail) {
          return $http.get('http://localhost:3000/mailapi/show/' + mail._id);
        },
        //Delete mail by _id
        deleteMail: function(mail) {
          return $http.delete('http://localhost:3000/mailapi/deletemail/' + mail._id);
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
          return $http.put('/mailapi/movemail/' + mail._id, {folder: newName});
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
          return $http.post('/mailapi/createmail', paras);
        }
      };
    });