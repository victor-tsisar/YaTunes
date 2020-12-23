export const videoPlayerInit = () => {
    console.log('Video Init');

    const videoPlayer = document.querySelector('.video-player'),
        videoButtonPlay = document.querySelector('.video-button__play'),
        videoButtonStop = document.querySelector('.video-button__stop'),
        videoTimePassed = document.querySelector('.video-time__passed'),
        videoProgress = document.querySelector('.video-progress'),
        videoTimeTotal = document.querySelector('.video-time__total'),
        videoIconMute = document.querySelector('.video-icon__mute'),
        videoIconTalk = document.querySelector('.video-icon__talk'),
        videoVolume = document.querySelector('.video-volume'),
        videoFullscreen = document.querySelector('.video-fullscreen');

    // Работа с кнопкой Играть/Пауза
    const toggleIcon = () => {
        if (videoPlayer.paused) {
            videoButtonPlay.classList.remove('fa-pause');
            videoButtonPlay.classList.add('fa-play');
        } else {
            videoButtonPlay.classList.add('fa-pause');
            videoButtonPlay.classList.remove('fa-play');
        }
    }

    // Запуск плеера и пауза
    const togglePlay = (event) => {
        event.preventDefault();

        if (videoPlayer.paused) {
            videoPlayer.play();
        } else {
            videoPlayer.pause();
        }

        toggleIcon();
    }

    // Остановить плеер
    const stopPlay = () => {
        videoPlayer.pause();
        videoPlayer.currentTime = 0;
    }

    // Добавление нулей в счётчик времени
    const addZero = n => n < 10 ? '0' + n : n;

    // Значок отключения звука
    const changeRangeValue = () => {
        if (videoPlayer.volume === 0) {
            videoIconMute.classList.add('mute');
        }
        if (videoPlayer.volume !== 0) {
            videoIconMute.classList.remove('mute');
        }
    }

    // Шкала громкости
    const changeValue = () => {
        const valueVolume = videoVolume.value;
        videoPlayer.volume = valueVolume / 100;

        changeRangeValue();        
    }

    // Включить/выключить звук
    const changeVolume = () => {
        videoIconTalk.addEventListener('click', () => {
            videoIconMute.classList.remove('mute');
            videoPlayer.volume = 1;
            videoVolume.value = videoPlayer.volume * 100;
        });

        videoIconMute.addEventListener('click', () => {
            videoIconMute.classList.toggle('mute');
            videoPlayer.volume = 0;
            videoVolume.value = videoPlayer.volume * 0;
        });
    }

    videoPlayer.addEventListener('click', togglePlay);
    videoButtonPlay.addEventListener('click', togglePlay);
    videoPlayer.addEventListener('play', toggleIcon);
    videoPlayer.addEventListener('pause', toggleIcon);
    videoButtonStop.addEventListener('click', stopPlay);
    videoVolume.addEventListener('input', changeValue);

    // Счётчик времени плеера и ползунка
    videoPlayer.addEventListener('timeupdate', () => {
        const currentTime = videoPlayer.currentTime;
        const duration = videoPlayer.duration;

        // Определение значение ползунка и переключение видео
        videoProgress.value = (currentTime / duration) *100;

        // Расчет времени работы плеера
        let minutePassed = Math.floor(currentTime / 60);
        let secondsPassed = Math.floor(currentTime % 60);

        let minuteTotal = Math.floor(duration / 60);
        let secondsTotal = Math.floor(duration % 60);

        videoTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`;
        videoTimeTotal.textContent = `${addZero(minuteTotal)}:${addZero(secondsTotal)}`;
    });

    // Связь ползунка и видео 
    videoProgress.addEventListener('input', () => {
        const duration = videoPlayer.duration;
        const value = videoProgress.value;

        videoPlayer.currentTime = (value * duration) / 100;
    });

    // Открыть на полный екран
    videoFullscreen.addEventListener('click', () => {
        videoPlayer.requestFullscreen();
    });

    // Связь шкалы громкости полноекранной версии и дефолтной
    videoVolume.addEventListener('input', changeValue);
    videoPlayer.addEventListener('volumechange', () => {
        videoVolume.value = Math.round(videoPlayer.volume * 100);

        changeRangeValue();
    });

    // Вызов функции для установления значения громкости видео 
    changeValue();  // по умолчанию
    changeVolume();  // кнопки 0 - 100
}
