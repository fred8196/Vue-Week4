//ES Module匯入pagination.modal元件
import pagination from '../components/pagination.js';
import userProductModal from '../components/userProductModal.js'
import delProductModal from '../components/delProductModal.js'

const url = 'https://vue3-course-api.hexschool.io/';
const path = 'fred8196';

Vue.createApp({
    data() {
        return {
            productData: [],
            isNew: false,
            tempProduct: {
                imagesUrl: []
            },
            pagination: {}
        }
    },
    components: {
        pagination,
        userProductModal,
        delProductModal
    },
    methods: {
        getProduct(page = 1) {
            axios.get(`${url}api/${path}/admin/products?page=${page}`)
                .then(res => {
                    if (res.data.success) {
                        this.productData = res.data.products
                        this.pagination = res.data.pagination
                    }
                }).catch(err => {
                    console.log(err);
                })
        },
        checkLogin() {
            axios.post(`${url}api/user/check`)
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
                this.$refs.pModal.openModal();
            } else if (status == 'edit') {
                this.tempProduct = {
                    ...item,
                }
                this.isNew = false
                this.$refs.pModal.openModal();
            } else if (status == 'delete') {
                this.tempProduct = {
                    ...item,
                }
                this.$refs.dModal.openModal();
            }
        }
    },
    mounted() {
        const token = document.cookie.replace(/(?:(?:^|.*;\s*)hexToken\s*\=\s*([^;]*).*$)|^.*$/, "$1");
        axios.defaults.headers.common['Authorization'] = token;
        this.checkLogin();
    },
}).mount('#app')