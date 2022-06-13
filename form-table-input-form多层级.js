<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-06-11 16:09:48
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-06-13 16:32:32
 * @FilePath: \qzd-web-service\src\views\innovationFundMgr\marketingConfiguration\DetailMarketingConfiguration.vue
 * @Description: 这是默认设置,请设置`customMade`, 打开koroFileHeader查看配置 进行设置: https://github.com/OBKoro1/koro1FileHeader/wiki/%E9%85%8D%E7%BD%AE
-->
<template>
  <div class="marketing-config-detail">
    <el-form ref="marketingForm" :model="formData" :rules="marketingRules">
      <div class="back-title" @click="handleBackList">
        <i class="el-icon-back"></i> 返回列表
      </div>
      <div class="base-info">
        <div class="title">
          <el-form-item
            label="基础信息"
            class="weight_style"
            label-width="120px"
          >
          </el-form-item>
        </div>
        <div class="content">
          <el-form-item
            label="营销活动名称"
            label-width="120px"
            prop="baseInfo.marketingName"
          >
            <el-input
              v-model="formData.baseInfo.marketingName"
              placeholder="请输入营销活动名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="活动时间"
            label-width="120px"
            prop="baseInfo.marketingTime"
          >
            <el-date-picker
              clearable
              v-model="formData.baseInfo.marketingTime"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
            <el-checkbox v-model="formData.baseInfo.timeChecked"
              >不限</el-checkbox
            >
          </el-form-item>
          <el-form-item
            label="活动分公司"
            label-width="120px"
            prop="baseInfo.company"
          >
            <el-select
              v-model="formData.baseInfo.company"
              filterable
              multiple
              collapse-tags
              placeholder="请输入活动分公司"
            >
              <el-option
                v-for="item in companyList"
                :key="item.value"
                :label="item.label"
                :value="item.value"
              >
              </el-option>
            </el-select>
          </el-form-item>
          <el-form-item
            label="总库存"
            label-width="120px"
            prop="baseInfo.totalInventory"
          >
            <el-input
              v-model="formData.baseInfo.totalInventory"
              placeholder="请输入总库存"
              maxlength="5"
              @input="handleInventoryInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="优惠形式" label-width="120px">
            <el-checkbox-group v-model="formData.baseInfo.discountMethod">
              <el-checkbox :label="0" disabled>创新金</el-checkbox>
              <el-checkbox :label="1" disabled>优惠券</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="可否叠加优惠" label-width="120px">
            <el-radio disabled v-model="formData.baseInfo.isDiscount" :label="0"
              >否</el-radio
            >
            <el-radio disabled v-model="formData.baseInfo.isDiscount" :label="1"
              >是</el-radio
            >
          </el-form-item>
        </div>
      </div>
      <div class="goods-service">
        <div class="title">
          <el-form-item
            label="商品范围"
            class="weight_style"
            label-width="120px"
          >
            <div class="goods-btn">
              <el-button type="primary" @click="handleAddGoods">添加</el-button>
              <el-button type="primary">导入</el-button>
              <el-button @click="handleBatchDelete">删除</el-button>
              <el-checkbox v-model="formData.goodsRange.goodsRangeLimit"
                >不限</el-checkbox
              >
            </div>
          </el-form-item>
        </div>
        <div class="content">
          <el-form-item label-width="120px">
            <el-table
              :data="formData.goodsRange.tableList"
              tooltip-effect="dark"
              style="width: 100%"
              header-row-class-name="tableHeader"
              @selection-change="handleGoodsSelectChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column
                prop="id"
                label="服务产品编码"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="text"
                label="服务产品名称"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="address"
                label="SKU编码"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="address"
                label="SKU名称"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="address"
                label="售价名称"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="address"
                label="售价"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column
                prop="address"
                label="标准付款方案"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="{ row }">
                  <span class="delete-btn" @click="handleRowDelete(row)"
                    >删除</span
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </div>
      </div>
      <div class="marketing-rule">
        <div class="title">
          <el-form-item
            label="使用规则"
            class="weight_style "
            required
            label-width="120px"
          >
            <div class="goods-btn">
              <el-button type="primary" @click="handleAddMarketingRule"
                >添加</el-button
              >
              <el-button>删除</el-button>
            </div>
          </el-form-item>
        </div>
        <div class="content">
          <el-form-item label-width="120px">
            <el-table
              :data="formData.goodsRule.tableList"
              tooltip-effect="dark"
              style="width: 100%"
              header-row-class-name="tableHeader"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="marketingMethod" label="营销方式">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'tableList.' + $index + '.marketingMethod'"
                    :rules="formData.goodsRule.marketingMethod"
                  >
                    <el-input
                      v-model="row.marketingMethod"
                      placeholder="请输入营销方式"
                      maxlength="20"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="thresholdCondition" label="门槛条件">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'tableList.' + $index + '.thresholdCondition'"
                    :rules="formData.goodsRule.thresholdCondition"
                  >
                    <el-input
                      v-model="row.thresholdCondition"
                      placeholder="请输入门槛条件"
                      maxlength="20"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="fund" label="抵扣创新金">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'tableList.' + $index + '.fund'"
                    :rules="formData.goodsRule.fund"
                  >
                    <el-input
                      v-model="row.fund"
                      placeholder="请输入抵扣创新金"
                      maxlength="20"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column
                prop="address"
                label="抵扣金额（元）"
                show-overflow-tooltip
              >
              </el-table-column>
              <el-table-column prop="description" label="描述">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'tableList.' + $index + '.description'"
                    :rules="formData.goodsRule.description"
                  >
                    <el-input
                      v-model="row.description"
                      placeholder="请输入抵扣创新金"
                      maxlength="20"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="{ row }">
                  <span class="delete-btn">删除</span>
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
        </div>
      </div>

      <div class="remark">
        <el-form-item label="备注" class="special" label-width="120px">
          <el-input
            type="textarea"
            rows="2"
            v-model="formData.baseInfo.description"
          ></el-input>
        </el-form-item>
      </div>

      <div class="upload">
        <el-form-item label="附件" label-width="120px">
          上传的文件.pdf
        </el-form-item>
      </div>

      <div class="oprate-btn">
        <el-button
          type="primary"
          @click.prevent.native="handleSubmit('marketingForm')"
          >保存</el-button
        >
        <el-button type="primary">提交</el-button>
        <el-button @click.prevent.native="handleCancel">取消</el-button>
      </div>
    </el-form>

    <AddGoods
      v-model="showAddGoods"
      v-if="showAddGoods"
      :defaultChecked="formData.goodsRange.tableList"
      @handleConfirmGoods="handleConfirmGoods"
    />
  </div>
