<template>
  <div id="resume">
    <div class="row_layout">
      <div class="resume Tahoma">
        <!-- 主题内容 -->
        <div class="inner_resume">

          <!-- 头信息 -->
          <div class="row top">
            <table>
              <tr>
                <td class="cell border_box left"> {{resume.name}} </td>
                <td class="cell border_box right">求职意向：{{resume.job}}</td>
              </tr>
            </table>
          </div>
          
          <!-- 联系方式 -->
          <div class="row contact">
            <table>
              <tr>
                <td class="cell border_box left">电话：{{resume.contact.phone}}</td>
                <td class="cell border_box center">邮箱：{{resume.contact.email}}</td>
                <td class="cell border_box right">微信：{{resume.contact.wechat}}</td>
              </tr>
            </table>
          </div>

          <div v-for="item in resume.category" :key="item.id">

            <!-- 表头 -->
            <div class="row h1">
              <table>
                <tr>
                  <td class="cell border_box title"> {{item.name}} </td>
                  <td class="cell border_box"></td>
                </tr>
              </table>
            </div>

            <div v-for="it in item.content" :key="it.id">

              <!-- 列表 -->
              <div class="row h2" v-if="it.header">
                <table>
                  <tr>
                    <td class="cell border_box left"> {{it.header.name}}
                      <span v-if="it.header.time">（{{it.header.time}}）</span>
                      <a v-if="it.header.url" target="_blank" :href="it.header.url" >预览链接</a>
                      <a v-if="it.header.codeUrl" target="_blank" :href="it.header.codeUrl">代码链接</a>
                    </td>
                    <td class="cell border_box right"> {{it.header.job}} </td>
                  </tr>
                </table>
              </div>
              
              <div class="row list" v-for="i in it.lists" :key="i.id">
                <table>
                  <tr>
                    <!-- <td class="cell border_box left"></td> -->
                    <td class="cell border_box center"> • </td>
                    <td class="cell border_box right" v-html="urlToLink(i)"></td>
                  </tr>
                </table>
              </div>

            </div>

          </div>
          
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      resume: {
        name: '何敏娜',
        job: '前端开发',
        contact: {   // 联系方式
          phone: '17621604220',
          email: 'venomhmn@qq.com',
          wechat: 'heminnaaaa'
        },
        category: [ // 分类
          {
            name: '个人信息',
            content: [
              {
                lists: [
                  '湖南工学院 | 本科 | 安全工程',
                  '技术博客：https://nolaaaaa.github.io',
                  'Github：https://github.com/Nolaaaaa',
                  '期望薪资：15k~20k',
                  '工作年限：3年'
                ]
              }
            ],
          },
          {
            name: '工作经验',
            content: [
              {
                header: {
                  time: '2018.8 ~ 2020.4',
                  name: '杭州因睿生物工程有限公司',
                  job: '前端开发',
                },
                lists: [
                  '开发项目：微信小程序、公众号h5（uni-app）、管理后台开发（vue-element-admin）、web开发',
                  '负责内容：前端框架的选型、基础技术框架搭建、环境部署、项目开发、项目发布，和前端团队一起高效完成业务模块开发，关注用户体验/性能/代码优化。参与项目前期讨论，常提出修改意见，让项目开发更加合理化，提高整个团队的交付效率和质量',
                  '离职原因：公司团队氛围不错，但个人希望能到更大的平台发展',
                ]
              },
              {
                header: {
                  time: '2017.7 ~ 2018.8',
                  name: '上海昌硕科技有限公司',
                  job: 'QA工程师',
                },
                lists: [
                  '负责内容：Line Qual阶段与客户对接、收集和审核相关资料、追踪处理Issue。组织ISO9001、ISO14001管理体系的相关内部稽核、参与公司的年度内审及第三方认证陪审及后续追踪解决问题等',
                  '离职原因：工作内容与志趣不符'
                ]
              }
            ],
          },
          {
            name: '专业技能',
            content: [
              {
                lists: [
                  '前端技能：HTML 5 / CSS 3 / ECMAScript（JavaScript）/ DOM ',
                  '框架：微信小程序 / 支付宝小程序 / 多端框架uni-app / Vue',
                  '其他：HTTP / 命令行 / Git / 熟悉linux系统 / Photoshop / Python（用 Scrapy 写过爬虫）'
                ]
              }
            ],
          },
          {
            name: '项目经验',
            content: [
              {
                header: {
                  name: '多个微信小程序',
                },
                lists: [
                  '技术栈：微信小程序 / vant UI / less',
                  '实现：微信授权登录注册、商品购物车、支付、日记及评论、订单等主要功能',
                  '实现了日记列表预更新，优化了用户体验',
                  '将基础常用的模块组件化，整体提高了团队开发效率',
                  '通过优化代码，小程序调试器 Audits 面板 Failed Audits 数量减少50%，性能指标评定为优秀',
                ]
              },
              {
                header: {
                  name: '多个公众号h5',
                },
                lists: [
                  '技术栈：uni-app / vue / less',
                  '实现：微信h5授权、微信SDK分享、扫一扫、支付、订单、活动等主要功能',
                  '为微信SDk分享和扫一扫在安卓/ios上表现不一致的问题提供解决方案',
                  '为微信公众号网页授权登录多域名提供解决方案',
                  'html2canvas + canvas 实现网页内容转图片'
                ]
              },
              {
                header: {
                  name: '公司管理后台',
                },
                lists: [
                  '技术栈：vue-element-admin / vue / elementUI / axios / store / vuex',
                  '实现：系统管理、渠道管理、用户管理、权益管理、活动管理、内容管理等模块',
                  '使用 addRoutes，根据不同用户权限生成的可访问路由表，动态渲染左侧菜单栏',
                ]
              },
              {
                header: {
                  name: '日常Demo',
                  url: 'https://github.com/Nolaaaaa/demo/blob/master/README.md',
                  codeUrl: 'https://github.com/Nolaaaaa/demo'
                }
              }
            ],
          },
          {
            name: '自我描述',
            content: [
              {
                lists: [
                  '良好的沟通协调能力和团队合作能力，工作主动，认真细致',
                  '较强的学习能力，能在较短的时间内掌握新知识'
                ]
              }
            ],
          },
        ]
      }
    };
  },
  methods: {
    urlToLink(str){
      var re = /(http:\/\/|https:\/\/)((\w|=|\?|\.|\/|&|-)+)/g
      str = str.replace(re, function(website){ 
        return `<a href='${website}' target='_blank' style='color: blue; text-decoration:none;'>${website}</a>`
      })
      return str
    }
  }
};
</script>

