import { MachineConfig, Action, assign, actions } from "xstate";
const { send, cancel } = actions;

import {nluRequest} from "./index";

import img1 from "./images/Diapositiva1.png";
import img2 from "./images/Diapositiva2.png";
import img3 from "./images/Diapositiva3.png";
import img4 from "./images/Diapositiva4.png";
import img5 from "./images/Diapositiva5.png";
import img6 from "./images/Diapositiva6.png";
import img7 from "./images/Diapositiva7.png";
import img8 from "./images/Diapositiva8.png";
import img9 from "./images/Diapositiva9.png";
import img10 from "./images/Diapositiva10.png";
import img11 from "./images/Diapositiva11.png";
import img12 from "./images/Diapositiva12.png";
import img13 from "./images/Diapositiva13.png";
import img14 from "./images/Diapositiva14.png";
import img15 from "./images/Diapositiva15.png";
import img16 from "./images/Diapositiva16.png";
import img17 from "./images/Diapositiva17.png";
import img18 from "./images/Diapositiva18.png";
import img19 from "./images/Diapositiva19.png";
import img20 from "./images/Diapositiva20.png";
import img21 from "./images/Diapositiva21.png";
import img22 from "./images/Diapositiva22.png";
import img24 from "./images/Diapositiva24.png";
import img25 from "./images/Diapositiva25.png";
import img26 from "./images/Diapositiva26.png";
import img27 from "./images/Diapositiva27.png";
import img28 from "./images/Diapositiva28.png";
import img29 from "./images/Diapositiva29.png";
import img30 from "./images/Diapositiva30.png";
import img31 from "./images/Diapositiva31.png";
import img32 from "./images/Diapositiva32.png";
import img33 from "./images/Diapositiva33.png";
import img34 from "./images/Diapositiva34.png";
import img35 from "./images/Diapositiva35.png";
import img36 from "./images/Diapositiva36.png";
import img37 from "./images/Diapositiva37.png";
import img38 from "./images/Diapositiva38.png";
import img39 from "./images/Diapositiva39.png";
import img40 from "./images/Diapositiva40.png";
import img41 from "./images/Diapositiva41.png";
import img42 from "./images/Diapositiva42.png";
import img43 from "./images/Diapositiva43.png";
import img44 from "./images/Diapositiva44.png";
import img45 from "./images/Diapositiva45.png";
import imgoops from "./images/oops.png";
import imgoops2 from "./images/oops2.png";
import imgoops3 from "./images/oops3.png";
import imgNoReply from "./images/noReply.png";


function say(text: string): Action<SDSContext, SDSEvent> {
    return send((_context: SDSContext) => ({ type: "SPEAK", value: text }))
}

function listen(): Action<SDSContext, SDSEvent> {
    return send('LISTEN')
}

function promptAndAsk(prompt: Action<SDSContext, SDSEvent>, nomatch: string, helping: string): any {
    return ({
        prompt: {
            entry: prompt,
            on: { ENDSPEECH: 'ask' }
        },
        ask: {
            entry: [send('LISTEN'), send('MAXSPEECH', {
                delay: 10000,
                id: 'maxsp'
            })] // should I add the rasa state here? But how can I go to game.hist from here?
        },
        nomatch: {
            entry: say(nomatch),
            on: { ENDSPEECH: "ask" }
        },
        helping: {
            entry: say(helping),
            on: { ENDSPEECH: 'ask' }
        },
    })
}

function rasa(): any {
    return ({
        rasa: {
            id: "rasastate",
			invoke: {
				id: 'rasa',
				src: (context, event) => nluRequest(context.recResult),
				onDone: {
					target: `redirect`,
					actions: assign((context, event) => { console.log(event.data); return { intent_res: event.data } }) 
					},
				onError: {
					target: '#root.dm.init',
					}
                }
        },
    })
}

let tempCount = 0;
let maxCount = 0;
let mushroomCount = 0;
let goblet = 0;

