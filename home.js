const avg_gas = 430000;
const upper_gas = 800000;
const gas = 0.000000005;
const apr = 0.74;

async function getbnb() {
  // binancecoin
  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=binancecoin&vs_currencies=usd'
  );
  return response.binancecoin.usd;
}

async function getpot() {
  const response = await fetch(
    'https://api.coingecko.com/api/v3/simple/price?ids=moonpot%2Cbinancecoin&vs_currencies=usd'
  );
  const val = response.json();
  return val;
}

function calculate_period(rate, dollars, fee) {
  let p = [...Array(364).keys()];
  // console.log(p);
  const ret = p.map(x => {
    const val = dollars*Math.pow(1 + (rate/(x+1)),(x+1)) - fee*(x + 1);
    return val;
  });
  let i = ret.indexOf(Math.max(...ret));
  let res = 365/i;
  return res;
}

$(document).on('input', '#pots-val', function() {
  console.log('trigger');
  let el = $('#pots-val');
  const x = el.val();
  // console.log(x);
  getpot().then(
    y => {
      const rate = y.moonpot.usd;
      const gascost = gas*y.binancecoin.usd;
      const avgcost = gascost*avg_gas;
      // console.log(avgcost);
      const dollars = x*rate;
      const apr = $('#apr-val').val()/100;
      const compound_period = calculate_period(apr, dollars, avgcost);
      $('#dollar-val').attr('placeholder', dollars);
      $('.gas-cost').text('Average compound cost: $' + String(avgcost));
      $('.period').text('Want to compound every ' + String(compound_period) + ' days.');
    }
  );
});

$(document).on('input', '#apr-val', function() {
  console.log('trigger');
  let el = $('#pots-val');
  const x = el.val();
  // console.log(x);
  getpot().then(
    y => {
      const rate = y.moonpot.usd;
      const gascost = gas*y.binancecoin.usd;
      const avgcost = gascost*avg_gas;
      // console.log(avgcost);
      const dollars = x*rate;
      const apr = $('#apr-val').val()/100;
      const compound_period = calculate_period(apr, dollars, avgcost);
      $('#dollar-val').attr('placeholder', dollars);
      $('.gas-cost').text('Average compound cost: $' + String(avgcost));
      $('.period').text('Want to compound every ' + String(compound_period) + ' days.');
    }
  );
});

$(document).on('input', '#dollar-val', function() {
  console.log('trigger');
  let el = $('#dollar-val');
  const x = el.val();
  // console.log(x);
  getpot().then(
    y => {
      const rate = y.moonpot.usd;
      const gascost = gas*y.binancecoin.usd;
      const avgcost = gascost*avg_gas;
      // console.log(avgcost);
      const pots = x/rate;
      console.log(pots);
      const apr = $('#apr-val').val()/100;
      const compound_period = calculate_period(apr, x, avgcost);
      $('#pots-val').attr('placeholder', pots);
      $('.gas-cost').text('Average compound cost: $' + String(avgcost));
      $('.period').text('Want to compound every ' + String(compound_period) + ' days.');
    }
  );
});