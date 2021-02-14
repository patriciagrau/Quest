import { dmMachine as dmAppointment } from "./dmAppointment.ts";


import { MachineConfig, send, Action, assign } from "xstate"; 


import {nluRequest} from "./index.tsx"; // file extension not mandatory


function say(text: string): Action<SDSContext, SDSEvent> {
    return send((_context: SDSContext) => ({ type: "SPEAK", value: text }))
}

function listen(): Action<SDSContext, SDSEvent> {
    return send('LISTEN')
}

const options: { [index: string]: { choose: string} } = {
    "appointment": { choose: "appointment" },
    "appointments": { choose: "appointment" },
    "make an appointment": { choose: "appointment" },
    "create an appointment": { choose: "appointment" },
    "to do": { choose: "to_do_item"},
    "TO DO": { choose: "to_do_item"},
    "timer": { choose: "timer"}

}


export const dmMachine: MachineConfig<SDSContext, any, SDSEvent> = ({
	initial: 'init',
    states: {
        init: {
            on: {
                CLICK: 'welcome'
            }
        },
        welcome: { 
            initial: "prompt",
            on: {
				RECOGNISED: {target: "invoking_rasa"} /* [{
                    cond: (context) => options[context.recResult] ? options[context.recResult].choose === 'appointment' : false,
                    target: "appointment"

                }, {
					cond: (context) => options[context.recResult] ? options[context.recResult].choose === 'to do item' : false,
					target: "toDoItem"
				}, {
					cond: (context) => options[context.recResult] ? options[context.recResult].choose === "timer" : false,
					target: "timer"
				}, 
                { target: ".nomatch" }] */
				},
            states: {
                prompt: { 
					entry: say("What would you like to do?"),
					on: { ENDSPEECH: "ask" } },
                ask: { // program listens to you
                    entry: listen()
				},
                nomatch: {
                    entry: say("Pick appointment, to do item or timer"),
                    on: { ENDSPEECH: "prompt" }
            }
		}
        },
        appointment: { 
			...dmAppointment
		},
        toDoItem: {
			initial: "prompt",
			states: { 
				prompt: {entry: say("Let's create a to do item!") }
		}
		},
		timer: {
			initial: "prompt",
			states: {
				prompt: {entry: say("Let's create a timer!") }
				}
		},
		invoking_rasa: {
			invoke: {
				id: 'rasa',
				src: (context, event) => nluRequest(context.recResult), // Vlad had (context, event) => duckQuery(context.query)
				onDone: {
					target: "choosing_intent", 
				// 'answer',
					actions: assign((context, event) => { console.log(event.data); return { intent_res: event.data } }) // saving?
					},
				onError: {
					target: 'welcome',
					// actions
					}
		}
		},
		choosing_intent: {
			initial: "redirecting",
			on: {
				ENDSPEECH: [{
                    cond: (context) =>  context.intent_res.intent.name === 'appointment',
                    target: "appointment"

                }, {
					cond: (context) =>  context.intent_res.intent.name === 'to_do_item',
					target: "toDoItem"
				}, {
					cond: (context) =>  context.intent_res.intent.name === 'timer',
					target: "timer"
				}, 
                { target: ".nomatch" }]
			},
			states: {
				nomatch: {
					entry: say("Pick appointment, to do item or timer"),
					on: { ENDSPEECH: "..welcome" }
					},
				redirecting: {
					entry: say("Redirecting...")}
			}
		},
		answer : {
			entry: send((context: SDSContext) => ({
				type: "SPEAK", value: `${context.intent_res.intent.name}`
				})),
			on: { ENDSPEECH: 'init'}
		}
        } // final closing, do not touch!!!!
})
