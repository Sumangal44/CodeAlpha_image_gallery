// Image data
const images = [
  {
    src: "https://picsum.photos/300/300?random=1",
    alt: "Mountain reflection",
    category: "nature",
    height: 300
  },
  {
    src: "https://picsum.photos/300/350?random=2",
    alt: "Modern building",
    category: "architecture",
    height: 350
  },
  {
    src: "https://picsum.photos/300/400?random=3",
    alt: "Woman portrait",
    category: "people",
    height: 400
  },
  {
    src: "https://picsum.photos/300/280?random=4",
    alt: "Tabby cat",
    category: "animals",
    height: 280
  },
  {
    src: "https://picsum.photos/300/320?random=5",
    alt: "Sushi platter",
    category: "food",
    height: 320
  },
  {
    src: "https://picsum.photos/300/380?random=6",
    alt: "Forest path",
    category: "nature",
    height: 380
  },
  {
    src: "https://picsum.photos/300/300?random=7",
    alt: "City skyline",
    category: "architecture",
    height: 300
  },
  {
    src: "https://picsum.photos/300/360?random=8",
    alt: "Man portrait",
    category: "people",
    height: 360
  },
  {
    src: "https://picsum.photos/300/290?random=9",
    alt: "Spaniel dog",
    category: "animals",
    height: 290
  },
  {
    src: "https://picsum.photos/300/310?random=10",
    alt: "Pizza",
    category: "food",
    height: 310
  },
  {
    src: "https://picsum.photos/300/370?random=11",
    alt: "Beach scene",
    category: "nature",
    height: 370
  },
  {
    src: "https://picsum.photos/300/340?random=12",
    alt: "Abstract pattern",
    category: "architecture",
    height: 340
  },
  {
    src: "https://picsum.photos/300/330?random=13",
    alt: "Sunset landscape",
    category: "nature",
    height: 330
  },
  {
    src: "https://picsum.photos/300/350?random=14",
    alt: "Portrait photo",
    category: "people",
    height: 350
  },
  {
    src: "https://picsum.photos/300/300?random=15",
    alt: "Bird photo",
    category: "animals",
    height: 300
  },
  {
    src: "https://picsum.photos/300/320?random=16",
    alt: "Burger meal",
    category: "food",
    height: 320
  },
  {
    src: "https://picsum.photos/300/360?random=17",
    alt: "Lake view",
    category: "nature",
    height: 360
  },
  {
    src: "https://picsum.photos/300/340?random=18",
    alt: "Bridge architecture",
    category: "architecture",
    height: 340
  }
];

let currentCategory = "all";
let searchTerm = "";
let currentImageIndex = 0;
let filteredImages = [];

// DOM elements
const lightbox = document.getElementById("lightbox");
const lightboxImage = document.getElementById("lightboxImage");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");
const closeBtn = document.getElementById("closeBtn");
const imageCounter = document.getElementById("imageCounter");
const searchToggle = document.getElementById("searchToggle");
const mobileSearchOverlay = document.getElementById("mobileSearchOverlay");
const mobileSearchInput = document.getElementById("mobileSearchInput");
const mobileSearchClose = document.getElementById("mobileSearchClose");

// Initialize the gallery
function initGallery() {
  renderImages();
  setupEventListeners();
}

// Get filtered images based on current category and search
function getFilteredImages() {
  return images.filter((image) => {
    const matchesCategory =
      currentCategory === "all" || image.category === currentCategory;
    const matchesSearch =
      searchTerm === "" ||
      image.alt.toLowerCase().includes(searchTerm.toLowerCase()) ||
      image.category.toLowerCase().includes(searchTerm.toLowerCase());
    return matchesCategory && matchesSearch;
  });
}

// Render images based on current filters
function renderImages() {
  const imageGrid = document.getElementById("imageGrid");
  filteredImages = getFilteredImages();

  imageGrid.innerHTML = filteredImages
    .map(
      (image, index) => `
                <div class="image-item" data-category="${image.category}" data-index="${index}">
                    <div class="image-container">
                        <img src="${image.src}" alt="${image.alt}" loading="lazy">
                    </div>
                </div>
            `
    )
    .join("");
}

// Open lightbox
function openLightbox(index) {
  currentImageIndex = index;
  filteredImages = getFilteredImages();

  if (filteredImages.length === 0) return;

  updateLightboxImage();
  lightbox.classList.add("active");
  document.body.style.overflow = "hidden";

  // Focus management for accessibility
  closeBtn.focus();
}

// Close lightbox
function closeLightbox() {
  lightbox.classList.remove("active");
  document.body.style.overflow = "";
  currentImageIndex = 0;
}

