import Phaser, { Physics } from 'phaser'

import Preload from './scenes/Preload'
import TitleScreen from './scenes/TitleScreen'
import CharacterSelect from './scenes/CharacterSelect'
import Instruction from './scenes/Instruction'
import Adventure from './scenes/Adventure'
import Showdown from './scenes/Showdown'
import Bankrun from './scenes/Bankrun'
import GameOver from './scenes/GameOver'
import Winner from './scenes/Winner'

import * as SceneKeys from './consts/SceneKeys'

const config = {
    width: 1920,
    height: 1080,
    type: Phaser.AUTO,
    physics: {
        default: "arcade",
        arcade: {
            gravity:{y:1000},
            debug: false
        }
    }
}

const game = new Phaser.Game(config);

game.scene.add(SceneKeys.Preload, Preload)
game.scene.add(SceneKeys.TitleScreen, TitleScreen)
game.scene.add(SceneKeys.CharacterSelect, CharacterSelect)
game.scene.add(SceneKeys.Instruction, Instruction)
game.scene.add(SceneKeys.Adventure, Adventure)
game.scene.add(SceneKeys.Showdown, Showdown)
game.scene.add(SceneKeys.Bankrun, Bankrun)
game.scene.add(SceneKeys.GameOver, GameOver)
game.scene.add(SceneKeys.Winner, Winner)


game.scene.start(SceneKeys.Preload)