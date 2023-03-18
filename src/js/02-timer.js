import flatpickr from 'flatpickr';
import 'flatpickr/dist/flatpickr.min.css';

// Получаем элементы интерфейса
const datetimePicker = document.querySelector('#datetime-picker');
const startButton = document.querySelector('[data-start]');
const daysValue = document.querySelector('[data-days]');
const hoursValue = document.querySelector('[data-hours]');
const minutesValue = document.querySelector('[data-minutes]');
const secondsValue = document.querySelector('[data-seconds]');

// Настройки для flatpickr
const options = {
  enableTime: true,
  time_24hr: true,
  defaultDate: new Date(),
  minuteIncrement: 1,
  onClose(selectedDates) {
    // Получаем выбранную пользователем дату
    const selectedDate = selectedDates[0];

    // Если выбранная дата в прошлом, выводим сообщение об ошибке
    if (selectedDate < new Date()) {
      window.alert('Please choose a date in the future');
      return;
    }

    // Делаем кнопку "Start" активной
    startButton.disabled = false;

    // Обработчик события на кнопку "Start"
    startButton.addEventListener('click', function () {
      startTimer(selectedDate);
    });
  },
};

// Инициализируем flatpickr на поле datetimePicker
flatpickr(datetimePicker, options);

// Функция запуска таймера
function startTimer(selectedDate) {
  // Получаем текущую дату и время
  const currentDate = new Date();

  // Вычисляем разницу между выбранной датой и текущей датой в миллисекундах
  const diff = selectedDate.getTime() - currentDate.getTime();

  // Если выбранная дата уже прошла, выходим из функции
  if (diff <= 0) {
    return;
  }

  // Разбиваем разницу на дни, часы, минуты и секунды
  let seconds = Math.floor(diff / 1000);
  let minutes = Math.floor(seconds / 60);
  let hours = Math.floor(minutes / 60);
  const days = Math.floor(hours / 24);

  // Функция форматирования значений времени
  function formatValue(value) {
    return value.toString().padStart(2, '0');
  }

  // Отображаем полученные значения на экране
  daysValue.innerText = formatValue(days);
  hoursValue.innerText = formatValue(hours % 24);
  minutesValue.innerText = formatValue(minutes % 60);
  secondsValue.innerText = formatValue(seconds % 60);

  // Обновляем значения каждую секунду
  setTimeout(() => {
    startTimer(selectedDate);
  }, 1000);
}
