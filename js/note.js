var ag=angular.module('ag',['ngAnimate']);
ag.controller('mainCtrl',['$scope','$timeout',function($scope,$timeout){
    setInterval(function(){
        $timeout(function () {
            var date=new Date();
            var h=date.getHours();
            var m=date.getMinutes();
            var s=date.getSeconds();
            h=(h<10)?('0'+h):h;
            m=(m<10)?('0'+m):m;
            s=(s<10)?('0'+s):s;
            $scope.title=h+':'+m+':'+s;
        },0);
    },500);

    if(localStorage.__x){
        $scope.something=JSON.parse(localStorage.__x);
    }else {
        $scope.something=[];
    }
    $scope.count=$scope.something.length;
    $scope.save=function () {
        localStorage.__x=JSON.stringify($scope.something);
    }
//增加
    $scope.name='';
    $scope.add=function (e) {
        if(e.keyCode===13){
            if($scope.something.length==0){
                var id=1000;
            }else{
                var max=-Infinity;
                for(var i=0;i<$scope.something.length;i++){
                    var value=$scope.something[i];
                    if(value.id>max){
                        max=value.id;
                    }
                }
                var id=max+1;
            }
            $scope.something.push({id:id,name:$scope.name,isDone:false});
            $scope.name='';
            $scope.count=$scope.something.length;
        }
    }

    //删除
    $scope.delete=function(id){
        var index;
        for(var i=0; i<$scope.something.length;i++){
            if($scope.something[i].id=id){
                index=i;
            }
        }
        $scope.something.splice(index,1);
        $scope.count=$scope.something.length;
    }
    //聚焦
    $scope.focus=function (e) {
        $timeout(function () {
            $(e.currentTarget).find('input').trigger('focus');
        },0);
    }
        $scope.clear=function(){
            var arr=[];
            for(var i=0;i<$scope.something.length;i++){
                if(!$scope.something[i].isDone){
                    arr.push($scope.something[i]);
                }
            }
            $scope.something=arr;
            $scope.count=$scope.something.length;
        }

}
]
)