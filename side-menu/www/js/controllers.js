function getAllFolders(factoryMail, $scope) {
    factoryMail.getFolders().success(function (data, status, headers, config) {
        $scope.folders = data;
        console.log("factoryMail.getFolders() " + data);
    });
}

function getAllMailsByFolder($scope, folder, factoryMail) {
    $scope.selectedFolder = folder;
    factoryMail.getByFolder(folder).success(function (data, status, headers, config) {
        $scope.mails = data;
        console.log($scope.mails);
        console.log("selectFolder(): " + $scope.selectedFolder);
    });
}
angular.module('starter.controllers', [])

    .controller('mailController', function ($scope, $http, factoryMail, $stateParams) {
        console.log($scope.selectedFolder);

        $scope.folderName = $stateParams.folderId;


        getAllFolders(factoryMail, $scope);

        $scope.selectFolder = function (folder) {
            getAllMailsByFolder($scope, folder, factoryMail);
        };

        $scope.removeFolder = function (folder) {
            factoryMail.deleteFolder(folder).success(function (data, status, headers, config) {
                $scope.debugOutput = data;
            });
            getAllFolders(factoryMail, $scope);
        };

        $scope.removeMail = function (mail) {
            factoryMail.deleteMail(mail).success(function (data,status,headers, config) {
               $scope.debugOutput= data;
                console.log("removeMail :" +$scope.selectedFolder);
            });
            getAllMailsByFolder($scope, $scope.selectedFolder, factoryMail);
        };


    });
