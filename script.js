// Configuration
const API_KEY = 'pub_397edcb634954d01aeee0314fcadcadc'; // <--- PASTE YOUR API KEY HERE
// We search for 'environment' or 'sustainability' to match the app theme
const API_URL = `https://newsdata.io/api/1/news?apikey=${API_KEY}&q=environment&language=en`;

const newsContainer = document.getElementById('news-container');

async function fetchNews() {
    try {
        const response = await fetch(API_URL);
        const data = await response.json();

        if (data.results && data.results.length > 0) {
            renderNews(data.results);
        } else {
            newsContainer.innerHTML = '<p>No news found at the moment.</p>';
        }
    } catch (error) {
        console.error('Error fetching news:', error);
        // Fallback content if API fails (so the UI still looks good for demo)
        renderFallbackContent(); 
    }
}

function renderNews(articles) {
    newsContainer.innerHTML = ''; // Clear loading text

    // We only want to display 2 items to match the UI design
    const articlesToShow = articles.slice(0, 2);

    articlesToShow.forEach(article => {
        // Handle missing images
        const imageUrl = article.image_url ? article.image_url : 'https://images.unsplash.com/photo-1542601906990-b4d3fb778b09?q=80&w=1000';
        
        // Create Card HTML
        const cardHTML = `
            <div class="card">
                <div class="card-image">
                    <img src="${imageUrl}" alt="News Image" onerror="this.src='https://placehold.co/400x300?text=No+Image'">
                </div>
                <div class="card-content">
                    <h3>${truncateText(article.title, 45)}</h3>
                    <div class="card-footer">
                        <div class="info-text">
                            <p>${truncateText(article.description || 'Click to read more details about this topic.', 40)}</p>
                        </div>
                        <a href="${article.link}" target="_blank">
                            <button class="read-btn">Read More</button>
                        </a>
                    </div>
                </div>
            </div>
        `;
        newsContainer.innerHTML += cardHTML;
    });
}

function renderFallbackContent() {
    // This runs if the API Key is invalid or quota exceeded, preserving the UI look
    newsContainer.innerHTML = `
        <div class="card">
            <div class="card-image">
                <img src="https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?q=80&w=600" alt="Recycling">
            </div>
            <div class="card-content">
                <h3>📉 City Water Quality Index Improves</h3>
                <div class="card-footer">
                    <div class="info-text">
                        <p>AI data shows reduced pollutant levels!</p>
                    </div>
                    <button class="read-btn">Read more</button>
                </div>
            </div>
        </div>
        <div class="card">
            <div class="card-image">
                <img src="https://images.unsplash.com/photo-1611288870280-4a39556b3c5a?q=80&w=600" alt="Solar">
            </div>
            <div class="card-content">
                <h3>⚡ New Solar Panels Installed</h3>
                <div class="card-footer">
                    <div class="info-text">
                        <p>Community center goes 100% green.</p>
                    </div>
                    <button class="read-btn">Read more</button>
                </div>
            </div>
        </div>
    `;
}

// Helper function to shorten long text
function truncateText(text, length) {
    if (!text) return '';
    return text.length > length ? text.substring(0, length) + '...' : text;
}

// Initial Call
fetchNews();