// Update lightbox image and navigation
function updateLightboxImage() {
  if (filteredImages.length === 0) return;

  const image = filteredImages[currentImageIndex];
  lightboxImage.src = image.src;
  lightboxImage.alt = image.alt;

  // Update counter
  imageCounter.textContent = `${currentImageIndex + 1} / ${
    filteredImages.length
  }`;

  // Update navigation buttons
  prevBtn.disabled = currentImageIndex === 0;
  nextBtn.disabled = currentImageIndex === filteredImages.length - 1;
}

// Navigate to previous image
function prevImage() {
  if (currentImageIndex > 0) {
    currentImageIndex--;
    updateLightboxImage();
  }
}

// Navigate to next image
function nextImage() {
  if (currentImageIndex < filteredImages.length - 1) {
    currentImageIndex++;
    updateLightboxImage();
  }
}

// Open mobile search
function openMobileSearch() {
  mobileSearchOverlay.classList.add("active");
  document.body.style.overflow = "hidden";
  mobileSearchInput.focus();
}

// Close mobile search
function closeMobileSearch() {
  mobileSearchOverlay.classList.remove("active");
  document.body.style.overflow = "";
}

// Setup event listeners
function setupEventListeners() {
  // Category filter buttons
  const categoryButtons = document.querySelectorAll(".category-btn");
  categoryButtons.forEach((button) => {
    button.addEventListener("click", () => {
      // Remove active class from all buttons
      categoryButtons.forEach((btn) => btn.classList.remove("active"));
      // Add active class to clicked button
      button.classList.add("active");
      // Update current category
      currentCategory = button.dataset.category;
      // Re-render images
      renderImages();
    });
  });

  // Desktop search input
  const searchInput = document.getElementById("searchInput");
  if (searchInput) {
    searchInput.addEventListener("input", (e) => {
      searchTerm = e.target.value;
      renderImages();
    });
  }

  // Mobile search functionality
  searchToggle.addEventListener("click", openMobileSearch);
  mobileSearchClose.addEventListener("click", closeMobileSearch);

  mobileSearchInput.addEventListener("input", (e) => {
    searchTerm = e.target.value;
    renderImages();
  });

  // Close mobile search when clicking overlay
  mobileSearchOverlay.addEventListener("click", (e) => {
    if (e.target === mobileSearchOverlay) {
      closeMobileSearch();
    }
  });

  // Navigation links
  const navLinks = document.querySelectorAll(".nav a");
  navLinks.forEach((link) => {
    link.addEventListener("click", (e) => {
      e.preventDefault();
      navLinks.forEach((l) => l.classList.remove("active"));
      link.classList.add("active");
    });
  });

  // Image click events
  document.addEventListener("click", (e) => {
    const imageItem = e.target.closest(".image-item");
    if (imageItem) {
      const index = parseInt(imageItem.dataset.index);
      openLightbox(index);
    }
  });

  // Lightbox navigation
  prevBtn.addEventListener("click", prevImage);
  nextBtn.addEventListener("click", nextImage);
  closeBtn.addEventListener("click", closeLightbox);

  // Close lightbox when clicking outside image
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      closeLightbox();
    }
  });

  // Keyboard navigation
  document.addEventListener("keydown", (e) => {
    // Handle mobile search
    if (mobileSearchOverlay.classList.contains("active")) {
      if (e.key === "Escape") {
        closeMobileSearch();
      }
      return;
    }

    // Handle lightbox
    if (!lightbox.classList.contains("active")) return;

    switch (e.key) {
      case "Escape":
        closeLightbox();
        break;
      case "ArrowLeft":
        e.preventDefault();
        prevImage();
        break;
      case "ArrowRight":
        e.preventDefault();
        nextImage();
        break;
    }
  });

  // Touch/swipe support for mobile
  let touchStartX = 0;
  let touchEndX = 0;

  lightbox.addEventListener(
    "touchstart",
    (e) => {
      touchStartX = e.changedTouches[0].screenX;
    },
    { passive: true }
  );

  lightbox.addEventListener(
    "touchend",
    (e) => {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    },
    { passive: true }
  );

  function handleSwipe() {
    const swipeThreshold = 50;
    const diff = touchStartX - touchEndX;

    if (Math.abs(diff) > swipeThreshold) {
      if (diff > 0) {
        // Swipe left - next image
        nextImage();
      } else {
        // Swipe right - previous image
        prevImage();
      }
    }
  }
}

// Initialize when DOM is loaded
document.addEventListener("DOMContentLoaded", initGallery);
