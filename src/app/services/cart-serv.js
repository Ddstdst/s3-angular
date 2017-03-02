/**
 * Created by chent on 2017/1/18.
 *
 *  CartService
 *  处理购物车的逻辑
 *  getCartList  : 获取购物车列表
 *  addProduct :  加入产品到购物车
 *  editProduct : 修改购物车产品数量
 *  deleteProduct: 从购物车删除产品
 *  submitCart : 提交购物车为订单
 *
 */
angular.module("myApp").service("CartService",['$es',function($es){
        this.getCartList = function(){
            var cartList = [];
            var i,order;
            for(i = 0;i<10;i++){

                order = {};
                order.id = i;
                order.isCheck=false;
                order.num = 5;
                order.name = "订单名称"+i;
                order.price = 1;
                order.limtNum=7;
                cartList.push(order);
            }
            return cartList;
        };
    }])
    /*.service("OrderDetailService",['$es',function($es){

        this.getOrderDetail = function(orderId){
            //get orderDetail
            var orderDetail = {
                orderId:orderId,
                orderTo:"王大二",
                orderTel:'1590000001256',
                orderAddDefault:"杭州市下城区新市街153号",
                orderAdd:"浙江宁波",
                price: Number(Math.random()*10).toFixed(2),
                orderType:"自购零食",
                orderPayType:"265dtex/48f",
                length:"100m"
            };
            return orderDetail;
        }

    }]);*/
