let time, hr, min, sec, date, weatherText, mth, yr, currentIp, fontSize;
let timeFontSize = 100;
let timeFontColor = "#0d0";
let dateFontSize = 42;
let dateFontColor = "yellow";
let weatherFontSize = 30;
let weatherFontColor = "white";

// 3000 api request per day limit
let weatherApi = `https://free-api.heweather.net/s6/weather/now?key=aa4830b337fc44f3943cce78a84ebcf7&location=`;
const getIpApi = "https://api.ipify.org?format=json";

async function setup() {
  // GET CURRENT LOCATION IP 
  await httpGet(getIpApi, 'json', false, function (response) {
    currentIp = response.ip;
  }, function (err) {
    alert('ip error', err);
  });
  weatherApi += currentIp
  // GET LOCATION WEATHER BY IP
  await httpGet(weatherApi, 'json', false, function (response) {
    const res = response.HeWeather6[0]
    weatherText = `${res.basic.location}, ${res.basic.admin_area}, ${res.now.tmp}˚`
  }, function () {
    alert('weather error')
  })
  timeFontSize = Math.round((12/window.innerWidth)*4000);
  dateFontSize = Math.round((12/window.innerWidth)*1660);
  weatherFontSize = Math.round((12/window.innerWidth)*1200);
  createCanvas(window.innerWidth, window.innerHeight,);
  setInterval(increaseSecond, 1000);
}

function draw() {
  background(0);
  fill(timeFontColor);
  textAlign(CENTER);
  textSize(timeFontSize);
  textStyle(BOLD);
  text(nf(hr, 2, 0) + ':' + nf(mint, 2, 0) + ':' + nf(sec, 2, 0), width / 2, height / 2);
  textSize(dateFontSize);
  fill(dateFontColor);
  text(mth + ' ' + date + ', ' + yr, width / 2, height / 2 + 64);
  textSize(weatherFontSize);
  fill(weatherFontColor)
  text(weatherText, width / 2, height / 2 + 128);
}

function increaseSecond() {
  // auto add seconds
  sec++;
  if (sec >= 60) {
    sec = 0;
    mint++;
  }
  if (mint >= 60) {
    mint = 0;
    hr++;
  }
  if (hr >= 24) {
    window.location.reload();
  }
}

function preload() {
  hr = hour();
  mint = minute();
  sec = second();
  if (month() == 1) {
    mth = 'Jan.';
  } else if (month() == 2) {
    mth = 'Feb.';
  } else if (month() == 3) {
    mth = 'Mar.';
  } else if (month() == 4) {
    mth = 'Apr.';
  } else if (month() == 5) {
    mth = 'May.';
  } else if (month() == 6) {
    mth = 'Jun.';
  } else if (month() == 7) {
    mth = 'Jul.';
  } else if (month() == 8) {
    mth = 'Aug.';
  } else if (month() == 9) {
    mth = 'Sep.';
  } else if (month() == 10) {
    mth = 'Oct.';
  } else if (month() == 11) {
    mth = 'Nov.';
  } else if (month() == 12) {
    mth = 'Dec.';
  }
  if (day() == 11 || day() == 12) {
    date = day() + 'th';
  } else if (day() % 10 == 1) {
    date = day() + 'st';
  } else if (day() % 10 == 2) {
    date = day() + 'nd';
  } else {
    date = day() + 'th';
  }
  yr = year();
}