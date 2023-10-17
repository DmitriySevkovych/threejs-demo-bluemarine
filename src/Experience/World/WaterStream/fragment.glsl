uniform sampler2D uSphereNormals;
uniform vec3 uBubbleColor;

vec3 getSphereNormal(vec2 uv) {
    vec4 normalTexture = texture2D(uSphereNormals, uv);

    vec3 normal = vec3(2. * normalTexture.xy - 1., 0.);
    normal.z = sqrt(1. - normal.x * normal.x - normal.y * normal.y);
    normal = normalize(normal);

    return normal;
}

void main() {
    vec2 pointUv = gl_PointCoord.xy;
    float alpha = smoothstep(0.5, 0.48, length(pointUv - vec2(0.5)));

    vec3 lightDirection = normalize(vec3(1.));
    vec3 normal = getSphereNormal(pointUv);
    float diffusion = max(0., dot(normal, lightDirection));

    gl_FragColor = vec4(uBubbleColor, alpha * diffusion);
}
