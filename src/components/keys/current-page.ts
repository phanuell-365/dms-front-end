import { InjectionKey, Ref } from "vue";

export const currentPageKey = Symbol() as InjectionKey<Ref<number>>;
