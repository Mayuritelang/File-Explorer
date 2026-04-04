<template>
  <div class="w-64 bg-black border-r border-gray-800 p-4">

    <h2 class="text-lg font-semibold text-gray-200 pb-2 border-b border-gray-700">
      Explorer
    </h2>

    <div class="space-y-1 mt-3">
      <TreeNode v-for="file in rootFiles" :key="file._id" :node="file" />
    </div>

  </div>
</template>

<script setup>
import { onMounted, computed } from "vue";
import { useFileStore } from "../stores/FileStore.js";
import TreeNode from "./TreeNode.vue";

const store = useFileStore();

onMounted(async () => {
  await store.fetchFiles(null);
});

const rootFiles = computed(() => store.files["root"] || []);
</script>