
const slider = document.querySelector('#move');

function topMover() {
    slider.innerHTML='';
    axios.get(`https://api.coingecko.com/api/v3/search/trending`)
        .then(response => {
            
            let data = response.data.coins;
            console.log(data[0].item);
            data.forEach((val, idx) => {
                if (idx < 5) {
                    slider.innerHTML += `
                    <div class="item">
                        <div class="image">
                            <figure>
                                <img src="${val.item.small}" alt="">
                            </figure>
                        </div> 
                        <div class="rank">
                            <span>Rank</span>
                            <span>${val.item.market_cap_rank}</span>
                        </div>
                        <div class="name">
                            <strong>${val.item.name}</strong>
                            <span>${val.item.symbol}</span>
                        </div>
                    </div>`;
                }
            })

        })
}

topMover();

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

setTimeout(() => {
    slides();
    topMover();
    slider.style.transform = 'translateX(0px)';
}, 6000);




function slides() {
    setTimeout(() => {
        slider.style.transform = 'translateX(-330px)';
    }, 3000);
}