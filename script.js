/* =========================================================
   POLICE DEPARTMENT SLOLINE
   CELOTEN SCRIPT.JS
========================================================= */


/* =========================================================
   STRANI / KATEGORIJE
========================================================= */

const pages =
    document.querySelectorAll(".page");

const navLinks =
    document.querySelectorAll(".nav-link");

const pageButtons =
    document.querySelectorAll("[data-page]");


function openPage(pageName) {

    /*
        Skrijemo vse kategorije.
    */

    pages.forEach((page) => {
        page.classList.remove("active-page");
    });


    /*
        Poiščemo izbrano kategorijo.
    */

    const selectedPage =
        document.querySelector(
            `[data-page-name="${pageName}"]`
        );


    if (!selectedPage) {
        return;
    }


    /*
        Prikažemo izbrano kategorijo.
    */

    selectedPage.classList.add("active-page");


    /*
        Popravimo aktivni gumb v navigaciji.
    */

    navLinks.forEach((link) => {

        link.classList.remove("active");


        if (link.dataset.page === pageName) {
            link.classList.add("active");
        }

    });


    /*
        Na drugih straneh navbar ostane fixed.
    */

    if (pageName === "home") {

        document.body.classList.remove(
            "category-open"
        );

    }

    else {

        document.body.classList.add(
            "category-open"
        );

    }


    /*
        Zapremo lightbox, če je odprt.
    */

    closeGalleryLightbox();


    /*
        Premaknemo pogled na vrh.
    */

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

}


/* =========================================================
   KLIK NA NAVIGACIJO + FOOTER POVEZAVE
========================================================= */

pageButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const pageName =
            button.dataset.page;


        if (!pageName) {
            return;
        }


        openPage(pageName);

    });

});


/* =========================================================
   DOMOV - SCROLL GUMBI
========================================================= */

const homeScrollButtons =
    document.querySelectorAll(
        ".home-scroll-button"
    );


homeScrollButtons.forEach((button) => {

    button.addEventListener("click", () => {

        const targetId =
            button.dataset.target;


        if (!targetId) {
            return;
        }


        const homePage =
            document.querySelector(
                "#page-home"
            );


        /*
            Če uporabnik trenutno ni na Home,
            najprej odpremo Home.
        */

        if (
            !homePage.classList.contains(
                "active-page"
            )
        ) {

            openPage("home");


            /*
                Počakamo trenutek,
                da se Home stran prikaže.
            */

            setTimeout(() => {

                scrollToHomeSection(
                    targetId
                );

            }, 200);

        }

        else {

            scrollToHomeSection(
                targetId
            );

        }

    });

});


function scrollToHomeSection(targetId) {

    const target =
        document.getElementById(
            targetId
        );


    if (!target) {
        return;
    }


    target.scrollIntoView({
        behavior: "smooth",
        block: "start"
    });

}


/* =========================================================
   FAQ
========================================================= */

const faqCards =
    document.querySelectorAll(
        ".faq-card"
    );


faqCards.forEach((card) => {

    const question =
        card.querySelector(
            ".faq-question"
        );

    const answer =
        card.querySelector(
            ".faq-answer"
        );


    if (!question || !answer) {
        return;
    }


    question.addEventListener(
        "click",
        () => {

            const isOpen =
                card.classList.contains(
                    "active"
                );


            /*
                Zapremo vsa vprašanja.
            */

            faqCards.forEach(
                (otherCard) => {

                    otherCard.classList.remove(
                        "active"
                    );


                    const otherAnswer =
                        otherCard.querySelector(
                            ".faq-answer"
                        );


                    if (otherAnswer) {

                        otherAnswer.style.maxHeight =
                            null;

                    }

                }
            );


            /*
                Če kliknjeno ni bilo odprto,
                ga odpremo.
            */

            if (!isOpen) {

                card.classList.add(
                    "active"
                );


                answer.style.maxHeight =
                    answer.scrollHeight +
                    "px";

            }

        }
    );

});


/* =========================================================
   POSODOBITVE
========================================================= */

const updateItems =
    document.querySelectorAll(
        ".update-item"
    );


updateItems.forEach((item) => {

    const header =
        item.querySelector(
            ".update-header"
        );

    const content =
        item.querySelector(
            ".update-content"
        );

    const arrow =
        item.querySelector(
            ".update-arrow"
        );


    if (!header || !content) {
        return;
    }


    /*
        V1.0 je trenutno odprt.
    */

    if (
        item.classList.contains(
            "open"
        )
    ) {

        content.style.maxHeight =
            content.scrollHeight +
            "px";


        if (arrow) {
            arrow.textContent = "↑";
        }

    }


    header.addEventListener(
        "click",
        () => {

            const isOpen =
                item.classList.contains(
                    "open"
                );


            if (isOpen) {

                item.classList.remove(
                    "open"
                );

                content.style.maxHeight =
                    null;


                if (arrow) {
                    arrow.textContent = "↓";
                }

            }

            else {

                item.classList.add(
                    "open"
                );

                content.style.maxHeight =
                    content.scrollHeight +
                    "px";


                if (arrow) {
                    arrow.textContent = "↑";
                }

            }

        }
    );

});


