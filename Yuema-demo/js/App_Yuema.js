
var app = angular.module('YuemaApp', []);
app.controller('YuemaAppCtrl', function ($scope,$http) {

    function url2Callback(url){
        var host= "http://ym.zzspider.com/api";
        return host + url;
    }

//---------------------------------------  AUTH  ----------------------------------------//
    //类 登陆流程。提交账号密码，post模式获得token，存储在本地
    $scope.getToken2Store = function(){
        var url = "/auth";
        url = url2Callback(url);
        $http.post(url,{username:'o6_bmjrPTlm6_2sgVt7hMZOPfL2M',password:'048d319f88899fea2fa8b38d9c80c7b9cbe7f65a'})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                    $scope.showAuthErr();
                }else{
                    localStorage.setItem('token',res.access_token); //存储token到本地存储
                    console.log(res.access_token);
                    $scope.getUserInfo(); //获取用户信息填充页面
                }
            })
    };


//---------------------------------------  GROUP  ABOUT ----------------------------------------//
    //附带token至头部作为验证凭证，get模式，获取本token对应的user的group相关信息，填充页面
    $scope.getGroupInfo=function(){
        var url = "/group";
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.get(url,{headers:{"Authorization":'JWT '+ token}})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                    $scope.showGroupErr();
                }else{
                    console.log(res);
                    localStorage.setItem('group_name',res.group_name); //存储token到本地存储
                    localStorage.setItem('group_id',res.id); //存储token到本地存储
                    //fillGroupInfo2Page(res);
                }
            })
    };


    //附带token至头部作为验证凭证，post模式，创建组，获取本token对应的user的group相关信息，填充页面
    $scope.setGroupInfo=function(){
        var url = "/group";
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        var group_name = localStorage.getItem('group_name');
        $http.post(url,{groupname:group_name,id:'001'},{headers:{"Authorization":'JWT '+ token}})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                }
            })
    };


    //附带token至头部作为验证凭证，put模式，修改组信息。获取本token对应的user的group相关信息，填充页面
    $scope.editGroup=function(){
        var token = localStorage.getItem('token');
        var groupid = localStorage.getItem('group_id');
        var url = "/group";
        url = url2Callback(url) + '/'+groupid;
        $http.put(url,{headers:{"Authorization":'JWT '+ token}})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                }
            })
    };


//---------------------------------------  USER  ABOUT ----------------------------------------//
    //附带token至头部作为验证凭证，get模式，获取本token对应的user的相关信息，填充页面
    $scope.getUserInfo=function(){
        var url = "/user";
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.get(url,{headers:{"Authorization":'JWT '+ token}})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                    $scope.showUserErr();
                }else{
                    console.log(res);
                    $scope.getGroupInfo();//请求用户群组信息，填充页面
                    $scope.fillUserInfo2Page(res);//填充用户信息至页面中
                }
            })
    };

    //附带token至头部作为验证凭证，put模式，修改用户信息。获取本token对应的user的相关信息，填充页面
    $scope.editUserInfo=function(){
        var url = "/user";
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.put(url,{headers:{"Authorization":'JWT '+ token}})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                    //$scope.setGroup();
                }else{
                    console.log(res);
                    $scope.getUserInfo();
                }
            })
    };



    //-----------------------------------------------------  FILL  THE  PAGE-------------------------------------------------------//

    $scope.fillUserInfo2Page=function(res){
        $scope.groupowner = 'true';
        $scope.myopenid=res.openid;
        $scope.pageuser=res.id;
        //if(res.id == "3"){
        //     $scope.groupowner = 'false';
        //}else{
        //     $scope.groupowner = 'false';
        //}

    };

    $scope.fillGroupInfo2Page=function(res){
        $scope.myopenid=res.openid;
    };

    });




app.controller('BtnCtrl', function ($scope,$http) {

    $scope.btnChg = function(btnTurn){
        $scope.btnclass1='';
        $scope.btnclass2='';
        $scope.btnclass3='';
        $scope.btnclass4='';
        $scope.btnclass5='';
        $scope.btnclass6='';
        $scope.btnclass7='';
        if(btnTurn ==1){ $scope.btnclass1= "current";}
        if(btnTurn ==2){ $scope.btnclass2= "current";}
        if(btnTurn ==3){ $scope.btnclass3= "current";}
        if(btnTurn ==4){ $scope.btnclass4= "current";}
        if(btnTurn ==5){ $scope.btnclass5= "current";}
        if(btnTurn ==6){ $scope.btnclass6= "current";}
        if(btnTurn ==7){ $scope.btnclass7= "current";}
    };

    $scope.TimeSelChg = function(btnTurn){
        $scope.TimeSelChg1='';
        $scope.TimeSelChg2='';
        $scope.TimeSelChg3='';
        if(btnTurn ==1){ $scope.TimeSelChg1= "current";}
        if(btnTurn ==2){ $scope.TimeSelChg2= "current";}
        if(btnTurn ==3){ $scope.TimeSelChg3= "current";}
    };

});

