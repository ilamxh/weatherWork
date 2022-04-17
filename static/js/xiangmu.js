let clients = document.documentElement.clientHeight;
let weatherWrap = document.getElementById("weatherWrap");
weatherWrap.style.height = clients + "px";
const Ajax = (method, url, data) => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open(method, url, true);
    xhr.send(data);
    xhr.onreadystatechange = () => {
      if (xhr.readyState == 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status == 304) {
          let res = JSON.parse(xhr.response);
          resolve(res);
        } else {
          reject("请求失败");
        }
      }
    };
  });
};

// 使用async和await来处理异步请求

const btn = document.querySelector(".btn2");
const beforebtn = document.createElement("div");
const messageDiv = document.getElementById("messageDiv");
beforebtn.className = "beforebtn";
weatherWrap.appendChild(beforebtn);

btn.addEventListener("click", (e) => {
  const fun = async () => {
    try {
      const cityText = document.querySelector(".cityText").value;
      const cityname = cityText;
      const res = await Ajax(
        `get`,
        `https://www.yiketianqi.com/free/day?appid=83957451&appsecret=3Mu5wnsE&unescape=1&city=${cityname}`
      );
      const { city, cityid, tem, wea, win, win_speed } = res;
      const diDianText = document.getElementById("diDianText");
      const showDiv = document.getElementById("showDiv");
      const todayWeather = document.getElementById("todayWeather");
      const today = document.createElement("div");
      const airnumber = document.createElement("div");
      const cloudText = document.createElement("div");
      const windText = document.createElement("div");
      const tips = document.createElement("div");
      const souSuo = document.querySelector(".souSuo");
      const history = document.getElementById("history");
      const historyitem = document.createElement("div");
      const historyitem1 = document.getElementsByClassName("hischild");
      for (let item of historyitem1) {
        console.log(item.innerText)
        if (item.innerText ==city) {
          history.removeChild(item);
        }
       
      }
      historyitem.innerText = city;
      history.style.opacity = "0";
      history.appendChild(historyitem);
      historyitem.className = "hischild";

      showDiv.removeChild(souSuo);
      today.className = "today";
      airnumber.className = "airnumber";
      cloudText.className = "cloudText";
      windText.className = "windText";
      tips.className = "tips";
      showDiv.appendChild(today);
      today.appendChild(airnumber);
      today.appendChild(cloudText);
      today.appendChild(windText);
      today.appendChild(tips);
      airnumber.innerHTML = tem + "<sup>℃</sup>";
      diDianText.innerText = cityText;
      cloudText.innerText = wea;
      windText.innerText = win + win_speed;
      messageDiv.style.color = "white";
      todayWeather.style.color = "#B8BBDE";
      if (wea == "晴") {
        tips.innerText = "大晴天，快出去晒晒太阳";
      } else if (wea == "多云") {
        tips.innerText = "太阳还在偷懒";
      } else {
        tips.innerText = "会下雨哦，出门记得带伞";
      }
      const lifeNumber = document.getElementById("lifeNumber");
      lifeNumber.addEventListener("click", (e) => {
        const fun1 = async () => {
          try {
            const _cityid = cityid;
            console.log(_cityid);
            const res = await Ajax(
              `get`,
              `https://devapi.qweather.com/v7/indices/1d?location=${_cityid}&key=85a21a2ffe2f4b7bbd7d1ec74b2d2328&type=1,2,3,4`
            );
            const { daily } = res;
            const sevenDay = document.querySelector(".sevenDay");
            const today = document.querySelector(".today");
            const lifelist1 = document.querySelector(".life-list");
            if (sevenDay && sevenDay.length != 0) {
              showDiv.removeChild(sevenDay);
            } else if (today && today.length != 0) {
              showDiv.removeChild(today);
            } else if (lifelist1 && lifelist1.length != 0) {
              showDiv.removeChild(lifelist1);
            }
            const lifelist = document.createElement("div");
            lifelist.className = "life-list";
            showDiv.appendChild(lifelist);
            for (let item of daily) {
              const { name, category, text } = item;
              const itemBox = document.createElement("div");
              const itemBoxItem1 = document.createElement("div");
              const itemBoxItem2 = document.createElement("div");
              const itemBoxItem3 = document.createElement("div");
              afterWeather.style.color = "white";
              todayWeather.style.color = "white";
              lifeNumber.style.color = "#B8BBDE";
              itemBox.className = "item";
              lifelist.appendChild(itemBox);
              itemBox.appendChild(itemBoxItem1);
              itemBox.appendChild(itemBoxItem2);
              itemBox.appendChild(itemBoxItem3);
              itemBoxItem3.className = "itemBoxItem3";
              itemBoxItem2.className = "itemBoxItem2";
              itemBoxItem1.className = "itemBoxItem1";
              itemBoxItem1.innerText = name;
              itemBoxItem2.innerText = category;
              itemBoxItem3.innerText = text;
            }
            lifelist.style.backgroundColor = "rgba(252, 220, 220, 0.6)";
            const itemBox = document.querySelectorAll(".item");
            for (i = 0; i <= itemBox.length; i++) {
              itemBox[i];
            }
            itemBox[0].classList.add("afteritem1");
            itemBox[1].classList.add("afteritem2");
            itemBox[2].classList.add("afteritem3");
            itemBox[3].classList.add("afteritem4");
            console.log(res);
          } catch (error) {
            console.log(error);
          }
        };
        fun1();
      });
      afterWeather.addEventListener("click", (e) => {
        const fun2 = async () => {
          try {
            const res = await Ajax(
              `get`,
              `https://www.yiketianqi.com/free/week?unescape=1&appid=43834881&appsecret=Emv7nmNO`
            );
            const { data } = res;
            const sevenDay = document.createElement("div");
            const today = document.querySelector(".today");
            const lifelist = document.querySelector(".life-list");
            const sevenDay1 = document.querySelector(".sevenDay");
            if (today && today.length != 0) {
              showDiv.removeChild(today);
            } else if (lifelist && lifelist.length != 0) {
              showDiv.removeChild(lifelist);
            } else if (sevenDay1 && sevenDay1.length != 0) {
              showDiv.removeChild(sevenDay1);
            }
            sevenDay.className = "sevenDay";
            showDiv.appendChild(sevenDay);
            let nowtime = new Date();
            let todaytime = nowtime.getDay();
            for (let item of data) {
              const { wea, tem_day, tem_night, date } = item;
              const dayTem = document.createElement("div");
              const temNight = document.createElement("div");
              const weaDiv = document.createElement("div");
              const temDay = document.createElement("div");
              todayWeather.style.color = "white";
              lifeNumber.style.color = "white";
              afterWeather.style.color = "#B8BBDE";
              dayTem.className = "dayTem";
              let daynow = new Date(date);
              day = daynow.getDate();
              weekday = daynow.getDay();
              sevenDay.appendChild(dayTem);
              dayTem.appendChild(temNight);
              dayTem.appendChild(weaDiv);
              dayTem.appendChild(temDay);
              weaDiv.innerText = wea;
              temDay.innerText = tem_day + "/" + tem_night;
              if (weekday == 0) {
                temNight.innerText = day + "日" + "(" + "星期一" + ")";
              } else if (weekday == 1) {
                temNight.innerText = day + "日" + "(" + "星期二" + ")";
              } else if (weekday == 2) {
                temNight.innerText = day + "日" + "(" + "星期三" + ")";
              } else if (weekday == 3) {
                temNight.innerText = day + "日" + "(" + "星期四" + ")";
              } else if (weekday == 4) {
                temNight.innerText = day + "日" + "(" + "星期五" + ")";
              } else if (weekday == 5) {
                temNight.innerText = day + "日" + "(" + "星期六" + ")";
              } else if (weekday == 6) {
                temNight.innerText = day + "日" + "(" + "星期天" + ")";
              }
              if (weekday == todaytime) {
                temNight.innerText = day + "日" + "(" + "今天" + ")";
              } else if (weekday > 0 && weekday == todaytime + 1) {
                temNight.innerText = day + "日" + "(" + "明天" + ")";
              } else if (weekday == 0 && todaytime == 6) {
                temNight.innerText = day + "日" + "(" + "明天" + ")";
              }
            }
            console.log(res);
          } catch (error) {
            console.log(error);
          }
        };
        fun2();
      });
      todayWeather.addEventListener("click", (e) => {
        showDiv.innerHTML = "";
        const cityname1 = document.querySelector("#diDianText");
        const fun3 = async () => {
          try {
            const res = await Ajax(
              `get`,
              `https://www.yiketianqi.com/free/day?appid=83957451&appsecret=3Mu5wnsE&unescape=1&city=${cityname1}`
            );
            const diDianText = document.getElementById("diDianText");
            const showDiv = document.getElementById("showDiv");
            const todayWeather = document.getElementById("todayWeather");
            const today = document.createElement("div");
            const airnumber = document.createElement("div");
            const cloudText = document.createElement("div");
            const windText = document.createElement("div");
            const tips = document.createElement("div");
            afterWeather.style.color = "white";
            todayWeather.style.color = "#B8BBDE";
            lifeNumber.style.color = "white";
            const sevenDay = document.querySelector(".sevenDay");
            const lifelist = document.querySelector(".life-list");
            const today1 = document.querySelector(".today");
            if (sevenDay && sevenDay.length != 0) {
              showDiv.removeChild(sevenDay);
            } else if (lifelist && lifelist.length != 0) {
              showDiv.removeChild(lifelist);
            } else if (today1 && today1.length != 0) {
              showDiv.removeChild(today1);
            }
            today.className = "today";
            airnumber.className = "airnumber";
            cloudText.className = "cloudText";
            windText.className = "windText";
            tips.className = "tips";
            showDiv.appendChild(today);
            today.appendChild(airnumber);
            today.appendChild(cloudText);
            today.appendChild(windText);
            today.appendChild(tips);
            airnumber.innerHTML = tem + "<sup>℃</sup>";
            diDianText.innerText = cityText;
            cloudText.innerText = wea;
            windText.innerText = win + win_speed;
            todayWeather.style.color = "#B8BBDE";
            if (wea == "晴") {
              tips.innerText = "大晴天，快出去晒晒太阳";
            } else if (wea == "多云") {
              tips.innerText = "太阳还在偷懒";
            } else {
              tips.innerText = "会下雨哦，出门记得带伞";
            }
            console.log(res);
          } catch (error) {
            console.log(error);
          }
        };
        fun3();
      });
      console.log(res);
      console.log("成功");
    } catch (error) {
      console.log(error);
    }
  };
  beforebtn.addEventListener("click", (e) => {
    const today = document.querySelector(".today");
    const sevenDay = document.querySelector(".sevenDay");
    const lifelist = document.querySelector(".life-list");
    const souSuo1 = document.querySelector(".souSuo");
    if (today && today.length != 0) {
      showDiv.removeChild(today);
    } else if (sevenDay && sevenDay.length != 0) {
      showDiv.removeChild(sevenDay);
    } else if (lifelist && lifelist.length != 0) {
      showDiv.removeChild(lifelist);
    } else if (souSuo1 && souSuo1.length != 0) {
      showDiv.removeChild(souSuo1);
    }
    const souSuo = document.createElement("div");
    const input1 = document.createElement("input");
    const btn1 = document.createElement("button");
    souSuo.className = "souSuo";
    showDiv.appendChild(souSuo);
    souSuo.appendChild(input1);
    souSuo.appendChild(btn1);
    input1.placeholder = "请输入您要搜索的城市...";
    input1.type = "text";
    input1.className = "cityText";
    btn1.type = "submit";
    btn1.className = ".btn2";
    btn1.addEventListener("click", (e) => {
      fun();
    });

    const input = document.getElementsByTagName("input")[0];
    input.addEventListener("click", (e) => {
      const history = document.getElementById("history");
      history.style.opacity = "1";
      history.className = "history1";
      history.addEventListener("click", (e) => {
       history.removeChild(e.target.parentNode)
      });
      const historyitem1 = document.getElementsByClassName("hischild");
      for (let item of historyitem1) {
        const x = document.createElement("span");
        item.appendChild(x);
        
      }
    });
  });
  fun();
});
