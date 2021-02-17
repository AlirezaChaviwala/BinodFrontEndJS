const { getLineAndCharacterOfPosition } = require("typescript");

function setAttr(val1, val2, element) {
    for (var i = 0; i < val1.length; i++) {
        element.setAttribute(val1[i], val2[i]);
    }
}


const recordsUpdate = async() => {
    try {
        let req = await fetch('https://binod-url-shortener.herokuapp.com/getRecords', { method: 'get' });
        let res = await req.json();

        let cont = document.getElementById('records');
        cont.innerHTML = '';
        for (let i = res.length - 1; i >= 0; i--) {
            let card = document.createElement('div');
            setAttr(['class'], ['card mb-3'], card);

            let cardHeader = document.createElement('div');
            setAttr(['class'], ['card-header'], cardHeader);
            card.append(cardHeader);
            let headerLink = document.createElement('a');
            setAttr(['href', 'target'], [res[i]["long-url"], '_blank'], headerLink);
            headerLink.innerText = res[i]["long-url"];
            cardHeader.append(headerLink);

            let cardBody = document.createElement('div');
            setAttr(['class'], ['card-body d-flex justify-content-between'], cardBody);
            card.append(cardBody);
            let bodyDiv = document.createElement('div');
            cardBody.append(bodyDiv);
            let shortLinkPara = document.createElement('p');
            setAttr(['class'], ['d-inline'], shortLinkPara);
            bodyDiv.append(shortLinkPara);
            let spanText = document.createElement('span');
            setAttr(['style'], ["font-family: 'Righteous', cursive;"], spanText);
            spanText.innerText = 'bin.od link: ';
            shortLinkPara.append(spanText);
            var shortLinkAnchor = document.createElement('a');
            setAttr(['id', 'href', 'target'], [`an-${res[i]["short-url"]}`, `https://binod-url-shortener.herokuapp.com/redirect/${res[i]["short-url"]}`, '_blank'], shortLinkAnchor);
            shortLinkAnchor.innerText = res[i]["short-url"];
            shortLinkPara.append(shortLinkAnchor);
            shortLinkAnchor.onclick = () => {
                window.open(`https://binod-url-shortener.herokuapp.com/redirect/${res[i]["short-url"]}`);
                setTimeout(() => { location.reload() }, 2000);

            }

            let inputForCopy = document.createElement('input');
            setAttr(['type', 'id', 'value'], ['text', `ip-${res[i]["short-url"]}`, `https://binod-url-shortener.herokuapp.com/redirect/${res[i]["short-url"]}`], inputForCopy);
            //inputForCopy.disabled = true;
            inputForCopy.style.position = 'absolute';
            inputForCopy.style.left = '-9999px';
            bodyDiv.append(inputForCopy);
            let buttonForCopy = document.createElement('button');
            setAttr(['type', 'id', 'class', 'data-container', 'data-toggle', 'data-placement', 'data-content'], ['button', `bt-${res[i]["short-url"]}`, 'ml-1 btn btn-link', 'body', 'popover', 'top', 'Copied to clipboard!'], buttonForCopy);
            buttonForCopy.innerHTML = `<i class="far fa-copy"></i>`;
            bodyDiv.append(buttonForCopy);
            buttonForCopy.onclick = () => {
                inputForCopy.select();
                document.execCommand("Copy");
            }

            let countSpan = document.createElement('span');
            setAttr(['class', 'style'], ['p-3 badge badge-pill', 'background-color:#FFC107;color:white;font-size:15px;'], countSpan);
            countSpan.innerHTML = `<i class="far fa-hand-pointer"></i> ${res[i].count} clicks`;
            cardBody.append(countSpan);

            cont.append(card);
        }

    } catch (err) {
        console.error(err);
    }
}
recordsUpdate();

document.getElementById('binod-it-form').addEventListener('submit', async function(e) {
    e.preventDefault();
    let formData = new FormData(this);
    let data = Object.fromEntries(formData.entries());
    try {
        let req = await fetch(`https://binod-url-shortener.herokuapp.com/binodit`, { method: 'post', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) });
        let res = await req.json();
        recordsUpdate();
    } catch (err) {
        console.error(err);
    }

});