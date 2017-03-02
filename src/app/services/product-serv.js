/**
 * Created by chent on 2017/1/18
 *
 *  ProductService
 *  处理产品相关的数据接口
 * .getProductList : 获取产品列表(分页)
 *  getProductDetail : 获取产品详情
 *
 *
 *
 */

angular.module("myApp").service("ProductService",function(){

    var limit = 8;

    this.getProductList = function(companyId,page,key){

        //TESTSTART
        var productList = [];
        var i,product;
        for(i = 0;i<10;i++){
            product = {
                productId:companyId+"001"+i,
                productName:companyId +"最近订单产品名称"+i,
                price: Number(Math.random()*10).toFixed(2)
            };
            productList.push(product);
        }
        return productList;
        //TESTEND

        //page
        page = page || 1;
        var start = (page-1)*limit;

        //param
        var param = {
            start:start,
            limit:limit,
            companyId:companyId,
            categoryId:categoryId,
            productId : key,
            productName:key
        };

        //get data
        var result = $es.java("productInfoBean.getProductInfo",param,$es.appId);
        return result.dataList;
    };


    this.getProductDetail = function(productId){

        //TESTSTART
        //get product
        return {
            productId:productId,
            productName:"一个虚拟的产品",
            price: Number(Math.random()*10).toFixed(2),
            type:"优等品",
            length:"100m"
        };
        //TESTSEND


        //TODO : 后台没有这个方法
        var param = {productId:productId};
        return $es.java("productInfoBean.getProductDetail",param,$es.appId);
    }

});