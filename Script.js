gsap.registerPlugin(ScrollTrigger);

const canvas = document.getElementById("sequence");
const context = canvas.getContext("2d");

canvas.width = 1920;
canvas.height = 1080;

// Total image frames
const frameCount = 152; 
const images = [];
const sequence = { frame: 1 };

// Image file path (00XX.jpg style)
function frameFile(index) {
  return `frames/ezgif-frame-${index.toString().padStart(3, "0")}.png`;
}

// Preload images
for (let i = 1; i <= frameCount; i++) {
  const img = new Image();
  img.src = frameFile(i);
  images.push(img);
}

// Draw image
function render() {
  const img = images[sequence.frame];
  if (img) {
    context.clearRect(0, 0, canvas.width, canvas.height);
    context.drawImage(img, 0, 0, canvas.width, canvas.height);
  }
}

// ScrollTrigger Animation
gsap.to(sequence, {
  frame: frameCount - 1,
  snap: "frame",
  ease: "none",
  scrollTrigger: {
    trigger: ".scroll-area",
    start: "top top",
    end: "bottom bottom",
    scrub: 1
  },
  onUpdate: render
});

// Render first frame when loaded
images[1].onload = render;
