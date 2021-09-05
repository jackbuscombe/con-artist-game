import Phaser from 'phaser'

import { Adventure, Bankrun, Showdown, Preload, TitleScreen } from '../consts/SceneKeys'
import { PressStart2P } from '../consts/Fonts'
import * as Colors from '../consts/Colors'

var balance

export default class Instruction extends Phaser.Scene {

    create(data) {
        this.cameras.main.fadeIn(1000, 0, 0, 0)

        if (data.instruction == "adventure") {
            this.add.text(960, 450, 
                "Your friend has just introduced you to a new\n\n  investment opportunity called BitConnect.\n\n\nHe tells you there is a BitConnect conference\n\nin 137 days so you join early to maximize ROI.\n\n\n        Between now and the conference,\n\n     collect as many Bitcoin as possible.\n\n\n\n     Jump over the pyramids with spacebar\n\n         and don't get left behind...", 
                {fontSize: 32, fontFamily: PressStart2P}).setOrigin(0.5)

            this.add.text(960, 900, 
                "PRESS SPACE TO START EARNING", 
                {fontSize: 40, fontFamily: PressStart2P}).setOrigin(0.5)
        } else if (data.instruction == "showdown") {
            balance = data.balance
            this.add.text(960, 450, 
                "   Well done... you made it to the conference\n\n                with " + balance + " Bitcoins!\n\n\n                        ...\n\n\nWait... Can you hear that voice in the distance?\n\n        I think someone's challenging you.\n\n\n  Quick! Get on stage and defend your Bitcoin!!!\n\n\n\n\n             You have two attacks:\n\n     Use left or right to defend yourself", 
                {fontSize: 32, fontFamily: PressStart2P}).setOrigin(0.5)

            this.add.text(960, 900, 
                "PRESS SPACE TO MEET CARLOS", 
                {fontSize: 40, fontFamily: PressStart2P}).setOrigin(0.5)
            this.time.delayedCall(7000, () => {this.sound.play('MenacingHahaha')})
        } else if (data.instruction == "bankrun") {
            balance = data.balance
            this.add.text(960, 480, 
                "             That was heated.\n\n\n     And there were whispers that the\n\n Texas State Securities Board is about to\n\n   issue BitConnect a cease & desist for\n\n          running a ponzi scheme.\n\n\n  You need to cash out before BitConnect\n\n           officially shuts down.\n\n\n\n      You've still got " + balance + " Bitcoins,\n\nbut you'll have to beat Carlos to the bank\n\n  before the BitConnect Servers turn off.\n\n\n Alternate left < and right > keys to run\n\n      and space to jump the pyramids!", 
                {fontSize: 28, fontFamily: PressStart2P}).setOrigin(0.5)

            this.add.text(960, 980, 
                "PRESS SPACE TO START BANK RUN", 
                {fontSize: 40, fontFamily: PressStart2P}).setOrigin(0.5)
        }

        this.input.keyboard.once('keydown-SPACE', () => {
            this.cameras.main.fadeOut(1000, 0, 0, 0)
            if (data.instruction == "adventure") {
                this.sound.play('IStarted137DaysAgo')
                this.scene.start(Adventure, {character: this.chosenCharacter})
            } else if (data.instruction == "showdown") {
                this.scene.start(Showdown, {character: this.chosenCharacter, balance: balance})
            } else if (data.instruction == "bankrun") {
                this.scene.start(Bankrun, {character: this.chosenCharacter, balance: balance})
            }
            
        });

    }
}