var YuemaAppCtrls = angular.module('YuemaAppCtrls',['ngAnimate','cgBusy']);

YuemaAppCtrls.controller('BtnCtrl', function ($scope,$http) {

    $scope.weekShow = function(param,index){
        $scope.TimeSelChg1='';
        $scope.TimeSelChg2='';
        $scope.TimeSelChg3='';
        $scope.TimeSelChg4='';
        $scope.selectWeek=param;
        $scope.isCurrent(index);
    };

    $scope.dateShow = function(param,index){
        $scope.TimeSelChg1='';
        $scope.TimeSelChg2='';
        $scope.TimeSelChg3='';
        $scope.TimeSelChg4='';
        $scope.selectDate=param;
        $scope.isCurrent(index);
        var d=new Date();
        var weekday = ["周日","周一","周二","周三","周四","周五","周六"];
        $scope.weekShow(weekday[(d.getDay() + index)%7],index);


        var y = d.getFullYear();
        var wholedate = y +'-'+param;
        var groupid = localStorage.getItem('now_groupid');
        $scope.getTimeline(groupid,wholedate);
    };

    $scope.isCurrent = function(index){
        $scope.bg = [];
        $scope.bg[index] = 'current1';
    };

    function GetDateStr(AddDayCount) {
        var dd = new Date();
        dd.setDate(dd.getDate()+AddDayCount);//获取AddDayCount天后的日期
        var m = dd.getMonth()+1;//获取当前月份的日期
        var d = dd.getDate();
        if(m<10){
            m="0"+m;
        }
        if(d<10){
            d="0"+d;
        }
        return m+"-"+d;
    }


    $scope.getWeek = function(){
      var d=new Date();
        var today = GetDateStr(0);
        var todayADD1 =GetDateStr(1);
        var todayADD2 =GetDateStr(2);
        var todayADD3 =GetDateStr(3);
        var todayADD4 =GetDateStr(4);
        var todayADD5 =GetDateStr(5);
        var todayADD6 =GetDateStr(6);
        $scope.dates = [today, todayADD1, todayADD2, todayADD3,todayADD4,todayADD5,todayADD6];

        var weekday = ["周日","周一","周二","周三","周四","周五","周六"];
        $scope.weeks = [weekday[d.getDay()],weekday[(d.getDay()+1)%7],weekday[(d.getDay()+2)%7],weekday[(d.getDay()+3)%7],weekday[(d.getDay()+4)%7],weekday[(d.getDay()+5)%7],weekday[(d.getDay()+6)%7]];

        $scope.dateShow(today);
        $scope.weekShow(weekday[d.getDay()]);
        $scope.bg[0] = 'current1';
        $scope.chartFIT2();
    };


    $scope.timelines = {
        "member": [{
            "backup_name": null,
            "enter_time": "2015/12/27 00:07:06",
            "user": {
                "backup_name": "Drew",
                "starttime": "1",
                "endtime": "21",
                "id": 4
            }
        }, {
            "backup_name": null,
            "enter_time": "2015/12/27 00:07:17",
            "user": {
                "backup_name": "Jordan",
                "starttime": "7",
                "endtime": "15",
                "id": 5
            }
        }]
    };

    $scope.TimeSelChg = function(btnTurn){
        $scope.TimeSelChg1='';
        $scope.TimeSelChg2='';
        $scope.TimeSelChg3='';
        $scope.TimeSelChg4='';
        $scope.starttime='';
        $scope.endtime='';
        if(btnTurn ==1){
            $scope.TimeSelChg1= "current";
            $scope.starttime='08:00';
            $scope.endtime='14:00';
        }
        if(btnTurn ==2){
            $scope.TimeSelChg2= "current";
            $scope.starttime='12:00';
            $scope.endtime='18:00';
        }
        if(btnTurn ==3){
            $scope.TimeSelChg3= "current";
            $scope.starttime='20:00';
            $scope.endtime='24:00';
        }
        if(btnTurn ==4){
            $scope.TimeSelChg4= "current";
            $scope.starttime='00:00';
            $scope.endtime='24:00';
        }
    };

    $scope.putTimeUp = function (starttime,endtime,selectDate,selectWeek){
        var timeline = [starttime,endtime];
        var weekline = selectWeek;
        var dateline = selectDate;
        var d = new Date();
        var y = d.getFullYear();
        var wholedate = y +'-'+dateline;
        var date = [wholedate,weekline,timeline];
        date = String(date);
        var groupid = localStorage.getItem('now_groupid');
        $scope.createTimeline(groupid,date,wholedate);
    };



    //------------------------------------ timeline -----------------------------------------//

    //--------------------------group   timeline ---------------------------//
    function url2Callback(url){
        var host= "//192.168.0.100:5000/api";
        return host + url;
    }
    //-----------timeline,date,post
    $scope.createTimeline = function(groupid,date,wholedate){
        var url;
        if(wholedate == null){
            url = '/groups/'+ groupid + '/timelines';
        }else{
            url = '/groups/'+ groupid + '/timelines/'+ wholedate;
        }
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $http.post(url,{timeline:date},
            {headers:{"Authorization":'JWT '+ token}}
        )
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                }
            })
    };
    //-----------timeline,date,get
    $scope.getTimeline = function(groupid,date){
        $scope.starttime='';
        $scope.endtime='';
        var url;
        if(date == null){
            url = '/groups/'+ groupid + '/timelines';
        }else{
            url = '/groups/'+ groupid + '/timelines/'+ date;
        }
        url = url2Callback(url);
        var token = localStorage.getItem('token');
        $scope.myloadstyle2 = 'block';
        $http.get(url,{headers:{"Authorization":'JWT '+ token}})
            .success(function(res){
                if(res.err){
                    console.log(res.err);
                }else{
                    console.log(res);
                    for(var i = 0; i < (res.timelines).length; i++){
                        if(res.timelines[i].user == 5)
                        {
                            var a = String(res.timelines[i].timeline);
                            $scope.starttime=a[14]+a[15]+a[16]+a[17]+a[18];
                            $scope.endtime=a[20]+a[21]+a[22]+a[23]+a[24];
                            $scope.myloadstyle2 = 'none';
                        }
                    }
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

    $scope.delay = 0;
    $scope.minDuration = 0;
    $scope.message = 'Please Wait...';
    $scope.backdrop = true;
    $scope.promise = null;
    $scope.demo = function(){
        var token = localStorage.getItem('token');
        $scope.promise = $http.get('http://192.168.0.100:5000/api/users',{headers:{"Authorization":'JWT '+ token}});
    };


    $scope.chartFIT2=function() {

        var data = {
            labels: ["Janu", "Febru", "Mah", "Aril", "May", "22", "22"],
            datasets: [
                {
                    barItemName: "name1",
                    fillColor: "rgba(220,220,220,0.5)",
                    strokeColor: "rgba(220,220,220,1)",
                    data: [10, 8, 2, 16, 20, 22, 5]
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
        window.onload = function () {
            var ctx = document.getElementById("myChart2").getContext("2d");
            chartBar = new Chart(ctx).Bar(data);

            //initEvent(chartBar, clickCall);
        };
    };


    $scope.load3 = function(){
        $scope.getWeek();
        $scope.demo();
        $scope.chartFIT2();
    };
    $scope.load4 = function(){
        $scope.getWeek();
        $scope.demo();
    };

});
