document.addEventListener('DOMContentLoaded', () => {
    const faqContainer = document.getElementById('faqContainer');
    const searchInput = document.getElementById('searchInput');

    // Fetch the JSON data for the questions
    fetch('questions.json')
        .then(response => response.json())
        .then(data => {
            renderFAQ(data);
        })
        .catch(error => {
            console.error('Error loading FAQ data:', error);
            faqContainer.innerHTML = '<p style="text-align:center; color: #ef4444;">Error loading data. Please ensure you are running this on a web server (not directly from file).</p>';
        });

    // Render HTML from questions.json
    function renderFAQ(categories) {
        faqContainer.innerHTML = ''; // clear loading state

        categories.forEach(cat => {
            const catDiv = document.createElement('div');
            catDiv.className = 'category';

            const catTitle = document.createElement('h2');
            catTitle.className = 'category-title';
            catTitle.textContent = cat.category;
            catDiv.appendChild(catTitle);

            cat.items.forEach(item => {
                const details = document.createElement('details');
                details.className = 'faq-item';

                const summary = document.createElement('summary');
                summary.textContent = item.question;

                const answerDiv = document.createElement('div');
                answerDiv.className = 'answer';
                answerDiv.innerHTML = `<p>${item.answer}</p>`;

                details.appendChild(summary);
                details.appendChild(answerDiv);
                catDiv.appendChild(details);
            });

            faqContainer.appendChild(catDiv);
        });
    }

    // search functionality
    searchInput.addEventListener('keyup', function(e) {
        const term = e.target.value.toLowerCase();
        const categories = document.querySelectorAll('.category');
        
        categories.forEach(category => {
            const questions = category.querySelectorAll('.faq-item');
            let hasVisibleQuestions = false;

            questions.forEach(question => {
                const text = question.innerText.toLowerCase();

                if(text.includes(term)) {
                    question.classList.remove('hidden');
                    if(term.length > 2) {
                        question.setAttribute('open', true);
                    }
                    hasVisibleQuestions = true;
                } else {
                    question.classList.add('hidden');
                    question.removeAttribute('open');
                }
            });

            if(hasVisibleQuestions) {
                category.classList.remove('hidden');
            } else {
                category.classList.add('hidden');
            }
        });
    });
});

