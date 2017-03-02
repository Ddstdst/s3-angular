/**
 * Created by chent on 2017/1/18.
 */
angular.module("myApp").controller("ProductCtrl",["$scope","$rootScope","ProductService","UserInfoService",function ($scope,$rootScope,ProductService,UserInfoService) {

    var page = 1,key = null;

    $scope.refreshPage = function () {
        var page = 1;
        $scope.products = loadProducts($scope.currentCompany.companyId,page,key);
    };

    $scope.loadMore = function () {
        page = page+1;
        var products = loadProducts($scope.currentCompany.companyId,page,key);
        if(products.length>0)
            for(var i=0,len=products.length; i<len; i++){
                $scope.products.push(products[i]);
            }
    };

    $scope.getAll = function(){
        page = 1;
        key=null;
        $scope.products = loadProducts($scope.currentCompany.companyId,page,key);
    };

    $scope.showCompanyList = function(){
        Modal.action('open');
    };

    $scope.changeCompany = function(company){
        page = 1;
        key = null;
        $scope.currentCompany = company;
        $scope.products = loadProducts(company.companyId,page,key);
        Modal.action('close');
        var myScroll = $scope.myScroll;
        myScroll.scrollTo(0,0);
        myScroll.refresh();
        myScroll.maxScrollY = 0;
    };


    //初始化
    initPage();

    function loadProducts(companyId,page,key) {
        return ProductService.getProductList(companyId,page,key);
    }

    function initPage(){
        var companyList = UserInfoService.getCompanyList();
        $scope.companyList = companyList;
        var company = companyList[0];
        $scope.currentCompany = company;
        $scope.products = loadProducts(company.companyId,page);
    }

}]);

myApp.controller("ProductDetailCtrl",["$scope","$rootScope",'$stateParams','ProductService',function ($scope,$rootScope,$stateParams,ProductService) {
    //取得传过来的参数
    var productId = $stateParams.productId;
    $scope.product = ProductService.getProductDetail(productId);
}]);