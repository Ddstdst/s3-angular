angular.module("myApp").controller("DeliveryListCtrl",["$scope","$rootScope","DeliveryService",function ($scope,$rootScope,DeliveryService) {
    var page,time,status;

    $scope.changeStatus = function(newStatus){
        page = 0;
        time = 0;
        status = newStatus;
        $scope.deliverys = loadDeliverys(status,page,time);
    };

    $scope.changeTime = function(newTime){
        page = 0;
        time = newTime;
        $scope.deliverys= loadDeliverys(status,page,newTime);
    };

    $scope.refreshPage = function () {
        $scope.deliverys = loadDeliverys(status,page,time);
    };

    $scope.loadMore = function () {
        page = page+1;
        var deliverys = loadDeliverys(status,page,time);
        if(deliverys.length>0)
            for(var i=0,len=deliverys.length; i<len; i++){
                $scope.deliverys.push(deliverys[i]);
            }
    };

    function loadDeliverys(status,page,time) {
        return DeliveryService.getDeliveryList(status,page,time);
    }

    function initPage(){
        page =0;time=0;
        var deliveryStatusArray = DeliveryService.getDeliveryStatusArray();
        $scope.deliveryStatusArray = deliveryStatusArray;
        status = deliveryStatusArray[0];
        $scope.deliverys = loadDeliverys(status,page,time);
    }

    //初始化
    initPage();
}]);