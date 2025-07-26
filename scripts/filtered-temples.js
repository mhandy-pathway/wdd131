// NAV
const nav = document.getElementById("nav");
const menu = document.getElementById("menu");
menu.addEventListener('click', () => {
    menu.classList.toggle('open');
    nav.classList.toggle('open');
})

// TEMPLES
const temples = [
  {
    templeName: "Aba Nigeria",
    location: "Aba, Nigeria",
    dedicated: "2005, August, 7",
    area: 11500,
    imageUrl: "images/temples/aba-nigeria-temple-lds-273999-wallpaper.webp"
  },
  {
    templeName: "Manti Utah",
    location: "Manti, Utah, United States",
    dedicated: "1888, May, 21",
    area: 74792,
    imageUrl: "images/temples/manti-temple-768192-wallpaper.webp"
  },
  {
    templeName: "Payson Utah",
    location: "Payson, Utah, United States",
    dedicated: "2015, June, 7",
    area: 96630,
    imageUrl: "images/temples/payson-utah-temple-exterior-1416671-wallpaper.webp"
  },
  {
    templeName: "Yigo Guam",
    location: "Yigo, Guam",
    dedicated: "2020, May, 2",
    area: 6861,
    imageUrl: "images/temples/yigo_guam_temple_2.webp"
  },
  {
    templeName: "Washington D.C.",
    location: "Kensington, Maryland, United States",
    dedicated: "1974, November, 19",
    area: 156558,
    imageUrl: "images/temples/washington_dc_temple-exterior-2.webp"
  },
  {
    templeName: "Lima Perú",
    location: "Lima, Perú",
    dedicated: "1986, January, 10",
    area: 9600,
    imageUrl: "images/temples/lima-peru-temple-evening-1075606-wallpaper.webp"
  },
  {
    templeName: "Mexico City Mexico",
    location: "Mexico City, Mexico",
    dedicated: "1983, December, 2",
    area: 116642,
    imageUrl: "images/temples/mexico-city-temple-exterior-1518361-wallpaper.webp"
  },
  {
    templeName: "Salt Lake Temple",
    location: "Salt Lake City, Utah, United States",
    dedicated: "1893, April, 24",
    area: 382207,
    imageUrl: "images/temples/salt-lake-temple-15669-main.webp"
  },
  {
    templeName: "Asunción Paraguay Temple",
    location: "Asunción, Paraguay",
    dedicated: "2002, Mayo, 4",
    area: 11906,
    imageUrl: "images/temples/asuncion-paraguay-temple-6969-main.webp"
  },
  {
    templeName: "Mount Timpanogos Utah Temple",
    location: "American Fork, Utah, United States",
    dedicated: "1996, October, 19",
    area: 107240,
    imageUrl: "images/temples/mount-timpanogos-utah-temple-36979-main.webp"
  },
  // Add more temple objects here...
];
const temple_list_div = document.getElementById('temple_list');
if(!temple_list_div) {
    alert('Unable to find temple list div.')
} else {
    displayTemples(temples);

    function createTempleCard(temple) {
        const div = document.createElement('div');
        div.className = 'temple_card';

        const h2 = document.createElement('h2');
        h2.textContent = temple.templeName;
        div.appendChild(h2);

        const location_label = document.createElement('span');
        location_label.textContent = 'Location:';
        location_label.className = 'label';
        div.appendChild(location_label);

        const location_span = document.createElement('span');
        location_span.textContent = temple.location;
        location_span.className = 'text';
        div.appendChild(location_span);

        const dedicated_label = document.createElement('span');
        dedicated_label.textContent = 'Dedicated:';
        dedicated_label.className = 'label';
        div.appendChild(dedicated_label);

        const dedicated_span = document.createElement('span');
        dedicated_span.textContent = temple.dedicated;
        dedicated_span.className = 'text';
        div.appendChild(dedicated_span);

        const size_label = document.createElement('span');
        size_label.textContent = 'Size:';
        size_label.className = 'label';
        div.appendChild(size_label);

        const size_span = document.createElement('span');
        size_span.textContent = `${temple.area} sq ft`;
        size_span.className = 'text';
        div.appendChild(size_span);

        const img = document.createElement('img');
        img.src = temple.imageUrl;
        img.width = 300;
        img.height = 300;
        img.loading = 'lazy';
        img.alt = temple.templeName;
        div.appendChild(img);

        return div;
    }
    function displayTemples(temples) {
        clearTemples();
        temples.forEach(temple => {
            temple_list_div.appendChild(createTempleCard(temple));
        })
    }
    function clearTemples() {
        temple_list_div.innerHTML = '';
    }

    // Setup Nav Events
    const navClickEvent = (title, temples) => {
        document.getElementById('which_nav').textContent = title;
        displayTemples(temples);
    }
    document.getElementById('home_nav').addEventListener('click', e => navClickEvent('Home', temples));
    document.getElementById('old_nav').addEventListener('click', e => navClickEvent('Old', temples.filter(temple => parseInt(temple.dedicated.substring(0, 4)) < 1900)));
    document.getElementById('new_nav').addEventListener('click', e => navClickEvent('New', temples.filter(temple => parseInt(temple.dedicated.substring(0, 4)) > 2000)));
    document.getElementById('large_nav').addEventListener('click', e => navClickEvent('Large', temples.filter(temple => temple.area > 90000)));
    document.getElementById('small_nav').addEventListener('click', e => navClickEvent('Small', temples.filter(temple => temple.area < 10000)));
}