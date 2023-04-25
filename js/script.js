const container2 = document.querySelector('.con-2');
const sell = document.querySelector('#sell');
const fadeupItems = document.querySelectorAll('.fadeup');
const tabel = document.querySelector('#tabel');




function tabel10() {
    tabel.innerHTML = '';
    axios.get(`https://api.coingecko.com/api/v3/coins/markets?vs_currency=usd&order=market_cap_desc&per_page=100&page=1&sparkline=false&locale=en`)
        .then((responses) => {
            let data = responses.data;
            
            data.forEach((val, idx) => {
                if (idx < 7) {
                    tabel.innerHTML += `
                    <li>
                        <div class="name">
                            <span><i class="bi bi-star"></i></span>
                            <span>${idx + 1}</span>
                            <figure>
                                <img src="${val.image}" alt="">
                            </figure>
                            <strong><b>${val.name}</b> <span>${val.symbol}</span></strong>
                        </div>
                        <div class="price">$ ${val.current_price}</div>
                        <div class="change">${change24h(val.price_change_percentage_24h)}%</div>
                        <div class="volume">$ ${usdTob(val.total_volume)} B</div>
                        <div class="market">$ ${usdTob(val.market_cap)} B</div>
                        <a href="#">trade</a>
                    </li>`;
                }
            });
        })
        .catch(errors => {
            console.log(errors)
        });
}

tabel10();
// js style
let deg = 51;
window.onscroll = function () {
    if (window.scrollY + window.innerHeight - 20 > container2.clientHeight) {
        let d = decDeg();
        sell.style.transform = ` translate(-50%,0) rotateX(${deg - d}deg)`;
    }


    fadeupItems.forEach(val => {
        fadeinup(val);
    });


}

function decDeg() {
    let h = (51 / container2.clientHeight);
    let x = window.scrollY + window.innerHeight - container2.offsetTop
    let c = x * h;
    if (c <= deg) {
        return Math.floor(c);
    }
}

function fadeinup(val) {
    if (window.scrollY + window.innerHeight - 100 > val.offsetTop) {
        val.classList.add('fade-up');
    } else if (window.scrollY + window.innerHeight < val.offsetTop) {
        val.classList.remove('fade-up');
    }else if(window.scrollY > val.offsetTop -100){
        console.log('it\'s bigger')
    }
}


function change24h(val) {
    if (val < 0) {
        return val.toFixed(3);
    } else {
        return '+' + val.toFixed(3);
    }
}
function usdTob(val) {
    return (val / 1000000000).toFixed(2);
}