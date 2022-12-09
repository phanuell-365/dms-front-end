<template>
  <PlainLayout>
    <div class="flex flex-col items-center justify-center pb-2 mt-1 mb-2">
      <DocumentIcon class="h-12 w-12 text-emerald-600 mb-3 mt-1" />
      <h2 class="text-3xl text-zinc-700 font-bold my-2">
        Sign in to your account
      </h2>
    </div>
    <div
      class="flex justify-center flex-col bg-white pb-6 pt-2 mx-7 px-3 px-10 my-3 shadow rounded md:w-[26rem]"
    >
      <form autocomplete="off" novalidate @submit.prevent>
        <label class="mx-2 w-full">
          <span
            class="after:content-['*'] after:ml-0.5 after:text-red-500 block"
            >Email Address</span
          >
          <input
            id="email"
            v-model="emailAddress"
            :class="{
              'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':
                invalidCredentials ||
                (!emailAddressMeta.valid && emailAddressMeta.validated) ||
                (!emailAddressMeta.validated && !formIsValid),
              'border-stone-300 focus:border-emerald-500 dark:focus:border-emerald-300 focus:ring-emerald-500 dark:focus:ring-emerald-200 dark:text-stone-50 caret-emerald-200':
                !(
                  (!emailAddressMeta.valid && emailAddressMeta.validated) ||
                  (!emailAddressMeta.validated && !formIsValid)
                ),
            }"
            class="peer block bg-white w-full border rounded-lg py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
            name="email"
            type="email"
          />
          <small
            v-if="!emailAddressMeta.valid && emailAddressMeta.validated"
            class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
            >{{ emailAddressErrorMessage }}</small
          >
          <span
            v-else-if="!emailAddressMeta.validated && !formIsValid"
            class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
            >Please enter an email</span
          >
          <small
            v-else-if="invalidCredentials"
            class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
            >{{ invalidCredentialsMessage }}</small
          >
        </label>

        <label class="mx-2">
          <span
            class="after:content-['*'] after:ml-0.5 after:text-red-500 block"
            >Password</span
          >
          <input
            id="password"
            v-model="password"
            :class="{
              'border-pink-600 dark:border-pink-500 focus:border-pink-600 dark:focus:border-pink-500 focus:ring-pink-600 dark:focus:ring-pink-500 caret-pink-600 text-pink-500':
                invalidCredentials ||
                (!passwordMeta.valid && passwordMeta.validated) ||
                (!passwordMeta.validated && !formIsValid),
              'border-stone-300 dark:border-stone-50 focus:border-emerald-500 dark:focus:border-emerald-300 focus:ring-emerald-500 dark:focus:ring-emerald-200 dark:text-stone-50 caret-emerald-200':
                !(
                  (!passwordMeta.valid && passwordMeta.validated) ||
                  (!passwordMeta.validated && !formIsValid)
                ),
            }"
            class="peer block bg-white w-full border rounded-lg py-2 px-3 shadow-sm focus:outline-none focus:ring-1 sm:text-sm"
            name="password"
            type="password"
          />
          <small
            v-if="!passwordMeta.valid && passwordMeta.validated"
            class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
            >{{ passwordErrorMessage }}</small
          >
          <span
            v-else-if="!passwordMeta.validated && !formIsValid"
            class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
            >Please enter a password</span
          >
          <small
            v-else-if="invalidCredentials"
            class="mt-2 block text-pink-600 dark:text-pink-500 text-sm"
            >{{ invalidCredentialsMessage }}</small
          >
        </label>

        <div class="flex items-center justify-center">
          <button
            class="py-1 px-4 m-2 w-40 rounded-lg bg-emerald-400 focus:ring focus:ring-emerald-200 active:ring-emerald-300 hover:bg-emerald-600 hover:text-white focus:outline-none transition ease-in-out delay-150 hover:-translate-y-0.5 duration-200"
            type="submit"
            @click="onLoginClick"
          >
            Login
          </button>
        </div>
      </form>
    </div>
  </PlainLayout>
</template>

<script lang="ts" setup>
import { DocumentIcon } from "@heroicons/vue/24/outline";
import { useField } from "vee-validate";
import { ref, Ref } from "vue";
import { useRouter } from "vue-router";
import { AuthUser } from "../stores/security/interfaces";
import { useSecurityStore } from "../stores/security";
import PlainLayout from "../layouts/PlainLayout.vue";

const router = useRouter();

const securityStore = useSecurityStore();

const emailAddressValidation = (value: string) => {
  if (!value) return "Please enter a email address!";

  if (
    !/^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/.test(
      value
    )
  )
    return "Please enter a valid email address!";

  return true;
};

const {
  value: emailAddress,
  errorMessage: emailAddressErrorMessage,
  meta: emailAddressMeta,
} = useField("emailAddress", emailAddressValidation);

const passwordValidation = (value: string) => {
  if (!value) return "Please enter a password!";

  if (value.length < 8)
    return "The password must contain more than 8 characters";

  return true;
};

const {
  value: password,
  errorMessage: passwordErrorMessage,
  meta: passwordMeta,
} = useField("password", passwordValidation);

const formIsValid: Ref<boolean> = ref(true);

const validateForm = () => {
  formIsValid.value = emailAddressMeta.valid && passwordMeta.valid;
};

const invalidCredentials = ref(false);
const invalidCredentialsMessage = ref("");

const createAuthPayload = () => {
  const payload: AuthUser = {
    email: emailAddress.value,
    password: password.value,
  };

  return payload;
};

const onLoginClick = async () => {
  validateForm();

  if (formIsValid.value) {
    try {
      await securityStore.login(createAuthPayload());
      await router.push("/");
    } catch (error: any) {
      invalidCredentialsMessage.value = error.message;
      invalidCredentials.value = true;
      console.error(error);
    }
  }
};
</script>

<style scoped></style>
