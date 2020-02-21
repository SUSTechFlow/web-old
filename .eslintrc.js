module.exports = {
    extends: [
        'plugin:vue/base'
    ],
    rules: {
        "vue/no-parsing-error": [2, {
            "x-invalid-end-tag": false
        }]
    }
};
