import Phaser from 'phaser'

import WebFontFile from './WebFontFile'
import { Instruction, GameOver } from '../consts/SceneKeys'
import { PressStart2P } from '../consts/Fonts'
import {SuspenseMusic} from '../consts/AudioKeys'

const GameState = {
    Welcome: 'welcome',
    PlayerTurn: 'player-turn',
    BossTurn: 'boss-turn',
    PlayerWon: 'player-won',
    BossWon: 'boss-won'
}

var stage

var nextTurn
var balance
var balanceText
var bossBalance = 100
var bossBalanceText
var whosTurnText
var damage
var attackEffectiveness
var contemplateSound
var pickAttack
var carlosAttackText
var playerAttackText
var middleText

var attack1Cost = 2
var attack2Cost = 1

var playerPosition
var bossPosition

export default class Showdown extends Phaser.Scene {
    
    init() {
        this.gameState = GameState.PlayerTurn
        this.cursors = this.input.keyboard.createCursorKeys()
        this.sound.play(SuspenseMusic)
    }

    create(data) {

        this.add.image(0,0,"showdown-background").setOrigin(0, 0)
        balance = data.balance


        // MAIN LABEL
        whosTurnText = this.add.text(960, 50, "YOU", {fontFamily: PressStart2P, fontSize:"40px",fill: "#FFFFFF"}).setScrollFactor(0).setOrigin(0.5)

        // PLAYER LABELS
        this.add.text(250, 50, "YOU", {fontFamily: PressStart2P, fontSize:"60px",fill: "#FFFFFF"}).setScrollFactor(0)
		balanceText = this.add.text(70, 150, "Balance: " + this.balance + "BTC", {fontFamily: PressStart2P, fontSize:"40px",fill: "#FFFFFF"}).setScrollFactor(0)
        this.add.text(70, 250, "Attacks", {fontFamily: PressStart2P, fontSize:"48px",fill: "#FFFFFF"}).setScrollFactor(0)

        this.add.text(70, 350, "Convince (Left Arrow)", {fontFamily: PressStart2P, fontSize:"32px",fill: "#FFFFFF"}).setScrollFactor(0)
        this.add.text(70, 400, "STRONG    Cost: 2BTC", {fontFamily: PressStart2P, fontSize:"26px",fill: "#FFFFFF"}).setScrollFactor(0)

        this.add.text(70, 480, "Steal (Right Arrow)", {fontFamily: PressStart2P, fontSize:"32px",fill: "#FFFFFF"}).setScrollFactor(0)
        this.add.text(70, 530, "WEAK      Cost: 1BTC", {fontFamily: PressStart2P, fontSize:"26px",fill: "#FFFFFF"}).setScrollFactor(0)
        
        
        // BOSS LABELS
        this.add.text(1300, 50, "CARLOS", {fontFamily: PressStart2P, fontSize:"60px",fill: "#FFFFFF"}).setScrollFactor(0)
        bossBalanceText = this.add.text(1200, 150, "Balance: 140BTC", {fontFamily: PressStart2P, fontSize:"40px",fill: "#FFFFFF"}).setScrollFactor(0)
        this.add.text(1200, 250, "Attacks", {fontFamily: PressStart2P, fontSize:"48px",fill: "#FFFFFF"}).setScrollFactor(0)

        this.add.text(1200, 350, "Scream", {fontFamily: PressStart2P, fontSize:"32px",fill: "#FFFFFF"}).setScrollFactor(0)
        this.add.text(1200, 400, "STRONG    Cost: 2BTC", {fontFamily: PressStart2P, fontSize:"26px",fill: "#FFFFFF"}).setScrollFactor(0)

        this.add.text(1200, 480, "Dance", {fontFamily: PressStart2P, fontSize:"32px",fill: "#FFFFFF"}).setScrollFactor(0)
        this.add.text(1200, 530, "WEAK      Cost: 1BTC", {fontFamily: PressStart2P, fontSize:"26px",fill: "#FFFFFF"}).setScrollFactor(0)



        // ADD CHARACTERS
        this.player = this.add.sprite(300,880, "player")
        this.player.scaleX = 2.5
        this.player.scaleY = 2.5

        //this.boss = this.add.sprite(1500, 952, "run1").setOrigin(0.5, 1).refreshBody()
        this.boss = this.add.sprite(1500,750,"run1")
        this.boss.scaleX = 0.65
        this.boss.scaleY = 0.65
        this.boss.flipX = true



        this.createAnimations()

        

        // ADD STAGE
        stage = this.physics.add.staticGroup()
		this.physics.add.collider(this.player, stage)
        this.physics.add.collider(this.boss, stage)
        this.createStage()

        this.physics.add.collider(this.player, this.boss, this.handleCharacterCollision, undefined, this)
        this.cameras.main.fadeIn(1000, 0, 0, 0)
    }

