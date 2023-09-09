import { useRef, useEffect, useState } from 'react';
import styles from './Banner.module.css';
import AlphaVideoMaterial from '@/utils/lib/AlphaVideoMaterial';
import { useAppSelector } from '@/store';

import {
  VideoTexture,
  Camera,
  SpotLight,
  Renderer,
  Scene,
  BoxGeometry,
  MeshPhongMaterial,
  Mesh,
  PerspectiveCamera,
  WebGLRenderer,
  Group,
  PlaneGeometry
} from 'three';
import useThemeSwitch from '@/components/Design/hook/useThemeSwitch';

const canvasOptions = {
  // videoSource: ['/banner/flip-1.mp4', '/banner/flip-3.mp4', '/banner/flip-2.mp4'],
  width: 1000,
  height: 600,
  baseWindow: {
    width: 1500,
    height: 865,
    canvasW: 1000,
    canvasH: 600
  },
  rendererOption: {
    alpha: true,
    antialias: true
  },
  floor: {
    darkColor: 0x262626,
    color: 0x9ca3af,
    size: [2.8, 0.1, 0.8]
  },
  light: {
    color: 0xa3a3a3
  },
  pixelRatio: 2,
  renderer: ({} as Renderer),
  scene: ({} as Scene),
  camera: ({} as Camera)
};
const renderStatus = true;

// 创建一个平台， 翻转时有桌面的感觉
function creatFloor(isDark: boolean): Mesh {
  const floor = new BoxGeometry(...canvasOptions.floor.size);
  const floorMaterial = new MeshPhongMaterial({ color: isDark ? canvasOptions.floor.darkColor : canvasOptions.floor.color });
  return new Mesh(floor, floorMaterial);
}

// 比例放大缩小
function initScaleWindow() {
  if (typeof window !== 'undefined') {
    const scale = parseFloat(Math.min(window.innerWidth / canvasOptions.baseWindow.width, window.innerHeight / canvasOptions.baseWindow.height).toFixed(2));
    canvasOptions.width = Math.floor(scale * canvasOptions.baseWindow.canvasW);
    canvasOptions.height = Math.floor(scale * canvasOptions.baseWindow.canvasH);
  }
}

function onWindowResize() {
  initScaleWindow();
  if (canvasOptions.renderer) {
    canvasOptions.renderer.setSize(canvasOptions.width, canvasOptions.height);
    canvasOptions.renderer.render(canvasOptions.scene, canvasOptions.camera);
  }
}

// 创建一个平面，用来展示视频
function creatVideo(group: Group, video: HTMLVideoElement, videoSrc: string) {
  const texture = new VideoTexture(video);
  const videoGeo = new PlaneGeometry(2.84, 1.52);
  const videoMaterial = new AlphaVideoMaterial(texture, video, videoSrc, 0x000000);
  const videoMesh = new Mesh(videoGeo, videoMaterial);
  videoMesh.position.set(0, 0.7, 0);
  group.add(videoMesh);
  return videoMaterial;
}

// 补充光照
function addLight(scene: Scene) {
  const spotLightTop = new SpotLight(canvasOptions.light.color);
  spotLightTop.position.set(2, 3, -2);
  spotLightTop.angle = Math.PI / 4;
  spotLightTop.penumbra = 1;
  spotLightTop.intensity = 5;

  const spotLightFront = new SpotLight(canvasOptions.light.color);
  spotLightFront.position.set(-2, 0, 4);
  spotLightFront.angle = Math.PI / 6;
  spotLightFront.penumbra = 1;
  spotLightFront.intensity = 5;

  scene.add(spotLightFront);
  scene.add(spotLightTop);
}

/**
 * 循环渲染，注意离开时销毁
 * */
function animate(scene: Scene, camera: Camera, videoMaterial: AlphaVideoMaterial, renderer: Renderer, group: Group) {
  if (!renderStatus) return;
  videoMaterial.update(group, camera);
  requestAnimationFrame(() => animate(scene, camera, videoMaterial, renderer, group));
  renderer.render(scene, camera);
}

export default function Banner() {
  initScaleWindow();
  const { theme } = useThemeSwitch();
  const isDark = theme === 'dark';
  const [videoSrc, setVideoSrc] = useState('/banner/flip-0.mp4');
  const canvas = useRef<HTMLCanvasElement>(null);
  const videoEl = useRef<HTMLVideoElement>(null);
  const scene = new Scene();
  scene.position.set(0, -0.76, 0);
  addLight(scene);
  const floorMesh = creatFloor(isDark);
  const group = new Group();
  group.add(floorMesh);

  const camera = new PerspectiveCamera(70, canvasOptions.width / canvasOptions.height, 0.1, 100);
  camera.position.set(0, 0, 1.7);
  camera.lookAt(0, 0, 0);
  useEffect(() => {
    const videoMaterial = creatVideo(group, videoEl.current as HTMLVideoElement, videoSrc);
    const renderer = new WebGLRenderer({
      canvas: canvas.current as HTMLCanvasElement,
      ...canvasOptions.rendererOption
    });
    renderer.setSize(canvasOptions.width, canvasOptions.height);
    renderer.setPixelRatio(canvasOptions.pixelRatio);
    scene.add(group);
    animate(scene, camera, videoMaterial, renderer, group);
    canvasOptions.renderer = renderer;
    canvasOptions.scene = scene;
    canvasOptions.camera = camera;
    if (typeof window !== 'undefined') {
      window.addEventListener('resize', onWindowResize, false);
    }
  }, []);

  return (
    <>
      <video ref={videoEl} className={styles.video} loop={true} muted={true} playsInline={true}
             crossOrigin={'anonymous'}></video>
      <canvas ref={canvas} className={styles.canvas}></canvas>
    </>
  );
}