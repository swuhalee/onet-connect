import * as Tone from 'tone';

let isInitialized = false;

async function initializeTone(): Promise<void> {
    if (!isInitialized) {
        try {
            await Tone.start();
            isInitialized = true;
        } catch (error) {
            console.log('Tone.js initialization failed:', error);
        }
    }
}

/**
 * 타일 클릭 시 재생할 사운드
 */
export async function playTileClickSound(): Promise<void> {
    try {
        await initializeTone();
        
        const oscillator = new Tone.Oscillator({
            frequency: 800,
            type: 'sine',
            volume: -20
        });
        
        oscillator.toDestination();
        
        oscillator.start();
        oscillator.stop('+0.1');
    } catch (error) {
        console.log('Tile click sound playback failed:', error);
    }
}

/**
 * 매칭 성공 시 재생할 사운드
 */
export async function playMatchSuccessSound(): Promise<void> {
    try {
        await initializeTone();
        
        const duration = 0.5;
        const now = Tone.now();
        
        const oscillator1 = new Tone.Oscillator({
            frequency: 523.25,
            type: 'sine',
            volume: -20
        });
        
        const oscillator2 = new Tone.Oscillator({
            frequency: 659.25,
            type: 'sine',
            volume: -26
        });

        const oscillator3 = new Tone.Oscillator({
            frequency: 783.99,
            type: 'sine',
            volume: -26
        });
        
        oscillator1.toDestination();
        oscillator2.toDestination();
        oscillator3.toDestination();

        oscillator1.volume.rampTo(-40, duration);
        oscillator2.volume.rampTo(-40, duration);
        oscillator3.volume.rampTo(-40, duration);
        
        oscillator1.start(now);
        oscillator2.start(now);
        oscillator3.start(now);
        
        oscillator1.stop(`+${duration}`);
        oscillator2.stop(`+${duration}`);
        oscillator3.stop(`+${duration}`);
    } catch (error) {
        console.log('Matching success sound playback failed:', error);
    }
} 