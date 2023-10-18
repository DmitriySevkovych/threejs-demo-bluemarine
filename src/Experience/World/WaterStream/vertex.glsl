varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

void main() {
    vUv = uv;
    vNormal = normal;

    vec4 modelViewPosition = modelViewMatrix * vec4(position, 1.0);
    vWorldPosition = modelViewPosition.xyz;

    gl_Position = projectionMatrix * modelViewPosition;
}
