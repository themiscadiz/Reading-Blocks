/* 

*/

class story {

  constructor(H, S, B, introText1, introText2, videoForLoop, videoForEnd, correctSentence, textHint1, colorOrder1, colorOrder2, colorOrder3, colorOfShadow, lastText, lengthOfBlocks) {

    this.H = H;
    this.S = S;
    this.B = B;

    // this.StoryOrder = StoryOrder;

    this.videoForLoop = videoForLoop;
    this.videoForEnd = videoForEnd;

    //use in page_1
    this.secs = int(millis() / 1000);
    this.thisIsTrue = true;
    this.counter = 0;

    this.videoIsRunning = false;

    //showing text 1
    this.introText1 = introText1;

    //showing text 2
    this.introText2 = introText2;

    this.switchvalue = true;
    //Show first video
    this.video_loop_Isrunning = false;

    this.video_Finish_Isrunning = true;

    //Scan Words
    this.scanForWords = false;

    //Correct sentenceArray
    this.correctSentence = correctSentence;


    //Array of false per word in the sentence
    this.showWord = [];

    for (let i = 0; i < correctSentence.length; i++) {
      this.showWord.push(false);
    }

    this.sentence = [];
    this.sentenceOnScreen = "";

    //position of sentence
    this.sentences_pos_x = width / 7;
    this.sentences_pos_y = height / 1.2;

    //Run when finish video
    this.justNow = true;
    this.counter2 = 0;
    this.playFinish = true;

    this.lastText = lastText;

    //Buttons

    //Button Hint
    this.isPressed1 = false;
    this.X1 = 50;
    this.Y1 = 30;
    this.sizeX1 = 100;
    this.sizeY1 = 75;
    this.posXmin1 = this.X1;
    this.posXmax1 = this.X1 + 100;
    this.posYmin1 = this.Y1;
    this.posYmax1 = this.Y1 + 75;
    this.textHint1 = textHint1;
    this.buttontext1 = "Hint";

    this.counterButton1 = 0;
    this.thisIsTrue1 = true;
    this.frameTimer1 = 0;

    //Button Rules
    this.isPressed2 = false;
    this.X2 = height / 1.3;
    this.Y2 = this.Y1;
    this.sizeX2 = this.sizeX1;
    this.sizeY2 = this.sizeY1;
    this.posXmin2 = this.X2;
    this.posXmax2 = this.X2 + 100;
    this.posYmin2 = this.Y1;
    this.posYmax2 = this.posYmax1;
    this.textHint2 = "boton2";
    this.buttontext2 = "?";

    this.counterButton2 = 0;
    this.thisIsTrue2 = true;
    this.frameTimer2 = 0;

    //Colors

    this.colorOfShadow = colorOfShadow;

    this.colorOfButton = 174;
    this.colorOfButton2 = 174;

    //color of buttons when is pressed
    this.colorOfButtonPressed = color(44, 58, 95);

    //color of shadow of buttons
    this.colorOfButtonShadow = this.colorOfShadow //color(185,44,59);

    //colorOftext
    this.colorOfText = color(0, 0, 93);

    //color of Window
    this.colorOfWindow = color(42, 90, 95);

    //Window
    this.windowX = 90;
    this.windowY = 145;
    this.sizeX = 510;
    this.sizeY = 350;

    //color of timer
    this.colorOftimer = color(33, 77, 94);

    //Color of Storyorder
    this.colorOrder1 = colorOrder1;
    this.colorOrder2 = colorOrder2;
    this.colorOrder3 = colorOrder3;

    //For sequence of strory
    this.storyDone = false;
    //for know the first of the next set of block
    this.lengthOfBlocks = lengthOfBlocks;

    //this.snapshot = 0;
  }


  //INTRO PAGE
  page_1() {
    //Yellow Background
    // this.H = 42;
    // this.S = 50;
    // this.B = 95;

    background(42, 50, 95);

    this.showIntroText1();

    if (this.secs > 2) {
      this.showIntroText2();

      if (this.thisIsTrue) {
        this.counter = this.secs;
        this.thisIsTrue = false;
      }
    }

    if (this.secs > this.counter + 1 && this.thisIsTrue == false) {

      //Start Story
      this.videoIsRunning = true;
    }
  }

  showIntroText1() {
    textSize(width / 10);
    //this.introText1 = "Make sentences with the blocks.";
    fill(42, 90, 95);
    text(this.introText1, width / 10, height / 15, width / 1.2, height / 2);
    // text(this.introText1, width / 2, height / 2);
  }

