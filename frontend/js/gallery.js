document.addEventListener('DOMContentLoaded', () => {
  const filterButtons = document.querySelectorAll('.filters button');
  const galleryCards = document.querySelectorAll('.gallery .card');

  filterButtons.forEach(button => {
    button.addEventListener('click', () => {
      // Remove active class from all buttons
      filterButtons.forEach(btn => btn.classList.remove('active'));
      
      // Add active class to clicked button
      button.classList.add('active');

      // Get selected category
      const filterValue = button.getAttribute('data-filter');

      // Filter gallery items
      galleryCards.forEach(card => {
        if (filterValue === 'all' || card.classList.contains(filterValue)) {
          card.classList.remove('hide');
        } else {
          card.classList.add('hide');
        }
      });
    });
  });
});