import { MachineConfig, Action, assign, actions } from "xstate";
const { send, cancel } = actions;


function say(text: string): Action<SDSContext, SDSEvent> {
    return send((_context: SDSContext) => ({ type: "SPEAK", value: text }))
}

function listen(): Action<SDSContext, SDSEvent> {
    return send('LISTEN')
}

function promptAndAsk(prompt: Action<SDSContext, SDSEvent>, nomatch: string, helping:string) : MachineConfig<SDSContext, any, SDSEvent> {
    return ({
        initial: 'prompt',
        states:{
            prompt: {
                entry: prompt,
                on: {ENDSPEECH: 'ask'}
            },
            ask: {
                entry: [send('LISTEN'), send('MAXSPEECH', {
                                                            delay: 5000,
                                                            id: 'maxsp'})],
            },
            nomatch: {
                entry: say(nomatch),
                on: { ENDSPEECH: "prompt" }
            },
            helping: {
                entry: say(helping),
                on: { ENDSPEECH: 'ask' }
            }
        }
    })
}

// function helping(message : string) : MachineConfig<SDSContext, any, SDSEvent> {
//     return({
//         initial: 'prompt',
//         states: {
//             prompt: {
//                 entry: message,
//                 on: {ENDSPEECH: 'appointment.hist'}
//             },
//             // ask: {
//             //     entry: [send('LISTEN')]
//             // }
//         }
//     }

//     )
// }


const grammar: { [index: string]: { person?: string, day?: string, time?: string } } = {
    "John": { person: "John Appleseed" },
    "Patricia" : { person: "Patricia"},
    "Minerva": { person: "Minerva S"},
    "mark": { person: "Marc G"},
    "vladislav": { person: "Vladislav M"},
    "Jacob": { person: "Jacobo"},
    "on Monday": { day: "Monday"},
    "on Tuesday": { day: "Tuesday"},
    "on Wednesday": { day: "Wednesday"},
    "on Thursday": { day: "Thursday"},
    "on Friday": { day: "Friday" },
    "on Saturday": { day: "Saturday" },
    "on Sunday": { day: "Sunday" },
    "tomorrow": { day: "tomorrow" },
    "at 9": { time: "9:00" },
    "at 10": { time: "10:00" },
    "at 11": { time: "11:00" },
    "at noon": { time: "12:00"},
}

const yesNo: { [index: string]: {yesNo: string}} = {
	"yes": { yesNo: "yes"},
	"yup": { yesNo: "yes"},
	"yeah": { yesNo: "yes"},
	"of course": { yesNo: "yes"},
	"duh": { yesNo: "yes"},
	"no": { yesNo: "no"},
	"niet": { yesNo: "no"},
	"no way": { yesNo: "no"},
	"nope": { yesNo: "no"},
}

const commands = {"stop":"S", "help":"S", "what":'W'};

let tempCount = 0;

