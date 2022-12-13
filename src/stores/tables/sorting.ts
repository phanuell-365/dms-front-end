import { defineStore } from "pinia";
import { computed, ref, Ref } from "vue";

interface SortItem {
  field: string;
  active: boolean;
  direction: "asc" | "desc";
}

export const useSortingStore = defineStore("sorting", () => {
  const items: Ref<SortItem[]> = ref([]);

  function setSortItem(field: string) {
    // check if the item exists
    const item = items.value.find((item) => item.field === field);

    // if it exists, set the other items to inactive
    if (item) {
      items.value.forEach((item) => (item.active = false));
      item.active = true;
      item.direction = item.direction === "asc" ? "desc" : "asc";
    } else {
      items.value.push({ field, active: true, direction: "asc" });
    }
  }

  const getActiveSortDirection = computed(() => {
    const activeItem = items.value.find((item) => item.active);
    return activeItem ? activeItem.direction : "asc";
  });

  const getActiveSortField = computed(() => {
    const activeItem = items.value.find((item) => item.active);
    return activeItem ? activeItem.field : "";
  });

  function toggleSortItem(field: string) {
    const item = items.value.find((item) => item.field === field);
    if (item) {
      item.active = !item.active;
    } else {
      items.value.push({ field, direction: "asc", active: true });
    }
  }

  function clearSortItems() {
    items.value = [];
  }

  return {
    setSortItem,
    getActiveSortDirection,
    getActiveSortField,
    toggleSortItem,
    clearSortItems,
    items,
  };
});
