export default {
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
            path: 'fred8196',
            delModal: ''
        }
    },
    methods: {
        deleteProduct() {
            axios.delete(`${this.url}api/${this.path}/admin/product/${this.tempProduct.id}`)
                .then(res => {
                    if (res.data.success) {
                        alert(res.data.message);
                        this.closeModal();
                        this.$emit("get-product", this.page.current_page);
                    } else {
                        alert(res.data.message)
                    }
                }).catch(err => {
                    console.log(err);
                })
        },
        openModal() {
            this.delModal.show();
        },
        closeModal() {
            this.delModal.hide();
        },
    },
    mounted() {
        this.delModal = new bootstrap.Modal(this.$refs.delProductModal);
    }
}