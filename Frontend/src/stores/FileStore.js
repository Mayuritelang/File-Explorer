import { defineStore } from "pinia";
import API from "../api";

export const useFileStore = defineStore("file", {
  state: () => ({
    files: {},
  }),

  actions: {
    async fetchFiles(parentId = null) {
      const key = parentId ? parentId : "root";

      if (this.files[key]) return;

      const res = await API.get(`/files?parentId=${parentId || ""}`);
      this.files[key] = res.data;

    },
  },
});