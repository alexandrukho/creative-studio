(function () {
    let navBtn = document.querySelector('.nav-button');
    navBtn.addEventListener('click', showNav);

    function showNav() {
        let nav = document.querySelector('.nav-list');
        nav.classList.toggle('nav-list__active');
    }
}());
