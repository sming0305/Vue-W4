export default {
    template: `<nav aria-label="Page navigation example">
    <ul class="pagination">
        <li class="page-item" :class="{disabled: pagination.current_page === 1}">
            <a class="page-link" href="#" aria-label="Previous" @click.prevent="pageControl(pagination.current_page - 1)">
                <span aria-hidden="true">&laquo;</span>
            </a>
        </li>
        <li class="page-item" v-for="i in pagination.total_pages" :key="i"><a class="page-link" href="#" @click.prevent="pageControl(i)">{{i}}</a></li>
        <li class="page-item" :class="{disabled: pagination.current_page === pagination.total_pages}">
            <a class="page-link" href="#" aria-label="Next" @click.prevent="pageControl(pagination.current_page + 1)">
                <span aria-hidden="true">&raquo;</span>
            </a>
        </li>
    </ul>
</nav>`,
    props: ["pagination"],
    methods: {
        pageControl(page) {
            this.$emit("refresh",page)
        }
    }
}