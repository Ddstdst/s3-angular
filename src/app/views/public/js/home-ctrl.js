
myApp.controller("HomeCtrl",['$scope','$state','$es','PublicService',function ($scope,$state,$es,PublicService) {

    $scope.myOrdermoney = PublicService.getOrdermoney();
    $scope.myOrderDay = PublicService.getOrderDay();
    $scope.myOrderMonth = PublicService.getOrderMonth();


    $scope.otherModules = [
        {
            name:"特色模块1",
            url:'http://m.baidu.com'
        },
        {
            name:"特色模块2",
            url:'http://m.baidu.com'
        }
    ]
}]);