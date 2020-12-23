export const radioPlayerInit = () => {
    console.log('Radio Init');

    const radio = document.querySelector('.radio'),
        radioCoverImg = document.querySelector('.radio-cover__img'),
        radioHeaderBig = document.querySelector('.radio-header__big'),
        radioNavigation = document.querySelector('.radio-navigation'),
        radioItem = document.querySelectorAll('.radio-item'),
        radioStop = document.querySelector('.radio-stop');

    const audio = new Audio();
    audio.type = 'audio/aac';

    radioStop.disabled = true;  // Кнопка играть / пауза блокирована

    // Смена вида кнопки играть / пауза
    const changeIconPlay = () => {
        if (audio.paused) {
            radio.classList.remove('play');  // анимация вращения отключена
            radioStop.classList.add('fa-play');
            radioStop.classList.remove('fa-stop');
        } else {
            radio.classList.add('play');  // анимация вращения включена
            radioStop.classList.remove('fa-play');
            radioStop.classList.add('fa-stop');
        }
    }

    radioNavigation.addEventListener('change', event => {
        const target = event.target;
        
        const parrent = target.closest('.radio-item');  // получение даных радиостанции
        radioItem.forEach(item => item.classList.remove('select'));  // обводка активной станции
        parrent.classList.add('select');
        const title = parrent.querySelector('.radio-name').textContent;  // вывести название активной станции
        radioHeaderBig.textContent = title;
        const urlImg = parrent.querySelector('.radio-img').src;  // получение иконки радиостанции
        radioCoverImg.src = urlImg;


        radioStop.disabled = false;  // снятие блока с кнопки после выбора станции

        console.log(target.dataset.radioStantion);
        audio.src = target.dataset.radioStantion;  // получение адреса радиостанции

        audio.play();
        changeIconPlay();
    });

    // Кнопка играть / пауза
    radioStop.addEventListener('click', () => {
        if (audio.paused) {
            audio.play();
        } else {
            audio.pause();
        }

        changeIconPlay();
    });
}
