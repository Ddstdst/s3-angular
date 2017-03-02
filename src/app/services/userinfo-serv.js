/**
 * Created by chent on 2017/3/2.
 *
 *   用户信息的service 用来执行用户信息的读写
 *
 *   属性包括：
 *
 *   getUserInfo:获取用户信息
 *   getCompanyList:获取用户所属分公司
 *   getUserAddress:获取用户地址
 *   updateUserAddress:更新用户地址信息
 *   deleteUserAddress:删除用户地址信息
 *   addUserAddress:删除用户地址信息
 *   ...待补充
 *
 */
angular.module('myApp').service('UserInfoService',['$es',function($es){


    this.getUserInfo = function(){

            //TESTSTART
            return {
                retCode:'200',
                retMsg:'success',
                companyName:'浙江工银聚有限公司',
                role:'经销商',
                companyNum:'007',
                accountNum:'zjhgtest1',
                accountName:'zjhgtest1',
                name:'浙江化工测试',
                phone:'1585858558'
            };
        //TESTEND

    };



    this.getCompanyList = function(){

        //TESTSTART
        //get product
        return [
            {companyId:"1",companyName:'某某公司'},
            {
                companyId:"2",companyName:'一个名king字特别特别特别特别长的分公司'
            }
        ];
        //TESTSEND


        var param = {};
        var branches = $es.java("companyInfoBean.getBranchCompanyInfo",param,$es.appId,6000);
        return branches.branchCompany;
    };

    //TODO 暂时不用
    this.setCurrentCompany = function(companyId){
        istore.set('currentCompany',companyId);
    };


    this.getUserAddress = function(){

        //TESTSTART
        return {
            retCode:'200',
            retMsg:'success',
            myAddressList:[
                {
                    name:"董彬",
                    phone:"1382323232",
                    address:"成都市下城区西湖文化广场西区萨克雷999号楼8层",
                    state:true
                },
                {
                    name:"范佩瑶",
                    phone:"1566363636",
                    address:"杭州市下城区西湖文化广场西区萨克雷",
                    state:false
                },
                {
                    name:"王萌",
                    phone:"1999999999",
                    address:"杭州市下城区西湖文化广场",
                    state:false
                }
            ]
        };
        //TESTEND


    };


    this.updateUserAddress = function(address){



    };


    this.deleteUserAddress = function(addressId){



    };


    this.addUserAddress = function(address){



    };

}]);

