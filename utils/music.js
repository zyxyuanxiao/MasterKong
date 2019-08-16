export class Music {
    constructor() {
        this.audioCtx = wx.createInnerAudioContext();
        this.audioCtx.src = '/audio/button.mp3';
    }
    play() {
        this.audioCtx.play();
    }
    pause() {
        this.audioCtx().pause();
    }
    stop() {
        this.audioCtx().stop();
    }
}

export function music() {
    return new Music()
}