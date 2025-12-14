const NEWS_API_KEY = 'pub_397edcb634954d01aeee0314fcadcadc'; 

const NEWS_API_URL = `https://newsdata.io/api/1/news?apikey=${NEWS_API_KEY}&q=environment&language=en`;


// 1. VIDEO CARD LOGIC (AUDIO DESCRIPTION)
const speakBtnVideo = document.getElementById('speakBtnVideo');

if (speakBtnVideo) {
    speakBtnVideo.addEventListener('click', () => {
        if ('speechSynthesis' in window) {
            // This text matches the description in your HTML
            const text = "Watch the recap of yesterday's community cycling event.";
            const utterance = new SpeechSynthesisUtterance(text);
            
            // Adjust voice speed/pitch
            utterance.rate = 1; 
            utterance.pitch = 1;

            window.speechSynthesis.speak(utterance);
        } else {
            alert("Text-to-Speech is not supported in this browser.");
        }
    });
}


// 2. NEWS API LOGIC (NewsData.io)
const newsContainer = document.getElementById('news-container');

async function fetchNews() {
    try {
        const response = await fetch(NEWS_API_URL);
        const data = await response.json();

        // Check if we got results
        if (data.results && data.results.length > 0) {
            renderNews(data.results);
        } else {
            newsContainer.innerHTML = '<p>No news found.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        // If API fails (or no key), show fake data for demo purposes
        renderFallbackContent(); 
    }
}

function renderNews(articles) {
    newsContainer.innerHTML = ''; // Clear "Loading..." text
    
    // Only show the first 2 articles
    const articlesToShow = articles.slice(0, 2);

    articlesToShow.forEach(article => {
        const imageUrl = article.image_url ? article.image_url : 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=600';
        
        const cardHTML = `
            <div class="card">
                <div class="card-image">
                    <img src="${imageUrl}" alt="News" onerror="this.src='https://placehold.co/400x300?text=No+Image'">
                </div>
                <div class="card-content">
                    <h3>${truncateText(article.title, 45)}</h3>
                    <div class="card-footer">
                        <div class="info-text">
                            <p>${truncateText(article.description || 'Click to read more.', 40)}</p>
                        </div>
                        <a href="${article.link}" target="_blank">
                            <button class="read-btn">Read More</button>
                        </a>
                    </div>
                </div>
            </div>`;
        
        newsContainer.innerHTML += cardHTML;
    });
}

// In case when API fails, show fallback content
function renderFallbackContent() {
    newsContainer.innerHTML = `
        <div class="card">
            <div class="card-image">
                <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600" alt="Water">
            </div>
            <div class="card-content">
                <h3>📉 City Water Quality Improves</h3>
                <div class="card-footer">
                    <div class="info-text"><p>AI data shows reduced pollutants!</p></div>
                    <button class="read-btn">Read more</button>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-image">
                <img src="https://images.unsplash.com/photo-1611288870280-4a39556b3c5a?q=80&w=600" alt="Solar">
            </div>
            <div class="card-content">
                <h3>⚡ New Solar Panels</h3>
                <div class="card-footer">
                    <div class="info-text"><p>Community center goes 100% green.</p></div>
                    <button class="read-btn">Read more</button>
                </div>
            </div>
        </div>`;
}

// Helper: Shorten long text
function truncateText(text, length) {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
}

// Start the News Fetch
fetchNews();