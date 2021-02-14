import { MachineConfig, send, Action, assign } from "xstate";


function say(text: string): Action<SDSContext, SDSEvent> {
    return send((_context: SDSContext) => ({ type: "SPEAK", value: text }))
}

function listen(): Action<SDSContext, SDSEvent> {
    return send('LISTEN')
}

const grammar: { [index: string]: { person?: string, day?: string, time?: string } } = {
    "John": { person: "John Appleseed" },
    "Minerva": { person: "Minerva S"},
    "your mom": { person: "my mom, Patricia"},
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

export const dmMachine: MachineConfig<SDSContext, any, SDSEvent> = ({
    initial: 'welcome',
    states: {
        init: {
            on: {
                CLICK: 'welcome'
            }
        },
        welcome: { // name of the state
            initial: "prompt",
            on: { ENDSPEECH: "who" }, // events
            states: { // substates
                prompt: { entry: say("Let's create an appointment") },
                testState: { entry: say("Hey!")}
            }
        },
        who: {
            initial: "prompt",
            on: {
                RECOGNISED: [{
                    // cond: (context) => grammar[context.recResult].person !== undefined,
                    cond: (context) => "person" in (grammar[context.recResult] || {}), // It checks if the person is in the grammar
                    actions: assign((context) => { return { person: grammar[context.recResult].person } }), // The computer keeps the information in the object context
                    target: "day"

                },
                { target: ".nomatch" }]
            },
            states: {
                prompt: {
                    entry: say("Who are you meeting with?"),
                    on: { ENDSPEECH: "ask" }
                },
                ask: { // program listens to you
                    entry: listen()
                },
                nomatch: {
                    entry: say("Sorry I don't know them"),
                    on: { ENDSPEECH: "prompt" }
                }
            }
        },
        day: {
            initial: "prompt",
            on: {
				RECOGNISED: [{
                    cond: (context) => "day" in (grammar[context.recResult] || {}), // It checks if the day is in the grammar
                    actions: assign((context) => { return { day: grammar[context.recResult].day } }), // The computer keeps the information in the object context
                    target: "wholeDay"

                },
                { target: ".nomatch" }]
				
				},
            states: {
                prompt: {
                    entry: send((context) => ({ // We need to access the context that has the info. Similar to "say" function
                        type: "SPEAK",
                        value: `OK. ${context.person}. On which day is your meeting?`
                    })),
                    on: { ENDSPEECH: "ask"}
                },
                ask: { // program listens to you
                    entry: listen()
                },
                nomatch: {
                    entry: say("Sorry, when?"),
                    on: { ENDSPEECH: "ask" }
                }
            }
        },
        wholeDay: {
            initial: "prompt",
            on: {
				RECOGNISED: [{
                    // cond: (context) => context.recResult === 'yes',
                    cond: (context) => yesNo[context.recResult] ? yesNo[context.recResult].yesNo === 'yes' : false,
                    target: "final1"

                }, {
					// cond: (context) => context.recResult === 'no',
					cond: (context) => yesNo[context.recResult] ? yesNo[context.recResult].yesNo === 'no' : false,
					target: "time"
				},
                { target: ".nomatch" }]
				
				},
            states: {
                prompt: {
                    entry: send((context) => ({ // We need to access the context that has the info. Similar to "say" function
                        type: "SPEAK",
                        value: `OK. ${context.day}. Will it take the whole day?`
                    })),
                    on: { ENDSPEECH: "ask"}
                },
                ask: { // program listens to you
                    entry: listen()
                },
                nomatch: {
                    entry: say("Sorry, yes or no?"),
                    on: { ENDSPEECH: "ask" }
                }
            }
        },
        final1: {
            initial: "prompt",
            on: {
				RECOGNISED: [{
                    //cond: (context) => context.recResult === 'yes',
                    cond: (context) => yesNo[context.recResult] ? yesNo[context.recResult].yesNo === 'yes' : false,
                    target: "final"

                }, {
					//cond: (context) => context.recResult === 'no',
					cond: (context) => yesNo[context.recResult] ? yesNo[context.recResult].yesNo === 'no' : false,
					target: "who"
				},
                { target: ".nomatch" }]
				
				},
            states: {
                prompt: {
                    entry: send((context) => ({ // We need to access the context that has the info. Similar to "say" function
                        type: "SPEAK",
                        value: `OK. Do you want me to create an appointment with ${context.person} on ${context.day} for the whole day?`
                    })),
                    on: { ENDSPEECH: "ask"}
                },
                ask: { // program listens to you
                    entry: listen()
                },
                nomatch: {
                    entry: say("Sorry, yes or no?"),
                    on: { ENDSPEECH: "ask" }
                }
            }
        },
        time: {
            initial: "prompt",
            on: {
				RECOGNISED: [{
                    cond: (context) => "time" in (grammar[context.recResult] || {}), // It checks if the day is in the grammar
                    actions: assign((context) => { return { time: grammar[context.recResult].time } }), // The computer keeps the information in the object context
                    target: "final2"

                },
                { target: ".nomatch" }]
				
				},
            states: {
                prompt: {
                    entry: send((context) => ({ // We need to access the context that has the info. Similar to "say" function
                        type: "SPEAK",
                        value: `OK. What time is your meeting?`
                    })),
                    on: { ENDSPEECH: "ask"}
                },
                ask: { // program listens to you
                    entry: listen()
                },
                nomatch: {
                    entry: say("Sorry, could you repeat that?"),
                    on: { ENDSPEECH: "ask" }
                }
            }
        },
        final2: {
            initial: "prompt",
            on: {
				RECOGNISED: [{
                    // cond: (context) => context.recResult === 'yes',
                    cond: (context) => yesNo[context.recResult] ? yesNo[context.recResult].yesNo === 'yes' : false,
                    target: "final"

                }, {
					// cond: (context) => context.recResult === 'no',
					cond: (context) => yesNo[context.recResult] ? yesNo[context.recResult].yesNo === 'no' : false,
					target: "who"
				},
                { target: ".nomatch" }]
				
				},
            states: {
                prompt: {
                    entry: send((context) => ({ // We need to access the context that has the info. Similar to "say" function
                        type: "SPEAK",
                        value: `OK. Do you want me to create an appointment with ${context.person} on ${context.day} at ${context.time}?`
                    })),
                    on: { ENDSPEECH: "ask"}
                },
                ask: { // program listens to you
                    entry: listen()
                },
                nomatch: {
                    entry: say("Sorry, yes or no?"),
                    on: { ENDSPEECH: "ask" }
                }
            }
        },
        final: {
            initial: "prompt",
            /*
            on: {
				ENDSPEECH: "init"
			}, */
            states: {
                prompt: {
                    entry: send((context) => ({ 
                        type: "SPEAK",
                        value: `Your appointment has been created.`
                    })),
                    //on: { ENDSPEECH: "ask"}
                }
            }
        },
        
    } // final closing, do not touch!!!!
})
