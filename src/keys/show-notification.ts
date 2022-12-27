import { InjectionKey, Ref } from "vue";

export const showNotificationKey = Symbol() as InjectionKey<Ref<boolean>>;
