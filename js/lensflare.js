// Fix for Three.js Lensflare implementation
class LensflareElement {
  constructor(texture, size, distance, color) {
    this.texture = texture;
    this.size = size;
    this.distance = distance;
    this.color = color;
  }
}

class Lensflare extends THREE.Object3D {
  constructor() {
    super();
    this.elements = [];
  }

  addElement(element) {
    this.elements.push(element);
  }
}

// Add to THREE namespace
THREE.Lensflare = Lensflare;
THREE.LensflareElement = LensflareElement;
