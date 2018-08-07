<!-- 头部导航栏 -->
<template>
    <footer>
        <div class="footer-left fl">
            <ul class="footer_list_one">
                <li>关于</li>
                <li>平台简介</li>
                <li>用户协议</li>
            </ul>
            <ul class="footer_list_two">
                <li>帮助</li>
                <li>帮助中心</li>
                <li>知识共享说明</li>
            </ul>
            <ul class="footer_list_three">
                <li>投诉指引</li>
                <li>版权保护投诉指引</li>
                <li>侵权投诉反通知指引</li>
            </ul>
            <ul class="footer_list_four">
                <li>联系我们</li>
                <li>邮箱:manykit@许多米.com</li>
                <li>QQ群:398680146</li>
            </ul>
        </div>
        <div class="footer-right fr">
            <div class="fl">
                <div class="footer-logo fr">
                    <img src="./../assets/img/twod/f_logo.png" alt="">
                </div>
                <div class="copyright clear">
                    <span>Copyright © 2016 - 2018 许多米.All Rights Reserved  许多米公司 版权所有</span>
                </div>
            </div>
            <div class="code fr"><img src="./../assets/img/twod/code.png" alt=""></div>
        </div>
    </footer>
</template>
<script>
export default {}
</script>
<style lang="less" scoped>
    footer {
        height: 124px;
        // padding: 0 140px;
        width: 1200px;
        clear: both;
        // position: absolute;
        // bottom: 0;
        margin: 0 auto;
        .footer-left{
            ul{
                width: 120px;
                margin-top: 20px;
                float: left;
                li{
                    font-size: 14px;
                    color: #BDBDBD;
                    line-height: 32px;
                    // margin-right: 60px;
                    text-align: left;
                }
            }
            .footer_list_one{
                width: 120px;
            }
            .footer_list_two{
                width: 120px;
            }
            .footer_list_three{
                width: 150px;
            }
            .footer_list_four{
                width: 200px;
            }
        }
        .footer-right{
            font-size: 12px;
            color:#BEBDBD;
            margin-top: 35px;
            .footer-logo{
                width: 128px;
                height: 40px;
                background-color:burlywood;
            }
            .copyright{
                line-height: 40px;
                clear: both;
            }
            .code{
                width: 70px;
                height: 70px;
                background-color:burlywood;
                margin-left: 5px;
            }
        }
    }
</style>

