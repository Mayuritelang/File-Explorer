<template>
  <div class="flex h-screen bg-black text-gray-200">

    <!-- Sidebar -->
    <Sidebar />

    <!-- Main -->
    <div class="flex-1 bg-[#0f0f0f] flex items-center justify-center">
      <div class="text-center">


        <h1 class="text-2xl font-semibold text-gray-300 mb-2">
          <span v-if="selectedItem">
            {{ selectedItem.type === "folder" ? "📁 Folder:" : "📄 File:" }}
            <span class="text-white">{{ selectedItem.name }}</span>
          </span>
          <span v-else>
            📂 No folder selected
          </span>
        </h1>
        <p class="text-gray-500 text-sm">
          {{
            selectedItem
              ? selectedItem.type === "folder"
                ? "You are viewing this folder"
                : "This is a file"
              : "Select a folder from the explorer to get started"
          }}
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import Sidebar from "./components/Sidebar.vue";
import { useFileStore } from "./stores/FileStore.js";
import { computed } from "vue";

const store = useFileStore();

const selectedItem = computed(() => store.selectedItem);
</script>