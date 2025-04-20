function filterImages(type) {
    const allImages = document.querySelectorAll('.gallery img');

    allImages.forEach(img => {
        img.classList.remove('hidden');
    });

    if (type === 'nature') {
        allImages.forEach(img => {
            if (!img.classList.contains('nature')) {
                img.classList.add('hidden');
            }
        });
    } else if (type === 'city') {
        allImages.forEach(img => {
            if (!img.classList.contains('city')) {
                img.classList.add('hidden');
            }
        });
    }
}