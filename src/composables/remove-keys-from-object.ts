import { ref } from "vue";
import { useGetKeyAndValue } from "./get-key-and-value";

export const useRemoveKeysFromObject = (keys: string[], obj: object) => {
  const values = ref(Object.values(obj));
  const keys1 = ref(Object.keys(obj));

  keys.forEach((key) => {
    const { key: key1, value } = useGetKeyAndValue(key, obj);

    values.value = values.value.filter((value1) => value1 !== value);
    keys1.value = keys1.value.filter((value1) => value1 !== key1);
  });

  return ref(
    Object.fromEntries(keys1.value.map((key, i) => [key, values.value[i]]))
  );
};
