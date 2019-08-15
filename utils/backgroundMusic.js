export class BgMusic {
    constructor(src) {
        this.audio = wx.createInnerAudioContext();
        this.setAudio(src);
    }
    play() {
        this.audio.play();
    }
    pause() {
        this.audio.pause();
    }
    changeMusic(src) {
        // this.audio.stop();
        this.audio.src = src;
        this.play();
    }
    setAudio(src) {
        this.audio.autoplay = true;
        this.audio.loop = true;
        this.audio.src = src;
    }
}