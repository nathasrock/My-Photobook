
const book = document.getElementById("book");
const sheets = Array.from(document.querySelectorAll(".sheet"));

const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const pageIndicator = document.getElementById("pageIndicator");

let currentPage = 0;

function updateBook() {
  sheets.forEach((sheet, index) => {
    const flipped = index < currentPage;

    sheet.classList.toggle("flipped", flipped);

    // Keep the visible pages in the correct stacking order.
    sheet.style.zIndex = flipped
      ? index + 1
      : sheets.length - index + 1;
  });

  prevBtn.disabled = currentPage === 0;
  nextBtn.disabled = currentPage === sheets.length;

  if (currentPage === 0) {
    pageIndicator.textContent = "Cover";
  } else if (currentPage === sheets.length) {
    pageIndicator.textContent = "Finished";
  } else {
    pageIndicator.textContent = `Page ${currentPage + 1}`;
  }
}

function nextPage() {
  if (currentPage < sheets.length) {
    currentPage++;
    updateBook();
  }
}

function previousPage() {
  if (currentPage > 0) {
    currentPage--;
    updateBook();
  }
}

nextBtn.addEventListener("click", nextPage);
prevBtn.addEventListener("click", previousPage);

// Keyboard navigation
document.addEventListener("keydown", (event) => {
  if (event.key === "ArrowRight") {
    nextPage();
  }

  if (event.key === "ArrowLeft") {
    previousPage();
  }
});

// Initial setup
updateBook();
