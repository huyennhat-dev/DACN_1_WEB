export const imgZoom = (imgId, rsId) => {
  var img, lens, rs, cx, cy;
  img = document.getElementById(imgId);
  rs = document.getElementById(rsId);

  lens = document.createElement("div");
  lens.setAttribute("class", "img-zoom-lens");

  img.parentElement.insertBefore(lens, img);

  cx = rs.offsetWidth / lens.offsetWidth;
  cy = rs.offsetHeight / lens.offsetHeight;

  rs.style.backgroundImage = `url('${img.src}')`;
  rs.style.backgroundSize = `${img.width * cx}px ${img.height * cy}px`;

  lens.addEventListener("mousemove", moveLens);
  img.addEventListener("mousemove", moveLens);

  lens.addEventListener("touchmove", moveLens);
  img.addEventListener("touchmove", moveLens);

  function moveLens(e) {
    var pos, x, y;
    e.preventDefault();
    pos = getCursorPos(e);
    x = pos.x - lens.offsetWidth / 2;
    y = pos.y - lens.offsetHeight / 2;

    if (x > img.width - lens.offsetWidth) x = img.width - lens.offsetWidth;
    if (x < 0) x = 0;

    if (y > img.height - lens.offsetHeight) y = img.height - lens.offsetHeight;
    if (y < 0) y = 0;

    lens.style.left = x + "px";
    lens.style.top = y + "px";
    rs.style.backgroundPosition = `-${x * cx}px -${y * cy}px`;
  }
  function getCursorPos(e) {
    var a,
      x = 0,
      y = 0;
    e = e || window.event;
    a = img.getBoundingClientRect();
    x = e.pageX - a.left;
    y = e.pageY - a.top;
    x = x - window.pageXOffset;
    y = y - window.pageYOffset;
    return { x: x, y: y };
  }
};