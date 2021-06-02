
Vue.createApp({
    data() {
        return {
            url: 'https://vue3-course-api.hexschool.io/',
            path: 'fred8196',
            user: {
                username: '',
                password: ''
            }
        }
    },
    methods: {
        userLogin() {
            if (this.user.username == '' || this.user.password == '') {
                alert('請輸入帳號及密碼')
                return;
            }
            axios.post(`${this.url}admin/signin`, this.user)
                .then(res => {
                    if (res.data.success) {
                        alert(res.data.message);
                        const token = res.data.token;
                        const expired = res.data.expired;
                        document.cookie = `hexToken=${token}; expires=${new Date(expired)}`;
                        window.location = 'admin.html';
                    } else {
                        alert(res.data.message);
                        this.user.username = '';
                        this.user.password = '';
                    }
                })
                .catch(err => {
                    console.log(err);
                })
        }
    },
    created() {

    }
}).mount('#app')