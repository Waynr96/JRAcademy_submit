const progress = document.getElementById("progress");
const circles = document.querySelectorAll(".circle");
const prev = document.getElementById("prev");
const next = document.getElementById("next");

let currentActive = 1;
let isLoading = false;

// Simulates an async operation (e.g. API call) with an 800ms delay
function simulateAsyncStep() {
  return new Promise((resolve) => {
    setTimeout(resolve, 800);
  });
}

next.addEventListener("click", async () => {
  if (isLoading || currentActive >= circles.length) return;

  isLoading = true;
  prev.disabled = true;
  next.disabled = true;

  // Show loading state on the upcoming circle while Promise is pending
  circles[currentActive].classList.add("loading");

  await simulateAsyncStep();

  circles[currentActive].classList.remove("loading");
  currentActive++;
  isLoading = false;
  updateStyle();
});

prev.addEventListener("click", () => {
  if (isLoading || currentActive <= 1) return;

  currentActive--;
  updateStyle();
});

function updateStyle() {
  circles.forEach((circle, index) => {
    if (index < currentActive) {
      circle.classList.add("active");
    } else {
      circle.classList.remove("active");
    }
  });

  progress.style.width =
    ((currentActive - 1) / (circles.length - 1)) * 100 + "%";

  prev.disabled = currentActive === 1;
  next.disabled = currentActive === circles.length;
}
