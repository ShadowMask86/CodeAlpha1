// Wait for page to load
document.addEventListener('DOMContentLoaded', function() {
    
    // Get all the elements we need
    const filterButtons = document.querySelectorAll('.filter-btn');
    const galleryItems = document.querySelectorAll('.gallery-item');
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightboxImg');
    const lightboxCaption = document.getElementById('lightboxCaption');
    const closeBtn = document.getElementById('closeBtn');
    const prevBtn = document.getElementById('prevBtn');
    const nextBtn = document.getElementById('nextBtn');
    
    let currentImageIndex = 0;
    let visibleImages = [...galleryItems]; // Array of currently visible images
    
    // 1. FILTER FUNCTIONALITY
    filterButtons.forEach(button => {
        button.addEventListener('click', function() {
            
            // Remove 'active' class from all buttons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            
            // Add 'active' class to clicked button
            this.classList.add('active');
            
            // Get the filter category
            const filterValue = this.getAttribute('data-filter');
            
            // Show/hide images based on filter
            galleryItems.forEach(item => {
                const itemCategory = item.getAttribute('data-category');
                
                if (filterValue === 'all' || itemCategory === filterValue) {
                    item.classList.remove('hidden');
                } else {
                    item.classList.add('hidden');
                }
            });
            
            // Update visible images array for lightbox navigation
            updateVisibleImages();
        });
    });
    
    // 2. LIGHTBOX FUNCTIONALITY
    // Open lightbox when image is clicked
    galleryItems.forEach((item, index) => {
        item.addEventListener('click', function() {
            const img = this.querySelector('img');
            const title = this.querySelector('h3').textContent;
            const description = this.querySelector('p').textContent;
            
            // Set lightbox content
            lightboxImg.src = img.src;
            lightboxImg.alt = img.alt;
            lightboxCaption.textContent = title + ' - ' + description;
            
            // Find current image index in visible images
            currentImageIndex = visibleImages.indexOf(item);
            
            // Show lightbox
            lightbox.style.display = 'block';
            
            // Prevent body scroll
            document.body.style.overflow = 'hidden';
        });
    });
    
    // Close lightbox
    closeBtn.addEventListener('click', closeLightbox);
    
    // Close lightbox when clicking outside image
    lightbox.addEventListener('click', function(e) {
        if (e.target === lightbox) {
            closeLightbox();
        }
    });
    
    // Close lightbox with Escape key
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            closeLightbox();
        }
        if (e.key === 'ArrowLeft') {
            showPrevImage();
        }
        if (e.key === 'ArrowRight') {
            showNextImage();
        }
    });
    
    // Navigation buttons
    prevBtn.addEventListener('click', showPrevImage);
    nextBtn.addEventListener('click', showNextImage);
    
    // 3. HELPER FUNCTIONS
    function closeLightbox() {
        lightbox.style.display = 'none';
        document.body.style.overflow = 'auto'; // Restore body scroll
    }
    
    function updateVisibleImages() {
        visibleImages = [...galleryItems].filter(item => 
            !item.classList.contains('hidden')
        );
    }
    
    function showPrevImage() {
        currentImageIndex--;
        if (currentImageIndex < 0) {
            currentImageIndex = visibleImages.length - 1; // Loop to last image
        }
        updateLightboxImage();
    }
    
    function showNextImage() {
        currentImageIndex++;
        if (currentImageIndex >= visibleImages.length) {
            currentImageIndex = 0; // Loop to first image
        }
        updateLightboxImage();
    }
    
    function updateLightboxImage() {
        const currentItem = visibleImages[currentImageIndex];
        const img = currentItem.querySelector('img');
        const title = currentItem.querySelector('h3').textContent;
        const description = currentItem.querySelector('p').textContent;
        
        lightboxImg.src = img.src;
        lightboxImg.alt = img.alt;
        lightboxCaption.textContent = title + ' - ' + description;
    }
    
    // Initialize visible images array
    updateVisibleImages();
    
    console.log('🎉 Gallery loaded successfully!');
});