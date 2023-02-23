<template>
    <div class="d-flex flex-column justify-content-center">
        <div class="d-flex justify-content-end">
            <MyButton :cls="'btn_second'" @click="createVisitor()">
                Сохранить
            </MyButton>
        </div>
        <MyInput class="m-auto w-100" v-model:modelValue="visitor.name" :label="'Имя:'" />
        <MyInput class="m-auto w-100" v-model:modelValue="visitor.lastname" :label="'Фамилия:'" />
        <MyInput class="m-auto w-100" :phone-input="true" v-model:modelValue="visitor.number_phone"
            :label="'Номер телефона:'" />
        <MySelect class="m-auto w-100" :label="'Тариф:'" v-model:modelValue="visitor.tariff_id"
            :options="$store.state.tariffs"></MySelect>
        <MyInput class="m-auto w-100" :type="'number'" v-model:modelValue="visitor.deposit" v-if="mode === 'createBooking'"
            :label="'Депонент:'" />
        <MyInput class="m-auto w-100" :type="'number'" v-model:modelValue="visitor.deponent" v-if="mode === 'createBooking'"
            :label="'Депозит:'" />
    </div>
</template>

<script>
import MyButton from '@/components/UI/MyButton.vue';
import MyInput from '@/components/UI/MyInput.vue';
import MySelect from '@/components/UI/MySelect.vue';
export default {
    name: "visitor-form-vue",
    components: { MyInput, MyButton, MySelect },
    props: {
        mode: {
            type: String,
            default: ''
        },
        sessionId: {
            type: Number,
            default: null
        },
        visitorObject: {
            type: Object,
            default: {
                name: '',
                lastname: '',
                number_phone: '',
                deposit: null,//null
                deponent: null,//null
                status: '',
                tariff_id: null,
                status: 0
            }
        },
    },
    data() {
        return {
            visitor: this.visitorObject,
        };
    },
    methods: {
        createVisitor() {
            if (this.mode !== 'createBooking') {
                this.visitor.status = 0
                this.$api.createVisitor(this.visitor, this.sessionId).then((data) => {
                    this.$emit('visitorCreated')
                    this.$emit('close')
                })
            } else {
                console.log(this.visitor);
                this.$emit('visitorCreated', this.visitor)
                this.$emit('close')
            }

        }
    },
    mounted() {
        this.glb.phoneInputFormatter()
    }
}
</script>

<style scoped></style>