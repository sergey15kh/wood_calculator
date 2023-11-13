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

eval("// Цены за кубический метр в зависимости от типа и длины материала\r\nconst prices = {\r\n    'Сырой': {\r\n        '3000': 7400,\r\n        '4000': 7400,\r\n        '4500': 7400,\r\n        '6000': 7400,\r\n        '7000': 12800,\r\n        '8000': 13800\r\n    },\r\n    'Сухой': {\r\n        '3000': 9300,\r\n        '4000': 9300,\r\n        '4500': 9300,\r\n        '6000': 9300,\r\n        '7000': 15100,\r\n        '8000': 16100\r\n    }\r\n};\r\n\r\n// Цены за антисептическую обработку\r\nconst antisepticPrices = {\r\n    'none': 0,\r\n    'BIO': 1000,\r\n    'OgneBio': 2000\r\n};\r\n\r\nfunction calculate() {\r\n    // Получаем значения из полей ввода\r\n    var material = document.getElementById('material').value;\r\n    var thickness = parseFloat(document.getElementById('thickness').value) / 1000; // Переводим в метры\r\n    var width = parseFloat(document.getElementById('width').value) / 1000; // Переводим в метры\r\n    var lengthValue = document.getElementById('length').value; // Получаем выбранную длину\r\n    var length = parseFloat(lengthValue) / 1000; // Переводим в метры\r\n    var quantity = parseFloat(document.getElementById('quantity').value) || 0;\r\n    var volumeMpInput = parseFloat(document.getElementById('volume_mp').value) || 0;\r\n    var volumeM3Input = parseFloat(document.getElementById('volume_m3').value) || 0;\r\n    var antisepticType = document.getElementById('antiseptic').value;\r\n\r\n    // Определяем цену в зависимости от типа и длины\r\n    var pricePerCubicMeter = prices[material][lengthValue];\r\n\r\n    // Расчетные переменные\r\n    var totalVolume;\r\n    var volumeMp;\r\n    var volumePerPiece;\r\n\r\n    // Расчёт на основе введённого количества штук\r\n    if (quantity > 0) {\r\n        volumePerPiece = thickness * width * length;\r\n        totalVolume = volumePerPiece * quantity;\r\n        volumeMp = length * quantity;\r\n    }\r\n    // Расчёт на основе введённого объема м/п\r\n    else if (volumeMpInput > 0) {\r\n        totalVolume = volumeMpInput * thickness * width;\r\n        quantity = volumeMpInput / length;\r\n        volumeMp = volumeMpInput;\r\n    }\r\n    // Расчёт на основе введённого объема м³\r\n    else if (volumeM3Input > 0) {\r\n        totalVolume = volumeM3Input;\r\n        volumeMp = totalVolume / (thickness * width);\r\n        quantity = totalVolume / (thickness * width * length);\r\n    }\r\n\r\n    // Расчет цены за метр погонный и за штуку\r\n    var pricePerMeter = pricePerCubicMeter * thickness * width;\r\n    var pricePerPiece = pricePerMeter * length;\r\n\r\n    // Определяем стоимость антисептика\r\n    var antisepticPrice = antisepticPrices[antisepticType];\r\n    var antisepticCost = totalVolume * antisepticPrice;\r\n\r\n    // Расчет общей стоимости с учетом антисептика\r\n    var totalPrice = totalVolume * pricePerCubicMeter + antisepticCost;\r\n\r\n    // Проверяем, был ли сделан хотя бы один расчёт\r\n    if (!totalVolume) {\r\n        alert('Введите количество штук, объем м/п или объем м³ для расчёта.');\r\n        return; // Прерываем функцию, если нечего расчитывать\r\n    }\r\n\r\n    // Создание новой строки в таблице результатов\r\n    var resultsTableBody = document.getElementById('resultsTable').getElementsByTagName('tbody')[0];\r\n    var newRow = resultsTableBody.insertRow();\r\n\r\n    // Форматирование размера для отображения\r\n    var sizeDisplay = `${(thickness * 1000).toFixed(0)}x${(width * 1000).toFixed(0)}x${lengthValue}`;\r\n\r\n    // Заполнение новой строки таблицы данными\r\n    newRow.innerHTML = `\r\n    <td>${material}</td>\r\n    <td>${sizeDisplay}</td>\r\n    <td>${quantity.toFixed(2)}</td>\r\n    <td>${volumeMp.toFixed(3)}</td>\r\n    <td>${totalVolume.toFixed(3)}</td>\r\n    <td>${pricePerMeter.toFixed(2)}</td>\r\n    <td>${pricePerPiece.toFixed(2)}</td>\r\n    <td>${pricePerCubicMeter.toFixed(2)}</td>\r\n    <td>${totalPrice.toFixed(2)}</td>\r\n    <td>${antisepticType !== 'none' ? antisepticType : 'Нет'}</td>\r\n    `;\r\n\r\n    // Добавляем кнопку удаления\r\n    var deleteCell = newRow.insertCell();\r\n    var deleteButton = document.createElement('button');\r\n    deleteButton.textContent = 'Удалить';\r\n    deleteButton.addEventListener('click', function() {\r\n        resultsTableBody.deleteRow(newRow.rowIndex - 1);\r\n    });\r\n    deleteCell.appendChild(deleteButton);\r\n\r\n    updateTotals();\r\n}\r\n\r\nfunction updateTotals() {\r\n    var totalVolume = 0;\r\n    var totalCost = 0;\r\n    var rows = document.getElementById('resultsTable').getElementsByTagName('tbody')[0].rows;\r\n\r\n    for (var i = 0; i < rows.length; i++) {\r\n        totalVolume += parseFloat(rows[i].cells[4].textContent) || 0;\r\n        totalCost += parseFloat(rows[i].cells[8].textContent) || 0;\r\n    }\r\n\r\n    document.getElementById('totalVolume').textContent = totalVolume.toFixed(3);\r\n    document.getElementById('totalCost').textContent = totalCost.toFixed(2);\r\n}\r\n\r\n// Обработчики событий для кнопок\r\ndocument.getElementById('add').addEventListener('click', calculate);\r\ndocument.getElementById('clear').addEventListener('click', function() {\r\n    document.getElementById('resultsTable').getElementsByTagName('tbody')[0].innerHTML = \"\";\r\n    // Очистка всех полей ввода\r\n    document.getElementById('material').selectedIndex = 0;\r\n    document.getElementById('thickness').selectedIndex = 0;\r\n    document.getElementById('width').selectedIndex = 0;\r\n    document.getElementById('length').selectedIndex = 0;\r\n    document.getElementById('quantity').value = '';\r\n    document.getElementById('volume_mp').value = '';\r\n    document.getElementById('volume_m3').value = '';\r\n    document.getElementById('antiseptic').value = 'none'; // Изменил на 'value' с 'checked'\r\n\r\n    updateTotals();\r\n});\r\n\n\n//# sourceURL=webpack://board-calculate/./js/script.js?");

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