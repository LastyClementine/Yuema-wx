
var app = angular.module('YuemaApp', []);
app.controller('YuemaAppCtrl', function ($scope,$http) {

    function url2Callback(url){
        var host= "http://ym.zzspider.com/api";
        return host + url;
    }


    //�� ��½���̡��ύ�˺����룬postģʽ���token���洢�ڱ���
    $scope.getToken2Store = function(){
        var url = "/auth";
        url = url2Callback(url);
        $http.post(url,{username:'o6_bmjrPTlm6_2sgVt7hMZOPfL2M',password:'048d319f88899fea2fa8b38d9c80c7b9cbe7f65a'})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    localStorage.setItem('token',res.access_token);
                    console.log(res.access_token);
                }
            })
    };



    //����token��ͷ����Ϊ��֤ƾ֤��getģʽ����ȡ��token��Ӧ��user��group�����Ϣ�����ҳ��
    $scope.getGroupInfo=function(){
        var url = "/group";
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


    //����token��ͷ����Ϊ��֤ƾ֤��postģʽ����ȡ��token��Ӧ��user��group�����Ϣ�����ҳ��
    $scope.setGroup=function(){
        var url = "/group";
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.post(url,{groupname:"lasty",id:'001'},{headers:{"Authorization":'JWT '+ token}})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                }
            })
    };

    //����token��ͷ����Ϊ��֤ƾ֤��getģʽ����ȡ��token��Ӧ��user�������Ϣ�����ҳ��
    $scope.getUserInfo=function(){
        var url = "/user";
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.get(url,{headers:{"Authorization":'JWT '+ token}})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                    //$scope.setGroup();
                }else{
                    console.log(res);
                    $scope.getGroupInfo();
                }
            })
    };






    //����token��ͷ����Ϊ��֤ƾ֤��postģʽ����ȡ��token��Ӧ��user��group�����Ϣ�����ҳ��
    $scope.setGroup=function(){
        var url = "/group";
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.post(url,{groupname:"lasty"})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                }
            })
    };



    $scope.delBylogid=function(){
        var url = "/deletelog";
        url = url2Callback(url);
        $http.post(url,{logid:$scope.inLogid})
            .success(function(resp){
                if(resp.err){
                    $scope.errmention = resp.err;
                }
                else{
                    console.log(resp);
                    $scope.showallusertimneline();
                }
            })
    };


    $scope.delByuserid=function(){
        var url = "/deletelog";
        url = url2Callback(url);
        $http.post(url,{userid:$scope.inUsername})
            .success(function(resp){
                if(resp.err){
                    $scope.errmention = resp.err;
                }
                else{
                    console.log(resp);
                    $scope.showallusertimneline();
                }
            })
    }

    });