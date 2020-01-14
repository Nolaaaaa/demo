<template>
  <div id="draw-card">
    <h2>明日方舟模拟抽卡</h2>

    <el-button type="success" plain @click="oneDraw">单抽</el-button>
    <el-button type="success" @click="tenDraw">十连抽</el-button>
    <el-button type="info" plain @click="clear">清空</el-button>

    <div class="result" v-if="result.length > 0">
      <h3>抽卡结果（{{result.length}} 抽）：</h3>
      <div class="list">
        <span 
          v-for="item in result" :key="item.id"
          :class="item.star"
          >
          {{item.name}}、
        </span>
      </div>
      
      <h3>3星：{{starNum.three}}</h3> 
      <h3>4星：{{starNum.four}}</h3>
      <h3>5星：{{starNum.five}}</h3>
      <h3>6星：{{starNum.six}}</h3>
    </div>





    <div class="rule">
      <h3>特别须知：</h3>
      <p>在所有【标准寻访】中，如果连续50次没有获得6星干员，则下一次获得6星干员的概率将从原本的2%提升至4%。如果该次还没有寻访到6星干员，则下一次寻访获得6星干员的概率由4%提升到6%。依此类推，每次提高2%获得6星干员的概率，直至达到100%时必定获得6星干员。
在任何一个【标准寻访】中，没有获得6星干员时，都会累积次数，该次数不会因为【标准寻访】的结束而清零。因为累积次数而增加的获得概率，也会应用于接下来任意一次【标准寻访】。
</p>
      <h3>注意</h3>
      <p>任何时候在任意一个【标准寻访】中获得6星干员，后续在【标准寻访】中获得6星干员的概率将恢复到2%。
</p>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return { 
      result: [],  // 抽取结果
      times: 0,  // 抽取次数
      starNum: {  // 各个星星数量
        'three': 0,
        'four': 0,
        'five': 0,
        'six': 0,
      },
      odds: {  // 概率
        'three': 42,
        'four': 48,
        'five': 8,
        'six': 2,
      },
      agents: { // 干员
        // 'one': ['Lancet-2', 'Castle-3'],
        // 'two': ['夜刀', '杜林', '巡林者', '黑角', '12F'],
        'three': ['芬', '克洛丝', '炎熔', '米格鲁', '芙蓉', '卡缇', '史都华德', '香草', '玫兰莎', '安赛尔', '梓兰', '翎羽', '安德切尔', '空爆', '月见夜', '斑点', '泡普卡'],
        'four':  ['深海色', '杜宾', '梅', '白雪', '远山', '流星', '夜烟', '末药', '蛇屠箱', '艾丝黛尔', '猎蜂', '嘉维尔', '慕斯', '砾', '暗索', '调香师', '地灵', '讯使', '清道夫', '霜叶', '角峰', '古米', '断罪者', '缠丸', '阿消', '红豆', '杰西卡', '格雷伊', '苏苏洛', '桃金娘', '坚雷', '红云', '伊桑', '安比尔'],
        'five':  ['德克萨斯', '凛冬', '芙兰卡', '幽灵鲨', '白面鸮', '普罗旺斯', '蓝毒', '阿米娅', '赫默', '临光', '红', '雷蛇', '夜魔', '天火', '因陀罗', '初雪', '拉普兰德', '华法琳', '守林人', '真理', '狮蝎', '火神', '白金', '陨星', '梅尔', '可颂', '崖心', '食铁兽', '空', '暴行', '格拉尼', '诗怀雅', '格劳克斯', '锡兰', '星极', '炎客', '送葬人', '微风', '拜松', '槐琥', '苇草', '布洛卡', '灰喉', '雪雉', '吽'],
        'six': ['推进之王', '能天使', '星熊', '闪灵', '伊芙利特', '塞雷娅', '银灰', '夜莺', '艾雅法拉', '陈', '凯尔希', '安洁莉娜', '斯卡蒂', '黑', '赫拉格', '麦哲伦', '莫斯提马', '煌', '阿'],
      }
    }
  },
  methods: {
    oneDraw() {
      let star = this.randomStar()
      let curAgent = this.agents[star]

      this.result.push({
        star,
        name: curAgent[this.randomNum(0, curAgent.length-1)]
      })

      this.starNum[star] += 1
      this.times += 1

      // 抽取次数达到50次，提高6星获取概率
      if(this.times >= 50) {
        this.odds.six += 2
        this.times = 0
      }
      
      // 获得6星恢复概率
      if(star == 'six') {
        this.odds.six = 2
        this.times = 0
      }
    },

    tenDraw() {
      for(let i=0; i<10; i++) {
        this.oneDraw()
      }

    },
    
    clear() {
      this.result = []
      this.times = 0
      this.starNum = { 
        'three': 0,
        'four': 0,
        'five': 0,
        'six': 0,
      }
    },

    randomStar() {
      let odds = this.odds
      let num = this.randomNum(1, eval(Object.values(odds).join("+")))

      if(num <= odds.six) {
        return 'six'
      }

      if(num <= odds.six + odds.five) {
        return 'five'
      }

      if(num <= odds.six + odds.five + odds.four) {
        return 'four'
      }
 
      if(num <= odds.six + odds.five + odds.four + odds.three) {
        return 'three'
      }
    },

    randomNum(min, max) {
      return Math.floor(Math.random() * (max - min + 1)) + min
    }
  }
}
</script>

<style  lang="less" scoped>
#draw-card {
  box-sizing: border-box;
  min-height: calc(100vh - 16px);
  width: calc(100vw - 16px);
  margin: 0 auto;
  padding: 20px;

  h2 {
    margin: 10px 0 30px;
  }

  .rule, .result {
    box-sizing: border-box;
    margin-top: 40px;
    font-size: 8px;
    word-wrap: break-word;
    word-break:break-all;
    line-height: 20px;
    text-align: left;
  }

  .rule {
    color: #878f87;
  }

  .result {
    .list {
      margin-bottom: 20px;
    }
    .six, .five, .four {
      font-weight: bold;
    }
    .six {
      color: #f56c6c;
    }
    .five {
      color: #e6a23c;
    }
    .four {
      color: #863ce6;
    }
    .three {
      color: black;
    }
  }
}
</style>