export const dmMachine: MachineConfig<SDSContext, any, SDSEvent> = ({
    initial: 'init',
    states: {
        init: {
            on: {
                CLICK: {
                    actions: assign((context) => { return {image : img2} }),
                    target: "game"}
            }
        },
        invokingRasa: {
            id: "invokingRasa",
			invoke: {
				id: 'rasa',
				src: (context, event) => nluRequest(context.recResult),
				onDone: {
					target: "game.torch.redirect",
					actions: assign((context, event) => { console.log(event.data); return { intent_res: event.data } }) 
					},
				onError: {
					target: 'init',
					}
		}
		},
        maxspeech: {
            entry: say("Are you still there?"),
            on: {'ENDSPEECH': 'game.hist'}
        },
        goodBye: {
            entry: say("Oh well... You lost because there is no reply. Try again!"),
            on: {'ENDSPEECH': 'init'}
        },
        game: {
            id: "game",
            initial: "welcome",
            on: {
                MAXSPEECH: [
                    {cond: (context) => context.mxCount === 3,
                        actions: assign((context) => { return {image : imgNoReply} }),
                        target: 'goodBye'},
                        {target: 'maxspeech',
                        actions: assign((context) => { maxCount++; return { mxCount: maxCount } })}, 
                ]
            },
            states: {
                hist: {
                    type: "history",
                    history: "deep",
                },
                shallowhist: {
                    type: "history",
                    history: "shallow",
                },
                welcome: {
                    initial: "prompt",
                    on: { ENDSPEECH: {
                        actions: assign((context) => { return {image : img3} }),
                        target: "torch"} },
                    states: {
                        prompt: {
                            // entry: say("Let's get on with it")
                            entry: say("Hello adventurer! It seems you \
                        have fallen into a cave, when you were coming back from school \
                        near the Valley of Mystery. There are many legends of this place, \
                        of the treasures it contains, but also of the dangers within. \
                        Let’s try to get out of here! If you need help, you can say “help” \
                        or “hint” at any point, and I will help you in any way I can!")
                        }
                    }
                },
                torch: {
                    id: "torch",
                    initial: "prompt",
                    on: { 
                        RECOGNISED: [
                            {target: ".rasa" }
                        ]
                    },
                    states: {
                        ...promptAndAsk(say("It is very dark and humid… Do you want to light a torch?"),
                            "Sorry, yes or no to lighting a torch?",
                            "I would suggest saying 'yes' and lighting a torch... \
                            It is very dark in here!"),
                        ...rasa(),
                            redirect: {
                                always:[
                                    {
                                    cond: (context) =>  context.intent_res.intent.name === 'affirm',
                                    actions: assign((context) => { return {image : img5} }),
                                    target: "#yesTorch"
                                }, {
                                    cond: (context) =>  context.intent_res.intent.name === 'deny',
                                    actions: assign((context) => { return {image : img4} }),
                                    target: "#noTorch"
                                }, {
                                    cond: (context) =>  context.intent_res.intent.name === 'help',
                                    target: "helping"
                                }, {
                                    target: "nomatch"
                                }]
                            }
                    }
                },
                noTorch: {
                    id: "noTorch",
                    initial: "prompt",
                    on: { ENDSPEECH: {
                        actions: assign((context) => { return {image : img5} }),
                        target: "yesTorch"} },
                    states: {
                        prompt: {
                            entry: say("oh… okay. That does not seem like a sensible idea, \
                        adventurer. Where are we going? Try to stretch your arms… Eeww... \
                        what was that? No, no, no I do not care if you don’t want to \
                        light a torch, you HAVE TO. Aah... much better! ")
                        }
                    }
                },
                yesTorch: {
                    id: "yesTorch",
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: ".rasa"
                        }
                    },
                    states: { 
                        ...promptAndAsk(say("You look around to see a dark tunnel going \
                        deeper into the mountain. Would you like to stay here or take \
                        the tunnel? "),
                            "What did you say? Stay or go?",
                            "Should I stay or should I go? You can either stay here or take the \
                        tunnel. The second option seems better to me, not gonna lie."),
                        ...rasa(),
                        redirect: {
                            always: [{
                                cond: (context) =>  context.intent_res.intent.name === 'stay',
                                actions: assign((context) => { return {image : img6} }),
                                target: "#staying"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'go',
                                actions: assign((context) => { return {image : img7} }),
                                target: "#tunnel"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'help',
                                target: "helping"
                            }, {
                                
                                target: "nomatch"
                            }]
                        }
        
                    }
                },
                youSure: {
                    id: "youSure",
                    initial: "prompt",
                    on: { 'ENDSPEECH': 'yesTorch.ask' },
                    states: {
                        prompt: {
                            entry: say("You cry for help, but nobody seems to hear you. An hour has \
                        passed, and the torch is consuming… should we stay or should we go?")
                        }
                    },
                },
                youDie1: {
                    id: "youDie1",
                    initial: "prompt",
                    states: {
                        prompt: { entry: say("You die of starvation. It was nice knowing you, adventurer!") }
                    }
                },
                youDie2: {
                    id: "youDie2",
                    initial: "prompt",
                    states: {
                        prompt: {
                            entry: say("The dragon kills you. There is nothing you could have done to save yourself. \
                        It is a pity, I liked you, adventurer. ")
                        }
                    }
                },
                youDie3: {
                    id: "youDie3",
                    initial: "prompt",
                    states: {
                        prompt: {
                            entry: say("You give her the goblet, even though you do not trust her word. \
                        She laughs and looks at you, while snapping her fingers. It was nice knowing you, adventurer. You die.")
                        }
                    }
                },
                youDie4: {
                    id: "youDie4",
                    initial: "prompt",
                    states: {
                        prompt: {
                            entry: say("She laughs and looks at you, while snapping her fingers. \
                        It was nice knowing you, adventurer. You die.")
                        }
                    }
                },
                youDie5: {
                    id: "youDie5",
                    initial: "prompt",
                    states: {
                        prompt: {
                            entry: say("'We cannot trust him!' – They say, as they throw you in a cell, \
                        where you spend your last days thinking about how you could have survived. You die. ")
                        }
                    }
                },
                youDie6: {
                    id: "youDie6",
                    initial: "prompt",
                    states: {
                        prompt: {
                            entry: say("The dwarves think you are hiding something from them, they do not trust you. \
                        They throw you in a cell, where you spend your last days thinking how you could have survived. You die.")
                        }
                    }
                },
                youDie7: {
                    id: "youDie7",
                    initial: "prompt",
                    states: {
                        prompt: {
                            entry: say("The undead is walking around, trying to find you.\
                             You hide behind a well that seems to have no use, but on your way, \
                            you hit a bucket which falls into the well. Unfortunately, \
                            the undead notices and runs immediately towards you. \
                            It was nice knowing you, adventurer. You die.")
                        }
                    }
                },
                youDie8: {
                    id: "youDie8",
                    initial: "prompt",
                    states: {
                        prompt: {
                            entry: say("You enter the door to see you are in the same room you were before. \
                        This time, you cannot escape. Tens of skeletons appear from every tomb and are surrounding you. \
                        It was nice knowing you, adventurer. You die.")
                        }
                    }
                },
                free1: {
                    id: "free1",
                    initial: "prompt",
                    states: {
                        prompt: {
                            entry: say("She looks at you, intrigued, before retreating. \
                            'What are you?' she asks. 'I can sense an old power coming from within you… it is repulsing. \
                            I do not care what you are, actually. Just leave and never come back!' Good job, adventurer, you are free!")
                        }
                    }
                },
                free2: {
                    id: "free2",
                    initial: "prompt",
                    states: {
                        prompt: {
                            entry: say("'The dragon told me to keep it safe. I will never give it to you!', you say. \
                        She shouts and tries to take it from you, but you wrestle to keep hold of the goblet. You point the \
                        goblet towards her, and it sucks the dark shadow that was surrounding her. Her eyes do not glow anymore. \
                        'You… you took my magic from me'. She is not interested in you anymore; she only looks at her hands \
                        in disbelief. In the meantime, you run away, leaving her crying on the floor. You are free, adventurer, \
                        and now hold an unimaginable power.")
                        }
                    }
                },
                free3: {
                    id: "free3",
                    initial: "prompt",
                    states: {
                        prompt: { entry: say("You are finally free! Congratulations, adventurer! You win!") }
                    }
                },
                free4: {
                    id: "free4",
                    initial: "prompt",
                    states: {
                        prompt: {
                            entry: say("You show them the Aislin you have picked in your adventure. The king gathers with two \
                        older-looking dwarves, who look at you, curiously. “Aislin only appear to those who have a true heart. We will \
                        let you go, adventurer, if you leave them here.” You accept and leave them to the king, who looks at them and at \
                        you in disbelief. Before leaving, he approaches you to say: “I have judged you wrong. Go in peace, and if you ever \
                        need anything from us, know you have a friend in the dwarfs.” You are free! Congratulations, adventurer!")
                        }
                    }
                },
                staying: {
                    id: "staying",
                    on: {
                        '': [ 
                            {
                                cond: (context) => context.counter === 2,
                                actions: assign((context) => {return {image : img34}}),
                                target: 'youDie1'
                            },
                            {
                                target: 'youSure',
                                actions: assign((context) => { tempCount++; return { counter: tempCount } })
                            },
                        ]
                    },
                },
                tunnel: {
                    id: "tunnel",
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: ".rasa"
                        }
                    },
                    states: {
                        ...promptAndAsk(say("Good idea, adventurer! Wait, do you see what I’m seeing? \
                        There is a very rare species of mushroom in the tunnel! It is a Aislin, \
                        which are said to hold an incredible power. Would you like to take it with you?"),
                            "Sorry, yes or no to taking the mushroom?",
                            "You can say yes if you want to pick it up, or no."),
                        ...rasa(),
                        redirect: {
                            always: [{
                            cond: (context) =>  context.intent_res.intent.name === 'affirm',
                            actions: assign((context) => { mushroomCount++; return { mushCount: mushroomCount, image : img8 } }),
                            target: "#threeDoors"
                        }, {
                            cond: (context) =>  context.intent_res.intent.name === 'deny',
                            actions: assign((context) => { return {image : img8} }),
                            target: "#threeDoors"
                        }, {
                            cond: (context) =>  context.intent_res.intent.name === 'help',
                            target: "helping"
                        }, { 
                            target: "nomatch"
                        }]
                        }
                    }
                },
                threeDoors: {
                    id: "threeDoors",
                    initial: "prompt",
                    on: {
                        RECOGNISED: 
                        {target: ".rasa"}
                    },
                    states: {
                        ...promptAndAsk(say("You continue going through the tunnel and see three \
                            doors with old inscriptions. Luckily for you, you have always been kind \
                            of a nerd and know what they say. The first door says: 'Through the Fire \
                            and Flames', the second one says: 'Hail to the King', and the third one, \
                            'Dead but rising'. Which one do you want to go through?"),
                            "Sorry, pick one: 'Through the Fire and Flames', 'Hail to the King', 'Dead but rising' ",
                            "Pick one: 'Through the Fire and Flames', 'Hail to the King', 'Dead but rising' "),
                        ...rasa(),
                        redirect: {
                            always: [{
                                cond: (context) =>  context.intent_res.intent.name === 'fireDoor',
                                actions: assign((context) => { return {image : img9} }),
                                target: "#preFireDoor"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'kingDoor',
                                actions: assign((context) => { return {image : img15} }),
                                target: "#kingDoor"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'deadDoor',
                                actions: assign((context) => { return {image : img24} }),
                                target: "#deadDoor"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'help',
                                target: "helping"
                            }, {
                                target: "nomatch"
                            }]
                        }
                        }
                },
                preFireDoor: {
                    id: "preFireDoor",
                    initial: "prompt",
                    on: {ENDSPEECH : {
                        actions: assign((context) => { return {image : img10} }),
                        target: "fireDoor"
                    }},
                    states: {
                        prompt: {
                            entry: say ("Did you really pick that one? Going through fire does \
                            not sound very fun, but it is your call. You open the door and \
                            see the biggest treasure you have ever set your eyes on.\
                            There are chests full of gold everywhere. \
                            Piles of coins of every size and shape rise to ceiling, covering everything \
                            in a golden light. Well, you get the idea. \
                            Maybe you didn’t choose so badly, after all.")
                        }
                    }
                },
                fireDoor: {
                    id: "fireDoor",
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: ".rasa"
                        }
                    },
                    states: {
                        ...promptAndAsk(say("At the end of this room, you see something shine. There is a silver goblet with \
                        an orange stone that seems to be alive, swirling and moving. You have never seen \
                        anything like this before. There is another Aislin, the powerful fungus, next to a door. \
                        Do you want to pick the goblet, the mushroom, or nothing at all?"),
                            "Please, say goblet, mushroom or nothing.",
                            "You can pick either goblet, mushroom, or nothing at all."),
                        ...rasa(),
                        redirect: {
                            always: [{
                                cond: (context) =>  context.intent_res.intent.name === 'goblet',
                                actions: assign((context) => { return {image : img11} }),
                                target: "#goblet"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'nothing',
                                actions: assign((context) => { return {image : img14} }),
                                target: "#mushroomOrNothing"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'mushroom',
                                actions: assign((context) => { mushroomCount++; return { mushCount: mushroomCount, image:img14} }),
                                target: "#mushroomOrNothing"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'help',
                                target: "helping"
                            }, {
                                target: "nomatch"
                            }]
                        }}
                },
                goblet: {
                    id: "goblet",
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: ".rasa"
                        }
                    },
                    states: {
                        ...promptAndAsk(say("The moment you touch it, the room begins to tremble. \
                        Something emerges from underneath the piles of coins. It is… a dragon. \
                        Of course! The door said through the fire and flames, after all. \
                        'You greedy humans',  the dragon says. 'Always taking what doesn’t \
                        belong to you. What have you here? Hmmm... the goblet of Morgana… Why did you pick this?'"),
                            "What did you say? You should say 'calling me', 'shiny' or 'mushrooms suck'",
                            "You should say 'calling me', 'shiny' or 'mushrooms suck'"),
                        ...rasa(),
                        redirect: {
                            always: [{
                                cond: (context) =>  context.intent_res.intent.name === 'callingMe',
                                actions: assign((context) => { return {image : imgoops} }),
                                target: "#callingMe"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'shiny',
                                target: "#shiny"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'mushroomSuck',
                                target: "#suck"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'help',
                                target: "helping"
                            }, {
                                target: "nomatch"
                            }]
                        }
                        }
                },
                callingMe: {
                    id: "callingMe",
                    initial: "prompt",
                    on: {
                        ENDSPEECH: {
                            actions: assign((context) => { goblet++; return { gobletCount: goblet, image:imgoops2 } }),
                            target: "#leftRight"
                        }
                    },
                    states: {
                        prompt: {
                            entry: say("'It was calling… you? a mortal? That is very interesting, \
                        very interesting indeed… I will let you go with the goblet if you promise to keep \
                        it save. In the hands of the wrong person, if could be extremely dangerous. \
                        Before leaving, he warns you: “You will find two doors at the end of your journey. \
                        One will lead you to your freedom, the other one will make you beg for it. \
                        When you get to the doors, remember, you must do what’s right.'")
                        }
                    }
                },
                shiny: {
                    id: "shiny",
                    initial: "prompt",
                    on: { ENDSPEECH: {
                        actions: assign((context) => { return {image : img12} }),
                        target: "#riddle" }},
                    states: {
                        prompt: {
                            entry: say("The dragon laughs. 'Well, you prove to be one of the most \
                        honest humans I have ever seen.'")
                        }
                    }
                },
                suck: {
                    id: "suck",
                    initial: "prompt",
                    on: { ENDSPEECH: {
                        actions: assign((context) => { return {image : img12} }),
                        target: "#riddle" }},
                    states: {
                        prompt: {
                            entry: say("'Do not underestimate the power of the Aislin, child. \
                        They could prove useful later on.'")
                        }
                    }
                },
                riddle: {
                    id: "riddle",
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: ".rasa"
                        }
                    },
                    states: {
                        ...promptAndAsk(say("'Hmm… should I kill you? I haven’t eaten a human in 126 years… \
                          Let’s strike a deal: if you leave the goblet and solve this riddle, I will let you live. \
                          The riddle goes: I have a tail and a head. But no arms or legs. Sometimes I shine, and sometimes I'm dirty. \
                          Yet everyone wants me. What am I?'"),
                            "Can you repeat that?",
                            "What is the answer to the riddle? Be sure to pronunciate correctly!"),
                        ...rasa(),
                        redirect: {
                            always: [{
                                cond: (context) =>  context.intent_res.intent.name === 'moneyCoin',
                                actions:  // [ I think there is a problem here, it does not say the prompt of LeftRight
                                assign((context) => { return {image : img13} }),
                                target: "#filling1",
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'help',
                                target: "helping"
                            }, {
                                actions: assign((context) => { return {image : img35} }),
                                target: "#youDie2"
                            }]
                        }
                        }
                },
                filling1: {
                    id: "filling1",
                    initial: "prompt",
                    on: {ENDSPEECH:
                    {   actions: assign((context) => { return {image : imgoops2} }),
                        target: "#leftRight"
                    }},
                    states: {
                        prompt: {
                            entry : say("The dragon honours his promise and lets you pass, with a warning. \
                        'You will find two doors at the end of your journey. One will lead you to your freedom, \
                        the other one will make you beg for it. When you get to the doors, remember, you must do \
                        what is right.'")}
                    }
                },
                mushroomOrNothing: {
                    id: "mushroomOrNothing",
                    initial: "prompt",
                    on: { ENDSPEECH: {
                        actions: assign((context) => { return {image : img15} }),
                        target: "#kingDoor" }},
                    states: {
                        prompt: {
                            entry: say("When you are heading to the door, the room begins to tremble. \
                        Something emerges from underneath the piles of coins. It is… a dragon. Of course! \
                        The door said through the fire and flames, after all. You hear the dragon laughing, \
                        but you do not stay to see what’s going on. You take a door to your right. ")
                        }
                    }
                },
                kingDoor: {
                    id: "kingDoor",
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: ".rasa"
                        }
                    },
                    states: {
                        ...promptAndAsk(say("You open the door and see a dark tunnel that goes deeper into the mountain. \
                        You hear a faint sound of metal hitting… something. In front of you, you find some clothes. \
                        They are for a large child, or rather, a small adult. It seems they would fit you. Do you want to put them on?"),
                            "What did you say? Yes or no, to trying on the clothes?",
                            "You should answer yes if you want to put the clothes on, or no, otherwise"),
                        ...rasa(),
                        redirect: {
                            always: [{
                                cond: (context) =>  context.intent_res.intent.name === 'affirm',
                                actions: assign((context) => { return {image : img16} }),
                                target: "#confusedDwarf1"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'deny',
                                actions: assign((context) => { return {image : img16} }),
                                target: "#confusedDwarf2"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'help',
                                target: "helping"
                            }, {
                                
                                target: "nomatch"
                            }]
                        }
                        }
                },
                confusedDwarf1: {
                    id: "confusedDwarf1",
                    initial: "prompt",
                    on: {ENDSPEECH: {
                        actions: assign((context) => { return {image : img17} }),
                        target: "yesClothes"
                    }},
                    states: {
                        prompt: {
                            entry: say ("The sound becomes clearer and louder as you continue walking into the mountain. \
                            You see someone working in the end. Finally, you are saved! Or… are you? As you get closer, you realise \
                            there is something wrong about this person. They are quite short and have a long ginger beard with beads \
                            and braids. He is a dwarf! He notices you, and starts looking at you…")
                        }
                    }
                },
                confusedDwarf2: {
                    id: "confusedDwarf2",
                    initial: "prompt",
                    on: {ENDSPEECH: {
                        actions: assign((context) => { return {image : img19} }),
                        target: "noClothes"
                    }},
                    states: {
                        prompt: {
                            entry: say ("The sound becomes clearer and louder as you continue walking into the mountain. \
                            You see someone working in the end. Finally, you are saved! Or… are you? As you get closer, you realise \
                            there is something wrong about this person. They are quite short and have a long ginger beard with beads \
                            and braids. He is a dwarf! He notices you, and starts looking at you…")
                        }
                    }
                },
                noClothes: {
                    id: "noClothes",
                    initial: "prompt",
                    on: { ENDSPEECH: {
                        actions: assign((context) => { return {image : img19} }),
                        target: "king"} },
                    states: {
                        prompt: {
                            entry: say(" You try to change your route, but he\
                        has definitely seen you. A couple of minutes later, you are surrounded by dwarves, who take you to see their king.")
                        }
                    }
                },
                yesClothes: {
                    id: "yesClothes",
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: ".rasa"
                        }
                    },
                    states: {
                        ...promptAndAsk(say(" Luckily for you, you put on one \
                        of their uniforms, so he quickly forgets about you. You continue walking and see that you have entered the \
                        dwarf realm. It is much cleaner and open that you had imagined. There is an entire city underneath the \
                        mountain! You see another Aislin. Do you want to pick it up?"),
                            "Could you repeat that? Yes or no, to picking up the mushroom?",
                            "Yes or no, to picking up the mushroom?"),
                        ...rasa(),
                        redirect: {
                            always: [{
                                cond: (context) =>  context.intent_res.intent.name === 'affirm',
                                actions: assign((context) => { mushroomCount++; return { mushCount: mushroomCount, image:img18 } }),
                                target: "#oldDwarf"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'deny',
                                actions: assign((context) => { return {image : img19} }),
                                target: "#preKing"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'help',
                                target: "helping"
                            }, {
                                
                                target: "nomatch"
                            }]
                        }
                        }
                },
                oldDwarf: {
                    id: "oldDwarf",
                    initial: "prompt",
                    on: { ENDSPEECH: {
                        actions: assign((context) => { return {image : imgoops2} }),
                        target: "#leftRight"} },
                    states: {
                        prompt: {
                            entry: say("While you are picking it up, a figure appears behind you. \
                        It is an older-looking dwarf, who looks at you and at the mushroom. He looks surprised, \
                        but does not say a word. He signals you to come with him, which you do. He leads you to a \
                        tunnel with a rune over it. “You need to go, quickly! There will be two doors at the end: \
                        whatever you do, do not take the door on the left!”. You thank him and leave. ")
                        }
                    }
                },
                leftRight: {
                    id: "leftRight",
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: ".rasa"
                        }
                    },
                    states: {
                        ...promptAndAsk(say("You get to the doors. Do you want to pick the left one or the right one?"),
                            "Sorry, what? Left door or right door?",
                            "Left or right?"),
                        ...rasa(),
                        redirect: {
                            always: [{
                                cond: (context) =>  context.intent_res.intent.name === 'left',
                                actions: assign((context) => { return {image : img28} }),
                                target: "#finalBoss"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'right',
                                actions: assign((context) => { return {image : img40} }),
                                target: "#free3"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'help',
                                target: "helping"
                            }, {
                                
                                target: "nomatch"
                            }]
                        }
                    }
                },
                preKing: {
                    id: "preKing",
                    initial: "prompt",
                    on: {ENDSPEECH: {
                        target: "#king"}
                    },
                    states: {
                        prompt: {
                            entry: say("While you are picking it up, some figures appears behind you.")
                        }
                    }
                },
                king: {
                    id: "king",
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: ".rasa"
                        }
                    },
                    states: {
                        ...promptAndAsk(say("'All hail king Thorin!', you hear some dwarfs chant as a solemn figure seats in a throne. \
                        'What have we here? Who are you?' he says. Do you want to tell the truth, young adventurer?"),
                            "Did you say yes or no, to telling the truth?",
                            "You should reply yes if you want to tell the truth, or no, otherwise"),
                        ...rasa(),
                        redirect: {
                            always: [{
                                cond: (context) =>  context.intent_res.intent.name === 'affirm',
                                actions: assign((context) => { return {image : img20} }),
                                target: "#truth"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'deny',
                                actions: assign((context) => { return {image : img21} }),
                                target: "#lying"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'help',
                                target: "helping"
                            }, {
                                
                                target: "nomatch"
                            }]
                        }
                        }
                },
                truth: {
                    id: "truth",
                    initial: "prompt",
                    on: { ENDSPEECH: {
                        actions: assign((context) => { return {image : img28} }),
                        target: "#finalBoss"} },
                    states: {
                        prompt: {
                            entry: say("You try to explain that you got lost coming back from school, but they don’t believe you. \
                        'Liar! We have been living here for hundreds of years, and nobody has ever come. Why should we trust you? How can \
                        we know you will not tell our secret to anyone?', replies the king. \
                        'Sire!' ,you hear another dwarf talking, 'We could let her decide…' \
                        'Her… yes, she has proven useful many times. Bring the liar to her!'")
                        }
                    }
                },
                lying: {
                    id: "lying",
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: ".rasa"
                        }
                    },
                    states: {
                        ...promptAndAsk(say("You reply: 'who is asking?', as the king gets up, angry.\
                        'How dare you, insolent creature, speak like that to the King! I am king Thorin, the king under the Mountain, \
                        and I have protected it from all harm… until now.' Oh no! We should say something! Do you want to ask for mercy \
                        or stay quiet?"),
                            "Did you say mercy or be quiet?",
                            "You should say mercy to beg for mercy, or quiet to stay quiet."),
                        ...rasa(),
                        redirect: {
                            always: [{
                                cond: (context) =>  context.intent_res.intent.name === 'mercy',
                                actions: assign((context) => { return {image : img22} }),
                                target: "#mercy"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'quiet',
                                actions: assign((context) => { return {image : img43} }),
                                target: "#youDie6"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'help',
                                target: "helping"
                            }, {
                                
                                target: "nomatch"
                            }]
                        }
                        }
                },
                mercy: {
                    id: "mercy",
                    initial: "prompt",
                    on: {
                        ENDSPEECH: [{
                            cond: (context) => context.mushCount >= 1,
                            actions: assign((context) => { return {image : img41} }),
                            target: "#free4"
                        }, {
                            cond: (context) => context.mushCount === 0,
                            actions: assign((context) => { return {image : img42} }),
                            target: "#youDie5"
                        }]
                    },
                    states: {
                        prompt: { 
                            entry: 
                            say("How can we trust you? Do you have anything that will prove your worth?, they ask") }
                    }
                },
                deadDoor: {
                    id: "deadDoor",
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: ".rasa"
                        }
                    },
                    states: {
                        ...promptAndAsk(say("You enter the door and seem to be in some sort of burial place, a catacomb. \
                        The door closes behind you, and you start hearing some eery sounds. Do you want to stay to \
                        investigate or run as fast as you can?"),
                            "Did you say 'stay' or 'run'?",
                            "You should say 'stay' to investigate or 'run'"),
                        ...rasa(),
                        redirect: {
                            always: [{
                                cond: (context) =>  context.intent_res.intent.name === 'stay',
                                actions: assign((context) => { return {image : img25} }),
                                target: "#investigate"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'go',
                                actions: assign((context) => { return {image : img26} }),
                                target: "#run1"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'help',
                                target: "helping"
                            }, {
                                
                                target: "nomatch"
                            }]
                        }
                    }
                },
                investigate: {
                    id: "investigate",
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: ".rasa"}
                    },
                    states: {
                        ...promptAndAsk(say("The eerie sounds grow louder and louder as you approach the tombs. It is… coming from inside!\
                        Suddenly, the stone covering the biggest tomb moves to one side and a skeleton wearing ragged clothes comes \
                        from underneath. Do you run, leaving everything behind, or try to hide?"),
                            "Did you say run or hide?",
                            "You should say run or hide"),
                        ...rasa(),
                        redirect: {
                            always: [{
                                cond: (context) =>  context.intent_res.intent.name === 'stay',
                                actions: assign((context) => { return {image : img44} }),
                                target: "#youDie7"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'go',
                                actions: assign((context) => { return {image : imgoops3} }),
                                target: "#run2"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'help',
                                target: "helping"
                            }, {
                                
                                target: "nomatch"
                            }]
                        }
                        }
                },
                run2: {
                    id: "run2",
                    initial: "prompt",
                    on: {
                        ENDSPEECH: {
                            actions: assign((context) => { mushroomCount === 0; return { mushCount: mushroomCount, image:img27 } }),
                            target: "deadDoors"
                        }
                    },
                    states: {
                        prompt: {
                            entry: say("Your bag seems to distract him for a moment, while you run as fast as you can \
                        towards another room. You have lost all your belongings, except for the torch you carried in your hand. ")
                        }
                    }
                },
                run1: {
                    id: "run1",
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: ".rasa"
                        }
                    },
                    states: {
                        ...promptAndAsk(say("You run and run but end up getting lost. You don’t know where to go, and you’re scared and cold. \
                        Look, adventurer, there are two doors again! There are no differences in it, except for a Aislin growing next to the \
                        door on the left. Do you want to pick it up?"),
                            "Sorry, yes or no, to picking up the mushroom?",
                            "Say yes to pick up the mushroom or no otherwise."),
                        ...rasa(),
                        redirect: {
                            always: [{
                                cond: (context) =>  context.intent_res.intent.name === 'affirm',
                                actions: assign((context) => { mushroomCount++; return { mushCount: mushroomCount, image:img27 } }),
                                target: "#deadDoors"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'deny',
                                actions: assign((context) => {return {image : img27}}),
                                target: "#deadDoors"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'help',
                                target: "helping"
                            }, {
                                
                                target: "nomatch"
                            }]
                        }
                        }
                },
                deadDoors: {
                    id: "deadDoors",
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: ".rasa"
                        }
                    },
                    states: {
                        ...promptAndAsk(say("Which door do you want to pick?"),
                            "Which one, left or right?",
                            "Say left for the left door and right for right door"),
                        ...rasa(),
                        redirect: {
                            always: [{
                                cond: (context) =>  context.intent_res.intent.name === 'left',
                                actions: assign((context) => {return {image : img15}}),
                                target: "#kingDoor"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'right',
                                actions: assign((context) => {return {image : img45}}),
                                target: "#youDie8"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'help',
                                target: "helping"
                            }, {
                                
                                target: "nomatch"
                            }]
                        }
                    }
                },
                finalBoss: {
                    id: "finalBoss",
                    initial: "prompt",
                    on: {
                        ENDSPEECH: 
                                [{cond: (context) => context.gobletCount === 1,
                                    actions: assign((context) => {return {image : img30}}),
                                    target: "#IHaveAGoblet"
                                }, {
                                    cond: (context) => context.mushCount !== 0,
                                    actions: assign((context) => {return {image : img29}}),
                                    target: "#eating"
                                }, {
                                    actions: assign((context) => {return {image : img31}}),
                                    target: "#praying"
                                }]
                    },
                    states: {
                        prompt: {
                            entry: say("You get to a dark room. There seems to be nobody here. Hello? \
                        You try to illuminate the room with your torch, but it is too big. You hear a weird \
                        noise that sends shivers down your spine… you have never heard anything like it, in all your life. \
                         Quickly, you should do something, adventurer! Um… do you have anything on you?")
                        }}
                },
                finalBossAppearance: {
                    id: "finalBossAppearance",
                    initial: "prompt",
                    on: {ENDSPEECH: 
                        [{
                            cond: (context) => context.gobletCount === 1,
                            actions: assign((context) => {return {image : img33}}),
                            target: "#gobletEnding"
                        }, {
                            cond: (context) => context.mushCount !== 0,
                            actions: assign((context) => {return {image : img36}}),
                            target: "#free1"
                        }, {
                            actions: assign((context) => {return {image : img39}}),
                            target: "#youDie4"
                        }]
                    },
                    states: {
                        prompt: {
                            entry: say ("From the end of the room, a big dark shape appears. At its core, you \
                            can see a woman, with long green hair and glowing eyes. She wraps you \
                            with its long dark arms and holds you close to her face.")
                        }
                    }
                },
                praying: {
                    id: "praying",
                    initial: "prompt",
                    on: {ENDSPEECH: {
                        actions:assign((context) => {return {image : img32}}),
                        target: "#finalBossAppearance"
                    }},
                    states: {
                        prompt: {
                            entry: say ("Okay, we’re screwed. Do you know how to pray?")
                        }
                    }
                },
                eating: {
                    id: "eating",
                    initial: "prompt",
                    on: {ENDSPEECH:
                    {   actions: assign((context) => {return {image : img32}}),
                        target: "#finalBossAppearance"
                    }},
                    states: {
                        prompt: {entry: say("The Aislin! The legends say they are very powerful! What should we do with a mushroom? \
                        I think we both know a certain Italian guy who would suggest a-eating it. You eat the Aislin.")}
                    }
                },
                IHaveAGoblet: {
                    id: "IHaveAGoblet",
                    initial: "prompt",
                    on: {
                        ENDSPEECH: {
                            actions: assign((context) => {return {image : img32}}) ,
                            target: "#finalBossAppearance"}
                    },
                    states: {
                        prompt: {
                            entry: say("Oooh the goblet of Morgana! I… don’t know how to use it. Just be prepared for what may come.")
                        }
                    }
                },
                gobletEnding: {
                    id: "gobletEnding",
                    initial: "prompt",
                    on: {
                        RECOGNISED: {
                            target: ".rasa"
                        }
                    },
                    states: {
                        ...promptAndAsk(say(" She looks at the goblet, intrigued. You hold it tighter, \
                        afraid that she will get it. She laughs as she puts you down. “You are the holder of the goblet… \
                        how… intriguing. Will you be willing to trade it? The goblet for your life.”"),
                            "Do you want to trade the goblet for your life? Yes or no?",
                            "Say yes to trade the goblet for your life of no to use the goblet."),
                        ...rasa(),
                        redirect: {
                            always: [{
                                cond: (context) =>  context.intent_res.intent.name === 'affirm',
                                actions: assign((context) => {return {image : img37}}),
                                target: "#youDie3"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'deny',
                                actions: assign((context) => {return {image : img38}}),
                                target: "#free2"
                            }, {
                                cond: (context) =>  context.intent_res.intent.name === 'help',
                                target: "helping"
                            }, {
                                
                                target: "nomatch"
                            }]
                        }
                    }
                }
            }
        }

    } // final closing, do not touch!!!!
})
