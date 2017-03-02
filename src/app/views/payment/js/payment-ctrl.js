angular.module("myApp").controller("PaymentListCtrl",["$scope","$rootScope","PaymentService",function ($scope,$rootScope,PaymentService) {
    var page,time,status;

        $scope.changeStatus = function(newStatus){
        page = 0;
        time = 0;
        status = newStatus;
           $scope.payments = loadPayments(status,page,time);
        };

    $scope.changeTime = function(newTime){
        page = 0;
        time = newTime;
        $scope.payments= loadPayments(status,page,newTime);
    };

    $scope.refreshPage = function () {
        $scope.payments = loadPayments(status,page,time);
    };

    $scope.loadMore = function () {
        page = page+1;
        var payments = loadPayments(status,page,time);
        if(payments.length>0)
            for(var i=0,len=payments.length; i<len; i++){
                $scope.payments.push(payments[i]);
            }
    };

    //function loadPayments(status,page,time) {
    //    return PaymentService.getPaymentList(status,page,time);
    //}
    function loadPayments(status,page,time) {
        var toast = $.toast.show('loading');
        var result = PaymentService.getPaymentList(status,page,time);
        if(toast)
            setTimeout(function(){
                toast.close();
            },0);
        if(result.retCode == "200"){return result.paymentList;
        }else
            return [];
    }
    function initPage(){
        page =0;time=0;
        var paymentStatusArray = PaymentService.getPaymentStatusArray();
        $scope.paymentStatusArray = paymentStatusArray;
        status = paymentStatusArray[0];
        $scope.payments = loadPayments(status,page,time);
    }
    //初始化
    initPage();
}])
.controller("PaymentDetailCtrl",["$scope","$rootScope",'$stateParams','PaymentService',function ($scope,$rootScope,$stateParams,PaymentService) {
    //取得传过来的参数
    var paymentId = $stateParams.paymentId;
    $scope.payment = PaymentService.getPaymentDetail(paymentId);
}]);
