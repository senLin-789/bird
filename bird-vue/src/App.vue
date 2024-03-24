<script setup>
import enUS from "ant-design-vue/es/locale/en_US";
import zhCN from "ant-design-vue/es/locale/zh_CN";
const locale = "zhCN";
</script>

<template>
  <a-config-provider :locale="locale === 'zhCN' ? zhCN : enUS">
    <a-app>
      <router-view />
    </a-app>
  </a-config-provider>
</template>

<style></style>
