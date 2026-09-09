/* ==========================================
   YOUR PHOTOS
========================================== */

const photos = [
    "photos/001.jpg",
    "photos/002.jpg",
    "photos/003.jpg",
    "photos/004.jpg",
    "photos/005.jpg"
];


let currentPhoto = 0;


/* ==========================================
   GET HTML ELEMENTS
========================================== */

const gallery =
    document.getElementById("gallery");

const photoGrid =
    document.getElementById("photoGrid");

const viewer =
    document.getElementById("viewer");

const largePhoto =
    document.getElementById("largePhoto");

const photoNumber =
    document.getElementById("photoNumber");

const downloadLink =
    document.getElementById("downloadLink");


/* ==========================================
   CREATE GALLERY
========================================== */

photos.forEach(
    function(photo, index) {

        const card =
            document.createElement("div");

        card.className =
            "photo-card";

        card.setAttribute(
            "data-number",
            index + 1
        );


        const image =
            document.createElement("img");

        image.src = photo;

        image.alt =
            "Engagement Photo " +
            (index + 1);


        /*
           If an image cannot load,
           hide that card.
        */

        image.onerror =
            function() {

                card.style.display =
                    "none";

            };


        card.appendChild(image);


        card.addEventListener(
            "click",
            function() {

                openPhoto(index);

            }
        );


        photoGrid.appendChild(card);

    }
);


/* ==========================================
   OPEN GALLERY
========================================== */

function openGallery() {

    gallery.scrollIntoView({
        behavior: "smooth"
    });

}


/* ==========================================
   OPEN PHOTO
========================================== */

function openPhoto(index) {

    currentPhoto = index;

    updatePhoto();

    viewer.classList.add("active");

    document.body.style.overflow =
        "hidden";

}


/* ==========================================
   UPDATE PHOTO
========================================== */

function updatePhoto() {

    const photo =
        photos[currentPhoto];


    /*
       Show large image
    */

    largePhoto.src =
        photo;


    /*
       Show photo number
    */

    photoNumber.textContent =
        `${currentPhoto + 1} / ${photos.length}`;


    /*
       IMPORTANT:
       Set the actual download file.
    */

    downloadLink.href =
        photo;


    downloadLink.download =
        `engagement-photo-${currentPhoto + 1}.jpg`;

}


/* ==========================================
   CLOSE VIEWER
========================================== */

function closeViewer() {

    viewer.classList.remove(
        "active"
    );

    document.body.style.overflow =
        "";

}


/* ==========================================
   NEXT PHOTO
========================================== */

function nextPhoto() {

    currentPhoto++;

    if (
        currentPhoto >=
        photos.length
    ) {

        currentPhoto = 0;

    }

    updatePhoto();

}


/* ==========================================
   PREVIOUS PHOTO
========================================== */

function previousPhoto() {

    currentPhoto--;

    if (
        currentPhoto < 0
    ) {

        currentPhoto =
            photos.length - 1;

    }

    updatePhoto();

}


/* ==========================================
   BACK TO START
========================================== */

function goToStart() {

    document
        .getElementById("startPage")
        .scrollIntoView({
            behavior: "smooth"
        });

}


/* ==========================================
   KEYBOARD
========================================== */

document.addEventListener(
    "keydown",
    function(event) {

        if (
            !viewer.classList.contains(
                "active"
            )
        ) {

            return;

        }


        if (
            event.key ===
            "ArrowRight"
        ) {

            nextPhoto();

        }


        if (
            event.key ===
            "ArrowLeft"
        ) {

            previousPhoto();

        }


        if (
            event.key ===
            "Escape"
        ) {

            closeViewer();

        }

    }
);


/* ==========================================
   CLICK OUTSIDE PHOTO = CLOSE
========================================== */

viewer.addEventListener(
    "click",
    function(event) {

        if (
            event.target === viewer
        ) {

            closeViewer();

        }

    }
);


/* ==========================================
   MOBILE SWIPE
========================================== */

let touchStartX = 0;

let touchEndX = 0;


viewer.addEventListener(
    "touchstart",
    function(event) {

        touchStartX =
            event.changedTouches[0]
                .screenX;

    },
    {
        passive: true
    }
);


viewer.addEventListener(
    "touchend",
    function(event) {

        touchEndX =
            event.changedTouches[0]
                .screenX;

        handleSwipe();

    },
    {
        passive: true
    }
);


function handleSwipe() {

    const difference =
        touchStartX - touchEndX;


    /*
       Ignore very small movements.
    */

    if (
        Math.abs(difference) < 50
    ) {

        return;

    }


    if (
        difference > 0
    ) {

        nextPhoto();

    } else {

        previousPhoto();

    }

}