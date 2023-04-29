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
        console.log(this.scene.sys.game.config.width, zoom)

        var x = w_width/2;
        var y = w_height/2 + 0.3*w_height/zoom;
        var h = w_height*0.3;
        var w = w_width*0.8 - (32 * 8);
        w = w/zoom;
        h = h/zoom;

        return {x, y, w, h}
    }

    _createDlgBox() {

      var wsz = this._calcWindowSize()
      console.log(wsz)
      this.wnd = this.scene.add.rectangle(wsz.x, wsz.y, wsz.w, wsz.h, 0x303030);
      this.wnd.setStrokeStyle(2, 0x907748);  
      this.wnd.setScrollFactor(0);
      //this.wnd.setOrigin(0.5, 0.5);
    
      this.dlgTxt = this.scene.add.text(wsz.x, wsz.y, "Está perdido?\n Não se pode atravessar o Rio das Flores Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.", {
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

    
      
      updateDlgBox(txtSeq, txtIdx=0, onComplete=null){


        /*
        var wsz = this._calcWindowSize()
        this.tst = this.scene.add.rectangle(wsz.x, wsz.y, 40, 20, 0xFF0000);
        this.tst.setScrollFactor(0);
        console.log('a', wsz)
        console.log('b', this.scene.cameras.main.zoom, this.scene.cameras.main.centerX, this.scene.cameras.main.scrollX)
        console.log('f', wsz.x, wsz.y, Math.floor(wsz.x))
        //this.wnd.geom.setPosition(Math.floor(wsz.x), Math.floor(wsz.y))
        //this.wnd.setPosition(Math.floor(wsz.x), Math.floor(wsz.y))
        //this.wnd.setSize(wsz.w, wsz.h)
        this.wnd.setPosition(900, 550)
        this.wnd.setSize(300, 100)

        this.wnd.setScrollFactor(0)
        this.dlgTxt.setPosition(wsz.x, wsz.y)
        //this.dlgTxt.setPosition(900, 550)
        */

        console.log('c', this.wnd)
        console.log('d', this.dlgTxt)
        

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
      
        