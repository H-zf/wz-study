<template>
  <div class="company-score">
    <div class="title">
      企业规模分
    </div>
    <div class="content">
      <el-form-item :prop="prop">
        <el-input
          v-model="companyScore"
          @input="handleInput"
          placeholder="请输入 0 ~ 1 之间的规模分"
        ></el-input>
      </el-form-item>
    </div>
  </div>
</template>
<script>
export default {
  props: {
    value: {
      type: String,
      default: ''
    },
    prop: {
      type: String,
      default: ''
    }
  },
  data() {
    return {}
  },
  computed: {
    companyScore: {
      get() {
        return this.value
      },
      set(value) {
        this.$emit('input', value)
      }
    }
  },
  methods: {
    handleInput(inputStr) {
      let num = '' + inputStr
      num = num
        .replace(/[^\d.]/g, '') // 清除“数字”和“.”以外的字符
        .replace(/\.{2,}/g, '.') // 只保留第一个. 清除多余的
        .replace('.', '$#$') // 把字符"."替换成'$#$',把'.'转换成一个比较特殊的字符防止被下一个正则替换给替换掉，因为replace对于字符串只匹配一次,所以只会替换第一个'.'
        .replace(/\./g, '') // 把其余的字符'.'替换为空字符串(删除)
        .replace('$#$', '.') // 把字符'$#$'替换回原来的'.'
        .replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3') // 只能输入两个小数。^字符串开始;第一组匹配,匹配1个'-';重复匹配`-`0-n个,但不进入分组 (\d+)第二组匹配,匹配1-n个数字; \.随后匹配一个'.'; (\d\d)第三组匹配,一个两位的数字; .*$后面匹配任意字符0-n个,直到字符串结束. 替换的目标是:'(第一组匹配)(第二组匹配).(第三组匹配)' */

      if (num.indexOf('.') < 0 && num !== '') {
        // 如果没有小数点，首位不能为类似于00、 01、02的数字
        num = parseFloat(num)
      }
      if (num >= 1) {
        // 当数字大于1时，改为1
        num = 1
      }
      this.companyScore = num + ''
    }
  }
}
</script>
<style lang="scss" scoped>
.company-score {
  .title {
    width: 80px;
    color: #409eff;
    line-height: 24px;
    border-bottom: 1px solid #409eff;
  }
  .content {
    padding-top: 12px;
    .el-form-item__content {
      .el-input {
        width: 120px;
      }
    }
  }
}
</style>

// let num = '' + inputStr
  num = num
    .replace(/^[0]/, '')
    .replace(/[^\d.]/g, '')
    .replace(/\.{2,}/g, '.')
    .replace(/^(1|2|3|4)\./, '$1') // 只能输入大于5的数字 小于的话就不让输入小数点
    .replace('.', '$#$')
    .replace(/\./g, '')
    .replace('$#$', '.')
    .replace(/^(\-)*(\d+)\.(\d\d\d).*$/, '$1$2.$3')

  if (num.indexOf('.') < 0 && num !== '') {
    num = parseFloat(num)
  }
  if (num >= 99) {
    num = 99
  }
