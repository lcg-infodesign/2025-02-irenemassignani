let table;

function preload() {
  table = loadTable("assets/dataset.csv", "csv", "header");
}

function setup() {
  createCanvas(windowWidth, windowHeight);
  background("white");

  let outerPadding = 50;
  let padding = 70;
  let itemSize = 10;
  let itemSize3 = 20; 

  let cols = floor((windowWidth - outerPadding * 2)/(itemSize + padding));
  let rows = ceil(table.getRowCount()/ cols);

  let colCount = 0;
  let rowCount = 0;

  for(let rowNumber = 0; rowNumber < table.getRowCount(); rowNumber++){
    let data = table.getRow(rowNumber).obj;

    let value2 = float(data["column2"]);
    let allvalues2 = table.getColumn("column2");
    let minValue2 = min(allvalues2);
    let maxValue2 = max(allvalues2);
    let value2mapped = map(value2, minValue2, maxValue2, 0,1);
    let mappedColor = lerpColor(color("red"), color("bl"), value2mapped);

    let xPos = outerPadding + colCount * (itemSize + padding);
    let yPos = outerPadding + rowCount * (itemSize + padding);

    let value3 = float(data["column3"]);
    let allvalues3 = table.getColumn("column3");
    let minValue3 = min(allvalues3);
    let maxValue3 = max(allvalues3);
    let scaleValue3 = map(value3,minValue3,maxValue3,5,itemSize3);

    let h = scaleValue3;
    let halfBase = scaleValue3 / 2;

    let value4 = float(data['column0']);
    let value5 = float(data["column4"]);

    //se nella colonna 4 il valore è <0 il viso viene ruotato
    drawFaceWithRotation(xPos, yPos, h, halfBase, value4, mappedColor, value5);

    colCount++;
    if(colCount==cols){
      colCount = 0;
      rowCount++;
    }
  }
}

function drawFaceWithRotation(x, y, h, halfBase, value4, faceColor, value5){
  push();
  translate(x, y);

  // rotazione solo se column4 è negativa
  if(value5 < 0){
    rotate(value5);
  }

  // volto
  fill(faceColor);
  circle(0, 0, 80, 80);

  // triangolo

  triangle(0, -h/2, -halfBase, h/2, halfBase, h/2);

  // occhi
  fill(0);
  ellipse(-10, -10, 5, 5);
  ellipse(10, -10, 5, 5);

  // bocca / arco
  noFill();
  stroke(0);
  if(value4 < 0){
    arc(0, 25, 30, 20, PI, 0, OPEN);
  }else{
    arc(0, 20, 30, 20, 0, PI, OPEN);
  }

  pop();
}

function draw() {

}





