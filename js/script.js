document.addEventListener('DOMContentLoaded', () => {
    const loadCDN = (url, type) => {
        let el = document.createElement(type === "css" ? "link" : "script");
        type === "css" ? (el.rel = "stylesheet", el.href = url) : (el.src = url, el.defer = true);
        document.head.appendChild(el);
    };

    const loadHTML = (file, target, script) =>
        fetch(file)
            .then(res => res.ok ? res.text() : Promise.reject(`Error loading ${file}`))
            .then(data => {
                const targetEl = document.getElementById(target);
                if (targetEl) {
                    targetEl.innerHTML = data;
                    if (script) {
                        const scriptTag = document.createElement('script');
                        scriptTag.src = script;
                        scriptTag.defer = true;
                        document.body.appendChild(scriptTag);
                    }
                } else {
                    console.error(`Target container '${target}' not found.`);
                }
            })
            .catch(err => console.error(err));

    // Load Bootstrap CSS & JS from CDN
    loadCDN("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/css/bootstrap.min.css", "css");
    loadCDN("https://cdn.jsdelivr.net/npm/bootstrap@5.3.3/dist/js/bootstrap.bundle.min.js", "js");

    // Load HTML Components
    loadHTML('/components/header.html', 'header-container');
    loadHTML('/components/navbar.html', 'navbar-container', '/js/navbar.js');
    loadHTML('/components/slider.html', 'slider-container');


});