    update() {
        this.doPlayerAttack()
        this.checkText()
        this.boss.play("carlos-run", true);
        this.player.play("player-walk", true);
    }

    createAnimations() {
        // Create Carlos Animation
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


        this.anims.create({
            key: "carlos-run",
            frames: [
                {key: "carlos-run1"},
                {key: "carlos-run2"},
                {key: "carlos-run3"},
                {key: "carlos-run4"}
                ],
            frameRate: 10,
            repeat: -1
            });

    }

    doPlayerAttack() {
        if (this.cursors.left.isDown && this.gameState == GameState.PlayerTurn) {
            if (nextTurn>this.time.now) {
                return
            } else {
                playerAttackText = this.add.text(300, 650, "You Did Convince!", {fontFamily: PressStart2P, fontSize:"30px",fill: "#FF0000"}).setOrigin(0.5, 0.5)
                this.time.delayedCall(1000, () => {playerAttackText.setText("")})
                nextTurn = this.time.now + 3000
                balance -= attack1Cost
                for (let i = 0; i<10; i++) {
                    this.player.x += 100
                }
                for (let i = 0; i<10; i++) {
                    this.player.x -= 100
                }
                attackEffectiveness = (Math.random() * (0.5 - 2) + 2).toFixed(4)
                damage = Math.round(10 * attackEffectiveness)
            
                if (attackEffectiveness < 0.75) {
                    middleText = this.add.text(960, 600, "It Wasn't Very Effective!", {fontFamily: PressStart2P, fontSize:"24px",fill: "#FF0000"}).setOrigin(0.5, 0.5)
                    this.time.delayedCall(1000, () => {middleText.setText("")})
                } else if (attackEffectiveness > 1.5) {
                    middleText = this.add.text(960, 600, "It Was Super Effective!", {fontFamily: PressStart2P, fontSize:"24px",fill: "#FF0000"}).setOrigin(0.5, 0.5)
                    this.time.delayedCall(1000, () => {middleText.setText("")})                }
            }
        } else if (this.cursors.right.isDown && this.gameState == GameState.PlayerTurn) {
            if (nextTurn>this.time.now) {
                return
            } else {
                playerAttackText = this.add.text(300, 650, "You Did Steal!", {fontFamily: PressStart2P, fontSize:"30px",fill: "#FF0000"}).setOrigin(0.5, 0.5)
                this.time.delayedCall(1000, () => {playerAttackText.setText("")})
                nextTurn = this.time.now + 3000
                balance -= attack2Cost
                attackEffectiveness = (Math.random() * (0.5 - 2) + 2).toFixed(4)
                damage = Math.round(5 * attackEffectiveness)
            
                if (attackEffectiveness < 0.75) {
                    middleText = this.add.text(960, 600, "It Wasn't Very Effective!", {fontFamily: PressStart2P, fontSize:"24px",fill: "#FF0000"}).setOrigin(0.5, 0.5)
                    this.time.delayedCall(1000, () => {middleText.setText("")})
                } else if (attackEffectiveness > 1.5) {
                    middleText = this.add.text(960, 600, "It Was Super Effective!", {fontFamily: PressStart2P, fontSize:"24px",fill: "#FF0000"}).setOrigin(0.5, 0.5)
                    this.time.delayedCall(1000, () => {middleText.setText("")})
                }
            }
        } else {
            return
        }
        this.cameras.main.shake(100,0.02);
        bossBalance -= damage
        if (bossBalance <= 0) {
            this.gameState = GameState.PlayerWon
            this.bossDeath()
        } else {
            this.sound.play('Nonononononono')
            this.gameState = GameState.BossTurn
            this.time.delayedCall(2000, () => {this.sound.play('WhatAmIGonnaDo')})
            this.time.delayedCall(4000, () => {this.doBossAttack()})
        }
    }

