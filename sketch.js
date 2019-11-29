//Themis Garcia
var serial; // variable to hold an instance of the serialport library
var fromSerial = 0; //variable to hold the data

//TOMATO STORY
//Blue for First Story
let H1 = 192;
let S1 = 63;
let B1 = 78;
//Video Name
let TomatoLoop;
let TomatoEnd;
//Sentence
let correctSentence1 = ["The", "tomato", "likes", "to", "bounce."];
//Intro Text
let IntroText1 = "Make sentences with the blocks.";
let IntroText1_2 = "Ready to play!";
//Hint
let textHint1 = "Use the green blocks.";
let lastTextGreat = "Great!";
let lengthOfBlocks1 = 1;

//CARROT STORY
//Turquoise for Second Story
let H2 = 174;
let S2 = 57;
let B2 = 76;
//Video Name
let CarrotLoop;
let CarrotEnd;
//Sentence
let correctSentence2 = ["The", "carrot", "reads", "a", "lot."];
//Intro Text
let IntroText2 = "You are doing Awesome.";
let IntroText2_2 = "Next!";
//Hint
let textHint2 = "Use the orange blocks.";
let lengthOfBlocks2 = 6;

//MONSTER STORY
//Orange for Third Story
let H3 = 33;
let S3 = 50;
let B3 = 97;
//Video Name
let MonsterLoop;
let MonsterEnd;
//Sentence
let correctSentence3 = ["The", "monster", "eats", "them", "all."];
//Intro Text
let IntroText3 = "You are doing Awesome.";
let IntroText3_2 = "Next!";
//Hint
let textHint3 = "Use the blue blocks.";
let lastText = "That's it.\n You did it!";
let lengthOfBlocks3 = 11;

//FOR CLASS
let _story = [];
let currentStory = 0;
let storyDone = false;


function preload() {
  TomatoLoop = createVideo('vidLoop1.mov');
  TomatoEnd = createVideo('vidFinish1.mov');

  CarrotLoop = createVideo('vidLoop1.mov');
  CarrotEnd = createVideo('vidFinish1.mov');

  MonsterLoop = createVideo('vidLoop1.mov');
  MonsterEnd = createVideo('vidFinish1.mov');
}

function setup() {
  createCanvas(700, 700);
  serial = new p5.SerialPort(); // make a new instance of  serialport librar	
  serial.on('list', printList); // callback function for serialport list event
  serial.on('data', serialEvent); // callback for new data coming in	
  serial.list(); // list the serial ports
  serial.open("/dev/tty.usbmodem141101"); // open a port

  //rectMode(CENTER);
  colorMode(HSB, 360, 100, 100);
  textAlign(CENTER, CENTER);
  fill(0, 100, 0);
  textSize(30);
  textFont('Roboto');

  //
  let colorOfStoryOrder_Past = color(185, 44, 30);
  let colorOfStoryOrder_Now = color(42, 90, 95);
  let colorOfStoryOrder_Next = color(174, 27, 84);
  //
  let colorOfShadow1 = color(185, 44, 59); //Dark Blue
  let colorOfShadow2 = color(176, 53, 60); //Dark Turquoise
  let colorOfShadow3 = color(34, 85, 88); //Dark Orange

  //Create new classes

  //Tomato
  let stories1 = new story(H1, S1, B1, IntroText1, IntroText1_2, TomatoLoop, TomatoEnd, correctSentence1, textHint1, colorOfStoryOrder_Now, colorOfStoryOrder_Next, colorOfStoryOrder_Next, colorOfShadow1, lastTextGreat, lengthOfBlocks1);

  _story.push(stories1);

  //Carrot 
  let stories2 = new story(H2, S2, B2, IntroText2, IntroText2_2, CarrotLoop, CarrotEnd, correctSentence2, textHint2, colorOfStoryOrder_Past, colorOfStoryOrder_Now, colorOfStoryOrder_Next, colorOfShadow2, lastTextGreat, lengthOfBlocks2);

  _story.push(stories2);

  //Monster
  let stories3 = new story(H3, S3, B3, IntroText3, IntroText3_2, MonsterLoop, MonsterEnd, correctSentence3, textHint3, colorOfStoryOrder_Past, colorOfStoryOrder_Past, colorOfStoryOrder_Now, colorOfShadow3, lastText, lengthOfBlocks3);

  _story.push(stories3);


  for (let i = 0; i < _story.length; i++) {
    _story[i].videoForLoop.hide();
    _story[i].videoForEnd.hide();
  }
}



function draw() {

  secs = int(millis() / 1000);

  if (currentStory < _story.length) {

    _story[currentStory].videoForLoop.size(width / 1.5, height / 2.2);
    _story[currentStory].videoForEnd.size(width / 1.5, height / 2.2);

    _story[currentStory].showStory();
    _story[currentStory].showWords(fromSerial);
    _story[currentStory].sentenceCorrect();

    storyDone = _story[currentStory].returnResults();

    if (storyDone) {
      currentStory++;
      storyDone = false;
    }
  }
}

// get the list of ports:
function printList(portList) {
  for (var i = 0; i < portList.length; i++) {
    // Display the list the console:
    print(i + " " + portList[i]);
  }
}

function serialEvent() {
  // this is called when data is recieved, data will then live in fromSerial	
  var stringFromSerial = serial.readLine();
  if (stringFromSerial.length > 0) {
    var trimmedString = trim(stringFromSerial);
    fromSerial = Number(trimmedString);
  }
}