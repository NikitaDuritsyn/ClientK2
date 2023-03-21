<template>
    <div class=" d-flex justify-content-center">
        <div class="visitor_form_container">
            <div class="d-flex justify-content-end">
                <MyButton :cls="'btn_second'" @click="createVisitor()">Сохранить</MyButton>
            </div>
            <MyInput class="m-auto w-100" v-model:modelValue="visitor.name" :label="'Имя:'" />
            <MySelect class="m-auto w-100" :label="'Тариф:'" v-model:modelValue="visitor.tariff_id"
                v-if="mode != 'createBooking' && mode != 'createBookingUpdate'" :options="$store.state.tariffs" />
            <MyInput class="m-auto w-100" :phone-input="true" v-model:modelValue="visitor.number_phone"
                :label="'Номер телефона:'" />
            <MyInput class="m-auto w-100" v-model:modelValue="visitor.lastname"
                :label="(visitor.number_phone?.length < 11 || !visitor.number_phone) ? 'Фамилия: нужен номер' : 'Фамилия:'"
                :disabled="(visitor.number_phone?.length < 11 || !visitor.number_phone) ? true : false" />
            <MyInput class="m-auto w-100" :type="'number'" v-model:modelValue="visitor.deponent.value"
                v-if="mode === 'createBooking' || mode === 'createBookingUpdate'"
                :label="(visitor.number_phone?.length < 11 || !visitor.number_phone) ? 'Депонент: нужен номер' : 'Депонент:'"
                :disabled="(visitor.number_phone?.length < 11 || !visitor.number_phone) ? true : false" />
            <div class="d-flex " v-if="mode === 'createBooking' || mode === 'createBookingUpdate'">
                <MyInput class="m-auto w-100" :type="'number'" v-model:modelValue="visitor.deposit.value"
                    :label="(visitor.number_phone?.length < 11 || !visitor.number_phone) ? 'Депозит: нужен номер' : 'Депозит:'"
                    :disabled="(visitor.number_phone?.length < 11 || !visitor.number_phone) ? true : false" />
                <div>
                    <MySelect :label="'Тип оплаты'" class="m-auto w-100"
                        :options="$store.state.paymentTypes.map(type => { return { id: type.id, title: type.type } })"
                        v-model:model-value="visitor.deposit.paymet_type_id"
                        :disabled="(visitor.number_phone?.length < 11 || !visitor.number_phone) ? true : false" />
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
        sessionTariff: { type: Number, default: null },
        visitorObject: { type: Object, default: {} },
    },
    data() {
        return {
            visitor: {
                ...this.visitorObject,
                tariff_id: this.sessionTariff,
                deposit: this.visitorObject.deposit || {},
                deponent: this.visitorObject.deponent || {},
            },
        };
    },
    methods: {
        createVisitor() {
            const vm = this
            if (vm.mode === 'createBooking' || vm.mode === 'createBookingUpdate') {
                // console.log(vm.visitor);
                if (!vm.visitor.deposit.value) {
                    vm.visitor.deposit = null
                }
                if (!vm.visitor.deponent.value) {
                    vm.visitor.deponent = null
                }
                if (!vm.visitor.number_phone || vm.visitor.number_phone?.length < 11) {
                    vm.visitor.number_phone = null
                }
                if (vm.mode === 'createBookingUpdate') {
                    // console.log(vm.mode);
                    vm.$emit('visitorUpdated', vm.visitor)
                    vm.visitor = null
                    vm.$emit('close')
                } else {
                    // console.log(vm.mode);
                    vm.$emit('visitorCreated', vm.visitor)
                    vm.visitor = null
                    vm.$emit('close')
                }
            } else {
                //Cоздаём пользователя в уже созданой брони или текущей сессии
                vm.$api.createVisitor(vm.visitor, vm.sessionId).then(() => {
                    vm.$emit('visitorCreated')
                    vm.visitor = null
                    vm.$emit('close')
                })
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