</template>

<script>
import AddGoods from './components/AddGoods.vue'
export default {
  components: {
    AddGoods
  },
  data() {
    return {
      formData: {
        baseInfo: {
          isDiscount: 0,
          goodsChecked: false,
          marketingName: '',
          marketingTime: [],
          company: [],
          totalInventory: null,
          discountMethod: [0],
          timeChecked: false,
          description: ''
        },
        goodsRange: {
          tableList: [],
          goodsRangeLimit: false
        },
        goodsRule: {
          tableList: []
        }
      },

      companyList: [
        {
          value: '选项1',
          label: '黄金糕'
        },
        {
          value: '选项2',
          label: '双皮奶'
        },
        {
          value: '选项3',
          label: '蚵仔煎'
        },
        {
          value: '选项4',
          label: '龙须面'
        },
        {
          value: '选项5',
          label: '北京烤鸭'
        }
      ],
      showAddGoods: false,

      addGoodsList: [], // 这份数据是添加里面进行回显的
      goodsSelectList: [], // 商品范围选中的集合

      marketingRules: {
        baseInfo: {
          marketingName: [
            { required: true, message: '请输入活动名称', trigger: 'blur' }
          ],
          marketingTime: [
            {
              required: true,
              message: '请选择活动时间',
              trigger: ['blur', 'change']
            }
          ],
          totalInventory: [
            { required: true, message: '请输入总库存', trigger: 'blur' }
          ],
          company: [
            { required: true, message: '请输入活动分公司', trigger: 'change' }
          ]
        },
        goodsRule: {
          marketingMethod: [
            { required: true, message: '请输入营销方式', trigger: 'blur' }
          ],
          thresholdCondition: [
            { required: true, message: '请输入门槛条件', trigger: 'blur' }
          ],
          fund: [
            { required: true, message: '请输入抵扣创新金', trigger: 'blur' }
          ],
          description: [
            { required: true, message: '请输入描述', trigger: 'blur' }
          ]
        }
      }
    }
  },
  methods: {
    handleAddGoods() {
      this.showAddGoods = true
    },
    handleAddMarketingRule() {
      this.formData.goodsRule.tableList.push({
        marketingMethod: '',
        thresholdCondition: '',
        fund: '',
        description: ''
      })
    },
    handleSubmit(formName) {
      this.$refs[formName].validate(valid => {
        if (valid) {
          console.log('valid成功')
        } else {
          return false
        }
      })
    },
    handleInventoryInput(value) {
      if (value) {
        this.formData.baseInfo.totalInventory = value
          .replace(/[^0-9]/g, '')
          .replace(/^[0]+[0-9]*$/gi, '')
      } else {
        this.formData.baseInfo.totalInventory = null
      }
    },
    handleGoodsSelectChange(list) {
      this.goodsSelectList = list
    },
    handleRowDelete(row) {
      // 删除某一行
      this.formData.goodsRange.tableList = this.formData.goodsRange.tableList.filter(
        item => item.id !== row.id
      )
    },
    handleBatchDelete() {
      this.formData.goodsRange.tableList = this.formData.goodsRange.tableList.filter(
        item => !this.goodsSelectList.map(key => key.id).includes(item.id)
      )
      // this.goodsSelectList 这份数据需要在this.goodsRange.tableList数据中删除
    },
    handleConfirmGoods(goodsList) {
      this.addGoodsList = goodsList
      this.formData.goodsRange.tableList = goodsList
      console.log('this.addGoodsList', this.addGoodsList)
    },
    handleCancel() {
      this.handleBackList()
    },
    handleBackList() {
      this.$router.push({
        name: 'marketingConfiguration'
      })
    }
  }
}
</script>

