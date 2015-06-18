angular.module('starter.controllers', [])

.controller('DashCtrl', function($scope) {})

.controller('ChatsCtrl', function($scope, Chats) {
  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //
  //$scope.$on('$ionicView.enter', function(e) {
  //});
  
  $scope.chats = Chats.all();
  $scope.remove = function(chat) {
    Chats.remove(chat);
  }
})

.controller('ChatDetailCtrl', function($scope, $stateParams, Chats) {
  $scope.chat = Chats.get($stateParams.chatId);
})

.controller('AccountCtrl', function($scope) {
  $scope.settings = {
    enableFriends: true
  };
})
.controller('mailController', function ($scope, $http, factoryMail, $stateParams) {
      $scope.folderName = $stateParams.folderId;

      factoryMail.getFolders().
      success(function (data, status, headers, config) {
        $scope.folders = data;
        console.log("factoryMail.getFolders() " + data);
      });

      $scope.selectFolder = function(folder) {
          console.log($scope);

        $scope.selectedFolder = folder;
        factoryMail.getByFolder(folder).success( function (data,status, headers, config ) {
          $scope.mails = data;
          console.log($scope.mails);
        });
      };
});