<style  lang="less" scoped>
@color-main: #6aa84f;
@font-big: 22pt;
@font-h1: 12pt;
@font-h2: 10.5pt;
@font-main: 10pt;
@font-min: 8pt;
#resume {
  .resume {
    width: 210.0mm;
    font-size: @font-main; line-height: 1.5; 
    .inner_resume {
      margin: 15.0mm 20.0mm 15.0mm 20.0mm;
      .row {
         padding-top: 0; padding-bottom: 0;
         a { margin-left: 1mm; font-size: @font-min; color: blue; text-decoration:none;}
           
        // 顶部
        &.top {
          display: flex; justify-content: space-between; font-weight: bold; border-bottom: 0.75pt solid #000000; margin-bottom: 1mm;
          .left { text-align: left; font-size: @font-big; vertical-align: bottom; color: @color-main; }
          .right { text-align: right; vertical-align: bottom; }
        }
        // 联系方式
        &.contact {
          display: flex; justify-content: space-between; font-weight: bold; font-size: @font-main; margin-top: 1mm;
          .left { text-align: left; } 
          .center { text-align: center; } 
          .right { text-align: right; }
        }
        // 一级标题
         &.h1 {
           margin: 5mm 0 2mm;font-size: @font-h1;
           .border_box {
              text-align: left; vertical-align: middle; border-bottom: 0.75pt solid #000000;
              color: #ffffff; font-weight: bold; 
              &.title { padding: 1.0mm 1.0mm 1.0mm 1.0mm; background-color: #000000; width: 17.2897%; }
           }
         }
        // 二级标题
         &.h2 {
          font-size: @font-h2; color: black;
           margin: 2mm 0.0mm 1mm 1.0mm;
           .left { 
            text-align: left; color: @color-main; font-weight: bold; 
            span { text-align: left; font-size: @font-main; color: #000000; font-weight: normal;}
           }
           .right { width: auto; text-align: right; font-weight: bold; }
         }
        // 主体内容
         &.list {
           font-size: @font-main; color: black;
           margin: 0.5mm 1.0mm 0.5mm 0.0mm;
           .left { width: 18.0%; text-align: center; }
           .center { width: 3.8%; text-align: center; vertical-align: top; color: @color-main;  font-weight: bold; }
           .right { width: auto; text-align: left; }
         }

      }

    }
  }





  background: #f5f8f9; min-height: 100vh;
  * {  margin: 0;  padding: 0;}
  pre,textarea {  white-space: pre-wrap;  white-space: -moz-pre-wrap;  white-space: -pre-wrap;  white-space: -o-pre-wrap;  word-wrap: break-word;}
  .border_box {  box-sizing: border-box;  -ms-box-sizing: border-box;  -moz-box-sizing: border-box;  -webkit-box-sizing: border-box;}
  .row_layout .resume {  
    background: #fff;  overflow: hidden;  margin: 0 auto;  
    .photo_table {    border-collapse: separate;    border-spacing: 0;    table-layout: fixed;    width: 100%;  }  
    .photo_table td {    text-align: left;    vertical-align: top;  }  
    .photo_table td img {    border: 0;    display: block;  }  
    .section, .row {    position: relative;  }  
    .row table {    border-collapse: separate;    border-spacing: 0;    table-layout: fixed;    width: 100%;  } 
  }
  .SimSun {  font-family: SimSun, 宋体, 华文宋体;}
  .SimHei {  font-family: SimHei, 黑体, Hei, 华文细黑, 华文黑体;}
  .SimKai {  font-family: SimKai, 楷体, 楷体_GB2312, Kai, 华文楷体;}
  .SimFang {  font-family: SimFang, 仿宋, 仿宋_GB2312, 华文仿宋;}
  .Arial {  font-family: Arial;}
  .Times {  font-family: Times New Roman;}
  .Tahoma {  font-family: Tahoma;}
  .Verdana {  font-family: Verdana;}
  @-moz-document url-prefix() {  
    .row_layout .resume .row table {    table-layout: auto;  }  
    .row_layout .resume .row table td {    max-width: 0;  }
  }
}
</style>
