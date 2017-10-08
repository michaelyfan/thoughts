

// update.addEventListener('click', function() {
//     fetch('quotes', {
//       method: 'put',
//       headers: {'Content-Type': 'application/json'},
//       body: JSON.stringify({
//         'name': 'joker',
//         'quote': 'evening, Bats'
//       })
//     }).then(res => {
//         if(res.ok) return res.json()
//     }).then(data => {
//         console.log(data)
//         window.location.reload(true);
//     })
// })

window.onload = function() {
    var input = document.getElementById('select');
    input.focus();
    input.select();
}

var del = document.getElementById('delete');
var deleteButtons = document.getElementsByClassName('deleteButton');
for (let i = 0; i < deleteButtons.length; i++) {
    deleteButtons[i].addEventListener('click', function(e) {
        fetch('quotes', {
            method: 'delete',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'id': e.target.dataset.id
            })
        }).then(res => {
            if(res.ok) return res.json();
        }).then(data => {
            window.location.reload();
        })
    })
}

var voteUpButtons = document.getElementsByClassName('voteUpButton');
for (let i = 0; i < voteUpButtons.length; i++) {
    voteUpButtons[i].addEventListener('click', function(e) {
        fetch('quotes', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'id': e.target.dataset.id,
                'rating': e.target.dataset.rating,
                'isVoteUp': true
            })
        }).then(res => {
            if(res.ok) return res.json();
        }).then(data => {
            window.location.reload();
        })
    })
}

var voteDownButtons = document.getElementsByClassName('voteDownButton');
for (let i = 0; i < voteDownButtons.length; i++) {
    voteDownButtons[i].addEventListener('click', function(e) {
        fetch('quotes', {
            method: 'put',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify({
                'id': e.target.dataset.id,
                'rating': e.target.dataset.rating,
                'isVoteUp': false
            })
        }).then(res => {
            if(res.ok) return res.json();
        }).then(data => {
            window.location.reload();
        })
    })
}