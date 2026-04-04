<template>
  <div class="flex h-screen bg-black text-gray-200">

    <!-- Sidebar -->
    <Sidebar />

    <!-- Main -->
    <div class="flex-1 bg-[#0f0f0f] flex items-center justify-center">
      <div class="text-center">
        <h1 class="text-2xl font-semibold text-gray-300 mb-2">
          No folder selected
        </h1>
        <p class="text-gray-500 text-sm">
          Open a folder from the explorer to view its contents
        </p>
      </div>
    </div>

  </div>
</template>

<script setup>
import Sidebar from "./components/Sidebar.vue";
</script>