<template>
    <div class="create_visitor_form">
        <div class="d-flex justify-content-end">
            <MyButton :cls="'btn_second'" @click="createVisitor()">
                Сохранить
            </MyButton>
        </div>
        <MyInput v-model:modelValue="visitor.name" :label="'Имя:'" />
        <MyInput v-model:modelValue="visitor.lastname" :label="'Фамилия:'" />
        <MyInput v-model:modelValue="visitor.numberPhone" :label="'Номер телефона:'" />
        <MySelect :label="'Тариф:'" v-model:modelValue="visitor.tariffId" :options="$store.state.tariffs"></MySelect>
        <MyInput v-model:modelValue="visitor.deposit" v-if="mode === 'createBooking'" :label="'Депонент:'" />
        <MyInput v-model:modelValue="visitor.deponent" v-if="mode === 'createBooking'" :label="'Депозит:'" />
</div>
</template>

<script>
import MyButton from '@/components/UI/MyButton.vue';
import MyInput from '@/components/UI/MyInput.vue';
import MySelect from '@/components/UI/MySelect.vue';
export default {
    name: "create-visitor-vue",
    components: { MyInput, MyButton, MySelect },
    props: {
        mode: {
            type: String,
            default: ''
        },
        sessionId: {
            type: Number,
            default: null
        }
    },
    data() {
        return {
            visitor: {
                name: '',
                lastname: '',
                numberPhone: '',
                deposit: null,
                deponent: null,
                status: '',
                tariffId: null,
                status: 0
            },
        };
    },
    methods: {
        createVisitor() {
            if (this.mode !== 'createBooking') {
                this.visitor.status = 0
                // console.log(this.visitor);
                this.$api.createVisitor(this.visitor, this.sessionId).then((data) => {
                    this.$emit('visitorCreated', data)
                    this.$emit('close')
                })
            } else {
                console.log(this.mode);
                console.log(this.visitor);
                // $emit('visitorCreated',this.visitor)
                // $emit('close')
                // Если createBooking то просто emit visitorCreated с visitor 
            }

        }
    }
}
</script>

<style scoped></style>