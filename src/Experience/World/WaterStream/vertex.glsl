varying vec2 vUv;

void main() {
    vUv = uv;

    vec4 modelViwPosition = modelViewMatrix * vec4(position, 1.);
    gl_PointSize = 10. * (-1. / modelViwPosition.z);
    gl_Position = projectionMatrix * modelViwPosition;
}
