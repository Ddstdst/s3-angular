/**
 *
 * PublicService
 *  用来获取公共信息
 *  以及后续用来读配置
 *
 */

angular.module("myApp").service("PublicService",['$es',function($es){

        var myappManage = $es.getConfig('custid');

        /**
         * 获取首页订单金额
         * @returns {*}
         */
        this.getOrdermoney = function () {
            //TESTSTART
            return {
                retCode:'200',
                retMsg:'success',
                myOrdermoney:'1500000.00'
            };
            //TESTEND
            var param = {};
            return $es.java('myappOrdermoneyBean.getOrdermoney',param,myappManage,1000);
        };

        /**
         * 获取首页今日成交
         * @returns {*}
         */
        this.getOrderDay = function () {
            //TESTSTART
            return {
                retCode:'200',
                retMsg:'success',
                moneyDay:'23445.00',
                num:'128'
            };
            //TESTEND
            var param = {};
            return $es.java('myappOrderdayBean.getOrderDay',param,myappManage,1000);
        };

        /**
         * 获取首页本月成交
         * @returns {*}
         */
        this.getOrderMonth = function () {
            //TESTSTART
            return {
                retCode:'200',
                retMsg:'success',
                moneyMonth:'234490.00',
                num:'843'
            };
            //TESTEND
            var param = {};
            return $es.java('myappOrdermonth.getOrderMonth',param,myappManage,1000);
        };

    }]);