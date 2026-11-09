// Maqam Hijaz on D (close to Persian Homayoun), in Hz; 0 is a breath.
const D4 = 293.66, Eb4 = 311.13, Fs4 = 369.99, G4 = 392, A4 = 440, Bb4 = 466.16, C5 = 523.25, D5 = 587.33
const BREATH = 0

/**
 * [frequency Hz, seconds, tongued, loudness 0–1 the note swells toward]. Untongued notes slur from the
 * one before. Three phrases, like an avaz: a slow call, a higher answer, and a cadence home to D.
 */
const PHRASE: [number, number, boolean, number][] = [
    [D4, .5, true, .45], [A4, .6, false, .8], [Bb4, .06, false, .8], [A4, .06, false, .8], [Bb4, .06, false, .8], [A4, .06, false, .8],
    [C5, .35, false, .9], [Bb4, .25, false, .8], [A4, .8, false, 1], [BREATH, .25, false, 0],

    [D5, .45, true, 1], [C5, .15, false, .9], [Bb4, .15, false, .85], [A4, .15, false, .8], [Bb4, .4, false, .9],
    [A4, .2, false, .75], [G4, .2, false, .7], [Fs4, .5, false, .8], [BREATH, .2, false, 0],

    [G4, .18, true, .7], [Fs4, .12, false, .65], [Eb4, .45, false, .8], [Fs4, .05, false, .7], [Eb4, .05, false, .7], [Fs4, .05, false, .7],
    [Eb4, .25, false, .65], [D4, 1.6, false, .55],
]
const VOLUME = .13
// odd harmonics dominate in a clarinet's low register, with faint even ones from the reed
const HARMONICS = [0, 1, .02, .75, .05, .5, .06, .35, .05, .22, .04, .14, .03, .08]

// Hijaz intonation, in cents: the second sits a little high and the third a little low, unlike a piano.
const INTONATION = new Map([[Eb4, 15], [Fs4, -12]])

const vary = (spread: number) => 1 + (Math.random() - .5) * spread
const drift = (cents: number) => (Math.random() - .5) * cents

let context: AudioContext | null = null
let playingUntil = 0

