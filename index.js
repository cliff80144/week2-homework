import { createApp } from 'https://cdnjs.cloudflare.com/ajax/libs/vue/3.4.15/vue.esm-browser.min.js'

const url = 'https://vue3-course-api.hexschool.io/v2';
const path = 'cliffwu-vueapi';

const app = createApp({
    data() {
        return {
            // 預設存放axios送回來的資料
            products: [],
            //單一產產品細節存放資料
            tempProduct: {},
            // text: '123',
        }
    },
    methods: {
        //驗證資料
        checkAdmin() {
            const api = `${url}/api/user/check`
            axios.post(api)
                .then((res) => {
                    console.log('驗證成功');
                    // !!!!驗證成功才從這裡取得資料
                    this.getData();
                })
                .catch((err) => {
                    alert(err.response.data.message);
                    console.log('驗證失敗');
                    window.location = './login.html'//驗證失敗轉址退回
                })
        },
        //取得資料
        getData() {
            const api = `${url}/api/${path}/admin/products`;
            // console.log(api);
            axios.get(api)
                .then((res) => {
                    // console.log(res);
                    this.products = res.data.products;
                })
        },
    },
    //生命週期(初始化，可以用的全域的東西)
    mounted() {

        // console.log(text);
        //取出cookie中的token
        const token = document.cookie.replace(
            /(?:(?:^|.*;\s*)cliffToken\s*\=\s*([^;]*).*$)|^.*$/,
            "$1",
        );
        // 把cookie存在axios預設裡面，就不用重複帶入token來驗證
        axios.defaults.headers.common['Authorization'] = token;
        this.checkAdmin();//在進入頁面後呼叫驗證
    },
});
app.mount('#app')