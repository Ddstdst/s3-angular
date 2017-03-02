/**
 *
 * DeliveryService
 *  提货单与后台数据接口
 *  getDeliveryStatusArray : 获取提货单状态
 *  getDeliveryList : 获取提货单列表
 *  getDeliveryDetail :  获取提货单详情
 */


angular.module("myApp").service("DeliveryService",["$es",function($es){

    this.getDeliveryStatusArray = function(){
        return [
            {id:null,name:'全  部'},
            {id:0, name:'未确认'},
            {id:1,name:'已确认'},
        ];
    };
    this.getDeliveryList = function(status,page,time){
        var deliveryList = [];
        var i,delivery;
        switch(status.id){
            case 0:
                for(i = 0;i<3;i++){
                    delivery = {};
                    delivery.id = "DD2017000000"+time+page+i;
                    delivery.name = "订单名称";
                    delivery.status = 0;
                    delivery.time = "2017年"+time;
                    delivery.statusText = ['未确认','已确认'];
                    deliveryList.push(delivery);
                }
                break;
            case 1:
                for(i = 0;i<10;i++){
                    delivery = {};
                    delivery.id = "DD2017111111"+time+page+i;
                    delivery.name = "订单名称";
                    delivery.status = 1;
                    delivery.time = "2017年"+time;
                    delivery.statusText = ['未确认','已确认'];
                    deliveryList.push(delivery);
                }
                break;
            default:
                for(i = 0;i<10;i++){
                    delivery = {};
                    delivery.id = "DD2017xxxxxxx"+time+page+i+Math.floor(Math.random()*3);
                    delivery.name = "订单名称";
                    delivery.time = "2017年"+time;
                    delivery.status = Number(Math.random()*1).toFixed();
                    delivery.statusText = ['未确认','已确认'];
                    deliveryList.push(delivery);
                }
                break;
        }
        return {
            retCode:'200',
            retMsg:'msg',
            deliveryList:deliveryList
        }
    };

    this.getDeliveryDetail = function(deliveryId){
        //get deliveryDetail
        var deliveryDetail = {
            deliveryId:deliveryId,
            deliveryTo:"张三",
            carNum:"浙A12345",
            telPhone:"18314676709",
            time:"2017-01-17  15:20:25",
            remark:"货物要准时送到"
        };

        return deliveryDetail;
    }

}]);