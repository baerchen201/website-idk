// Based on https://www.a1k0n.net/js/donut.js
// modified to work with any website and to be easier to read

let A = 1,
  B = 1;
const donut_elements = document.getElementsByClassName("donut");

setInterval(() => {
  const out = [];
  const z = [];
  A += 0.07;
  B += 0.03;
  let cosA = Math.cos(A),
    sinA = Math.sin(A),
    cosB = Math.cos(B),
    sinB = Math.sin(B);
  for (let k = 0; k < 1760; k++) {
    out[k] = k % 80 == 79 ? "\n" : " ";
    z[k] = 0;
  }
  for (let theta = 0; theta < 6.28; theta += 0.07) {
    let cosTheta = Math.cos(theta),
      sinTheta = Math.sin(theta);
    for (phi = 0; phi < 6.28; phi += 0.02) {
      let sinPhi = Math.sin(phi),
        cosPhi = Math.cos(phi),
        h = cosTheta + 2, // R1 + R2*cos(theta)
        D = 1 / (sinPhi * h * sinA + sinTheta * cosA + 5), // this is 1/z
        t = sinPhi * h * cosA - sinTheta * sinA; // this is a clever factoring of some of the terms in x' and y'

      let x = 0 | (40 + 30 * D * (cosPhi * h * cosB - t * sinB)),
        y = 0 | (12 + 15 * D * (cosPhi * h * sinB + t * cosB)),
        o = x + 80 * y,
        N =
          0 |
          (8 *
            ((sinTheta * sinA - sinPhi * cosTheta * cosA) * cosB -
              sinPhi * cosTheta * sinA -
              sinTheta * cosA -
              cosPhi * cosTheta * sinB));
      if (y < 22 && y >= 0 && x >= 0 && x < 79 && D > z[o]) {
        z[o] = D;
        out[o] = ".,-~:;=!*#$@"[N > 0 ? N : 0];
      }
    }
  }

  for (let i = 0; i < donut_elements.length; i++) {
    donut_elements[i].innerHTML = out.join("");
  }
}, 50);
