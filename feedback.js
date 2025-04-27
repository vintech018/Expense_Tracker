document.addEventListener("DOMContentLoaded", () => {
    const feedbackForm = document.getElementById("feedbackForm");
    const ratingStars = document.querySelectorAll(".rating-wrapper i");
    const ratingInput = document.getElementById("feedbackRating");
    
    // Star rating functionality
    ratingStars.forEach(star => {
        star.addEventListener("click", () => {
            const rating = parseInt(star.getAttribute("data-rating"));
            ratingInput.value = rating;
            
            // Update star visuals
            ratingStars.forEach(s => {
                const sRating = parseInt(s.getAttribute("data-rating"));
                s.classList.toggle("active", sRating <= rating);
            });
        });
        
        star.addEventListener("mouseover", () => {
            const rating = parseInt(star.getAttribute("data-rating"));
            ratingStars.forEach(s => {
                const sRating = parseInt(s.getAttribute("data-rating"));
                s.classList.toggle("active", sRating <= rating);
            });
        });
    });
    
    // Reset stars when mouse leaves rating wrapper
    document.querySelector(".rating-wrapper").addEventListener("mouseleave", () => {
        const currentRating = parseInt(ratingInput.value);
        ratingStars.forEach(s => {
            const sRating = parseInt(s.getAttribute("data-rating"));
            s.classList.toggle("active", sRating <= currentRating);
        });
    });
    
    // Show notification toast
    function showNotification(message) {
        const notification = document.createElement('div');
        notification.className = 'notification';
        notification.innerHTML = `
            <i class="fas fa-check-circle"></i>
            <span>${message}</span>
        `;
        
        document.body.appendChild(notification);
        setTimeout(() => notification.classList.add('show'), 10);
        
        setTimeout(() => {
            notification.classList.remove('show');
            setTimeout(() => notification.remove(), 300);
        }, 3000);
    }
    
    // Handle form submission
    feedbackForm.addEventListener("submit", (e) => {
        e.preventDefault();
        
        const feedback = {
            type: document.getElementById("feedbackType").value,
            title: document.getElementById("feedbackTitle").value,
            message: document.getElementById("feedbackMessage").value,
            rating: parseInt(ratingInput.value),
            timestamp: new Date().toISOString()
        };
        
        // Store feedback in localStorage
        const feedbacks = JSON.parse(localStorage.getItem("bankroll_feedbacks") || "[]");
        feedbacks.push(feedback);
        localStorage.setItem("bankroll_feedbacks", JSON.stringify(feedbacks));
        
        // Reset form
        feedbackForm.reset();
        ratingStars.forEach(s => s.classList.remove("active"));
        ratingInput.value = "0";
        
        // Show success notification
        showNotification("Thank you for your feedback!");
    });
});