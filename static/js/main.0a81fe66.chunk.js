(this["webpackJsonpxstate-react-typescript-template"]=this["webpackJsonpxstate-react-typescript-template"]||[]).push([[0],{29:function(e,t,o){},40:function(e,t,o){"use strict";o.r(t),o.d(t,"nluRequest",(function(){return ve}));var a=o(26),n=o(2),i=(o(29),o(8),o(23)),r=o(12),s=o(20),h=o(3),c=o(44),d=o(43),u=o.p+"static/media/Diapositiva2.1d3975fe.png",g=o.p+"static/media/Diapositiva3.3e1cc17a.png",l=o.p+"static/media/Diapositiva4.9961797f.png",p=o.p+"static/media/Diapositiva5.251a2393.png",m=o.p+"static/media/Diapositiva6.6dbc6fc4.png",y=o.p+"static/media/Diapositiva7.19364d02.png",b=o.p+"static/media/Diapositiva8.0b7fac81.png",f=o.p+"static/media/Diapositiva9.519c55d1.png",w=o.p+"static/media/Diapositiva10.f31f3e96.png",O=o.p+"static/media/Diapositiva11.7841e83b.png",v=o.p+"static/media/Diapositiva12.2e24db94.png",D=o.p+"static/media/Diapositiva13.28f9493d.png",j=o.p+"static/media/Diapositiva14.8b457178.png",k=o.p+"static/media/Diapositiva15.874dbe43.png",E=o.p+"static/media/Diapositiva16.e36ff3e7.png",S=o.p+"static/media/Diapositiva17.5609be87.png",C=o.p+"static/media/Diapositiva18.4ff021f5.png",I=o.p+"static/media/Diapositiva19.47e1d3bb.png",Y=o.p+"static/media/Diapositiva20.a90c9846.png",T=o.p+"static/media/Diapositiva21.91795d7f.png",N=o.p+"static/media/Diapositiva22.c46c0284.png",H=o.p+"static/media/Diapositiva24.635a8d3d.png",_=o.p+"static/media/Diapositiva25.6181e712.png",R=o.p+"static/media/Diapositiva26.10eeefa6.png",A=o.p+"static/media/Diapositiva27.7858b999.png",P=o.p+"static/media/Diapositiva28.71e8c5bc.png",W=o.p+"static/media/Diapositiva29.0f2656b9.png",x=o.p+"static/media/Diapositiva30.6aeb4b77.png",G=o.p+"static/media/Diapositiva31.1af222c1.png",L=o.p+"static/media/Diapositiva32.a3e72634.png",B=o.p+"static/media/Diapositiva33.c7bd32b8.png",q=o.p+"static/media/Diapositiva34.3c41cbd9.png",F=o.p+"static/media/Diapositiva35.f1ffaeb0.png",M=o.p+"static/media/Diapositiva36.b9967d8f.png",K=o.p+"static/media/Diapositiva37.44e2d52c.png",U=o.p+"static/media/Diapositiva38.1289aaa9.png",J=o.p+"static/media/Diapositiva39.01a94d94.png",X=o.p+"static/media/Diapositiva40.41471eaa.png",V=o.p+"static/media/Diapositiva41.dac2c16a.png",z=o.p+"static/media/Diapositiva42.3f6db1b0.png",Q=o.p+"static/media/Diapositiva43.a5211ed6.png",Z=o.p+"static/media/Diapositiva44.a020f962.png",$=o.p+"static/media/Diapositiva45.dffe7999.png",ee=o.p+"static/media/oops.e3c30095.png",te=o.p+"static/media/oops2.3b4f2c96.png",oe=o.p+"static/media/oops3.86261f46.png",ae=o.p+"static/media/noReply.899e49f9.png";const ne=r.a.send;r.a.cancel;function ie(e){return ne((t=>({type:"SPEAK",value:e})))}function re(e,t,o){return{prompt:{entry:e,on:{ENDSPEECH:"ask"}},ask:{entry:[ne("LISTEN"),ne("MAXSPEECH",{delay:1e4,id:"maxsp"})]},nomatch:{entry:ie(t),on:{ENDSPEECH:"ask"}},helping:{entry:ie(o),on:{ENDSPEECH:"ask"}}}}function se(){return{rasa:{id:"rasastate",invoke:{id:"rasa",src:(e,t)=>ve(e.recResult),onDone:{target:"redirect",actions:Object(h.b)(((e,t)=>(console.log(t.data),{intent_res:t.data})))},onError:{target:"#root.dm.init"}}}}}let he=0,ce=0,de=0,ue=0;const ge={initial:"init",states:{init:{on:{CLICK:{actions:Object(h.b)((e=>({image:u}))),target:"game"}}},invokingRasa:{id:"invokingRasa",invoke:{id:"rasa",src:(e,t)=>ve(e.recResult),onDone:{target:"game.torch.redirect",actions:Object(h.b)(((e,t)=>(console.log(t.data),{intent_res:t.data})))},onError:{target:"init"}}},maxspeech:{entry:ie("Are you still there?"),on:{ENDSPEECH:"game.hist"}},goodBye:{entry:ie("Oh well... You lost because there is no reply. Try again!"),on:{ENDSPEECH:"init"}},game:{id:"game",initial:"welcome",on:{MAXSPEECH:[{cond:e=>3===e.mxCount,actions:Object(h.b)((e=>({image:ae}))),target:"goodBye"},{target:"maxspeech",actions:Object(h.b)((e=>(ce++,{mxCount:ce})))}]},states:{hist:{type:"history",history:"deep"},shallowhist:{type:"history",history:"shallow"},welcome:{initial:"prompt",on:{ENDSPEECH:{actions:Object(h.b)((e=>({image:g}))),target:"torch"}},states:{prompt:{entry:ie("Hello adventurer! It seems you                         have fallen into a cave, when you were coming back from school                         near the Valley of Mystery. There are many legends of this place,                         of the treasures it contains, but also of the dangers within.                         Let\u2019s try to get out of here! If you need help, you can say \u201chelp\u201d                         or \u201chint\u201d at any point, and I will help you in any way I can!")}}},torch:{id:"torch",initial:"prompt",on:{RECOGNISED:[{target:".rasa"}]},states:Object(n.a)(Object(n.a)(Object(n.a)({},re(ie("It is very dark and humid\u2026 Do you want to light a torch?"),"Sorry, yes or no to lighting a torch?","I would suggest saying 'yes' and lighting a torch...                             It is very dark in here!")),se()),{},{redirect:{always:[{cond:e=>"affirm"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:p}))),target:"#yesTorch"},{cond:e=>"deny"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:l}))),target:"#noTorch"},{cond:e=>"help"===e.intent_res.intent.name,target:"helping"},{target:"nomatch"}]}})},noTorch:{id:"noTorch",initial:"prompt",on:{ENDSPEECH:{actions:Object(h.b)((e=>({image:p}))),target:"yesTorch"}},states:{prompt:{entry:ie("oh\u2026 okay. That does not seem like a sensible idea,                         adventurer. Where are we going? Try to stretch your arms\u2026 Eeww...                         what was that? No, no, no I do not care if you don\u2019t want to                         light a torch, you HAVE TO. Aah... much better! ")}}},yesTorch:{id:"yesTorch",initial:"prompt",on:{RECOGNISED:{target:".rasa"}},states:Object(n.a)(Object(n.a)(Object(n.a)({},re(ie("You look around to see a dark tunnel going                         deeper into the mountain. Would you like to stay here or take                         the tunnel? "),"What did you say? Stay or go?","Should I stay or should I go? You can either stay here or take the                         tunnel. The second option seems better to me, not gonna lie.")),se()),{},{redirect:{always:[{cond:e=>"stay"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:m}))),target:"#staying"},{cond:e=>"go"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:y}))),target:"#tunnel"},{cond:e=>"help"===e.intent_res.intent.name,target:"helping"},{target:"nomatch"}]}})},youSure:{id:"youSure",initial:"prompt",on:{ENDSPEECH:"yesTorch.ask"},states:{prompt:{entry:ie("You cry for help, but nobody seems to hear you. An hour has                         passed, and the torch is consuming\u2026 should we stay or should we go?")}}},youDie1:{id:"youDie1",initial:"prompt",states:{prompt:{entry:ie("You die of starvation. It was nice knowing you, adventurer!")}}},youDie2:{id:"youDie2",initial:"prompt",states:{prompt:{entry:ie("The dragon kills you. There is nothing you could have done to save yourself.                         It is a pity, I liked you, adventurer. ")}}},youDie3:{id:"youDie3",initial:"prompt",states:{prompt:{entry:ie("You give her the goblet, even though you do not trust her word.                         She laughs and looks at you, while snapping her fingers. It was nice knowing you, adventurer. You die.")}}},youDie4:{id:"youDie4",initial:"prompt",states:{prompt:{entry:ie("She laughs and looks at you, while snapping her fingers.                         It was nice knowing you, adventurer. You die.")}}},youDie5:{id:"youDie5",initial:"prompt",states:{prompt:{entry:ie("You don't have anything with you.                             'We cannot trust him!' \u2013 They say, as they throw you in a cell,                             where you spend your last days thinking about how you could have survived. You die. ")}}},youDie6:{id:"youDie6",initial:"prompt",states:{prompt:{entry:ie("The dwarves think you are hiding something from them, they do not trust you.                             They throw you in a cell, where you spend your last days thinking how you could have survived. You die.")}}},youDie7:{id:"youDie7",initial:"prompt",states:{prompt:{entry:ie("The undead is walking around, trying to find you.                             You hide behind a well that seems to have no use, but on your way,                             you hit a bucket which falls into the well. Unfortunately,                             the undead notices and runs immediately towards you.                             It was nice knowing you, adventurer. You die.")}}},youDie8:{id:"youDie8",initial:"prompt",states:{prompt:{entry:ie("You enter the door to see you are in the same room you were before.                         This time, you cannot escape. Tens of skeletons appear from every tomb and are surrounding you.                         It was nice knowing you, adventurer. You die.")}}},free1:{id:"free1",initial:"prompt",states:{prompt:{entry:ie("She looks at you, intrigued, before retreating.                             'What are you?' she asks. 'I can sense an old power coming from within you\u2026 it is repulsing.                             I do not care what you are, actually. Just leave and never come back!' Good job, adventurer, you are free!")}}},free2:{id:"free2",initial:"prompt",states:{prompt:{entry:ie("'The dragon told me to keep it safe. I will never give it to you!', you say.                         She shouts and tries to take it from you, but you wrestle to keep hold of the goblet. You point the                         goblet towards her, and it sucks the dark shadow that was surrounding her. Her eyes do not glow anymore.                         'You\u2026 you took my magic from me'. She is not interested in you anymore; she only looks at her hands                         in disbelief. In the meantime, you run away, leaving her crying on the floor. You are free, adventurer,                         and now hold an unimaginable power.")}}},free3:{id:"free3",initial:"prompt",states:{prompt:{entry:ie("You are finally free! Congratulations, adventurer! You win!")}}},free4:{id:"free4",initial:"prompt",states:{prompt:{entry:ie("You show them the Aislin you have picked in your adventure. The king gathers with two                         older-looking dwarves, who look at you, curiously. \u201cAislin only appear to those who have a true heart. We will                         let you go, adventurer, if you leave them here.\u201d You accept and leave them to the king, who looks at them and at                         you in disbelief. Before leaving, he approaches you to say: \u201cI have judged you wrong. Go in peace, and if you ever                         need anything from us, know you have a friend in the dwarfs.\u201d You are free! Congratulations, adventurer!")}}},staying:{id:"staying",on:{"":[{cond:e=>2===e.counter,actions:Object(h.b)((e=>({image:q}))),target:"youDie1"},{target:"youSure",actions:Object(h.b)((e=>(he++,{counter:he})))}]}},tunnel:{id:"tunnel",initial:"prompt",on:{RECOGNISED:{target:".rasa"}},states:Object(n.a)(Object(n.a)(Object(n.a)({},re(ie("Good idea, adventurer! Wait, do you see what I\u2019m seeing?                         There is a very rare species of mushroom in the tunnel! It is a Aislin,                         which are said to hold an incredible power. Would you like to take it with you?"),"Sorry, yes or no to taking the mushroom?","You can say yes if you want to pick it up, or no.")),se()),{},{redirect:{always:[{cond:e=>"affirm"===e.intent_res.intent.name,actions:Object(h.b)((e=>(de++,{mushCount:de,image:b}))),target:"#threeDoors"},{cond:e=>"deny"===e.intent_res.intent.name,actions:Object(h.b)((e=>({mushCount:de,image:b}))),target:"#threeDoors"},{cond:e=>"help"===e.intent_res.intent.name,target:"helping"},{target:"nomatch"}]}})},threeDoors:{id:"threeDoors",initial:"prompt",on:{RECOGNISED:{target:".rasa"}},states:Object(n.a)(Object(n.a)(Object(n.a)({},re(ie("You continue going through the tunnel and see three                             doors with old inscriptions. Luckily for you, you have always been kind                             of a nerd and know what they say. The first door says: 'Through the Fire                             and Flames', the second one says: 'Hail to the King', and the third one,                             'Dead but rising'. Which one do you want to go through?"),"Sorry, pick one: 'Through the Fire and Flames', 'Hail to the King', 'Dead but rising' ","Pick one: 'Through the Fire and Flames', 'Hail to the King', 'Dead but rising' ")),se()),{},{redirect:{always:[{cond:e=>"fireDoor"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:f}))),target:"#preFireDoor"},{cond:e=>"kingDoor"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:k}))),target:"#kingDoor"},{cond:e=>"deadDoor"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:H}))),target:"#deadDoor"},{cond:e=>"help"===e.intent_res.intent.name,target:"helping"},{target:"nomatch"}]}})},preFireDoor:{id:"preFireDoor",initial:"prompt",on:{ENDSPEECH:{actions:Object(h.b)((e=>({image:w}))),target:"fireDoor"}},states:{prompt:{entry:ie("Did you really pick that one? Going through fire does                             not sound very fun, but it is your call. You open the door and                             see the biggest treasure you have ever set your eyes on.                            There are chests full of gold everywhere.                             Piles of coins of every size and shape rise to ceiling, covering everything                             in a golden light. Well, you get the idea.                             Maybe you didn\u2019t choose so badly, after all.")}}},fireDoor:{id:"fireDoor",initial:"prompt",on:{RECOGNISED:{target:".rasa"}},states:Object(n.a)(Object(n.a)(Object(n.a)({},re(ie("At the end of this room, you see something shine. There is a silver goblet with                         an orange stone that seems to be alive, swirling and moving. You have never seen                         anything like this before. There is another Aislin, the powerful fungus, next to a door.                         Do you want to pick the goblet, the mushroom, or nothing at all?"),"Please, say goblet, mushroom or nothing.","You can pick either goblet, mushroom, or nothing at all.")),se()),{},{redirect:{always:[{cond:e=>"goblet"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:O}))),target:"#goblet"},{cond:e=>"nothing"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:j}))),target:"#mushroomOrNothing"},{cond:e=>"mushroom"===e.intent_res.intent.name,actions:Object(h.b)((e=>(de++,{mushCount:de,image:j}))),target:"#mushroomOrNothing"},{cond:e=>"help"===e.intent_res.intent.name,target:"helping"},{target:"nomatch"}]}})},goblet:{id:"goblet",initial:"prompt",on:{RECOGNISED:{target:".rasa"}},states:Object(n.a)(Object(n.a)(Object(n.a)({},re(ie("The moment you touch it, the room begins to tremble.                         Something emerges from underneath the piles of coins. It is\u2026 a dragon.                         Of course! The door said through the fire and flames, after all.                         'You greedy humans',  the dragon says. 'Always taking what doesn\u2019t                         belong to you. What have you here? Hmmm... the goblet of Morgana\u2026 Why did you pick this?'"),"What did you say? You should say 'calling me', 'shiny' or 'mushrooms suck'","You should say 'calling me', 'shiny' or 'mushrooms suck'")),se()),{},{redirect:{always:[{cond:e=>"callingMe"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:ee}))),target:"#callingMe"},{cond:e=>"shiny"===e.intent_res.intent.name,target:"#shiny"},{cond:e=>"mushroomSuck"===e.intent_res.intent.name,target:"#suck"},{cond:e=>"help"===e.intent_res.intent.name,target:"helping"},{target:"nomatch"}]}})},callingMe:{id:"callingMe",initial:"prompt",on:{ENDSPEECH:{actions:Object(h.b)((e=>(ue++,{gobletCount:ue,image:te}))),target:"#leftRight"}},states:{prompt:{entry:ie("'It was calling\u2026 you? a mortal? That is very interesting,                         very interesting indeed\u2026 I will let you go with the goblet if you promise to keep                         it save. In the hands of the wrong person, if could be extremely dangerous.                         Before leaving, he warns you: \u201cYou will find two doors at the end of your journey.                         One will lead you to your freedom, the other one will make you beg for it.                         When you get to the doors, remember, you must do what\u2019s right.'")}}},shiny:{id:"shiny",initial:"prompt",on:{ENDSPEECH:{actions:Object(h.b)((e=>({image:v}))),target:"#riddle"}},states:{prompt:{entry:ie("The dragon laughs. 'Well, you prove to be one of the most                         honest humans I have ever seen.'")}}},suck:{id:"suck",initial:"prompt",on:{ENDSPEECH:{actions:Object(h.b)((e=>({image:v}))),target:"#riddle"}},states:{prompt:{entry:ie("'Do not underestimate the power of the Aislin, child.                         They could prove useful later on.'")}}},riddle:{id:"riddle",initial:"prompt",on:{RECOGNISED:{target:".rasa"}},states:Object(n.a)(Object(n.a)(Object(n.a)({},re(ie("'Hmm\u2026 should I kill you? I haven\u2019t eaten a human in 126 years\u2026                           Let\u2019s strike a deal: if you leave the goblet and solve this riddle, I will let you live.                           The riddle goes: I have a tail and a head. But no arms or legs. Sometimes I shine, and sometimes I'm dirty.                           Yet everyone wants me. What am I?'"),"Can you repeat that?","What is the answer to the riddle? Be sure to pronunciate correctly!")),se()),{},{redirect:{always:[{cond:e=>"moneyCoin"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:D}))),target:"#filling1"},{cond:e=>"help"===e.intent_res.intent.name,target:"helping"},{actions:Object(h.b)((e=>({image:F}))),target:"#youDie2"}]}})},filling1:{id:"filling1",initial:"prompt",on:{ENDSPEECH:{actions:Object(h.b)((e=>({image:te}))),target:"#leftRight"}},states:{prompt:{entry:ie("The dragon honours his promise and lets you pass, with a warning.                         'You will find two doors at the end of your journey. One will lead you to your freedom,                         the other one will make you beg for it. When you get to the doors, remember, you must do                         what is right.'")}}},mushroomOrNothing:{id:"mushroomOrNothing",initial:"prompt",on:{ENDSPEECH:{actions:Object(h.b)((e=>({image:k}))),target:"#kingDoor"}},states:{prompt:{entry:ie("When you are heading to the door, the room begins to tremble.                         Something emerges from underneath the piles of coins. It is\u2026 a dragon. Of course!                         The door said through the fire and flames, after all. You hear the dragon laughing,                         but you do not stay to see what\u2019s going on. You take a door to your right. ")}}},kingDoor:{id:"kingDoor",initial:"prompt",on:{RECOGNISED:{target:".rasa"}},states:Object(n.a)(Object(n.a)(Object(n.a)({},re(ie("You open the door and see a dark tunnel that goes deeper into the mountain.                         You hear a faint sound of metal hitting\u2026 something. In front of you, you find some clothes.                         They are for a large child, or rather, a small adult. It seems they would fit you. Do you want to put them on?"),"What did you say? Yes or no, to trying on the clothes?","You should answer yes if you want to put the clothes on, or no, otherwise")),se()),{},{redirect:{always:[{cond:e=>"affirm"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:E}))),target:"#confusedDwarf1"},{cond:e=>"deny"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:E}))),target:"#confusedDwarf2"},{cond:e=>"help"===e.intent_res.intent.name,target:"helping"},{target:"nomatch"}]}})},confusedDwarf1:{id:"confusedDwarf1",initial:"prompt",on:{ENDSPEECH:{actions:Object(h.b)((e=>({image:S}))),target:"yesClothes"}},states:{prompt:{entry:ie("The sound becomes clearer and louder as you continue walking into the mountain.                             You see someone working in the end. Finally, you are saved! Or\u2026 are you? As you get closer, you realise                             there is something wrong about this person. They are quite short and have a long ginger beard with beads                             and braids. He is a dwarf! He notices you, and starts looking at you\u2026")}}},confusedDwarf2:{id:"confusedDwarf2",initial:"prompt",on:{ENDSPEECH:{actions:Object(h.b)((e=>({image:I}))),target:"noClothes"}},states:{prompt:{entry:ie("The sound becomes clearer and louder as you continue walking into the mountain.                             You see someone working in the end. Finally, you are saved! Or\u2026 are you? As you get closer, you realise                             there is something wrong about this person. They are quite short and have a long ginger beard with beads                             and braids. He is a dwarf! He notices you, and starts looking at you\u2026")}}},noClothes:{id:"noClothes",initial:"prompt",on:{ENDSPEECH:{actions:Object(h.b)((e=>({image:I}))),target:"king"}},states:{prompt:{entry:ie(" You try to change your route, but he                        has definitely seen you. A couple of minutes later, you are surrounded by dwarves, who take you to see their king.")}}},yesClothes:{id:"yesClothes",initial:"prompt",on:{RECOGNISED:{target:".rasa"}},states:Object(n.a)(Object(n.a)(Object(n.a)({},re(ie(" Luckily for you, you put on one                         of their uniforms, so he quickly forgets about you. You continue walking and see that you have entered the                         dwarf realm. It is much cleaner and open that you had imagined. There is an entire city underneath the                         mountain! You see another Aislin. Do you want to pick it up?"),"Could you repeat that? Yes or no, to picking up the mushroom?","Yes or no, to picking up the mushroom?")),se()),{},{redirect:{always:[{cond:e=>"affirm"===e.intent_res.intent.name,actions:Object(h.b)((e=>(de++,{mushCount:de,image:C}))),target:"#oldDwarf"},{cond:e=>"deny"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:I}))),target:"#preKing"},{cond:e=>"help"===e.intent_res.intent.name,target:"helping"},{target:"nomatch"}]}})},oldDwarf:{id:"oldDwarf",initial:"prompt",on:{ENDSPEECH:{actions:Object(h.b)((e=>({image:te}))),target:"#leftRight"}},states:{prompt:{entry:ie("While you are picking it up, a figure appears behind you.                         It is an older-looking dwarf, who looks at you and at the mushroom. He looks surprised,                         but does not say a word. He signals you to come with him, which you do. He leads you to a                         tunnel with a rune over it. \u201cYou need to go, quickly! There will be two doors at the end:                         whatever you do, do not take the door on the left!\u201d. You thank him and leave. ")}}},leftRight:{id:"leftRight",initial:"prompt",on:{RECOGNISED:{target:".rasa"}},states:Object(n.a)(Object(n.a)(Object(n.a)({},re(ie("You get to the doors. Do you want to pick the left one or the right one?"),"Sorry, what? Left door or right door?","Left or right?")),se()),{},{redirect:{always:[{cond:e=>"left"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:P}))),target:"#finalBoss"},{cond:e=>"right"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:X}))),target:"#free3"},{cond:e=>"help"===e.intent_res.intent.name,target:"helping"},{target:"nomatch"}]}})},preKing:{id:"preKing",initial:"prompt",on:{ENDSPEECH:{target:"#king"}},states:{prompt:{entry:ie("While you are picking it up, some figures appears behind you.")}}},king:{id:"king",initial:"prompt",on:{RECOGNISED:{target:".rasa"}},states:Object(n.a)(Object(n.a)(Object(n.a)({},re(ie("'All hail king Thorin!', you hear some dwarfs chant as a solemn figure seats in a throne.                         'What have we here? Who are you?' he says. Do you want to tell the truth, young adventurer?"),"Did you say yes or no, to telling the truth?","You should reply yes if you want to tell the truth, or no, otherwise")),se()),{},{redirect:{always:[{cond:e=>"affirm"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:Y}))),target:"#truth"},{cond:e=>"deny"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:T}))),target:"#lying"},{cond:e=>"help"===e.intent_res.intent.name,target:"helping"},{target:"nomatch"}]}})},truth:{id:"truth",initial:"prompt",on:{ENDSPEECH:{actions:Object(h.b)((e=>({image:P}))),target:"#finalBoss"}},states:{prompt:{entry:ie("You try to explain that you got lost coming back from school, but they don\u2019t believe you.                         'Liar! We have been living here for hundreds of years, and nobody has ever come. Why should we trust you? How can                         we know you will not tell our secret to anyone?', replies the king.                         'Sire!' ,you hear another dwarf talking, 'We could let her decide\u2026'                         'Her\u2026 yes, she has proven useful many times. Bring the liar to her!'")}}},lying:{id:"lying",initial:"prompt",on:{RECOGNISED:{target:".rasa"}},states:Object(n.a)(Object(n.a)(Object(n.a)({},re(ie("You reply: 'who is asking?', as the king gets up, angry.                        'How dare you, insolent creature, speak like that to the King! I am king Thorin, the king under the Mountain,                         and I have protected it from all harm\u2026 until now.' Oh no! We should say something! Do you want to ask for mercy                         or stay quiet?"),"Did you say mercy or be quiet?","You should say mercy to beg for mercy, or quiet to stay quiet.")),se()),{},{redirect:{always:[{cond:e=>"mercy"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:N}))),target:"#mercy"},{cond:e=>"quiet"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:Q}))),target:"#youDie6"},{cond:e=>"help"===e.intent_res.intent.name,target:"helping"},{target:"nomatch"}]}})},mercy:{id:"mercy",initial:"prompt",on:{ENDSPEECH:[{cond:e=>e.mushCount>=1,actions:Object(h.b)((e=>({image:V}))),target:"#free4"},{actions:Object(h.b)((e=>({image:z}))),target:"#youDie5"}]},states:{prompt:{entry:ie("How can we trust you? Do you have anything that will prove your worth?, they ask")}}},deadDoor:{id:"deadDoor",initial:"prompt",on:{RECOGNISED:{target:".rasa"}},states:Object(n.a)(Object(n.a)(Object(n.a)({},re(ie("You enter the door and seem to be in some sort of burial place, a catacomb.                         The door closes behind you, and you start hearing some eery sounds. Do you want to stay to                         investigate or run as fast as you can?"),"Did you say 'stay' or 'run'?","You should say 'stay' to investigate or 'run'")),se()),{},{redirect:{always:[{cond:e=>"stay"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:_}))),target:"#investigate"},{cond:e=>"go"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:R}))),target:"#run1"},{cond:e=>"help"===e.intent_res.intent.name,target:"helping"},{target:"nomatch"}]}})},investigate:{id:"investigate",initial:"prompt",on:{RECOGNISED:{target:".rasa"}},states:Object(n.a)(Object(n.a)(Object(n.a)({},re(ie("The eerie sounds grow louder and louder as you approach the tombs. It is\u2026 coming from inside!                        Suddenly, the stone covering the biggest tomb moves to one side and a skeleton wearing ragged clothes comes                         from underneath. Do you run, leaving everything behind, or try to hide?"),"Did you say run or hide?","You should say run or hide")),se()),{},{redirect:{always:[{cond:e=>"stay"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:Z}))),target:"#youDie7"},{cond:e=>"go"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:oe}))),target:"#run2"},{cond:e=>"help"===e.intent_res.intent.name,target:"helping"},{target:"nomatch"}]}})},run2:{id:"run2",initial:"prompt",on:{ENDSPEECH:{actions:Object(h.b)((e=>({mushCount:de,image:A}))),target:"deadDoors"}},states:{prompt:{entry:ie("Your bag seems to distract him for a moment, while you run as fast as you can                         towards another room. You have lost all your belongings, except for the torch you carried in your hand. ")}}},run1:{id:"run1",initial:"prompt",on:{RECOGNISED:{target:".rasa"}},states:Object(n.a)(Object(n.a)(Object(n.a)({},re(ie("You run and run but end up getting lost. You don\u2019t know where to go, and you\u2019re scared and cold.                         Look, adventurer, there are two doors again! There are no differences in it, except for a Aislin growing next to the                         door on the left. Do you want to pick it up?"),"Sorry, yes or no, to picking up the mushroom?","Say yes to pick up the mushroom or no otherwise.")),se()),{},{redirect:{always:[{cond:e=>"affirm"===e.intent_res.intent.name,actions:Object(h.b)((e=>(de++,{mushCount:de,image:A}))),target:"#deadDoors"},{cond:e=>"deny"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:A}))),target:"#deadDoors"},{cond:e=>"help"===e.intent_res.intent.name,target:"helping"},{target:"nomatch"}]}})},deadDoors:{id:"deadDoors",initial:"prompt",on:{RECOGNISED:{target:".rasa"}},states:Object(n.a)(Object(n.a)(Object(n.a)({},re(ie("Which door do you want to pick?"),"Which one, left or right?","Say left for the left door and right for right door")),se()),{},{redirect:{always:[{cond:e=>"left"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:k}))),target:"#kingDoor"},{cond:e=>"right"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:$}))),target:"#youDie8"},{cond:e=>"help"===e.intent_res.intent.name,target:"helping"},{target:"nomatch"}]}})},finalBoss:{id:"finalBoss",initial:"prompt",on:{ENDSPEECH:[{cond:e=>1===e.gobletCount,actions:Object(h.b)((e=>({image:x}))),target:"#IHaveAGoblet"},{cond:e=>0!==e.mushCount,actions:Object(h.b)((e=>({image:W}))),target:"#eating"},{actions:Object(h.b)((e=>({image:G}))),target:"#praying"}]},states:{prompt:{entry:ie("You get to a dark room. There seems to be nobody here. Hello?                         You try to illuminate the room with your torch, but it is too big. You hear a weird                         noise that sends shivers down your spine\u2026 you have never heard anything like it, in all your life.                          Quickly, you should do something, adventurer! Um\u2026 do you have anything on you?")}}},finalBossAppearance:{id:"finalBossAppearance",initial:"prompt",on:{ENDSPEECH:[{cond:e=>1===e.gobletCount,actions:Object(h.b)((e=>({image:B}))),target:"#gobletEnding"},{cond:e=>0!==e.mushCount,actions:Object(h.b)((e=>({image:M}))),target:"#free1"},{actions:Object(h.b)((e=>({image:J}))),target:"#youDie4"}]},states:{prompt:{entry:ie("From the end of the room, a big dark shape appears. At its core, you                             can see a woman, with long green hair and glowing eyes. She wraps you                             with its long dark arms and holds you close to her face.")}}},praying:{id:"praying",initial:"prompt",on:{ENDSPEECH:{actions:Object(h.b)((e=>({image:L}))),target:"#finalBossAppearance"}},states:{prompt:{entry:ie("Okay, we\u2019re screwed. Do you know how to pray?")}}},eating:{id:"eating",initial:"prompt",on:{ENDSPEECH:{actions:Object(h.b)((e=>({image:L}))),target:"#finalBossAppearance"}},states:{prompt:{entry:ie("The Aislin! The legends say they are very powerful! What should we do with a mushroom?                         I think we both know a certain Italian guy who would suggest a-eating it. You eat the Aislin.")}}},IHaveAGoblet:{id:"IHaveAGoblet",initial:"prompt",on:{ENDSPEECH:{actions:Object(h.b)((e=>({image:L}))),target:"#finalBossAppearance"}},states:{prompt:{entry:ie("Oooh the goblet of Morgana! I\u2026 don\u2019t know how to use it. Just be prepared for what may come.")}}},gobletEnding:{id:"gobletEnding",initial:"prompt",on:{RECOGNISED:{target:".rasa"}},states:Object(n.a)(Object(n.a)(Object(n.a)({},re(ie(" She looks at the goblet, intrigued. You hold it tighter,                         afraid that she will get it. She laughs as she puts you down. \u201cYou are the holder of the goblet\u2026                         how\u2026 intriguing. Will you be willing to trade it? The goblet for your life.\u201d"),"Do you want to trade the goblet for your life? Yes or no?","Say yes to trade the goblet for your life of no to use the goblet.")),se()),{},{redirect:{always:[{cond:e=>"affirm"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:K}))),target:"#youDie3"},{cond:e=>"deny"===e.intent_res.intent.name,actions:Object(h.b)((e=>({image:U}))),target:"#free2"},{cond:e=>"help"===e.intent_res.intent.name,target:"helping"},{target:"nomatch"}]}})}}}}};var le=o.p+"static/media/Diapositiva1.cc4d3137.png",pe=o(22),me=o(11);const ye=r.a.send,be=r.a.cancel;Object(d.a)({url:"https://statecharts.io/inspect",iframe:!1});const fe=Object(s.a)({id:"root",type:"parallel",states:{dm:Object(n.a)({},ge),asrtts:{initial:"idle",states:{idle:{on:{LISTEN:"recognising",SPEAK:{target:"speaking",actions:Object(h.b)(((e,t)=>({ttsAgenda:t.value})))}}},recognising:{initial:"progress",entry:"recStart",exit:"recStop",on:{ASRRESULT:{actions:["recLogResult",Object(h.b)(((e,t)=>({recResult:t.value})))],target:".match"},RECOGNISED:{target:"idle",actions:be("maxsp")},MAXSPEECH:"idle"},states:{progress:{},match:{entry:ye("RECOGNISED")}}},speaking:{entry:"ttsStart",on:{ENDSPEECH:"idle"}}}}}},{actions:{recLogResult:e=>{console.log("<< ASR: "+e.recResult)},test:()=>{console.log("test")},logIntent:e=>{console.log("<< NLU intent: "+e.nluData.intent.name)}}}),we=e=>{switch(!0){case e.state.matches({asrtts:"recognising"}):return Object(me.jsx)("button",Object(n.a)(Object(n.a)({type:"button",className:"glow-on-hover",style:{animation:"glowing 20s linear"}},e),{},{children:"Listening..."}));case e.state.matches({asrtts:"speaking"}):return Object(me.jsx)("button",Object(n.a)(Object(n.a)({type:"button",className:"glow-on-hover",style:{animation:"bordering 1s infinite"}},e),{},{children:"Speaking..."}));default:return Object(me.jsx)("button",Object(n.a)(Object(n.a)({type:"button",className:"glow-on-hover"},e),{},{children:"Click to play"}))}};function Oe(){const e=Object(pe.useSpeechSynthesis)({onEnd:()=>{u("ENDSPEECH")}}),t=e.speak,o=e.cancel,n=(e.speaking,Object(pe.useSpeechRecognition)({onResult:e=>{u({type:"ASRRESULT",value:e})}})),i=n.listen,r=(n.listening,n.stop),s=Object(c.b)(fe,{devTools:!0,actions:{recStart:Object(c.a)((()=>{console.log("Ready to receive a color command."),i({interimResults:!1,continuous:!0})})),recStop:Object(c.a)((()=>{console.log("Recognition stopped."),r()})),changeColour:Object(c.a)((e=>{console.log("Repainting..."),document.body.style.background=e.recResult})),ttsStart:Object(c.a)(((e,o)=>{console.log("Speaking..."),t({text:e.ttsAgenda})})),ttsCancel:Object(c.a)(((e,t)=>{console.log("TTS STOP..."),o()}))}}),h=Object(a.a)(s,3),d=h[0],u=h[1];h[2];let g=le;return d.context.image&&(g=d.context.image),Object(me.jsxs)("div",{className:"App",children:[Object(me.jsx)("div",{children:Object(me.jsx)(we,{state:d,onClick:()=>u("CLICK")})}),Object(me.jsx)("div",{children:Object(me.jsx)("img",{src:g})})]})}const ve=e=>fetch(new Request("https://cors-anywhere.herokuapp.com/https://dsquest.herokuapp.com/model/parse/",{method:"POST",headers:{Origin:"http://localhost:3000/"},body:'{"text": "'.concat(e,'"}')})).then((e=>e.json())),De=document.getElementById("root");i.render(Object(me.jsx)(Oe,{}),De)}},[[40,1,2]]]);
//# sourceMappingURL=main.0a81fe66.chunk.js.map