  showIntroText2() {
    textSize(width / 12);
    // this.introText2 = "Ready to play!";
    noStroke();
    fill(33, 85, 90);
    rect(width / 5 + 10, height / 1.9 + 10, width / 1.7, height / 5, 20);

    fill(33, 77, 94);
    rect(width / 5, height / 1.9, width / 1.7, height / 5, 20);

    fill(this.colorOfText);
    text(this.introText2, width / 2, height / 2 + 100);
  }

  //SHOW STORY
  showStory() {
    this.secs = int(millis() / 1000);


    background(this.H, this.S, this.B);

    //Run introduction just once
    if (this.switchvalue) {
      this.page_1();
    }

    //If first video start: 
    if (this.videoIsRunning) {

      //Change Background color to blue
      // this.H = H;
      // this.S = S;
      // this.B = B;

      this.switchvalue = !this.switchvalue;

      this.video_loop_Isrunning = true;
      this.videoForLoop.loop();

      //Don't run this conditional again
      this.videoIsRunning = false;

      //Start scaning for words
      this.scanForWords = true;
    }

    if (this.video_loop_Isrunning) {

      //Shadow from Video
      fill(this.colorOfShadow);
      rect(width / 6 + 5, height / 4 + 5, width / 1.5 + 5, height / 2.2 + 5, 20);

      image(this.videoForLoop, width / 6, height / 4);

      stroke(this.colorOfShadow);
      strokeWeight(4);
      line(width / 6, height / 1.1, width / 1.2, height / 1.1);
      noStroke();

      //StoryOrder
      this.sizeOfStoryOrder = 30;
      this.spaceBetween = 80;

      textSize(20);
      strokeWeight(2);
      stroke(this.colorOfText);
      line(width / 2 - this.spaceBetween, 30, width / 2 + this.spaceBetween, 30);
      noStroke();

      fill(this.colorOfButtonShadow);
      ellipse(width / 2 - this.spaceBetween + 5, 30, this.sizeOfStoryOrder);
      //circle1
      fill(this.colorOrder1);
      ellipse(width / 2 - this.spaceBetween, 30, this.sizeOfStoryOrder);

      fill(this.colorOfText);
      text("1", width / 2 - this.spaceBetween, 30);

      fill(this.colorOfButtonShadow);
      ellipse(width / 2 + 5, 30, this.sizeOfStoryOrder);
      //circle2
      fill(this.colorOrder2);
      ellipse(width / 2, 30, this.sizeOfStoryOrder);

      fill(this.colorOfText)
      text("2", width / 2, 30);

      fill(this.colorOfButtonShadow);
      ellipse(width / 2 + this.spaceBetween + 5, 30, this.sizeOfStoryOrder);
      //circle3
      fill(this.colorOrder3);
      ellipse(width / 2 + this.spaceBetween, 30, this.sizeOfStoryOrder);

      fill(this.colorOfText);
      text("3", width / 2 + this.spaceBetween, 30);

    }

    if (this.video_Finish_Isrunning) {
      image(this.videoForEnd, width / 6, height / 4);
    }
  }

  showWords(fromSerial) {

    //Scan Words
    if (this.scanForWords) {

      //Buttons
      this.buttonHint();
      this.buttonRules();

      if (fromSerial) {

        for (let i = 0; i < this.correctSentence.length; i++) {
          if (fromSerial == i + this.lengthOfBlocks) {
            this.showWord[i] = !this.showWord[i];

            if (this.showWord[i] == true) {
              this.sentence.push(this.correctSentence[i]);
            } else if (this.showWord[i] == false) {
              this.sentence.pop(this.correctSentence[i]);
            }
          }
        }
      }
    }

    //Show words
    textAlign(LEFT);
    textSize(40);
    fill(this.colorOfText);

    if (this.sentence.length > 0) {

      this.sentenceOnScreen = this.sentence.toString();

      // to replace all commas (",") in a string with empty spaces (" ")
      // https://www.w3schools.com/jsref/jsref_replace.asp
      this.sentenceOnScreen = this.sentenceOnScreen.replace(/,/g, " ");

      text(this.sentenceOnScreen, this.sentences_pos_x, this.sentences_pos_y);
    }
    textAlign(CENTER);
  }

