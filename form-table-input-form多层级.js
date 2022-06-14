<!--
 * @Author: error: git config user.name && git config user.email & please set dead value or install git
 * @Date: 2022-06-11 16:09:48
 * @LastEditors: error: git config user.name && git config user.email & please set dead value or install git
 * @LastEditTime: 2022-06-14 08:58:27
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
            prop="mmsUsedRuleConfigParams.activityName"
          >
            <el-input
              v-model="formData.mmsUsedRuleConfigParams.activityName"
              placeholder="请输入营销活动名称"
            ></el-input>
          </el-form-item>
          <el-form-item
            label="活动时间"
            label-width="120px"
            prop="mmsUsedRuleConfigParams.marketingTime"
          >
            <el-date-picker
              clearable
              v-model="formData.mmsUsedRuleConfigParams.marketingTime"
              type="daterange"
              format="yyyy-MM-dd"
              value-format="yyyy-MM-dd"
              range-separator="至"
              start-placeholder="开始日期"
              end-placeholder="结束日期"
            >
            </el-date-picker>
            <el-checkbox v-model="formData.mmsUsedRuleConfigParams.timeChecked"
              >不限</el-checkbox
            >
          </el-form-item>
          <el-form-item
            label="活动分公司"
            label-width="120px"
            prop="mmsUsedRuleConfigParams.company"
          >
            <el-select
              v-model="formData.mmsUsedRuleConfigParams.company"
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
            prop="mmsUsedRuleConfigParams.totalInventory"
          >
            <el-input
              v-model="formData.mmsUsedRuleConfigParams.totalInventory"
              placeholder="请输入总库存"
              maxlength="5"
              @input="handleInventoryInput"
            ></el-input>
          </el-form-item>
          <el-form-item label="优惠形式" label-width="120px">
            <el-checkbox-group
              v-model="formData.mmsUsedRuleConfigParams.discountMethod"
            >
              <el-checkbox :label="0" disabled>创新金</el-checkbox>
              <el-checkbox :label="1" disabled>优惠券</el-checkbox>
            </el-checkbox-group>
          </el-form-item>
          <el-form-item label="可否叠加优惠" label-width="120px">
            <el-radio
              disabled
              v-model="formData.mmsUsedRuleConfigParams.superpositionType"
              :label="0"
              >否</el-radio
            >
            <el-radio
              disabled
              v-model="formData.mmsUsedRuleConfigParams.superpositionType"
              :label="1"
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
              <el-button type="primary" @click="handleImportFile"
                >导入</el-button
              >
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
            label="营销规则"
            class="weight_style"
            label-width="120px"
            required
          >
            <div class="goods-btn">
              <el-button type="primary" @click="handleAddMarketingRule"
                >添加</el-button
              >
              <el-button @click="handleDeleteMarketingRule">删除</el-button>
            </div>
          </el-form-item>
        </div>
        <div class="content">
          <el-form-item label-width="120px" class="marketing_rule_item">
            <el-table
              :data="formData.goodsRule.tableList"
              tooltip-effect="dark"
              style="width: 100%"
              header-row-class-name="tableHeader"
              @selection-change="handleMarketingSelectChange"
            >
              <el-table-column type="selection" width="55"> </el-table-column>
              <el-table-column prop="marketingMethod" label="营销方式">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'goodsRule.tableList.' + $index + '.marketingMethod'"
                    :rules="marketingRules.goodsRule.marketingMethod"
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
                    :prop="
                      'goodsRule.tableList.' + $index + '.thresholdCondition'
                    "
                    :rules="marketingRules.goodsRule.thresholdCondition"
                  >
                    <el-input
                      v-model="row.thresholdCondition"
                      placeholder="请输入门槛条件"
                      maxlength="8"
                      @input="handleThresholdConditionInput(row)"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column prop="fund" label="抵扣创新金">
                <template slot-scope="{ row, $index }">
                  <el-form-item
                    :prop="'goodsRule.tableList.' + $index + '.fund'"
                    :rules="marketingRules.goodsRule.fund"
                  >
                    <el-input
                      v-model="row.fund"
                      placeholder="请输入抵扣创新金"
                      maxlength="8"
                      @input="handleFundInput(row)"
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
                    :prop="'goodsRule.tableList.' + $index + '.description'"
                    :rules="marketingRules.goodsRule.description"
                  >
                    <el-input
                      v-model="row.description"
                      placeholder="请输入描述"
                      maxlength="100"
                    ></el-input>
                  </el-form-item>
                </template>
              </el-table-column>
              <el-table-column label="操作" align="center">
                <template slot-scope="{ row }">
                  <span class="delete-btn" @click="handleRuleDelete(row)"
                    >删除</span
                  >
                </template>
              </el-table-column>
            </el-table>
          </el-form-item>
          <el-form-item label-width="120px" prop="goodsRuleS"></el-form-item>
        </div>
      </div>

      <div class="remark">
        <el-form-item label="备注" class="special" label-width="120px">
          <el-input
            type="textarea"
            rows="2"
            v-model="formData.mmsUsedRuleConfigParams.description"
          ></el-input>
        </el-form-item>
      </div>

      <div class="upload">
        <el-form-item label="附件" label-width="120px">
          <div class="goods-btn">
            <el-upload
              class="upload-demo"
              action="/api/qzd-bff-operation/qzd/v1/common/uploadFiles"
              multiple
              :limit="9"
              accept=".JPG,.JPEG,.PNG,.pdf,.xls,.xlsx,.doc,.docx,.ppt,.pptx"
              :on-success="handleSuccess"
              :on-preview="handlePreview"
            >
              <el-button size="small" type="primary">上传附件</el-button>
            </el-upload>
          </div>
        </el-form-item>
      </div>

      <div class="oprate-btn">
        <el-button type="primary" @click.prevent.native="handleSave"
          >保存</el-button
        >
        <el-button
          type="primary"
          @click.prevent.native="handleSubmit('marketingForm')"
          >提交</el-button
        >
        <el-button @click.prevent.native="handleCancel">取消</el-button>
      </div>
    </el-form>

    <!-- 导入弹窗 -->
    <el-dialog
      width="600px"
      title="导入数据"
      :visible.sync="dlgImportVs"
      :close-on-press-escape="false"
      :close-on-click-modal="false"
      @closed="dlgImportClose"
    >
      <BatchImport
        ref="batchImport"
        :download-url="importTplUrl"
        :errorReportTitle="`下载错误报告${localeDate}`"
        @cancel="dlgImportCancel"
        :use-blob="false"
        :import-method="importExcel"
        :tplname="importTplname"
        fileFormat="xlsx"
        :importTotal="1000"
        :needGetUploadData="true"
        @successUploadMethod="successUploadMethod"
      />
    </el-dialog>

    <AddGoods
      v-model="showAddGoods"
      v-if="showAddGoods"
      :defaultChecked="formData.goodsRange.tableList"
      @handleConfirmGoods="handleConfirmGoods"
    />
  </div>
