import Phaser from 'phaser'
import { GameOver, Instruction,Preload, TitleScreen  } from '../consts/SceneKeys'
import { AdventureMusic, PongBeep, PongPlop, SuspenseMusic } from '../consts/AudioKeys'
import { PressStart2P } from '../consts/Fonts'
import * as Colors from '../consts/Colors'
import Showdown from './Showdown'

// SET GAMESTATE
const GameState = {
	Paused: 'paused',
    Running: 'running',
    PlayerWon: 'player-won',
    AIWon: 'ai-won',
	GameOver: 'game-over'
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
var ladder
var spring
var jumpSound

var balance = 1
var balanceText
var daysLeft = 137
var daysLeftText
var newDay
var nextHit
var nextJump
var finishLineX = 15000
var music

var coinTimer
var COIN_GENERATION_INTERVAL = 500;
var speed = 300



// MAIN GAME

export default class Adventure extends Phaser.Scene
{
	init()
	{
		this.gameState = GameState.Paused
		this.cursors = this.input.keyboard.createCursorKeys()
	}

	create(data)
	{	
		// CAMERA
		this.cam = this.cameras.main

		// BACKGROUND
		this.cam.setBounds(0, 0, 15100, 1080);
        const width = this.scale.width
        const height = this.scale.height
        const totalWidth = width * width
    
        this.add.image(width * 0.5, height * 0.5, 'sky').setScrollFactor(0)
    
		createBGLoop(this, totalWidth, 'mountains', 0.25)
        createBGLoop(this, totalWidth, 'plateau', 0.5)
        createBGLoop(this, totalWidth, 'ground', 1)
        createBGLoop(this, totalWidth, 'plants', 1.25)



		// PLAYER
		if (data.chosenCharacter == 1) {
			//Load Player 1
		} else if (data.chosenCharacter == 2) {
			//Load Player 2
		} else {
			//Load Player 3
		}

		this.player = this.physics.add.sprite(600,800,"player")
		this.player.setBodySize(55, 55)
		this.player.scaleX = 2;
        this.player.scaleY = this.player.scaleX;

		// WORLD COMPONENTS
		floors = this.physics.add.staticGroup()
		this.physics.add.collider(floors, this.player)
		floors.create(0, 925, 'floor').setOrigin(0, 0.5).refreshBody()
		floors.setVisible(false)

		ladder = this.physics.add.staticGroup()
		this.physics.add.overlap(this.player, ladder, this.handleLadder, null, this)

		spring = this.physics.add.staticGroup()
		this.physics.add.overlap(this.player, spring, this.handleSpring, null, this)

		this.add.image(finishLineX - 2400, 300-128,"exit-sign").setOrigin(0.5, 0.5)
		this.add.image(13900, 925,"right-sign").setOrigin(0.5, 1)
		this.add.image(finishLineX, 940,"conference-room").setScale(3, 3).setOrigin(0.6, 1)
		

		// SPRITES
		spikes = this.physics.add.staticGroup()
		this.physics.add.overlap(this.player, spikes, this.handleSpike, null, this)

		coinTimer = this.time.addEvent({
			delay: COIN_GENERATION_INTERVAL,
			callback: this.generateCoins,
			callbackScope: this,
			repeat: -1
		});


		// MISC FUNCTIONS
		this.createAnimations()

		// CREATE WORLD
		this.createWorld()

		// ADD LABELS
		balanceText = this.add.text(70, 50, "Bitcoin: 1", {fontFamily: PressStart2P, fontSize:"48px",fill: "#000"}).setScrollFactor(0)
		daysLeftText = this.add.text(1200, 50, "Days Left: 137", {fontFamily: PressStart2P, fontSize:"48px",fill: "#000"}).setScrollFactor(0)

		this.cameras.main.fadeIn(1000, 0, 0, 0)
		music = this.time.delayedCall(2000, () => {this.sound.play(AdventureMusic)})
		var player = this.player
	}



	update()
	{
		this.handleSideScroll()
		this.handleUserInput()
		this.checkText()
		this.checkAlive()
		this.updateTimeLeft()
		console.log(this.player.x)
	}

	generateCoins(){
		var coins = this.physics.add.group({
			key: "bitcoin",
			repeat: 0,
			setXY:{
				x: Phaser.Math.Between(this.player.x - 150 , this.player.x + 1500),
				y: -200,
			}
		});
				
		coins.children.iterate(function(child){
			child.setBounceY(Phaser.Math.FloatBetween(0.4,0.5));
			child.setScale(2)
		});

		this.physics.add.collider(coins,floors);
		this.physics.add.overlap(this.player, coins, this.collectCoin, null, this)
	}
	
	collectCoin(player, coin){
		coin.disableBody(true, true)
		balance += 1
	}

	handleUserInput() {
        if (this.cursors.left.isDown) {
            this.player.flipX = true
            this.player.setVelocityX(-speed)
            this.player.play('player-walk', true)
        } else if (this.cursors.right.isDown) {
            this.player.flipX = false
            this.player.setVelocityX(speed)
            this.player.play('player-walk', true)
        } else {
            this.player.setVelocityX(0)
            this.player.play('player-idle', true)
        }
        if(this.cursors.space.isDown && this.player.body.blocked.down) {
			if (nextJump>this.time.now) {
				return
			} else {
				nextJump = this.time.now + 500
				jumpSound = Math.floor((Math.random() * 10) + 1)
				if (jumpSound == 1) {
					this.sound.play('Up')
				} else if (jumpSound == 2) {
					this.sound.play('Super')
				} else if (jumpSound == 3) {
					this.sound.play('Scam')
				} else if (jumpSound == 4) {
					this.sound.play('Mmm')
				} else if (jumpSound == 5) {
					this.sound.play('Hey')
				} else if (jumpSound == 6) {
					this.sound.play('Up')
				} else if (jumpSound == 7) {
					this.sound.play('Wassup')
				} else if (jumpSound == 8) {
					this.sound.play('Amazing')
				} else if (jumpSound == 9) {
					this.sound.play('Up')
				} else if (jumpSound == 10) {
					this.sound.play('Up')
				}
				this.player.setVelocityY(-900)
			}
        }
    }

	handleSideScroll() {
		const scrollSpeed = 3
		this.cam.scrollX += scrollSpeed
	}

	updateTimeLeft() {
		if(newDay>this.time.now || daysLeft == 0){
			return
		} else {
			daysLeft -= 1
		}
		newDay = this.time.now + 520
	}

	createAnimations() {
        // Create Animations
        this.anims.create({
            key: "player-walk",
            frames: this.anims.generateFrameNames('player', {start: 1, end: 4, prefix: 'penguin_walk0', suffix: '.png'}),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: "player-idle",
            frames: [{key: 'player', frame: 'penguin_walk01.png'}]
        });
    }

	createWorld() {

		floors.create(1200, 600, 'grass-left')
		floors.create(1200 + 128, 600, 'grass')
		floors.create(1200 + 128 + 128, 600, 'grass-right')

		floors.create(1500, 300, 'grass-left')
		floors.create(1500 + 128, 300, 'grass')
		floors.create(1500 + 128 + 128, 300, 'grass-right')

		spikes.create(1600, 240, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)


		floors.create(2400, 300, 'grass-left')
		floors.create(2400 + 128, 300, 'grass')
		floors.create(2400 + 128+128, 300, 'grass')
		floors.create(2400 + 128 + 128+128, 300, 'grass-right')

		floors.create(2900, 500, 'grass-left')
		floors.create(2900 + 128, 500, 'grass')
		floors.create(2900 + 128+128, 500, 'grass')
		floors.create(2900 + 128 + 128+128, 500, 'grass-right')

		ladder.create(2300, 930, 'ladder').setOrigin(1, 1).setScale(1.5).refreshBody()
		ladder.create(2300, 930-(128*1.5), 'ladder').setOrigin(1, 1).setScale(1.5).refreshBody()
		ladder.create(2300, 930-(128*1.5)-(128*1.5), 'ladder').setOrigin(1, 1).setScale(1.5).refreshBody()
		ladder.create(2300, 930-(128*1.5)-(128*1.5)-(128*1.5), 'ladder-top').setOrigin(1, 1).setScale(1.5).refreshBody()

		//knight.body.setSize(200,600,10,0);
		spikes.create(1200, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(1500, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(2400, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(2400+204, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(2400+204+204, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(2400+204+204+204, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(2400+204+204+204+204, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)

		spring.create(4300,930, 'sprung').setOrigin(0.5, 1).setDepth(3)
		spikes.create(4500, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(4500+204, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(4500+204+204, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)

		spring.create(4500+204+204+204, 930, 'sprung').setOrigin(0.5, 1).setDepth(3)
		spikes.create(4500+204+204+204+204, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(4500+204+204+204+204+204, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(4500+204+204+204+204+204+204, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)

		ladder.create(6500, 930, 'ladder').setOrigin(1, 1).setScale(1.5).refreshBody()
		ladder.create(6500, 930-(128*1.5), 'ladder').setOrigin(1, 1).setScale(1.5).refreshBody()
		ladder.create(6500, 930-(128*1.5)-(128*1.5), 'ladder').setOrigin(1, 1).setScale(1.5).refreshBody()
		ladder.create(6500, 930-(128*1.5)-(128*1.5)-(128*1.5), 'ladder-top').setOrigin(1, 1).setScale(1.5).refreshBody()

		floors.create(6600, 500, 'grass-left')
		floors.create(6600 + 128, 500, 'grass')
		floors.create(6600 + 128+128, 500, 'grass')
		floors.create(6600 + 128 + 128+128, 500, 'grass-right')

		floors.create(7400, 300, 'grass-left')
		floors.create(7400 + 128, 300, 'grass')
		floors.create(7400 + 128+128, 300, 'grass')
		floors.create(7400 + 128 + 128+128, 300, 'grass-right')

		spikes.create(8500 - 204 - 204, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(8500 - 204, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(8500+204, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(9500, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)


		floors.create(10000, 600, 'grass-left')
		floors.create(10000 + 128, 600, 'grass')
		floors.create(10000 + 128+128, 600, 'grass')
		floors.create(10000 + 128+128+128, 600, 'grass')
		floors.create(10000 + 128+128+128+128, 600, 'grass')
		floors.create(10000 + 128+128+128+128, 600, 'grass')
		floors.create(10000 + 128+128+128+128+128, 600, 'grass')
		floors.create(10000 + 128+128+128+128+128+128, 600, 'grass-right')
		spikes.create(10200, 550, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(10400, 550, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)

		ladder.create(12300, 930, 'ladder').setOrigin(1, 1).setScale(1.5).refreshBody()
		ladder.create(12300, 930-(128*1.5), 'ladder').setOrigin(1, 1).setScale(1.5).refreshBody()
		ladder.create(12300, 930-(128*1.5)-(128*1.5), 'ladder').setOrigin(1, 1).setScale(1.5).refreshBody()
		ladder.create(12300, 930-(128*1.5)-(128*1.5)-(128*1.5), 'ladder-top').setOrigin(1, 1).setScale(1.5).refreshBody()

		floors.create(12500, 300, 'grass-left')
		floors.create(12500 + 128, 300, 'grass')
		floors.create(12500 + 128+128, 300, 'grass')
		floors.create(12500 + 128+128+128, 300, 'grass-right')
		spring.create(12900, 300-128, 'sprung').setOrigin(0.5, 0.5).setDepth(3)

		spikes.create(13000, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(13000+204, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(13000+204+204, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(13000+204+204+204, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)




		spikes.create(10200, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(10200, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)




		spikes.create(3000, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(4000, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(7000, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
		spikes.create(12000, 930, 'spike').setOrigin(0.5, 1).refreshBody().setDepth(1).setBodySize(50, 50)
	}

	handleSpike() {
		if(nextHit>this.time.now){
			return
		} else {
			this.sound.play('Nonononononono')
			balance -= 1
			this.player.setVelocityY(-1000)
		}
		nextHit = this.time.now + 500
		this.cameras.main.shake(100,0.02);
	}

	handleLadder() {
		if (this.cursors.up.isDown) {
			this.player.setVelocity(0, -speed)
		}
	}

	handleSpring() {
		this.player.setVelocity(1000, -1200)
		this.cameras.main.shake(80,0.01);		
	}

	checkText() {
		balance = Phaser.Math.RoundTo(balance, -1)
		balanceText.setText("Bitcoin: " + balance)

		daysLeftText.setText("Days Left: " + daysLeft)
	}

	checkAlive() {
		if (this.player.x + 50 < this.cam.worldView.x) {
			this.time.delayedCall(1000, () => {
				if (this.player.x + 50 < this.cam.worldView.x) {
					this.gameState = GameState.GameOver
					this.cameras.main.fadeOut(500, 0, 0, 0)
					this.time.delayedCall(1000, () => {this.scene.stop(Adventure)})
					this.time.delayedCall(1000, () => {this.scene.start(GameOver, { balance: balance, reason: "fellBehind" })})
					this.time.delayedCall(1000, () => {this.sound.get(AdventureMusic).stop()})
				}
			})
		}
		
		if (this.player.x >= 13800) {
			this.gameState = GameState.GameOver
			this.time.delayedCall(6000, () => {this.cameras.main.fadeOut(2500, 0, 0, 0)})
			this.time.delayedCall(6000, () => {this.scene.stop(Adventure)})
			this.time.delayedCall(6000, () => {this.scene.start(Instruction, {character: this.chosenCharacter, balance: balance, instruction: "showdown" })})
		}
	}




}