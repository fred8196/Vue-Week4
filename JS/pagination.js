export default {
    props: ['page'],
    template: "#pagination",
    methods: {
        emitPage(targetPage) {
            this.$emit('emit-page', targetPage)
        }
    }
}