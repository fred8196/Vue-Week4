//ES Module匯入pagination元件
import pagination from './pagination.js';

let productModal = '';
let delProductModal = '';

Vue.createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/',
            path: 'fred8196',
            productData: [],
            isNew: false,
            tempProduct: {
                imagesUrl: []
            },
            pagination: {}
        }
    },
    components: {
        pagination
    },
    methods: {
        getProduct(page = 1) {
            axios.get(`${this.url}api/${this.path}/admin/products?page=${page}`)
                .then(res => {
                    if (res.data.success) {
                        this.productData = res.data.products
                        this.pagination = res.data.pagination
                        console.log(this.productData);
                        console.log(this.pagination);
                    }
                }).catch(err => {
                    console.log(err);
                })
        },
        checkLogin() {
            axios.post(`${this.url}api/user/check`)
                .then(res => {
                    if (res.data.success) {
                        this.getProduct();
                    } else {
                        alert(res.data.message)
                        window.location = 'index.html'
                    }
                }).catch(err => {
                    console.log(err);
                })
        },
        openModal(status, item) {
            if (status == 'new') {
                this.tempProduct = {
                    imagesUrl: []
                };
                this.isNew = true;
                productModal.show();
            } else if (status == 'edit') {
                this.tempProduct = {
                    ...item,
                }
                this.isNew = false
                productModal.show();
            } else if (status == 'delete') {
                this.tempProduct = {
                    ...item,
                }
                delProductModal.show();
            }
        }
    },
    mounted() {
        productModal = new bootstrap.Modal(document.querySelector('#productModal'));
        delProductModal = new bootstrap.Modal(document.querySelector('#delProductModal'));
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin();
    },
})
    //建立、編輯產品元件
    .component('productModal', {
        template: `<div id="productModal" ref="productModal" class="modal fade" tabindex="-1" aria-labelledby="productModalLabel"
    aria-hidden="true">
    <div class="modal-dialog modal-xl">
        <div class="modal-content border-0">
            <div class="modal-header bg-dark text-white">
                <h5 id="productModalLabel" class="modal-title">
                    <span v-if="isNew">新增產品</span>
                    <span v-else>編輯產品</span>
                </h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div class="row">
                    <div class="col-sm-4">
                        <div class="mb-1">
                            <div class="form-group">
                                <label for="imageUrl">主要圖片</label>
                                <input type="text" class="form-control" placeholder="請輸入圖片連結"
                                    v-model.trim="tempProduct.imageUrl">
                            </div>
                            <img class="img-fluid" :src="tempProduct.imageUrl" alt="">
                        </div>
                        <div class="mb-1">多圖新增</div>
                        <div v-if="Array.isArray(tempProduct.imagesUrl)">
                            <div class="mb-1" v-for="(item, index) in tempProduct.imagesUrl" :key="index">
                                <div class="form-group">
                                    <label for="imageUrl">圖片網址</label>
                                    <input type="text" class="form-control"
                                        v-model="tempProduct.imagesUrl[index]" placeholder="請輸入圖片連結">
                                </div>
                                <img :src="item" class="img-fluid">
                            </div>
                            <div
                                v-if="!tempProduct.imagesUrl.length || tempProduct.imagesUrl[tempProduct.imagesUrl.length - 1]">
                                <button class=" btn btn-outline-primary btn-sm d-block w-100"
                                    @click="tempProduct.imagesUrl.push('')">
                                    新增圖片
                                </button>
                            </div>
                            <div v-else>
                                <button class="btn btn-outline-danger btn-sm d-block w-100"
                                    @click="tempProduct.imagesUrl.pop()">
                                    刪除圖片
                                </button>
                            </div>
                        </div>
                        <div v-else>
                            <button class="btn btn-outline-primary btn-sm d-block w-100" @click="addImages">
                                新增圖片
                            </button>
                        </div>
                    </div>
                    <div class="col-sm-8">
                        <div class="form-group">
                            <label for="title">標題</label>
                            <input id="title" type="text" class="form-control" placeholder="請輸入標題"
                                v-model.trim="tempProduct.title">
                        </div>

                        <div class="row">
                            <div class="form-group col-md-6">
                                <label for="category">分類</label>
                                <input id="category" type="text" class="form-control" placeholder="請輸入分類"
                                    v-model.trim="tempProduct.category">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="price">單位</label>
                                <input id="unit" type="text" class="form-control" placeholder="請輸入單位"
                                    v-model.trim="tempProduct.unit">
                            </div>
                        </div>

                        <div class="row">
                            <div class="form-group col-md-6">
                                <label for="origin_price">原價</label>
                                <input id="origin_price" type="number" min="0" class="form-control"
                                    placeholder="請輸入原價" v-model.number="tempProduct.origin_price">
                            </div>
                            <div class="form-group col-md-6">
                                <label for="price">售價</label>
                                <input id="price" type="number" min="0" class="form-control" placeholder="請輸入售價"
                                    v-model.number="tempProduct.price">
                            </div>
                        </div>
                        <hr>

                        <div class="form-group">
                            <label for="description">產品描述</label>
                            <textarea id="description" type="text" class="form-control" placeholder="請輸入產品描述"
                                v-model="tempProduct.description">
            </textarea>
                        </div>
                        <div class="form-group">
                            <label for="content">說明內容</label>
                            <textarea id="description" type="text" class="form-control" placeholder="請輸入說明內容"
                                v-model="tempProduct.content">
            </textarea>
                        </div>
                        <div class="form-group">
                            <div class="form-check">
                                <input id="is_enabled" class="form-check-input" type="checkbox" :true-value="1"
                                    :false-value="0" v-model="tempProduct.is_enabled">
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
                <button type="button" class="btn btn-primary" @click='updateProduct'>
                    確認
                </button>
            </div>
        </div>
    </div>
</div>`,
        props: {
            tempProduct: {
                type: Object,
                default() {
                    return {
                        imagesUrl: []
                    }
                }
            },
            isNew: {
                type: Boolean,
                default: false
            },
            page: {
                type: Object,
                default() {
                    return {}
                }
            }
        },
        data() {
            return {
                url: 'https://vue3-course-api.hexschool.io/',
                path: 'fred8196'
            }
        },
        methods: {
            updateProduct() {
                let url = `${this.url}api/${this.path}/admin/product`;
                let httpMethod = 'post';
                if (!this.isNew) {
                    url += `/${this.tempProduct.id}`;
                    httpMethod = 'put';
                }
                axios[httpMethod](url, { data: this.tempProduct })
                    .then(res => {
                        if (res.data.success) {
                            alert(res.data.message);
                            productModal.hide();
                            this.$emit("get-product", this.page.current_page);
                        } else {
                            alert(res.data.message);
                        }
                    }).catch(err => {
                        console.log(err);
                    })
            },
            addImages() {
                this.tempProduct.imagesUrl = [];
                this.tempProduct.imagesUrl.push('');
            }
        },
    })
    //刪除產品元件
    .component('delProductModal', {
        template: `<div id="delProductModal" ref="delProductModal" class="modal fade" tabindex="-1"
        aria-labelledby="delProductModalLabel" aria-hidden="true">
        <div class="modal-dialog">
            <div class="modal-content border-0">
                <div class="modal-header bg-danger text-white">
                    <h5 id="delProductModalLabel" class="modal-title">
                        <span>刪除產品</span>
                    </h5>
                    <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                </div>
                <div class="modal-body">
                    是否刪除
                    <strong class="text-danger">{{tempProduct.title}}</strong> 商品(刪除後將無法恢復)。
                </div>
                <div class="modal-footer">
                    <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">
                        取消
                    </button>
                    <button type="button" class="btn btn-danger" @click="deleteProduct">
                        確認刪除
                    </button>
                </div>
            </div>
        </div>
    </div>`,
        props: ['tempProduct', 'page'],
        data() {
            return {
                url: 'https://vue3-course-api.hexschool.io/',
                path: 'fred8196'
            }
        },
        methods: {
            deleteProduct() {
                axios.delete(`${this.url}api/${this.path}/admin/product/${this.tempProduct.id}`)
                    .then(res => {
                        if (res.data.success) {
                            alert(res.data.message);
                            delProductModal.hide();
                            this.$emit("get-product", this.page.current_page);
                        } else {
                            alert(res.data.message)
                        }
                    }).catch(err => {
                        console.log(err);
                    })
            }
        },
    })
    .mount('#app')