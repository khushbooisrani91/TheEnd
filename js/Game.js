/*class Game {
  constructor(){

  }

  getState(){
    var gameStateRef  = database.ref('gameState');
    gameStateRef.on("value",function(data){
       gameState = data.val();
    })

  }

  update(state){
    database.ref('/').update({
      gameState: state
    });
  }

  async start(){
    if(gameState === 0){
      player = new Player();
      var playerCountRef = await database.ref('playerCount').once("value");
      if(playerCountRef.exists()){
        playerCount = playerCountRef.val();
        player.getCount();
      }
      form = new Form()
      form.display();
    }

    car1 = createSprite(100,200);
    car1.addImage("c1",cImg1);
    car2 = createSprite(300,200);
    car2.addImage("c2",cImg2);
    car3 = createSprite(500,200);
    car3.addImage("c3",cImg3);
    car4 = createSprite(700,200);
    car4.addImage("c4",cImg4);
    cars = [car1, car2, car3, car4];
  }

  play(){
    form.hide();

    Player.getPlayerInfo();
    
    if(allPlayers !== undefined){
      
      background(groundImg);
      image(bImg,0,displayHeight,displayWidth,displayHeight*4);
      image(bImg,0,-displayHeight*4,displayWidth,displayHeight*4);
      image(bImg,0,-displayHeight*8,displayWidth,displayHeight*4);
      //index of the array
      var index = 0;

      //x and y position of the cars
      var x = 100;
      var y;

      var display_position = camera.position.y-150;

      for(var plr in allPlayers){
        //add 1 to the index for every loop
        index = index + 1 ;

        //position the cars a little away from each other in x direction
        x = x + 200;
        //use data form the database to display the cars in y direction
        y = displayHeight - allPlayers[plr].distance;
        cars[index-1].x = x;
        cars[index-1].y = y;

        if (index === player.index){
          cars[index - 1].shapeColor = "red";
          camera.position.x = displayWidth/2;
          camera.position.y = cars[index-1].y
        }
       
         display_position = display_position-50;
        textSize(15);
        fill("black");
        text(allPlayers[plr].name + ": " + allPlayers[plr].distance, 120,display_position)
      }

    }

    if(keyIsDown(UP_ARROW) && player.index !== null){
      player.distance +=10
      player.update();
    }
    if(player.distance>2000){
      gameState = 2;
    }
    drawSprites();
  }

 end(){
   console.log("YOU WON THE GAME");
   
 }


}*/