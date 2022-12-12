import { reactive, ref, Ref, watch } from "vue";
import Fuse from "fuse.js";

export const useSearchTable = (
  query: Ref<string>,
  selectedSearchKey: Ref<string>,
  records: Ref<object[]>
) => {
  const options = reactive({
    keys: [selectedSearchKey.value],
  });

  const filteredRecords = ref([...records.value]);

  watch(selectedSearchKey, (value) => {
    options.keys = [value];
  });

  watch(query, (value) => {
    const fuse = new Fuse(records.value, options);
    const result = fuse
      .search(value.toLowerCase())
      .map((value1) => value1.item);
    filteredRecords.value = value === "" ? records.value : result;
  });

  return filteredRecords;
};
