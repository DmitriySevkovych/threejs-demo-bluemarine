uniform sampler2D uSphereNormals;

varying vec2 vUv;

void main() {
    vec2 pointUv = gl_PointCoord.xy;
    float alpha = smoothstep(0.48, 0.5, length(pointUv - vec2(0.5)));
    vec4 normalTexture = texture2D(uSphereNormals, vUv);

    gl_FragColor = vec4(normalTexture.rgb, alpha);
}
