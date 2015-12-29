
var YuemaAppAuth = angular.module('YuemaAppAuth', ['ngAnimate','cgBusy']);

//YuemaAppAuth.config(['$locationProvider', function($locationProvider) {
//    $locationProvider.html5Mode(true);
//}]);

YuemaAppAuth.controller('YuemaAppAuthCtrl', function ($scope,$http,$location) {

    function url2Callback(url){
        var host= "//192.168.0.100:5000/api";
        return host + url;
    }

//--------------------------------------------------------  AUTH  ----------------------------------------------------//
    //类 登陆流程。提交账号密码，post模式获得token，存储在本地  //------------auth
    $scope.getToken2Store = function(){
        var url = "/auth";
        url = url2Callback(url);
        if ($location.search().state) {
            var state = $location.search().state;
        }
        if ($location.search().code) {
            var code = $location.search().code;
        }
        console.log(state);
        console.log(code);
        $http.post(url,{state:state,code:code})
            .success(function(res){
                if(res.err){
                    console.log(res);
                    $scope.showAuthErr();
                }else{
                    localStorage.setItem('token',res.access_token); //存储token到本地存储
                }
            })
    };


//------------------------------------------------------  USER  ABOUT -------------------------------------------------//

    //--------------------------user info get-------------------------//

    // ---------user,get,
    $scope.getUserInfo=function(userid){
        var url;
        if(userid == null){
            url = '/users';
        }else{
            url = '/users/' + userid;
        }
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.get(url,
            {headers:{"Authorization":'JWT '+ token}}
        )
            .success(function(res){
                if(res.err){
                    console.log(res);
                }else{
                    console.log(res);
                    $scope.username = res.backup_name;
                    $scope.headimgUrl=res.headimg_url;
                    $scope.getGroupsInfo();
                }
            })
    };

    //------------------------backupname-----------------------//

    // ---------user,post,backup
    $scope.createUserBackup = function(userid){
        var url = "/user/" + userid + '/backup';
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.post(url,{headers:{"Authorization":'JWT '+ token}},{backupname:'',groupname:''})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                }
            })
    };

    // ---------user,get,backup
    $scope.getUserBackup = function(userid){
        var url = "/user/" + userid +'/backup';
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.get(url,{headers:{"Authorization":'JWT '+ token}})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                }
            })
    };

    // ---------user,put,backup
    $scope.editUserBackup = function(userid){
        var url = "/user/" + userid + '/backup';
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.put(url,{headers:{"Authorization":'JWT '+ token}},{backupname:'',groupname:''})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                }
            })
    };


