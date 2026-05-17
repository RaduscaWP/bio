import * as THREE from "three";

export function createLights() {
  const group = new THREE.Group();
  group.name = "CinematicLights";

  const ambient = new THREE.HemisphereLight(0xa4bddc, 0x05070d, 0.42);
  ambient.name = "NightHemisphere";

  const key = new THREE.DirectionalLight(0xdfe8f7, 1.95);
  key.name = "MoonKey";
  key.position.set(-2.4, 3.2, 3.1);

  const rim = new THREE.DirectionalLight(0x6aa7c3, 2.25);
  rim.name = "CyanRim";
  rim.position.set(3.9, 1.4, -2.9);

  const fill = new THREE.PointLight(0xd6ae6d, 0.68, 6.5, 2.4);
  fill.name = "WarmFill";
  fill.position.set(-0.3, 0.2, 2.1);

  const violet = new THREE.PointLight(0x544593, 0.6, 7.5, 1.8);
  violet.name = "VioletBloom";
  violet.position.set(1.8, 1.4, -1.6);

  group.add(ambient, key, rim, fill, violet);

  return {
    group,
    ambient,
    key,
    rim,
    fill,
    violet,
  };
}
