#include ../shaders/constants;
#include ../shaders/perlinNoise;

attribute vec3 aRandom;
attribute float aSize;

uniform float time;
uniform float uBaseBubbleSize;

varying vec2 vUv;

const float SLOWDOWN = 0.00005;

vec3 getCurve(float progress) {
    float angle = 2.0 * PI * progress;
    float x = sin(angle) + 2.0 * sin(2.0 * angle);
    float y = cos(angle) - 2.0 * cos(2.0 * angle);
    float z = -sin(3.0 * angle);
    return vec3(x, y, z);
}

vec3 getTangentOfCurve(float progress) {
    float angle = 2.0 * PI * progress;
    float x = cos(angle) + 4.0 * cos(2.0 * angle);
    float y = -sin(angle) + 4.0 * sin(2.0 * angle);
    float z = -3.0 * cos(3.0 * angle);
    return normalize(vec3(x, y, z));
}

vec3 getNormalOfCurve(float progress) {
    float angle = 2.0 * PI * progress;
    float x = -sin(angle) - 8.0 * sin(2.0 * angle);
    float y = -cos(angle) + 8.0 * cos(2.0 * angle);
    float z = 9.0 * sin(3.0 * angle);
    return normalize(vec3(x, y, z));
}

vec3 getPositionOnWaterstreamCurve(float progress) {
    vec3 positionOnCurve = getCurve(progress);
    vec3 tangent = getTangentOfCurve(progress);
    vec3 normal = getNormalOfCurve(progress);
    vec3 binormal = normalize(cross(normal, tangent));

    float radius = 0.3 + aRandom.z * 0.1;
    float rotationProgress = 2.0 * PI * perlin(vec2(SLOWDOWN * time), 2.) * aRandom.x + 7.0 * aRandom.y;
    float rotationA = radius * cos(rotationProgress);
    float rotationB = radius * sin(rotationProgress);
    return positionOnCurve + normal * rotationA + binormal * rotationB;

}

void main() {
    vUv = uv;

    float progress = fract(SLOWDOWN * time + aRandom.x);
    vec3 positionOnCurve = getPositionOnWaterstreamCurve(progress);

    vec4 modelViewPosition = modelViewMatrix * vec4(positionOnCurve, 1.0);
    gl_PointSize = uBaseBubbleSize * length(aRandom) * aSize * (-1.0 / modelViewPosition.z);
    gl_Position = projectionMatrix * modelViewPosition;
}
