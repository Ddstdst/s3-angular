/**
 * Created by chent on 2017/1/18.
 */
angular.module("myApp").controller("cartCtrl",["$scope","CartService",function ($scope,CartService) {
    var scHei = document.documentElement.offsetHeight||document.body.offsetHeight;
    $(".cart-main").css("height",scHei-90);

    //选框
    $scope.productNum=0;
    $scope.deleteProduct=function ($index) {
        $scope.cartProducts.splice($index,1)
    };
    var allCheckTig=true;
    $scope.allCheck=function () {
        if(allCheckTig){
            $scope.totalPrice=0;
            angular.forEach($scope.cartProducts, function(data){
                data.isCheck=true;
                $scope.totalPrice+=data.price*data.num
            });
            allCheckTig=false;
        }else{
            $scope.totalPrice=0;
            angular.forEach($scope.cartProducts, function(data){
                data.isCheck=false;
            });
            allCheckTig=true;
        }

    };
    var checktig=true;
    $scope.changeCheck=function ($event,$index) {
        calculatePrice()
        if($scope.cartProducts[$index].isCheck){
            $scope.productNum+=1;
        }else{
            $scope.productNum-=1;
        }
    }
    $scope.reduceCartPro=function ($index) {
        if($scope.cartProducts[$index].num==1){
            $scope.cartProducts[$index].num=1
        }else{
            $scope.cartProducts[$index].num--;
            if($scope.cartProducts[$index].isCheck){
                calculatePrice()
            }

        }
    };
    $scope.addCartPro=function($index){
        if($scope.cartProducts[$index].num==$scope.cartProducts[$index].limtNum){
            $scope.cartProducts[$index].num=$scope.cartProducts[$index].limtNum
        }else{
            $scope.cartProducts[$index].num++;
            if($scope.cartProducts[$index].isCheck){
                calculatePrice()
            }

        }
    };
    function calculatePrice() {
        $scope.totalPrice=0
        angular.forEach($scope.cartProducts, function(data){
            if(data.isCheck){
                $scope.totalPrice+=data.price*data.num
            }
        });
    }
    function loadCartProducts() {
        return CartService.getCartList();
    }
    function initPage(){
        $scope.cartProducts = loadCartProducts();
    }
    //初始化
    initPage()
    calculatePrice()

}]);
myApp.controller("addOrderCtrl",["$scope",'$stateParams',function ($scope,$stateParams) {
    /*//取得传过来的参数
     var productId = $stateParams.productId;
     // console.log();
     $scope.product = ProductService.getProductDetail(productId);*/
    var scHei = document.documentElement.offsetHeight||document.body.offsetHeight;
    $(".addO").css("height",scHei-95)
}]);
myApp.controller("orderConfirmCtrl",["$scope",'$stateParams',function ($scope,$stateParams) {
    var scHei = document.documentElement.offsetHeight||document.body.offsetHeight;
    $(".orderconfirm").css("height",scHei-55-parseFloat($(".orderconfirm-bottom").css("height")))
}]);
/*
myApp.controller("orderCatCtrl",["$scope","$rootScope",'$stateParams','ProductService',function ($scope,$rootScope,$stateParams,ProductService) {
    //取得传过来的参数
    var productId = $stateParams.productId;
    // console.log();
    $scope.product = ProductService.getProductDetail(productId);
}]);*/
