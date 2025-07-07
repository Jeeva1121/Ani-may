document.addEventListener('DOMContentLoaded', () => {
    // --- SIMULATED ANIME DATABASE ---
    // This is a realistic data structure. To use your own videos,
    // you would replace the 'src' URLs below with links to your own video files.
    // Ensure you have the legal right to stream any content you use.
    const animeDatabase = {
        'bleach': {
            title: 'Bleach',
            episodes: [
                {
                    number: 1,
                    title: 'The Day I Became a Shinigami',
                    description: 'Ichigo Kurosaki is a high school student who can see ghosts. His life is changed forever when he meets Rukia Kuchiki, a Soul Reaper.',
                    thumbnailSrc: 'https://placehold.co/120x68/E67E22/white/png?text=Bleach+E1',
                    sources: [
                        // Legal Placeholder Video. Replace this with your video URL.
                        { quality: '1080p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/Sintel.mp4' }
                    ],
                    subtitles: []
                },
                {
                    number: 2,
                    title: 'A Shinigami\'s Work',
                    description: 'Now possessing Rukia\'s powers, Ichigo must take on the duties of a Soul Reaper to protect the innocent from malevolent spirits called Hollows.',
                    thumbnailSrc: 'https://placehold.co/120x68/E67E22/white/png?text=Bleach+E2',
                    sources: [
                        // Legal Placeholder Video. Replace this with your video URL.
                        { quality: '1080p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/TearsOfSteel.mp4' }
                    ],
                    subtitles: []
                },
                {
                    number: 3,
                    title: 'The Older Brother\'s Wish, the Younger Sister\'s Wish',
                    description: 'Ichigo faces a Hollow that was once the soul of Orihime Inoue\'s older brother.',
                    thumbnailSrc: 'https://placehold.co/120x68/E67E22/white/png?text=Bleach+E3',
                    sources: [
                        // Legal Placeholder Video. Replace this with your video URL.
                        { quality: '1080p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4' }
                    ],
                    subtitles: []
                },
            ]
        },
        'vinland-saga': {
            title: 'Vinland Saga',
            episodes: [
                {
                    number: 1, title: 'Somewhere Not Here', description: 'A young Thorfinn dreams of adventure and the paradise known as Vinland, a land of peace and plenty.',
                    thumbnailSrc: 'https://placehold.co/120x68/3498DB/white/png?text=VS+E1',
                    sources: [{ quality: '1080p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ElephantsDream.mp4' }]
                }
            ]
        },
        'attack-on-titan': {
            title: 'Attack on Titan',
            episodes: [
                {
                    number: 1, title: 'To You, in 2000 Years: The Fall of Shiganshina, Part 1', description: 'The Colossal Titan appears and breaches Wall Maria, forcing humanity to retreat behind Wall Rose in a tragic and bloody battle.',
                    thumbnailSrc: 'https://placehold.co/120x68/C0392B/white/png?text=AoT+E1',
                    sources: [{ quality: '1080p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4' }]
                }
            ]
        },
        'jujutsu-kaisen': {
            title: 'Jujutsu Kaisen',
            episodes: [
                {
                    number: 1, title: 'Ryomen Sukuna', description: 'High school student Yuji Itadori swallows a cursed finger to save his friends, becoming the vessel for a powerful curse.',
                    thumbnailSrc: 'https://placehold.co/120x68/9B59B6/white/png?text=JJK+E1',
                    sources: [{ quality: '1080p', src: 'https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerEscapes.mp4' }]
                }
            ]
        }
    };

    const params = new URLSearchParams(window.location.search);
    const animeId = params.get('animeId');
    const currentEpisodeNumberParam = parseInt(params.get('ep'), 10) || 1;

    // DOM references
    const videoPlayer = document.getElementById('main-video-player');
    const animeTitlePlayerH1 = document.getElementById('anime-title-player');
    const episodeListUl = document.getElementById('episode-list');
    const currentEpisodeTitleH2 = document.getElementById('current-episode-title');
    const currentEpisodeDescriptionP = document.getElementById('current-episode-description');
    const qualitySelector = document.getElementById('quality-selector');

    const animeData = animeDatabase[animeId];

    if (animeId && animeData) {
        animeTitlePlayerH1.textContent = animeData.title;
        loadEpisodeList(animeData.episodes, animeId);
        playEpisode(currentEpisodeNumberParam);
    } else {
        animeTitlePlayerH1.textContent = 'Anime Not Found';
        if (videoPlayer) videoPlayer.style.display = 'none';
        episodeListUl.innerHTML = `<li>Error: Anime data for "${animeId}" could not be loaded. Please check the animeId in the URL and the database.</li>`;
        currentEpisodeTitleH2.textContent = '';
        currentEpisodeDescriptionP.textContent = '';
    }

    function loadEpisodeList(episodes, currentAnimeId) {
        episodeListUl.innerHTML = '';
        if (!episodes || episodes.length === 0) {
            episodeListUl.innerHTML = '<li>No episodes available for this title.</li>';
            return;
        }
        episodes.forEach(ep => {
            const li = document.createElement('li');
            li.classList.add('episode-item');
            li.dataset.episodeNumber = ep.number;

            const thumbnailImg = document.createElement('img');
            thumbnailImg.src = ep.thumbnailSrc || 'https://via.placeholder.com/120x68?text=No+Thumb';
            thumbnailImg.alt = `Thumbnail for ${ep.title}`;
            thumbnailImg.classList.add('episode-thumbnail');
            // Add onerror to provide a fallback image if the thumbnail fails to load
            thumbnailImg.onerror = function () {
                this.src = 'https://via.placeholder.com/120x68?text=Error'; // Or a default image URL
            };

            const textDiv = document.createElement('div');
            textDiv.classList.add('episode-text-details');

            const epNumberSpan = document.createElement('span');
            epNumberSpan.classList.add('episode-item-number');
            epNumberSpan.textContent = `Ep ${ep.number}`;

            const epTitleSpan = document.createElement('span');
            epTitleSpan.classList.add('episode-item-title');
            epTitleSpan.textContent = ep.title;

            textDiv.appendChild(epNumberSpan);
            textDiv.appendChild(epTitleSpan);
            li.appendChild(thumbnailImg);
            li.appendChild(textDiv);

            li.addEventListener('click', () => {
                const newUrl = `${window.location.pathname}?animeId=${currentAnimeId}&ep=${ep.number}`;
                history.pushState({ path: newUrl, ep: ep.number }, '', newUrl);
                playEpisode(ep.number);
            });

            episodeListUl.appendChild(li);
        });
    }

    function playEpisode(episodeNumber) {
        const episode = animeData.episodes.find(ep => ep.number === episodeNumber);

        if (!episode) {
            console.error('Episode not found:', episodeNumber);
            currentEpisodeTitleH2.textContent = `Error: Episode ${episodeNumber} not found.`;
            currentEpisodeDescriptionP.textContent = 'Please select another episode.';
            return;
        }

        const defaultSource = episode.sources[0];
        if (!defaultSource) {
            console.error('No video sources found for this episode.');
            return;
        }

        const currentTime = videoPlayer.currentTime;
        videoPlayer.src = defaultSource.src;

        // Clear existing subtitle tracks
        const oldTracks = videoPlayer.querySelectorAll('track');
        oldTracks.forEach(track => track.remove());

        if (episode.subtitles && episode.subtitles.length > 0) {
            episode.subtitles.forEach(sub => {
                const track = document.createElement('track');
                track.kind = 'subtitles';
                track.label = sub.label;
                track.srclang = sub.lang;
                track.src = sub.src;
                if (sub.default) {
                    track.default = true;
                }
                videoPlayer.appendChild(track);
            });
        }

        // Quality selector setup
        qualitySelector.innerHTML = '';
        episode.sources.forEach(source => {
            const option = document.createElement('option');
            option.value = source.src;
            option.textContent = source.quality;
            qualitySelector.appendChild(option);
        });

        videoPlayer.load();
        videoPlayer.currentTime = currentTime > 1 ? currentTime : 0;
        //Handle autoplay errors
        videoPlayer.play().catch(e => {
            console.warn("Autoplay was prevented.", e);
            // Optionally, show a play button here to let the user start the video.
        });

        currentEpisodeTitleH2.textContent = `Episode ${episode.number}: ${episode.title}`;
        currentEpisodeDescriptionP.textContent = episode.description || 'No description available.';

        document.querySelectorAll('#episode-list .episode-item').forEach(item => {
            item.classList.toggle('active-episode', parseInt(item.dataset.episodeNumber) === episode.number);
        });
    }

    // Quality change handler
    qualitySelector.addEventListener('change', (e) => {
        const newSrc = e.target.value;
        if (newSrc) {
            const currentTime = videoPlayer.currentTime;
            videoPlayer.src = newSrc;
            videoPlayer.load();
            videoPlayer.currentTime = currentTime;
            videoPlayer.play();
        }
    });

    // Handle back/forward navigation
    window.onpopstate = function (event) {
        if (event.state && event.state.ep) {
            playEpisode(event.state.ep);
        } else {
            const fallbackParams = new URLSearchParams(window.location.search);
            const ep = parseInt(fallbackParams.get('ep'), 10) || 1;
            playEpisode(ep);
        }
    };
});