    doBossAttack() {
        pickAttack = Phaser.Math.Between(1, 2)
        if (pickAttack == 1) {
            this.sound.play('WoaahhHighPitch')
            carlosAttackText = this.add.text(1500, 650, "Carlos Did Scream", {fontFamily: PressStart2P, fontSize:"30px",fill: "#FF0000"}).setOrigin(0.5, 0.5)
            this.time.delayedCall(1000, () => {carlosAttackText.setText("")})
            bossBalance -= 2
            const attackEffectiveness = (Math.random() * (0.5 - 2) + 2).toFixed(4)
            damage = Math.round(10 * attackEffectiveness)
        
            if (attackEffectiveness < 0.75) {
                middleText = this.add.text(960, 600, "It Wasn't Very Effective!", {fontFamily: PressStart2P, fontSize:"24px",fill: "#FF0000"}).setOrigin(0.5, 0.5)
                this.time.delayedCall(1000, () => {middleText.setText("")})
            } else if (attackEffectiveness > 1.5) {
                middleText = this.add.text(960, 600, "It Was Super Effective!", {fontFamily: PressStart2P, fontSize:"24px",fill: "#FF0000"}).setOrigin(0.5, 0.5)
                this.time.delayedCall(1000, () => {middleText.setText("")})
            }
        } else if (pickAttack == 2) {
            this.sound.play('Wowowowowow')
            carlosAttackText = this.add.text(1500, 650, "Carlos Did Dance", {fontFamily: PressStart2P, fontSize:"30px",fill: "#FF0000"}).setOrigin(0.5, 0.5)
            this.time.delayedCall(1000, () => {carlosAttackText.setText("")})
            bossBalance -= 1
            const attackEffectiveness = (Math.random() * (0.5 - 2) + 2).toFixed(4)
            damage = Math.round(5 * attackEffectiveness)
        
            if (attackEffectiveness < 0.75) {
                middleText = this.add.text(960, 600, "It Wasn't Very Effective!", {fontFamily: PressStart2P, fontSize:"24px",fill: "#FF0000"}).setOrigin(0.5, 0.5)
                this.time.delayedCall(1000, () => {middleText.setText("")})
            } else if (attackEffectiveness > 1.5) {
                middleText = this.add.text(960, 600, "It Was Super Effective!", {fontFamily: PressStart2P, fontSize:"24px",fill: "#FF0000"}).setOrigin(0.5, 0.5)
                this.time.delayedCall(1000, () => {middleText.setText("")})
            }
        }
        this.cameras.main.shake(100,0.02);
        balance -= damage
        if (balance <= 0) {
            this.gameState = GameState.BossWon
            this.playerDeath()
        } else {
            this.gameState = GameState.PlayerTurn
        }
    }

    checkText() {
		balance = Phaser.Math.RoundTo(balance, -1)
		balanceText.setText("Balance: " + balance + "BTC")

		bossBalanceText.setText("Balance: " + bossBalance + "BTC")

        if(this.gameState == GameState.PlayerTurn) {
            whosTurnText.setText("Your Turn")
        } else if (this.gameState == GameState.BossTurn) {
            whosTurnText.setText("Carlos' Turn")
        }

	}

    createStage() {
        stage.create(0, 952, 'showdown-stage-left').setOrigin(0,0).refreshBody()
        stage.create(128, 952, 'showdown-stage-mid').setOrigin(0,0).refreshBody()
        stage.create(256, 952, 'showdown-stage-mid').setOrigin(0,0).refreshBody()
        stage.create(384, 952, 'showdown-stage-mid').setOrigin(0,0).refreshBody()
        stage.create(512, 952, 'showdown-stage-mid').setOrigin(0,0).refreshBody()
        stage.create(640, 952, 'showdown-stage-mid').setOrigin(0,0).refreshBody()
        stage.create(768, 952, 'showdown-stage-mid').setOrigin(0,0).refreshBody()
        stage.create(896, 952, 'showdown-stage-mid').setOrigin(0,0).refreshBody()
        stage.create(1024, 952, 'showdown-stage-mid').setOrigin(0,0).refreshBody()
        stage.create(1152, 952, 'showdown-stage-mid').setOrigin(0,0).refreshBody()
        stage.create(1280, 952, 'showdown-stage-mid').setOrigin(0,0).refreshBody()
        stage.create(1408, 952, 'showdown-stage-mid').setOrigin(0,0).refreshBody()
        stage.create(1536, 952, 'showdown-stage-mid').setOrigin(0,0).refreshBody()
        stage.create(1664, 952, 'showdown-stage-mid').setOrigin(0,0).refreshBody()
        stage.create(1792, 952, 'showdown-stage-right').setOrigin(0,0).refreshBody()

		//coins.create(1050,900, 'coin')
    }


    handleCharacterCollision(player, boss) {
        //this.sound.play(Smack)
        this.shakeEffect = new Effects.Shake(this);
        // Camera Shake
    }
    
    // DEATHS
    
    playerDeath() {
        //this.sound.play(deathSound)
        {this.sound.get(SuspenseMusic).stop()}
        this.time.delayedCall(1000, () => {this.scene.stop(Showdown)})
        this.time.delayedCall(1000, () => {this.scene.start(GameOver, { balance: balance, reason: "lostShowdown" })})
        
    }
    
    bossDeath() {
        this.time.delayedCall(1000, () => {this.sound.play('LoveScreaming')})
        {this.sound.get(SuspenseMusic).stop()}
        this.time.delayedCall(1000, () => {this.scene.stop(Showdown)})
        this.time.delayedCall(1000, () => {this.scene.start(Instruction, {character: this.chosenCharacter, balance: balance, instruction: "bankrun" })})
    }
}