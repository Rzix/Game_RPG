
import debug from "debug"
const speed=7000
const generalLog: debug.Debugger = debug("app:general");

abstract class Invader { //گروه مهاجم
    name:string='';
     _health:number=100;
    chivalry:number=100;
    protected hunger:number=100;
    protected elixir?: number;
    private handlerdebugger:any;
    _damag:number=0;
    public log:any;

     set health(input:number){
        this._health=input
    }
    get health(){
        return this._health;
    }
    constructor(name:string,elixir:number) {
        this.name=name
        this.log=debug(`app:Invader ${name}`)
        this.handlerdebugger= setInterval(()=>{
            this.hunger-=10           
            if(this.hunger==50){
                if(elixir>0){
                    
                    elixir--
                    this.hunger+=4
                     this.log(`${name} use elixir`,elixir)
                this.log(`the ${name} was hungry`,this.hunger)
                    
            }
            }
            if(this.hunger==0){
                this.dead
                 this.log(`the ${name} wasted!`)
                  clearInterval(this.handlerdebugger)
            }
            
        },Math.random()*speed)
    }

    async attack(enemy:string){
      
        const promis=new Promise((resolve,reject)=>{
          
            setTimeout(()=>{
                if(this.dead() ){
                 this.log(`${this.name} wasted can't attack`)
                 return false
            }     
                
            this.chivalry-=4;                   
            this.log(`the ${this.name} attack to ${enemy} && the chivalry of ${this.name} : ${this.chivalry}`);
     
              return  resolve(true)
            },Math.random()*speed)
        });
        return promis  
    }
    
 
    dead(){
        return this._health<=0 || this.hunger<=0;
    }
    
   
    
  
}

class Mongol extends Invader{
    name: string='Mongol';
    sword:number=4;
    _health: number=50;
    constructor(name:string,sword:number){
        super(name,0);  
        while(this.sword>0)  {
            this.sword--
     return this.log(`the sword of ${name}:${this.sword}`)
        }
      if(this.sword==0){
        return  this.log (`the sword was end...`)
      }
    }
    
}

class Hellman extends Invader {
    name: string='Hellman';
    fire:number=7;
    
    constructor(name:string,fire:number) {
        super(name,0);
        this.health+=1000
        this.hunger+=1000
      setInterval(()=>{
          while(fire>=0 && this.health>0 && this.hunger>0){ 
         this.fire=fire--;
        this.log(`the fire ball of ${name}:${this.fire}`)
        
    // if(fire==0 || this.health<0 ){
    //     this.log(`the fire ball was or Im dead`)
        
         if(fire==0){
            this.log(`I cant use fire ball`)
            return null
        }
        // return null
    // }
}
    
      },3000)   
    }
}

class Spellbinder extends Invader{
    name: string='Spellbinder';
    elixir:number=5;
//    hunger:number=100;
    constructor(name:string,elixir:number){
        super(name,4)
        if(this.hunger==50){
            this.elixir=elixir--;
            this.log(`the ${name} use elixire :`,this.elixir,this.hunger+=50)
        }
    }
    
}

class Tribe{
    name:string='';
    invader:Invader[];
    log:debug.Debugger;
    constructor(name: string, invader: Invader[]) {
        this.name = name;
        this.invader = invader;
        this.log = debug(`app:tribe:${this.name}`);
      }
   
