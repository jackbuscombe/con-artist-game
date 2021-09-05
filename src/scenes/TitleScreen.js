import Phaser from 'phaser'
import WebFontFile from './WebFontFile'

import { CharacterSelect } from '../consts/SceneKeys'
import { PressStart2P } from '../consts/Fonts'
import * as AudioKeys from '../consts/AudioKeys'

export default class TitleScreen extends Phaser.Scene {
    init()
	{
		this.cursors = this.input.keyboard.createCursorKeys()
	}

    create() {

        let carlos = this.add.image(960,300,"carlos").setOrigin(0.5)
        carlos.setScale(2, 2)
        const title = this.add.text(960,600,'SCAMMER GAME', {fontSize: 62, fontFamily: PressStart2P})
        title.setOrigin(0.5)

        this.add.text(960, 800, 'Press Space to Protect Your Bitcoin', {fontSize: 38, fontFamily: PressStart2P}).setOrigin(0.5)

        this.input.keyboard.once('keydown-SPACE', () => {
            this.scene.stop(TitleScreen)
            this.scene.start(CharacterSelect)
        });
        this.sound.play('HeyHeyHeyBlowout')
        this.time.delayedCall(1800, () => {this.sound.play('ThisWasGoingToBeAScammerGame')})
        this.cameras.main.fadeIn(1000, 0, 0, 0)

    }
}