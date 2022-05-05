<template>
    <el-dialog
        title="添加热搜词"
        :visible.sync="dialogVisible"
        :close-on-click-modal="false"
        width="600"
        :before-close="handleClose">
        <el-form
            :inline="true"
            :model="form"
            class="search-wrap"
            >
            <el-form-item label="热搜词" prop="hotWords">
                <el-input
                    size="small"
                    placeholder="请输入热搜词"
                    v-model="form.hotWords"
                    @keyup.enter.native="handleAddHotWords"
                ></el-input>
            </el-form-item>
            <el-table :data="form.hotWordsList" row-key="hotWords" border style="width: 100%">
                <el-table-column type="index" label="序号" align="center" width="80">
                </el-table-column>
                <el-table-column prop="hotWords" label="热搜词" align="center">
                </el-table-column>
                <el-table-column
                    prop="status"
                    label="操作"
                    align="center"
                >
                    <template slot-scope="scope">
                    <el-button type="text"
                        >置顶</el-button
                    >
                    <el-button
                        type="text"
                        >上移</el-button
                    >
                    <el-button
                        type="text"
                        >下移</el-button
                    >
                    <el-button type="text"
                        >置底</el-button
                    >
                    </template>
                </el-table-column>
            </el-table>
            <el-form-item label="选择配置界面" prop="configure">
                <el-select
                    v-model="form.configure "
                    placeholder="请选择配置界面"
                    >
                    <el-option
                        label="全部"
                        value=""
                    >
                    </el-option>
                </el-select>
            </el-form-item>
        </el-form>
        <span slot="footer" class="dialog-footer">
            <el-button @click="dialogVisible = false">取 消</el-button>
            <el-button type="primary">确 定</el-button>
        </span>
    </el-dialog>
</template>

<script>
import Sortable from 'sortablejs';
export default {
    props:{
        value:{
            type: Boolean,
            default: false
        }
    },
    name: 'content-keyword',
    data() {
        return {
            form: {
                hotWords: null,
                hotWordsList: [],
                configure: null
            }
        }
    },
    created(){
    },
    computed: {
        dialogVisible:{
            get() {
                return this.value
            },
            set(value) {
                this.$emit('input', value)
            }
        },
    },
    methods:{
        handleAddHotWords(e) {
            if(!e.target.value || this.form.hotWordsList.length > 8)return;
            this.form.hotWordsList.push({
                hotWords: e.target.value
            })
            this.$nextTick(() => {
                this.rowDrop();
            })
        },
        rowDrop() {
            const tbody = document.querySelector('.el-table__body-wrapper tbody');
            const self = this;
            Sortable.create(tbody, {
                onEnd({ newIndex, oldIndex }) {
                    console.log(newIndex, oldIndex);
                    const currRow = self.form.hotWordsList.splice(oldIndex, 1)[0]
                    console.log('currRow----', currRow);
                    self.form.hotWordsList.splice(newIndex, 0, currRow)
                    console.log('self.form.hotWordsList----', self.form.hotWordsList);
                },
            })
        },
        handleClose() {
            this.dialogVisible = false
        }
    },
    mounted(){
        this.rowDrop()
    }
}
</script>

<style scoped lang="scss">
</style>