  //SENTENCE CORRECT
  sentenceCorrect() {

    //If sentence is correct
    if (this.sentence.length == this.correctSentence.length) {
      if (JSON.stringify(this.sentence) === JSON.stringify(this.correctSentence)) {

        this.video_loop_Isrunning = false;
        this.video_Finish_Isrunning = true;

        if (this.justNow) {
          this.counter2 = this.secs;
          this.justNow = false;
        }

        if (this.secs > this.counter2 + 4 && this.justNow == false) {
          this.video_Finish_Isrunning = false;
          //Yellow Background
          this.H = 42;
          this.S = 90;
          this.B = 95;
          background(this.H, this.S, this.B);


          if (currentStory == 2) {
            //Violet Background
            this.H = 233;
            this.S = 43;
            this.B = 68;

            background(this.H, this.S, this.B);

            fill(0, 0, 0);
            ellipse(width / 2 + 75, height / 4, 60, 80)
            ellipse(width / 2 - 75, height / 4, 60, 80)
            fill(0, 0, 93);
            ellipse(width / 2 + 80, height / 4 - 10, 20, 20)
            ellipse(width / 2 - 70, height / 4 - 10, 20, 20)
            noFill();
            stroke(0, 0, 0);
            strokeWeight(8);
            arc(width / 2, height / 1.5, 100, 100, 50, HALF_PI);
          }

          //Great text
          textSize(100);
          noStroke();
          fill(this.colorOfText);
          textLeading(height / 7);

          text(this.lastText, width / 2, height / 2);

        }

        if (this.playFinish) {
          this.videoForEnd.play();
          this.playFinish = false;
        }

        if (this.secs > this.counter2 + 5 && this.justNow == false) {
          this.storyDone = true;
        }
      }
    }

    // Change fromSerial  to 0
    fromSerial = 0;
  }

  //RETURN
  returnResults() {
    return this.storyDone;
  }

  //Buttons Functions

  buttonHint() {

    noStroke();
    //button show for 4 secs

    if (this.isPressed1) {
      //take a shot of time.
      if (this.thisIsTrue1) {
        this.counterButton1 = this.secs;
        this.thisIsTrue1 = false;
      }
      //Show window

      fill(this.colorOfWindow);
      rect(this.windowX, this.windowY, this.sizeX, this.sizeY, 20);
      textSize(width / 14);
      fill(this.colorOfText);
      text(this.textHint1, width / 2, height / 2 - 50);

      let timer = map(this.frameTimer1, 0, 200, 50, 10);

      noStroke();
      fill(this.colorOftimer);
      circle(width / 2, height / 1.5, timer);

      this.frameTimer1++;
    }

    if (this.secs > this.counterButton1 + 3 && this.thisIsTrue1 == false) {
      this.isPressed1 = false;
    }

    this.colorOfButton = 174;

    if (mouseIsPressed) {
      if (mouseX > this.posXmin1 && mouseX < this.posXmax1 && mouseY > this.posYmin1 && mouseY < this.posYmax1) {

        this.colorOfButton = 147;
        this.isPressed1 = true;
        this.frameTimer1 = 0;
        this.counterButton1 = 0;
        this.thisIsTrue1 = true;
      }
    }

    //Button draw
    fill(this.colorOfButtonShadow);
    rect(this.X1 + 5, this.Y1 + 5, this.sizeX1, this.sizeY1, 20);

    fill(this.colorOfButton, 27, 84);
    rect(this.X1, this.Y1, this.sizeX1, this.sizeY1, 20);

    //textColor
    fill(this.colorOfText);
    textSize(32);

    text(this.buttontext1, this.X1 + 50, this.Y1 + 40);
  }


  buttonRules() {

    noStroke();
    //button show for 4 secs

    if (this.isPressed2) {
      //take a shot of time.
      if (this.thisIsTrue2) {
        this.counterButton2 = this.secs;
        this.thisIsTrue2 = false;
      }
      //Show window
      fill(this.colorOfWindow);
      rect(this.windowX, this.windowY, this.sizeX, this.sizeY, 20);

      fill(this.colorOfText);
      text(this.textHint2, width / 2, height / 2);

      fill(200, 100, 100);

      let timer = map(this.frameTimer2, 0, 200, 50, 10);

      noStroke();
      fill(this.colorOftimer);
      circle(width / 2, height / 1.5, timer);

      this.frameTimer2++;
    }

    if (this.secs > this.counterButton2 + 3 && this.thisIsTrue2 == false) {
      this.isPressed2 = false;
    }

    this.colorOfButton2 = 174;


    if (mouseIsPressed) {
      if (mouseX > this.posXmin2 && mouseX < this.posXmax2 && mouseY > this.posYmin2 && mouseY < this.posYmax2) {

        this.colorOfButton2 = 147;
        this.isPressed2 = true;
        this.frameTimer2 = 0;
        this.counterButton2 = 0;
        this.thisIsTrue2 = true;
      }
    }

    //Button draw
    fill(this.colorOfButtonShadow);
    rect(this.X2 + 5, this.Y2 + 5, this.sizeX2, this.sizeY2, 20);

    fill(this.colorOfButton2, 27, 84);
    rect(this.X2, this.Y2, this.sizeX2, this.sizeY2, 20);

    //textColor
    fill(this.colorOfText);
    textSize(32);

    text(this.buttontext2, this.X2 + 50, this.Y2 + 40);
  }

} //Class Bracket