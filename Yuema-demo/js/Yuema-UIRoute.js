/**
 * Created by lasty on 2015/12/24.
 */

var myUIRoute = angular.module('myUIRoute', ['ui.router', 'ngAnimate']);
myUIRoute.config(function($stateProvider, $urlRouterProvider) {
    $urlRouterProvider.otherwise("/mypage");
    $stateProvider
        .state('settime', {
            url: "/mypage/settime",
            templateUrl: "html/Yuema-SetTime.html"
        })
        .state('groupmenbers', {
            url: "/mypage/menbers",
            templateUrl: "html/Yuema-GroupMenbers.html"
        })
        .state('friends', {
            url: "/mypage/menbers/friends",
            templateUrl: "html/Yuema-Friends.html"
        })
        .state('timeline', {
            url: "/mypage/timeline",
            templateUrl: "html/Yuema-Timeline.html"
        });

});
