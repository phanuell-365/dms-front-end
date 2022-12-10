import { defineStore } from "pinia";
import { ref, Ref } from "vue";
import { AuthUser } from "./interfaces";
import { useStorage } from "@vueuse/core";
import { useDmsFetch } from "../../composables";
import { DmsError } from "../../errors/dms-error";

interface SecurityState {
  token: string;
  accessToken: string;
  expiresIn: string;
  role: string;
  userId: string;
}

export const useSecurityStore = defineStore("security", () => {
  const auth: Ref<SecurityState> = ref({
    token: "",
    accessToken: "",
    expiresIn: "",
    role: "",
    userId: "",
  });

  async function login(securityObj: AuthUser) {
    const { data, error } = await useDmsFetch("/auth/users/login", {
      async afterFetch(ctx) {
        console.error(ctx);
        return ctx;
      },
    })
      .post(securityObj)
      .json();

    if (error.value) {
      console.error("There was an error -> ", error);
      if (data.value)
        throw new DmsError(
          error.value.message,
          data.value.message,
          data.value.statusCode
        );
      else throw error.value as Error;
    }

    if (!data.value) {
      throw new Error("Invalid username or password!");
    }

    const { access_token, expires_in, userId, role } = data.value;

    auth.value.userId = userId;
    auth.value.role = role;
    auth.value.expiresIn = expires_in;
    auth.value.accessToken = access_token;

    await storeTokenToLocalStore(access_token);
    if (data.value) {
      const securityData = JSON.stringify(data.value);

      useStorage("auth-data", securityData);
    }
  }

  async function storeTokenToLocalStore(accessToken: string) {
    if (await getStoredToken()) {
      localStorage.removeItem("token");
    }

    useStorage("token", accessToken);
  }

  async function getStoredToken(): Promise<string> {
    const data = localStorage.getItem("token");
    if (!data) {
      return "";
    }

    return data;
  }

  return { auth, getStoredToken, login };
});
