/* ========================================
   ДАННЫЕ ДЛЯ ДИНАМИЧЕСКОГО КОНТЕНТА (45-й президент США)
   ======================================== */
   const pageContent = {
    1: {
        title: "Ранние годы и бизнес-карьера",
        body: `
            <p>Дональд Джон Трамп родился 14 июня 1946 года в Куинсе, Нью-Йорк. Он окончил Уортонскую школу бизнеса при Пенсильванском университете в 1968 году со степенью бакалавра экономики.</p>
            <p>До прихода в политику Трамп был известным бизнесменом и телеведущим. Он возглавлял семейную компанию The Trump Organization, занимаясь операциями с недвижимостью в Нью-Йорке и по всему миру, включая строительство небоскребов, отелей и полей для гольфа.</p>
            <p>В 2004 году он стал ведущим и исполнительным продюсером реалити-шоу "The Apprentice" (Ученик), которое закрепило его образ успешного и решительного лидера в массовой культуре.</p>
        `
    },
    2: {
        title: "Политическая карьера и выборы 2016 года",
        body: `
            <p>В июне 2015 года Дональд Трамп официально объявил о своей кандидатуре на пост президента США от Республиканской партии.</p>
            <p>Его кампания строилась на лозунгах "Сделай Америку снова великой" (Make America Great Again) и "Америка прежде всего" (America First). Он выступал за ужесточение иммиграционной политики, строительство стены на границе с Мексикой, пересмотр торговых соглашений и масштабное снижение налогов.</p>
            <p>В ноябре 2016 года он одержал победу над кандидатом от Демократической партии Хиллари Клинтон, получив 304 голоса выборщиков при победе в ключевых колеблющихся штатах "ржавого пояса".</p>
        `
    },
    3: {
        title: "Внутренняя политика и ключевые решения",
        body: `
            <p>Одним из первых шагов нового президента стал выход США из Транстихоокеанского партнерства (ТТП). В 2017 году был подписан закон о масштабной налоговой реформе (Tax Cuts and Jobs Act), снизившей корпоративный налог с 35% до 21%.</p>
            <p>Администрация провела значительную дерегуляцию экономики, отменив множество нормативных актов эпохи Обамы, особенно в сфере экологии, энергетики и финансового регулирования.</p>
            <p>В 2020 году была запущена операция "Warp Speed", которая обеспечила беспрецедентно быструю разработку, одобрение и распределение вакцин против COVID-19.</p>
        `
    },
    4: {
        title: "Внешняя политика и международные отношения",
        body: `
            <p>Внешняя политика 45-го президента характеризовалась двусторонним подходом, скептицизмом по отношению к многосторонним соглашениям и требованием к союзникам увеличивать расходы на оборону.</p>
            <p>США вышли из Парижского соглашения по климату и Совместного всеобъемлющего плана действий по иранской ядерной программе. Были введены масштабные тарифы на товары из Китая, что привело к торговой войне.</p>
            <p>Тем не менее, были инициированы исторические встречи с лидером КНДР Ким Чен Ыном в Сингапуре (2018) и Ханое (2019). Также были достигнуты "Соглашения Авраама" о нормализации отношений между Израилем и рядом арабских государств.</p>
        `
    },
    5: {
        title: "Наследие и историческое значение",
        body: `
            <p>Президентство Дональда Трампа стало одним из самых поляризующих и обсуждаемых в современной истории США. Он стал третьим президентом в истории страны, в отношении которого Палата представителей инициировала процедуру импичмента (и единственным, кто прошел через эту процедуру дважды).</p>
            <p>Его стиль управления, активное использование социальных сетей для прямой коммуникации с избирателями и популистская риторика оказали долгосрочное влияние на политический ландшафт Республиканской партии и глобальной политики.</p>
            <p>Важнейшим долгосрочным наследием стало назначение трех судей Верховного суда (Нила Горсача, Бретта Кавано и Эми Кони Барретт), что изменило его идеологический баланс на десятилетия вперед.</p>
        `
    }
};

/* ========================================
   ЯКОРЬ (кнопка "Наверх")
   ======================================== */
(function initAnchor() {
    const anchor = document.getElementById('anchorTop');
    if (!anchor) return;

    const THRESHOLD = 200;
    let ticking = false;

    function updateAnchor() {
        const scrollY = window.scrollY || window.pageYOffset;
        if (scrollY >= THRESHOLD) {
            anchor.classList.add('active');
        } else {
            anchor.classList.remove('active');
        }
        ticking = false;
    }

    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(updateAnchor);
            ticking = true;
        }
    }, { passive: true });

    updateAnchor();

    anchor.addEventListener('click', (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: 'smooth' });
    });
})();

/* ========================================
   СЛАЙДЕР
   ======================================== */
(function initSlider() {
    const slider = document.querySelector('.slider');
    if (!slider) return;

    const track = slider.querySelector('.slider__track');
    const slides = slider.querySelectorAll('.slide');
    const btnPrev = slider.querySelector('.slider__btn--prev');
    const btnNext = slider.querySelector('.slider__btn--next');
    const dotsContainer = slider.querySelector('.slider__dots');

    let currentIndex = 0;
    const total = slides.length;
    let autoPlayTimer;

    slides.forEach((_, i) => {
        const dot = document.createElement('button');
        dot.className = 'slider__dot' + (i === 0 ? ' active' : '');
        dot.setAttribute('aria-label', `Слайд ${i + 1}`);
        dot.addEventListener('click', () => goTo(i));
        dotsContainer.appendChild(dot);
    });

    const dots = dotsContainer.querySelectorAll('.slider__dot');

    function update() {
        track.style.transform = `translateX(-${currentIndex * 100}%)`;
        dots.forEach((d, i) => d.classList.toggle('active', i === currentIndex));
    }

    function goTo(index) {
        currentIndex = (index + total) % total;
        update();
        resetAutoPlay();
    }

    function next() { goTo(currentIndex + 1); }
    function prev() { goTo(currentIndex - 1); }

    btnNext.addEventListener('click', next);
    btnPrev.addEventListener('click', prev);

    document.addEventListener('keydown', (e) => {
        if (!slider.matches(':hover')) return;
        if (e.key === 'ArrowRight') next();
        if (e.key === 'ArrowLeft') prev();
    });

    function startAutoPlay() {
        autoPlayTimer = setInterval(next, 5000);
    }
    function resetAutoPlay() {
        clearInterval(autoPlayTimer);
        startAutoPlay();
    }

    slider.addEventListener('mouseenter', () => clearInterval(autoPlayTimer));
    slider.addEventListener('mouseleave', startAutoPlay);

    startAutoPlay();
})();

