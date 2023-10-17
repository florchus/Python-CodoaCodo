const stars = document.querySelectorAll('.rating > span');
        const ratingValue = document.getElementById('ratingValue');
        let rating = 0;

        stars.forEach((star, index) => {
            star.addEventListener('click', () => {
                rating = index + 1;
                updateRating();
            });

            /* a cada estrella le cambia la clase selected a medida que se pasa el mouse sobre ellas */

            star.addEventListener('mouseover', () => {
                stars.forEach((s, i) => {
                    if (i <= index) {
                        s.classList.add('selected');
                    } else {
                        s.classList.remove('selected');
                    }
                });
            });
            /* este evento reestablece al estado original */
            star.addEventListener('mouseout', () => {
                stars.forEach((s, i) => {
                    s.classList.remove('selected');
                });
                updateRating();
            });
        });

        function updateRating() {
            stars.forEach((star, index) => {
                if (index < rating) {
                    star.classList.add('selected');
                } else {
                    star.classList.remove('selected');
                }
            });
            ratingValue.textContent = rating;
        }