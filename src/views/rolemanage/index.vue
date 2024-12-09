<template>
  <div class="app-container">
    <div class="filter-container">
      <el-input
        v-model="listQuery.roleName"
        :placeholder="'角色名'"
        style="width: 200px"
        class="filter-item"
        @keyup.enter.native="handleFilter"
      />
      <el-select
        v-model="listQuery.permission"
        :placeholder="'权限'"
        clearable
        style="width: 120px"
        class="filter-item"
      >
        <el-option
          v-for="item in rolesOptions"
          :key="item.id"
          :label="item.label"
          :value="item.label"
        />
      </el-select>
      <el-select
        v-model="listQuery.status"
        :placeholder="'账号状态'"
        clearable
        class="filter-item"
        style="width: 130px"
      >
        <el-option
          v-for="item in statusTypeOptions"
          :key="item.key"
          :label="item.displayName"
          :value="item.key"
        />
      </el-select>
      <el-select
        v-model="listQuery.sort"
        style="width: 140px"
        class="filter-item"
        @change="handleFilter"
      >
        <el-option
          v-for="item in sortOptions"
          :key="item.key"
          :label="item.label"
          :value="item.key"
        />
      </el-select>
      <el-button
        v-waves
        class="filter-item"
        type="primary"
        icon="el-icon-search"
        @click="handleFilter"
      >
        {{ $t('table.search') }}
      </el-button>
      <el-button
        v-waves
        class="filter-item"
        type="warning"
        icon="el-icon-refresh"
        @click="resetFilters"
      >
        重置
      </el-button>
      <!-- <el-button
        class="filter-item"
        style="margin-left: 10px"
        type="primary"
        icon="el-icon-edit"
        @click="handleCreate"
      >
        {{ $t('table.add') }}
      </el-button> -->
      <el-button
        v-waves
        :loading="downloadLoading"
        class="filter-item"
        type="primary"
        icon="el-icon-download"
        @click="handleDownload"
      >
        {{ $t('table.export') }}
      </el-button>
      <el-checkbox
        v-model="showReviewer"
        class="filter-item"
        style="margin-left: 15px"
        @change="tableKey = tableKey + 1"
      >
        {{ $t('table.reviewer') }}
      </el-checkbox>
    </div>

    <el-table
      :key="tableKey"
      v-loading="listLoading"
      :data="list"
      border
      fit
      highlight-current-row
      style="width: 100%"
      @sort-change="sortChange"
    >
      <el-table-column type="expand">
        <template slot-scope="{row}">
          <div m="4">
            <h2>角色详细简介</h2>
            <el-divider />
            <p m="t-0 b-2" >{{ row.description }}</p>
            <br/>
            <h2>权限详细</h2>
            <el-table :data="row.permissions" :border="true">
              <el-table-column label="序号" prop="id" />
              <el-table-column label="权限信息" prop="permission" />
              <el-table-column label="权限描述" prop="description" />
              <el-table-column label="状态" prop="status">
                <el-tag
                  v-if="row.status === true"
                >
                  活跃
                </el-tag>
                <el-tag
                  v-if="row.status === false"
                  type="danger"
                >
                  失活
                </el-tag>
              </el-table-column>
            </el-table>
          </div>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.id')"
        prop="id"
        sortable="custom"
        align="center"
        width="80"
        :class-name="getSortClass('id')"
      >
        <template slot-scope="{row}">
          <span>{{ row.id }}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'角色名'" width="200" align="center">
        <template slot-scope="{row}">
          <span>{{ row.roleName}}</span>
        </template>
      </el-table-column>
      <el-table-column :label="'角色描述'" min-width="200" align="center">
        <template slot-scope="{row}">
          <span>{{ row.description}}</span>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.status')"
        class-name="status-col"
        width="200"
      >
        <template slot-scope="{row}">
          <el-tag
            v-if="row.status === true"
          >
            活跃
          </el-tag>
          <el-tag
            v-if="row.status === false"
            type="danger"
          >
            失活
          </el-tag>
        </template>
      </el-table-column>
      <el-table-column
        :label="$t('table.actions')"
        align="center"
        width="260"
        class-name="fixed-width"
      >
        <template slot-scope="{row, $index}">
          <el-button type="primary" size="mini" @click="handleUpdate(row)">
            {{ $t('table.edit') }}
          </el-button>
          <el-button
            v-if="row.status === true"
            size="mini"
            type="danger"
            @click="handleDelete(row, $index)"
          >
            冻结
          </el-button>
          <el-button
            v-if="row.status === false"
            size="mini"
            type="success"
            @click="handleEnable(row, $index)"
          >
            恢复
          </el-button>
        </template>
      </el-table-column>
    </el-table>

    <pagination
      v-show="total > 0"
      :total="total"
      :page.sync="listQuery.page"
      :limit.sync="listQuery.limit"
      @pagination="getList"
    />

    <el-dialog
      :title="textMap[dialogStatus]"
      :visible.sync="dialogFormVisible"
      >
      <el-form
        ref="dataForm"
        :rules="rules"
        label-position="left"
        label-width="100px"
        style="width: 400px; margin-left: 50px"
      >
        <el-form-item :label="'角色名'">
            <el-input
              v-model="tempArticleData.roleName"
              class="filter-item"
              placeholder="Please select"
            >
            </el-input>
        </el-form-item>
        <el-form-item :label="$t('table.status')">
            <el-select
              v-model="tempArticleData.status"
              class="filter-item"
              placeholder="Please select"
            >
              <el-option
              :value="true"
              label="活跃"
              />
              <el-option
                :value="false"
                label="非活跃"
              />
            </el-select>
        </el-form-item>
        <el-form-item :label="'权限集合'">
          <el-tree
            :data="rolesOptions"
            node-key="id"
            show-checkbox = true
            ref="tree"
          >
          </el-tree>
        </el-form-item>
        <el-form-item :label="'角色描述'">
            <el-input
              v-model="tempArticleData.description"
              class="filter-item"
              placeholder="Please select"
              type="textarea"
            >
            </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogFormVisible = false">
          {{ $t('table.cancel') }}
        </el-button>
        <el-button
          type="primary"
          @click="dialogStatus === 'create' ? createData() : updateData()"
        >
          {{ $t('table.confirm') }}
        </el-button>
      </div>
    </el-dialog>

    <el-dialog
      :visible.sync="dialogPageviewsVisible"
      title="Reading statistics"
    >
      <el-table
        :data="pageviewsData"
        border
        fit
        highlight-current-row
        style="width: 100%"
      >
        <el-table-column prop="key" label="Channel" />
        <el-table-column prop="pageviews" label="Pageviews" />
      </el-table>
      <span slot="footer" class="dialog-footer">
        <el-button type="primary" @click="dialogPageviewsVisible = false">{{
          $t('table.confirm')
        }}</el-button>
      </span>
    </el-dialog>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator'