<style lang="scss" scoped>
.marketing-config-detail {
  padding: 20px;
  .base-info {
    .content {
      padding-left: 50px;
    }
  }
  .back-title {
    width: 108px;
    text-align: right;
    font-weight: 600;
    cursor: pointer;
    i {
      width: 18px;
      height: 18px;
      background: #000;
      border-radius: 50%;
      color: #fff;
    }
  }
  /deep/ .el-form-item {
    margin-bottom: 12px;
    .el-form-item__content {
      color: #ccc;
      line-height: 36px;
      .el-input {
        width: 350px;
        .el-input__inner {
          height: 28px;
          line-height: 28px;
        }
      }
      .el-input__inner.el-range-editor {
        height: 28px;
        padding: 0 10px;
      }
    }
    .el-table {
      .el-table__header tr,
      .el-table__header th {
        padding: 0;
        height: 32px;
      }
      .el-table__body tr,
      .el-table__body td {
        padding: 0;
        height: 32px;
      }
      .el-table__body-wrapper {
        position: relative;
        max-height: 160px;
        overflow-y: auto;
        overflow-x: hidden;
      }
      .tableHeader {
        th {
          background-color: #ccc;
        }
      }
    }
    &.weight_style {
      margin-bottom: 4px;
      .el-form-item__label {
        font-weight: 600;
        color: #000;
      }
    }

    &.special {
      .el-form-item__label {
        line-height: inherit;
      }
      textarea {
        resize: none;
      }
    }
  }
  .marketing-rule {
    .el-form-item__content {
      .el-input {
        width: 150px;
      }
    }
  }
  .oprate-btn {
    position: sticky;
    bottom: 0;
    left: 0;
    z-index: 10;
    width: 100%;
    padding-left: 80px;
    background-color: #fff;
    line-height: 54px;
  }
  .goods-btn {
    .el-button {
      padding: 4px 14px;
    }
  }
  /deep/ .el-checkbox {
    margin-left: 10px;
    .el-checkbox__label {
      padding-left: 6px;
    }
  }
  /deep/ .el-tag--small {
    height: 20px;
    line-height: 18px;
  }
  /deep/ .el-form-item__error {
    padding-top: 0;
  }
  .delete-btn {
    color: #409eff;
    cursor: pointer;
  }
}
</style>
