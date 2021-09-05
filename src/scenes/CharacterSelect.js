import Phaser from 'phaser'
import { Instruction, Adventure, Bankrun, Preload } from '../consts/SceneKeys'
import { PressStart2P } from '../consts/Fonts'
import * as Colors from '../consts/Colors'

var chosenCharacter = 2
var instructionPage = "adventure"
var nextChange

export default class CharacterSelect extends Phaser.Scene
{
	init() {
		this.cursors = this.input.keyboard.createCursorKeys()
	}

	create()
	{
		this.cameras.main.fadeIn(1000, 0, 0, 0)
		this.add.text(960, 700, 'Pick your Difficulty', {fontSize: 52, fontFamily: PressStart2P}).setOrigin(0.5)
		this.add.text(960, 850, 'Press SPACE to Select Your Character', {fontSize: 38, fontFamily: PressStart2P}).setOrigin(0.5)

		this.add.text(400,150,"Easy", {fontSize: 32, fontFamily: PressStart2P}).setOrigin(0.5).setSize(120, 120)
		this.add.text(960,150,"Medium", {fontSize: 32, fontFamily: PressStart2P}).setOrigin(0.5).setSize(120, 120)
		this.add.text(1600,150,"Hard", {fontSize: 32, fontFamily: PressStart2P}).setOrigin(0.5).setSize(120, 120)


		let character1 = this.add.image(400,300,"carlos-adventure-enemy").setOrigin(0.5).setScale(0.3, 0.3)
		let character2 = this.add.image(960,300,"carlos").setOrigin(0.5).setSize(120, 120)
		let character3 = this.add.image(1600,300,"carlos-win-page").setOrigin(0.5).setScale(0.5, 0.5)

		this.selectorUnderline = this.add.ellipse(960, 500, 200, 20, Colors.White, 1).setOrigin(0.5)

		this.input.keyboard.once('keydown-SPACE', this.handleContinue, this)
		this.sound.play('WeHaveTheSeedThatsGonnaGerminate') 
	}

	update() {
		this.changeCharacter()

	}

	changeCharacter() {
		if (nextChange > this.time.now) {
			return
		} else if (this.cursors.left.isDown && chosenCharacter > 1) {
			chosenCharacter--
			nextChange = this.time.now + 300
		} else if (this.cursors.right.isDown && chosenCharacter < 3) {
			chosenCharacter++
			nextChange = this.time.now + 300
		}

		if (chosenCharacter == 1) {
			this.selectorUnderline.x = 400
		} else if (chosenCharacter == 2) {
			this.selectorUnderline.x = 960
		} else if (chosenCharacter == 3) {
			this.selectorUnderline.x = 1600
		}
	}

	handleContinue()
	{
		this.input.keyboard.once('keydown-SPACE', () => {
            this.sound.play('WeAreStarting')
			this.cameras.main.fadeOut(1000, 0, 0, 0)
			this.time.delayedCall(2000, () => {this.scene.stop(CharacterSelect)})
            this.time.delayedCall(2000, () => {this.scene.start(Instruction, { character: this.chosenCharacter, instruction: "adventure" })})
        });
		
	}
}