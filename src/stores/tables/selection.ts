import { defineStore, storeToRefs } from "pinia";
import { computed, ref, Ref } from "vue";
import { useSearchResultsStore } from "./results";

interface Item {
  id: string;
  selected: boolean;
}

export const useSelectionStore = defineStore("selection", () => {
  const items: Ref<Item[]> = ref([]);
  const searchResultsStore = useSearchResultsStore();

  const { getResultsCount } = storeToRefs(searchResultsStore);

  const selectionMode = ref(false);

  function toggleSelectionMode() {
    selectionMode.value = !selectionMode.value;
  }

  function setSelectionMode(mode: boolean) {
    selectionMode.value = mode;
  }

  const getSelectMode = computed(() => selectionMode.value);

  function selectItem(id: string) {
    const item = items.value.find((item) => item.id === id);
    if (item) {
      item.selected = true;
    } else {
      items.value.push({ id, selected: true });
    }
  }

  function deselectItem(id: string) {
    const item = items.value.find((item) => item.id === id);
    if (item) {
      item.selected = false;
    } else {
      items.value.push({ id, selected: false });
    }
  }

  function addItems(ids: string[]) {
    ids.forEach((id) => {
      const item = items.value.find((item) => item.id === id);
      if (!item) {
        items.value.push({ id, selected: true });
      }
    });
  }

  function removeItems(ids: string[]) {
    ids.forEach((id) => {
      const item = items.value.find((item) => item.id === id);
      if (item) {
        item.selected = false;
      }
    });
  }

  function selectAllItems() {
    items.value.forEach((item) => (item.selected = true));
  }

  function deselectAllItems() {
    items.value.forEach((item) => (item.selected = false));
  }

  function toggleItem(id: string) {
    const item = items.value.find((item) => item.id === id);
    if (item) {
      item.selected = !item.selected;
    } else {
      items.value.push({ id, selected: true });
    }
  }

  function toggleAllItems() {
    const allSelected = items.value.every((item) => item.selected);
    if (allSelected) {
      deselectAllItems();
    } else {
      selectAllItems();
    }
  }

  function isSelected(id: string) {
    const item = items.value.find((item) => item.id === id);
    return item ? item.selected : false;
  }

  const getSelectedItems = computed(() =>
    items.value.filter((item) => item.selected)
  );

  const getSelectedItemsCount = computed(
    () => items.value.filter((item) => item.selected).length
  );

  const getSelectedItemsIds = computed(() =>
    items.value.filter((item) => item.selected).map((item) => item.id)
  );

  // create a computed property that returns true if at least one item is selected

  const getIsAnyItemSelected = computed(() => {
    return items.value.some((item) => item.selected);
  });

  // create a computed property that returns true if all items are selected

  const getIsAllItemsSelected = computed(() => {
    if (items.value.length === 0 || getResultsCount.value === 0) {
      return false;
    }

    // if the number of selected items is equal to the number of results, then all items are selected
    return (
      items.value.filter((item) => item.selected).length ===
      getResultsCount.value
    );
  });

  return {
    items,
    selectionMode,
    toggleSelectionMode,
    setSelectionMode,
    getSelectMode,
    selectItem,
    deselectItem,
    isSelected,
    addItems,
    removeItems,
    selectAllItems,
    deselectAllItems,
    toggleItem,
    toggleAllItems,
    getSelectedItems,
    getSelectedItemsCount,
    getSelectedItemsIds,
    getIsAnyItemSelected,
    getIsAllItemsSelected,
  };
});
