import { addZero } from './supScript.js';  //дополнительные функции

export const musicPlayerInit = () => {
    console.log('Music Init');

    const audio = document.querySelector('.audio'),
        audioImg = document.querySelector('.audio-img'),
        audioHeader = document.querySelector('.audio-header'),
        audioPlayer = document.querySelector('.audio-player'),
        audioNavigation = document.querySelector('.audio-navigation'),
        audioButtonPlay = document.querySelector('.audio-button__play'),
        audioProgress = document.querySelector('.audio-progress'),
        audioProgressTiming = document.querySelector('.audio-progress__timing'),
        audioTimePassed = document.querySelector('.audio-time__passed'),
        audioTimeTotal = document.querySelector('.audio-time__total'),
        audioIconMute = document.querySelector('.audio-icon__mute'),
        audioIconTalk = document.querySelector('.audio-icon__talk'),
        audioVolume = document.querySelector('.audio-volume');

    // Список треков
    const playlist = ['hello', 'flow', 'speed'];
    let trackIndex = 0;

    const loadTrack = () => {
        const isPlayed = audioPlayer.paused;
        const track = playlist[trackIndex];

        audioImg.src = `./audio/${track}.jpg`;
        audioHeader.textContent = track.toUpperCase();
        audioPlayer.src = `./audio/${track}.mp3`;
        // Проверка играла ли музика до переключения
        if (isPlayed) {
            audioPlayer.pause();
        } else {
            audioPlayer.play();
        }
    };

    const prevTrack = () => {
        if (trackIndex !== 0) {
            trackIndex--;
        } else {
            trackIndex = playlist.length - 1;
        }
        loadTrack();
    }

    const nextTrack = () => {
        if (trackIndex === playlist.length - 1) {
            trackIndex = 0;
        } else {
            trackIndex++;
        }
        loadTrack();
    }

    audioNavigation.addEventListener('click', event => {
        const target = event.target;

        // Проверка наличия класа у елемента и смена вида кнопки играть/пауза
        if (target.classList.contains('audio-button__play')) {
            audio.classList.toggle('play');
            audioButtonPlay.classList.toggle('fa-play');
            audioButtonPlay.classList.toggle('fa-pause');

            // Запуск музыки
            if (audioPlayer.paused) {
                audioPlayer.play();
            } else {
                audioPlayer.pause();
            }
            // Получение информации для стартового трека
            const track = playlist[trackIndex];
            audioHeader.textContent = track.toUpperCase();
        }
        // Клик по кнопке next/prev и выбор трека со списка
        if (target.classList.contains('audio-button__prev')) {
            prevTrack();
        }

        if (target.classList.contains('audio-button__next')) {
            nextTrack();
        }

    });

    // Когда трек доиграл до конца
    audioPlayer.addEventListener('ended', () => {
        nextTrack();
        audioPlayer.play();
    });

    // Шкала прогреса трека
    audioPlayer.addEventListener('timeupdate', () => {
        const duration = audioPlayer.duration;
        const currentTime = audioPlayer.currentTime;
        const progress  = (currentTime / duration) * 100;

        audioProgressTiming.style.width = progress + '%';  // заполнения шкалы

        const minutePassed = Math.floor(currentTime / 60) || '0';
        const secondsPassed = Math.floor(currentTime % 60) || '0';
        const minutesTotal = Math.floor(duration / 60) || '0';
        const secondsTotal = Math.floor(duration % 60) || '0';

        audioTimePassed.textContent = `${addZero(minutePassed)}:${addZero(secondsPassed)}`
        audioTimeTotal.textContent = `${addZero(minutesTotal)}:${addZero(secondsTotal)}`
    });

    // Перемотка трека
    audioProgress.addEventListener('click', event => {
        const x = event.offsetX;
        const allWidth = audioProgress.clientWidth;
        const progress = (x / allWidth) * audioPlayer.duration;

        audioPlayer.currentTime = progress;
    });

    // Регулировка звука
    audioVolume.addEventListener('input', () => {
        audioPlayer.volume = audioVolume.value / 100;
        if (audioPlayer.volume === 0) {
            audioIconMute.classList.add('mute');
        } else {
            audioIconMute.classList.remove('mute');
        }
    });

    audioIconTalk.addEventListener('click', () => {
        audioIconMute.classList.remove('mute');
        audioPlayer.volume = 1;
        audioVolume.value = audioPlayer.volume * 100;
    });
    audioIconMute.addEventListener('click', () => {
        audioIconMute.classList.toggle('mute');
        audioPlayer.volume = 0;
        audioVolume.value = audioPlayer.volume * 100;
    });

    audioVolume.value = audioPlayer.volume * 100;

    musicPlayerInit.stop = () => {
        audioPlayer.pause();
    }

};