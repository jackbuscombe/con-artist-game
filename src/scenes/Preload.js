import Phaser from 'phaser'

import { TitleScreen, Adventure, Bankrun, Showdown, Instruction, Winner } from '../consts/SceneKeys'
import WebFontFile from './WebFontFile'
import * as AudioKeys from '../consts/AudioKeys'

export default class Preload extends Phaser.Scene {

    preload() {

        // TitleScreen
        this.load.image('carlos-scream', 'assets/backgrounds/carlos-scream.png')
        this.load.image('carlos', 'assets/backgrounds/carlos-head.png')
        this.load.image('bitconnect-eyes', 'assets/backgrounds/carlos-bitconnect-eyes.png')
        this.load.image('carlos-win-page', 'assets/backgrounds/carlos-win-page.png')
        this.load.image('carlos-adventure-enemy', 'assets/sprites/carlos-adventure-enemy.png')

        



        // Adventure World
        this.load.image('ground-tiles', 'assets/spritesheets/spritesheet_ground.png')
        this.load.image('things-tiles', 'assets/spritesheets/spritesheet_tiles.png')
        this.load.tilemapTiledJSON('tilemap', 'assets/adventure.json')

        // Player
        this.load.atlas('player', 'assets/player.png', 'assets/player.json')

        // Player From CharacterSelect Scene
		// this.load.atlas(this.selectedCharacter,`characters/${this.selectedCharacter}.png`, `characters/${this.selectedCharacter}.json`
		// )

        // Carlos Animate
        this.load.image('carlos-run1', 'assets/carlos/run1.png')
        this.load.image('carlos-run2', 'assets/carlos/run2.png')
        this.load.image('carlos-run3', 'assets/carlos/run3.png')
        this.load.image('carlos-run4', 'assets/carlos/run4.png')



        // Load Background
        this.load.image('sky', 'assets/backgrounds/sky.png')
        this.load.image('mountains', 'assets/backgrounds/mountains.png')
        this.load.image('plateau', 'assets/backgrounds/plateau.png')
        this.load.image('plants', 'assets/backgrounds/plant.png')
        this.load.image('ground', 'assets/backgrounds/ground.png')
        this.load.image('floor', 'assets/backgrounds/adventure-floor.png')
        this.load.image('showdown-background', 'assets/backgrounds/showdown-background1.png')

        // Load Adventure Levels
        this.load.image('grass-left', 'assets/levels/grassLeft.png')
        this.load.image('grass', 'assets/levels/grassMid.png')
        this.load.image('grass-right', 'assets/levels/grassRight.png')

        this.load.image('grass-cliff-left', 'assets/levels/grassCliff_left.png')
        this.load.image('grass-cliff-right', 'assets/levels/grassCliff_right.png')

        this.load.image('grass-half-left', 'assets/levels/grassHalf_left.png')
        this.load.image('grass-half-mid', 'assets/levels/grassHalf_mid.png')
        this.load.image('grass-half-right', 'assets/levels/grassHalf_right.png')

        this.load.image('grass-half', 'assets/levels/grassHalf.png')

        // Load Showdown Stage
        this.load.image('showdown-stage-left', 'assets/backgrounds/planetLeft.png')
        this.load.image('showdown-stage-mid', 'assets/backgrounds/planetMid.png')
        this.load.image('showdown-stage-right', 'assets/backgrounds/planetRight.png')
        this.load.image('showdown-stage-center', 'assets/backgrounds/planetCenter.png')

        // Load Sprites
        this.load.image('spike', 'assets/sprites/pyramid.png')
        this.load.image('bitcoin', "assets/sprites/bitcoin.png")
        this.load.image('conference-room', 'assets/sprites/pyramidMayan.png')
        this.load.image('bank', 'assets/sprites/castleSmallAlt.png')

        // Load Objects
        this.load.image('ladder', 'assets/objects/ladderMid.png')
        this.load.image('ladder-top', 'assets/objects/ladderTop.png')
        this.load.image('exit-sign', 'assets/objects/signExit.png')
        this.load.image('left-sign', 'assets/objects/signLeft.png')
        this.load.image('right-sign', 'assets/objects/signRight.png')
        this.load.image('spring', 'assets/objects/spring.png')
        this.load.image('sprung', 'assets/objects/sprung.png')

        // Fonts
        const fonts = new WebFontFile(this.load, 'Press Start 2P')
        this.load.addFile(fonts)

        // Music
        this.load.audio(AudioKeys.AdventureMusic, 'assets/music/adventure-music.mp3')
        this.load.audio(AudioKeys.SuspenseMusic, 'assets/music/suspense-track.mp3')
        this.load.audio(AudioKeys.BankrunMusic, 'assets/music/bankrun-superepic.mp3')

        

        // Carlos Sounds
        this.load.audio('25610Dollars', 'assets/sounds/carlos/25610Dollars.mp3')
        this.load.audio('140000Dollars', 'assets/sounds/carlos/140000Dollars.mp3')
        this.load.audio('Amazing', 'assets/sounds/carlos/Amazing.mp3')
        this.load.audio('Ammmmmmazing', 'assets/sounds/carlos/Ammmmmmazing.mp3')
        this.load.audio('AndThatsGoingToExplode', 'assets/sounds/carlos/AndThatsGoingToExplode.mp3')
        this.load.audio('BelieveInMe', 'assets/sounds/carlos/BelieveInMe.mp3')
        this.load.audio('Belting', 'assets/sounds/carlos/Belting.mp3')
        this.load.audio('BitConnectClipping', 'assets/sounds/carlos/BitConnectClipping.mp3')
        this.load.audio('BitconnectExtremeClipping', 'assets/sounds/carlos/BitconnectExtremeClipping.mp3')
        this.load.audio('BitConnectFinal', 'assets/sounds/carlos/BitConnectFinal.mp3')
        this.load.audio('Bitconneeec', 'assets/sounds/carlos/Bitconneeec.mp3')
        this.load.audio('ConArtistGame', 'assets/sounds/carlos/ConArtistGame.mp3')
        this.load.audio('EverydayBasis7DaysAWeek', 'assets/sounds/carlos/EverydayBasis7DaysAWeek.mp3')
        this.load.audio('Exciting', 'assets/sounds/carlos/Exciting.mp3')
        this.load.audio('Glorious', 'assets/sounds/carlos/Glorious.mp3')
        this.load.audio('GoAllOverTheWorld', 'assets/sounds/carlos/GoAllOverTheWorld.mp3')
        this.load.audio('HereTheyreRightOnTheTable', 'assets/sounds/carlos/HereTheyreRightOnTheTable.mp3')
        this.load.audio('HerRightOnHerOnHerTable', 'assets/sounds/carlos/HerRightOnHerOnHerTable.mp3')
        this.load.audio('Hey', 'assets/sounds/carlos/Hey.mp3')
        this.load.audio('HeyHeyHeyBlowout', 'assets/sounds/carlos/HeyHeyHeyBlowout.mp3')
        this.load.audio('HeyHeyHeyErry', 'assets/sounds/carlos/HeyHeyHeyErry.mp3')
        this.load.audio('HeyHeyHeyFull', 'assets/sounds/carlos/HeyHeyHeyFull.mp3')
        this.load.audio('HoneyLookThisIsReal', 'assets/sounds/carlos/HoneyLookThisIsReal.mp3')
        this.load.audio('IAmRightNowIndependently', 'assets/sounds/carlos/IAmRightNowIndependently.mp3')
        this.load.audio('IAmRightNowIndependentlyFinanciallyIndependently', 'assets/sounds/carlos/IAmRightNowIndependentlyFinanciallyIndependently.mp3')
        this.load.audio('IMeanAround1400Dollars', 'assets/sounds/carlos/IMeanAround1400Dollars.mp3')
        this.load.audio('ImGonnaGoToTheBankImGonneGetMyBitcoins', 'assets/sounds/carlos/ImGonnaGoToTheBankImGonneGetMyBitcoins.mp3')
        this.load.audio('IStarted137DaysAgo', 'assets/sounds/carlos/IStarted137DaysAgo.mp3')
        this.load.audio('LetMeTellYouILoooooove', 'assets/sounds/carlos/LetMeTellYouILoooooove.mp3')
        this.load.audio('LoveScreaming', 'assets/sounds/carlos/LoveScreaming.mp3')
        this.load.audio('MakingSoMuchMoneyTheyProbablyHaveARealHardTimeCountingIt', 'assets/sounds/carlos/MakingSoMuchMoneyTheyProbablyHaveARealHardTimeCountingIt.mp3')
        this.load.audio('MenacingHahaha', 'assets/sounds/carlos/MenacingHahaha.mp3')
        this.load.audio('MenacingLaugh2', 'assets/sounds/carlos/MenacingLaugh2.mp3')
        this.load.audio('MenacingLaugh3', 'assets/sounds/carlos/MenacingLaugh3.mp3')
        this.load.audio('MenacingLaugh3Extension', 'assets/sounds/carlos/MenacingLaugh3Extension.mp3')
        this.load.audio('Mmm', 'assets/sounds/carlos/Mmm.mp3')
        this.load.audio('MmmmMmm', 'assets/sounds/carlos/MmmmMmm.mp3')
        this.load.audio('MmmMmmNoNoNo', 'assets/sounds/carlos/MmmMmmNoNoNo.mp3')
        this.load.audio('MyNameIsCarlosMatos', 'assets/sounds/carlos/MyNameIsCarlosMatos.mp3')
        this.load.audio('MyNameIsCarlosMatosAndIAmComingFromNY', 'assets/sounds/carlos/MyNameIsCarlosMatosAndIAmComingFromNY.mp3')
        this.load.audio('MyWifeStillDoesntBelieveInMe', 'assets/sounds/carlos/MyWifeStillDoesntBelieveInMe.mp3')
        this.load.audio('Nonononononono', 'assets/sounds/carlos/Nonononononono.mp3')
        this.load.audio('OneHund', 'assets/sounds/carlos/OneHund.mp3')
        this.load.audio('PresenterCarlos', 'assets/sounds/carlos/PresenterCarlos.mp3')
        this.load.audio('PresenterMrCarlos', 'assets/sounds/carlos/PresenterMrCarlos.mp3')
        this.load.audio('PresenterThankYouSoMuch', 'assets/sounds/carlos/PresenterThankYouSoMuch.mp3')
        this.load.audio('PresenterThankYouSoMuchCarlos', 'assets/sounds/carlos/PresenterThankYouSoMuchCarlos.mp3')
        this.load.audio('PresenterYess', 'assets/sounds/carlos/PresenterYess.mp3')
        this.load.audio('RightNowIndependtly', 'assets/sounds/carlos/RightNowIndependtly.mp3')
        this.load.audio('Scam', 'assets/sounds/carlos/Scam.mp3')
        this.load.audio('SoMuchMoney', 'assets/sounds/carlos/SoMuchMoney.mp3')
        this.load.audio('Super', 'assets/sounds/carlos/Super.mp3')
        this.load.audio('TenThousandDollars', 'assets/sounds/carlos/TenThousandDollars.mp3')
        this.load.audio('TenThousandDollarsADayOnHer', 'assets/sounds/carlos/TenThousandDollarsADayOnHer.mp3')
        this.load.audio('ThatsAScam', 'assets/sounds/carlos/ThatsAScam.mp3')
        this.load.audio('ThatsGonnaGerminate', 'assets/sounds/carlos/ThatsGonnaGerminate.mp3')
        this.load.audio('ThenShesGonnaSay', 'assets/sounds/carlos/ThenShesGonnaSay.mp3')
        this.load.audio('TheWorldIsNotAnymoreTheWayItUsedToBe', 'assets/sounds/carlos/TheWorldIsNotAnymoreTheWayItUsedToBe.mp3')
        this.load.audio('TheyCanProbablyHaveARealHardTimeCountinIt', 'assets/sounds/carlos/TheyCanProbablyHaveARealHardTimeCountinIt.mp3')
        this.load.audio('ThisWasGoingToBeAConArtistGame', 'assets/sounds/carlos/ThisWasGoingToBeAConArtistGame.mp3')
        this.load.audio('ThisWasGoingToBeAScammerGame', 'assets/sounds/carlos/ThisWasGoingToBeAScammerGame.mp3')
        this.load.audio('Up', 'assets/sounds/carlos/Up.mp3')
        this.load.audio('VietnamHeheMyCrewFromVietnam', 'assets/sounds/carlos/VietnamHeheMyCrewFromVietnam.mp3')
        this.load.audio('WaitImGonnaGoToTheBank', 'assets/sounds/carlos/WaitImGonnaGoToTheBank.mp3')
        this.load.audio('WassaWassaBitconnectFull', 'assets/sounds/carlos/WassaWassaBitconnectFull.mp3')
        this.load.audio('Wassawassawassawassuup', 'assets/sounds/carlos/Wassawassawassawassuup.mp3')
        this.load.audio('Wassup', 'assets/sounds/carlos/Wassup.mp3')
        this.load.audio('Waves', 'assets/sounds/carlos/Waves.mp3')
        this.load.audio('WeAreBeltingTheEntireWorld', 'assets/sounds/carlos/WeAreBeltingTheEntireWorld.mp3')
        this.load.audio('WeAreComing', 'assets/sounds/carlos/WeAreComing.mp3')
        this.load.audio('WeAreComingAndWeAreComingInWaves', 'assets/sounds/carlos/WeAreComingAndWeAreComingInWaves.mp3')
        this.load.audio('WeAreComingInWaves', 'assets/sounds/carlos/WeAreComingInWaves.mp3')
        this.load.audio('WeAreStarting', 'assets/sounds/carlos/WeAreStarting.mp3')
        this.load.audio('WeHaveTheSeed', 'assets/sounds/carlos/WeHaveTheSeed.mp3')
        this.load.audio('WeHaveTheSeedThatsGonnaGerminate', 'assets/sounds/carlos/WeHaveTheSeedThatsGonnaGerminate.mp3')
        this.load.audio('WelcomeToNewYorkMrCarlos', 'assets/sounds/carlos/WelcomeToNewYorkMrCarlos.mp3')
        this.load.audio('What', 'assets/sounds/carlos/What.mp3')
        this.load.audio('WhatAmIGonnaDo', 'assets/sounds/carlos/WhatAmIGonnaDo.mp3')
        this.load.audio('Why', 'assets/sounds/carlos/Why.mp3')
        this.load.audio('WoaahhHighPitch', 'assets/sounds/carlos/WoaahhHighPitch.mp3')
        this.load.audio('WoahHahahaha', 'assets/sounds/carlos/WoahHahahaha.mp3')
        this.load.audio('WoahhhClip', 'assets/sounds/carlos/WoahhhClip.mp3')
        this.load.audio('Wowowowowow', 'assets/sounds/carlos/Wowowowowow.mp3')
        this.load.audio('WowowowowoWassup', 'assets/sounds/carlos/WowowowowoWassup.mp3')
        this.load.audio('YeyeyeyeOkayThatsReal', 'assets/sounds/carlos/YeyeyeyeOkayThatsReal.mp3')
        this.load.audio('Yeyeyeyeyeye', 'assets/sounds/carlos/Yeyeyeyeyeye.mp3')
        this.load.audio('YoureGonnaLoseAllYourMoney', 'assets/sounds/carlos/YoureGonnaLoseAllYourMoney.mp3')
    }

    create() {
        this.scene.start(TitleScreen)
    }
}