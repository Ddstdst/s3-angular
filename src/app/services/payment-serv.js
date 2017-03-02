/**
 * Created by chent on 2017/1/18
 *
 *  PaymentService
 *  处理付款单的数据接口
 *  getPaymentStatusArray: 获取付款单状态列表
 * .getPaymentList : 获取付款单列表(分页)
 *  getPaymentDetail : 获取付款单详情
 *
 *
 *
 */
angular.module("myApp").service("PaymentService",["$es",function($es){

    this.getPaymentStatusArray = function(){
        return [
            {id:null,name:'全  部'},
            {id:0, name:'未付款'},
            {id:1,name:'已付款'}
        ];
    };



    this.getPaymentList = function(status,page,time){
        var paymentList = [];
        var i,payment;
        switch(status.id){
            case 0:
                for(i = 0;i<3;i++){
                    payment = {};
                    payment.id = "DD2017000000"+time+page+i;
                    payment.name = "订单名称";
                    payment.status = 0;
                    payment.time1 = "2017年"+time;
                    payment.time2 = "2017年"+time;
                    payment.money1="22222"+time;
                    payment.statusText = ['未付款','已付款'];
                    paymentList.push(payment);
                }
                break;
            case 1:
                for(i = 0;i<10;i++){
                    payment = {};
                    payment.id = "DD2017111111"+time+page+i;
                    payment.name = "订单名称";
                    payment.status =1;
                    payment.time1 = "2017年"+time;
                    payment.time2 = "2017年"+time;
                    payment.money1="22222"+time;
                    payment.statusText = ['未付款','已付款'];
                    paymentList.push(payment);
                }
                break;
            default:
                for(i = 0;i<10;i++){
                    payment = {};
                    payment.id = "DD2017xxxxxxx"+time+page+i+Math.floor(Math.random()*3);
                    payment.name = "订单名称";
                    payment.time1 = "2017年"+time;
                    payment.time2 = "2017年"+time;
                    payment.money1="22222"+time;
                    payment.status = Number(Math.random()*1).toFixed();
                    payment.statusText = ['未付款','已付款'];
                    paymentList.push(payment);
                }
                break;
        }
        return {
            retCode:'200',
            retMsg:'msg',
            paymentList:paymentList
        }
    };




    this.getPaymentDetail = function(paymentId){
        //get PaymentDetail
        var paymentDetail = {
            paymentId:paymentId,
            customerName:"10010分公司",
            customerCompany:"浙江工银聚有限公司",
            paymentMethod:"易付",
            paymentMoney:"222220",
            Prepaid:"40",
            discountCoupon:"120",
            outofpocket:"222140",
            customerNum:"10010",
            creationTime:"2017-01-17  15:20:25",
            orderTime:"2017-01-17  16:20:25"
        };

        return paymentDetail;
    }

}]);