var canvas = document.getElementById('c1');
var ctx = canvas.getContext('2d');
var mas = [];
var timer;
canvas.onclick = function(event) {
    var x = event.offsetX;
    var y = event.offsetY;
    console.log(x);
    console.log(y);
    x = Math.floor(x/10); 
    y = Math.floor(y/10);
    mas[y][x] =1; 
    console.log(mas);
    drawField();
}

function goLife() {
    var n = 50, m=50;
    for(var i =0; i<m; i++) {
        mas[i] = [];
        for (var j=0; j<n; j++){
            mas[i][j] =0;
        }
    }
}

goLife();

// Функция заполнения клетки
function drawField() {
    ctx.clearRect(0,0,500,500) ;
    for(var i =0; i<50; i++) {
        for (var j=0; j<50; j++){
           if (mas[i][j]==1) {
               ctx.fillRect(j*10,i*10,10,10)
           }
        }
    }
}
function startLife() {
    var mas2 = [];
    for(var i =0; i<50; i++) {
        mas2[i] = [];
        for (var j=0; j<50; j++){
            var neighbours = 0;
            if (mas[fpm(i)-1][j]===1) neighbours++ ; //проверка соседа сверху
            if (mas[i][fpp(j)+1]===1) neighbours++;//проверка соседа справа
            if (mas[fpp(i)+1][j]===1) neighbours++; //проверка соседа снизу
            if (mas[i][fpm(j)-1]===1) neighbours++; //проверка соседа слева 
            if (mas[fpm(i)-1][fpp(j)+1]===1) neighbours++; // проверка соседа справа вверх
            if (mas[fpp(i)+1][fpp(j)+1]===1) neighbours++; // проверка соседа по диагонали справа вниз
            if (mas[fpp(i)+1][fpm(j)-1]===1) neighbours++; 
            if (mas[fpm(i)-1][fpm(j)-1]===1) neighbours++;
            if (neighbours ==2 || neighbours ==3)  mas2[i][j] =1 
            else  mas2[i][j] =0;
            

        }
    }
    mas = mas2;
    drawField();
    timer = setTimeout(startLife,100);
}

 //функция для проверки выхода за границу поля
function fpm(i) {
    if ( i==0) return 50; 
    else return i;
}
 function fpp(i) {
     if (i==49) return -1;
     else return i;
 }
 document.getElementById('start').onclick = startLife;