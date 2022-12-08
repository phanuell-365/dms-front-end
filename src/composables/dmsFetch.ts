import { createFetch } from "@vueuse/core";
import { useSecurityStore } from "../stores/security";

export const useDmsFetch = createFetch({
  baseUrl: import.meta.env.VITE_VUE_APP_API_URL,
  combination: "overwrite",
  options: {
    async beforeFetch({ options, cancel }) {
      const securityStore = useSecurityStore();
      const token = await securityStore.getStoredToken();

      if (!token || token === "") {
        cancel();
      }

      if (options.headers)
        options.headers = {
          ...options.headers,
          Authorization: `Bearer ${token}`,
        };

      return {
        options,
      };
    },
  },
  fetchOptions: {
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
  },
});
