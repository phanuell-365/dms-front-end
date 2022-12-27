import { DmsError } from "../errors/dms-error";
import { ref, Ref } from "vue";
import { PopupNotification } from "../components/notifications/interface";

export const useDisplayErrNotification = (error: DmsError) => {
  const errNotification: Ref<PopupNotification> = ref({
    title: error.error,
    description: error.message,
    show: true,
  });

  return errNotification;
};
