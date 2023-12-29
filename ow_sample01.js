function getWeather() {
  const API_KEY_WEATHER = '56410e49138f7a246d51c0ed24fcb30b';
  const URL = "https://api.openweathermap.org/data/2.5/weather?";
  const LANG = "ja";
  const cityName = document.getElementById("cityInput").value;

  if (!cityName) {
      alert("正確な都市名を入力してください");
      return;
  }

  const url = `${URL}q=${encodeURIComponent(cityName)}&appid=${API_KEY_WEATHER}&lang=${LANG}`;

  fetch(url)
      .then(response => response.json())
      .then((data) => {
        const maxTempCelsius = (data.main.temp_max - 273.15).toFixed(2);
        const minTempCelsius = (data.main.temp_min - 273.15).toFixed(2);
        const weatherIconCode = data.weather[0].icon;
        const clothingAdvice = getClothingAdvice(minTempCelsius);
        const weatherIconUrl = `https://openweathermap.org/img/wn/${weatherIconCode}.png`;

          document.getElementById("weather").innerHTML = `
              <h2>${data.name}の天気</h2>
              <p>現在の天気: ${data.weather[0].description}</p>
              <img src="${weatherIconUrl}" alt="Weather icon" />
              <p>日時: ${formatDate(data.dt)}</p>
              <p>最高気温: ${maxTempCelsius} °C</p>
              <p>最低気温: ${maxTempCelsius} °C</p>
              <p>服装のアドバイス: ${clothingAdvice}</p>
          `;
      })
      .catch(error => {
          console.error("エラーが発生しました", error);
          alert("天気情報を取得できませんでした。もう一度試してください。＊国名ではなく都市名を入力＊");
      });
}

function getClothingAdvice(tempCelsius) {
    if (tempCelsius < 0) {
        return "摂氏0度未満です！防寒着の着用がおすすめです";
    } else if (tempCelsius >= 0 && tempCelsius < 15) {
        return "何か羽織るものがあればいいでしょう";
    } else if (tempCelsius >= 15 && tempCelsius < 25) {
        return "長袖がおすすめです";
    } else {
        return "Tシャツなど涼しい恰好がおすすめです";
    }
}
function formatDate(timestamp) {
  let dateObj = new Date();
  dateObj.setTime(timestamp * 1000);
  let month = dateObj.getMonth() + 1;
  let date = dateObj.getDate();
  let hours = dateObj.getHours();
  let minutes = dateObj.getMinutes();
  return `${month}月${date}日 ${hours}時 ${minutes}分`;
}