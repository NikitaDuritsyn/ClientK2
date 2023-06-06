<template>
    <tr>
        <th scope="row">{{ item.title }}</th>
        <td class="text-center">{{ item.quantity }}</td>
        <td class="text-center">{{ item.purchase_price }}</td>
        <td class="text-center">{{ (item.best_before_date) ? 'до' + new Date(item.best_before_date).toLocaleString() : 'нет'
        }}</td>
        <td class="text-center">{{ new Date(item.date).toLocaleString() }}</td>
    </tr>
</template>

<script>
export default {
    name: 'stocks-item',
    props: ['item'],
    data() { return {} },
}
</script>