export const dmMachine: MachineConfig<SDSContext, any, SDSEvent> = ({
    initial: 'init',
    states: {
        init: {
            on: {
                CLICK: 'welcome'
            }
        },
        welcome: { // name of the state
            initial: "prompt",
            on: { ENDSPEECH: "appointment" }, // events
            states: { // substates
                prompt: { entry: say("Let's create an appointment") }
            }
        },
        // stop: {  // Vlad's example
        //     entry: say("Ok"),
        //     always: 'init'
        // },
        maxspeech : {
            entry: say("Are you still there?"),
            on: {'ENDSPEECH': 'appointment.hist'}
        },
        disappointment: {
            entry: say("Oh well... I'm disappointed"),
            on: {'ENDSPEECH': 'init'}
        },
        appointment: {
            initial: "who",
            on: {
                MAXSPEECH: [ 
                {cond: (context) => context.counter === 3,
                target: 'disappointment'},
                {target: 'maxspeech',
                actions: assign((context) => { tempCount++; return { counter: tempCount } })}, // tempCount is my var and counter is kept in context
                ]
            },
            // on: {RECOGNISED: 
            // {
            //     target: "hist.helping",
            //     // actions: cancel('maxsp'),
            //     cond: (context) => (context.recResult in commands)
            // }
            // },
            states:{
                hist: { type : 'history'},
                who: 
                {
                    on: {
                        RECOGNISED: [{
                            cond: (context) => "person" in (grammar[context.recResult] || {}), 
                            actions: assign((context) => { return { person: grammar[context.recResult].person } }),
                                    // cancel('maxsp'), 
                            target: "day"
                        },
                        {
                            cond: (context) => (context.recResult in commands),
                            // actions: cancel('maxsp'),
                            // ...helping("You can say John or Patricia"),
                            // target: 'hist' // If I go to stop, how do I come back here? WITH HISTORY!!
                            target: ".helping"
                        },
                        { 
                            cond: (context) => !(context.recResult in commands),
                            // actions: cancel('maxsp'),
                            target: ".nomatch" }]
                    },
                    ...promptAndAsk(say("Who are you meeting with?"), "Sorry, I don't know them", "You can say John, Patricia, vladislav, and so on")
                },
                day:
                {
                    on: {
                        RECOGNISED: [{
                            cond: (context) => "day" in (grammar[context.recResult] || {}), 
                            actions: assign((context) => { return { day: grammar[context.recResult].day } }),
                                    // cancel('maxsp')],
                            target: "wholeDay"
        
                        },
                        {
                            cond: (context) => (context.recResult in commands),
                            target: ".helping"
                        },
                        {   
                            cond: (context) => !(context.recResult in commands),
                            // actions: cancel('maxsp'),
                            target: ".nomatch" }]
                        
                        },
                    ...promptAndAsk(send((context) => ({
                            type: "SPEAK",
                            value: `OK. ${context.person}. On which day is your meeting?`
                        })), 
                        "Sorry, when?", 
                        "You can say on Monday, on Tuesday, on Wednesday, and so on")
                },
                wholeDay:
                {
                    on: {
                        RECOGNISED: [{
                            cond: (context) => yesNo[context.recResult] ? yesNo[context.recResult].yesNo === 'yes' : false,
                            // actions: cancel('maxsp'),
                            target: "final1"
        
                        }, {
                            cond: (context) => yesNo[context.recResult] ? yesNo[context.recResult].yesNo === 'no' : false,
                            // actions: cancel('maxsp'),
                            target: "time"
                        },
                        {
                            cond: (context) => (context.recResult in commands),
                            target: ".helping"
                        },
                        {   cond: (context) => !(context.recResult in commands),
                            // actions: cancel('maxsp'),
                            target: ".nomatch" }]
                        
                        },
                    ...promptAndAsk(send((context) => ({ 
                        type: "SPEAK",
                        value: `OK. ${context.day}. Will it take the whole day?`
                    })),"Sorry, yes or no?",
                    "You should answer yes or no"
                    ),
                },
                final1:
                {
                    on: {
                        RECOGNISED: [{
                            cond: (context) => yesNo[context.recResult] ? yesNo[context.recResult].yesNo === 'yes' : false,
                            // actions: cancel('maxsp'),
                            target: "final"
        
                        }, {
                            cond: (context) => yesNo[context.recResult] ? yesNo[context.recResult].yesNo === 'no' : false,
                            // actions: cancel('maxsp'),
                            target: "who"
                        },
                        {
                            cond: (context) => (context.recResult in commands),
                            target: ".helping"
                        },
                        { 
                            cond: (context) => !(context.recResult in commands),
                            // actions: cancel('maxsp'),
                            target: ".nomatch" }]
                        
                        },
                    ...promptAndAsk(send((context) => ({ 
                    type: "SPEAK",
                    value: `OK. Do you want me to create an appointment with ${context.person} on ${context.day} for the whole day?`
                })), "Sorry, yes or no?",
                    "You should answer yes if it will take the whole day or no otherwise"
                    ),
                },
                time: 
                {
                    on: {
                        RECOGNISED: [{
                            cond: (context) => "time" in (grammar[context.recResult] || {}), 
                            actions: assign((context) => { return { time: grammar[context.recResult].time } }),
                                    //  cancel('maxsp'),],
                            target: "final2"
        
                        },
                        {
                            cond: (context) => (context.recResult in commands),
                            target: ".helping"
                        },
                        { 
                            cond: (context) => !(context.recResult in commands),
                            // actions: cancel('maxsp'),
                            target: ".nomatch" }]
                        
                        },
                    ...promptAndAsk(send((context) => ({
                    type: "SPEAK",
                    value: `OK. What time is your meeting?`
                })), "Sorry, could you repeat that?",
                    "You can say at ten, at eleven or at noon"
                    ),
                },
                final2: 
                {
                    on: {
                        RECOGNISED: [{
                            cond: (context) => yesNo[context.recResult] ? yesNo[context.recResult].yesNo === 'yes' : false,
                            // actions: cancel('maxsp'),
                            target: "final"
        
                        }, {
                            cond: (context) => yesNo[context.recResult] ? yesNo[context.recResult].yesNo === 'no' : false,
                            // actions: cancel('maxsp'),
                            target: "who"
                        },
                        {
                            cond: (context) => (context.recResult in commands),
                            target: ".helping"
                        },
                        { 
                            cond: (context) => !(context.recResult in commands),
                            // actions: cancel('maxsp'),
                            target: ".nomatch" }]
                        
                        },
                    ...promptAndAsk(send((context) => ({ 
                    type: "SPEAK",
                    value: `OK. Do you want me to create an appointment with ${context.person} on ${context.day} at ${context.time}?`
                })),
                    "Sorry, yes or no?",
                    "You should say yes or no"
                    ),
                },
                final:
                {
                    states: {
                        prompt: {
                            entry: send((context) => ({ 
                                type: "SPEAK",
                                value: `Your appointment has been created.`
                            })),
                        }
                    }
                }
            }
        }   
    } // final closing, do not touch!!!!
})
