uniform float time;
uniform sampler2D uWaterStream;
uniform sampler2D uWaterStreamNoise;

varying vec2 vUv;
varying vec3 vNormal;
varying vec3 vWorldPosition;

const float SLOWDOWN = 0.00007;

vec3 getViewDirection() {
    return normalize(cameraPosition - vWorldPosition);
}

void main() {
    vec4 waterStreamTexture1 = texture2D(uWaterStream, vUv - vec2(SLOWDOWN * time));
    vec4 waterStreamTexture2 = texture2D(uWaterStream, vUv - vec2(1.5 * SLOWDOWN * time));
    vec4 waterStreamNoiseTexture = texture2D(uWaterStreamNoise, vUv * vec2(8., 4.) - vec2(SLOWDOWN * time));

    float alpha = min(waterStreamTexture1.r, waterStreamTexture2.r) + waterStreamNoiseTexture.r;

    float fresnel = pow(dot(getViewDirection(), vNormal), 3.0);

    gl_FragColor = vec4(vec3(1.), alpha * fresnel);
}
