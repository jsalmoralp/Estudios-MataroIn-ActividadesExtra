var direccion;
var velocidad;
GamePlayManager = {
    init: function() {
        game.scale.scaleMode = Phaser.ScaleManager.SHOW_ALL;
        game.scale.pageAlignHorizontally = true;
        game.scale.pageAlignVertically = true;
        
        this.flagStartGame = false;
        
        this.endGame = false;
        
        this.countOpenMouth = -1;
    },
    preload: function() {
        game.load.image('background', 'assets/images/background.png');
        game.load.spritesheet('cabeza_serpiente', 'assets/images/cabeza_serpiente.png', 1024, 1024, 0);
        game.load.spritesheet('cuerpo_serpiente', 'assets/images/cuerpo_serpiente.png', 25, 25, 0);
        
        game.load.image('explosion', 'assets/images/explosion.png');
        
        game.load.image('remi', 'assets/images/remi.png');
        game.load.image('cerezas', 'assets/images/cerezas.png');
        game.load.image('corazon', 'assets/images/corazon.png');
        
        game.load.image('rata', 'assets/images/rata.png');

        this.teclado = game.input.keyboard.createCursorKeys();
    },
    create: function() {
        velocidad = 1;
        game.input.onDown.add(this.startGame, this);
        this.cuerpos_serpiente= [];

        game.add.sprite(0,0, 'background');
        
        this.rata = game.add.sprite(500, 600, 'rata');
        
        this.cabeza_serpiente = game.add.sprite(0,0, 'cabeza_serpiente');
        this.cabeza_serpiente.frame = 0;
        this.cabeza_serpiente.x = game.width/2;
        this.cabeza_serpiente.y = game.height/2;
        this.cabeza_serpiente.anchor.setTo(0.5, 0.5);
        this.cabeza_serpiente.scale.setTo(0.04);

        this.cuerpo1 = game.add.sprite(0, 0, 'cuerpo_serpiente');
        this.cuerpo1.scale.setTo(1);
        this.cuerpo1.anchor.setTo(0.5);
        this.cuerpo1.x = this.cabeza_serpiente.x-this.cuerpo1.width;
        this.cuerpo1.y = this.cabeza_serpiente.y;
        this.cuerpos_serpiente[this.cuerpos_serpiente.length] = this.cuerpo1;

        this.cuerpo2 = game.add.sprite(0, 0, 'cuerpo_serpiente');
        this.cuerpo2.scale.setTo(1);
        this.cuerpo2.anchor.setTo(0.5);
        this.cuerpo2.x = this.cuerpo1.x-this.cuerpo2.width;
        this.cuerpo2.y = this.cuerpo1.y;
        this.cuerpos_serpiente[this.cuerpos_serpiente.length] = this.cuerpo2;

        this.cuerpo3 = game.add.sprite(0, 0, 'cuerpo_serpiente');
        this.cuerpo3.scale.setTo(1);
        this.cuerpo3.anchor.setTo(0.5);
        this.cuerpo3.x = this.cuerpo2.x-this.cuerpo3.width;
        this.cuerpo3.y = this.cuerpo2.y;
        this.cuerpos_serpiente[this.cuerpos_serpiente.length] = this.cuerpo3;

        
        
//        this.diamonds = [];
//        for (var i=0; i<amount_diamonds; i++) {
//            var diamond = game.add.sprite(100, 100, 'diamonds');
//            diamond.frame = game.rnd.integerInRange(0,3);
//            diamond.scale.setTo(0.30 + game.rnd.frac());
//            diamond.anchor.setTo(0.5);
//            diamond.x = game.rnd.integerInRange(50, 1050);
//            diamond.y = game.rnd.integerInRange(50, 600);
//            
//            this.diamonds[i] = diamond;
//            var rectCurrentDiamond = this.getBoundsDiamond(diamond);
//            var rectHorse = this.getBoundsDiamond(this.horse);
//            
//            while (this.isOverlappingOtherDiamond(i, rectCurrentDiamond) || this.isRectanglesOverlapping(rectHorse, rectCurrentDiamond)) {
//                diamond.x = game.rnd.integerInRange(50, 1050);
//                diamond.y = game.rnd.integerInRange(50, 600);
//                rectCurrentDiamond = this.getBoundsDiamond(diamond);
//            }
//        }
//        this.explosionGroup = game.add.group();
//        for (var i=0; i<10; i++) {
//            this.explosion = this.explosionGroup.create( 100,100, 'explosion');
////            this.explosion = game.add.sprite(100,100, 'explosion');
//            /* Parametros
//             * this.explosion.scale ==> definimos a que va a afectar este tween
//             * 600 ==> duracien en milisegundos de tween
//             * easing ==> corvatura que va a realizar
//             * false ==> autostart
//             * 0 ==> delay
//             * 0 ==> repeticiones del tween
//             * false ==> repeticiones de efecto yoyo (que vaya y vuelva)
//             */
//            this.explosion.tweenScale = game.add.tween(this.explosion.scale).to({
//                x:[0.4, 0.8, 0.4],
//                y:[0.4, 0.8, 0.4]
//            }, 600, Phaser.Easing.Exponential.Out, false, 0, 0, false);
//            this.explosion.tweenAlpha = game.add.tween(this.explosion).to({
//                alpha:[1, 0.6, 0]
//            }, 600, Phaser.Easing.Exponential.Out, false, 0, 0, false);
//            this.explosion.anchor.setTo(0.5);
//    //        this.explosion.visible = false;
//            this.explosion.kill();
//        }
//        
//        this.currentScore = 0;
//        var style = {
//            font: 'bold 30pt Arial',
//            fill: '#FFFFFF',
//            aling: 'center'
//        }
//        this.scoreText = game.add.text(game.width/2, 40, '0',style);
//        this.scoreText.anchor.setTo(0.5);
//        
//        this.totalTime = 15;
//        this.timerText = game.add.text(1000, 40, this.totalTime+'',style);
//        this.timerText.anchor.setTo(0.5);
//        
//        this.timerGameOver = game.time.events.loop(Phaser.Timer.SECOND, function() {
//            if (this.flagFirstMouseDown) {
//                this.totalTime--;
//                this.timerText.text = this.totalTime+'';
//                if (this.totalTime<=0) {
//                    game.time.events.remove(this.timerGameOver);
//                    this.endGame = true;
//                    this.showFinalMessage('¡¡ GAME OVER !!');
//                }
//            }
//        }, this);
    },
    serpienteHaComido: function(){
        var nuevoCuerpo = game.add.sprite(100, 100, 'cuerpo_serpiente');
        nuevoCuerpo.scale.setTo(1);
        nuevoCuerpo.anchor.setTo(0.5);
        nuevoCuerpo.x = this.cuerpos_serpiente[this.cuerpos_serpiente.length-1].x-this.nuevoCuerpo.width;
        nuevoCuerpo.y = this.cuerpos_serpiente[this.cuerpos_serpiente.length-1].y-this.nuevoCuerpo.height;
        this.cuerpos_serpiente[this.cuerpos_serpiente.length] = nuevoCuerpo;

    },
    increaseScore: function() {
        this.countSmile = 0;
        this.horse.frame = 1;

        this.currentScore+=100;
        this.scoreText.text = this.currentScore;

        this.amountDiamondsCaught += 1;
        if (this.amountDiamondsCaught >= amount_diamonds) {
           game.time.events.remove(this.timerGameOver);
           this.endGame = true;
           this.showFinalMessage('Congratulations!! U WIN!!');
        }
       
    },
    showFinalMessage: function(msg) {
       // this.tweenMollusk.stop();
       
        var bgAlpha = game.add.bitmapData(game.width, game.height);
        bgAlpha.ctx.fillStyle = '#000000';
        bgAlpha.ctx.fillRect(0,0,game.width,game.height);
       
        var bg = game.add.sprite(0,0,bgAlpha);
        bg.alpha = 0.5;
       
        var style = {
            font: 'bold 60pt Arial',
            fill: '#FFFFFF',
            aling: 'center'
        }
       
        this.textFieldFinalMsg = game.add.text(game.width/2, game.height/2, msg, style);
        this.textFieldFinalMsg.anchor.setTo(0.5);
       
    },
    startGame: function() {
        this.flagStartGame = true;
    },
    getBoundsComidina: function(elemento) {
        return new Phaser.Rectangle(elemento.left, elemento.top, elemento.width, elemento.height);
    },
    isRectanglesOverlapping: function(rect1, rect2) {
        if ((rect1.x > (rect2.x + rect2.width)) || (rect2.x > (rect1.x + rect1.width))) {
           return false;
        }
        if ((rect1.y > (rect2.y + rect2.height)) || (rect2.y > (rect1.y + rect1.height))) {
           return false;
        }
        return true;
    },
    isOverlappingOtherComidina: function(index, rect2){
        for (var i=0; i<index; i++) {
            var rect1 = this.getBoundsComidina(this.diamonds[i]);
            if (this.isRectanglesOverlapping(rect1, rect2)) {
               return true;
            }
        }
        return false;
    },
    getBoundsHorse: function() {
        var x0 = this.horse.x - Math.abs(this.horse.width)/2;
        var width = Math.abs(this.horse.width);
        var y0 = this.horse.y - this.horse.height/2;
        var height = this.horse.height;
       
        return new Phaser.Rectangle(x0, y0, width, height);
    },
//    render: function() {
//        game.debug.spriteBounds(this.horse);
//        for (var i=0; i<amount_diamonds; i++) {
//            game.debug.spriteBounds(this.diamonds[i]);
//        }
//    },
    moverCuerpoSerpiente: function(serpiente) {
        for (var i=0; i<this.cuerpos_serpiente.length; i++) {
            if (i==0){
                this.cuerpos_serpiente[i].x = serpiente.x-this.cuerpos_serpiente[i].width;
                this.cuerpos_serpiente[i].y = serpiente.y-this.cuerpos_serpiente[i].height;
                break;
            }
            this.cuerpos_serpiente[i].x = this.cuerpos_serpiente[i-1].x-this.cuerpos_serpiente[i].width;
            this.cuerpos_serpiente[i].y = this.cuerpos_serpiente[i-1].y-this.cuerpos_serpiente[i].height;
        }

    },
    update: function() {
        if (this.flagStartGame && !this.endGame){
            if (this.teclado.left.isDown){
                    direccion = "izquierda";
            } else if (this.teclado.right.isDown){
                direccion = "derecha";
            } else if (this.teclado.down.isDown){
                direccion = "arriba";
            } else if (this.teclado.up.isDown){
                direccion = "abajo";
            }
        
            if(direccion=="izquierda"){
                this.cabeza_serpiente.x-=velocidad;
                this.moverCuerpoSerpiente(this.cabeza_serpiente);
                if (this.cabeza_serpiente.x<-5) {
                    this.cabeza_serpiente.x = 1140-(this.cabeza_serpiente.width/2); 
                } else if (this.cabeza_serpiente.x>1145) {
                    this.cabeza_serpiente.x = 1+(this.cabeza_serpiente.width/2);
                }
            }
            if(direccion=="derecha"){
                this.cabeza_serpiente.x+=velocidad;
                this.moverCuerpoSerpiente(this.cabeza_serpiente);
                if (this.cabeza_serpiente.x<-5) {
                    this.cabeza_serpiente.x = 1140-(this.cabeza_serpiente.width/2); 
                } else if (this.cabeza_serpiente.x>1145) {
                    this.cabeza_serpiente.x = 1+(this.cabeza_serpiente.width/2);
                }
            }
            if(direccion=="arriba"){
                this.cabeza_serpiente.y+=velocidad;
                this.moverCuerpoSerpiente(this.cabeza_serpiente);
                if (this.cabeza_serpiente.y<-5) {
                    this.cabeza_serpiente.y = 950-(this.cabeza_serpiente.height/2); 
                } else if (this.cabeza_serpiente.y>950) {
                    this.cabeza_serpiente.y = 1+(this.cabeza_serpiente.height/2);
                }
            }
            if(direccion=="abajo"){
                this.cabeza_serpiente.y-=velocidad;
                this.moverCuerpoSerpiente(this.cabeza_serpiente);
                if (this.cabeza_serpiente.y<-5) {
                    this.cabeza_serpiente.y = 950-(this.cabeza_serpiente.height/2); 
                } else if (this.cabeza_serpiente.y>950) {
                    this.cabeza_serpiente.y = 1+(this.cabeza_serpiente.height/2);
                }
            }
            
//            this.shark.x--;
//            if (this.shark.x<-300) {
//                this.shark.x = 1300;
//            }
//            this.fishes.x+=0.3;
//            if (this.shark.x>1300) {
//                this.shark.x = -300;
//            }
//            
//            if (this.countSmile>=0) {
//                this.countSmile++;
//                if(this.countSmile>50){
//                    this.countSmile = -1;
//                    this.horse.frame = 0;
//                }
//            }
//            
//            var pointerX = game.input.x;
//            var pointerY = game.input.y;
//
//            var distX = pointerX - this.horse.x;
//            var distY = pointerY - this.horse.y;
//
//            if (distX>0){
//                this.horse.scale.setTo(1,1);
//            } else {
//                this.horse.scale.setTo(-1,1);
//            }
//
//            this.horse.x += distX *0.02;
//            this.horse.y += distY *0.02;
//            
//            for (var i=0; i<amount_diamonds; i++) {
//                var rectHorse = this.getBoundsHorse();
//                var rectDiamond = this.getBoundsDiamond(this.diamonds[i]);
//                if ( this.diamonds[i].visible && this.isRectanglesOverlapping(rectHorse, rectDiamond)) {
//                    this.increaseScore();
//                    this.diamonds[i].visible = false;
//                    
//                    var explosion = this.explosionGroup.getFirstDead();
//                    if (explosion != null) {
//                        explosion.reset(this.diamonds[i].x, this.diamonds[i].y);
//                        explosion.tweenScale.start();
//                        explosion.tweenAlpha.start();
//                        
//                        explosion.tweenAlpha.onComplete.add(function (currentTarget, currentTween) {
//                            currentTarget.kill();
//                        }, this);
//                        
//                    }
//                }
//            }
        }
    }
}

var game = new Phaser.Game(1140, 950, Phaser.CANVAS);
    
game.state.add("gameplay", GamePlayManager);
game.state.start("gameplay");
