export const global_objects = {
    // sendNotificationAboutStartSession(sessionData) {
    //     console.log('Notification');
    //     // Запрос разрешения на отправку уведомлений
    //     Notification.requestPermission().then(function (permission) {
    //         console.log('Notification');
    //         if (permission === "granted") {
    //             const audio = new Audio(require('@/assets/audioTriggers/alarm-clock.mp3'));
    //             audio.play();

    //             const notificationOptions = {
    //                 body: `Началась сессия: ${sessionData}`,
    //                 icon: "", // Опционально: указать путь к иконке уведомления
    //                 silent: false, // Опционально: воспроизводить звуковое оповещение (если true, уведомление будет без звука)
    //             };

    //             // Создание и отправка уведомления
    //             const notification = new Notification("Оповещение", notificationOptions);
    //             setTimeout(() => notification.close(), 5000); // Закрыть уведомление через 5 секунд
    //         }
    //     });
    // },

    formatPhoneForShow: (phone) => {
        if (phone) {
            phone = phone.replace(/^(\d)(\d{3})(\d{3})(\d{2})(\d{2})$/, '+$1 ($2) $3-$4-$5');
        }
        return phone
    },
    formatPhone: (phone) => {
        phone = phone.replace(/\D/g, '');
        if (phone.length > 11) {
            phone = phone.slice(0, 11);
        }
        if (/^89/.test(phone)) {
            phone = '7' + phone.slice(1);
        }
        return phone;
    },
    phoneInputFormatter: () => {
        var phoneInputs = document.querySelectorAll('input[data-tel-input]');
        var getInputNumbersValue = function (input) {
            // Return stripped input value — just numbers
            return input.value.replace(/\D/g, '');
        }

        var onPhonePaste = function (e) {
            var input = e.target,
                inputNumbersValue = getInputNumbersValue(input);
            var pasted = e.clipboardData || window.clipboardData;
            if (pasted) {
                var pastedText = pasted.getData('Text');
                if (/\D/g.test(pastedText)) {
                    // Attempt to paste non-numeric symbol — remove all non-numeric symbols,
                    // formatting will be in onPhoneInput handler
                    input.value = inputNumbersValue;
                    return;
                }
            }
        }

        var onPhoneInput = function (e) {
            var input = e.target,
                inputNumbersValue = getInputNumbersValue(input),
                selectionStart = input.selectionStart,
                formattedInputValue = "";

            if (!inputNumbersValue) {
                return input.value = "";
            }

            if (input.value.length != selectionStart) {
                // Editing in the middle of input, not last symbol
                if (e.data && /\D/g.test(e.data)) {
                    // Attempt to input non-numeric symbol
                    input.value = inputNumbersValue;
                }
                return;
            }

            if (["7", "8", "9"].indexOf(inputNumbersValue[0]) > -1) {
                if (inputNumbersValue[0] == "9") inputNumbersValue = "7" + inputNumbersValue;
                var firstSymbols = (inputNumbersValue[0] == "8") ? "8" : "+7";
                formattedInputValue = input.value = firstSymbols + " ";
                if (inputNumbersValue.length > 1) {
                    formattedInputValue += '(' + inputNumbersValue.substring(1, 4);
                }
                if (inputNumbersValue.length >= 5) {
                    formattedInputValue += ') ' + inputNumbersValue.substring(4, 7);
                }
                if (inputNumbersValue.length >= 8) {
                    formattedInputValue += '-' + inputNumbersValue.substring(7, 9);
                }
                if (inputNumbersValue.length >= 10) {
                    formattedInputValue += '-' + inputNumbersValue.substring(9, 11);
                }
            } else {
                formattedInputValue = '+' + inputNumbersValue.substring(0, 16);
            }
            input.value = formattedInputValue;
        }
        var onPhoneKeyDown = function (e) {
            var inputValue = e.target.value.replace(/\D/g, '');
            if (e.keyCode == 8 && inputValue.length == 1) {
                e.target.value = "";
            }
        }
        for (var phoneInput of phoneInputs) {
            phoneInput.addEventListener('keydown', onPhoneKeyDown);
            phoneInput.addEventListener('input', onPhoneInput, false);
            phoneInput.addEventListener('paste', onPhonePaste, false);
        }
    },
}