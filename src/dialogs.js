console.log("dialogs")
class dialogs {
    constructor(scene) {
      this.scene = scene;
      this._createDlgBox();
      this.isActive=false;
      this.onComplete = null;

      var txt_cfg = {font: "15px Arial",fill: "#FFFFFF", align: "center"};
      this.scene.alternatives  = [];
      for (let i=0; i<5; i++){
          var t0 = this.scene.add.text(0, 0, "", txt_cfg)
          this.scene.alternatives.push(t0)
      }
    }

    _calcWindowSize(){
        var w_height = this.scene.sys.game.config.height;
        var w_width = this.scene.sys.game.config.width;
        var zoom = this.scene.cameras.main.zoom
      
        var x = w_width/2;
        var y = w_height/2 + 0.3*w_height/zoom;
        var h = w_height*0.3;
        var w = w_width - (32 * 8);
        w = w/zoom;
        h = h/zoom;

        return {x, y, w, h}
    }

    _createDlgBox() {

      var wsz = this._calcWindowSize()

      this.wnd = this.scene.add.rectangle(wsz.x, wsz.y, wsz.w, wsz.h, 0x303030);
      this.wnd.setStrokeStyle(2, 0x907748);  
      this.wnd.setScrollFactor(0);
      this.wnd.setOrigin(0.5, 0.5);
    
      this.dlgTxt = this.scene.add.text(wsz.x, wsz.y, "Olá, viajante. Está em busca dos Pilares do Conhecimento? Fascinante!\nEu ouvi dizer que o caminho para um deles passa por esta região de neve... Tenha cuidado, o chão aqui não será seu amigo... :/", {
        font: wsz.h/12+"px Arial",
        fill: "#FFFFFF",
        align: "center",
        wordWrap: { width: wsz.w - (32 * 2) - 25 }
      });

      this.dlgTxt.setScrollFactor(0);
      this.dlgTxt.setOrigin(0.5, 0.5);
      this.dlgTxt.alpha=1;
      this.wnd.alpha=0.8;
      this.dlgTxt.setVisible(false);
      this.wnd.setVisible(false);

    }


    hideBox(){

      this.scene.alternatives.forEach(function(v, i, arr){
        v.setInteractive(false);
        v.setVisible(false);
      });
      this.dlgTxt.setVisible(false);
      this.wnd.setVisible(false);
      this.isActive=false;

    }

    makeQuestion(questSeq, acertou, errou) {
      
        this.isActive=true;
        var wsz = this._calcWindowSize()
        this.wnd.setPosition(wsz.x, wsz.y-wsz.h)
        this.wnd.setSize(wsz.w, 2*wsz.h)
        this.dlgTxt.setPosition(wsz.x, wsz.y-wsz.h)

        this.dlgTxt.setVisible(true);
        this.wnd.setVisible(true);
  
        this.dlgTxt.text = questSeq[0]
        var correct = questSeq[1]

       
        var vspace = wsz.h/8
        for (let i=2; i<Math.min(questSeq.length, 7); i++){
            var t0 = this.scene.alternatives[i-2]
            t0.text = questSeq[i]
            t0.setVisible(true)
            t0.setPosition(wsz.x-wsz.w*0.5+20, wsz.y+(i-6)*vspace)
            t0.setInteractive();
            t0.on('pointerover', function (pointer) {
                this.alternatives[i-2].setFill("#FFFF00");
            }, this.scene);
            t0.on('pointerout', function (pointer) {
                this.alternatives[i-2].setFill("#FFFFFF");
            }, this.scene);

            t0.setScrollFactor(0);
            t0.setOrigin(0, 0)
            if (i-2 == correct)
                t0.on('pointerdown', acertou, this.scene);
            else
                t0.on('pointerdown', errou, this.scene);
        }
      }
      
      updateDlgBox(txtSeq, txtIdx=0, onComplete=null){

        var wsz = this._calcWindowSize()
        this.wnd.setPosition(wsz.x, wsz.y)
        this.wnd.setSize(wsz.w, wsz.h)
        this.dlgTxt.setPosition(wsz.x, wsz.y)

        this.txtIdx = txtIdx;
        this.txtSeq = txtSeq;
        this.dlgTxt.text = txtSeq[txtIdx]
        this.dlgTxt.setVisible(true);
        this.wnd.setVisible(true);
        this.onComplete = onComplete;
        this.isActive=true;
      }
      
      nextDlg(){
        console.log("nextDlg", this.txtIdx)
        this.txtIdx = this.txtIdx + 1;
        if (this.txtIdx < this.txtSeq.length)
        {
            this.dlgTxt.text = this.txtSeq[this.txtIdx]
        }
        else{
          this.dlgTxt.setVisible(false);
          this.wnd.setVisible(false);
          this.isActive=false;
          if (this.onComplete != null)
          {
            this.onComplete(this.scene);
          }
        }
      }
}
      
        