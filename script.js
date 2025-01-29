// Theme Toggle
        const themeToggle = document.getElementById('theme-toggle');
        const htmlElement = document.documentElement;

        // Check saved theme
        const savedTheme = localStorage.getItem('theme') || 'light';
        setTheme(savedTheme);

        themeToggle.addEventListener('change', () => {
            const newTheme = themeToggle.checked ? 'dark' : 'light';
            setTheme(newTheme);
        });

        function setTheme(theme) {
            htmlElement.setAttribute('data-theme', theme);
            localStorage.setItem('theme', theme);
            themeToggle.checked = theme === 'dark';
        }

        // News API
        const API_KEY = 'e789bd8a67e64b0e8abb9ba8abd816e2';
        let currentCategory = 'general';

        // Category Selection
        document.getElementById('categories').addEventListener('click', (e) => {
            if (e.target.classList.contains('category-btn')) {
                document.querySelectorAll('.category-btn').forEach(btn => 
                    btn.classList.remove('active'));
                e.target.classList.add('active');
                currentCategory = e.target.dataset.category;
                fetchNews(currentCategory);
            }
        });

        // Fetch News
        async function fetchNews(category) {
            try {
                const response = await fetch(
                    `https://newsapi.org/v2/top-headlines?country=us&category=${category}&apiKey=${API_KEY}`
                );
                const data = await response.json();
                displayNews(data.articles);
            } catch (error) {
                console.error('Error fetching news:', error);
            }
        }

        // Display News
        function displayNews(articles) {
            const newsGrid = document.getElementById('news-grid');
            newsGrid.innerHTML = articles.map((article, index) => `
                <article class="news-card" style="animation-delay: ${index * 0.1}s">
                    <img src="${article.urlToImage || 'placeholder.jpg'}" 
                         alt="${article.title}"
                         class="news-image"
                         onerror="this.src='placeholder.jpg'">
                    <div class="news-content">
                        <div class="news-category">${currentCategory.toUpperCase()}</div>
                        <h3 class="news-title">${article.title}</h3>
                        <p class="news-description">${article.description || ''}</p>
                        <div class="news-meta">
                            <span>${new Date(article.publishedAt).toLocaleDateString()}</span>
                            <a href="${article.url}" target="_blank">Read More</a>
                        </div>
                    </div>
                </article>
            `).join('');
        }

        // Initialize
        fetchNews(currentCategory);
    