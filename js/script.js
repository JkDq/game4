let canvas=document.getElementById('holst')
let oblast=canvas.getContext('2d')

let x=canvas.width/2;
let y=canvas.height-50;

let dx=-2
let dy=-2

let ballRadius=15

let platformHeight=20
let platformWidth=220

let platformX=(canvas.width-platformWidth)/2

let right=false
let left=false

document.addEventListener("keydown",pressDown,false)
document.addEventListener("keyup",pressUp,false)

function pressDown(e)
{
	if(e.key=="Right"||e.key=="ArrowRight")
	{
		right=true
	}
	if(e.key=="Left"||e.key=="ArrowLeft")
	{
		left=true
	}
}
function pressUp(e)
{
	if(e.key=="Right"||e.key=="ArrowRight")
	{
		right=false
	}
	if(e.key=="Left"||e.key=="ArrowLeft")
	{
		left=false
	}
}

let blocksRow=5
let blocksColumn=7

let blockHeight=35
let blockWidth=150

let blockMargin=15

let blockLeft=30
let blockTop=30

let bricks=[]

for(let i=0;i<blocksColumn;i++)
{
	bricks[i]=[]
	for(let j=0;j<blocksRow;j++)
	{
		bricks[i][j]={x:0,y:0,status:1}
	}
}

function drowBlock()
{
	for(let i=0;i<blocksColumn;i++)
		for(let j=0;j<blocksRow;j++)
		{
			if(bricks[i][j].status==1)
			{
				let bX=i*(blockWidth+blockMargin)+blockLeft
				let bY=j*(blockHeight+blockMargin)+blockTop

				bricks[i][j].x=bX;
				bricks[i][j].y=bY;

				oblast.beginPath()
				oblast.rect(bX,bY,blockWidth,blockHeight)
				oblast.fillStyle="white"
				oblast.fill()
				oblast.closePath()
			}
		}
}

function drawFrame()
{
	oblast.clearRect(0,0,canvas.width,canvas.height)

	oblast.beginPath()
	oblast.arc(x,y,15,0,Math.PI*2,false)
	oblast.fillStyle="white"
	oblast.fill()
	oblast.closePath()

	oblast.beginPath()
	oblast.rect(platformX, canvas.height-platformHeight-20,platformWidth,platformHeight)
	oblast.fillStyle="white"
	oblast.fill()
	oblast.closePath()

	proverkaSten()
	drowBlock()
	destroy()
	drawScore()
	drawLives()

	if(right==true)
	{
		platformX+=7
		if(platformX+platformWidth>canvas.width)
		{
			platformX=canvas.width-platformWidth
		}
	}
	else if(left==true)
	{
		platformX-=7
		if(platformX<0)
		{
			platformX=0
		}
	}

	x+=dx
	y+=dy
}

function startGame()
{
	let start=document.getElementById('start')
	let holst=document.getElementById('holst')

	start.style.display='none'
	holst.style.display='block'

	interval=setInterval(drawFrame,10)
}

function win(score)
{
	let holst=document.getElementById('holst')
	let p=document.getElementById('score1')
	let win=document.getElementById('win')
	holst.style.display="none"
	win.style.display="block"
	p.innerText="Набрали очков:"+score
	clearInterval(interval)
}

function lose(score)
{
	let holst=document.getElementById('holst')
	let p=document.getElementById('score2')
	let lose=document.getElementById('lose')
	holst.style.display="none"
	lose.style.display="block"
	p.innerText="Набрали очков:"+score
	clearInterval(interval)
}

let interval

function proverkaSten(){
	if(x+dx>canvas.width-ballRadius||x+dx<ballRadius)
	{
		dx=-dx
	}
	if(y+dy<ballRadius)
	{
		dy=-dy
 
		
	}
	if(y+dy>canvas.height-ballRadius-30)
	{
		if (x>platformX && x<platformX+platformWidth)
		{
			dy=-dy
			test.play()
		}
		else
		{

//Звук проигрыша

		lives--
		dy=-dy

		let random=Math.random()*(3-1)-1
		if (random==2)
		{
			dx=-dx
		}

		if(!lives)
		{
		lose(score)
		clearInterval(interval)
		}
		
		}
	}
}

function destroy()
{
    for(let i = 0;i < blocksColumn; i++)
        for(let j = 0; j < blocksRow; j++)
            {
               let b = bricks[i][j]
               if(b.status == 1)
               {
                 if( x > b.x && x < b.x + blockWidth && y> b.y && y < b.y + blockHeight)
                 {
                    dy = -dy;
                    b.status = 0
                    score++
                    if (score===35)
                    {
                    	alert('Win')
                    	//Звук победы
                    	document.location.reload()
                    	clearInterval(interval)
                    }
                 }
               }  
            }
}

let score=0
function drawScore()
{
	oblast.font="16px Arial"
	oblast.fillStyle="red"
	oblast.fillText("Score:"+score,8,20)
}

let lives=3
function drawLives()
{
	oblast.font="16px Arial"
	oblast.fillStyle="red"
	oblast.fillText("Lives:"+lives,1100,20)
}

var test = new Audio('https://zvukogram.com/index.php?r=site/download&id=47089')