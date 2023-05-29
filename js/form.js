const submitBtn = document.getElementById("submit-btn");
var errorMsgDay = document.getElementById("error-msg-day");
var errorMsgTime = document.getElementById("error-msg-time");
var date = document.getElementById("day");
var time = document.getElementById("time");

var timeCorrect = false;
var dateCorrect = false;

var timeCheking = function () {
  var currentTime = new Date();
  var selectedTime = new Date(`${date.value}T${time.value}`);

  if (dateCorrect) {
    time.disabled = false;
    if (selectedTime.getHours() < 10 || selectedTime.getHours() >= 20) {
      errorMsgTime.innerHTML = "Not available at selected time.<br>";
      submitBtn.disabled = true;
      timeCorrect = false;
      time.classList.add("error-visible");
      time.classList.remove("not-error-visible");
      return;
    } else {
      errorMsgTime.innerHTML = "";
      submitBtn.disabled = false;
      timeCorrect = true;
      time.classList.remove("error-visible");
      time.classList.add("not-error-visible");
      return;
    }
  } else {
    errorMsgTime.innerHTML = "";
    submitBtn.disabled = true;
    time.disabled = true;
    time.classList.remove("error-visible");
    time.classList.remove("not-error-visible");
  }
};

var dayCheking = function () {
  var enterdDay = Math.floor(new Date(date.value).getTime() / 86_400_000);
  var currentDate = Math.floor(new Date().getTime() / 86_400_000);
  var dayOfWeek = new Date(date.value).getDay();

  if (date.value == "") {
    errorMsgDay.innerHTML = "Please select a day.<br>";
    submitBtn.disabled = true;
    time.disabled = true;
    dateCorrect = false;
    date.classList.add("error-visible");
    date.classList.remove("not-error-visible");
    timeCheking();
    return;
  } else if (enterdDay < currentDate) {
    errorMsgDay.innerHTML = "Selected date has already passed.<br>";
    submitBtn.disabled = true;
    time.disabled = true;
    dateCorrect = false;
    date.classList.add("error-visible");
    date.classList.remove("not-error-visible");
    timeCheking();
    return;
  } else if (dayOfWeek == 0 || dayOfWeek == 6) {
    errorMsgDay.innerHTML = "kiosk is Closed on weekends.<br>";
    submitBtn.disabled = true;
    time.disabled = true;
    dateCorrect = false;
    date.classList.add("error-visible");
    date.classList.remove("not-error-visible");
    timeCheking();
    return;
  } else if (enterdDay == currentDate) {
    var selectedTime = new Date(`${date.value}T${time.value}`);
    if (selectedTime.getHours() >= 20) {
      errorMsgDay.innerHTML = "Not available today.<br>";
      submitBtn.disabled = true;
      time.disabled = true;
      dateCorrect = false;
      timeCorrect = false;
      date.classList.add("error-visible");
      date.classList.remove("not-error-visible");
      timeCheking();
      return;
    } else {
      errorMsgDay.innerHTML = "";
      date.classList.remove("error-visible");
      date.classList.add("not-error-visible");
      dateCorrect = true;
      time.disabled = false;
      timeCheking();
      return;
    }
  } else {
    errorMsgDay.innerHTML = "";
    date.classList.remove("error-visible");
    date.classList.add("not-error-visible");
    dateCorrect = true;
    time.disabled = false;
    timeCheking();
    return;
  }
};

{
  var d = new Date();

  var hours = d.getHours();
  var minutes = d.getMinutes();

  var year = d.getFullYear();
  var month = ("0" + (d.getMonth() + 1)).slice(-2);
  var day = ("0" + d.getDate()).slice(-2);
  var today = year + "-" + month + "-" + day;

  date.value = today;
  time.value = `${hours.toString().padStart(2, "0")}:${minutes
    .toString()
    .padStart(2, "0")}`;
  dayCheking();
}

date.addEventListener("change", dayCheking);
time.addEventListener("change", timeCheking);
