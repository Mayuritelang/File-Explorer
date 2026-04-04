<template>
  <div>
    <!-- ROW -->
    <div @click="toggle"
      class="flex items-center gap-2 px-2 py-1.5 rounded-md cursor-pointer hover:bg-gray-800 transition-all duration-200">
      <!-- Arrow -->
      <span v-if="node.type === 'folder'" class="text-xs text-gray-500">
        {{ isOpen ? "▾" : "▸" }}
      </span>

      <!-- Icon -->
      <span>
        {{ node.type === "folder" ? (isOpen ? "📂" : "📁") : "📄" }}
      </span>

      <!-- Name -->
      <span class="text-sm text-gray-200 truncate">
        {{ node.name }}
      </span>
    </div>

    <!-- CHILDREN -->
    <div v-if="isOpen" class="ml-5 border-l border-white/10 pl-2 mt-1 space-y-1">
      <TreeNode v-for="child in children" :key="child._id" :node="child" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useFileStore } from "../stores/FileStore.js";
import TreeNode from "./TreeNode.vue";

const props = defineProps(["node"]);
const store = useFileStore();

const isOpen = ref(false);

const children = computed(() => {
  return store.files[props.node._id] || [];
});

const toggle = async () => {
  if (props.node.type === "file") return;

  isOpen.value = !isOpen.value;

  if (isOpen.value && !store.files[props.node._id]) {
    await store.fetchFiles(props.node._id);
  }
};
</script>