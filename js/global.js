/*
 * ATTENTION: The "eval" devtool has been used (maybe by default in mode: "development").
 * This devtool is neither made for production nor for readable output files.
 * It uses "eval()" calls to create a separate source file in the browser devtools.
 * If you are trying to read the output file, select a different devtool (https://webpack.js.org/configuration/devtool/)
 * or disable the default devtool with "devtool: false".
 * If you are looking for production-ready output files, see mode: "production" (https://webpack.js.org/configuration/mode/).
 */
/******/ (() => { // webpackBootstrap
/******/ 	var __webpack_modules__ = ({

/***/ "./js/script.js":
/*!**********************!*\
  !*** ./js/script.js ***!
  \**********************/
/***/ (() => {

eval("// Цены за кубический метр в зависимости от типа и длины материала\r\nconst prices = {\r\n    'Сырой': {\r\n        '3000': 7400,\r\n        '4000': 7400,\r\n        '4500': 7400,\r\n        '6000': 7400,\r\n        '7000': 12800,\r\n        '8000': 13800\r\n    },\r\n    'Сухой': {\r\n        '3000': 9300,\r\n        '4000': 9300,\r\n        '4500': 9300,\r\n        '6000': 9300,\r\n        '7000': 15100,\r\n        '8000': 16100\r\n    }\r\n};\r\n\r\n// Цены за антисептическую обработку\r\nconst antisepticPrices = {\r\n    'none': 0,\r\n    'BIO': 1000,\r\n    'OgneBio': 2000\r\n};\r\n\r\nfunction calculate() {\r\n    // Получаем значения из полей ввода\r\n    var material = document.getElementById('material').value;\r\n    var thickness = parseFloat(document.getElementById('thickness').value) / 1000; // Переводим в метры\r\n    var width = parseFloat(document.getElementById('width').value) / 1000; // Переводим в метры\r\n    var lengthValue = document.getElementById('length').value; // Получаем выбранную длину\r\n    var length = parseFloat(lengthValue) / 1000; // Переводим в метры\r\n    var quantity = parseFloat(document.getElementById('quantity').value) || 0;\r\n    var volumeMpInput = parseFloat(document.getElementById('volume_mp').value) || 0;\r\n    var volumeM3Input = parseFloat(document.getElementById('volume_m3').value) || 0;\r\n    var antisepticType = document.getElementById('antiseptic').value;\r\n    var quantityInput = document.getElementById('quantity').value;\r\n\r\n    // Проверяем, сколько полей заполнено\r\n    var inputCount = [quantityInput, volumeMpInput, volumeM3Input].filter(value => value).length;\r\n\r\n    // Если заполнено более одного поля, показываем предупреждение\r\n    if (inputCount > 1) {\r\n        showModal('Пожалуйста, заполните только одно поле: \"Кол-во шт.\", \"Объем м/п\" или \"Объем (м³)\".');\r\n        return; // Прерываем выполнение функции\r\n    }\r\n\r\n    // Определяем цену в зависимости от типа и длины\r\n    var pricePerCubicMeter = prices[material][lengthValue];\r\n\r\n    // Расчетные переменные\r\n    var totalVolume;\r\n    var volumeMp;\r\n    var volumePerPiece;\r\n\r\n    // Расчёт на основе введённого количества штук\r\n    if (quantity > 0) {\r\n        volumePerPiece = thickness * width * length;\r\n        totalVolume = volumePerPiece * quantity;\r\n        volumeMp = length * quantity;\r\n    }\r\n    // Расчёт на основе введённого объема м/п\r\n    else if (volumeMpInput > 0) {\r\n        totalVolume = volumeMpInput * thickness * width;\r\n        quantity = volumeMpInput / length;\r\n        volumeMp = volumeMpInput;\r\n    }\r\n    // Расчёт на основе введённого объема м³\r\n    else if (volumeM3Input > 0) {\r\n        totalVolume = volumeM3Input;\r\n        volumeMp = totalVolume / (thickness * width);\r\n        quantity = totalVolume / (thickness * width * length);\r\n    }\r\n\r\n    // Расчет цены за метр погонный и за штуку\r\n    var pricePerMeter = pricePerCubicMeter * thickness * width;\r\n    var pricePerPiece = pricePerMeter * length;\r\n\r\n    // Определяем стоимость антисептика\r\n    var antisepticPrice = antisepticPrices[antisepticType];\r\n    var antisepticCost = totalVolume * antisepticPrice;\r\n\r\n    // Расчет общей стоимости с учетом антисептика\r\n    var totalPrice = totalVolume * pricePerCubicMeter + antisepticCost;\r\n\r\n    // Проверяем, был ли сделан хотя бы один расчёт\r\n    if (!totalVolume) {\r\n        showModal('Введите количество штук, объем м/п или объем м³ для расчёта.');\r\n        return; // Прерываем функцию, если нечего расчитывать\r\n    }\r\n\r\n    // Создание новой строки в таблице результатов\r\n    var resultsTableBody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];\r\n    var newRow = resultsTableBody.insertRow();\r\n\r\n    // Форматирование размера для отображения\r\n    var sizeDisplay = `${(thickness * 1000).toFixed(0)}x${(width * 1000).toFixed(0)}x${lengthValue}`;\r\n\r\n    // Заполнение новой строки таблицы данными\r\n    newRow.innerHTML = `\r\n    <td>${material}</td>\r\n    <td>${sizeDisplay}</td>\r\n    <td>${quantity.toFixed(2)}</td>\r\n    <td>${volumeMp.toFixed(3)}</td>\r\n    <td>${totalVolume.toFixed(3)}</td>\r\n    <td>${pricePerMeter.toFixed(2)}</td>\r\n    <td>${pricePerPiece.toFixed(2)}</td>\r\n    <td>${pricePerCubicMeter.toFixed(2)}</td>\r\n    <td>${totalPrice.toFixed(2)}</td>\r\n    <td>${antisepticType !== 'none' ? antisepticType : 'Нет'}</td>\r\n    `;\r\n\r\n    // Добавляем кнопку удаления\r\n    var deleteCell = newRow.insertCell();\r\n    var deleteButton = document.createElement('button');\r\n    deleteButton.textContent = 'Удалить';\r\n    deleteButton.addEventListener('click', function() {\r\n        resultsTableBody.deleteRow(newRow.rowIndex - 1);\r\n    });\r\n    deleteCell.appendChild(deleteButton);\r\n\r\n    updateTotals();\r\n}\r\n\r\nfunction updateTotals() {\r\n    var totalVolume = 0;\r\n    var totalCost = 0;\r\n    var rows = document.getElementById('resultsTable').getElementsByTagName('tbody')[0].rows;\r\n\r\n    for (var i = 0; i < rows.length; i++) {\r\n        totalVolume += parseFloat(rows[i].cells[4].textContent) || 0;\r\n        totalCost += parseFloat(rows[i].cells[8].textContent) || 0;\r\n    }\r\n\r\n    document.getElementById('totalVolume').textContent = totalVolume.toFixed(3);\r\n    document.getElementById('totalCost').textContent = totalCost.toFixed(2);\r\n}\r\n\r\n// Обработчики событий для кнопок\r\n\r\ndocument.addEventListener('DOMContentLoaded', function() {\r\n    // Ваш код для установки обработчиков событий\r\n    document.getElementById('add').addEventListener('click', function() {\r\n        calculate();\r\n        updateTotals();\r\n    });\r\n\r\n    document.getElementById('clear').addEventListener('click', function() {\r\n        document.getElementById('resultsTable').getElementsByTagName('tbody')[0].innerHTML = \"\";\r\n        updateTotals();\r\n    });\r\n});\r\n\r\n// Функция для удаления строки из таблицы результатов и обновления итогов\r\nfunction deleteRowAndUpdateTotals(row) {\r\n    var volumeToRemove = parseFloat(row.cells[4].textContent) || 0;\r\n    var costToRemove = parseFloat(row.cells[8].textContent) || 0;\r\n\r\n    // Удаляем строку\r\n    row.remove();\r\n\r\n    // Обновляем итоговые значения\r\n    var totalVolumeElement = document.getElementById('totalVolume');\r\n    var totalCostElement = document.getElementById('totalCost');\r\n\r\n    var totalVolume = parseFloat(totalVolumeElement.textContent) - volumeToRemove;\r\n    var totalCost = parseFloat(totalCostElement.textContent) - costToRemove;\r\n\r\n    totalVolumeElement.textContent = totalVolume.toFixed(3);\r\n    totalCostElement.textContent = totalCost.toFixed(2);\r\n}\r\n\r\n// Обработчик события для кнопки \"Удалить\" в таблице результатов\r\ndocument.getElementById('resultsTable').addEventListener('click', function(event) {\r\n    if (event.target.tagName === 'BUTTON' && event.target.textContent === 'Удалить') {\r\n        // Находим родительскую строку кнопки \"Удалить\"\r\n        var row = event.target.closest('tr');\r\n\r\n        // Выполняем проверку, чтобы убедиться, что строка найдена\r\n        if (row) {\r\n            deleteRowAndUpdateTotals(row); // Вызываем функцию для удаления строки и обновления итогов\r\n        }\r\n    }\r\n});\r\n\r\n\r\n/* Functions добавление реека в таблицу\r\n--------------------------------------------- */\r\n// Функция добавления выбранных данных в основную таблицу\r\nfunction addSelectedBars() {\r\n    // Находим таблицу в модальном окне\r\n    var barsTable = document.getElementById('barsModal').querySelector('table');\r\n    var rows = barsTable.tBodies[0].rows;\r\n\r\n    // Перебираем строки таблицы в модальном окне\r\n    for (var i = 0; i < rows.length; i++) {\r\n        var row = rows[i];\r\n        var materialName = row.cells[0].textContent; // \"Наименование\"\r\n        var quantity = row.cells[4].querySelector('input[type=\"number\"]').value;\r\n        var pricePerMeter = parseFloat(row.cells[3].textContent);\r\n        var cost = pricePerMeter * quantity;\r\n\r\n        // Если чекбокс выбран и количество введено\r\n        if (quantity) {\r\n            var newRow = document.getElementById('resultsTable').tBodies[0].insertRow();\r\n            newRow.innerHTML = `\r\n                <td>${materialName}</td>\r\n                <td>${row.cells[1].textContent}</td>\r\n                <td></td>\r\n                <td>${quantity}</td>\r\n                <td></td>\r\n                <td>${pricePerMeter.toFixed(2)}</td>\r\n                <td></td>\r\n                <td></td>\r\n                <td>${cost.toFixed(2)}</td>\r\n                <td></td>\r\n            `;\r\n\r\n            // Добавляем ячейку с кнопкой удаления\r\n            var deleteCell = newRow.insertCell();\r\n            var deleteButton = document.createElement('button');\r\n            deleteButton.textContent = 'Удалить';\r\n            deleteButton.addEventListener('click', function() {\r\n                this.closest('tr').remove();\r\n                updateTotals(); // Обновляем итоговые значения после удаления строки\r\n            });\r\n            deleteCell.appendChild(deleteButton);\r\n        }\r\n    }\r\n\r\n    // Очищаем выбор чекбоксов и поля после добавления строк\r\n    document.querySelectorAll('#barsModal input[type=\"checkbox\"]').forEach(checkbox => checkbox.checked = false);\r\n    document.querySelectorAll('#barsModal input[type=\"number\"]').forEach(input => input.value = '');\r\n\r\n    // Обновляем итоговые значения после добавления строки\r\n    updateTotals();\r\n}\r\n\r\n// Добавляем обработчик клика на кнопку \"Добавить\" в модальном окне\r\nvar addBarsButtons = document.getElementById('barsModal').querySelectorAll('.addBars');\r\naddBarsButtons.forEach(function(button) {\r\n    button.addEventListener('click', function() {\r\n        addSelectedBars();\r\n    });\r\n});\r\n\r\n// Функция для изменения текста кнопки на иконку и обратно\r\nfunction toggleButtonLoading(button) {\r\n    const originalText = button.innerHTML; // Сохраняем исходный текст кнопки\r\n    button.innerHTML = '<i class=\"fa fa-check\"></i>'; // Заменяем текст на иконку (пример использует Font Awesome)\r\n\r\n    // Возвращаем исходный текст кнопки через 2 секунды\r\n    setTimeout(() => {\r\n        button.innerHTML = originalText;\r\n    }, 1000);\r\n}\r\n\r\n// Назначаем обработчик событий на кнопку\r\ndocument.querySelectorAll('.addBars').forEach(button => {\r\n    button.addEventListener('click', function() {\r\n        addSelectedBars(); // Вызываем основную функцию добавления\r\n        toggleButtonLoading(this); // Изменяем текст кнопки на иконку загрузки\r\n    });\r\n});\r\n\r\n// Объявление функции updateTotals() здесь или в другом месте скрипта...\r\n\r\n// Drag and Drops\r\n// Drag and Drop для .modal-content\r\nvar modalContent = document.querySelector(\"#barsModal .modal-content\"); // Элемент для перетаскивания\r\n\r\n// Инициализация переменных для координат\r\nvar active = false;\r\nvar currentX;\r\nvar currentY;\r\nvar initialX;\r\nvar initialY;\r\nvar xOffset = 0;\r\nvar yOffset = 0;\r\n\r\n// Обработчик события нажатия кнопки мыши\r\nmodalContent.onmousedown = dragStart;\r\n\r\n// Обработчики событий мыши\r\ndocument.addEventListener(\"mouseup\", dragEnd, false);\r\ndocument.addEventListener(\"mousemove\", drag, false);\r\n\r\n// Функция для начала перетаскивания\r\nfunction dragStart(e) {\r\n    initialX = e.clientX - xOffset;\r\n    initialY = e.clientY - yOffset;\r\n\r\n    if (e.target === modalContent) {\r\n        active = true; // Активируем перетаскивание\r\n    }\r\n}\r\n\r\n// Функция для окончания перетаскивания\r\nfunction dragEnd(e) {\r\n    initialX = currentX;\r\n    initialY = currentY;\r\n    active = false; // Деактивируем перетаскивание\r\n}\r\n\r\n// Функция для перетаскивания\r\nfunction drag(e) {\r\n    if (active) {\r\n        e.preventDefault();\r\n\r\n        currentX = e.clientX - initialX;\r\n        currentY = e.clientY - initialY;\r\n\r\n        xOffset = currentX;\r\n        yOffset = currentY;\r\n\r\n        // Установка новой позиции элемента\r\n        setTranslate(currentX, currentY, modalContent);\r\n    }\r\n}\r\n\r\n// Установка позиции элемента\r\nfunction setTranslate(xPos, yPos, el) {\r\n    el.style.transform = \"translate3d(\" + xPos + \"px, \" + yPos + \"px, 0)\";\r\n}\r\n\r\n// Закрытие модального окна только при нажатии на крестик\r\nvar closeModalButton = document.querySelector(\".close\"); // Предполагаем, что у вас есть элемент с классом close\r\ncloseModalButton.onclick = function() {\r\n    modalContent.parentNode.style.display = \"none\";\r\n};\r\n\r\n\r\n\r\n/* Functions Export Exel\r\n--------------------------------------------- */\r\ndocument.getElementById('export').addEventListener('click', function() {\r\n    var tableBody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];\r\n    // Проверяем, есть ли строки в теле таблицы\r\n    if (tableBody.rows.length === 0) {\r\n        showModal('Нет данных для экспорта.');\r\n        return; // Прерываем выполнение, если таблица пуста\r\n    }\r\n\r\n    // Создаём рабочую книгу\r\n    var wb = XLSX.utils.book_new();\r\n\r\n    // Находим таблицу результатов и клонируем её для экспорта\r\n    var exportTable = document.getElementById('resultsTable').cloneNode(true);\r\n\r\n    // Удаляем кнопки удаления, если они есть\r\n    Array.from(exportTable.querySelectorAll('button')).forEach(button => button.parentNode.removeChild(button));\r\n\r\n    // Используем утилиту SheetJS для преобразования таблицы в лист данных\r\n    var ws = XLSX.utils.table_to_sheet(exportTable);\r\n\r\n    // Добавляем лист данных в рабочую книгу\r\n    XLSX.utils.book_append_sheet(wb, ws, \"Results\");\r\n\r\n    // Генерируем файл Excel и инициируем его скачивание\r\n    XLSX.writeFile(wb, \"Results.xlsx\");\r\n});\r\n\r\n\r\n/* POPUP с ошибками\r\n--------------------------------------------- */\r\nvar modal = document.getElementById(\"errorModal\");\r\n\r\n// Получаем элемент <span>, который закрывает модальное окно\r\nvar span = document.getElementsByClassName(\"close\")[0];\r\n\r\n// Функция для отображения модального окна с текстом сообщения\r\nfunction showModal(message) {\r\n    var modalText = document.getElementById(\"modalText\");\r\n    modalText.textContent = message; // Установить текст в модальное окно\r\n    modal.style.display = \"block\"; // Показать модальное окно\r\n}\r\n\r\n// Когда пользователь кликает на <span> (x), закрыть модальное окно\r\nspan.onclick = function() {\r\n    modal.style.display = \"none\";\r\n}\r\n\r\n// Когда пользователь кликает в любом месте за пределами модального окна, закрыть его\r\nwindow.onclick = function(event) {\r\n    if (event.target == modal) {\r\n        modal.style.display = \"none\";\r\n    }\r\n}\r\n\r\n/* POPUP с выбором реек\r\n--------------------------------------------- */\r\nvar barsModal = document.getElementById('barsModal');\r\n\r\n// Получаем кнопку, которая открывает модальное окно\r\nvar barsBtn = document.getElementById('bars');\r\n\r\n// Получаем элемент <span> (x), который закрывает модальное окно\r\nvar span = barsModal.getElementsByClassName('close')[0];\r\n\r\n// Когда пользователь кликает на кнопку, открыть модальное окно\r\nbarsBtn.onclick = function() {\r\n    barsModal.style.display = \"block\";\r\n}\r\n\r\n// Когда пользователь кликает на <span> (x), закрыть модальное окно\r\nspan.onclick = function() {\r\n    barsModal.style.display = \"none\";\r\n}\r\n\r\n// Когда пользователь кликает в любом месте за пределами модального окна, закрыть его\r\n// window.onclick = function(event) {\r\n//     if (event.target == barsModal) {\r\n//         barsModal.style.display = \"none\";\r\n//     }\r\n// }\r\n\r\n\n\n//# sourceURL=webpack://board-calculate/./js/script.js?");

/***/ })

/******/ 	});
/************************************************************************/
/******/ 	
/******/ 	// startup
/******/ 	// Load entry module and return exports
/******/ 	// This entry module can't be inlined because the eval devtool is used.
/******/ 	var __webpack_exports__ = {};
/******/ 	__webpack_modules__["./js/script.js"]();
/******/ 	
/******/ })()
;