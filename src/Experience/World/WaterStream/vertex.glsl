attribute vec3 aRandom;
attribute float aSize;

uniform float time;

varying vec2 vUv;

float PI = 3.14159265359;

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
    float displacementA =
        radius *
        cos(2.0 * PI * (1.0 + 0.0001 * time) * aRandom.x + 7.0 * aRandom.y);
    float displacementB =
        radius *
        sin(2.0 * PI * (1.0 + 0.0001 * time) * aRandom.x + 7.0 * aRandom.y);
    return positionOnCurve + normal * displacementA + binormal * displacementB;

}

void main() {
    vUv = uv;

    float progress = fract(0.0001 * time + aRandom.x);
    vec3 positionOnCurve = getPositionOnWaterstreamCurve(progress);

    vec4 modelViewPosition = modelViewMatrix * vec4(positionOnCurve, 1.0);
    gl_PointSize =
        50.0 * length(aRandom) * aSize * (-1.0 / modelViewPosition.z);
    gl_Position = projectionMatrix * modelViewPosition;
}
