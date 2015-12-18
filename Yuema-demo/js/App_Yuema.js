
var app = angular.module('YuemaApp', []);
app.controller('YuemaAppCtrl', function ($scope,$http) {

    function url2Callback(url){
        var host= "http://ym.zzspider.com/api";
        return host + url;
    }

//---------------------------------------  AUTH  ----------------------------------------//
    //�� ��½���̡��ύ�˺����룬postģʽ���token���洢�ڱ���
    $scope.getToken2Store = function(){
        var url = "/auth";
        url = url2Callback(url);
        $http.post(url,{username:'o6_bmjrPTlm6_2sgVt7hMZOPfL2M',password:'048d319f88899fea2fa8b38d9c80c7b9cbe7f65a'})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                    $scope.showAuthErr();
                }else{
                    localStorage.setItem('token',res.access_token); //�洢token�����ش洢
                    console.log(res.access_token);
                    $scope.getUserInfo(); //��ȡ�û���Ϣ���ҳ��
                }
            })
    };


//---------------------------------------  GROUP  ABOUT ----------------------------------------//
    //����token��ͷ����Ϊ��֤ƾ֤��getģʽ����ȡ��token��Ӧ��user��group�����Ϣ�����ҳ��
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
                    fillGroupInfo2Page(res);
                }
            })
    };


    //����token��ͷ����Ϊ��֤ƾ֤��postģʽ�������飬��ȡ��token��Ӧ��user��group�����Ϣ�����ҳ��
    $scope.setGroupInfo=function(){
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


    //����token��ͷ����Ϊ��֤ƾ֤��putģʽ���޸�����Ϣ����ȡ��token��Ӧ��user��group�����Ϣ�����ҳ��
    $scope.editGroup=function(){
        var token = localStorage.getItem('token');
        var groupid = localStorage.getItem('groupid');
        var url = "/group";
        url = url2Callback(url) + groupid;
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
    //����token��ͷ����Ϊ��֤ƾ֤��getģʽ����ȡ��token��Ӧ��user�������Ϣ�����ҳ��
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
                    //$scope.getGroupInfo();//�����û�Ⱥ����Ϣ�����ҳ��
                    $scope.fillUserInfo2Page(res);//����û���Ϣ��ҳ����
                }
            })
    };

    //����token��ͷ����Ϊ��֤ƾ֤��putģʽ���޸��û���Ϣ����ȡ��token��Ӧ��user�������Ϣ�����ҳ��
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


    $scope.fillUserInfo2Page=function(res){
        $scope.myopenid=res.openid;
    };





    });

