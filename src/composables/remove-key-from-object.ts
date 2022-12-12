import { ref } from "vue";
import { useGetKeyAndValue } from "./get-key-and-value";

export const useRemoveKeyFromObject = (key: string, obj: object) => {
  const values = ref(Object.values(obj));
  const keys = ref(Object.keys(obj));

  const { key: key1, value } = useGetKeyAndValue(key, obj);

  values.value = values.value.filter((value1) => value1 !== value);
  keys.value = keys.value.filter((value1) => value1 !== key1);

  return ref(
    Object.fromEntries(keys.value.map((key, i) => [key, values.value[i]]))
  );
};
