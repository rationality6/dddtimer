class dddTimer {
  constructor() {
    this.insertFloatdddTimerDiv();
    this.insertDddTimerDiv();
    this.insertDddTimerMillisecondsDiv();
    this.insertDddTimerCountdownDiv();

    this.setCssStyle();

    setInterval(() => {
      this.updateBaseTimer();
    }, 10);
  }

  insertFloatdddTimerDiv() {
    let block_to_insert = document.createElement("div");
    block_to_insert.innerHTML = "dddTimer 💙";
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

  updateBaseTimer() {
    this.timerBase = new Date();

    document.getElementById("dddTimerDiv").innerHTML =
      this.timerBase.toLocaleTimeString("ko-KR");

    document.getElementById("dddTimerDivMilliseconds").innerHTML =
      this.timerBase.getMilliseconds();
  }

  naverVote() {
    if (!(this.countDonwInterval === undefined)) return;

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

        // const audio = new Audio("./assets/clear.mp3");
        // audio.play();

        clearInterval(this.countDonwInterval);
        this.countDonwInterval = undefined;
      }
    }, 1000);
  }

  setCssStyle() {
    // shorthand css inserter
    const addCSS = (s) =>
      (document.head.appendChild(document.createElement("style")).innerHTML =
        s);

    let centerWidth = window.innerWidth / 2;
    addCSS(`
      #dddTimerFloatDiv {
        position: fixed;
        left: 649px;
        top: 93px;
        text-align: right;
        background-color: white;

        z-index: 9999;

        border: 1px solid blue;
        border-radius: 5px;

        padding: 5px;
      }

      #dddTimerDivMilliseconds {
        display: inline-block;
        width: 30px;
      }

      #dddTimerCountdownDiv {
        color: blue;
        font-size: 25px;
        margin: 5px
      }

    `);
  }
}

const dddTimerInstance = new dddTimer();

setTimeout(function () {
  const recommend_selecters = document.querySelectorAll(
    ".u_cbox_area a.u_cbox_btn_recomm"
  );
  const unrecommend_selecters = document.querySelectorAll(
    ".u_cbox_area a.u_cbox_btn_unrecomm"
  );

  var getParentAnchor = function (element) {
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
        var anchor = getParentAnchor(e.target);
        if (anchor !== null) {
          console.log("click");
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
        var anchor = getParentAnchor(e.target);
        if (anchor !== null) {
          console.log("click");
          dddTimerInstance.naverVote();
        }
      },
      false
    )
  );
}, 1000);

console.log("dddtimer loaded");
