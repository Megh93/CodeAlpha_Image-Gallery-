const buttons = document.querySelectorAll('.like-btn');
buttons.forEach(btn => {
    btn.addEventListener('click', () => {
        const count = btn.querySelector('span');
        if(btn.classList.contains('liked')){
            btn.classList.remove('liked');
            count.textContent = parseInt(count.textContent) - 1;
        } else {
            btn.classList.add('liked');
            count.textContent = parseInt(count.textContent) + 1;
        }
    });
});

const filterBtns = document.querySelectorAll('.filter-btn');
const cards = document.querySelectorAll('.food-card');

filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');
        const filter = btn.dataset.filter;
        cards.forEach(card => {
            if(filter === 'all' || card.dataset.category === filter){
                card.style.display = 'block';
            } else {
                card.style.display = 'none';
            }
        });
    });
});

const lightbox = document.querySelector('.lightbox');
const lightboxImg = document.querySelector('.lightbox-img');
const closeBtn = document.querySelector('.lightbox .close');
const nextBtn = document.querySelector('.lightbox .next');
const prevBtn = document.querySelector('.lightbox .prev');

let currentIndex = 0;

function visibleCards() {
    return Array.from(cards).filter(c => c.style.display !== 'none');
}

cards.forEach((card, index) => {
    card.querySelector('img').addEventListener('click', () => {
        const visible = visibleCards();
        currentIndex = visible.indexOf(card);
        showLightbox();
    });
});

function showLightbox() {
    const visible = visibleCards();
    lightbox.style.display = 'flex';
    lightboxImg.src = visible[currentIndex].querySelector('img').src;
}

closeBtn.addEventListener('click', () => {
    lightbox.style.display = 'none';
});

nextBtn.addEventListener('click', () => {
    const visible = visibleCards();
    currentIndex = (currentIndex + 1) % visible.length;
    lightboxImg.src = visible[currentIndex].querySelector('img').src;
});

prevBtn.addEventListener('click', () => {
    const visible = visibleCards();
    currentIndex = (currentIndex - 1 + visible.length) % visible.length;
    lightboxImg.src = visible[currentIndex].querySelector('img').src;
});