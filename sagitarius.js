
window.addEventListener('DOMContentLoaded', (event) =>{


    let names = []
    let stars = []
    let selectedplanet = {}

    let selectingplanet = 0
    let lands = []
    let tip = {}
    let selected = {}
    let shipselected = {}
    let xselected = {}
    let yselected = {}
    let zselected = {}
    let planets = []
    let raceselected = 0

    let selectedrace = {}
    let keysPressed = {};

document.addEventListener('keydown', (event) => {
   keysPressed[event.key] = true;
});

document.addEventListener('keyup', (event) => {
    delete keysPressed[event.key];
 });


    let tutorial_canvas = document.getElementById("tutorial");


    let tutorial_canvas_context = tutorial_canvas.getContext('2d');

 //   tutorial_canvas_context.scale(.1, .1);  // this scales the canvas
    tutorial_canvas.style.background = "#000000"

    const flex = tutorial_canvas.getBoundingClientRect();

    window.addEventListener('mousedown', e => {

        xs = e.clientX - flex.left;
        ys = e.clientY - flex.top;
          tip.x = xs
          tip.y = ys
          

          if(raceselected == 1){

            for(let s = 0; s<ships.length; s++){
                if(intersects(ships[s].body, tip)){

                    // if(ships[s].owner == selectedrace){
                        shipselected = ships[s]
                        selected = ships[s]
                        tringle.x = ships[s].body.x 
                        tringle.y = ships[s].body.y 
                    // }
                }
            }

            if(selectedrace.owned.includes(selected)){
                if(squarecircle(colonizebutton, tip)){
                    if(selectedrace.wealth >= 500){
                    selectedrace.wealth -= 500
                    let shipbuilt = new Ship(selectedplanet)
                    shipbuilt.colonize = 1
                    ships.push(shipbuilt)
                    }
               }
               if(squarecircle(bigshipbutton, tip)){
                   if(selectedrace.wealth >= 500){
                   let shipbuilt = new Ship(selected)
                    shipbuilt.class = "Skirmisher"
                    shipbuilt.armor += 5
                    shipbuilt.weapons += 17
                    shipbuilt.hull += 150
                    shipbuilt.maxhull += 150
                    shipbuilt.range = 5
                   ships.push(shipbuilt)
                   selectedrace.wealth -= 500
                   }
              }
            }





            if(typeof shipselected.body == 'undefined'){
           
        }else{
            if(squarecircle(movebutton, tip)){
                if(shipselected.owner == selectedrace){
                shipselected.reroute((selectedplanet))
                }
                }


                if(squarecircle(playhumans, tip)){
                    if(shipselected.colonize == 1){
                    if(!vaptrons.owned.includes(shipselected.docked) &&!kursa.owned.includes(shipselected.docked) &&!buggos.owned.includes(shipselected.docked) && !humanzees.owned.includes(shipselected.docked)){
                    shipselected.owner.colonize(shipselected.docked)
                    ships.splice(ships.indexOf(shipselected), 1)
                    selected = shipselected.docked
                    }
                    }
                    }

                    if(squarecircle(repairbutton, tip)){
                        if(shipselected.owner == selectedrace){
                            if(shipselected.docked.owner == selectedrace){
                                if(selectedrace.wealth >= Math.floor((shipselected.maxhull-shipselected.hull)/3)){
                                    selectedrace.wealth -= Math.floor((shipselected.maxhull-shipselected.hull)/3)
                                    shipselected.hull = shipselected.maxhull
                                }
                            }
                    }
                 }
            }
          }else{
            if(squarecircle(playkursa, tip)){
           
                playhumans.color = "white"
                selectedrace = kursa
                raceselected = 1
            }
            if(squarecircle(playbuggos, tip)){
           
                playhumans.color = "white"
                selectedrace = buggos
                raceselected = 1
            }
            if(squarecircle(playhumans, tip)){
               
                playhumans.color = "white"
                selectedrace = humanzees
                raceselected = 1
            }
            if(squarecircle(playvaptrons, tip)){
               
                playhumans.color = "white"
                selectedrace = vaptrons
                raceselected = 1
            }
          }
          for(let p=0;p<planets.length; p++){
          if(intersects(planets[p].body, tip)){
              if(selectingplanet == 0){
              if(typeof shipselected.body == 'undefined'){
              selected = planets[p]
              tringle.x = planets[p].body.x 
              tringle.y = planets[p].body.y - (planets[p].body.radius+20)
              }else{
                selectingplanet = 1
              }
              }else{
               shipselected = selected
                  selectedplanet = planets[p]
                selected = planets[p]
                tringle.x = planets[p].body.x 
                tringle.y = planets[p].body.y - (planets[p].body.radius+20)
                ptringle.x = planets[p].body.x 
                ptringle.y = planets[p].body.y - (planets[p].body.radius+20)
              }
          }
          }


        

    })
    class Line{
        constructor(x,y, x2, y2, color, width){
            this.x1 = x
            this.y1 = y
            this.x2 = x2
            this.y2 = y2
            this.color = color
            this.width = width
        }
        draw(){



            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.lineWidth = this.width

            tutorial_canvas.style.s
            tutorial_canvas_context.beginPath(); 
    
            tutorial_canvas_context.moveTo(this.x1, this.y1); 
            
            tutorial_canvas_context.lineTo(this.x2, this.y2); 
            tutorial_canvas_context.stroke();  


            tutorial_canvas_context.lineWidth = 1
        }
    }

    class Land{
        constructor(x,y){
            this.surface = new Rectangle(x,y,20,20,"green")
            this.fertility = Math.floor(Math.random()*5)+1
            this.rarematerial = false
            this.water = false
            lands.push(this)
        }
        draw(){
            if(this.rarematerial == true){
                this.surface.color = "#FFFF00"
            }
            if(this.fertility == 5){
                this.surface.color = "#00FF00"
            }
            if(this.water == true){
                this.surface.color = "#00AAFF"
            }
            this.surface.draw()
        }
    }


    // can be drawn, or moved.
    class Rectangle {
        constructor(x, y, height, width, color) {
            this.x = x
            this.y = y
            this.height = height
            this.width = width
            this.color = color
            this.xmom = 0
            this.ymom = 0
        }
        draw(){
            tutorial_canvas_context.fillStyle = this.color
            tutorial_canvas_context.fillRect(this.x, this.y, this.width, this.height)
        }
        move(){

            this.x+=this.xmom
            this.y+=this.ymom

        }
    }

    // can be drawn, or moved with friction.  and richochet 
    class Circle{
        constructor(x, y, radius, color, xmom = 0, ymom = 0){
            this.x = x
            this.y = y
            this.radius = radius
            this.color = color
            this.xmom = xmom
            this.ymom = ymom
        }       
         draw(){
            tutorial_canvas_context.lineWidth = 1

            tutorial_canvas_context.strokeStyle = this.color
            tutorial_canvas_context.beginPath();
            tutorial_canvas_context.arc(this.x, this.y, this.radius, 0, (Math.PI*2), true)
            tutorial_canvas_context.fillStyle = this.color
           tutorial_canvas_context.fill()
            tutorial_canvas_context.stroke(); 
        }
        move(){

            this.xmom*=.9999
            this.ymom*=.9999   //friction

            this.x += this.xmom
            this.y += this.ymom

            if(this.x+this.radius > tutorial_canvas.width){

                if(this.xmom > 0){
                this.xmom *= -1
                }

            }
            if(this.y+this.radius > tutorial_canvas.height){
                if(this.ymom > 0){
                this.ymom *= -1
                }

            }
            if(this.x-this.radius < 0){
                if(this.xmom < 0){
                    this.xmom *= -1
                }

            }
            if(this.y-this.radius < 0){

                if(this.ymom < 0){
                    this.ymom *= -1
                }
        
            }

            // ^ this reflects balls off the wall
            // the internal checks make it always return to the screen

        }


    }
    class Planet{
        constructor(x,y){
            this.body = new Circle(x,y ,(5+Math.random()*11), getRandomLightColor())
            this.fertility = Math.floor(Math.random()*10)+3
            this.minerals = Math.floor(Math.random()*10)+3
            this.size = Math.floor(this.body.radius)
            this.polution = Math.floor(Math.random()*3)
            this.name = ''
            // this.polution = 0
            this.owner = {}
            this.population = 0
            this.owner.name = "none"
            this.owner.wealth = 0
            randomplanetnames(this)
            this.routes = {}
            let tooclose = false
            for(let g = 0; g< planets.length; g++){
                if(intersectsplanet(planets[g].body, this.body)){
                    tooclose = true
                }
            }
            if(tooclose == false){
            planets.push(this)
            }
        }
        draw(){
            this.body.draw()

            if(selected == this){
            tutorial_canvas_context.fillStyle = "white";
            tutorial_canvas_context.font = `${30}px Arial`
            tutorial_canvas_context.fillText(`Owner wealth: ${Math.floor(this.owner.wealth)}`, 750, 50);
            tutorial_canvas_context.fillText(`Planet: ${this.name}`, 750, 100);
            tutorial_canvas_context.fillText(`Fertility: ${this.fertility}`, 750, 200);
            tutorial_canvas_context.fillText(`Minerals: ${this.minerals}`, 750, 250);
            tutorial_canvas_context.fillText(`Size: ${this.size}`, 750, 300);
            tutorial_canvas_context.fillText(`Polution: ${this.polution}`, 750, 350);
            tutorial_canvas_context.fillText(`Owned by: ${this.owner.name}`, 750, 400);
            if(this.owner.name != "none"){

            tutorial_canvas_context.fillText(`Population: ${this.population}`, 750, 450);
            }
            }
         
        }
    }
    class Ship{
        constructor(docked){
        this.body = new Pointer(docked.body.x-20, docked.body.y-20, docked.owner.color, 7)
        this.owner = docked.owner
        this.colonize = 0
        this.docked = docked
        this.docking = docked
        this.steps = (docked.routes[this.docking.name])
        this.weapons =  Math.floor(Math.random()*3)+4
        this.armor =  Math.floor(Math.random()*2)+2
        this.range = Math.floor(Math.random()*4)+3
        this.maxhull = 100
        this.hull = 100
        this.class = "Scout"
        this.moving = 0
        
        this.walkx = ((this.body.x -(this.docking.body.x))/(this.docked.routes[this.docking.name]))
        this.walky =  ((this.body.y - (this.docking.body.y))/(this.docked.routes[this.docking.name]))
        }
        reroute(gohere){

            if(  (this.docked.routes[gohere.name]) <= this.range){
                this.docking = gohere
        this.steps = (this.docked.routes[this.docking.name])
        
        this.walkx = ((this.body.x -(-20+this.docking.body.x))/(this.docked.routes[this.docking.name]))
        this.walky =  ((this.body.y - (-20+this.docking.body.y))/(this.docked.routes[this.docking.name]))
            }
        }
        move(){
            if(this.steps > 0){
                this.moving = 1
                this.steps -= 1
                this.body.x -= this.walkx
                this.body.y -= this.walky
            }else{
                this.docked = this.docking
                this.moving = 0
            }

            if(this.moving == 0){
                if(this.owner.name !== this.docked.owner.name && this.docked.owner.name!== "none"){
                    this.docked.population -= this.weapons * 100
                    this.hull -= Math.floor(Math.random()*2)+1
                    if(this.docked.population < 0){
                        this.docked.population = 0
                    }
                }
            }

        }
        draw(){
            this.body.draw()

            if(typeof shipselected.body !== "undefined"){

            if(this.moving == 0){
            if(shipselected == this){
                if(this.owner == selectedrace){
            movebutton.draw()
             repairbutton.draw()
                }
            if(this.colonize == 1){
                this.class = "Colony Ship"

                if(this.owner == selectedrace){
             playhumans.draw()
                }
            }else{
                this.range = 7
            }
            }
            }

            }

            if(selected == this){
                tutorial_canvas_context.fillStyle = "white";
                tutorial_canvas_context.font = `${30}px Arial`
                tutorial_canvas_context.fillText(`Class: ${this.class}`, 750, 50);
                tutorial_canvas_context.fillText(`Hull strength: ${this.hull}/${this.maxhull}`, 750, 100);
                tutorial_canvas_context.fillText(`Weapon strength: ${this.weapons}`, 750, 150);
                tutorial_canvas_context.fillText(`Armor: ${this.armor}`, 750, 200);
                tutorial_canvas_context.fillText(`Move Range: ${this.range}`, 750, 250);
                if(this.moving == 0){
                tutorial_canvas_context.fillText(`Docked at: ${this.docked.name}`, 750, 300);

                }else{

                tutorial_canvas_context.fillText(`In transit to: ${this.docking.name}`, 750, 300);
                }
                tutorial_canvas_context.fillText(`Owned by: ${this.owner.name}`, 750, 400);
                }


        }
    }

    class Race{
        constructor(name, color = "green"){
            this.color = color
            this.name = name
            this.owned = []
            this.wealth = 1500
        }
        colonize(planet){

            // if(this.wealth >= 500){
                this.owned.push(planet)
                planet.owner = this
                if(planet.population < 10000){
                    planet.population = 10000
                }
                // this.wealth-=500
            // }
        }
        draw(){

        for(let f = 0; f<this.owned.length; f++){

            for(let g = 0; g<this.owned.length; g++){

                let beam = new Line(this.owned[f].body.x, this.owned[f].body.y, this.owned[g].body.x, this.owned[g].body.y, this.color, 1)
                beam.draw()

            }

        }
        }
        resource(){



        if(raceselected == 1){





            if(this !== selectedrace){


            for(let w = 0; w<this.owned.length; w++){

                if(Math.random()<.01){
                if(this.wealth >= 500){
                    this.wealth -= 500
                    let shipbuilt = new Ship(this.owned[w])
                    shipbuilt.colonize = Math.floor(Math.random()*2)

                    if(shipbuilt.colonize == 0){
                        shipbuilt.class = "Skirmisher"
                        shipbuilt.armor += 5
                        shipbuilt.weapons += 17
                        shipbuilt.hull += 150
                        shipbuilt.maxhull += 150
                        shipbuilt.range = 5
                    }

                    ships.push(shipbuilt)
                }
                }
            }



                for(let s = 0; s<ships.length; s++){
                    if(ships[s].owner !== selectedrace){
                        if(ships[s].colonize == 1){
                        if(ships[s].steps == 0){  
                               if(!vaptrons.owned.includes(ships[s].docking) &&!kursa.owned.includes(ships[s].docking) &&!buggos.owned.includes(ships[s].docking) && !humanzees.owned.includes(ships[s].docking)){
        
                                if(ships[s].docking == ships[s].docked){
                                ships[s].owner.colonize(ships[s].docking)
                                ships.splice(s, 1)
                                }
                                
                            }else{
                        if(ships[s].moving == 0){
                            if(ships[s].docked.owner == ships[s].owner){
                                ships[s].reroute(planets[Math.floor(Math.random()*planets.length)])
                            }
                            }
                            }
                        }
                        }else{
                        if(ships[s].moving == 0){
                        if(ships[s].docked.owner == ships[s].owner){
                            ships[s].reroute(planets[Math.floor(Math.random()*planets.length)])
                        }
                        }
                        }
                    }
                }
            }

            }


            for(let f = 0; f<this.owned.length; f++){
               this.wealth+= (this.owned[f].minerals/10)
            }
        }
        populate(){

            for(let f = 0; f<this.owned.length; f++){
                // console.log(this.owned[f].population)
                if(this.owned[f].population < 1000000){                  // (Math.pow(this.owned[f].fertility, this.owned[f].size))){
                this.owned[f].population *=  1+((this.owned[f].fertility - this.owned[f].polution)/10000)
                }else{
                this.owned[f].population *=  .995
                }
                this.owned[f].population = Math.floor(this.owned[f].population)
             }
        }
    }
    // let x = 0
    // let y = 0

     let circ = new Circle(125, 200, 10, getRandomLightColor(), Math.random()-.5, Math.random()-.5)  // starts with ramndom velocities and color
     let rect = new Rectangle ( 200, 200, 50, 80, getRandomLightColor())
    // rect.ymom = 1

    // example objects

    // zu = 50
    // yu = 50
    // // for(let g = 0; g<900; g++){
    //     let land = new Land(zu,yu)
    //     if(Math.random() < 0.05){
    //         land.rarematerial = true
    //     }
    //     if(Math.random() < 0.15){
    //         land.water = true
    //     }
    //     zu+= 20
    //     if(zu>=650){
    //         zu = 50
    //         yu+=20
    //     }
    // }
    class Pointer{
           constructor(x,y, color, length=40){
               this.x = x
               this.y = y
               this.color = color
               this.length = length
               this.radius = length*2
           }
           draw(){
    
               tutorial_canvas_context.beginPath(); 
       
               tutorial_canvas_context.moveTo(this.x, this.y+this.length/2); 
               
               tutorial_canvas_context.lineTo(this.x+this.length, this.y+this.length/2); 
               
               tutorial_canvas_context.lineTo(this.x,this.y+this.length*1.41); 
               
               tutorial_canvas_context.lineTo(this.x-this.length, this.y+this.length/2); 
    
               tutorial_canvas_context.lineTo(this.x,this.y+this.length/2); 
    
               tutorial_canvas_context.stroke();  
               tutorial_canvas_context.fillStyle = this.color
               tutorial_canvas_context.fill()
    
    
           }
    
    }

    let playvaptrons = new Rectangle(925, 500, 75, 75, "pink")
    let playkursa = new Rectangle(700, 500, 75, 75, "orange")
    let playbuggos = new Rectangle(775, 500, 75, 75, "green")
    let playhumans = new Rectangle(850, 500, 75, 75, "blue")
    let repairbutton = new Rectangle(850, 575, 75, 75, "yellow")
    let colonizebutton = new Rectangle(925, 500, 75, 75, "red")
    let movebutton = new Rectangle(925, 575, 75, 75, "cyan")
    let bigshipbutton = new Rectangle(1000, 500, 75, 75, "purple")
    let tringle = new Pointer(100, 120, "white", 10)
    let ptringle = new Pointer(100, 120, "yellow", 10)
    let dispbox = new Rectangle(700, 0, 700, 500, "gray")
    let blo = new Planet(150, 200)
    blo.fertility = 11
    blo.population = 500000
    blo.body.radius = 14
    blo.size = 14
    blo.minerals = 11
    let blox = new Planet(200, 220)
    blox.fertility = 6
    blox.body.radius = 8
    blox.size = 8
    blox.minerals = 6
    let hlo = new Planet(550, 500)
    hlo.fertility = 11
    hlo.population = 500000
    hlo.body.radius = 14
    hlo.size = 14
    hlo.minerals = 6
    let hlox = new Planet(600, 520)
    hlox.fertility = 6
    hlox.body.radius = 8
    hlox.size = 8
    hlox.minerals = 11


    let klo = new Planet(150, 600)
    klo.fertility = 11
    klo.population = 500000
    klo.body.radius = 14
    klo.size = 14
    klo.minerals = 11
    let klox = new Planet(200, 550)
    klox.fertility = 6
    klox.body.radius = 8
    klox.size = 8
    klox.minerals = 6


    let vlo = new Planet(600, 150)
    vlo.fertility = 11
    vlo.population = 500000
    vlo.body.radius = 14
    vlo.size = 14
    vlo.minerals = 11
    let vlox = new Planet(550, 200)
    vlox.fertility = 6
    vlox.body.radius = 8
    vlox.size = 8
    vlox.minerals = 6


    let vaptrons = new Race("Vaptrons", "pink")
    let kursa = new Race("Kursa", "orange")
    let buggos = new Race("Buggos")
    let humanzees = new Race("Humans", "blue")
    for(let g = 0; g< 60; g++){

        let blog = new Planet(25+Math.random()*655, 25+Math.random()*655)
        

        

    }
    selected = blo
    selectedplanet = blo

    humanzees.colonize(hlo)
    humanzees.colonize(hlox)
    buggos.colonize(blo)
    buggos.colonize(blox)
    kursa.colonize(klo)
    kursa.colonize(klox)
    vaptrons.colonize(vlo)
    vaptrons.colonize(vlox)
    for(let h = 0 ; h<500; h++){

        let rect = new Rectangle ( Math.random()*tutorial_canvas.width, Math.random()*tutorial_canvas.height, Math.random()*2.5, Math.random()*2.5, getRandomLightColor())
        rect.twinkle = Math.floor(Math.random()*300)
        stars.push(rect)
 
    } 

    for(let p = 0; p<planets.length; p++){
        planetrouter(planets[p])
        // console.log(planets[p])
    }
    let income = 0
    let ships = []

    let shippob = new Ship(buggos.owned[0])
    let shippok = new Ship(kursa.owned[0])
    let shippov = new Ship(vaptrons.owned[0])
    let shippoh = new Ship(humanzees.owned[0])

    let shippobC = new Ship(buggos.owned[1])
    shippobC.colonize = 1
    let shippokC = new Ship(kursa.owned[1])
    shippokC.colonize = 1
    let shippovC = new Ship(vaptrons.owned[1])
    shippovC.colonize = 1
    let shippohC = new Ship(humanzees.owned[1])
    shippohC.colonize = 1

    ships.push(shippob)
    ships.push(shippok)
    ships.push(shippov)
    ships.push(shippoh)

    ships.push(shippobC)
    ships.push(shippokC)
    ships.push(shippovC)
    ships.push(shippohC)


// interval, fill this with game logic 
    window.setInterval(function(){ 
        tutorial_canvas_context.clearRect(0, 0, tutorial_canvas.width, tutorial_canvas.height)  // refreshes the image




        buggos.draw()
        humanzees.draw()
        vaptrons.draw()
        kursa.draw()

        income++
        if(income%20 == 0){

            shipcombat()


            xselected = planets[Math.floor(Math.random()*planets.length)]
            yselected = planets[Math.floor(Math.random()*planets.length)]
            zselected = planets[Math.floor(Math.random()*planets.length)]


        // if(selectedrace == humanzees){
        //     if(!buggos.owned.includes(xselected) && !humanzees.owned.includes(xselected) && !kursa.owned.includes(xselected)&& !vaptrons.owned.includes(xselected)){
        //         buggos.colonize(xselected)
        //         }
        //         if(!buggos.owned.includes(yselected) && !humanzees.owned.includes(yselected)&& !kursa.owned.includes(yselected)&& !vaptrons.owned.includes(yselected)){
        //             kursa.colonize(yselected)
        //             }
        //             if(!buggos.owned.includes(zselected) && !humanzees.owned.includes(zselected)&& !kursa.owned.includes(zselected) && !vaptrons.owned.includes(zselected)){
        //                 vaptrons.colonize(zselected)
        //                 }
        // }else if(selectedrace == buggos){
        //     if(!buggos.owned.includes(xselected) && !humanzees.owned.includes(xselected)&& !kursa.owned.includes(xselected)&& !vaptrons.owned.includes(xselected)){
        //         humanzees.colonize(xselected)
        //         }
        //         if(!buggos.owned.includes(yselected) && !humanzees.owned.includes(yselected)&& !kursa.owned.includes(yselected)&& !vaptrons.owned.includes(yselected)){
        //             kursa.colonize(yselected)
        //             }
        //             if(!buggos.owned.includes(zselected) && !humanzees.owned.includes(zselected)&& !kursa.owned.includes(zselected) && !vaptrons.owned.includes(zselected)){
        //                 vaptrons.colonize(zselected)
        //                 }
        // }else if(selectedrace == kursa){
        //     if(!buggos.owned.includes(xselected) && !humanzees.owned.includes(xselected)&& !kursa.owned.includes(xselected)&& !vaptrons.owned.includes(xselected)){
        //         humanzees.colonize(xselected)
        //         }
        //         if(!buggos.owned.includes(yselected) && !humanzees.owned.includes(yselected)&& !kursa.owned.includes(yselected)&& !vaptrons.owned.includes(yselected)){
        //             buggos.colonize(yselected)
        //             }
        //             if(!buggos.owned.includes(zselected) && !humanzees.owned.includes(zselected)&& !kursa.owned.includes(zselected) && !vaptrons.owned.includes(zselected)){
        //                 vaptrons.colonize(zselected)
        //                 }
        // }else if(selectedrace == vaptrons){
        //     if(!buggos.owned.includes(xselected) && !humanzees.owned.includes(xselected)&& !kursa.owned.includes(xselected)&& !vaptrons.owned.includes(xselected)){
        //         humanzees.colonize(xselected)
        //         }
        //         if(!buggos.owned.includes(yselected) && !humanzees.owned.includes(yselected)&& !kursa.owned.includes(yselected)&& !vaptrons.owned.includes(yselected)){
        //             buggos.colonize(yselected)
        //             }
        //             if(!buggos.owned.includes(zselected) && !humanzees.owned.includes(zselected)&& !kursa.owned.includes(zselected) && !vaptrons.owned.includes(zselected)){
        //                 kursa.colonize(zselected)
        //                 }
        // }

        for(let s = 0; s<ships.length; s++){
            ships[s].move()
        }

        buggos.resource()
        humanzees.resource()
        kursa.resource()
        vaptrons.resource()
            buggos.populate()
            humanzees.populate()
            kursa.populate()
            vaptrons.populate()
        }


        for(let k = 0; k<stars.length; k++){
            stars[k].twinkle += 1
            if(stars[k].twinkle%300 < 100){
                stars[k].width += 0.02
            } else if(stars[k].twinkle%300 < 200){
                stars[k].height += 0.02
            }else{ 
                stars[k].width -= 0.02
                stars[k].height -= 0.02
            }
            stars[k].draw()
        }





        dispbox.draw()


        if(raceselected == 1){

            if(typeof selected.population != "undefined"){
                if(selected.owner == selectedrace){
                    bigshipbutton.draw()
                }
            }
            colonizebutton.draw()
        }else{
            playbuggos.draw()
            playhumans.draw()
            playkursa.draw()
            playvaptrons.draw()
        }

        tringle.x = selected.body.x 
        tringle.y = selected.body.y - (selected.body.radius+20)

        ptringle.x = selectedplanet.body.x 
        ptringle.y = selectedplanet.body.y - (selectedplanet.body.radius+20)



        for(let p = 0; p<planets.length; p++){
            planets[p].draw()
        }

        ptringle.draw()
        tringle.draw()


        for(let s = 0; s<ships.length; s++){
            ships[s].draw()
        }


        for(let p = 0 ;p<planets.length;p++){
            if(planets[p].population <= 0){


                planets[p].owner = {}
            planets[p].owner.name = "none"
            planets[p].owner.wealth = 0


            if(kursa.owned.includes(planets[p])){
                kursa.owned.splice(kursa.owned.indexOf(planets[p]),1)
            }
            if(buggos.owned.includes(planets[p])){
                buggos.owned.splice(buggos.owned.indexOf(planets[p]),1)
            }
            if(humanzees.owned.includes(planets[p])){
                humanzees.owned.splice(humanzees.owned.indexOf(planets[p]),1)
            }
            if(vaptrons.owned.includes(planets[p])){
                vaptrons.owned.splice(vaptrons.owned.indexOf(planets[p]),1)
            }
            }
        }

        players()

    }, 10) // length of refresh interval




    // run on any object with x/y attributes in the timer to give them wasd controls
    function players(){
        if (keysPressed[' ']) {
            if(shipselected.owner == selectedrace){
                shipselected.reroute((selectedplanet))
                }
        }
        if (keysPressed['c']) {
            if(shipselected.owner == selectedrace){
                if(shipselected.docked.owner == selectedrace){
                    if(selectedrace.wealth >= Math.floor((shipselected.maxhull-shipselected.hull)/3)){
                        selectedrace.wealth -= Math.floor((shipselected.maxhull-shipselected.hull)/3)
                        shipselected.hull = shipselected.maxhull
                    }
                }
        }
        }
    }





// can check if one circle contains the cneter of the other circle, and / or it can check if any constructed object with an x and y attribute is inside of a circle. With tinkering, this can check boundaries of two circles.
function intersects(circle, left) {
    var areaX = left.x - circle.x;
    var areaY = left.y - circle.y;
    return areaX * areaX + areaY * areaY <= circle.radius * circle.radius;
}
function intersectsplanet(circle, left) {
    var areaX = left.x - circle.x;
    var areaY = left.y - circle.y;
    return areaX * areaX + areaY * areaY <= circle.radius*14 * circle.radius;
}

// random color that will be visible on  blac backgroung
function getRandomLightColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[(Math.floor(Math.random() * 15)+1)];
    }
    return color;
  }


