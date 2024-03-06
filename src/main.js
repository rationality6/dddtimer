class dddTimer {
  constructor() {
    // set localStorage
    if (localStorage.getItem("totalVoteCount") == null) {
      localStorage.setItem("totalVoteCount", 0);
    }

    // DOMs
    this.insertFloatdddTimerDiv();
    this.insertDddTimerDiv();
    this.insertDddTimerMillisecondsDiv();
    this.insertDddTimerCountdownDiv();
    // statics
    this.insertDddTimerTotalCountDiv();
    this.insertDddTimerRankDiv();

    this.checkAndUpdateRank();

    // event listeners
    this.setEventListeners();

    // update
    this.setIntervalForUpdateBaseTimerMilliseconds(10);
  }

  insertFloatdddTimerDiv() {
    let block_to_insert = document.createElement("div");
    block_to_insert.innerHTML = "dddTimer 💙";
    block_to_insert.classList = "whenSmallScreen";
    block_to_insert.id = "dddTimerFloatDiv";
    document.body.appendChild(block_to_insert);
  }

  insertDddTimerDiv() {
    let block_to_insert = document.createElement("span");
    block_to_insert.innerHTML = "timer";
    block_to_insert.id = "dddTimerDiv";
    document.querySelector("#dddTimerFloatDiv").appendChild(block_to_insert);
  }

  insertDddTimerMillisecondsDiv() {
    let space_block_to_insert = document.createElement("span");
    space_block_to_insert.innerHTML = " ";
    space_block_to_insert.id = "space";
    document
      .querySelector("#dddTimerFloatDiv")
      .appendChild(space_block_to_insert);

    let block_to_insert = document.createElement("span");
    block_to_insert.innerHTML = "milliseconds";
    block_to_insert.id = "dddTimerDivMilliseconds";
    document.querySelector("#dddTimerFloatDiv").appendChild(block_to_insert);
  }

  insertDddTimerCountdownDiv() {
    let block_to_insert = document.createElement("div");
    block_to_insert.innerHTML = "";
    block_to_insert.id = "dddTimerCountdownDiv";
    document.querySelector("#dddTimerFloatDiv").appendChild(block_to_insert);
  }

  insertDddTimerTotalCountDiv() {
    let block_to_insert = document.createElement("span");
    const total = localStorage.getItem("totalVoteCount");
    block_to_insert.innerHTML = `총: ${total} `;
    block_to_insert.id = "dddTimerTotalCountDiv";
    document.querySelector("#dddTimerFloatDiv").appendChild(block_to_insert);
  }

  insertDddTimerRankDiv() {
    let block_to_insert = document.createElement("span");
    block_to_insert.innerHTML = `🇰🇷🪖`;
    block_to_insert.id = "dddTimerRankDiv";
    document.querySelector("#dddTimerFloatDiv").appendChild(block_to_insert);
  }

  checkAndUpdateRank() {
    const totalCount = localStorage.getItem("totalVoteCount");

    let rank = "이병";
    if (5 <= totalCount && totalCount < 20) {
      rank = "일병";
    } else if (20 <= totalCount && totalCount < 50) {
      rank = "상병";
    } else if (50 <= totalCount && totalCount < 100) {
      rank = "병장";
    }

    document.querySelector("#dddTimerRankDiv").innerHTML = `🇰🇷🪖 ${rank}`;
  }

  setIntervalForUpdateBaseTimerMilliseconds(refreshRate) {
    setInterval(() => {
      this.updateBaseTimerMilliseconds();
    }, refreshRate);
  }

  updateBaseTimerMilliseconds() {
    this.timerBase = new Date();

    document.getElementById("dddTimerDiv").innerHTML =
      this.timerBase.toLocaleTimeString("ko-KR");

    document.getElementById("dddTimerDivMilliseconds").innerHTML =
      this.timerBase.getMilliseconds();
  }

  naverVote() {
    if (!(this.countDonwInterval === undefined)) return;

    let audio = new Audio(chrome.runtime.getURL("./assets/coin_get.mp3"));
    audio.play();

    // fix scope todo later
    this.setEventListeners();

    this.timeSaved = new Date().getTime();
    let afterTenseconds = this.timeSaved + 10000;

    document.querySelector("#dddTimerCountdownDiv").innerHTML = "카운트 시작";

    this.countDonwInterval = setInterval(() => {
      this.timeSaved = new Date();
      let countDown = Math.ceil((afterTenseconds - this.timeSaved) * 0.001);

      // update
      document.getElementById("dddTimerCountdownDiv").innerHTML = countDown;

      // clear
      if (countDown <= 0) {
        document.querySelector("#dddTimerCountdownDiv").innerHTML = "";

        let audio = new Audio(chrome.runtime.getURL("./assets/clear.mp3"));
        audio.play();

        const addedcount = parseInt(localStorage.getItem("totalVoteCount")) + 1;
        localStorage.setItem("totalVoteCount", addedcount);
        const total = localStorage.getItem("totalVoteCount");
        document.querySelector(
          "#dddTimerTotalCountDiv"
        ).innerHTML = `총: ${total} `;

        this.checkAndUpdateRank();

        clearInterval(this.countDonwInterval);
        this.countDonwInterval = undefined;
      }
    }, 1000);
  }

  setEventListeners() {
    setTimeout(() => {
      const recommend_selecters = document.querySelectorAll(
        ".u_cbox_area a.u_cbox_btn_recomm"
      );
      const unrecommend_selecters = document.querySelectorAll(
        ".u_cbox_area a.u_cbox_btn_unrecomm"
      );

      let getParentAnchor = (element) => {
        while (element !== null) {
          if (element.tagName && element.tagName.toUpperCase() === "A") {
            return element;
          }
          element = element.parentNode;
        }
        return null;
      };

      recommend_selecters.forEach((el) =>
        el.addEventListener(
          "click",
          (e) => {
            let anchor = getParentAnchor(e.target);
            if (anchor !== null) {
              dddTimerInstance.naverVote();
            }
          },
          false
        )
      );

      unrecommend_selecters.forEach((el) =>
        el.addEventListener(
          "click",
          (e) => {
            let anchor = getParentAnchor(e.target);
            if (anchor !== null) {
              dddTimerInstance.naverVote();
            }
          },
          false
        )
      );
    }, 1000);
  }
}

class Rank {}

const dddTimerInstance = new dddTimer();
console.log("dddtimer loaded");
