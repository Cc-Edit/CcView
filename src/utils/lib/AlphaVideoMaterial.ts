import { Color, ShaderMaterial, Texture, LinearFilter, Group, Camera } from 'three';

// 递增递减标记
enum flagType {
  add,
  sub
}

// 自定义Material，实现视频图像绿幕抠图
export default class ChromaKeyMaterial extends ShaderMaterial {
  private readonly video?: HTMLVideoElement;
  private readonly keyColorObject?: Color;
  private readonly videoTexture?: Texture;
  private flag: flagType = flagType.add;

  /**
   * @param texture:VideoTexture 视频材质
   * @param video:HTMLVideoElement 视频元素
   * @param videoSrc:string 视频src
   * @param color:number 要去除的颜色
   * */
  constructor(texture: Texture, video: HTMLVideoElement, videoSrc: string, color: number) {
    super();

    // 视频播放
    this.video = video;
    this.video.src = videoSrc;
    let playPromise = this.video.play();
    if (playPromise !== undefined) {
      playPromise.then(_ => {}).catch(error => {});
    }

    this.keyColorObject = new Color(color);
    this.videoTexture = texture;
    this.videoTexture.minFilter = LinearFilter;
    this.videoTexture.magFilter = LinearFilter;

    // 调用基类扩展shader
    this.setValues({
      uniforms: {
        uTime: {
          value: 1.0
        },
        uTexture: {
          value: texture
        },
        uAlpha: {
          value: 1
        },
        color: {
          value: this.keyColorObject
        }
      },
      vertexShader: `
      varying vec2 vUv;
      void main() {
        vUv = uv;
        gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
      }`,
      fragmentShader: `
      uniform float uTime; 
      uniform float uTag; 
      uniform float uAlpha; 
      uniform float uScale;
      uniform vec2 resolution;
      uniform sampler2D uTexture;
      varying vec2 vUv;
      void main() {
        float alpha = 0.;
        vec3 tex = vec3(1.);
        tex = texture2D(uTexture, vec2(vUv.x,  0.5 + vUv.y / 2.) ).rgb;
        alpha =  texture2D(uTexture, vec2(vUv.x, vUv.y / 2.)).r;
        alpha *= uAlpha;
        gl_FragColor = vec4(tex, alpha);
      }`,
      transparent: true
    });
  }

  update(group: Group, camera: Camera) {
    const y = group.rotation.y;
    if (y > 0.04) {
      this.flag = flagType.sub;
    }
    if (y < -0.04) {
      this.flag = flagType.add;
    }

    if (this.flag === flagType.add) {
      group.rotation.y += 0.0002;
    } else {
      group.rotation.y -= 0.0002;
    }

    if (this.video && this.video.readyState === this.video.HAVE_ENOUGH_DATA) {
      if (this.videoTexture) {
        this.videoTexture.needsUpdate = true;
      }
    }
  }
}