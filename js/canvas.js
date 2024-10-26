const canvas = document.createElement("canvas");
const sandbox = new GlslCanvas(canvas);

document.body.appendChild(canvas);

const sizer = () => {
  const ww = window.innerWidth;
  const wh = window.innerHeight;
  const dpi = window.devicePixelRatio;

  const s = Math.max(wh, ww);

  canvas.height = s * dpi;
  canvas.width = s * dpi;
  canvas.style.height = s + "px";
  canvas.style.width = s + "px";
};

sizer();

window.addEventListener("resize", () => {
  sizer();
});

sandbox.load(frag);
sandbox.setUniform("seed", Math.random());