import { Form } from 'element-ui'
import { cloneDeep } from 'lodash'
import {
  disableById,
  enableById,
  updateRole,
  getRolesAndPermissionsInfo,
  getPermissionsInfo
} from '@/api/rolemanage'
import { IUserInfo } from '@/api/types'
import { exportJson2Excel } from '@/utils/excel'
import Pagination from '@/components/Pagination/index.vue'
// import { get } from 'js-cookie'

const statusTypeOptions = [
  { key: 'true', displayName: '活跃' },
  { key: 'false', displayName: '冻结' }
]

interface RoleMid {
  id: number
  permission: string
}

interface RoleOption {
  id: number
  label: string
}

interface UserInfo{
  id: number
  name: string
  avatar: string
  introduction: string
  email: string
  status: true
  roleId: number | undefined
  role:{}
}

// arr to obj, such as { CN : "China", US : "USA" }
const statusTypeKeyValue = statusTypeOptions.reduce(
  (acc: { [key: string]: string }, cur) => {
    acc[cur.key] = cur.displayName
    return acc
  },
  {}
) as { [key: string]: string }

  @Component({
    name: 'rolemanage',
    components: {
      Pagination
    },
    filters: {
      typeFilter: (type: string) => {
        return statusTypeKeyValue[type]
      }
    }
  })
export default class extends Vue {
    private tableKey = 0
    private list: IUserInfo[] = []
    private total = 0
    private listLoading = true
    private listQuery = {
      page: 1,
      limit: 20,
      roleName: undefined,
      status: undefined,
      permission: undefined,
      sort: '+id'
    }

    private rolesOptions: RoleOption[] = []
    private statusTypeOptions = statusTypeOptions
    private sortOptions = [
      { label: 'ID Ascending', key: '+id' },
      { label: 'ID Descending', key: '-id' }
    ]

    private defaultUserInfo: UserInfo = {
      id: 0,
      name: '',
      avatar: '',
      introduction: '',
      email: '',
      status: true,
      roleId: undefined,
      roles: {}
    }

    private showReviewer = false
    private dialogFormVisible = false
    private dialogStatus = ''
    private textMap = {
      update: 'Edit',
      create: 'Create'
    }

