class Dialogs {
  constructor(scene) {
    this.scene = scene;
    this.createDialogBox();
    this.isActive = false;
    this.onComplete = null;
    this.alternatives = [];

    const textConfig = { font: "15px Arial", fill: "#FFFFFF", align: "center" };
    for (let i = 0; i < 5; i++) {
      const text = this.scene.add.text(0, 0, "", textConfig);
      this.alternatives.push(text);
    }
  }

  _calcWindowSize() {
    const wHeight = this.scene.sys.game.config.height;
    const wWidth = this.scene.sys.game.config.width;
    const zoom = this.scene.cameras.main.zoom;
    const x = wWidth / 2;
    const y = wHeight / 2 + 0.3 * wHeight / zoom;
    const h = wHeight * 0.3 / zoom;
    const w = (wWidth - 32 * 8) / zoom;

    return { x, y, w, h };
  }

  hideBox() {
    this.alternatives.forEach((text) => {
      text.setInteractive(false);
      text.setVisible(false);
    });
    this.dlgTxt.setVisible(false);
    this.wnd.setVisible(false);
  }

  makeQuestion(questSeq, onCorrect, onIncorrect) {
    const { x, y, w, h } = this._calcWindowSize();
    this.wnd.setPosition(x, y - h);
    this.wnd.setSize(w, 2 * h);
    this.dlgTxt.setPosition(x, y - h);

    this.dlgTxt.setVisible(true);
    this.wnd.setVisible(true);

    this.dlgTxt.text = questSeq[0];
    const correctAnswerIndex = questSeq[1];

    const vspace = h / 8;
    for (let i = 2; i < Math.min(questSeq.length, 7); i++) {
      const text = this.alternatives[i - 2];
      text.text = questSeq[i];
      text.setVisible(true);
      text.setPosition(x - w * 0.5 + 20, y + (i - 6) * vspace);
      text.setInteractive();
      text.on("pointerover", () => {
        text.setFill("#FFFF00");
      });
      text.on("pointerout", () => {
        text.setFill("#FFFFFF");
      });
      text.setScrollFactor(0);
      text.setOrigin(0, 0);

      if (i - 2 === correctAnswerIndex) {
        text.on("pointerdown", onCorrect);
      } else {
        text.on("pointerdown", onIncorrect);
      }
    }
  }

  createDialogBox() {
    const { x, y, w, h } = this._calcWindowSize();

    this.wnd = this.scene.add.rectangle(x, y, w, h, 0x303030);
    this.wnd.setStrokeStyle(2, 0x907748);
    this.wnd.setScrollFactor(0);
    this.wnd.setOrigin(0.5, 0.5);

    this.dlgTxt = this.scene.add.text(
      x,
      y,
      "Está perdido?\n Não se pode atravessar o Rio das Flores Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      {
        font: h / 12 + "px Arial",
        fill: "#FFFFFF",
        align: "center",
        wordWrap
