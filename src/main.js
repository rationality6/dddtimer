class DddTimer {
  constructor() {
    // set localStorage
    this.setDefaultLocalstorages();

    // float div
    this.insertFloatdddTimerDiv();

    // upper
    this.insertUpperDiv();
    this.insertFoldImages();

    // middle
    this.insertMiddleDiv();
    this.insertMainLogoName();
    this.insertDddTimerDiv();
    this.insertDddTimerMillisecondsDiv();

    // statics
    this.insertDddTimerBottomDiv();
    this.insertDddTimerRankDiv();
    this.bulletAmountImage();
    this.insertGunImage();
    this.insertDddTimerTotalCountDiv();

    // down bottom
    // this.bulletAmount();

    // 카운트 아래로
    this.insertDddTimerCountdownDiv();

    // banner
    this.rankUpBanner();
    this.rankupImage();
    this.rankupText();

    // rank
    this.rankupIconFlexBox();

    // update
    this.checkAndUpdateRank();

    // event listeners
    this.setEventListeners();
    this.setReplyEventListeners();
    this.setFoldUnfoldEventListeners();

    // update interval set
    this.setIntervalForUpdateBaseTimerMilliseconds(10);

    console.log("dddtimer loaded");
  }

  setDefaultLocalstorages() {
    if (localStorage.getItem("totalVoteCount") == null) {
      localStorage.setItem("totalVoteCount", 0);
    }
    if (localStorage.getItem("rank") == null) {
      localStorage.setItem("rank", "이병");
    }
    if (localStorage.getItem("bulletLeft") == null) {
      localStorage.setItem("bulletLeft", 50);
    }
  }

  insertFloatdddTimerDiv() {
    let block_to_insert = document.createElement("div");
    block_to_insert.classList = "whenSmallScreen";
    block_to_insert.id = "dddTimerFloatDiv";
    document.body.appendChild(block_to_insert);
  }

  insertUpperDiv() {
    let block_to_insert = document.createElement("div");
    block_to_insert.classList = "upperDiv";
    block_to_insert.id = "upperDiv";

    document.querySelector("#dddTimerFloatDiv").appendChild(block_to_insert);
  }

  insertFoldImages() {
    let img = document.createElement("img");
    img.src = chrome.runtime.getURL("assets/fold.png");
    img.id = "foldButton";
    img.classList = "foldImage hide";

    document.querySelector("#upperDiv").appendChild(img);

    let img2 = document.createElement("img");
    img2.src = chrome.runtime.getURL("assets/unfold.png");
    img2.id = "unfoldButton";
    img2.classList = "foldImage";

    document.querySelector("#upperDiv").appendChild(img2);
  }

  insertMiddleDiv() {
    let block_to_insert = document.createElement("div");
    block_to_insert.id = "dddTimerMiddleDiv";
    document.querySelector("#dddTimerFloatDiv").appendChild(block_to_insert);
  }

  insertMainLogoName() {
    let block_to_insert = document.createElement("a");
    block_to_insert.id = "mainLogo";
    block_to_insert.target = "_blank";
    block_to_insert.href =
      "https://cuddly-blossom-ef6.notion.site/a051e39f2fbe4f4f907cfe94ff4a7aaa";

    let img = document.createElement("img");
    img.src = chrome.runtime.getURL("assets/logo.png");
    img.classList = "logoImage";

    block_to_insert.appendChild(img);

    document.querySelector("#dddTimerMiddleDiv").appendChild(block_to_insert);
  }

  insertDddTimerDiv() {
    let block_to_insert = document.createElement("span");
    block_to_insert.innerHTML = "timer";
    block_to_insert.id = "dddTimerDiv";
    document.querySelector("#dddTimerMiddleDiv").appendChild(block_to_insert);
  }

  insertDddTimerMillisecondsDiv() {
    let block_to_insert = document.createElement("span");
    block_to_insert.innerHTML = "milliseconds";
    block_to_insert.id = "dddTimerDivMilliseconds";
    document.querySelector("#dddTimerMiddleDiv").appendChild(block_to_insert);
  }

  insertDddTimerCountdownDiv() {
    let block_to_insert = document.createElement("div");
    block_to_insert.innerHTML = "";
    block_to_insert.id = "dddTimerCountdownDiv";
    document.querySelector("#dddTimerFloatDiv").appendChild(block_to_insert);
  }

  insertDddTimerBottomDiv() {
    let block_to_insert = document.createElement("div");
    block_to_insert.innerHTML = "";
    block_to_insert.classList = "flexSpaceBetween";
    block_to_insert.id = "dddTimerBottomDiv";
    document.querySelector("#dddTimerFloatDiv").appendChild(block_to_insert);
  }

  insertDddTimerRankDiv() {
    let block_to_insert = document.createElement("div");
    block_to_insert.innerHTML = `🪖`;
    block_to_insert.id = "dddTimerRankDiv";
    document.querySelector("#dddTimerBottomDiv").appendChild(block_to_insert);
  }

  insertDddTimerTotalCountDiv() {
    let block_to_insert = document.createElement("div");
    const total = localStorage.getItem("totalVoteCount");
    block_to_insert.innerHTML = `총점: ${total}`;
    block_to_insert.id = "dddTimerTotalCountDiv";
    document.querySelector("#dddTimerBottomDiv").appendChild(block_to_insert);
  }

  bulletAmount() {
    let block_to_insert = document.createElement("button");
    block_to_insert.innerHTML = `재장전`;
    block_to_insert.id = "reloadButton";
    block_to_insert.addEventListener("click", () => {
      let audioReload = new Audio(chrome.runtime.getURL("./assets/reload.mp3"));
      audioReload.volume = 0.4;
      audioReload.play();
    });
    document.querySelector("#upperDiv").appendChild(block_to_insert);
  }

  bulletAmountImage() {
    let img = document.createElement("img");
    img.src = chrome.runtime.getURL("assets/bullet.png");
    img.classList = "bulletAmountImage";
    document.querySelector("#dddTimerRankDiv").innerHTML += img;
  }

  // 50발(장전)
  insertGunImage() {
    let img = document.createElement("img");
    img.src = chrome.runtime.getURL("assets/k2_idle.png");
    img.classList = "gunImage";
    document.querySelector("#dddTimerBottomDiv").appendChild(img);
  }

  // float center banner
  rankUpBanner() {
    let block_to_insert = document.createElement("div");
    block_to_insert.id = "rankUpDivBanner";
    block_to_insert.classList = "hide";
    document.body.appendChild(block_to_insert);
  }

  rankupImage() {
    let img = document.createElement("img");
    img.src = chrome.runtime.getURL("assets/rank_up.png");
    img.classList = "rankUpImage";
    document.querySelector("#rankUpDivBanner").appendChild(img);
  }

  rankupText() {
    let div = document.createElement("div");
    div.innerHTML = "주변에 공유해주세요~";
    document.querySelector("#rankUpDivBanner").appendChild(div);
  }

  rankupIconFlexBox() {
    let div = document.createElement("div");
    div.id = "rankUpIcons";
    document.querySelector("#rankUpDivBanner").appendChild(div);

    let img2 = document.createElement("img");
    img2.src = chrome.runtime.getURL("assets/social_icons/screenshot.png");
    img2.classList = "rankUpIcon";
    document.querySelector("#rankUpIcons").appendChild(img2);

    let img1 = document.createElement("img");
    img1.src = chrome.runtime.getURL("assets/social_icons/facebook.png");
    img1.classList = "rankUpIcon";
    document.querySelector("#rankUpIcons").appendChild(img1);

    let img3 = document.createElement("img");
    img3.src = chrome.runtime.getURL("assets/social_icons/x.png");
    img3.classList = "rankUpIcon";
    document.querySelector("#rankUpIcons").appendChild(img3);
  }

  rankupIcons() {
    let div = document.createElement("div");
    document.querySelector("#rankUpDivBanner").appendChild(div);
  }

  showAndHideRankUpBanner() {
    document.querySelector("#rankUpDivBanner").classList = "";

    let audioLevelUp = new Audio(
      chrome.runtime.getURL("./assets/wow_levelup_sound.mp3")
    );
    audioLevelUp.play();

    setTimeout(() => {
      this.hideRankUpBanner();
    }, 5000);
  }

  hideRankUpBanner() {
    document.querySelector("#rankUpDivBanner").classList = "hide";
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
    } else if (100 <= totalCount && totalCount < 150) {
      rank = "하사";
    } else if (150 <= totalCount && totalCount < 200) {
      rank = "중사";
    } else if (200 <= totalCount && totalCount < 300) {
      rank = "상사";
    } else if (300 <= totalCount && totalCount < 400) {
      rank = "원사";
    }

    if (rank != localStorage.getItem("rank")) {
      localStorage.setItem("rank", rank);
      this.showAndHideRankUpBanner();
    }
    document.querySelector("#dddTimerRankDiv").innerHTML = `🪖 ${rank}`;
  }

  setIntervalForUpdateBaseTimerMilliseconds(refreshRate) {
    setInterval(() => {
      this.updateBaseTimerMilliseconds();
    }, refreshRate);
  }

  playShotSound() {
    let audioShot = new Audio(chrome.runtime.getURL("./assets/shot_sound.mp3"));
    audioShot.volume = 0.5;
    audioShot.play();
  }

  playTickingSound() {
    let tickingAudio = new Audio(
      chrome.runtime.getURL("./assets/ticking3.mp3")
    );
    tickingAudio.volume = 0.5;
    tickingAudio.play();
  }

  playReloadSound() {
    let audioReload = new Audio(chrome.runtime.getURL("./assets/reload.mp3"));
    audioReload.volume = 0.4;
    audioReload.play();
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

    const gunImageDiv = document.querySelector(".gunImage");
    gunImageDiv.src = chrome.runtime.getURL("assets/k2_shot.gif");

    this.playShotSound();

    const addedcount = parseInt(localStorage.getItem("totalVoteCount")) + 1;
    localStorage.setItem("totalVoteCount", addedcount);
    const total = localStorage.getItem("totalVoteCount");
    document.querySelector(
      "#dddTimerTotalCountDiv"
    ).innerHTML = `총점: ${total} `;

    this.checkAndUpdateRank();

    this.timeSaved = new Date().getTime();
    let afterTenseconds = this.timeSaved + 10000;

    this.countDonwInterval = setInterval(() => {
      this.timeSaved = new Date();
      let countDown = Math.ceil((afterTenseconds - this.timeSaved) * 0.001);

      if (countDown == 9) {
        document.querySelector("#dddTimerCountdownDiv").innerHTML =
          "카운트 시작";
      }

      // update
      if (countDown < 9) {
        document.getElementById("dddTimerCountdownDiv").innerHTML = countDown;
      }

      if (countDown == 9) {
        this.playTickingSound();
      }

      // clear
      if (countDown <= 0) {
        document.querySelector("#dddTimerCountdownDiv").innerHTML = "";

        this.playReloadSound();

        clearInterval(this.countDonwInterval);
        this.countDonwInterval = undefined;
      }
    }, 1000);
  }

  getParentAnchor = (element) => {
    while (element !== null) {
      if (element.tagName && element.tagName.toUpperCase() === "A") {
        return element;
      }
      element = element.parentNode;
    }
    return null;
  };

  setEventListeners() {
    setTimeout(() => {
      const recommend_selecters = document.querySelectorAll(
        ".u_cbox_area a.u_cbox_btn_recomm"
      );
      const unrecommend_selecters = document.querySelectorAll(
        ".u_cbox_area a.u_cbox_btn_unrecomm"
      );

      recommend_selecters.forEach((el) =>
        el.addEventListener(
          "click",
          (e) => {
            let anchor = this.getParentAnchor(e.target);

            // cut when already voted
            if (anchor.className.includes("u_cbox_btn_recomm_on")) return;

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
            let anchor = this.getParentAnchor(e.target);

            // cut when already voted
            if (anchor.className.includes("u_cbox_btn_unrecomm_on")) return;

            if (anchor !== null) {
              dddTimerInstance.naverVote();
            }
          },
          false
        )
      );
    }, 2000);
  }

  setReplyEventListeners() {
    setTimeout(() => {
      const selecters = document.querySelectorAll(
        ".u_cbox_area a.u_cbox_btn_reply"
      );

      selecters.forEach((el) =>
        el.addEventListener(
          "click",
          (e) => {
            console.log("click");
            let anchor = this.getParentAnchor(e.target);
            if (anchor !== null) {
              this.setEventListeners();
            }
          },
          false
        )
      );
    }, 1000);
  }

  setFoldUnfoldEventListeners() {
    document.querySelector("#foldButton").addEventListener("click", () => {
      document.querySelector("#foldButton").classList.add("hide");
      document.querySelector("#unfoldButton").classList.remove("hide");

      document.querySelector("#dddTimerMiddleDiv").classList.remove("hide");
      document.querySelector("#dddTimerBottomDiv").classList.remove("hide");
      document.querySelector("#dddTimerCountdownDiv").classList.remove("hide");
    });

    document.querySelector("#unfoldButton").addEventListener("click", () => {
      document.querySelector("#foldButton").classList.remove("hide");
      document.querySelector("#unfoldButton").classList.add("hide");

      document.querySelector("#dddTimerMiddleDiv").classList.add("hide");
      document.querySelector("#dddTimerBottomDiv").classList.add("hide");
      document.querySelector("#dddTimerCountdownDiv").classList.add("hide");
    });
  }
}

const dddTimerInstance = new DddTimer();
