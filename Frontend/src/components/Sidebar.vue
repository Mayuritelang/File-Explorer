<template>
  <div 
    class="w-64 bg-black border-r border-gray-800 p-4"
    @click.self="clearSelection"
  >

    <h2 class="text-lg font-semibold text-gray-200 pb-2 border-b border-gray-700">
      Explorer
    </h2>

    <!-- Toolbar -->
    <div class="flex items-center justify-between mt-3 mb-2 px-1">

      <span class="text-xs text-gray-400 uppercase tracking-wide">
        File Explorer
      </span>

      <div class="flex gap-1">

        <button @click="createFolder" class="p-1.5 rounded hover:bg-gray-800">
          📁
        </button>

        <button @click="createFile" class="p-1.5 rounded hover:bg-gray-800">
          📄
        </button>

      </div>
    </div>

    <!-- Files -->
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

const clearSelection = () => {
  store.selectedId = null;
};

const createFolder = async () => {
  const folderName = prompt("Enter folder name");
  if (!folderName) return;

  await store.createItem({
    name: folderName,
    type: "folder",
    parentId: store.selectedId || null
  });
};

const createFile = async () => {
  const fileName = prompt("Enter file name");
  if (!fileName) return;

  await store.createItem({
    name: fileName,
    type: "file",
    parentId: store.selectedId || null
  });
};
</script>