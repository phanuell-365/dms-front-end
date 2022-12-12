import { reactive, ref } from "vue";

export const useGetKeyAndValue = (key: string, obj: object) => {
  const values = ref(Object.values(obj));
  const keys = ref(Object.keys(obj));

  const indexOfKey = ref(keys.value.indexOf(key));

  return reactive({
    key: keys.value[indexOfKey.value],
    value: values.value[indexOfKey.value],
  });
};
