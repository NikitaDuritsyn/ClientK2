<template>
    <div class="table-responsive overflow-scroll">
        <table class="table .table-striped">
            <thead>
                <tr>
                    <th>Название</th>
                    <th class="text-center">Количество</th>
                    <th class="text-center">Цена</th>
                    <th class="text-center">Срок годности</th>
                    <th class="text-center">Дата закупки</th>
                </tr>
            </thead>
            <tbody>
                <stocks-item @update-user-table="$emit('updateUserTable')" v-for="item in items" :key="item.id"
                    :item="item" />
            </tbody>
        </table>
    </div>
</template>

<script>
import StocksItem from './StocksItem.vue';

export default {
    name: "stocks-items-table",
    props: ["items"],
    data() { return {}; },
    components: { StocksItem }
}
</script>

<style scoped>
.table {
    white-space: nowrap;
    color: rgb(255, 255, 255);
}
</style>