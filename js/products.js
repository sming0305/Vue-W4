import { createApp } from "https://cdnjs.cloudflare.com/ajax/libs/vue/3.2.45/vue.esm-browser.min.js";
import { apiUrl, apiPath } from "./config.js";


import editProductModal from "../components/editProductModal.js";
import delProductModal from "../components/delProdcutModal.js";
import pagination from "../components/pagination.js";

let productModal = null;
let delProdcutModal = null;

const app = {
    data() {
        return {
            products: {},
            productTemplate: {
                data: {
                    imagesUrl: [],
                    num:1
                }
            },
            pagination:{},
            modalStatus: "",
            productId: "",
            delProductTitle: ""
        }
    },
    components: {
        editProductModal,
        delProductModal,
        pagination
    },
    methods: {
        checkAdmin() {
            axios.post(`${apiUrl}/v2/api/user/check`)
                .then(res => {
                    this.getProducts()
                })
                .catch(err => {
                    alert(err.data.message)
                    location.href = "./login.html"
                })
        },
        getProducts(target) {

            let page = "";
            target === undefined ? page = `` : page = `?page=${target}`

            axios.get(`${apiUrl}/v2/api/${apiPath}/admin/products/${page}`)
                .then(res => {
                    this.products = res.data.products
                    this.pagination = res.data.pagination
                })
                .catch(err => {
                    alert(err.data.message)
                })
        }, openModal(modal, product) {
            this.modalStatus = modal

            if (this.modalStatus === "new") {
                this.productTemplate = { data: { imagesUrl: [] } }
                this.productId = ""
                productModal.show()
            } else if (this.modalStatus === "edit") {
                this.productTemplate.data = JSON.parse(JSON.stringify(product))
                this.productId = product.id
                if (this.productTemplate.data.imagesUrl === undefined) {
                    this.productTemplate.data.imagesUrl = []
                }
                productModal.show()
            } else if (this.modalStatus === "del") {
                this.delProductTitle = product.title
                this.productId = product.id
                delProdcutModal.show()
            }
        }, closeModal(target) {
            target === "edit" ? productModal.hide() : delProdcutModal.hide();
        }
    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)token\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkAdmin()
        productModal = new bootstrap.Modal(document.getElementById("productModal"));
        delProdcutModal = new bootstrap.Modal(document.getElementById("delProductModal"));
    }
}

createApp(app).mount("#app")