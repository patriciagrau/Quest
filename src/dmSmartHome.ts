import { MachineConfig, send, Action, assign } from "xstate";

// SRGS parser and example (logs the results to console on page load)
import { loadGrammar } from './runparser'
import { parse } from './chartparser'
import { grammar } from './grammars/commandGrammar'

const gram = loadGrammar(grammar)

function say(text: string): Action<SDSContext, SDSEvent> {
    return send((_context: SDSContext) => ({ type: "SPEAK", value: text }))
}

function listen(): Action<SDSContext, SDSEvent> {
    return send('LISTEN')
}

/*
const input = "do be do be do"
const prs = parse(input.split(/\s+/), gram)
const result = prs.resultsForRule(gram.$root)[0]
console.log(result)
*/

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
            on: { ENDSPEECH: "what" }, // events
            states: { // substates
                prompt: { entry: say("Hello, how can I help you?") },
            }
        },
        what: {
            initial: "ask",
            on: {
                RECOGNISED: {
                    actions: assign((context) => { 
						const prs = parse(context.recResult.split(/\s+/), gram)
						const result = prs.resultsForRule(gram.$root)[0]
						console.log(result)
						return { command: result } }), // context.command contains the {action: "close", object: "door"}
                    target: "replying"
                },
            },
            states: {
                ask: { // program listens to you
                    entry: listen()
                }
            }
        },
      replying: {
		  initial: "prompt",
            // on: { ENDSPEECH: "what" }, // events
            states: { // substates
                prompt: { 
					entry: send((context) => ({ 
                        type: "SPEAK",
                        value: `Okily dokily, ${context.command.action} the ${context.command.object}`
                    }))
            }
		  }
        }
	}
	})
