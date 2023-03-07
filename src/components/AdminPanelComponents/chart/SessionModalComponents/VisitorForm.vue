<template>
    <div class=" d-flex justify-content-center">
        <div class="visitor_form_container">
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

            <MyInput class="m-auto w-100" :type="'number'" v-model:modelValue="visitor.deponent.value"
                v-if="mode === 'createBooking'" :label="'Депонент:'" />

            <div class="d-flex ">
                <MyInput class="m-auto w-100" :type="'number'" v-model:modelValue="visitor.deposit.value"
                    v-if="mode === 'createBooking'" :label="'Депозит:'" />
                <div>
                    <MySelect :label="'Тип оплаты'" class="m-auto w-100"
                        :options="$store.state.paymentTypes.map(type => { return { id: type.id, title: type.type } })"
                        v-model:model-value="visitor.deposit.paymet_type_id" />
                </div>
            </div>
        </div>

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
        mode: { type: String, default: '' },
        sessionId: { type: Number, default: null },
        visitorObject: { type: Object, default: {} },
    },
    data() {
        return {
            visitor: {
                ...this.visitorObject,
                deposit: this.visitorObject.deposit || {},
                deponent: this.visitorObject.deponent || {},
            },
        };
    },
    methods: {
        createVisitor() {
            if (this.mode !== 'createBooking') {
                //Cоздаём пользователя в уже созданой брони или текущей сессии
                this.$api.createVisitor(this.visitor, this.sessionId).then(() => {
                    this.$emit('visitorCreated')
                    this.visitor = null
                    this.$emit('close')
                })
            } else {
                //Cоздаём пользователя в момент создания (бронирования) сессии
                    console.log(this.visitor.deposit.value);
                if (!this.visitor.deposit.value){
                    this.visitor.deposit = null
                    console.log(this.visitor.deposit);
                }
                this.$emit('visitorCreated', this.visitor)
                this.visitor = null
                this.$emit('close')
            }

        }
    },
    mounted() {
        this.glb.phoneInputFormatter()
    }
}
</script>

<style scoped>
.visitor_form_container {
    width: 400px;
}
</style>