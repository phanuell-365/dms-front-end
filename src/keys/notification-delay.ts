import { InjectionKey, Ref } from "vue";

export const notificationDelayKey = Symbol() as InjectionKey<Ref<number>>;