</template>

<script>
import BatchImport from '@/components/import/import-file'
import { importExcel } from '@/api/common.js'
import AddGoods from './components/AddGoods.vue'
export default {
  components: {
    AddGoods,
    BatchImport
  },
  data() {
    return {
      formData: {
        mmsUsedRuleConfigParams: {
          superpositionType: 0,
          goodsChecked: false,
          activityName: '',
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
      marketingRuleSelectList: [], // 营销规则选中集合

      marketingRules: {
        mmsUsedRuleConfigParams: {
          activityName: [
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
            { required: true, message: '请输入营销方式', trigger: 'change' }
          ],
          thresholdCondition: [
            { required: true, message: '请输入门槛条件', trigger: 'change' }
          ],
          fund: [
            { required: true, message: '请输入抵扣创新金', trigger: 'change' }
          ],
          description: [
            { required: true, message: '请输入描述', trigger: 'change' }
          ]
        },
        goodsRuleS: [
          {
            required: true,
            validator: this.validateGoods
          }
        ]
      },

      // 导入模块
      dlgImportVs: false,
      importTplUrl: '',
      localeDate: '',
      importTplname: '《商品范围导入模板》',

      // 上传附件
      fileList: []
    }
  },
  methods: {
    successUploadMethod(key) {
      // 通过key来获取数据来回显
      this.dlgImportVs = false
      console.log('key', key)
    },
    importExcel(file) {
      return importExcel({ file, importType: 'CMS_QUESTION' })
    },
    dlgImportCancel() {
      this.dlgImportVs = false
    },
    dlgImportClose() {
      this.$refs['batchImport'].reset()
    },
    handleImportFile() {
      this.dlgImportVs = true
      this.localeDate = new Date()
        .toLocaleDateString()
        .split('/')
        .join('')
    },
    validateGoods(rule, value, callback) {
      let goodsRuleList = this.formData.goodsRule.tableList
      if (!goodsRuleList.length) {
        return callback(new Error('请选择营销规则'))
      } else {
        callback()
      }
    },
    handleAddGoods() {
      this.showAddGoods = true
    },
    handleAddMarketingRule() {
      if (this.formData.goodsRule.tableList.length >= 10) return
      this.formData.goodsRule.tableList.push({
        id: new Date().getTime(),
        marketingMethod: '',
        thresholdCondition: null,
        fund: null,
        description: ''
      })
    },
    handleSave() {
      console.log('fileList', this.fileList)
    },
    handleSuccess(response, file, fileList) {
      console.log('response', response)
      const { data } = response
      this.fileList.push(data[0])
    },
    handlePreview(file) {
      console.log('file===', file)
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
        this.formData.mmsUsedRuleConfigParams.totalInventory = value
          .replace(/[^0-9]/g, '')
          .replace(/^[0]+[0-9]*$/gi, '')
      } else {
        this.formData.mmsUsedRuleConfigParams.totalInventory = null
      }
    },
    handleFundInput(row) {
      if (row.fund) {
        row.fund = row.fund.replace(/[^0-9]/g, '').replace(/^[0]+[0-9]*$/gi, '')
      } else {
        row.fund = null
      }
    },
    handleThresholdConditionInput(row) {
      if (row.thresholdCondition) {
        row.thresholdCondition = row.thresholdCondition
          .replace(/[^0-9]/g, '')
          .replace(/^[0]+[0-9]*$/gi, '')
      } else {
        row.thresholdCondition = null
      }
    },
    handleGoodsSelectChange(list) {
      this.goodsSelectList = list
    },
    handleDeleteMarketingRule() {
      // formData.goodsRule.tableList 中删除 marketingRuleSelectList
      this.formData.goodsRule.tableList = this.formData.goodsRule.tableList.filter(
        item =>
          !this.marketingRuleSelectList.map(key => key.id).includes(item.id)
      )
    },
    handleMarketingSelectChange(list) {
      this.marketingRuleSelectList = list
    },
    handleRuleDelete(row) {
      this.formData.goodsRule.tableList = this.formData.goodsRule.tableList.filter(
        item => item.id !== row.id
      )
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
    &.marketing_rule_item {
      margin-bottom: 6px;
    }
  }
  .marketing-rule {
    /deep/ .el-table .el-table__body td {
      padding: 6px 0;
    }
    .el-form-item__content {
      line-height: 28px;
      .el-input {
        width: 100%;
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
  /deep/ .el-upload-list {
    width: 300px;
    .el-upload-list__item-name {
      color: #409eff;
    }
  }
  .remark {
    margin-top: 16px;
  }
  .delete-btn {
    color: #409eff;
    cursor: pointer;
  }
}
</style>
