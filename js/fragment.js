const fragTest = `

void main(){ gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);}

`;

const frag = `

precision highp float;

uniform float u_time;
uniform vec2 u_resolution;
uniform vec2 u_mouse;
uniform float seed;

varying vec2 v_texcoord;

${includes}

void main(void) {
    vec2 uv = v_texcoord;

    // find the distance between mouse and points
    vec2 mouse = u_mouse / u_resolution;
    float dist = distance(uv, mouse);
    float strength = smoothstep(0.5, 0.0, dist);
    
    // Set the hue shift
    float hue = u_time / 100.0 + seed;
    
    // Define two HSV colors
    vec3 hsv1 = vec3(hue, 0.9, 0.85);
    vec3 hsv2 = vec3(hue + 0.07, 0.85, 0.75);
    
    // Convert to RGB
    vec3 rgb1 = hsv2rgb(hsv1);
    vec3 rgb2 = hsv2rgb(hsv2);
    
    vec4 color1 = vec4(rgb1, 1.0);
    vec4 color2 = vec4(rgb2, 1.0);
    
    // Grain effect
    float grain = rand(uv) * mix(0.1, 0.01, strength);
    
    // Movement for fbm
    vec2 movement = vec2(u_time * 0.01, u_time * -0.01);
    movement *= rotation2d(u_time * 0.005);
    
    // Apply fractional Brownian motion
    float f = fbm(uv + movement + seed);
    f *= 10.0;
    f += grain;
    f += u_time * 0.2;
    f = fract(f);
    
    // Create a smooth mixing factor
    float gap = mix(0.5, 0.01, strength);
    float mixer = smoothstep(0.0, gap, f) - smoothstep(1.0 - gap, 1.0, f);
  
    // Mix the colors based on the mixer
    vec4 color = mix(color1, color2, mixer);
    
    // Output the final color
    gl_FragColor = color;
}

`;
