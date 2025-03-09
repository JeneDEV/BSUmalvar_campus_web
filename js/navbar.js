document.querySelectorAll('.navbtn').forEach(function(item) {
    item.addEventListener('click', function() { 
        window.location.href = item.getAttribute('data-href');
    });
});