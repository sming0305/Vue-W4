import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js";
import { apiUrl } from "./config.js";

const app = {
    data() {
        return {
            userInfo: {
                "username": "",
                "password": ""
            }
        }
    },
    methods: {
        login() {
            axios.post(`${apiUrl}/v2/admin/signin`, this.userInfo)
                .then(res => {
                    const { token, expired } = res.data;
                    document.cookie = `token=${token};expires=${expired}`
                    location.href = "./products.html";
                })
                .catch(err => {
                    alert(`${err.data.message} ， 請確認您的帳號密碼輸入正確`)
                })

        }
    }
}
createApp(app).mount("#app")