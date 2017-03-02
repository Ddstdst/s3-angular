/**
 * Created by chent on 2017/2/13.
 *
 *  UserService
 *  用来处理用户登录信息
 *  userLogin : 用户登录入口
 *  changePassword : 用户修改密码接口
 *  getValidateCode : 获取验证码接口
 *  checkValidate : 校验验证码接口
 *   mobileLogin  : 手机登录(后台未实现)
 *
 */


//使用service来创建service对象，确保对象是单例的
angular.module('myApp').service('UserService',['$es',function($es){

    var userManage = $es.getConfig('userservice');

    /**
     * 获取公钥 内部函数 UserService 对象私有
     * @param appid
     * @returns {*}
     */
    var getPublicKey = function(appid){
        var param = {};
        if(appid)
            param.appid = appid;
        else
            param.appid = $es.getConfig('custid');
        return $es.java('userAuthenBean.getPublickKey',param,userManage,1000);
    };

    /**
     *  登录
     * @param loginName  登录名
     * @param password  密码
     * @param code   验证码（暂无处理）
     * @returns {*}
     */
    this.userLogin = function(loginName,password,code){
        //TESTSTART
        $es.userinfo = {userName:'haha'};
        return {
            retCode:'200',
            retMsg:'success',
            isActive:1,
            appid:"s3"
        };
        //TESTEND

        // public key
        var key = getPublicKey();
        if(key.retCode != "200"){
            return key;
        }
        var rsakey = new RSAKey();
        rsakey.setPublic(key.modulus,key.exponent);
        var pwd = rsakey.encrypt(password);
        var param = {};
        param.loginName = loginName;
        param.password = pwd.toString(16);

        //验证码 暂时不用
        if(code)
            param.code = code;
        else
            param.code = '';

        var result = $es.java('userAuthenBean.userLogin',param,userManage,3000);
        if(result || !result.retCode){
            return {
                retCode:'400',
                retMsg:'系统错误，请联系管理员'
            }
        }else if(result.retCode !== "200"){
            return result;
        }else if(result.isActive == '0'){
            return {
                retCode:'400',
                retMsg:'用户未激活，请激活后登录'
            }
        }else{
            return result;
        }
    };

    /**
     * 修改密码
     * @param oldPassword
     * @param newPassword
     * @param repeatPassword
     * @param loginName   非必须
     * @param appid        非必须
     * @returns {*}
     */
    this.changePassword = function(oldPassword,newPassword,repeatPassword,loginName,appid){
        //TESTSTART
        return {
            retCode:'200',
            retMsg:'success'
        };
        //TESTEND


        // public key
        var key = getPublicKey();
        if(key.retCode != "200"){
            return key;
        }
        var rsakey = new RSAKey();
        rsakey.setPublic(key.modulus,key.exponent);
        var oldPwd = rsakey.encrypt(oldPassword);
        var newPwd = rsakey.encrypt(newPassword);
        var repeatPwd = rsakey.encrypt(repeatPassword);

        var param = {
            oldPassword:oldPwd,
            newPassword:newPwd,
            repeatPassword:repeatPwd
        };

        if(loginName)
            param.loginName = loginName;
        if(appid)
            param.appid = appid;
        else
            param.appid = $es.getConfig('custid');

        return $es.java("userAuthenBean.changePassword",param,userManage);
    };


    /**
     * 获取验证码
     * @param phoneNumber
     * @param loginName  非必须
     * @param appid  非必须
     * @returns {*}
     */
    this.getValidateCode = function(phoneNumber,loginName,appid){

        //TESTSTART
        //假装取到了
        return{
            retCode:200,
            retMsg:'success',
            mobile:'135****3456'
        };
        //TESTEND

        var param = {
            mobile:phoneNumber
        };

        //登录名 非必须
        if(loginName)
            param.loginName = loginName;
        if(appid)
            param.appid = appid;
        else
            param.appid = $es.getConfig('custid');

        return $es.ajax('userAuthenBean.getValidateCode',param,userManage);
    };


    /**
     * 校验验证码
     * @param mobile   手机号
     * @param code      验证码
     * @param appid     非必须
     */
    this.checkValidate = function(mobile,code,appid){

        //TESTSTART
        return true;
        //TESTEND

        var param = {
            mobile:mobile
        };

        //登录名 非必须
        if(loginName)
            param.loginName = loginName;
        if(appid)
            param.appid = appid;
        else
            param.appid = $es.getConfig('custid');

        return $es.ajax('userAuthenBean.checkValidateCode',param,userManage);
    };


    /**
     *
     * @param phoneNumber
     * @param code
     * @returns {*}
     */
    //TODO 手机号码登录 未做
    this.mobileLogin = function(phoneNumber,code){

        //TESTSTART
        return{
            retCode:200,
            retMsg:'success'
        };
        //TESTEND

        var param = {
            mobile:phoneNumber,
            code:code
        };
        return $es.ajax('userAuthenBean.mobileLogin',param,userManage);
    };

}]);