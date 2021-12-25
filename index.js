"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const debug_1 = __importDefault(require("debug"));
const speed = 7000;
const generalLog = (0, debug_1.default)("app:general");
class Invader {
    constructor(name, elixir) {
        this.name = '';
        this._health = 100;
        this.chivalry = 100;
        this.hunger = 100;
        this._damag = 0;
        this.name = name;
        this.log = (0, debug_1.default)(`app:Invader ${name}`);
        const handler = setInterval(() => {
            this.hunger -= 10;
            if (this.hunger == 50) {
                if (elixir > 0) {
                    elixir--;
                    this.hunger += 4;
                    this.log(`${name} use elixir`, elixir);
                    this.log(`the ${name} was hungry`, this.hunger);
                }
            }
            if (this.hunger == 0) {
                this.dead;
                this.log(`the ${name} wasted!`);
                clearInterval(handler);
            }
        }, Math.random() * speed);
    }
    set health(input) {
        this._health = input;
    }
    get health() {
        return this._health;
    }
    attack(enemy) {
        return __awaiter(this, void 0, void 0, function* () {
            const promis = new Promise((resolve, reject) => {
                setTimeout(() => {
                    if (this.dead()) {
                        this.log(`${this.name} wasted can't attack`);
                        return false;
                    }
                    this.chivalry -= 4;
                    this.log(`the ${this.name} attack to ${enemy} && the chivalry of ${this.name} : ${this.chivalry}`);
                    return resolve(true);
                }, Math.random() * speed);
            });
            return promis;
        });
    }
    dead() {
        return this._health <= 0 || this.hunger <= 0;
    }
}
class Mongol extends Invader {
    constructor(name, sword) {
        super(name, 0);
        this.name = 'Mongol';
        this.sword = 4;
        this._health = 50;
        while (this.sword > 0) {
            this.sword--;
            return this.log(`the sword of ${name}:${this.sword}`);
        }
        if (this.sword == 0) {
            return this.log(`the sword was end...`);
        }
    }
}
class Hellman extends Invader {
    constructor(name, fire) {
        super(name, 0);
        this.name = 'Hellman';
        this.fire = 7;
        this.health += 1000;
        this.hunger += 1000;
        setInterval(() => {
            while (fire >= 0 && this.health > 0 && this.hunger > 0) {
                this.fire = fire--;
                this.log(`the fire ball of ${name}:${this.fire}`);
                // if(fire==0 || this.health<0 ){
                //     this.log(`the fire ball was or Im dead`)
                if (fire == 0) {
                    this.log(`I cant use fire ball`);
                    return null;
                }
                // return null
                // }
            }
        }, 3000);
    }
}
class Spellbinder extends Invader {
    //    hunger:number=100;
    constructor(name, elixir) {
        super(name, 4);
        this.name = 'Spellbinder';
        this.elixir = 5;
        if (this.hunger == 50) {
            this.elixir = elixir--;
            this.log(`the ${name} use elixire :`, this.elixir, this.hunger += 50);
        }
    }
}
class Tribe {
    constructor(name, invader) {
        this.name = '';
        this.name = name;
        this.invader = invader;
        this.log = (0, debug_1.default)(`app:tribe:${this.name}`);
    }
    attack(enemy, enemy2) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            (_a = this.invader) === null || _a === void 0 ? void 0 : _a.forEach((invander) => {
                //   this.log(`Attacking to${enemy.name && enemy2.name }`)
                return invander.attack('');
            });
        });
    }
    getRemainingHeroes() {
        return this.invader.filter((_invade) => !_invade.dead());
    }
    amILose() {
        return !this.invader.find((_invade) => !_invade.dead());
    }
}
/*
const mongol = new Mongol('mogol1',4);
mongol.attack();
const hellman = new Hellman('Hellman1',7)
hellman.attack();
const spellbinder = new Spellbinder('spellbinder1',5);
spellbinder.attack();
*/
class Justice {
    constructor(name, gold) {
        this.name = '';
        this.shield = 5;
        this._health = 200;
        this.purveyance = 1;
        this.hunger = 100;
        this._damag = 0; //ضربه خوردن
        this._defend = 5;
        this.name = name;
        this.log = (0, debug_1.default)(`app:Invader ${name}`);
        const handler = setInterval(() => {
            this.defend();
            this.hunger -= 10;
            if (this.hunger == 50) {
                this.log(`the ${name} was hungry`);
                if (this.purveyance > 0 && gold > 0) {
                    gold--;
                    this.purveyance--;
                    this.log(`the ${name} was use purveyance and the gold:${gold}  and hungry${this.hunger += 10}.....the purveyance:${this.purveyance}`);
                    if (gold == 0) {
                        this.log(`the gold of ${name} was end`);
                    }
                    if (this.purveyance == 0) {
                        console.log(`all purveyance for ${this.name} was end`);
                        return null;
                    }
                }
            }
            if (this.hunger == 0 || this._damag < -15) {
                this.dead();
                this.log(`the ${name} wasted! damag:${this._damag}`);
                clearInterval(handler);
            }
        }, Math.random() * speed);
    }
    defend() {
        const promis = new Promise((resolve, reject) => {
            setInterval(() => {
                while (this.shield > 0) {
                    this.shield--;
                    this.log(` ${this.name} was difending shield=${this.shield}`);
                    if (this.shield == 0) {
                        while (this._damag == -25) {
                            this._damag -= 5;
                            this.log(`the ${this.name} wasted  damag=${this._damag}`);
                            this.dead();
                            return false;
                        }
                    }
                }
                resolve(null);
            }, 3000);
        });
        return promis;
    }
    dead() {
        return this._health <= 0 || this.hunger <= 0;
    }
}
class Raheb extends Justice {
    constructor(name) {
        super(name, 5);
        this.name = 'Nun1';
        this.shield = 1;
        this.purveyance = 6;
    }
}
class Dervish extends Justice {
    constructor(name) {
        super(name, 3);
        this.name = 'dervish';
        this.shield = 2;
        this.purveyance = 2;
    }
}
class Soldier extends Justice {
    constructor(name) {
        super(name, 15);
        this.name = 'soldir';
        this.shield = 5;
        this.purveyance = 9;
        this.shield;
    }
}
class Judge extends Justice {
    constructor(name) {
        super(name, 18);
        this.name = 'jude';
        this.shield = 0;
        this.purveyance = 15;
    }
}
class Rich_Man extends Justice {
    constructor(name) {
        super(name, 20);
        this.name = 'Rich_man';
        this.purveyance = 20;
        this.shield = 3;
    }
}
class Angry_Man extends Justice {
    constructor(name) {
        super(name, 3);
        this.name = 'angry_man';
        this.shield = 0;
        this.purveyance = 3;
    }
}
class Totorial {
    constructor(name, justice) {
        this.name = '';
        this.name = name;
        this.justice = justice;
        this.log = (0, debug_1.default)(`app:totrial${this.name}`);
    }
    defend() {
        var _a;
        (_a = this.justice) === null || _a === void 0 ? void 0 : _a.forEach((justic) => {
            justic.defend();
        });
    }
}
class Totorial2 {
    constructor(name, justice2) {
        this.name = '';
        this.name = name;
        this.justice2 = justice2;
        this.log = (0, debug_1.default)(`app:totrial${this.name}`);
    }
    defend() {
        var _a;
        (_a = this.justice2) === null || _a === void 0 ? void 0 : _a.forEach((justic2) => {
            justic2.defend();
        });
    }
}
function ground(timeout = 3) {
    return __awaiter(this, void 0, void 0, function* () {
        generalLog("War is going to be started... ");
        const interval = setInterval(() => __awaiter(this, void 0, void 0, function* () {
            generalLog(` ${timeout--}`);
            if (timeout <= 0) {
                clearInterval(interval);
                generalLog("♣the game was start♣");
                const totorial_Raheb = new Raheb('Nun1');
                const totorial_Dervish = new Dervish('dervish1');
                const totorial_Soldier = new Soldier('soldier');
                const totorial = new Totorial('totorial 1', [
                    totorial_Dervish,
                    totorial_Raheb,
                    totorial_Soldier
                ]);
                const trible_Mogol = new Mongol('mogol1', 4);
                const trible_Hellman = new Hellman('Hellman1', 7);
                const trible_Spellbinder = new Spellbinder('spellbinder', 5);
                const trible = new Tribe('Tribe1', [
                    trible_Mogol,
                    trible_Hellman,
                    trible_Spellbinder
                ]);
                const totorial2_Rich_Man = new Rich_Man('Rich_Man');
                const totorial2_Angry_Man = new Angry_Man('Angry_Man');
                const totorial2_Judge = new Judge('MR.Judge');
                const totorial2 = new Totorial2(`totorial 2`, [
                    totorial2_Rich_Man,
                    totorial2_Angry_Man,
                    totorial2_Judge
                ]);
                trible.invader.forEach((element) => {
                    var _a;
                    (_a = totorial.justice) === null || _a === void 0 ? void 0 : _a.forEach((element2) => {
                        var _a;
                        (_a = totorial2.justice2) === null || _a === void 0 ? void 0 : _a.forEach((element3) => {
                            if (element.dead() || element2.dead() || element3.dead()) {
                                generalLog(`every one die`);
                                return false;
                            }
                            element.attack(`${element3.name || element2.name}`);
                        });
                        if (!element2.dead()) {
                            element.attack(`${element2.name}`);
                            element2.defend();
                        }
                    });
                });
            }
        }), 3000);
    });
}
ground();
