/* =========================
   ALL PHOTOS
========================= */

const photos = [
    "photos/001.jpeg",
    "photos/002.jpeg",
    "photos/003.jpeg",
    "photos/004.jpeg",
    "photos/005.jpeg",
    "photos/006.jpeg",
    "photos/007.jpeg",
    "photos/008.jpeg",
    "photos/009.jpeg",
    "photos/010.jpeg",
    "photos/011.jpeg",
    "photos/012.jpeg"
];


/* =========================
   SETTINGS
========================= */

const photosPerPage = 12;

let currentPage = 1;

let currentPhoto = 0;


/* =========================
   ELEMENTS
========================= */

const photoGrid =
    document.getElementById("photoGrid");

const pagination =
    document.getElementById("pagination");

const viewer =
    document.getElementById("viewer");

const largePhoto =
    document.getElementById("largePhoto");

const photoNumber =
    document.getElementById("photoNumber");

const downloadLink =
    document.getElementById("downloadLink");


/* =========================
   TOTAL PAGES
========================= */

function getTotalPages() {

    return Math.ceil(
        photos.length / photosPerPage
    );
}


/* =========================
   CREATE GALLERY
========================= */

function showPage(page) {

    const totalPages = getTotalPages();

    if (page < 1) {
        page = 1;
    }

    if (page > totalPages) {
        page = totalPages;
    }

    currentPage = page;

    photoGrid.innerHTML = "";


    const startIndex =
        (currentPage - 1) * photosPerPage;

    const endIndex =
        Math.min(
            startIndex + photosPerPage,
            photos.length
        );


    for (
        let index = startIndex;
        index < endIndex;
        index++
    ) {

        const card =
            document.createElement("div");

        card.className =
            "photo-card";


        const image =
            document.createElement("img");

        image.src =
            photos[index];

        image.alt =
            `Engagement photo ${index + 1}`;

        image.loading =
            "lazy";


        card.appendChild(image);


        card.addEventListener(
            "click",
            () => {
                openPhoto(index);
            }
        );


        photoGrid.appendChild(card);
    }


    createPagination();


    window.scrollTo({
        top: document.getElementById("gallery").offsetTop,
        behavior: "smooth"
    });
}


/* =========================
   PAGINATION
========================= */

function createPagination() {

    pagination.innerHTML = "";

    const totalPages =
        getTotalPages();


    /* Previous button */

    const previousButton =
        document.createElement("button");

    previousButton.className =
        "page-arrow";

    previousButton.innerHTML =
        "‹";

    previousButton.disabled =
        currentPage === 1;

    previousButton.onclick =
        () => showPage(currentPage - 1);

    pagination.appendChild(
        previousButton
    );


    /* Page numbers */

    for (
        let page = 1;
        page <= totalPages;
        page++
    ) {

        const pageButton =
            document.createElement("button");

        pageButton.className =
            "page-btn";

        pageButton.textContent =
            page;


        if (page === currentPage) {
            pageButton.classList.add(
                "active"
            );
        }


        pageButton.onclick =
            () => showPage(page);


        pagination.appendChild(
            pageButton
        );
    }


    /* Next button */

    const nextButton =
        document.createElement("button");

    nextButton.className =
        "page-arrow";

    nextButton.innerHTML =
        "›";

    nextButton.disabled =
        currentPage === totalPages;

    nextButton.onclick =
        () => showPage(currentPage + 1);

    pagination.appendChild(
        nextButton
    );
}


/* =========================
   OPEN GALLERY
========================= */

function openGallery() {

    document
        .getElementById("gallery")
        .scrollIntoView({
            behavior: "smooth"
        });
}


/* =========================
   OPEN PHOTO
========================= */

function openPhoto(index) {

    currentPhoto = index;

    updateViewer();

    viewer.classList.add(
        "active"
    );

    document.body.style.overflow =
        "hidden";
}


/* =========================
   UPDATE VIEWER
========================= */

function updateViewer() {

    const photo =
        photos[currentPhoto];


    largePhoto.src =
        photo;

    largePhoto.alt =
        `Engagement photo ${currentPhoto + 1}`;


    photoNumber.textContent =
        `${currentPhoto + 1} / ${photos.length}`;


    downloadLink.href =
        photo;

    downloadLink.download =
        `engagement-photo-${currentPhoto + 1}.jpeg`;
}


/* =========================
   NEXT PHOTO
========================= */

function nextPhoto() {

    currentPhoto++;

    if (
        currentPhoto >= photos.length
    ) {

        currentPhoto = 0;
    }

    updateViewer();
}


/* =========================
   PREVIOUS PHOTO
========================= */

function previousPhoto() {

    currentPhoto--;

    if (currentPhoto < 0) {

        currentPhoto =
            photos.length - 1;
    }

    updateViewer();
}


/* =========================
   CLOSE VIEWER
========================= */

function closeViewer() {

    viewer.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";
}


/* =========================
   BACK TO BEGINNING
========================= */

function goToStart() {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}


/* =========================
   KEYBOARD CONTROLS
========================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !viewer.classList.contains(
                "active"
            )
        ) {
            return;
        }


        if (
            event.key === "ArrowRight"
        ) {
            nextPhoto();
        }


        if (
            event.key === "ArrowLeft"
        ) {
            previousPhoto();
        }


        if (
            event.key === "Escape"
        ) {
            closeViewer();
        }
    }
);


/* =========================
   CLOSE OUTSIDE VIEWER
========================= */

viewer.addEventListener(
    "click",
    (event) => {

        if (
            event.target === viewer
        ) {
            closeViewer();
        }
    }
);


/* =========================
   MOBILE SWIPE
========================= */

let touchStartX = 0;

let touchEndX = 0;


viewer.addEventListener(
    "touchstart",
    (event) => {

        touchStartX =
            event.changedTouches[0]
                .screenX;
    }
);


viewer.addEventListener(
    "touchend",
    (event) => {

        touchEndX =
            event.changedTouches[0]
                .screenX;


        const swipeDistance =
            touchEndX - touchStartX;


        if (
            Math.abs(swipeDistance) < 50
        ) {
            return;
        }


        if (
            swipeDistance < 0
        ) {
            nextPhoto();
        } else {
            previousPhoto();
        }
    }
);


/* =========================
   START GALLERY
========================= */

showPage(1);