    private dialogPageviewsVisible = false
    private pageviewsData = []
    private rules = {
      type: [
        { required: true, message: 'type is required', trigger: 'change' }
      ],
      timestamp: [
        { required: true, message: 'timestamp is required', trigger: 'change' }
      ],
      title: [{ required: true, message: 'title is required', trigger: 'blur' }]
    }

    private downloadLoading = false
    private tempArticleData: UserInfo = this.defaultUserInfo

    created() {
      this.getList()
    }

    private async getList() {
      this.listLoading = true
      const { data } = await getRolesAndPermissionsInfo(this.listQuery)
      const response = await getPermissionsInfo()
      this.list = data.items
      this.total = data.total
      this.rolesOptions = (response.data as RoleMid[]).map((element: RoleMid) => ({
        id: element.id,
        label: element.permission
      }))

      // Just to simulate the time of the request
      setTimeout(() => {
        this.listLoading = false
      }, 0.5 * 1000)
    }

    private handleFilter() {
      this.listQuery.page = 1
      this.getList()
    }

    private sortChange(data: any) {
      const { prop, order } = data
      if (prop === 'id') {
        this.sortByID(order)
      }
    }

    private sortByID(order: string) {
      if (order === 'ascending') {
        this.listQuery.sort = '+id'
      } else {
        this.listQuery.sort = '-id'
      }
      this.handleFilter()
    }

    private getSortClass(key: string) {
      const sort = this.listQuery.sort
      return sort === `+${key}` ? 'ascending' : 'descending'
    }

    private resetTempArticleData() {
      this.tempArticleData = cloneDeep(this.defaultUserInfo)
    }

    private handleCreate() {
      this.resetTempArticleData()
      this.dialogStatus = 'create'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        (this.$refs.dataForm as Form).clearValidate()
      })
    }

    // private createData() {
    //   (this.$refs.dataForm as Form).validate(async valid => {
    //     if (valid) {
    //       const articleData = this.tempArticleData
    //       articleData.id = Math.round(Math.random() * 100) + 1024 // mock a id
    //       const { data } = await createArticle({ article: articleData })
    //       data.article.timestamp = Date.parse(data.article.timestamp)
    //       this.list.unshift(data.article)
    //       this.dialogFormVisible = false
    //       this.$notify({
    //         title: '成功',
    //         message: '创建成功',
    //         type: 'success',
    //         duration: 2000
    //       })
    //     }
    //   })
    // }

    private rolesOptionstree = {}

    private handleUpdate(row: any) {
      this.tempArticleData = Object.assign({}, row)
      this.tempArticleData.permissionsdata = this.tempArticleData.permissions.map((item) => item.id)
      this.dialogStatus = 'update'
      this.dialogFormVisible = true
      this.$nextTick(() => {
        if (this.$refs.tree) {
          this.$refs.tree.setCheckedKeys(this.tempArticleData.permissionsdata)
        }
      })
      this.$nextTick(() => {
        (this.$refs.dataForm as Form).clearValidate()
      })
    }

    private async updateData() {
      const tempData = Object.assign({}, this.tempArticleData)
      tempData.permissionsArrId = this.$refs.tree.getCheckedKeys()
      const { data } = await updateRole(tempData.id, {
        article: tempData
      })
      const index = this.list.findIndex(v => v.id === data.article.id)
      this.list.splice(index, 1, data.article)
      this.$nextTick(() => {
        if (this.$refs.tree) {
          this.$refs.tree.setCheckedKeys([])
        }
      })
      this.dialogFormVisible = false
      this.$notify({
        title: '成功',
        message: '更新成功',
        type: 'success',
        duration: 2000
      })
    }

    private async handleDelete(row: any) {
      await disableById(row.id)
      row.status = false
      this.$notify({
        title: 'Success',
        message: 'Disable Successfully',
        type: 'success',
        duration: 2000
      })
    }

    private async handleEnable(row: any) {
      await enableById(row.id)
      row.status = true
      this.$notify({
        title: 'Success',
        message: 'Enable Successfully',
        type: 'success',
        duration: 2000
      })
    }

    private handleDownload() {
      this.downloadLoading = true
      const tHeader = Object.keys(this.list[0] || {})
      const data = this.list.map(row => tHeader.map(key => row[key] || ''))
      exportJson2Excel(tHeader, data, 'table-list')
      this.downloadLoading = false
    }

    private resetFilters() {
      this.listQuery = {
        page: 1,
        limit: 20,
        name: undefined,
        email: undefined,
        status: undefined,
        role: undefined,
        sort: '+id'
      }
      this.getList()
    }
}
</script>
