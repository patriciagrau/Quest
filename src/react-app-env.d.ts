/// <reference types="react-scripts" />

declare module 'react-speech-kit';

interface SDSContext {
    recResult: string;
    nluData: any;
    ttsAgenda: string;
    person: string,
    day: string,
    time: string,
    intent_res: any,
    command: any,
    counter: number,
    mushCount: number,
    mxCount: number,
    gobletCount: number,
    image: any

}

type SDSEvent =
    | { type: 'CLICK' }
    | { type: 'RECOGNISED' }
    | { type: 'ASRRESULT', value: string }
    | { type: 'ENDSPEECH' }
    | { type: 'LISTEN' }
    | { type: 'MAXSPEECH' }   
    | { type: 'SPEAK', value: string };