/* =========================================================
   GALERIJA
========================================================= */

const galleryCards =
    document.querySelectorAll(
        ".gallery-card"
    );

const galleryLightbox =
    document.getElementById(
        "galleryLightbox"
    );

const lightboxImage =
    document.getElementById(
        "lightboxImage"
    );

const lightboxClose =
    document.getElementById(
        "lightboxClose"
    );

const lightboxPrev =
    document.getElementById(
        "lightboxPrev"
    );

const lightboxNext =
    document.getElementById(
        "lightboxNext"
    );

const lightboxCounter =
    document.getElementById(
        "lightboxCounter"
    );


const galleryImages =
    Array.from(
        galleryCards
    ).map((card) => {

        return card.dataset.image;

    });


let currentGalleryImage = 0;


/* =========================================================
   ODPIRANJE SLIKE
========================================================= */

galleryCards.forEach(
    (card, index) => {

        card.addEventListener(
            "click",
            () => {

                currentGalleryImage =
                    index;

                openGalleryImage();

            }
        );

    }
);


function openGalleryImage() {

    if (
        !galleryLightbox ||
        !lightboxImage ||
        galleryImages.length === 0
    ) {
        return;
    }


    lightboxImage.src =
        galleryImages[
            currentGalleryImage
        ];


    if (lightboxCounter) {

        lightboxCounter.textContent =
            `${currentGalleryImage + 1} / ${galleryImages.length}`;

    }


    galleryLightbox.classList.add(
        "active"
    );

    document.body.classList.add(
        "lightbox-open"
    );

}


/* =========================================================
   ZAPIRANJE GALERIJE
========================================================= */

function closeGalleryLightbox() {

    if (!galleryLightbox) {
        return;
    }


    galleryLightbox.classList.remove(
        "active"
    );

    document.body.classList.remove(
        "lightbox-open"
    );

}


if (lightboxClose) {

    lightboxClose.addEventListener(
        "click",
        closeGalleryLightbox
    );

}


/* =========================================================
   NASLEDNJA SLIKA
========================================================= */

function nextGalleryImage() {

    if (
        galleryImages.length === 0
    ) {
        return;
    }


    currentGalleryImage++;


    if (
        currentGalleryImage >=
        galleryImages.length
    ) {

        currentGalleryImage = 0;

    }


    openGalleryImage();

}


if (lightboxNext) {

    lightboxNext.addEventListener(
        "click",
        nextGalleryImage
    );

}


/* =========================================================
   PREJŠNJA SLIKA
========================================================= */

function previousGalleryImage() {

    if (
        galleryImages.length === 0
    ) {
        return;
    }


    currentGalleryImage--;


    if (
        currentGalleryImage < 0
    ) {

        currentGalleryImage =
            galleryImages.length - 1;

    }


    openGalleryImage();

}


if (lightboxPrev) {

    lightboxPrev.addEventListener(
        "click",
        previousGalleryImage
    );

}


/* =========================================================
   KLIK NA ČRNO OZADJE
========================================================= */

if (galleryLightbox) {

    galleryLightbox.addEventListener(
        "click",
        (event) => {

            if (
                event.target ===
                galleryLightbox
            ) {

                closeGalleryLightbox();

            }

        }
    );

}


/* =========================================================
   TIPKOVNICA
========================================================= */

document.addEventListener(
    "keydown",
    (event) => {

        if (
            !galleryLightbox ||
            !galleryLightbox.classList.contains(
                "active"
            )
        ) {
            return;
        }


        if (
            event.key === "Escape"
        ) {

            closeGalleryLightbox();

        }


        if (
            event.key === "ArrowRight"
        ) {

            nextGalleryImage();

        }


        if (
            event.key === "ArrowLeft"
        ) {

            previousGalleryImage();

        }

    }
);


/* =========================================================
   RESIZE POPRAVEK
========================================================= */

window.addEventListener(
    "resize",
    () => {

        /*
            FAQ
        */

        faqCards.forEach(
            (card) => {

                if (
                    card.classList.contains(
                        "active"
                    )
                ) {

                    const answer =
                        card.querySelector(
                            ".faq-answer"
                        );


                    if (answer) {

                        answer.style.maxHeight =
                            answer.scrollHeight +
                            "px";

                    }

                }

            }
        );


        /*
            Posodobitve
        */

        updateItems.forEach(
            (item) => {

                if (
                    item.classList.contains(
                        "open"
                    )
                ) {

                    const content =
                        item.querySelector(
                            ".update-content"
                        );


                    if (content) {

                        content.style.maxHeight =
                            content.scrollHeight +
                            "px";

                    }

                }

            }
        );

    }
);


/* =========================================================
   ZAČETNO STANJE
========================================================= */

document.body.classList.remove(
    "category-open"
);