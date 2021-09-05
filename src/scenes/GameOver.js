import Phaser from 'phaser'

import { Adventure, Preload, TitleScreen, Bankrun } from '../consts/SceneKeys'
import { PressStart2P } from '../consts/Fonts'
import * as Colors from '../consts/Colors'

export default class GameOver extends Phaser.Scene {

    create(data) {

        this.cameras.main.fadeIn(1000, 0, 0, 0)

        this.add.text(960, 300, 'Game Over', {fontSize: 72, fontFamily: PressStart2P}).setOrigin(0.5)
        let carlosHead = this.add.image(960,500,"carlos-scream").setOrigin(0.5)
        carlosHead.setScale(0.5, 0.5)
        if (data.reason == "fellBehind") {
            this.add.text(960, 700, "You fell behind. You need to be quick to make money", {fontSize: 32, fontFamily: PressStart2P}).setOrigin(0.5)
        }
        if (data.reason == "lostRace") {
            this.add.text(960, 700, "You didn't make it to the bank on time :(", {fontSize: 32, fontFamily: PressStart2P}).setOrigin(0.5)
        }
        if (data.reason == "lostFight") {
            this.add.text(960, 700, "Carlos whooped your ass and you have no Bitcoin.", {fontSize: 32, fontFamily: PressStart2P}).setOrigin(0.5)
        }
        if (data.reason != "lostShowdown") {
            this.add.text(960, 780, "You Lost: " + data.balance + " Bitcoin", {fontSize: 32, fontFamily: PressStart2P}).setOrigin(0.5)
        }
        this.add.text(960, 900, "Press Space To Get Scammed Again", {fontSize: 26, fontFamily: PressStart2P}).setOrigin(0.5)

        this.input.keyboard.once('keydown-SPACE', () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            this.scene.start(Preload)
        });

    }
}