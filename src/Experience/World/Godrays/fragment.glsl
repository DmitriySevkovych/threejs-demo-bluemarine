#include ../shaders/perlinNoise;

uniform float time;
uniform sampler2D uNoise;
uniform vec2 uGodraysSource;

varying vec2 vUv;
varying vec3 vWorldPosition;

const float SLOWDOWN = 0.00005;

void main() {

    vec2 godraySource = vWorldPosition.xy - uGodraysSource;
    float godrayUv = atan(godraySource.y, godraySource.x);

    vec4 godraysTexture1 = texture2D(uNoise, vec2(godrayUv, 0) + SLOWDOWN * time);
    vec4 godraysTexture2 = texture2D(uNoise, vec2(0.3, godrayUv) + 1.5 * SLOWDOWN * time);

    float godrays = min(godraysTexture1.x, godraysTexture2.x);

    float fade = smoothstep(0.15, 0.7, abs(vUv.y));

    float alpha = 0.15 * fade * godrays;

    gl_FragColor = vec4(vec3(godrays), alpha);
}