   async attack(enemy:Totorial,enemy2:Totorial2){
      this.invader?.forEach((invander)=>{
        //   this.log(`Attacking to${enemy.name && enemy2.name }`)
         
          return  invander.attack('');
      })  
    }
    getRemainingHeroes(): Invader[] {
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





abstract class Justice { //گروه عدالت
    name:string='';
     shield:number=5;
    protected _health:number=200;
    purveyance:number=1;
    hunger:number=100;
    _damag:number=0;//ضربه خوردن
   protected _defend:number=5
    protected gold?: number;
    private myHungryHandler: any;
    
    log:any;
    
    constructor(name:string , gold:number) {

            this.name=name
        this.log=debug(`app:Justic ${name}`)
        this.myHungryHandler = setInterval(()=>{
            
            this.defend()
            this.hunger-=10
          this.log(`hunger of ${this.name} : ${this.hunger}`)  
            console.log(`hunger:${this.hunger}`) 
            if(this.hunger==50){
               this.log(`the ${name} was hungry`) 
               if(this.purveyance>0  &&  gold>0){ 
                gold--
               this.purveyance--
               this.log(`the ${name} was use purveyance and the gold:${gold}  and hungry${this.hunger+=10}.....the purveyance:${this.purveyance}`)
               if(gold==0){
                   this.log(`the gold of ${name} was end`)    
               }
               if(this.purveyance==0){
                console.log(`all purveyance for ${this.name} was end`)
                return null
               }
              
            }       
            }
            if(this.hunger==0 || this._damag<-15){  
                this.dead()
                this.log(`the ${name} wasted! damag:${this._damag}`)
                clearInterval(this.myHungryHandler)
            }
        },Math.random()*speed)
    }
    // fundstr /i wasted  (For a specific command)
   
    defend (){
        
        const promis=new Promise((resolve,reject)=>{
            setInterval(()=>{        
                while(this.shield>0){
                this.shield--
                this.log(` ${this.name} was difending shield=${this.shield}`)
                if(this.shield==0) {
                    while(this._damag==-25){
                        this._damag-=5
                        this.log(`the ${this.name} wasted  damag=${this._damag}`)
                        this.dead()
                        return false
                    }    
                }         
               }  
                resolve(null)
            },3000)
        });
        return promis  
        
    }
   
    dead(){
        return this._health<=0 || this.hunger<=0;    
    }
    
}

class Raheb extends Justice{
name: string='Nun1';
shield: number=1;
purveyance: number=6;
    constructor(name:string) {
        super(name,5)
            
    }
 }
    

class Dervish extends Justice {
    name: string='dervish';
    shield: number=2;
    purveyance: number=2;
    constructor(name:string){
        super(name,3)

    }
    
}

 class Soldier extends Justice {
    name: string='soldir';
    shield: number=5;
    purveyance: number=9;
    constructor(name:string) {
        super(name,15)
        this.shield
    }
}
 
class Judge extends Justice {
    name: string='jude';
    shield: number=0;
    purveyance: number=15;
    constructor(name:string) {
        super(name,18)
       
    }
}
class Rich_Man extends Justice {
    name: string='Rich_man';
   purveyance: number=20;
    shield: number=3;
    
    constructor(name:string) {
        super(name,20) 
    }
    
}

class Angry_Man extends Justice {
    name: string='angry_man';
    shield: number=0;
    purveyance: number=3;
    constructor(name:string) {
        super(name,3)
        
       
    }
}

 class Totorial{
    name:string='';
    justice:Justice[] | undefined;
    log:debug.Debugger | undefined
  constructor(name:string,justice:Justice[]){
    this.name=name;
    this.justice=justice;
    
    this.log=debug(`app:totrial${this.name}`)
  }
    defend(){
        this.justice?.forEach((justic)=>{
            justic.defend();
        })         
}
}
class Totorial2 {
    name:string='';
    justice2:Justice[] | undefined;
    log:debug.Debugger | undefined
  constructor(name:string,justice2:Justice[]){
    this.name=name;
    this.justice2=justice2;
    
    this.log=debug(`app:totrial${this.name}`)
  }
    defend(){
        this.justice2?.forEach((justic2)=>{
            justic2.defend();       
        }) 
}
}
async function ground(timeout=3) {
    generalLog("War is going to be started... ");
  const interval = setInterval(async () => {
    generalLog(` ${timeout--}`);
    if (timeout <= 0) {
      clearInterval(interval);
      generalLog("♣the game was start♣");
    
    const totorial_Raheb=new Raheb('Nun1');
    const totorial_Dervish=new Dervish('dervish1');
    const totorial_Soldier=new Soldier('soldier');
    const totorial = new Totorial('totorial 1',[
        totorial_Dervish,
        totorial_Raheb,
        totorial_Soldier
    ]);
    const trible_Mogol=new Mongol('mogol1',4);
    const trible_Hellman=new Hellman('Hellman1',7);
    const trible_Spellbinder=new Spellbinder('spellbinder',5)
    const trible= new Tribe('Tribe1',[
        trible_Mogol,
        trible_Hellman,
        trible_Spellbinder
    ]);
    const totorial2_Rich_Man=new Rich_Man('Rich_Man');
    const totorial2_Angry_Man=new Angry_Man('Angry_Man');
    const totorial2_Judge=new Judge('MR.Judge')
    const totorial2=new Totorial2(`totorial 2`,[
        totorial2_Rich_Man,
        totorial2_Angry_Man,
        totorial2_Judge
    ])
               
        trible.invader.forEach((element) => {
        totorial.justice?.forEach((element2)=>{
            totorial2.justice2?.forEach((element3)=>{
                if(element.dead() || element2.dead()|| element3.dead()){
                    generalLog(`every one die`)
                    return false     
                }
                element.attack(`${element3.name||element2.name}`)
            })        
                    if (!element2.dead()){
                    element.attack(`${element2.name}`)
                    element2.defend()
                    }
                })
            })
} 
  },3000)
}
ground()



