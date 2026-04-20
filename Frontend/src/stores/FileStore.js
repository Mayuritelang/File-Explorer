import { defineStore } from "pinia";
import API from "../api";

export const useFileStore = defineStore("file", {
  state: () => ({
    files: {},
      selectedId: null
  }),

  getters: {
  selectedItem(state) {
    if (!state.selectedId) return null;

    // sab files me search karo
    for (const key in state.files) {
      const found = state.files[key].find(
        f => f._id === state.selectedId
      );
      if (found) return found;
    }

    return null;
  }
},

 actions: {
  async fetchFiles(parentId = null) {
    const key = parentId ? parentId : "root";

    if (this.files[key]) return;

    const res = await API.get(`/files?parentId=${parentId || ""}`);
    this.files[key] = res.data;
  },

  async createItem(data) {
    const res = await API.post("/files", data);

    const key = data.parentId ? data.parentId : "root";

    if (!this.files[key]) {
      this.files[key] = [];
    }

    this.files[key].push(res.data); 
  }
}
});