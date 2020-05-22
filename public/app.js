function toCurrency(price) {
    return new Intl.NumberFormat('en-EN', {
        currency: 'USD',
        style: 'currency'
    }).format(price);
}

function handleCardClick(clickEvent) {
    if (clickEvent.target.classList.contains('js-remove')) {
        const id = clickEvent.target.dataset.id;
        
        fetch('/card/remove/' + id, {
            method: 'DELETE',
        })
            .then(res => res.json())
            .then(card => {
                if (card.courses.length) {
                    const html = card.courses.map(item => {
                        return `
                        <tr>
                            <td>${item.title}</td>
                            <td>${item.count}</td>
                            <td>
                                <button class="btn btn-small js-remove" data-id="${item.id}">
                                    Delete
                                </button>
                            </td>
                        </tr>
                        `;
                    }).join('');
                    $card.querySelector('tbody').innerHTML = html;
                    $card.querySelector('.price').textContent = toCurrency(card.price);
                } else {
                    $card.innerHTML = '<p>Bucket is empty</p>';
                }
            })
            .catch(err => console.log(err));
    }

}

document.querySelectorAll('.price').forEach(node => {
    node.textContent = toCurrency(node.textContent);
});

const $card = document.querySelector('#card');

if ($card) {
    $card.addEventListener('click', handleCardClick);
}