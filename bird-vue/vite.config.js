import { fileURLToPath, URL } from "url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import AutoImport from "unplugin-auto-import/vite";
import Components from "unplugin-vue-components/vite";
//import { ElementPlusResolver } from "unplugin-vue-components/resolvers";
import { AntDesignVueResolver } from "unplugin-vue-components/resolvers";
import vueSetupExtend from "vite-plugin-vue-setup-extend";

// https://vitejs.dev/config/
export default defineConfig({
  // base: '/admin/',
  server: {
    host: "0.0.0.0",
    proxy: {
      "/api": {
        target: "http://127.0.0.1:7001/",
        changeOrigin: true,
        rewrite: (path) => path.replace(/^\/api/, "/api"),
      },
    },
  },
  plugins: [
    vue(),
    AutoImport({
      imports: ["vue", "vue-router"],
      //resolvers: [ElementPlusResolver()],
      eslintrc: {
        enabled: false,
      },
    }),
    Components({
      directoryAsNamespace: true,
      resolvers: [
        AntDesignVueResolver({
          importStyle: false,
        }),
      ],
    }),
    vueSetupExtend(),
  ],
  resolve: {
    alias: {
      "@": fileURLToPath(new URL("./src", import.meta.url)),
    },
  },
  build: {
    rollupOptions: {
      manualChunks(id) {
        //id是文件路径
        if (id.includes("node_modules")) {
          //说明是npm包
          return id
            .toString()
            .split("node_modules/")[1]
            .split("/")[0]
            .toString(); //包的文件名
        }
      },
    },
  },
});
