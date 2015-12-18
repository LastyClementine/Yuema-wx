
/* Controllers */

var app = angular.module('YuemaApp', []);
app.controller('YuemaAppCtrl', function ($scope,$http) {

    $scope.fillUserInfo2Page = function(res){
        $scope.opneid = res.openid;
    };

    $scope.fillGroupInfo2Page = function(){
        //xxxxxxxx
    };
});
