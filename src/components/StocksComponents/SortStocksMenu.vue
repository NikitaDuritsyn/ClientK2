<template>
    <div class="d-flex justify-content-between align-items-end overflow-scroll">
        <div class="d-flex">
            <div class="m-2">
                <MySelect :label="'Категория'" class="maxw-fit" v-model:modelValue="selectedCategory"
                    :options="inventoryCategories" />
            </div>
            <div class="m-2">
                <MySelect :label="'ПодКатегория'" class="maxw-fit" v-model:modelValue="selectedSubCategory"
                    :options="inventorySubCategories" />
            </div>
        </div>
        <div class="m-2">
            <MyInput :label="'Поиск'" @serch="setSrotValue" :serch="true" class=" w-100 mw-100"
                v-model:modelValue="srotValue" />
        </div>
        <div class="m-2">
            <MyButton>Добавить на склад</MyButton>
        </div>
    </div>
</template>
  
<script>
import MySelect from '../UI/MySelect.vue';
import MyInput from '../UI/MyInput.vue';
import MyButton from '../UI/MyButton.vue';
export default {
    name: "sort-stocks-menu",
    components: { MySelect, MyInput, MyButton },
    emits: ['sortStocks', 'getByCategoryId', 'getBySubCategoryId', 'getAll'],
    data() {
        return {
            inventoryCategories: null,
            inventorySubCategories: null,
            srotValue: null,
            selectedCategory: 'all',
            selectedSubCategory: 'all',
        };
    },
    methods: {
        async setInventoryCategories() {
            this.inventoryCategories = await this.$api.getCategoriesInventory()
            this.inventoryCategories.unshift({ id: 'all', title: 'Все' })
        },
        async setInventorySubCategories(value) {
            if (value === 'all') {
                this.inventorySubCategories = await this.$api.getInventorySubCategories()
            } else {
                this.inventorySubCategories = await this.$api.getInventorySubCategoriesByCategoryId(value)
            }
            this.inventorySubCategories.unshift({ id: 'all', title: 'Все' })
        },
        setSrotValue() {
            this.$emit('sortStocks', this.srotValue);
            this.srotValue = null;
        }
    },
    watch: {
        selectedCategory(value) {
            if (value) {
                if (value === 'all') {
                    this.$emit('getAll')
                    this.setInventorySubCategories(value)
                } else {
                    this.setInventorySubCategories(value)
                    this.$emit('getByCategoryId', this.selectedCategory)
                }
                this.selectedSubCategory = 'all'
            }
        },
        selectedSubCategory(value) {
            if (value === 'all') {
                this.$emit(this.selectedCategory === 'all' ? 'getAll' : 'getByCategoryId', this.selectedCategory);
            } else {
                this.$emit('getBySubCategoryId', this.selectedSubCategory);
            }
        }
    },
    mounted() {
        this.setInventoryCategories()
        this.setInventorySubCategories('all')
    }
};
</script>