// Wait for the DOM to be fully loaded
document.addEventListener('DOMContentLoaded', function() {
    // Get all category buttons and menu items
    const categoryButtons = document.querySelectorAll('.category-btn');
    const menuItems = document.querySelectorAll('.menu-item');
    const menuCategories = document.querySelectorAll('.menu-category');

    // Add click event listeners to category buttons
    categoryButtons.forEach(button => {
        button.addEventListener('click', function() {
            const category = this.getAttribute('data-category');
            
            // Update active button
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            this.classList.add('active');
            
            // Show all items first
            menuItems.forEach(item => {
                item.style.display = 'block';
            });
            
            // If not 'all', hide items that don't match the category
            if (category !== 'all') {
                menuItems.forEach(item => {
                    const itemCategory = item.getAttribute('data-category');
                    if (itemCategory !== category) {
                        item.style.display = 'none';
                    }
                });
            }
            
            // Update category sections visibility
            updateCategorySections();
        });
    });
    
    // Function to update category sections visibility
    function updateCategorySections() {
        const activeCategory = document.querySelector('.category-btn.active').getAttribute('data-category');
        
        menuCategories.forEach(categorySection => {
            const categoryTitle = categorySection.querySelector('.category-title');
            const menuGrid = categorySection.querySelector('.menu-grid');
            const itemsInCategory = menuGrid.querySelectorAll('.menu-item');
            
            // Count visible items in this category
            let visibleItems = 0;
            itemsInCategory.forEach(item => {
                if (item.style.display !== 'none') {
                    visibleItems++;
                }
            });
            
            // Show/hide entire category section based on visible items
            if (activeCategory === 'all' || visibleItems > 0) {
                categorySection.style.display = 'block';
                menuGrid.style.display = 'grid';
            } else {
                categorySection.style.display = 'none';
            }
        });
    }
    
    // Initialize the view
    updateCategorySections();
});
