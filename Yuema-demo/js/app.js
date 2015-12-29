
var YuemaApp = angular.module('YuemaApp', ['ngRoute','YuemaAppCtrls','YuemaAppAuth','myUIRoute']);

YuemaApp.config(function($routeProvider){
    $routeProvider
        .when('/mypage',
        {
            templateUrl:'html/Yuema-Main.html',
            controller:'YuemaAppAuthCtrl'
        })
        .when('/mypage/settime',
        {
            templateUrl:'html/Yuema-SetTime.html',
            controller:'BtnCtrl'
        })
        .when('/mypage/menbers',
        {
            templateUrl:'html/Yuema-GroupMenbers.html',
            controller:''
        })
        .when('/mypage/menbers/friends',
        {
            templateUrl:'html/Yuema-Friends.html',
            controller:''
        })
        .when('/mypage/timeline',
        {
            templateUrl:'html/Yuema-Timeline.html',
            controller:''
        })
        .otherwise({
            redirectTo:'/mypage'
        });

});