/* ========================================
   ДИНАМИЧЕСКИЙ КОНТЕНТ И ПАГИНАЦИЯ
   ======================================== */
(function initDynamicContent() {
    const contentTitle = document.getElementById('contentTitle');
    const contentBody = document.getElementById('contentBody');
    const pagination = document.querySelector('.pagination');
    
    if (!contentTitle || !contentBody || !pagination) return;

    let currentPage = 1;

    function loadContent(page) {
        const data = pageContent[page];
        if (!data) return;

        // Анимация исчезновения
        const contentBlock = document.getElementById('dynamicContent');
        contentBlock.style.opacity = '0';
        contentBlock.style.transform = 'translateY(10px)';

        setTimeout(() => {
            contentTitle.textContent = data.title;
            contentBody.innerHTML = data.body;
            
            // Анимация появления
            contentBlock.style.opacity = '1';
            contentBlock.style.transform = 'translateY(0)';
        }, 300);

        currentPage = page;
    }

    function updatePagination(page) {
        const links = pagination.querySelectorAll('.pagination__link[data-page]');
        links.forEach(link => {
            const pageNum = parseInt(link.getAttribute('data-page'));
            link.classList.toggle('active', pageNum === page);
        });
    }

    // Загрузка начального контента
    loadContent(1);

    // Обработчики кликов на пагинацию
    const pageLinks = pagination.querySelectorAll('.pagination__link[data-page]');
    const prevBtn = pagination.querySelector('.pagination__link--prev');
    const nextBtn = pagination.querySelector('.pagination__link--next');

    pageLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const page = parseInt(link.getAttribute('data-page'));
            if (page !== currentPage) {
                loadContent(page);
                updatePagination(page);
                
                // Плавный скролл к контенту
                document.getElementById('dynamicContent').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    });

    if (prevBtn) {
        prevBtn.addEventListener('click', (e) => {
            e.preventDefault();
            if (currentPage > 1) {
                const newPage = currentPage - 1;
                loadContent(newPage);
                updatePagination(newPage);
                document.getElementById('dynamicContent').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    }

    if (nextBtn) {
        nextBtn.addEventListener('click', (e) => {
            e.preventDefault();
            const totalPages = Object.keys(pageContent).length;
            if (currentPage < totalPages) {
                const newPage = currentPage + 1;
                loadContent(newPage);
                updatePagination(newPage);
                document.getElementById('dynamicContent').scrollIntoView({ 
                    behavior: 'smooth', 
                    block: 'start' 
                });
            }
        });
    }
})();

/* ========================================
   ПАСХАЛКА: ОЦЕНКА ПРЕЗИДЕНТСТВА
   ======================================== */
   (function initEasterEgg() {
    const easterEggBtn = document.getElementById('easterEggBtn');
    const modal = document.getElementById('ratingModal');
    const modalClose = document.getElementById('modalClose');
    const ratingForm = document.getElementById('ratingForm');
    const ratingSlider = document.getElementById('ratingSlider');
    const ratingValue = document.getElementById('ratingValue');
    
    const angryOverlay = document.getElementById('angryTrumpOverlay');
    const happyOverlay = document.getElementById('happyTrumpOverlay');

    if (!easterEggBtn || !modal) return;

    // 1. Открытие модального окна
    easterEggBtn.addEventListener('click', () => {
        modal.classList.add('active');
    });

    // 2. Закрытие модального окна (крестик)
    modalClose.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    // 3. Закрытие по клику на затемненный фон
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    // 4. Динамическое обновление числа при движении ползунка
    ratingSlider.addEventListener('input', (e) => {
        ratingValue.textContent = e.target.value;
    });

    // 5. Обработка отправки формы
    ratingForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const rating = parseInt(ratingSlider.value, 10);
        
        // Закрываем модальное окно
        modal.classList.remove('active');

        // Небольшая задержка для плавного перехода
        setTimeout(() => {
            if (rating < 50) {
                // Злой Трамп
                angryOverlay.classList.add('active');
                
                // Автоматическое скрытие через 4 секунды (или по клику на оверлей)
                const hideAngry = () => {
                    angryOverlay.classList.remove('active');
                    angryOverlay.removeEventListener('click', hideAngry);
                };
                setTimeout(hideAngry, 4000);
                angryOverlay.addEventListener('click', hideAngry);
                
            } else {
                // Довольный Трамп
                happyOverlay.classList.add('active');
                
                // Автоматическое скрытие через 4 секунды (или по клику на оверлей)
                const hideHappy = () => {
                    happyOverlay.classList.remove('active');
                    happyOverlay.removeEventListener('click', hideHappy);
                };
                setTimeout(hideHappy, 4000);
                happyOverlay.addEventListener('click', hideHappy);
            }
        }, 300);
    });
})();
