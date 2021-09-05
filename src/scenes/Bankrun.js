import Phaser from 'phaser'

import WebFontFile from './WebFontFile'
import { GameOver, Winner } from '../consts/SceneKeys'
import * as Colors from '../consts/Colors'
import { PressStart2P } from '../consts/Fonts'
import { BankrunMusic } from '../consts/AudioKeys'

// SET STRIDESTATE
const StrideState = {
    None: 'none',
    Left: 'left',
    Right: 'right'
}

// SET BACKGROUND
const createBGLoop = (scene, totalWidth, texture, scrollFactor) => {
	const w = scene.textures.get(texture).getSourceImage().width
	const count = Math.ceil(totalWidth / w) * scrollFactor

	let x = 0
	for (let i = 0; i < count; ++i) {
		const m = scene.add.image(x, scene.scale.height, texture)
			.setOrigin(0, 1)
			.setScrollFactor(scrollFactor)

		x += m.width
	}
}

// SET VARIABLES
var floors
var spikes
var coins

var balance
var balanceText

var finishLine = 15000
var distanceLeft = 15000
var distanceLeftText

var bossSpeed = 10

var nextHit

export default class Bankrun extends Phaser.Scene {

    init()
	{
        
        this.strideState = StrideState.Left
        //this.gameState = GameState.Paused
		this.cursors = this.input.keyboard.createCursorKeys()
	}

    create(data) {

        balance = data.balance
		// CAMERA
		this.cam = this.cameras.main

		// BACKGROUND
		this.cam.setBounds(0, 0, 19200, 1080);
        const width = this.scale.width
        const height = this.scale.height
        const totalWidth = width * width
    
        this.add.image(width * 0.5, height * 0.5, 'sky').setScrollFactor(0)
    
		createBGLoop(this, totalWidth, 'mountains', 0.25)
        createBGLoop(this, totalWidth, 'plateau', 0.5)
        createBGLoop(this, totalWidth, 'ground', 1)
        createBGLoop(this, totalWidth, 'plants', 1.25)

        // // PLAYER
		// if (data.chosenCharacter == 1) {
		// 	//Load Player 1
		// } else if (data.chosenCharacter == 2) {
		// 	//Load Player 2
		// } else {
		// 	//Load Player 3
		// }

		this.player = this.physics.add.sprite(300,800,"player")
        this.player.scaleX = 2;
        this.player.scaleY = this.player.scaleX;

        this.boss = this.add.sprite(300,800,"run1")
        this.boss.scaleX = 0.5;
        this.boss.scaleY = this.boss.scaleX;

        // WORLD COMPONENTS
		floors = this.physics.add.staticGroup()
		this.physics.add.collider(floors, this.player)
        this.physics.add.collider(floors, this.boss)

		floors.create(0, 925, 'floor')
        floors.create(19200, 925, 'floor')
		floors.setVisible(false)

        this.add.image(15000,920,"bank").setOrigin(0, 1).setScale(3, 3)

        this.cameras.main.startFollow(this.player)


        // SET SPRITES
        spikes = this.physics.add.staticGroup()
		this.physics.add.overlap(this.player, spikes, this.handleSpike, null, this)

        // MISC FUNCTIONS
		this.createAnimations()

		// ADD LABELS
		balanceText = this.add.text(16, 16, "Bitcoin: " + balance, {fontFamily: PressStart2P, fontSize:"32px",fill: "#000"}).setScrollFactor(0)
        distanceLeftText = this.add.text(600, 16, "Distance Left: 15,000", {fontFamily: PressStart2P, fontSize:"32px",fill: "#000"}).setScrollFactor(0)

		this.cameras.main.fadeIn(1000, 0, 0, 0)

        this.createWorld()
        this.sound.play(BankrunMusic)

    }

    update() {
		this.handleUserInput()
		this.checkBalance()
        this.handleBossMovement()
        this.checkDistance()
        this.boss.play("carlos-run", true);
        //this.boss.y = 750

    }

    handleUserInput() {
        const speed = 3000
        if (this.cursors.left.isDown && this.strideState == StrideState.Right) {
            this.player.setVelocityX(speed)
            this.player.play('player-walk', true)
            this.strideState = StrideState.Left
        } else if (this.cursors.right.isDown && this.strideState == StrideState.Left) {
            this.player.setVelocityX(speed)
            this.player.play('player-walk', true)
            this.strideState = StrideState.Right
        } else {
            this.player.setVelocityX(0)
            this.player.play('player-idle', true)
        }

        if (this.cursors.space.isDown && this.player.body.blocked.down) {
            this.player.setVelocityY(-900)
        }
    }

    createWorld() {
        spikes.create(1000, 930, 'spike').setOrigin(0.5,1).refreshBody().setScale(1.75)
		spikes.create(2000, 930, 'spike').setOrigin(0.5,1).refreshBody().setScale(1.75)
        spikes.create(3128, 930, 'spike').setOrigin(0.5,1).refreshBody().setScale(1.75)
        spikes.create(4000, 930, 'spike').setOrigin(0.5,1).refreshBody().setScale(1.75)
        spikes.create(6128, 930, 'spike').setOrigin(0.5,1).refreshBody().setScale(1.75)
        spikes.create(7000, 930, 'spike').setOrigin(0.5,1).refreshBody().setScale(1.75)
        spikes.create(8000, 930, 'spike').setOrigin(0.5,1).refreshBody().setScale(1.75)
        spikes.create(9128, 930, 'spike').setOrigin(0.5,1).refreshBody().setScale(1.75)
        spikes.create(11000, 930, 'spike').setOrigin(0.5,1).refreshBody().setScale(1.75)
        spikes.create(13128, 930, 'spike').setOrigin(0.5,1).refreshBody().setScale(1.75)
        spikes.create(14500, 930, 'spike').setOrigin(0.5,1).refreshBody().setScale(1.75)
    }

    createAnimations() {
        // Create Carlos Animation
        this.anims.create({
            key: "carlos-run",
            frames: [
                {key: "carlos-run1"},
                {key: "carlos-run2"},
                {key: "carlos-run3"},
                {key: "carlos-run4"},
                ],
            frameRate: 10,
            repeat: 1
            });
    }

    handleSpike() {
		if(nextHit>this.time.now){
			return
		} else {
			balance -= 1
			this.player.setVelocityY(-800)
			//this.sound.play(OhNonononono)
		}
		nextHit = this.time.now + 500
        this.cameras.main.shake(100,0.02);
	}

    checkBalance() {
		balance = Phaser.Math.RoundTo(balance, -1)
		balanceText.setText("Bitcoin: " + balance)
	}
    
    checkDistance() {
        distanceLeft = finishLine - this.player.x
		distanceLeftText.setText("Distance Left: " + distanceLeft)

        if (this.player.x >= finishLine && this.player.x > this.boss.x) {
            this.cameras.main.fadeOut(500, 0, 0, 0)
            this.time.delayedCall(500, () => {this.scene.stop(Bankrun)})
            this.time.delayedCall(500, () => {this.scene.start(Winner, { balance: balance })})
        } else if (this.boss.x >= finishLine && this.player.x < this.boss.x) {
            this.cameras.main.fadeOut(500, 0, 0, 0)
            this.time.delayedCall(500, () => {this.scene.stop(Bankrun)})
            this.sound.get(BankrunMusic).stop()
            this.time.delayedCall(500, () => {this.scene.start(GameOver, { balance: balance, reason: "lostRace" })})
            this.sound.play('BitconnectExtremeClipping')
        }
    }

    handleBossMovement() {
        this.boss.x += bossSpeed
    }
}