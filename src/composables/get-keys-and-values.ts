import { reactive, ref } from "vue";

export const useGetKeysAndValues = (keys: string[], obj: object) => {
  const values = ref(Object.values(obj));
  const keys1 = ref(Object.keys(obj));

  const indexOfKeys = ref(keys1.value.map((key) => keys1.value.indexOf(key)));

  return reactive({
    keys: indexOfKeys.value.map((index) => keys1.value[index]),
    values: indexOfKeys.value.map((index) => values.value[index]),
  });
};
