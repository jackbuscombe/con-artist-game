import Phaser from 'phaser'
import WebFontFile from './WebFontFile'

import {TitleScreen } from '../consts/SceneKeys'
import { PressStart2P } from '../consts/Fonts'
import * as AudioKeys from '../consts/AudioKeys'

var balance

export default class Winner extends Phaser.Scene {
    init()
	{
		this.cursors = this.input.keyboard.createCursorKeys()
	}

    create(data) {
        balance = data.balance

        this.add.image(960,300,"bitconnect-eyes").setOrigin(0.5)
        const title = this.add.text(960,600,'YOU ESCAPED THE SCAM', {fontSize: 62, fontFamily: PressStart2P})
        title.setOrigin(0.5)

        this.add.text(960, 800, 'Final Balance: ' + balance + "BTC", {fontSize: 38, fontFamily: PressStart2P}).setOrigin(0.5)
        this.add.text(960, 900, 'Press Space to Submit Score', {fontSize: 38, fontFamily: PressStart2P}).setOrigin(0.5)

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.stop(Winner)
            this.scene.start(TitleScreen)
        });

        this.cameras.main.fadeIn(1000, 0, 0, 0)

        this.sound.play('BitconnectExtremeClipping')

    }
}