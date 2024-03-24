<script setup>
import { h, onMounted } from "vue";
import { message } from "ant-design-vue";
import {
  ReloadOutlined,
  SearchOutlined,
  DeleteOutlined,
} from "@ant-design/icons-vue";
import { Modal } from "ant-design-vue";
//const [modal, contextHolder] = Modal.useModal();
import { service } from "@/apis/axios";

const columns = [
  {
    title: "id",
    dataIndex: "id",
    key: "id",
  },
  {
    title: "姓名",
    dataIndex: "realname",
    key: "realname",
  },
  {
    title: "性别",
    dataIndex: "gender",
    key: "gender",
  },
  {
    title: "出生日期",
    dataIndex: "birthday",
    key: "birthday",
  },
  {
    title: "手机号",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "现住址",
    dataIndex: "address",
    key: "address",
  },
  {
    title: "操作",
    dataIndex: "action",
    key: "action",
  },
];
const data = ref([]);
const loading = ref(false);
const ttl = ref(0);
const newFlt = () => ({
  page: 1,
  limit: 10,
  realname: "",
  gender: "",
  birthday: "",
  phone: "",
  address: "",
});
const flt = ref(newFlt());

function fetchData() {
  loading.value = true;
  service
    .get("/api/peoples", {
      params: flt.value,
    })
    .then(({ count, rows }) => {
      data.value = rows;
      ttl.value = count;
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      loading.value = false;
    });
}
function search() {
  flt.value.page = 1;
  fetchData();
}
function cleanFlt() {
  flt.value = newFlt();
  fetchData();
}

function delOne(record) {
  Modal.confirm({
    title: "删除",
    content: `确定要删除「${record.id} - ${record.realname}」该人员？注意此操作不可逆！`,
    okType: "danger",
    async onOk() {
      await service.delete(`/api/people/${record.id}`);
      message.success("删除成功");
      fetchData();
    },
    onCancel() {},
  });
}

onMounted(() => {
  fetchData();
});
</script>

<template>
  <a-typography-title :level="3">我独自升级</a-typography-title>
  <a-typography-paragraph>
    <pre>
自从连接异次元与当前世界的通道“门”突然出现后已过去十余年，
世界上出现了被称为“猎人”的，觉醒了非凡力量的人们。
猎人在门内攻略地下城以获取回报以维持生计，
但在强者如云的猎人中，「水篠旬」作为被称作人类最弱武器的低级猎人生活着。
某一天，遭遇了隐藏在低级地下城中的高级双重地下城后，
身受重伤濒临死亡的水篠旬面前出现了神秘的任务窗口。

死到临头，决定接受任务的水篠旬，
成为了唯一能够「升级」的人——</pre
    >
  </a-typography-paragraph>
  <div>
    <a-space>
      <a-button type="primary" ghost>添加人员</a-button>
    </a-space>
  </div>
  <div style="margin: 10px 0">
    <a-form layout="inline" class="flter-form">
      <a-form-item label="姓名">
        <a-input
          v-model:value="flt.name"
          placeholder="模糊查找姓名"
          allow-clear
        />
      </a-form-item>
      <a-form-item label="性别">
        <a-select v-model:value="flt.gender"
          ><a-select-option value="">全部</a-select-option>
          <a-select-option value="男">男</a-select-option>
          <a-select-option value="女">女</a-select-option>
        </a-select>
      </a-form-item>
      <a-form-item label="手机号">
        <a-input
          v-model:value="flt.phone"
          placeholder="模糊查找手机号"
          allow-clear
        />
      </a-form-item>
      <a-form-item>
        <a-space>
          <a-tooltip title="查询">
            <a-button
              @click="search"
              type="primary"
              shape="circle"
              :icon="h(SearchOutlined)"
            />
          </a-tooltip>
          <a-tooltip title="刷新">
            <a-button
              @click="fetchData"
              shape="circle"
              :icon="h(ReloadOutlined)"
            />
          </a-tooltip>
          <a-tooltip title="清空">
            <a-button
              @click="cleanFlt"
              shape="circle"
              :icon="h(DeleteOutlined)"
            />
          </a-tooltip>
        </a-space>
      </a-form-item>
    </a-form>
  </div>
  <a-table
    :loading="loading"
    :pagination="{
      size: 'small',
      current: flt.page,
      onChange: (page) => {
        flt.page = page;
        fetchData();
      },
      onShowSizeChange: (page, limit) => {
        flt.limit = limit;
        flt.page = 1;
        fetchData();
      },
      pageSize: flt.limit,
      total: ttl,
      showTotal: (total, range) =>
        `当前${range[0]}-${range[1]} / 总共${total}项`,
    }"
    :columns="columns"
    :data-source="data"
  >
    <template #bodyCell="{ column, record }">
      <template v-if="column.dataIndex === 'action'">
        <a-button type="text" size="small" @click="() => {}"> 编辑 </a-button>
        <a-button @click="delOne(record)" type="text" danger size="small">
          删除
        </a-button>
        <contextHolder />
      </template>
    </template>
  </a-table>
</template>

<style lang="scss" scoped></style>
<style lang="scss">
.flter-form {
  > div.ant-form-item {
    flex: 0 0 256px;
    margin-top: 10px;
  }
}

:where(.css-dev-only-do-not-override-1hsjdkk).ant-btn {
  padding: 4px 12px;
}
:where(.css-dev-only-do-not-override-1hsjdkk).ant-table-wrapper
  .ant-table-thead
  > tr
  > th,
:where(.css-dev-only-do-not-override-1hsjdkk).ant-table-wrapper
  .ant-table-tbody
  > tr
  > td,
:where(.css-dev-only-do-not-override-1hsjdkk).ant-table-wrapper tfoot > tr > th,
:where(.css-dev-only-do-not-override-1hsjdkk).ant-table-wrapper
  tfoot
  > tr
  > td {
  padding: 12px 12px;
}
</style>