/** Must be called from a user gesture; browsers block audio otherwise. Returns ms until the phrase ends, 0 without audio. */
export function playClarinet(): number {
    try {
        const AudioCtx = window.AudioContext ?? (window as unknown as {webkitAudioContext: typeof AudioContext}).webkitAudioContext
        context ??= new AudioCtx()
        const ctx = context
        if (ctx.state === "suspended") void ctx.resume()
        if (ctx.currentTime < playingUntil) return (playingUntil - ctx.currentTime) * 1000

        const start = ctx.currentTime + .05
        // a little rubato, so no two plays share the same timing
        const notes = PHRASE.map(([frequency, duration, tongued, loudness]) => [frequency, duration > .1 ? duration * vary(.14) : duration, tongued, loudness] as const)
        const end = start + notes.reduce((sum, [, duration]) => sum + duration, 0)
        playingUntil = end

        // A clarinet's bore favours odd harmonics, which gives it the hollow tone.
        const osc = ctx.createOscillator()
        osc.setPeriodicWave(ctx.createPeriodicWave(new Float32Array(HARMONICS.length), new Float32Array(HARMONICS)))

        // vibrato and every pitch nuance below work in cents on detune, on top of the written note
        const vibrato = ctx.createOscillator()
        vibrato.frequency.value = 5.4
        const vibratoDepth = ctx.createGain()
        vibratoDepth.gain.value = 0
        vibrato.connect(vibratoDepth)
        vibratoDepth.connect(osc.detune)

        const filter = ctx.createBiquadFilter()
        filter.type = "lowpass"
        filter.frequency.value = 800
        filter.Q.value = .7
        // the reed and bore add a resonance around 1.5kHz that reads as "woody"
        const reed = ctx.createBiquadFilter()
        reed.type = "peaking"
        reed.frequency.value = 1500
        reed.Q.value = 1.2
        reed.gain.value = 5

        // breath through the reed: band-passed noise that follows the same envelope as the tone
        const noise = ctx.createBufferSource()
        noise.buffer = ctx.createBuffer(1, ctx.sampleRate, ctx.sampleRate)
        const samples = noise.buffer.getChannelData(0)
        for (let i = 0; i < samples.length; i++) samples[i] = Math.random() * 2 - 1
        noise.loop = true
        const breathBand = ctx.createBiquadFilter()
        breathBand.type = "bandpass"
        breathBand.frequency.value = 2200
        breathBand.Q.value = .9
        const breathLevel = ctx.createGain()
        breathLevel.gain.value = .05
        noise.connect(breathBand)
        breathBand.connect(breathLevel)

        const gain = ctx.createGain()
        gain.gain.setValueAtTime(0, start)

        // a slow, uneven waver in the breath, multiplied over the phrasing
        const swell = ctx.createGain()
        const tremor = ctx.createOscillator()
        tremor.frequency.value = 3.3 * vary(.3)
        const tremorDepth = ctx.createGain()
        tremorDepth.gain.value = .05
        tremor.connect(tremorDepth)
        tremorDepth.connect(swell.gain)

        let t = start
        let previous = notes[0][0]
        let afterBreath = true
        for (const [frequency, duration, tongued, loudness] of notes) {
            if (frequency === BREATH) {
                gain.gain.setTargetAtTime(0, t, .03)
                filter.frequency.setTargetAtTime(700, t, .05)
                afterBreath = true
                t += duration
                continue
            }

            const level = VOLUME * loudness
            const pitch = (INTONATION.get(frequency) ?? 0) + drift(8)
            if (tongued || afterBreath) {
                // an attacked note starts a little flat and settles up into pitch
                osc.frequency.setValueAtTime(frequency, t)
                osc.detune.setValueAtTime(pitch - 35, t)
                osc.detune.setTargetAtTime(pitch, t, .035)
                if (!afterBreath) gain.gain.setValueAtTime(level * .35, t)
                gain.gain.setTargetAtTime(level * 1.1, t, .015)
            } else {
                // slurred: slide over at an uneven speed, with a small dip as the fingers change
                osc.frequency.setValueAtTime(previous, t)
                osc.frequency.exponentialRampToValueAtTime(frequency, t + Math.min(.04 + Math.random() * .03, duration * .6))
                osc.detune.setTargetAtTime(pitch, t, .04)
                gain.gain.setTargetAtTime(level * .8, t, .01)
            }

            if (duration > .35) {
                // long notes swell into the middle and relax at the end
                gain.gain.setTargetAtTime(level, t + .06, duration * .25)
                gain.gain.setTargetAtTime(level * .82, t + duration * .7, duration * .2)
            } else {
                gain.gain.setTargetAtTime(level, t + .03, .03)
            }
            // louder is brighter, the main thing that separates a wind player from a synth
            filter.frequency.setTargetAtTime(800 + 2600 * loudness, t, .06)

            // vibrato arrives late on held notes, never at quite the same speed or width
            vibratoDepth.gain.setTargetAtTime(0, t, .05)
            if (duration > .3) {
                vibrato.frequency.setValueAtTime(5 + Math.random(), t)
                vibratoDepth.gain.setValueAtTime(0, t + duration * .3)
                vibratoDepth.gain.linearRampToValueAtTime(16 + Math.random() * 12, t + duration)
            }

            previous = frequency
            afterBreath = false
            t += duration
        }
        gain.gain.setTargetAtTime(0, end - .7, .25)

        // a short feedback echo stands in for a room
        const echo = ctx.createDelay()
        echo.delayTime.value = .13
        const feedback = ctx.createGain()
        feedback.gain.value = .34
        const wet = ctx.createGain()
        wet.gain.value = .22
        echo.connect(feedback)
        feedback.connect(echo)
        echo.connect(wet)
        wet.connect(ctx.destination)

        osc.connect(filter)
        filter.connect(reed)
        reed.connect(gain)
        breathLevel.connect(gain)
        gain.connect(swell)
        swell.connect(ctx.destination)
        swell.connect(echo)

        for (const source of [osc, vibrato, tremor, noise]) {
            source.start(start)
            source.stop(end + .3)
        }
        // the echo loop keeps the graph alive; cut it once the tail has faded
        setTimeout(() => wet.disconnect(), (end - ctx.currentTime + 2) * 1000)
        return (end - ctx.currentTime) * 1000
    } catch {
        // no Web Audio: the click still shows its tag
        return 0
    }
}
