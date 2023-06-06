<template>
    <div class="d-flex flex-column w-100 h-100 ps-2 pe-2">
        <div>
            <sort-stocks-menu @sort-stocks="updateSearchValue" @get-by-category-id="getProductsByCategoryId"
                @get-by-sub-category-id="getProductsBySubCategoryId" @get-all="getProducts" />
        </div>
        <div class="overflow-scroll">
            <stocks-items-table v-model:items="filteredStocksItems" />
        </div>
    </div>
</template >

<script>
import SortStocksMenu from '@/components/StocksComponents/SortStocksMenu.vue';
import StocksItemsTable from '@/components/StocksComponents/StocksItemsTable.vue';

export default {
    name: "stock-page",
    components: { SortStocksMenu, StocksItemsTable },
    data() {
        return {
            stocksItems: null,
            searchValue: null,
        }
    },
    computed: {
        filteredStocksItems() {
            if (!this.searchValue) {
                return this.stocksItems;
            }
            let search = this.searchValue.toLowerCase();
            return this.stocksItems.filter(stock =>
                Object.values(stock).some(
                    stockValue =>
                        stockValue !== null &&
                        stockValue !== undefined &&
                        stockValue.toString().toLowerCase().includes(search)
                )
            );
        }
    },
    methods: {
        updateSearchValue(value) {
            this.searchValue = value;
        },
        async getProducts() {
            this.stocksItems = await this.$api.getProducts()
        },
        async getProductsByCategoryId(vlue) {
            this.stocksItems = await this.$api.getProductsByCategoryId(vlue)
        },
        async getProductsBySubCategoryId(vlue) {
            this.stocksItems = await this.$api.getProductsBySubCategoryId(vlue)
        }
    },
    mounted() {
        this.getProducts()
    }
}
</script>

<style scoped></style>