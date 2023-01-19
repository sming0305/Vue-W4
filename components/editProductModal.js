import { apiUrl, apiPath } from "../js/config.js";

export default {
    template: `<div class="modal-dialog modal-xl">
    <div class="modal-content border-0">
        <div class="modal-header bg-dark text-white">
            <h5 id="productModalLabel" class="modal-title">
                <span>新增產品</span>
            </h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body">
            <div class="row">
                <div class="col-sm-4">
                    <div class="mb-2">
                        <div class="mb-3">
                            <label for="imageUrl" class="form-label fw-bold fs-5">主圖</label>
                            <input type="text" class="form-control" placeholder="請輸入圖片連結" v-model="productTemplate.data.imageUrl" >
                        </div>
                        <img class="img-fluid" :src="productTemplate.data.imageUrl" :alt="productTemplate.data.title" v-if="productTemplate.data.imageUrl">
                    </div>
                    <span class="fw-bold fs-5 mb-2 d-block">產品多圖新增</span>
                    <div class="mb-3" v-for="(image,index) in productTemplate.data.imagesUrl">
                    
                    <div v-if="productTemplate.data.imagesUrl.length !== 0">
                    <input type="text" class="form-control  mb-2" placeholder="請輸入圖片連結" v-model="productTemplate.data.imagesUrl[index]" >
                    <img class="img-fluid" :src="image" :alt="index" v-if="image !== ''">
                        <button class="btn btn-outline-danger btn-sm d-block w-100" @click="productTemplate.data.imagesUrl.splice(index,1)">
                            刪除圖片
                        </button>
                    </div>
                    </div>
                    <div>
                    <button class="btn btn-outline-primary btn-sm d-block w-100" @click="productTemplate.data.imagesUrl.push('')"
                    v-if="productTemplate.data.imagesUrl.length === 0 || productTemplate.data.imagesUrl[productTemplate.data.imagesUrl.length -1] !== ''">
                        新增圖片
                    </button>
                    </div>
                </div>
                <div class="col-sm-8">
                    <div class="mb-3">
                        <label for="title" class="form-label">標題</label>
                        <input id="title" type="text" class="form-control" placeholder="請輸入標題" v-model="productTemplate.data.title">
                    </div>

                    <div class="row">
                        <div class="mb-3 col-md-6">
                            <label for="category" class="form-label">分類</label>
                            <input id="category" type="text" class="form-control" placeholder="請輸入分類" v-model="productTemplate.data.category">
                        </div>
                        <div class="mb-3 col-md-6">
                            <label for="price" class="form-label">單位</label>
                            <input id="unit" type="text" class="form-control" placeholder="請輸入單位" v-model="productTemplate.data.unit" >
                        </div>
                    </div>

                    <div class="row">
                        <div class="mb-3 col-md-6">
                            <label for="origin_price" class="form-label">原價</label>
                            <input id="origin_price" type="number" min="0" class="form-control"
                                placeholder="請輸入原價" v-model.number="productTemplate.data.origin_price" oninput="value=value.replace(/[^\\d]/g,'')">
                        </div>
                        <div class="mb-3 col-md-6">
                            <label for="price" class="form-label">售價</label>
                            <input id="price" type="number" min="0" class="form-control"
                                placeholder="請輸入售價" v-model.number="productTemplate.data.price" oninput="value=value.replace(/[^\\d]/g,'')">
                        </div>
                    </div>
                    <hr>

                    <div class="mb-3">
                        <label for="description" class="form-label">產品描述</label>
                        <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述" v-model="productTemplate.data.description">
        </textarea>
                    </div>
                    <div class="mb-3">
                        <label for="content" class="form-label">說明內容</label>
                        <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容" v-model="productTemplate.data.content">
        </textarea>
                    </div>
                    <div class="mb-3">
                        <div class="form-check">
                            <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1"
                                :false-value="0" v-model="productTemplate.data.is_enabled" chceked>
                            <label class="form-check-label" for="is_enabled">是否啟用</label>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <div class="modal-footer">
            <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                取消
            </button>
            <button type="button" class="btn btn-primary" @click="editProduct">
                確認
            </button>
        </div>
    </div>
    </div>`,
    props: ["productTemplate","modalStatus","productId"],
    methods: {
        editProduct() {

            let method = "";
            this.modalStatus === "new" ? method = "post" : method = "put";

            axios[method](`${apiUrl}/v2/api/${apiPath}/admin/product/${this.productId}`,this.productTemplate)
                .then(res => {
                    this.$emit("refresh")
                    this.$emit("closeModal","edit")
                    alert(res.data.message)
                })
                .catch(err => {
                    alert(err.data.message)
                })
        }
    }
}