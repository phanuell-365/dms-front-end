import { reactive, ref, Ref } from "vue";
import Fuse from "fuse.js";

export const useSearchTable = <T>(
  query: Ref<string>,
  selectedSearchKey: Ref<string>,
  records: Ref<T[]>
) => {
  const options = reactive({
    keys: [selectedSearchKey.value],
  });

  // @ts-ignore
  const filteredRecords: Ref<T[]> = ref([...records.value]);

  const fuse = new Fuse(records.value, options);
  const result = fuse.search(query.value).map((value1) => value1.item);
  filteredRecords.value = query.value === "" ? records.value : result;

  return filteredRecords;
};
