# Draco decoder (self-hosted)

Google Draco glTF decoder, copied unchanged from `three/examples/jsm/libs/draco/gltf/`
(three.js r181). Self-hosted so the app no longer loads it from `www.gstatic.com`
at runtime (privacy / CSP). Referenced via `useGLTF.setDecoderPath` in
`src/components/CellScene.tsx`.

- Project: https://github.com/google/draco
- Licence: Apache License 2.0 — https://github.com/google/draco/blob/master/LICENSE
- Files: `draco_decoder.js`, `draco_decoder.wasm`, `draco_wasm_wrapper.js`

Update together with the `three` package (`node_modules/three/examples/jsm/libs/draco/gltf/`).