//-------------------------------------------------------Group-----------------------------------------------------------//

    //---------------------------group info------------------------------//

    //----------groups,get,all or single one.
    $scope.getGroupsInfo=function(){
        var url = '/groups';
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.get(url,{headers:{"Authorization":'JWT '+ token}})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                    $scope.groupnames = res;
                }
            })
    };

    $scope.getOneGroupInfo=function(groupid,owner){
        var url = '/groups/' + groupid;
        url = url2Callback(url);
        console.log(owner);
        localStorage.setItem('now_groupid',groupid);
        localStorage.setItem('now_groupname',owner);
        var token = localStorage.getItem('token');
        $http.get(url,{headers:{"Authorization":'JWT '+ token}})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                    $scope.getMembers();
                }
            })
    };


    //----------groups,delete
    $scope.delGroupInfo=function(groupid){
        var url;
        if(groupid ==null){
            url = '/groups';
        }else{
            url = '/groups/' + groupid;
        }
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.delete(url,{headers:{"Authorization":'JWT '+ token}})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                }
            })
    };


    //----------groups,post,all
    $scope.createGroup=function(username){
        var url = '/groups';
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        var groupname = username;
        //groupname = String(groupname);
        $http.post(url,{groupname:'groupname'},{headers:{"Authorization":'JWT '+ token}})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                    $scope.getOneGroupInfo(res.id,groupname)
                }
            })
    };

    //----------groups,put,all
    $scope.editGroup=function(groupid){
        var url = '/groups/' + groupid;
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.put(url,{headers:{"Authorization":'JWT '+ token}},{groupname:''})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                }
            })
    };


    //--------------------------group   timeline ---------------------------//

    //-----------timeline,date,post
    $scope.createTimeline = function(groupid,date){
        var url;
        if(date == null){
            url = '/groups/'+ groupid + '/timelines';
        }else{
            url = '/groups/'+ groupid + '/timelines/'+ date;
        }
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.post(url,{headers:{"Authorization":'JWT '+ token}},{timeline:''})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                }
            })
    };

    //-----------timeline,date,get
    $scope.getTimelineAllday = function(groupid){
        var url = '/groups/'+ groupid + '/timelines';
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.get(url,{headers:{"Authorization":'JWT '+ token}})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                }
            })
    };

    $scope.getTimeline1day = function(groupid,date){
        var url = '/groups/'+ groupid + '/timelines/'+ date;
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.get(url,{headers:{"Authorization":'JWT '+ token}})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                }
            })
    };

    //-----------timeline,date,put
    $scope.editTimeline = function(groupid,date){
        var url;
        if(date == null){
            url = '/groups/'+ groupid + '/timelines';
        }else{
            url = '/groups/'+ groupid + '/timelines/'+ date;
        }
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.put(url,{headers:{"Authorization":'JWT '+ token}},{timeline:''})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                }
            })
    };

    //-----------timeline,date,delete
    $scope.delTimeline = function(groupid,date){
        var url;
        if(date == null){
            url = '/groups/'+ groupid + '/timelines';
        }else{
            url = '/groups/'+ groupid + '/timelines/'+ date;
        }
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.delete(url,{headers:{"Authorization":'JWT '+ token}})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                }
            })
    };

    //-----------------------group members---------------------------//

    //--------menber,nickname,put
    $scope.editMembers = function(groupid,userid){
        var url;
        if(userid == null){
            url = '/groups/'+ groupid + '/members';
        }else{
            url = '/groups/'+ groupid + '/members/'+ userid;
        }
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.put(url,{headers:{"Authorization":'JWT '+ token}},{nickname:''})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                }
            })
    };

    //--------menber,get,all info
    $scope.getMembers = function(){
        var now_groupid = localStorage.getItem('now_groupid');
        var now_groupname = localStorage.getItem('now_groupname');
        var url = '/groups/'+ now_groupid + '/members';
        url = url2Callback(url);
        console.log(url);
        var token = localStorage.getItem('token');
        $http.get(url,{headers:{"Authorization":'JWT '+ token}})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                    $scope.groupmembers =res;
                    $scope.groupname =now_groupname;
                }
            })
    };

    $scope.getOneMember = function(groupid,userid){
        var url = '/groups/'+ groupid + '/membems/'+ userid;
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.get(url,{headers:{"Authorization":'JWT '+ token}})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                }
            })
    };


    //--------menber,delete,
    $scope.delMembers = function(groupid,userid){
        var url;
        if(userid == null){
            url = '/groups/'+ groupid + '/members';
        }else{
            url = '/groups/'+ groupid + '/members/'+ userid;
        }
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.delete(url,{headers:{"Authorization":'JWT '+ token}},{nickname:''})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                }
            })
    };


    $scope.chartFIT=function(){

        var data = {
            labels : ["Janu","Febru","Mah","Aril","May","22","22"],
            datasets : [
                {
                    barItemName: "name1",
                    fillColor : "rgba(220,220,220,0.5)",
                    strokeColor : "rgba(220,220,220,1)",
                    data : [10,8,2,16,20,22,5]
                }
                //{
                //    barItemName: "name2",
                //    fillColor : "rgba(151,187,205,0.5)",
                //    strokeColor : "rgba(151,187,205,1)",
                //    data : [28,48,40,19,96,27,100]
                //}
            ]
        };

        var chartBar = null;
        window.onload = function() {
            var ctx = document.getElementById("myChart").getContext("2d");
            chartBar = new Chart(ctx).Bar(data);

            //initEvent(chartBar, clickCall);
        };

        //function clickCall(evt){
        //    var activeBar = chartBar.getBarSingleAtEvent(evt);
        //    if ( activeBar !== null )
        //        alert(activeBar.label + ": " + activeBar.barItemName + " ____ " + activeBar.value);
        //}

        //function initEvent(chart, handler) {
        //    var method = handler;
        //    var eventType = "click";
        //    var node = chart.chart.canvas;
        //
        //    if (node.addEventListener) {
        //        node.addEventListener(eventType, method);
        //    } else if (node.attachEvent) {
        //        node.attachEvent("on" + eventType, method);
        //    } else {
        //        node["on" + eventType] = method;
        //    }
        //}
    };

    $scope.load = function(){
        $scope.getToken2Store();
        $scope.getUserInfo();
        $scope.chartFIT();
    };

    $scope.load2 = function(){
        $scope.getMembers();
    };


    $scope.myloadstyle1 = 'none';
    $scope.myloadstyle2 = 'none';

});



