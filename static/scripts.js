const canvas = document.getElementById('chart')
const ctx = canvas.getContext('2d')

function drawLine (start, end, style) {
  ctx.beginPath()
  ctx.strokeStyle = style || 'black'
  ctx.moveTo(...start)
  ctx.lineTo(...end)
  ctx.stroke()
}

function drawTriangle (apex1, apex2, apex3) {
  ctx.beginPath()
  ctx.moveTo(...apex1)
  ctx.lineTo(...apex2)
  ctx.lineTo(...apex3)
  ctx.fill()
}

function responseHandler(response){
  if(response.ok == false){
    throw new Error('Error loading stocks / stock data')
  }
  return response.json()
}

async function getStockInfo(stock){
  try{
    const stockInfo = await fetch('http://localhost:3000/stocks/' + stock)
    const stockData = await responseHandler(stockInfo)
    await console.log("Here are the values for " + stock + " stock " + stockData)
  }
  catch(error){
    console.error(error.message)
  }
}

async function getStocks() {
  try{
    const response = await fetch('http://localhost:3000/stocks')
    const responseData = await responseHandler(response);

    const symbols = responseData.stockSymbols;
    console.log("List of available stocks: " + symbols)
    
    for(let i = 0; i<symbols.length; i++){
      await getStockInfo(symbols[i])
    }
  }
  catch(error){
    console.error(error.message);
  }
}
getStocks()
drawLine([50, 50], [50, 550])
drawTriangle([35, 50], [65, 50], [50, 35])

drawLine([50, 550], [950, 550])
drawTriangle([950, 535], [950, 565], [965, 550])
