import { apiUrl, apiPath } from "../js/config.js";

export default {
    template: `<div class="modal-dialog">
    <div class="modal-content border-0">
        <div class="modal-header bg-danger text-white">
            <h5 id="delProductModalLabel" class="modal-title">
                <span>刪除產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body fs-5">
            是否刪除商品
            <strong class="text-danger">{{delProductTitle}}</strong> (刪除後將無法恢復)。
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
            </button>
            <button type="button" class="btn btn-danger" @click="delProduct">
                確認刪除
            </button>
        </div>
    </div>
    </div>`,
    props: ["delProductTitle", "productId"],
    methods: {
        delProduct() {
            axios.delete(`${apiUrl}/v2/api/${apiPath}/admin/product/${this.productId}`)
                .then(res => {
                    this.$emit("refresh")
                    this.$emit("closeModal","del");
                    alert(res.data.message);
                }).catch(err => {
                    alert(err.data.message);
                })
        },
    }
}