// checks if a square contains the centerpoint of a circle
function squarecircle(square, circle){

    let squareendh = square.y + square.height
    let squareendw = square.x + square.width

    if(square.x <= circle.x){
        if(square.y <= circle.y){
            if(squareendw >= circle.x){
                if(squareendh >= circle.y){
                    return true
                }
            }
        }
    }
    return false
}

// checks if two squares are intersecting ( not touching, for touching cnange the evaluations from ">" to ">=" etc)
function squaresquare(a, b){

    a.left = a.x
    b.left = b.x
    a.right = a.x + a.width
    b.right = b.x + b.width
    a.top = a.y 
    b.top = b.y
    a.bottom = a.y + a.height
    b.bottom = b.y + b.height



    if (a.left > b.right || a.top > b.bottom || 
        a.right < b.left || a.bottom < b.top)
    {
       return false
    }
    else
    {
        return true
    }
}
function getRandomLightColor() {
    var letters = '0123456789ABCDEF';
    var color = '#';
    for (var i = 0; i < 6; i++) {
      color += letters[(Math.floor(Math.random() * 15)+1)];
    }
    return color;
  }


function randomplanetnames(planet){

    var letters = 'bcdfghjklmnpqrstvwxyz';
    var volesl = 'aeiouyaeiou'
    
    planet.name = ''
    let jee = Math.floor(Math.random()*5)+1
    for (var i = 0; i < jee; i++) {
        planet.name += letters[(Math.floor(Math.random() * 21))];
        planet.name += volesl[(Math.floor(Math.random() * 11))];
    }


    let letter = planet.name.charAt(0).toUpperCase() 
    let floot = planet.name.split("")
    planet.name = ''
    for(let l = 1; l<floot.length; l++){
        planet.name += floot[l]
    }

    if(!names.includes(planet.name)){
        planet.name = letter+(planet.name)
        names.push(planet.name)
    }else{
        randomplanetnames(planet)
    }
}


function planetrouter(planet){

    for(let p = 0; p<planets.length;p++){
        let xdis = planet.body.x - planets[p].body.x
        let ydis = planet.body.y - planets[p].body.y

        let xdiss = xdis*xdis
        let ydiss = ydis*ydis

        let eggart = Math.sqrt((xdiss+ydiss))

        planet.routes[planets[p].name] = (Math.ceil(eggart/40))
    }

}

function shipcombat(){
    for(let k=0;k<ships.length;k++){
    for(let g = 0; g<ships.length;g++){
        if(g!== k){
            if(intersects(ships[g].body, ships[k].body)){
                if(ships[g].owner.name !== ships[k].owner.name){
                    if( (ships[g].weapons - ships[k].armor) > 0){
                    ships[k].hull -= (ships[g].weapons - ships[k].armor)
                    }
                    if( (ships[k].weapons - ships[g].armor) > 0){
                    ships[g].hull -= (ships[k].weapons - ships[g].armor)
                    }
                }
            }
        }
    }
    }


    for(let k=0;k<ships.length;k++){
if(ships[k].hull <= 0){
    ships.splice(k,1)
}
    }


}


})