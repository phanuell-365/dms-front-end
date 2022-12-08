require("@rushstack/eslint-patch/modern-module-resolution");

module.exports = {
    root: true,
    extends: [
        // add more generic rulesets here, such as:
        'eslint:recommended',
        'plugin:vue/vue3-recommended',
        "plugin:vue/base",
        "@vue/eslint-config-typescript",
        "@vue/eslint-config-prettier",
        "plugin:vue/vue3-essential",
        // 'plugin:vue/recommended' // Use this if you are using Vue.js 2.x.
        "prettier"
    ],
    rules: {
        // override/add rules settings here, such as:
        'vue/no-unused-vars': 'error'
    },
    parserOptions: {
        ecmaVersion: "latest",
    }
}
